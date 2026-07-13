import React from 'react';

export default function JobCard({ job, onView, onApply }) {
  // Color configuration mapping based on criteria rules
  const getMatchStyles = (score) => {
    if (score >= 95) return { text: 'text-emerald-700 bg-emerald-50 border-emerald-200', textCode: 'Excellent Match' };
    if (score >= 80) return { text: 'text-blue-700 bg-blue-50 border-blue-200', textCode: 'Great Match' };
    if (score >= 60) return { text: 'text-amber-700 bg-amber-50 border-amber-200', textCode: 'Good Match' };
    return { text: 'text-slate-600 bg-slate-50 border-slate-200', textCode: 'Fair Match' };
  };

  const matchStyle = getMatchStyles(job.matchScore);
  const visibleSkills = job.skills?.slice(0, 3) || [];
  const hiddenSkillsCount = (job.skills?.length || 0) - visibleSkills.length;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-blue-600 transition-colors capitalize">
              {job.company}
            </span>
            <h3 className="text-base font-bold text-slate-800 line-clamp-1 mt-0.5">{job.title}</h3>
          </div>
          <div className={`px-2.5 py-1 rounded-lg border text-xs font-bold text-center shrink-0 ${matchStyle.text}`}>
            <div className="text-sm">{job.matchScore}%</div>
            <div className="text-[10px] font-medium opacity-90 leading-none mt-0.5">{matchStyle.textCode}</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 mb-4">
          <span className="flex items-center gap-1">📍 {job.location || 'Remote'}</span>
          <span className="flex items-center gap-1">💼 {job.exp_min ? `${job.exp_min}+ Years` : 'No Exp Required'}</span>
          <span className="flex items-center gap-1">💰 {job.salary_max ? `₹${job.salary_max} LPA` : 'Competitive'}</span>
        </div>

        {/* Stack Highlights */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {visibleSkills.map(skill => (
            <span key={skill} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium">
              {skill}
            </span>
          ))}
          {hiddenSkillsCount > 0 && (
            <span className="px-2 py-0.5 bg-slate-50 text-slate-400 rounded text-xs font-medium">
              +{hiddenSkillsCount} more
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 mt-auto">
        <button
          onClick={() => onView(job)}
          className="w-full py-2 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-center"
        >
          View Details
        </button>
        <button
          onClick={() => onApply(job)}
          className="w-full py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-center"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}