import React from 'react';
import { FileText, Loader2, Trash2 } from 'lucide-react';

export default function ResumeCard({ resume, onView, onActivate, onDelete, isDeleting }) {
  const isActive = Boolean(resume.status);
  const actionDisabled = isDeleting;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <FileText className="w-8 h-8 text-red-500" />
          <div>
            <h3 className="font-bold text-sm text-slate-900">{resume.name}</h3>
          </div>
        </div>
        <span
          className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
            isActive
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-slate-50 text-slate-500 border-slate-200'
          }`}
        >
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
      
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onView(resume)}
          disabled={actionDisabled}
          className="flex-1 py-2 text-xs font-bold border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          View PDF
        </button>
        <button
          onClick={() => onActivate(resume)}
          disabled={isActive || actionDisabled}
          className="flex-1 py-2 text-xs font-bold bg-blue-600 text-white rounded-lg disabled:bg-slate-200 disabled:text-slate-500 transition-colors"
        >
          {isActive ? 'Current Resume' : 'Set Active'}
        </button>
        <button
          onClick={() => onDelete(resume)}
          disabled={actionDisabled}
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-slate-500 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label={`Delete ${resume.name}`}
        >
          {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}