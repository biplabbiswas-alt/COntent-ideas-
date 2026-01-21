
export interface ChannelDNA {
  name: string;
  niche: string;
  targetAudience: string;
  contentStyle: string;
  summary: string;
  popularTopics: string[];
  underperformingTopics: string[];
  audienceFeedbackPattern: string;
}

export interface VideoIdea {
  id: string;
  title: string;
  hook: string;
  whyItWorks: string;
  thumbnailConcept: string;
  tags: string[];
  trendingContext: string;
  sources: { title: string; web: { uri: string } }[];
}

export interface StrategySession {
  channelUrl: string;
  dna: ChannelDNA;
  ideas: VideoIdea[];
}
