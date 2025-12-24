
import React from 'react';
import { AIEduItem } from '../types';
import { translations, Language } from '../translations';

interface EduCardProps {
  item: AIEduItem;
  onFavorite: (id: string) => void;
  isFavorited: boolean;
  currentLang: Language;
}

const EduCard: React.FC<EduCardProps> = ({ item, onFavorite, isFavorited, currentLang }) => {
  const t = translations[currentLang];
  
  const calculateScore = () => {
    return ((item.rating * 10) + (item.learnedCount / 10000) + (item.favoritesCount / 2000)).toFixed(1);
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-indigo-500 hover:shadow-2xl transition-all duration-500 flex flex-col group relative">
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
          item.origin === 'China' ? 'bg-red-500 text-white' : 'bg-slate-900 text-white'
        }`}>
          {item.origin}
        </span>
        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-white border border-slate-200 text-slate-600`}>
          {item.level}
        </span>
      </div>

      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
           <div className="flex gap-4 text-white text-[10px] font-bold">
              <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>{item.learnedCount.toLocaleString()} {t.edu.learned}</span>
              <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>{item.favoritesCount.toLocaleString()} {t.tool.favs}</span>
           </div>
        </div>
        <button 
          onClick={(e) => { e.preventDefault(); onFavorite(item.id); }}
          className={`absolute top-4 right-4 p-2.5 rounded-2xl backdrop-blur-md transition-all ${
            isFavorited ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-400 hover:text-rose-500'
          }`}
        >
          <svg className="w-5 h-5" fill={isFavorited ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 pr-4">
            <h3 className="text-xl font-black text-slate-900 leading-tight mb-1 group-hover:text-indigo-600 transition-colors">{item.name}</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.provider}</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center text-amber-500 mb-1">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <span className="ml-1 text-sm font-black text-slate-900">{item.rating}</span>
            </div>
          </div>
        </div>
        
        <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-1 font-medium leading-relaxed">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-6">
          {item.tags.map(tag => (
            <span key={tag} className="text-[9px] bg-slate-50 text-slate-400 font-black uppercase px-2 py-0.5 rounded-md border border-slate-100">#{tag}</span>
          ))}
        </div>
        
        <div className="pt-5 border-t border-slate-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-tighter">{t.tool.score}</span>
            <span className="text-lg font-black text-indigo-600 tracking-tighter">{calculateScore()}</span>
          </div>
          <a 
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-black uppercase hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-100"
          >
            {t.tool.visit}
          </a>
        </div>
      </div>
    </div>
  );
};

export default EduCard;
