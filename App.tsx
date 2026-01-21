
import React, { useState } from 'react';
import { fetchChannelDNA, generateIdeas } from './services/geminiService';
import { ChannelDNA, VideoIdea } from './types';
import ChannelInput from './components/ChannelInput';
import Dashboard from './components/Dashboard';
import IdeaDetail from './components/IdeaDetail';
import { Youtube, Sparkles, LayoutDashboard, Target, Zap, Search } from 'lucide-react';

const App: React.FC = () => {
  const [dna, setDna] = useState<ChannelDNA | null>(null);
  const [ideas, setIdeas] = useState<VideoIdea[]>([]);
  const [loadingDna, setLoadingDna] = useState(false);
  const [loadingIdeas, setLoadingIdeas] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<VideoIdea | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzeChannel = async (url: string) => {
    setLoadingDna(true);
    setError(null);
    setIdeas([]);
    try {
      const dnaResult = await fetchChannelDNA(url);
      setDna(dnaResult);
      // Automatically generate initial trending ideas
      handleGenerateIdeas(dnaResult);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze channel. Please ensure the URL is correct and try again.");
    } finally {
      setLoadingDna(false);
    }
  };

  const handleGenerateIdeas = async (targetDna: ChannelDNA, topic?: string) => {
    setLoadingIdeas(true);
    setError(null);
    try {
      const ideasResult = await generateIdeas(targetDna, topic);
      setIdeas(ideasResult);
    } catch (err) {
      console.error(err);
      setError("Failed to generate ideas for this topic. Please try again.");
    } finally {
      setLoadingIdeas(false);
    }
  };

  const handleReset = () => {
    setDna(null);
    setIdeas([]);
    setSelectedIdea(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 glass border-b border-white/5 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
          <div className="bg-red-600 p-1.5 rounded-lg shadow-lg shadow-red-600/20">
            <Youtube className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">YTStrategy<span className="text-red-500">Pro</span></span>
        </div>
        
        <div className="flex items-center gap-4">
          {dna && (
            <button 
              onClick={handleReset}
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              New Channel
            </button>
          )}
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center text-xs font-bold shadow-lg">
            AI
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full p-4 md:p-8">
        {!dna ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12">
            <div className="text-center mb-12 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-6 animate-bounce">
                <Sparkles className="w-4 h-4" />
                <span>AI-Driven Creator Suite</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                Unlock Your Channel's <span className="text-red-600">Hidden Growth</span>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl">
                Paste your URL. We'll crawl your channel, learn your DNA, and then you can ask us for ideas on any topic you want to tackle next.
              </p>
            </div>

            <ChannelInput onAnalyze={handleAnalyzeChannel} isLoading={loadingDna} />
            
            {error && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-center gap-3 max-w-lg">
                <Zap className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              <FeatureCard 
                icon={<Target className="text-red-500" />} 
                title="Channel Crawling" 
                desc="We study your niche, audience, and style to build a custom AI persona that thinks like your brand."
              />
              <FeatureCard 
                icon={<Search className="text-blue-500" />} 
                title="Topic Focus" 
                desc="Want to make a video about a specific tech trend? Just enter it, and we'll strategize the perfect angle."
              />
              <FeatureCard 
                icon={<LayoutDashboard className="text-emerald-500" />} 
                title="High-CTR Assets" 
                desc="Get optimized titles, viral hooks, and thumbnail concepts proven to win the click."
              />
            </div>
          </div>
        ) : (
          <Dashboard 
            dna={dna} 
            ideas={ideas} 
            loadingIdeas={loadingIdeas}
            onGenerateTopic={(topic) => handleGenerateIdeas(dna, topic)}
            onSelectIdea={setSelectedIdea} 
            error={error}
          />
        )}
      </main>

      {selectedIdea && (
        <IdeaDetail 
          idea={selectedIdea} 
          onClose={() => setSelectedIdea(null)} 
        />
      )}

      <footer className="py-8 px-6 border-t border-white/5 text-center text-zinc-500 text-sm">
        <p>© 2025 YTStrategyPro AI. Personalized Strategic Intelligence.</p>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="glass p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default App;
