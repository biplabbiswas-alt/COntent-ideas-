
import React from 'react';
import { VideoIdea } from '../types';
import { X, Play, Image as ImageIcon, Search, Tag, ExternalLink } from 'lucide-react';

interface IdeaDetailProps {
  idea: VideoIdea;
  onClose: () => void;
}

const IdeaDetail: React.FC<IdeaDetailProps> = ({ idea, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-y-auto">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative glass w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 md:p-8 flex items-start justify-between border-b border-white/5 bg-white/2">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-red-500 flex items-center gap-1.5">
              <Play className="w-3 h-3 fill-red-500" /> AI-Generated Strategy
            </span>
            <h2 className="text-2xl md:text-3xl font-black leading-tight pr-8">{idea.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Main Content */}
          <div className="md:col-span-2 p-6 md:p-8 space-y-8 max-h-[70vh] overflow-y-auto">
            <section className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-zinc-500">
                <Play className="w-4 h-4" /> The Hook
              </h4>
              <div className="p-4 bg-zinc-900 border border-white/5 rounded-2xl italic text-zinc-300">
                "{idea.hook}"
              </div>
            </section>

            <section className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-zinc-500">
                <ImageIcon className="w-4 h-4" /> Thumbnail Concept
              </h4>
              <p className="text-zinc-400 leading-relaxed">
                {idea.thumbnailConcept}
              </p>
            </section>

            <section className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-zinc-500">
                <Search className="w-4 h-4" /> Why it Works (Search Trends)
              </h4>
              <p className="text-zinc-400 leading-relaxed">
                {idea.whyItWorks}
              </p>
              <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl text-sm text-blue-400">
                <strong>Trending Context:</strong> {idea.trendingContext}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1 p-6 md:p-8 bg-black/40 border-l border-white/5 space-y-8">
            <section className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-zinc-500">
                <Tag className="w-4 h-4" /> Optimized Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {idea.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-xs text-zinc-400">
                    #{tag}
                  </span>
                ))}
              </div>
            </section>

            {idea.sources.length > 0 && (
              <section className="space-y-3">
                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-zinc-500">
                  <ExternalLink className="w-4 h-4" /> Trend Sources
                </h4>
                <div className="space-y-2">
                  {idea.sources.slice(0, 3).map((source, i) => (
                    <a 
                      key={i}
                      href={source.web.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] text-zinc-400 truncate flex items-center justify-between group"
                    >
                      <span className="truncate mr-2">{source.title}</span>
                      <ExternalLink className="w-3 h-3 flex-shrink-0 group-hover:text-red-500 transition-colors" />
                    </a>
                  ))}
                </div>
              </section>
            )}

            <button 
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl shadow-xl shadow-red-900/20 transition-all flex items-center justify-center gap-2 active:scale-95"
              onClick={() => {
                alert("Strategy saved to your content calendar!");
                onClose();
              }}
            >
              Add to Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetail;
