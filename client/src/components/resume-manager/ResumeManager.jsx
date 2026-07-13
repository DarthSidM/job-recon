import React, { useEffect, useMemo, useRef, useState } from 'react';
import { RefreshCw, Upload, CheckCircle2, Loader2, AlertCircle, Clock3 } from 'lucide-react';
import ResumeCard from './ResumeCard';
import getDecodedToken from '../../utils/getUser';
import { deleteResume, getAllResumes, getResumeStatus, setResumeActive, uploadResume } from '../../apis/resume-manager';

const POLL_INTERVAL_MS = 5000;

const QUEUED_PROGRESS = {
  progress: 0,
  message: 'Waiting for parsing to start',
  step: 'queued',
  status: 'processing',
};

export default function ResumeManager() {
  const [resumes, setResumes] = useState([]);
  const [resumeName, setResumeName] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [deletingResumeId, setDeletingResumeId] = useState(null);
  const [pollingResumeId, setPollingResumeId] = useState(null);
  const [resumeProgress, setResumeProgress] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const user = getDecodedToken();
  const isMountedRef = useRef(true);

  useEffect(() => {
    loadResumes();
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const loadResumes = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await getAllResumes();
      setResumes(response?.data?.resumeData ?? []);
    } catch (err) {
      setError(err.message || 'Unable to load resumes');
    } finally {
      setIsLoading(false);
    }
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const pollResumeStatus = async (resumeId) => {
    setPollingResumeId(resumeId);
    setResumeProgress(QUEUED_PROGRESS);

    while (isMountedRef.current) {
      try {
        const response = await getResumeStatus(resumeId);
        const statusPayload = response?.data?.resumeStatus;

        if (!isMountedRef.current) return;

        if (!statusPayload) {
          setResumeProgress(QUEUED_PROGRESS);
          await sleep(POLL_INTERVAL_MS);
          continue;
        }

        const progressValue = Number(statusPayload.progress ?? 0);

        setResumeProgress({
          progress: progressValue,
          message: statusPayload.message || 'Processing resume',
          step: statusPayload.step || 'processing',
          status: statusPayload.status || 'processing',
        });

        if (progressValue >= 100 || statusPayload.status === 'completed') {
          await loadResumes();
          setSuccess('Resume parsing completed successfully');
          setPollingResumeId(null);
          setResumeProgress(null);
          return;
        }
      } catch (err) {
        if (!isMountedRef.current) return;

        if (err?.response?.status === 404) {
          setResumeProgress(QUEUED_PROGRESS);
        } else {
          setError(err.message || 'Unable to fetch resume status');
        }
      }

      await sleep(POLL_INTERVAL_MS);
    }

    setPollingResumeId(null);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!resumeName.trim()) return setError('Resume name is required');
    if (!resumeFile) return setError('Please choose a PDF file');

    setIsUploading(true);
    setError('');
    setSuccess('');

    try {
      const response = await uploadResume({ name: resumeName.trim(), pdf: resumeFile });
      const uploadedResumeId = response?.data?.resumeId;

      setResumeName('');
      setResumeFile(null);
      setSuccess('Resume uploaded successfully');
      await loadResumes();

      if (uploadedResumeId) {
        pollResumeStatus(uploadedResumeId);
      }
    } catch (err) {
      setError(err.message || 'Unable to upload resume');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are supported');
      return;
    }
    setError('');
    setResumeFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFileSelect(event.dataTransfer.files?.[0]);
  };

  const handleViewResume = (resume) => {
    if (resume?.storage_url) {
      window.open(resume.storage_url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleActivateResume = async (resume) => {
    setError('');
    setSuccess('');
    try {
      await setResumeActive(resume.id);
      setSuccess(`${resume.name} is now active`);
      await loadResumes();
    } catch (err) {
      setError(err.message || 'Unable to set active resume');
    }
  };

  const handleDeleteResume = async (resume) => {
    if (!user?.userId) return setError('You must be signed in to delete a resume');

    const confirmed = window.confirm(`Delete ${resume.name}? This will remove the PDF from storage too.`);
    if (!confirmed) return;

    if (pollingResumeId === resume.id) {
      setResumeProgress(null);
      setPollingResumeId(null);
    }

    setDeletingResumeId(resume.id);
    setError('');
    setSuccess('');

    try {
      await deleteResume(user.userId, resume.id);
      setSuccess(`${resume.name} deleted successfully`);
      await loadResumes();
    } catch (err) {
      setError(err.message || 'Unable to delete resume');
    } finally {
      setDeletingResumeId(null);
    }
  };

  const sortedResumes = useMemo(
    () => [...resumes].sort((a, b) => Number(a.id) - Number(b.id)),
    [resumes]
  );

  const isPolling = pollingResumeId !== null;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-900">Resume Manager</h1>
          <p className="text-slate-500 text-sm">Upload a PDF, keep one resume active, and review the library at a glance.</p>
        </div>
        <button
          onClick={loadResumes}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </header>

      {(error || success) && (
        <div
          className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${
            error
              ? 'border-rose-200 bg-rose-50 text-rose-700'
              : 'border-emerald-200 bg-emerald-50 text-emerald-700'
          }`}
        >
          {error
            ? <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            : <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          }
          <span>{error || success}</span>
        </div>
      )}

      {(isPolling || resumeProgress) && (
        <div className="rounded-3xl border border-blue-200 bg-blue-50/70 p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-bold text-blue-900">
                <Clock3 className="h-4 w-4" />
                Resume parsing in progress
              </div>
              <p className="text-sm text-blue-800">{resumeProgress?.message || 'Waiting for parsing to start'}</p>
            </div>
            <span className="text-xs font-semibold text-blue-700">{resumeProgress?.progress ?? 0}%</span>
          </div>

          <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-blue-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{ width: `${Math.min(Number(resumeProgress?.progress ?? 0), 100)}%` }}
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-medium text-blue-800">
            <span className="rounded-full bg-white px-2.5 py-1">Step: {resumeProgress?.step || 'queued'}</span>
            <span className="rounded-full bg-white px-2.5 py-1">Status: {resumeProgress?.status || 'processing'}</span>
          </div>
        </div>
      )}

      <form
        onSubmit={handleUpload}
        className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">Resume name</label>
            <input
              value={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
              placeholder="Frontend Engineer Resume"
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={`rounded-3xl border-2 border-dashed p-6 transition-colors ${
              isDragging ? 'border-blue-500 bg-blue-50/60' : 'border-slate-300 bg-slate-50/40'
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-3 text-center">
              <Upload className="h-6 w-6 text-slate-400" />
              <div>
                <p className="text-sm font-bold text-slate-700">Drag & drop your PDF here</p>
                <p className="mt-1 text-xs text-slate-500">or choose a file from your device</p>
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                Browse PDF
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e.target.files?.[0])}
                />
              </label>
              <p className="text-xs font-medium text-slate-500">
                {resumeFile ? `Selected: ${resumeFile.name}` : 'No file selected'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="space-y-3">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-500">Upload details</h2>
            <p className="text-sm text-slate-600">
              Uploaded resumes are saved on the server, then processed asynchronously for matching.
            </p>
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-500">
              The active resume is the one used for match generation.
            </div>
          </div>

          <button
            type="submit"
            disabled={isUploading || isLoading || isPolling}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {isUploading ? 'Uploading...' : isPolling ? 'Processing Resume...' : 'Upload Resume'}
          </button>
        </div>
      </form>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900">Your resumes</h2>
          <p className="text-xs text-slate-400">{isLoading ? 'Loading...' : `${resumes.length} total`}</p>
        </div>

        {!isLoading && resumes.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
            No resumes uploaded yet.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedResumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              onView={handleViewResume}
              onActivate={handleActivateResume}
              onDelete={handleDeleteResume}
              isDeleting={deletingResumeId === resume.id || (pollingResumeId === resume.id && isPolling)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
