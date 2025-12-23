
import React, { useState, useEffect } from 'react';
import { translations, Language } from '../translations';
import { NewsItem } from '../types';

interface HeaderProps {
  onNavClick: (view: 'home' | 'submit' | 'admin' | 'news') => void;
  activeView: string;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onSearch: (term: string) => void;
  news: NewsItem[];
}

const Header: React.FC<HeaderProps> = ({ onNavClick, activeView, currentLang, onLanguageChange, onSearch, news }) => {
  const t = translations[currentLang].nav;
  const [showSearch, setShowSearch] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    if (news.length > 0) {
      const interval = setInterval(() => {
        setTickerIndex((prev) => (prev + 1) % news.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [news]);

  const navItems = [
    { id: 'home', label: t.explore, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
    { id: 'news', label: t.news, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h4m-4 4h8m-8 4h8" /></svg>, badge: true },
    { id: 'submit', label: t.submit, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { id: 'admin', label: t.admin, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  ];

  return (
    <div className="sticky top-0 z-50">
      {news.length > 0 && (
        <div className="bg-slate-900 text-white h-9 flex items-center overflow-hidden border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between text-[11px] font-bold tracking-tight">
            <div className="flex items-center gap-3 overflow-hidden">
              <span className="flex items-center gap-1.5 text-indigo-400 shrink-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                LIVE PULSE
              </span>
              <div className="h-4 w-px bg-slate-700 mx-1 shrink-0"></div>
              <a 
                href={news[tickerIndex].url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-indigo-300 transition-all truncate animate-in slide-in-from-bottom-2 duration-500"
              >
                <span className={`mr-2 uppercase text-[9px] px-1.5 py-0.5 rounded ${
                  news[tickerIndex].sentiment === 'POSITIVE' ? 'bg-emerald-500/20 text-emerald-400' :
                  news[tickerIndex].sentiment === 'NEGATIVE' ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-500/20 text-slate-400'
                }`}>
                  {news[tickerIndex].sentiment}
                </span>
                {news[tickerIndex].title}
              </a>
            </div>
          </div>
        </div>
      )}

      <header className="bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div 
              className="flex items-center cursor-pointer group shrink-0"
              onClick={() => onNavClick('home')}
            >
              <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-indigo-100">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-3 hidden sm:block">
                <span className="block text-lg font-black text-slate-900 leading-none tracking-tighter">AI HUB</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Directory</span>
              </div>
            </div>

            <nav className="hidden lg:flex items-center bg-slate-100/50 p-1 rounded-2xl mx-4">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => onNavClick(item.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 relative ${
                    activeView === item.id 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  {item.icon}
                  {item.label}
                  {item.badge && item.id === 'news' && (
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                    </span>
                  )}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="relative">
                 <button 
                  onClick={() => setShowSearch(!showSearch)}
                  className={`p-2 md:p-2.5 rounded-xl transition-all ${showSearch ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-100'}`}
                 >
                   <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                   </svg>
                 </button>
                 {showSearch && (
                   <div className="absolute right-0 top-full mt-4 w-72 md:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-4">
                      <input 
                        autoFocus
                        type="text"
                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
                        placeholder="Quick search AI tools..."
                        onChange={(e) => onSearch(e.target.value)}
                      />
                   </div>
                 )}
              </div>

              <div className="relative group">
                <button className="flex items-center gap-1.5 p-2 md:p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18" />
                  </svg>
                  <span className="text-[10px] font-black uppercase">{currentLang}</span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-slate-200 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <button onClick={() => onLanguageChange('en')} className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-indigo-50 first:rounded-t-2xl">English</button>
                  <button onClick={() => onLanguageChange('zh')} className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-indigo-50 last:rounded-b-2xl">简体中文</button>
                </div>
              </div>

              <button className="text-slate-700 font-bold text-sm px-4 py-2 hover:bg-slate-100 rounded-xl transition-all">
                {t.login}
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
