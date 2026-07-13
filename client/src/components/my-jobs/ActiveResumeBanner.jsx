import React from 'react';

export default function ActiveResumeBanner({ resumeName, onChangeResume }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Using Active Resume</p>
        <div className="flex items-center gap-2">
          <span className="text-2xl">📄</span>
          <h2 className="text-lg font-bold text-slate-800">{resumeName || "No Resume Selected"}</h2>
        </div>
      </div>
      <button 
        onClick={onChangeResume}
        className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors self-start md:self-center"
      >
        Change Resume
      </button>
    </div>
  );
}