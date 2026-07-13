import React, { useState } from 'react';
import { LayoutDashboard, FileText, Briefcase, Bookmark } from 'lucide-react';
import Navbar from '../components/ui/Navbar';
import Sidebar from '../components/ui/Sidebar';
import MainArea from '../components/dashboard/MainArea';

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

        <MainArea
          activeTab={activeTab}
          userName={userName}
          quickCards={QuickCards}
          setActiveTab={setActiveTab}
        />

      </div>
    </div>
  );
}