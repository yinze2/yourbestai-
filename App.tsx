
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ToolCard from './components/ToolCard';
import SubmitToolModal from './components/SubmitToolModal';
import ToolDetail from './components/ToolDetail';
import AdminDashboard from './components/AdminDashboard';
import NewsSection from './components/NewsSection';
import { INITIAL_TOOLS, CATEGORIES } from './constants';
import { AITool, Category, NewsItem } from './types';
import { Language, translations } from './translations';
import { fetchLatestAINews } from './services/geminiService';

const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('zh');
  const [activeView, setActiveView] = useState<'home' | 'submit' | 'admin' | 'news'>('home');
  const [tools, setTools] = useState<AITool[]>(INITIAL_TOOLS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'score' | 'popular' | 'clicks'>('score');

  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [lastNewsFetch, setLastNewsFetch] = useState<number | null>(null);

  const t = translations[currentLang];

  const getToolScore = useCallback((tool: AITool) => {
    return (tool.rating * 20) + (tool.favoritesCount * 5) + (tool.clickCount * 1) + (tool.reviewCount * 10);
  }, []);

  useEffect(() => {
    const savedFavs = localStorage.getItem('ai_hub_favs');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
  }, []);

  const handleFavorite = (id: string) => {
    setFavorites(prev => {
      const isAlreadyFav = prev.includes(id);
      const newFavs = isAlreadyFav ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem('ai_hub_favs', JSON.stringify(newFavs));
      
      setTools(toolsPrev => toolsPrev.map(t => 
        t.id === id ? { ...t, favoritesCount: t.favoritesCount + (isAlreadyFav ? -1 : 1) } : t
      ));
      
      return newFavs;
    });
  };

  const refreshNews = useCallback(async (force = false) => {
    const now = Date.now();
    if (!force && lastNewsFetch && (now - lastNewsFetch < 3600000)) return;
    setNewsLoading(true);
    const latestNews = await fetchLatestAINews(currentLang);
    if (latestNews?.length) {
      setNews(latestNews);
      setLastNewsFetch(now);
    }
    setNewsLoading(false);
  }, [currentLang, lastNewsFetch]);

  useEffect(() => { refreshNews(); }, [refreshNews]);

  const filteredAndSortedTools = useMemo(() => {
    let list = tools.filter(tool => tool.status === 'approved');
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.tags.some(tag => tag.toLowerCase().includes(q)));
    }
    if (selectedCategory !== 'All') {
      list = list.filter(t => t.category === selectedCategory);
    }
    return list.sort((a, b) => {
      if (sortBy === 'score') return getToolScore(b) - getToolScore(a);
      if (sortBy === 'popular') return b.favoritesCount - a.favoritesCount;
      if (sortBy === 'clicks') return b.clickCount - a.clickCount;
      return 0;
    });
  }, [tools, searchQuery, selectedCategory, sortBy, getToolScore]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-100 font-sans">
      <Header 
        onNavClick={(v) => v === 'submit' ? setIsSubmitModalOpen(true) : setActiveView(v)} 
        activeView={activeView} 
        currentLang={currentLang} 
        onLanguageChange={setCurrentLang}
        onSearch={setSearchQuery}
        news={news}
      />

      <div className="flex-1 flex overflow-hidden">
        {activeView === 'home' && (
          <aside className="hidden lg:block w-[300px] bg-white border-r border-slate-200 overflow-y-auto sticky top-0 h-[calc(100vh-64px)] scrollbar-hide">
            <div className="p-8">
              <div className="mb-8 flex items-center gap-3">
                 <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                 <h3 className="text-xs font-black uppercase text-slate-900 tracking-[0.3em]">{currentLang === 'zh' ? '分类导航' : 'COLLECTIONS'}</h3>
              </div>
              <nav className="space-y-1.5">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`w-full text-left px-5 py-3.5 rounded-2xl text-[13px] font-bold transition-all flex items-center justify-between group ${
                    selectedCategory === 'All' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <svg className={`w-4 h-4 ${selectedCategory === 'All' ? 'text-indigo-200' : 'text-slate-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                    <span>{t.hero.all}</span>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${selectedCategory === 'All' ? 'bg-white/20' : 'bg-slate-100'}`}>
                    {tools.length}
                  </span>
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-5 py-3.5 rounded-2xl text-[13px] font-bold transition-all flex items-center justify-between group ${
                      selectedCategory === cat ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate pr-2">
                       <span className={`w-1.5 h-1.5 rounded-full transition-all ${selectedCategory === cat ? 'bg-white' : 'bg-slate-200 group-hover:bg-indigo-400'}`}></span>
                       <span className="truncate">{cat}</span>
                    </div>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 ${selectedCategory === cat ? 'bg-white/20' : 'bg-slate-100'}`}>
                      {tools.filter(tool => tool.category === cat).length}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>
        )}

        <main className="flex-1 overflow-y-auto">
          {activeView === 'home' && (
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10">
              <div className="mb-12 flex flex-col xl:flex-row xl:items-end justify-between gap-8">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                     <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ring-1 ring-indigo-100">
                        {selectedCategory === 'All' ? 'Global Ranking' : 'Active Selection'}
                     </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">
                    {selectedCategory === 'All' ? (currentLang === 'zh' ? '全明星 AI 工具箱' : 'World-Class AI Hub') : selectedCategory}
                  </h2>
                  <p className="text-slate-500 font-medium max-w-2xl">
                    {t.hero.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200 p-1.5 rounded-2xl shadow-sm self-start">
                   {[
                     { id: 'score', label: t.hero.rankByScore },
                     { id: 'popular', label: t.hero.rankByPopularity },
                     { id: 'clicks', label: t.hero.rankByClicks }
                   ].map(btn => (
                     <button 
                      key={btn.id}
                      onClick={() => setSortBy(btn.id as any)}
                      className={`px-6 py-2.5 rounded-xl text-[11px] font-black transition-all uppercase tracking-wider ${
                        sortBy === btn.id ? 'bg-slate-900 text-white shadow-xl scale-105' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                     >
                       {btn.label}
                     </button>
                   ))}
                </div>
              </div>

              {filteredAndSortedTools.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredAndSortedTools.map((tool, idx) => (
                    <div key={tool.id} className="animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both" style={{animationDelay: `${idx * 40}ms`}}>
                      <ToolCard 
                        tool={tool} 
                        onSelect={setSelectedTool}
                        onFavorite={handleFavorite}
                        isFavorited={favorites.includes(tool.id)}
                        currentLang={currentLang}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-40 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                   <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                   </div>
                   <h3 className="text-2xl font-black text-slate-900 mb-2">No matching AI found</h3>
                   <button onClick={() => {setSearchQuery(''); setSelectedCategory('All')}} className="text-indigo-600 font-black hover:underline uppercase text-sm tracking-widest">
                    Clear filters
                   </button>
                </div>
              )}
            </div>
          )}

          {activeView === 'news' && <NewsSection currentLang={currentLang} news={news} loading={newsLoading} onRefresh={() => refreshNews(true)} lastUpdated={lastNewsFetch ? new Date(lastNewsFetch).toLocaleTimeString() : null} />}
          {activeView === 'admin' && <AdminDashboard currentLang={currentLang} pendingTools={tools.filter(t => t.status === 'pending')} onApprove={(id) => setTools(prev => prev.map(t => t.id === id ? {...t, status: 'approved'} : t))} onReject={(id) => setTools(prev => prev.filter(t => t.id !== id))} />}
        </main>
      </div>

      {isSubmitModalOpen && <SubmitToolModal currentLang={currentLang} onClose={() => setIsSubmitModalOpen(false)} onSubmit={(d) => setTools(prev => [{...d, id: Math.random().toString(), status: 'pending', reviews: [], clickCount: 0, favoritesCount: 0, rating: 0, reviewCount: 0, origin: 'Global', imageUrl: 'https://picsum.photos/400/250'}, ...prev])} />}
      {selectedTool && <ToolDetail currentLang={currentLang} tool={selectedTool} onClose={() => setSelectedTool(null)} onAddReview={(tid, r) => setTools(prev => prev.map(t => t.id === tid ? {...t, reviews: [{...r, id: Math.random().toString(), date: new Date().toLocaleDateString()}, ...t.reviews], reviewCount: t.reviewCount + 1} : t))} />}
    </div>
  );
};

export default App;
