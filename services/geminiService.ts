
import { GoogleGenAI, Type } from "@google/genai";
import { ChannelDNA, VideoIdea } from "../types";

const MODEL_NAME = 'gemini-3-pro-preview';

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const fetchChannelDNA = async (channelUrl: string): Promise<ChannelDNA> => {
  const ai = getAI();
  const dnaResponse = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: `Thoroughly analyze the YouTube channel at: ${channelUrl}. 
    1. Search for the channel's video list. Identify the most popular videos (highest views/engagement).
    2. Identify topics or video types that consistently underperform.
    3. Analyze the comments and community response patterns if available.
    4. Summarize the channel name, niche, audience, and style.
    Provide a detailed breakdown of what the audience actually responds to versus what they ignore.`,
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
          popularTopics: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Topics that got the most response/views" },
          underperformingTopics: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Topics that failed to gain traction" },
          audienceFeedbackPattern: { type: Type.STRING, description: "How the audience interacts and what they ask for" },
        },
        required: ["name", "niche", "targetAudience", "contentStyle", "summary", "popularTopics", "underperformingTopics", "audienceFeedbackPattern"]
      }
    }
  });

  return JSON.parse(dnaResponse.text || '{}') as ChannelDNA;
};

export const generateIdeas = async (dna: ChannelDNA, topic?: string): Promise<VideoIdea[]> => {
  const ai = getAI();
  const baseContext = `
    Channel DNA:
    - Niche: ${dna.niche}
    - Style: ${dna.contentStyle}
    - Proven Winners: ${dna.popularTopics.join(', ')}
    - Failed Topics: ${dna.underperformingTopics.join(', ')}
    - Audience Behavior: ${dna.audienceFeedbackPattern}
  `;

  const prompt = topic 
    ? `${baseContext}
       The user wants 15 specific video ideas about: "${topic}".
       Ensure ideas avoid the "Failed Topics" style and lean into the "Proven Winners" psychology while remaining relevant to the search trends for "${topic}".`
    : `${baseContext}
       Research current trending topics in the ${dna.niche} niche for February/March 2025.
       Generate 15 high-CTR video ideas. Mix 5 'safe' (proven topics), 5 'trending' (search-based), and 5 'experimental' (new angles) strategies.`;

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

  const rawIdeas = JSON.parse(ideasResponse.text || '[]');
  const sources = ideasResponse.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const mappedSources = sources.map((chunk: any) => ({
    title: chunk.web?.title || 'Source',
    web: { uri: chunk.web?.uri || '#' }
  }));

  return rawIdeas.map((idea: any) => ({
    ...idea,
    sources: mappedSources
  }));
};
