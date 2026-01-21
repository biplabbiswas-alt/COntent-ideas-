
import { GoogleGenAI, Type } from "@google/genai";
import { ChannelDNA, VideoIdea } from "../types";

const PRO_MODEL = 'gemini-3-pro-preview';
const FLASH_MODEL = 'gemini-3-flash-preview';

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const sanitizeJson = (text: string) => {
  return text.replace(/```json/g, "").replace(/```/g, "").trim();
};

export const fetchChannelDNA = async (channelUrl: string): Promise<ChannelDNA> => {
  const ai = getAI();
  const dnaResponse = await ai.models.generateContent({
    model: PRO_MODEL,
    contents: `You are an elite YouTube Content Strategist. Perform an exhaustive deep crawl of this channel: ${channelUrl}.
    1. Search for the channel's video history and popular uploads.
    2. Identify the core topics that drive the most views and engagement (likes/comments).
    3. Identify "dead weight" topics - things the channel tried that failed to resonate.
    4. Define the target audience demographic and psychological profile.
    5. Analyze the brand voice and content style.
    6. Summarize growth opportunities based on current trends.

    Return the analysis in strict JSON format.`,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          niche: { type: Type.STRING },
          targetAudience: { type: Type.STRING },
          contentStyle: { type: Type.STRING },
          summary: { type: Type.STRING },
          popularTopics: { type: Type.ARRAY, items: { type: Type.STRING } },
          underperformingTopics: { type: Type.ARRAY, items: { type: Type.STRING } },
          audienceFeedbackPattern: { type: Type.STRING },
          brandVoice: { type: Type.STRING },
          growthOpportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["name", "niche", "targetAudience", "contentStyle", "summary", "popularTopics", "underperformingTopics", "audienceFeedbackPattern", "brandVoice", "growthOpportunities"]
      }
    }
  });

  const cleanedText = sanitizeJson(dnaResponse.text || '{}');
  return JSON.parse(cleanedText) as ChannelDNA;
};

export const generateIdeas = async (dna: ChannelDNA, topic?: string): Promise<VideoIdea[]> => {
  const ai = getAI();
  const context = `
    CHANNEL DNA PROFILE:
    - Channel Name: ${dna.name}
    - Niche: ${dna.niche}
    - Voice: ${dna.brandVoice}
    - Audience: ${dna.targetAudience}
    - Popular Content Archetypes: ${dna.popularTopics.join(', ')}
    - Avoid (Failed Topics): ${dna.underperformingTopics.join(', ')}
    - Feedback Loop: ${dna.audienceFeedbackPattern}
  `;

  const prompt = topic 
    ? `${context}
       GOAL: Generate 15 BOLD and HIGH-CTR video ideas specifically for the topic: "${topic}".
       Ensure these ideas are grounded in real-time 2025 search trends using Google Search.
       Each idea must be unique, non-repetitive, and specifically tailored to the channel's proven success patterns.`
    : `${context}
       GOAL: Generate 15 HIGH-CTR video ideas based on current (Feb/March 2025) trending search data in the ${dna.niche} niche.
       Mix low-competition search terms with high-interest viral hooks.`;

  const ideasResponse = await ai.models.generateContent({
    model: PRO_MODEL,
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            hook: { type: Type.STRING },
            whyItWorks: { type: Type.STRING },
            thumbnailConcept: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            trendingContext: { type: Type.STRING },
          },
          required: ["id", "title", "hook", "whyItWorks", "thumbnailConcept", "tags", "trendingContext"]
        }
      }
    }
  });

  const cleanedText = sanitizeJson(ideasResponse.text || '[]');
  const rawIdeas = JSON.parse(cleanedText);
  
  const chunks = ideasResponse.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const sources = chunks
    .filter((c: any) => c.web)
    .map((c: any) => ({
      title: c.web.title || "Reference",
      web: { uri: c.web.uri || "#" }
    }));

  return rawIdeas.map((idea: any) => ({
    ...idea,
    sources: sources
  }));
};
