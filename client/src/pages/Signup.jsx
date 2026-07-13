import React, { useState } from 'react';
import { ArrowRight, Lock, Mail, User, Eye, EyeOff, Shield } from 'lucide-react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate account creation pipeline
    setTimeout(() => {
      setIsLoading(false);
      // Account registration logic goes here
      console.log('Registering account:', { name, email, password });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-blue-500 selection:text-white">
      
      {/* Back to Home Link */}
      <div className="absolute top-8 left-8">
        <a href="/" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2">
          ← Back to home
        </a>
      </div>

      <div className="sm:mx-auto w-full max-w-md">
        {/* Brand Logo */}
        <div className="flex justify-center">
          <a href="#" className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-black">JR</span>
            Job Recon
          </a>
        </div>
        
        <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-slate-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
            Sign in
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto w-full max-w-md">
        <div className="bg-white py-8 px-4 border border-slate-200 shadow-xl rounded-2xl sm:px-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {/* Full Name Field */}
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Full Name
              </label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Morgan"
                  className="block w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Email address
              </label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="block w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Password
              </label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-10 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="mt-2 text-[11px] text-slate-400">
                Must be at least 8 characters long.
              </p>
            </div>

            {/* Terms Notice */}
            <div className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <Shield className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-500 leading-normal">
                By signing up, you agree to our beta Terms of Service and data encryption policies.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Create Free Account
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}