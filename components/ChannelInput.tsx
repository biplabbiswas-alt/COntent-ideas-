
import React, { useState } from 'react';
import { Search, Loader2, Youtube, ShieldCheck } from 'lucide-react';

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
    <div className="w-full max-w-3xl animate-in fade-in zoom-in-95 duration-700">
      <form onSubmit={handleSubmit} className="relative group perspective-1000">
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none z-20">
          <Youtube className="h-6 w-6 text-zinc-600 group-focus-within:text-red-500 transition-colors" />
        </div>
        
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste Channel URL (e.g. youtube.com/@mrbeast)"
          disabled={isLoading}
          className="block w-full pl-16 pr-44 py-7 bg-zinc-900/60 border-2 border-white/5 rounded-[2rem] text-white text-lg font-medium placeholder-zinc-700 focus:outline-none focus:ring-4 focus:ring-red-600/10 focus:border-red-600/40 transition-all disabled:opacity-50 shadow-2xl backdrop-blur-xl"
        />
        
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="absolute right-3 top-3 bottom-3 px-10 bg-red-600 hover:bg-red-500 disabled:bg-zinc-800 text-white font-black uppercase tracking-widest text-sm rounded-2xl transition-all flex items-center gap-3 shadow-2xl shadow-red-900/40 active:scale-95 z-20"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Scanning...</span>
            </>
          ) : (
            <span>SCAN DNA</span>
          )}
        </button>

        {/* Decorative elements */}
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-[2.2rem] opacity-0 group-hover:opacity-10 blur-xl transition-opacity pointer-events-none"></div>
      </form>

      <div className="mt-8 flex flex-wrap gap-8 justify-center items-center">
        <ScannerMetric icon={<ShieldCheck className="w-4 h-4 text-emerald-500" />} label="Identity Verification" />
        <ScannerMetric icon={<div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></div>} label="Deep Crawl Active" />
        <ScannerMetric icon={<Search className="w-4 h-4 text-blue-500" />} label="Search Grounding" />
      </div>
    </div>
  );
};

const ScannerMetric: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
  <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/5 border border-white/5 backdrop-blur-md">
    {icon}
    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{label}</span>
  </div>
);

export default ChannelInput;
