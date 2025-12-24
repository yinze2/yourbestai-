
import React, { useState, useMemo } from 'react';
import ForumCard from './ForumCard';
import { FORUM_CATEGORIES } from '../constants';
import { AIForum, ForumCategory } from '../types';
import { Language, translations } from '../translations';

interface ForumSectionProps {
  currentLang: Language;
  forums: AIForum[];
  onFavorite: (id: string) => void;
  favorites: string[];
}

const ForumSection: React.FC<ForumSectionProps> = ({ currentLang, forums, onFavorite, favorites }) => {
  const [selectedCategory, setSelectedCategory] = useState<ForumCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'popular' | 'clicks'>('score');
  
  const t = translations[currentLang];
  const forumT = t.forum;

  const getForumScore = (f: AIForum) => {
    return (f.rating * 20) + (f.favoritesCount * 5) + (f.clickCount / 1000);
  };

  const filteredForums = useMemo(() => {
    let list = forums.filter(f => f.status === 'approved');
    if (selectedCategory !== 'All') {
      list = list.filter(f => f.category === selectedCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(f => f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q) || f.tags.some(t => t.toLowerCase().includes(q)));
    }
    return list.sort((a, b) => {
      if (sortBy === 'score') return getForumScore(b) - getForumScore(a);
      if (sortBy === 'popular') return b.favoritesCount - a.favoritesCount;
      if (sortBy === 'clicks') return b.clickCount - a.clickCount;
      return 0;
    });
  }, [forums, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10">
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
           <div className="w-1.5 h-6 bg-rose-500 rounded-full"></div>
           <h3 className="text-xs font-black uppercase text-slate-900 tracking-[0.3em]">{forumT.ranking}</h3>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">{forumT.title}</h1>
        <p className="text-slate-500 text-lg max-w-2xl font-medium">{forumT.subtitle}</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 mb-12 items-start xl:items-center justify-between">
        <div className="flex flex-wrap gap-2">
           <button 
            onClick={() => setSelectedCategory('All')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${selectedCategory === 'All' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
           >
            {forumT.categories.All}
           </button>
           {FORUM_CATEGORIES.map(cat => (
             <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
             >
              {(forumT.categories as any)[cat] || cat}
             </button>
           ))}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
          <div className="relative w-full md:w-80">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-indigo-50 outline-none" 
              placeholder={t.hero.placeholder} 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex bg-white p-1 rounded-2xl border border-slate-200 w-full md:w-auto">
             {[
               { id: 'score', label: t.hero.rankByScore },
               { id: 'popular', label: t.hero.rankByPopularity },
               { id: 'clicks', label: t.hero.rankByClicks }
             ].map(btn => (
               <button 
                key={btn.id}
                onClick={() => setSortBy(btn.id as any)}
                className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${sortBy === btn.id ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 {btn.label}
               </button>
             ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {filteredForums.map(forum => (
          <ForumCard 
            key={forum.id} 
            forum={forum} 
            onFavorite={onFavorite} 
            isFavorited={favorites.includes(forum.id)} 
            currentLang={currentLang} 
          />
        ))}
      </div>

      {filteredForums.length === 0 && (
        <div className="text-center py-40 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
           <h3 className="text-2xl font-black text-slate-900">No forums found</h3>
           <p className="text-slate-400 mt-2">Try a different search or category.</p>
        </div>
      )}
    </div>
  );
};

export default ForumSection;
