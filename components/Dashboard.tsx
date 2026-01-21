
import React, { useState } from 'react';
import { ChannelDNA, VideoIdea } from '../types';
import { Target, Users, Zap, ExternalLink, TrendingUp, Sparkles, BookOpen, Search, Loader2, TrendingDown, ThumbsUp, RotateCcw, Flame } from 'lucide-react';

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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Channel Persona Header */}
      <section className="glass rounded-[2rem] p-8 overflow-hidden relative border-white/10 shadow-2xl bg-gradient-to-br from-zinc-900/50 to-black/50">
        <div className="absolute top-0 right-0 p-4 opacity-[0.05] -rotate-12 translate-x-10 -translate-y-10">
          <YoutubeLarge />
        </div>
        
        <div className="relative z-10 space-y-8">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="relative group shrink-0">
              <div className="absolute inset-0 bg-red-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="w-28 h-28 rounded-3xl bg-zinc-900 border border-white/10 flex items-center justify-center text-4xl font-black shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent"></div>
                {dna.name.charAt(0)}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-4xl font-black tracking-tight">{dna.name}</h2>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Channel DNA Synchronized</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge icon={<Target className="w-3.5 h-3.5" />} label={dna.niche} color="bg-blue-500/10 text-blue-400 border-blue-500/20" />
                  <Badge icon={<Users className="w-3.5 h-3.5" />} label={dna.targetAudience} color="bg-purple-500/10 text-purple-400 border-purple-500/20" />
                  <Badge icon={<Flame className="w-3.5 h-3.5" />} label={dna.brandVoice} color="bg-orange-500/10 text-orange-400 border-orange-500/20" />
                </div>
              </div>
              <p className="text-zinc-400 max-w-4xl leading-relaxed text-base font-medium">
                {dna.summary}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-white/5">
            <div className="bg-zinc-900/40 rounded-2xl p-5 border border-white/5 group hover:border-emerald-500/20 transition-all">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-4 flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" /> Proven Traction (High ROI)
              </h4>
              <div className="flex flex-wrap gap-2">
                {dna.popularTopics.map((t, i) => (
                  <span key={i} className="text-xs font-bold bg-emerald-500/5 text-emerald-400/80 px-3 py-1.5 rounded-xl border border-emerald-500/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-zinc-900/40 rounded-2xl p-5 border border-white/5 group hover:border-red-500/20 transition-all">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-red-500 mb-4 flex items-center gap-2">
                <TrendingDown className="w-4 h-4" /> Retention Gaps (Low Interest)
              </h4>
              <div className="flex flex-wrap gap-2">
                {dna.underperformingTopics.map((t, i) => (
                  <span key={i} className="text-xs font-bold bg-red-500/5 text-red-400/80 px-3 py-1.5 rounded-xl border border-red-500/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Idea Generation Control */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-black flex items-center gap-2">
              <Sparkles className="text-purple-500 w-6 h-6" /> Ideation Forge
            </h3>
            <p className="text-zinc-500 font-medium">Inject a topic or let the AI scan current niche trends.</p>
          </div>
          
          <form onSubmit={handleTopicSubmit} className="flex-1 flex flex-col sm:flex-row gap-3 max-w-3xl">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-purple-500 transition-colors" />
              <input 
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Topic focus: (e.g. 'MrBeast Analysis', 'Coding AI', 'Budget Food')"
                className="w-full bg-zinc-900/80 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all shadow-xl"
                disabled={loadingIdeas}
              />
            </div>
            <button 
              type="submit"
              disabled={loadingIdeas}
              className="px-8 py-4 bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-800 text-white font-black rounded-2xl transition-all shadow-lg shadow-purple-900/20 active:scale-95 flex items-center justify-center gap-2 shrink-0"
            >
              {loadingIdeas ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Mining 15 Ideas...</>
              ) : (
                <><Sparkles className="w-5 h-5" /> Generate 15 Ideas</>
              )}
            </button>
          </form>
        </div>
        {error && <p className="text-red-400 text-xs font-bold bg-red-500/10 p-3 rounded-xl border border-red-500/20 animate-pulse">{error}</p>}
      </section>

      {/* Results Section */}
      <section className="relative min-h-[600px] space-y-8">
        {loadingIdeas && (
          <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-[2.5rem] animate-in fade-in">
            <div className="flex flex-col items-center gap-6 p-10 glass rounded-[2rem] border-white/10 text-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-red-500/10 border-t-red-500 animate-spin"></div>
                <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 w-10 h-10 animate-pulse" />
              </div>
              <div className="space-y-2">
                <p className="text-xl font-black tracking-widest uppercase">Synthesizing Trends</p>
                <p className="text-zinc-500 text-sm font-medium">Syncing with Google Search for high-probability blueprints...</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-600/10 flex items-center justify-center border border-red-600/20">
              <Flame className="text-red-500 w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black">15 Strategic Blueprints</h3>
          </div>

          <div className="flex items-center gap-4">
            {ideas.length > 0 && !loadingIdeas && (
              <button 
                onClick={handleRefresh}
                className="group flex items-center gap-2.5 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 text-sm font-black rounded-2xl border border-white/10 transition-all active:scale-95 shadow-xl hover:shadow-red-500/5"
              >
                <RotateCcw className="w-4 h-4 group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out" />
                REFRESH ALL 15
              </button>
            )}
            <div className="hidden md:flex items-center gap-2.5 text-xs font-black uppercase tracking-[0.1em] text-zinc-500 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>Real-Time Intelligence</span>
            </div>
          </div>
        </div>

        {ideas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea, index) => (
              <div 
                key={idea.id || `idea-${index}`}
                onClick={() => onSelectIdea(idea)}
                className="glass rounded-[2rem] p-7 border-white/5 hover:border-red-500/30 hover:bg-white/5 transition-all cursor-pointer group flex flex-col justify-between h-full relative overflow-hidden group shadow-lg hover:shadow-red-900/10"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600/0 via-red-600/40 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                      <Zap className="w-5 h-5 text-red-500 group-hover:text-white" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 bg-zinc-800/80 px-3 py-1.5 rounded-lg border border-white/5">Ideation {index + 1}</span>
                  </div>
                  
                  <h4 className="font-black text-xl mb-4 leading-tight group-hover:text-red-500 transition-colors line-clamp-2 h-[3.5rem] overflow-hidden">
                    {idea.title}
                  </h4>
                  
                  <p className="text-zinc-400 text-sm line-clamp-2 mb-6 italic leading-relaxed font-medium">
                    "{idea.hook}"
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {idea.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="text-[9px] font-black text-zinc-500 bg-zinc-900 px-2.5 py-1.5 rounded-lg border border-white/5 uppercase tracking-tighter">#{tag}</span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300">
                    GET BLUEPRINT <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loadingIdeas && (
            <div className="p-24 glass rounded-[3rem] border-dashed border-2 border-white/10 text-center flex flex-col items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-zinc-900/50 flex items-center justify-center border border-white/5 shadow-inner">
                <Sparkles className="w-10 h-10 text-zinc-800" />
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-black text-zinc-400">Strategist Waiting...</p>
                <p className="text-zinc-600 text-sm max-w-sm mx-auto font-medium">Input a topic in the Forge above or run a Trend Scan to see 15 custom strategic blueprints.</p>
              </div>
            </div>
          )
        )}
      </section>

      {/* Analytics Methodology */}
      <section className="p-10 glass rounded-[2.5rem] border-white/10 flex flex-col lg:flex-row gap-10 items-center bg-gradient-to-r from-zinc-900/30 to-black/30 group">
        <div className="flex-1 space-y-5 text-center lg:text-left">
          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <BookOpen className="w-6 h-6 text-zinc-600" />
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-600">Cognitive Framework</h4>
          </div>
          <h5 className="text-3xl font-black">Multi-Layered Trend Analysis</h5>
          <p className="text-zinc-400 text-base leading-relaxed max-w-2xl font-medium">
            Our engine combines <strong className="text-white">Sentiment Crawling</strong> with <strong className="text-white">Volume Indexing</strong>. We specifically filter out topics that match your historical "Friction Points" to ensure every recommendation is high-velocity and aligned with your brand's growth DNA.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 shrink-0">
          <StatsBox value="98%" label="Style Match" />
          <StatsBox value="15+" label="Ideation" />
          <StatsBox value="REAL" label="Grounding" />
        </div>
      </section>
    </div>
  );
};

const StatsBox: React.FC<{ value: string, label: string }> = ({ value, label }) => (
  <div className="w-28 h-28 rounded-3xl bg-black border border-white/10 flex flex-col items-center justify-center gap-1 shadow-2xl group-hover:scale-110 transition-all duration-500 group-hover:border-red-500/20">
    <span className="text-2xl font-black text-white">{value}</span>
    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">{label}</span>
  </div>
);

const Badge: React.FC<{ icon: React.ReactNode, label: string, color: string }> = ({ icon, label, color }) => (
  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border ${color} shadow-sm backdrop-blur-md`}>
    {icon}
    {label}
  </span>
);

const YoutubeLarge = () => (
  <svg width="320" height="320" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.612 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
  </svg>
);

export default Dashboard;
