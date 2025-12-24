
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import ToolCard from './components/ToolCard';
import SubmitToolModal from './components/SubmitToolModal';
import ToolDetail from './components/ToolDetail';
import NewsSection from './components/NewsSection';
import ForumSection from './components/ForumSection';
import { INITIAL_TOOLS, CATEGORIES, INITIAL_FORUMS } from './constants';
import { AITool, Category, NewsItem, AIForum } from './types';
import { Language, translations } from './translations';
import { fetchLatestAINews } from './services/geminiService';

const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('zh');
  const [activeView, setActiveView] = useState<'home' | 'submit' | 'news' | 'forums'>('home');
  const [tools, setTools] = useState<AITool[]>(INITIAL_TOOLS);
  const [forums, setForums] = useState<AIForum[]>(INITIAL_FORUMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [forumFavorites, setForumFavorites] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'score' | 'popular' | 'clicks'>('score');

  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [lastNewsFetch, setLastNewsFetch] = useState<number | null>(null);

  const t = translations[currentLang];

  const getToolScore = useCallback((tool: AITool) => {
    return (tool.rating * 20) + (tool.favoritesCount * 5) + (tool.clickCount / 1000) + (tool.reviewCount * 10);
  }, []);

  useEffect(() => {
    const savedFavs = localStorage.getItem('ai_hub_favs');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    
    const savedForumFavs = localStorage.getItem('ai_hub_forum_favs');
    if (savedForumFavs) setForumFavorites(JSON.parse(savedForumFavs));
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

  const handleForumFavorite = (id: string) => {
    setForumFavorites(prev => {
      const isAlreadyFav = prev.includes(id);
      const newFavs = isAlreadyFav ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem('ai_hub_forum_favs', JSON.stringify(newFavs));
      setForums(prevForums => prevForums.map(f => 
        f.id === id ? { ...f, favoritesCount: f.favoritesCount + (isAlreadyFav ? -1 : 1) } : f
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
          <aside className="hidden lg:block w-[280px] bg-white border-r border-slate-200 overflow-y-auto sticky top-0 h-[calc(100vh-64px)] scrollbar-hide shrink-0">
            <div className="p-6">
              <div className="mb-6 flex items-center gap-3">
                 <div className="w-1 h-5 bg-indigo-600 rounded-full"></div>
                 <h3 className="text-xs font-black uppercase text-slate-900 tracking-[0.2em]">{currentLang === 'zh' ? '全部分类' : 'CATEGORIES'}</h3>
              </div>
              <nav className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between group ${
                    selectedCategory === 'All' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <svg className={`w-4 h-4 ${selectedCategory === 'All' ? 'text-indigo-200' : 'text-slate-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                    <span>{t.hero.all}</span>
                  </div>
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${selectedCategory === 'All' ? 'bg-white/20' : 'bg-slate-100'}`}>
                    {tools.length}
                  </span>
                </button>
                {CATEGORIES.map(cat => {
                  const count = tools.filter(tool => tool.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between group ${
                        selectedCategory === cat ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                         <span className={`w-1 h-1 rounded-full transition-all ${selectedCategory === cat ? 'bg-white' : 'bg-slate-200 group-hover:bg-indigo-400'}`}></span>
                         <span className="truncate">{(t.categoryNames as any)[cat] || cat}</span>
                      </div>
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md shrink-0 ${selectedCategory === cat ? 'bg-white/20' : 'bg-slate-100'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>
        )}

        <main className="flex-1 overflow-y-auto">
          {activeView === 'home' && (
            <div className="flex flex-col">
              <SearchSection 
                currentLang={currentLang} 
                onSearch={setSearchQuery} 
                onCategoryFilter={setSelectedCategory} 
                selectedCategory={selectedCategory} 
              />
              
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 w-full">
                <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">
                      {selectedCategory === 'All' ? (currentLang === 'zh' ? '精品工具库' : 'Top AI Collection') : ((t.categoryNames as any)[selectedCategory] || selectedCategory)}
                    </h2>
                    <p className="text-slate-400 text-sm font-medium">
                      {filteredAndSortedTools.length} {currentLang === 'zh' ? '项结果' : 'items found'}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start">
                    {[
                      { id: 'score', label: t.hero.rankByScore },
                      { id: 'popular', label: t.hero.rankByPopularity },
                      { id: 'clicks', label: t.hero.rankByClicks }
                    ].map(btn => (
                      <button 
                        key={btn.id}
                        onClick={() => setSortBy(btn.id as any)}
                        className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all uppercase tracking-wider ${
                          sortBy === btn.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredAndSortedTools.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 pb-20">
                    {filteredAndSortedTools.map((tool) => (
                      <ToolCard 
                        key={tool.id}
                        tool={tool} 
                        onSelect={setSelectedTool}
                        onFavorite={handleFavorite}
                        isFavorited={favorites.includes(tool.id)}
                        currentLang={currentLang}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-32 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 font-bold">{currentLang === 'zh' ? '未找到匹配工具' : 'No matching tools found'}</p>
                    <button onClick={() => {setSearchQuery(''); setSelectedCategory('All')}} className="text-indigo-600 text-xs font-black mt-4 underline">
                      RESET
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeView === 'forums' && <ForumSection currentLang={currentLang} forums={forums} onFavorite={handleForumFavorite} favorites={forumFavorites} />}
          {activeView === 'news' && <NewsSection currentLang={currentLang} news={news} loading={newsLoading} onRefresh={() => refreshNews(true)} lastUpdated={lastNewsFetch ? new Date(lastNewsFetch).toLocaleTimeString() : null} />}
        </main>
      </div>

      {isSubmitModalOpen && <SubmitToolModal currentLang={currentLang} onClose={() => setIsSubmitModalOpen(false)} onSubmit={(d) => setTools(prev => [{...d, id: Math.random().toString(), status: 'approved', reviews: [], clickCount: 0, favoritesCount: 0, rating: 0, reviewCount: 0, origin: 'Global', imageUrl: `https://picsum.photos/seed/${Math.random()}/400/250`}, ...prev])} />}
      {selectedTool && <ToolDetail currentLang={currentLang} tool={selectedTool} onClose={() => setSelectedTool(null)} onAddReview={(tid, r) => setTools(prev => prev.map(t => t.id === tid ? {...t, reviews: [{...r, id: Math.random().toString(), date: new Date().toLocaleDateString()}, ...t.reviews], reviewCount: t.reviewCount + 1} : t))} />}
    </div>
  );
};

export default App;
