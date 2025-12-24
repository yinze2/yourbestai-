
import React, { useState, useRef } from 'react';
import { CATEGORIES } from '../constants';
import { Category } from '../types';
import { getSmartRecommendations } from '../services/geminiService';
import { translations, Language } from '../translations';

interface SearchSectionProps {
  onSearch: (term: string) => void;
  onCategoryFilter: (category: Category | 'All') => void;
  selectedCategory: string;
  currentLang: Language;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch, onCategoryFilter, selectedCategory, currentLang }) => {
  const [query, setQuery] = useState('');
  const [aiTip, setAiTip] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = translations[currentLang];
  const heroT = t.hero;

  const handleAiAsk = async () => {
    if (!query) return;
    setLoadingAi(true);
    const tip = await getSmartRecommendations(query);
    setAiTip(tip || (currentLang === 'zh' ? '请尝试描述得更具体一些！' : 'Try being more specific!'));
    setLoadingAi(false);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 300 : scrollLeft + 300;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white pt-16 pb-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter">
          {heroT.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">{heroT.titleAccent}</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-3xl mx-auto font-medium">
          {heroT.subtitle}
        </p>
        
        <div className="relative max-w-3xl mx-auto mb-16">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <svg className="h-6 w-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-14 pr-32 py-5 bg-white border-2 border-slate-100 rounded-3xl shadow-2xl focus:ring-8 focus:ring-indigo-50 focus:border-indigo-500 transition-all text-slate-900 text-lg font-bold placeholder:text-slate-300"
            placeholder={heroT.placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch(e.target.value);
            }}
          />
          <button 
            onClick={handleAiAsk}
            disabled={loadingAi}
            className="absolute right-3 top-3 bottom-3 bg-indigo-600 text-white px-6 rounded-2xl font-black text-sm uppercase hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100 disabled:opacity-50"
          >
            {loadingAi ? '...' : heroT.aiSuggest}
          </button>
        </div>

        {aiTip && (
          <div className="max-w-3xl mx-auto mb-10 p-6 bg-white border-2 border-indigo-100 rounded-3xl text-left animate-in fade-in slide-in-from-top-4 duration-500 shadow-xl">
            <div className="flex items-start">
               <div className="bg-indigo-600 p-2 rounded-xl mr-4 shrink-0 shadow-lg shadow-indigo-100">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
               </div>
               <div className="flex-1">
                 <p className="text-indigo-900 text-sm font-black uppercase tracking-wider mb-2">{heroT.aiAssistant}</p>
                 <p className="text-slate-700 text-md leading-relaxed font-medium">{aiTip}</p>
                 <button onClick={() => setAiTip(null)} className="mt-4 text-indigo-600 text-xs font-black uppercase hover:underline">
                    {currentLang === 'zh' ? '好的，知道了' : 'Got it'}
                 </button>
               </div>
            </div>
          </div>
        )}

        <div className="relative group max-w-5xl mx-auto">
          <div className="flex items-center">
            <button onClick={() => scroll('left')} className="p-2 bg-white shadow-md rounded-full mr-2 hover:bg-slate-50 transition-all border border-slate-100 hidden md:block">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div 
              ref={scrollRef}
              className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-2 pb-4 pt-2"
            >
              <button
                onClick={() => onCategoryFilter('All')}
                className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shrink-0 border-2 ${
                  selectedCategory === 'All' 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100 scale-105' 
                    : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200'
                }`}
              >
                {heroT.all}
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => onCategoryFilter(cat)}
                  className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shrink-0 border-2 ${
                    selectedCategory === cat 
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100 scale-105' 
                      : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200'
                  }`}
                >
                  {(t.categoryNames as any)[cat] || cat}
                </button>
              ))}
            </div>
            <button onClick={() => scroll('right')} className="p-2 bg-white shadow-md rounded-full ml-2 hover:bg-slate-50 transition-all border border-slate-100 hidden md:block">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
