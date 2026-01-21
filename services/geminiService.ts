
import { GoogleGenAI, Type } from "@google/genai";
import { ChannelDNA, VideoIdea } from "../types";

const MODEL_NAME = 'gemini-3-pro-preview';

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

/**
 * Sanitizes the response text to ensure it's valid JSON.
 * Gemini sometimes wraps JSON in markdown blocks even with responseMimeType set.
 */
const sanitizeJson = (text: string) => {
  return text.replace(/```json/g, "").replace(/```/g, "").trim();
};

export const fetchChannelDNA = async (channelUrl: string): Promise<ChannelDNA> => {
  const ai = getAI();
  const dnaResponse = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: `As an expert YouTube Strategist, perform a DEEP CRAWL of this channel: ${channelUrl}.
    1. Scan the "Videos" tab: Identify the top 5 videos by view count and engagement.
    2. Identify topics that consistently fail (low views compared to channel average).
    3. Analyze the channel's unique "DNA": Brand voice, visual style, and target audience demographic.
    4. Scan for community sentiment: What are viewers asking for in comments?
    
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
        },
        required: ["name", "niche", "targetAudience", "contentStyle", "summary", "popularTopics", "underperformingTopics", "audienceFeedbackPattern"]
      }
    }
  });

  const cleanedText = sanitizeJson(dnaResponse.text || '{}');
  return JSON.parse(cleanedText) as ChannelDNA;
};

export const generateIdeas = async (dna: ChannelDNA, topic?: string): Promise<VideoIdea[]> => {
  const ai = getAI();
  const baseContext = `
    Channel Profile:
    - Name: ${dna.name}
    - Niche: ${dna.niche}
    - Style: ${dna.contentStyle}
    - Proven Successes: ${dna.popularTopics.join(', ')}
    - Failed Topics: ${dna.underperformingTopics.join(', ')}
    - Audience Needs: ${dna.audienceFeedbackPattern}
  `;

  const prompt = topic 
    ? `${baseContext}
       COMMAND: Generate 15 HIGH-CTR video ideas specifically about the topic: "${topic}".
       Ensure these ideas utilize the "Proven Successes" psychology but apply them to the new topic. 
       Avoid the "Failed Topics" traps. Use Google Search to find current (Feb/March 2025) trending keywords for "${topic}".`
    : `${baseContext}
       COMMAND: Generate 15 HIGH-CTR video ideas based on general current search trends in the ${dna.niche} niche.
       Mix 5 'Growth' ideas (proven concepts), 5 'Trend' ideas (search-based), and 5 'Engagement' ideas (community-focused).`;

  const ideasResponse = await ai.models.generateContent({
    model: MODEL_NAME,
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
  
  const sources = ideasResponse.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const mappedSources = sources.map((chunk: any) => ({
    title: chunk.web?.title || 'Trend Resource',
    web: { uri: chunk.web?.uri || '#' }
  }));

  return rawIdeas.map((idea: any) => ({
    ...idea,
    sources: mappedSources
  }));
};
