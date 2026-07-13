import React from 'react';
import { FileText, CheckCircle2, RefreshCw, Briefcase } from 'lucide-react';

export default function ResumeStats({ stats }) {
  const data = [
    { label: 'Resumes', value: stats.total, icon: <FileText className="w-4 h-4 text-slate-500" /> },
    { label: 'Successfully Parsed', value: stats.parsed, icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" /> },
    { label: 'Processing', value: stats.processing, icon: <RefreshCw className="w-4 h-4 text-blue-500" /> },
    { label: 'Matched Jobs', value: stats.matches, icon: <Briefcase className="w-4 h-4 text-indigo-500" /> },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {data.map((item, i) => (
        <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">{item.label}</p>
            <p className="text-xl font-black text-slate-900">{item.value}</p>
          </div>
          {item.icon}
        </div>
      ))}
    </div>
  );
}