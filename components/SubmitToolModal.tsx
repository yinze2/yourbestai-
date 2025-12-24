
import React, { useState } from 'react';
import { CATEGORIES } from '../constants';
import { Category } from '../types';
import { Language, translations } from '../translations';

interface SubmitToolModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  currentLang: Language;
}

const SubmitToolModal: React.FC<SubmitToolModalProps> = ({ onClose, onSubmit, currentLang }) => {
  const t = translations[currentLang];
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    category: 'General LLM' as Category,
    tags: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    alert(currentLang === 'zh' ? '提交成功！我们的团队将尽快审核您的工具。' : 'Submission received! Our team will review your tool shortly.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">{t.submit.title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <p className="text-slate-600 mb-8">{t.submit.description}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{t.submit.name}</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="e.g. Brainiac AI"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{t.submit.url}</label>
                <input 
                  required
                  type="url" 
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="https://..."
                  value={formData.url}
                  onChange={e => setFormData({...formData, url: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">{t.submit.category}</label>
              <select 
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as Category})}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {(t.categoryNames as any)[cat] || cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">{t.submit.desc}</label>
              <textarea 
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all h-24"
                placeholder={currentLang === 'zh' ? '您的AI是做什么的？' : 'What does your AI do?'}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>

            <div className="pt-4 flex items-center justify-end gap-4">
              <button 
                type="button" 
                onClick={onClose}
                className="px-6 py-3 text-slate-600 font-bold hover:text-slate-800 transition-colors"
              >
                {t.submit.cancel}
              </button>
              <button 
                type="submit"
                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
              >
                {t.submit.submit}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitToolModal;
