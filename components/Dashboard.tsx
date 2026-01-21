
import React, { useState } from 'react';
import { ChannelDNA, VideoIdea } from '../types';
import { Target, Users, Zap, ExternalLink, TrendingUp, Sparkles, BookOpen, Search, Loader2, TrendingDown, ThumbsUp, RotateCcw } from 'lucide-react';

interface DashboardProps {
  dna: ChannelDNA;
  ideas: VideoIdea[];
  loadingIdeas: boolean;
  onGenerateTopic: (topic: string) => void;
  onSelectIdea: (idea: VideoIdea) => void;
  error: string | null;
}

const Dashboard: React.FC<DashboardProps> = ({ dna, ideas, loadingIdeas, onGenerateTopic, onSelectIdea, error }) => {
  const [topic, setTopic] = useState('');

  const handleTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateTopic(topic.trim());
  };

  const handleRefresh = () => {
    onGenerateTopic(topic.trim());
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Channel Profile Section */}
      <section className="glass rounded-3xl p-8 overflow-hidden relative border-red-500/10 border shadow-2xl">
        <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
          <YoutubeLarge />
        </div>
        <div className="relative z-10 space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center text-3xl font-bold shadow-2xl border border-white/10 shrink-0">
              {dna.name.charAt(0)}
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-3xl font-black">{dna.name}</h2>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Deep Scan Complete</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge icon={<Target className="w-3 h-3" />} label={dna.niche} color="bg-blue-500/20 text-blue-400" />
                  <Badge icon={<Users className="w-3 h-3" />} label={dna.targetAudience} color="bg-emerald-500/20 text-emerald-400" />
                  <Badge icon={<Zap className="w-3 h-3" />} label={dna.contentStyle} color="bg-amber-500/20 text-amber-400" />
                </div>
              </div>
              <p className="text-zinc-400 max-w-3xl leading-relaxed text-sm">
                {dna.summary}
              </p>
            </div>
          </div>

          {/* Performance Insights Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-white/5">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-3 flex items-center gap-2">
                <ThumbsUp className="w-3 h-3" /> Growth Catalysts (Popular)
              </h4>
              <div className="flex flex-wrap gap-2">
                {dna.popularTopics.map((t, i) => (
                  <span key={i} className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-lg border border-emerald-500/10">{t}</span>
                ))}
              </div>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-3 flex items-center gap-2">
                <TrendingDown className="w-3 h-3" /> Friction Points (Avoid)
              </h4>
              <div className="flex flex-wrap gap-2">
                {dna.underperformingTopics.map((t, i) => (
                  <span key={i} className="text-xs bg-red-500/10 text-red-400 px-2 py-1 rounded-lg border border-red-500/10">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topic Lab */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
            <Search className="text-purple-400 w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Topic Lab</h3>
            <p className="text-zinc-500 text-sm">Specify a subject to generate 15 personalized content strategies.</p>
          </div>
        </div>

        <form onSubmit={handleTopicSubmit} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-purple-400 transition-colors" />
            <input 
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a specific topic (e.g., 'Apple Vision Pro', 'Sourdough Science')..."
              className="w-full bg-zinc-900 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
              disabled={loadingIdeas}
            />
          </div>
          <div className="flex gap-3">
            <button 
              type="submit"
              disabled={loadingIdeas}
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-800 text-white font-bold rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 min-w-[180px]"
            >
              {loadingIdeas ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Mining 15 Ideas...</>
              ) : (
                <><Sparkles className="w-5 h-5" /> Generate 15 Ideas</>
              )}
            </button>
            <button 
              type="button"
              onClick={() => {
                setTopic('');
                onGenerateTopic('');
              }}
              disabled={loadingIdeas}
              className="px-6 py-4 glass border border-white/5 hover:border-white/10 text-zinc-300 font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              General Trends
            </button>
          </div>
        </form>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </section>

      {/* Ideas Grid */}
      <section className="relative min-h-[400px]">
        {loadingIdeas && (
          <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-sm flex items-center justify-center rounded-3xl animate-in fade-in">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-red-500/20 border-t-red-500 animate-spin"></div>
                <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 w-6 h-6 animate-pulse" />
              </div>
              <p className="font-bold text-red-500 animate-pulse tracking-widest uppercase text-xs">Simulating Viral Response Patterns...</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/10 flex items-center justify-center">
              <Sparkles className="text-red-500 w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold">15 Strategic Blueprints</h3>
          </div>
          <div className="flex items-center gap-4">
            {ideas.length > 0 && !loadingIdeas && (
              <button 
                onClick={handleRefresh}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-bold rounded-xl border border-white/5 transition-all active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                Refresh Ideas
              </button>
            )}
            <div className="hidden md:flex items-center gap-2 text-sm text-zinc-500">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>Search Grounded Intel</span>
            </div>
          </div>
        </div>

        {ideas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea, index) => (
              <div 
                key={idea.id || index}
                onClick={() => onSelectIdea(idea)}
                className="glass rounded-2xl p-6 border border-white/5 hover:border-red-500/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)] transition-all cursor-pointer group flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center group-hover:bg-red-500 transition-colors">
                      <Zap className="w-4 h-4 text-red-500 group-hover:text-white" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 bg-zinc-800/50 px-2 py-1 rounded">Idea {index + 1}</span>
                  </div>
                  <h4 className="font-bold text-lg mb-3 leading-tight group-hover:text-red-400 transition-colors h-[3.5rem] overflow-hidden line-clamp-2">{idea.title}</h4>
                  <p className="text-zinc-400 text-sm line-clamp-2 mb-4 italic">
                    {idea.hook}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {idea.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="text-[10px] text-zinc-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">#{tag}</span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                  <span className="text-xs text-red-500 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Blueprint <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loadingIdeas && (
            <div className="p-12 glass rounded-3xl border-dashed border-2 border-white/5 text-center">
              <Sparkles className="w-8 h-8 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-500 italic">No ideas generated yet. Type a topic above to begin.</p>
            </div>
          )
        )}
      </section>

      {/* Methodology Info */}
      <section className="p-8 border-2 border-dashed border-white/5 rounded-3xl flex flex-col md:flex-row gap-8 items-center bg-zinc-900/30">
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <BookOpen className="w-5 h-5 text-zinc-500" />
            <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-500">How it works</h4>
          </div>
          <h5 className="text-xl font-bold">Deep Content Resonance Engine</h5>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xl">
            We don't just guess. Our system has analyzed your <strong>Popular Topics</strong> to understand your conversion formula, and cross-referenced it with <strong>Real-Time Search Trends</strong> to find 15 high-potential gaps in your niche.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-1">
            <span className="text-2xl font-black text-white">98%</span>
            <span className="text-[10px] text-zinc-500">Resonance</span>
          </div>
          <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-1">
            <span className="text-2xl font-black text-white">15+</span>
            <span className="text-[10px] text-zinc-500">Assets</span>
          </div>
        </div>
      </section>
    </div>
  );
};

const Badge: React.FC<{ icon: React.ReactNode, label: string, color: string }> = ({ icon, label, color }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border border-white/5 ${color}`}>
    {icon}
    {label}
  </span>
);

const YoutubeLarge = () => (
  <svg width="240" height="240" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.612 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
  </svg>
);

export default Dashboard;
