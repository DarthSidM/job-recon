import React, { useState } from 'react';
import { LayoutDashboard, FileText, Briefcase, Bookmark } from 'lucide-react';
import Navbar from '../components/ui/Navbar';
import Sidebar from '../components/ui/Sidebar';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const userName = "Siddharth";

  // Unified available route objects injected across Navbar search and Sidebar
  const appRoutes = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Resume manager', icon: <FileText className="w-4 h-4" /> },
    { name: 'Jobs', icon: <Briefcase className="w-4 h-4" /> },
  ];

  const QuickCards = [
    { name: 'resume manager', icon: <FileText className="w-6 h-6 text-blue-600" />, count: '2 active Resumes' },
    { name: 'jobs', icon: <Briefcase className="w-6 h-6 text-blue-600" />, count: '14 New recommendations' },
    { name: 'saved jobs', icon: <Bookmark className="w-6 h-6 text-blue-600" />, count: '5 Saved roles' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
      
      {/* GLOBAL NAVBAR */}
      <Navbar 
        userName={userName} 
        routes={appRoutes} 
        onNavigate={setActiveTab} 
      />

      {/* BODY WRAPPER */}
      <div className="flex flex-1 pt-16">
        
        {/* GLOBAL SIDEBAR */}
        <Sidebar 
          activeTab={activeTab} 
          routes={appRoutes} 
          onNavigate={setActiveTab} 
        />

        {/* MAIN CONTAINER WORKSPACE */}
        <main className="flex-1 md:pl-64 min-h-full">
          <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
            
            {/* Welcome Greeting */}
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight lowercase">
                welcome {userName.toLowerCase()}
              </h1>
              <p className="text-xs text-slate-400">Here is your reconnaissance report for today.</p>
            </div>

            {/* Quick Cards Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {QuickCards.map((card, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if(card.name !== 'saved jobs') {
                      setActiveTab(card.name === 'resume manager' ? 'Resume manager' : 'Jobs');
                    }
                  }}
                  className="bg-white border border-slate-200 hover:border-blue-500/50 rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition-all group flex flex-col justify-between h-40 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    {card.icon}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 lowercase group-hover:text-blue-600 transition-colors">
                      {card.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1">{card.count}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Panel Box displaying active tab location context */}
            <div className="border border-slate-200 bg-white rounded-2xl p-8 h-64 flex flex-col items-center justify-center gap-2 shadow-sm transition-all">
              <div className="text-xs font-mono text-slate-400 bg-slate-50 px-3 py-1.5 border border-slate-100 rounded-lg">
                path: /{activeTab.toLowerCase().replace(/\s+/g, '-')}
              </div>
              <p className="text-xs text-slate-400 italic">
                Currently displaying dashboard panel contents context for: {activeTab}
              </p>
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}