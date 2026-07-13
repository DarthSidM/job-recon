import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function Sidebar({ activeTab, routes, onNavigate }) {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 fixed top-16 bottom-0 left-0 z-20 hidden md:flex flex-col p-4 justify-between">
      <div className="space-y-1">
        {routes.map((item) => {
          const isActive = activeTab.toLowerCase() === item.name.toLowerCase();
          return (
            <button
              key={item.name}
              onClick={() => onNavigate(item.name)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <span className="capitalize">{item.name}</span>
              </div>
              {isActive && <ChevronRight className="w-3 h-3 text-slate-400" />}
            </button>
          );
        })}
      </div>
      
      <div className="p-2 bg-slate-50 rounded-xl border border-slate-100 text-[10px] text-slate-400 text-center font-mono">
        Public Beta v1.0.0
      </div>
    </aside>
  );
}