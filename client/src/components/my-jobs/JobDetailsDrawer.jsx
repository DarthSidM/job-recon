import React, { useEffect } from 'react';

export default function JobDetailsDrawer({ job, onClose, onApply }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Container Frame */}
      <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-in">
        
        {/* Header Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 capitalize">{job.company}</span>
            <h2 className="text-xl font-bold text-slate-800">{job.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 text-lg">✕</button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex flex-wrap gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm">
            <div><span className="text-slate-400 font-medium">Location:</span> <strong className="text-slate-700">{job.location || 'Noida, India'}</strong></div>
            <div><span className="text-slate-400 font-medium">Exp Limit:</span> <strong className="text-slate-700">{job.exp_min ? `${job.exp_min}+ Years` : 'Any'}</strong></div>
            <div><span className="text-slate-400 font-medium">Match:</span> <strong className="text-emerald-600">{job.matchScore}%</strong></div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-2">Required Core Stack Matrix</h4>
            <div className="flex flex-wrap gap-1.5">
              {job.skills?.map(skill => (
                <span key={skill} className="px-2.5 py-1 bg-blue-50 text-blue-700 font-medium rounded-lg text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-2">Job Description</h4>
            <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap font-sans">
              {job.job_description}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close Window
          </button>
          <button 
            onClick={() => onApply(job)} 
            className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-colors text-center"
          >
            Apply Directly
          </button>
        </div>
      </div>
    </div>
  );
}