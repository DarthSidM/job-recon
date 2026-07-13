import React from 'react';

export default function JobFilters({ filters, setFilters, uniqueCompanies, uniqueLocations }) {
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Search */}
        <div className="relative col-span-1 sm:col-span-2 lg:col-span-1">
          <input
            type="text"
            placeholder="Search jobs or skills..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-3 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Company Filter */}
        <select
          value={filters.company}
          onChange={(e) => handleFilterChange('company', e.target.value)}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 capitalize"
        >
          <option value="">All Companies</option>
          {uniqueCompanies.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        {/* Location Filter */}
        <select
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500"
        >
          <option value="">All Locations</option>
          {uniqueLocations.map(l => <option key={l} value={l}>{l}</option>)}
        </select>

        {/* Experience Filter */}
        <select
          value={filters.experience}
          onChange={(e) => handleFilterChange('experience', e.target.value)}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500"
        >
          <option value="">Any Experience</option>
          <option value="entry">Entry Level (0-2 years)</option>
          <option value="mid">Mid Level (3-5 years)</option>
          <option value="senior">Senior / Lead (6+ years)</option>
        </select>

        {/* Sort Controls */}
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="w-full px-3 py-2 border border-slate-200 bg-slate-50 font-medium rounded-lg text-sm focus:outline-none focus:border-blue-500"
        >
          <option value="bestMatch">Best Match</option>
          <option value="newest">Newest First</option>
          <option value="experienceAsc">Experience: Low to High</option>
        </select>
      </div>
    </div>
  );
}