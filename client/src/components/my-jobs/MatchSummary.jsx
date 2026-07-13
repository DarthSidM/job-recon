import React from 'react';

export default function MatchSummary({ total, average, best }) {
  const stats = [
    { label: 'Total Jobs Found', value: total, icon: '💼', color: 'text-blue-600 bg-blue-50' },
    { label: 'Average Match', value: `${average}%`, icon: '📊', color: 'text-amber-600 bg-amber-50' },
    { label: 'Highest Match', value: `${best}%`, icon: '🔥', color: 'text-emerald-600 bg-emerald-50' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className={`p-3 rounded-xl text-xl ${stat.color}`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-0.5">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}