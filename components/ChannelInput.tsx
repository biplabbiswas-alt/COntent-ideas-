
import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface ChannelInputProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

const ChannelInput: React.FC<ChannelInputProps> = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-zinc-500 group-focus-within:text-red-500 transition-colors" />
        </div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube Channel URL (e.g. youtube.com/@mrbeast)"
          disabled={isLoading}
          className="block w-full pl-12 pr-32 py-5 bg-zinc-900 border-2 border-white/10 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600 transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="absolute right-2 top-2 bottom-2 px-6 bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 text-white font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg active:scale-95"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <span>Analyze</span>
          )}
        </button>
      </form>
      <div className="mt-4 flex gap-4 justify-center text-xs text-zinc-500">
        <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-red-500"></div> Real-time Scanning</span>
        <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-red-500"></div> AI Personalization</span>
        <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-red-500"></div> Trend Grounding</span>
      </div>
    </div>
  );
};

export default ChannelInput;
