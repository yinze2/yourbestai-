
import React, { useState } from 'react';
import { AITool, Review } from '../types';
import { analyzeReviewSentiment } from '../services/geminiService';
import { Language, translations } from '../translations';

interface ToolDetailProps {
  tool: AITool;
  onClose: () => void;
  onAddReview: (toolId: string, review: Omit<Review, 'id' | 'date'>) => void;
  currentLang: Language;
}

const ToolDetail: React.FC<ToolDetailProps> = ({ tool, onClose, onAddReview, currentLang }) => {
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = translations[currentLang];

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment) return;
    setIsSubmitting(true);
    const sentiment = await analyzeReviewSentiment(newComment);
    onAddReview(tool.id, {
      user: currentLang === 'zh' ? '匿名用户' : 'Anonymous User',
      comment: newComment,
      rating: newRating,
      recommended: sentiment === 'POSITIVE' || newRating >= 4
    });
    setNewComment('');
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex justify-between items-center z-10">
          <div className="flex items-center">
            <img src={tool.imageUrl} alt={tool.name} className="w-12 h-12 rounded-xl object-cover mr-4" />
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{tool.name}</h2>
              <div className="flex items-center text-sm text-slate-500">
                <span>{(t.categoryNames as any)[tool.category] || tool.category}</span>
                <span className="mx-2">•</span>
                <span className="text-amber-500 font-bold">★ {tool.rating} ({tool.reviewCount} {t.detail.totalReviews})</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h3 className="text-xl font-bold mb-4">{t.detail.about} {tool.name}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{tool.description}</p>
                <div className="mt-8 flex gap-4">
                  <a href={tool.url} target="_blank" rel="noopener noreferrer" className="flex-1 bg-indigo-600 text-white text-center py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">{t.detail.visit}</a>
                </div>
              </section>

              <section>
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">{t.detail.reviews}</h3>
                 </div>
                 <div className="space-y-6">
                   {tool.reviews.length > 0 ? (
                     tool.reviews.map(review => (
                       <div key={review.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="flex justify-between items-start mb-4">
                            <div><p className="font-bold text-slate-900">{review.user}</p><p className="text-xs text-slate-400">{review.date}</p></div>
                            <div className="flex items-center bg-white px-2 py-1 rounded-lg border border-slate-100"><span className="text-amber-500 text-xs">★</span><span className="ml-1 text-xs font-bold text-slate-700">{review.rating}</span></div>
                          </div>
                          <p className="text-slate-600">{review.comment}</p>
                          {review.recommended && <div className="mt-4 flex items-center text-emerald-600 text-xs font-bold bg-emerald-50 w-fit px-2 py-1 rounded"><svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" /></svg>{currentLang === 'zh' ? '值得推荐' : 'Recommended'}</div>}
                       </div>
                     ))
                   ) : <div className="text-center py-10 text-slate-400 italic">{t.detail.noReviews}</div>}
                 </div>
              </section>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-4">{t.detail.leaveRating}</h4>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="flex gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} type="button" onClick={() => setNewRating(star)} className={`text-2xl transition-transform hover:scale-125 ${newRating >= star ? 'text-amber-400' : 'text-slate-300'}`}>★</button>
                    ))}
                  </div>
                  <textarea required className="w-full p-4 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none h-32" placeholder={t.detail.experience} value={newComment} onChange={e => setNewComment(e.target.value)} />
                  <button disabled={isSubmitting} className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-all">{isSubmitting ? t.detail.analyzing : t.detail.post}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetail;
