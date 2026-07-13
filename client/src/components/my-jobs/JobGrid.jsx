import React from 'react';
import JobCard from './JobCard';

export default function JobGrid({ jobs, onView, onApply }) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-12 bg-white border border-slate-200 rounded-xl shadow-sm">
        <span className="text-4xl block mb-2">🔍</span>
        <h3 className="text-base font-bold text-slate-700">No jobs match your dynamic filters</h3>
        <p className="text-xs text-slate-400 mt-1">Try broadening your search term criteria or resetting your dashboard filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map((job) => (
        <JobCard 
          key={job.source_job_id} 
          job={job} 
          onView={onView} 
          onApply={onApply} 
        />
      ))}
    </div>
  );
}