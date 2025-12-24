
import React from 'react';
import { AITool } from '../types';
import { translations, Language } from '../translations';

interface ToolCardProps {
  tool: AITool;
  onSelect: (tool: AITool) => void;
  onFavorite: (id: string) => void;
  isFavorited: boolean;
  currentLang: Language;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelect, onFavorite, isFavorited, currentLang }) => {
  const t = translations[currentLang];
  
  // 综合得分算法
  const calculateScore = () => {
    return ((tool.rating * 10) + (tool.reviewCount / 100) + (tool.favoritesCount / 500) + (tool.clickCount / 1000)).toFixed(1);
  };

  return (
    <div 
      className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-indigo-500 hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer group relative"
      onClick={() => onSelect(tool)}
    >
      <div className="absolute top-4 left-4 z-10">
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
          tool.origin === 'China' ? 'bg-red-500 text-white' : 'bg-slate-900 text-white'
        }`}>
          {tool.origin}
        </span>
      </div>

      <div className="relative h-52 overflow-hidden">
        <img 
          src={tool.imageUrl} 
          alt={tool.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
           <div className="flex gap-4 text-white text-[10px] font-bold">
              <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>{tool.clickCount} {t.tool.clicks}</span>
              <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>{tool.favoritesCount} {t.tool.favs}</span>
           </div>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onFavorite(tool.id); }}
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
          <div>
            <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">{tool.name}</h3>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
              {(t.categoryNames as any)[tool.category] || tool.category}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center text-amber-500 mb-1">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <span className="ml-1 text-sm font-black text-slate-900">{tool.rating}</span>
            </div>
            <span className="text-[9px] font-bold text-slate-400">{tool.reviewCount} {t.tool.reviews}</span>
          </div>
        </div>
        
        <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-1 font-medium">
          {tool.description}
        </p>
        
        <div className="pt-5 border-t border-slate-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-tighter">{t.tool.score}</span>
            <span className="text-lg font-black text-indigo-600 tracking-tighter">{calculateScore()}</span>
          </div>
          <a 
            href={tool.url} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => { e.stopPropagation(); }}
            className="bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-black uppercase hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-100"
          >
            {t.tool.visit}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
