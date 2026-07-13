import React, { useState } from 'react';
import { Search, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function Navbar({ userName, routes, onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  // Filter routes based on user search query
  
  const filteredRoutes = routes.filter(route => 
    route.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
		localStorage.removeItem('token');
		try {
			window.dispatchEvent(new Event('auth-changed'));
		} catch {
			// no-op
		}
    setIsDropdownOpen(false);
    navigate('/login', { replace: true });
	};
  return (
    <header className="bg-white border-b border-slate-200 h-16 fixed top-0 left-0 right-0 z-40 px-6 flex items-center justify-between">
      {/* 1. Name of App */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('Dashboard')}>
        <span className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-black">JR</span>
        <span className="font-bold tracking-tight text-slate-900 text-sm md:text-base">job-recon</span>
      </div>

      {/* 2. Search Feature (Routes Filtering) */}
      <div className="flex-1 max-w-xl mx-8 relative">
        <div className="relative rounded-xl shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search matching routes (e.g., jobs, resumes)..."
            className="block w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Dropdown Results */}
        {searchQuery && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden max-h-48 overflow-y-auto">
            {filteredRoutes.length > 0 ? (
              filteredRoutes.map((route) => (
                <button
                  key={route.name}
                  onClick={() => {
                    onNavigate(route.name);
                    setSearchQuery('');
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 border-b border-slate-100 last:border-none flex items-center gap-2"
                >
                  {route.icon}
                  <span className="capitalize">{route.name}</span>
                </button>
              ))
            ) : (
              <div className="p-4 text-xs text-slate-400 text-center font-mono">No matching routes found</div>
            )}
          </div>
        )}
      </div>

      {/* 3. Profile Icon */}
      <div className="relative">
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-white text-xs font-semibold shadow-inner focus:outline-none"
        >
          {userName.charAt(0).toUpperCase()}
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-50 py-1">
            <div className="px-4 py-2 border-b border-slate-100">
              <p className="text-xs font-bold text-slate-900">{userName}</p>
              <p className="text-[10px] text-slate-400 font-medium">Beta Session</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-bold flex items-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}