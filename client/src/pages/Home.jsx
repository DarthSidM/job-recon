import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Cpu, 
  Layers, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Upload, 
  Check, 
  X,
  Menu,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();
  // Handle navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <FileText className="w-5 h-5 text-blue-600" />,
      title: "AI Resume Parsing",
      description: "Upload a PDF and extract structured information automatically without manual entry."
    },
    {
      icon: <Cpu className="w-5 h-5 text-blue-600" />,
      title: "Intelligent Job Matching",
      description: "Vector embeddings match you with relevant jobs based on context instead of just keyword hacking."
    },
    {
      icon: <Layers className="w-5 h-5 text-blue-600" />,
      title: "Resume Management",
      description: "Store multiple tailored resumes and switch between them instantly depending on the role."
    },
    {
      icon: <Search className="w-5 h-5 text-blue-600" />,
      title: "Company Research",
      tag: "Coming Soon",
      description: "Deep-dive into company culture, recent funding, and tech stacks before you even hit apply."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-blue-600" />,
      title: "AI Resume Builder",
      tag: "Coming Soon",
      description: "Generate and optimize highly targeted resumes tailored specifically to individual job descriptions."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
      title: "Fast & Secure",
      description: "Your data is encrypted securely, remains entirely private, and is never sold to third parties."
    }
  ];

  const steps = [
    { number: "01", title: "Upload Resume", desc: "Drop in your master CV or resume PDF." },
    { number: "02", title: "AI Parses Context", desc: "Our models extract deep skills and intent." },
    { number: "03", title: "Match Jobs", desc: "Get highly curated semantic recommendations." },
    { number: "04", title: "Apply Directly", desc: "Skip the noise and apply with total confidence." }
  ];

  const faqs = [
    { q: "Is Job Recon free?", a: "Yes, Job Recon is completely free to use during our public beta period." },
    { q: "How long does resume parsing take?", a: "Usually under 30 seconds. Our pipeline extracts your experience almost instantly." },
    { q: "Can I upload multiple resumes?", a: "Yes. You can manage multiple variations of your resume to match different career tracks." },
    { q: "Do you store my resume?", a: "Yes, stored securely using enterprise-grade encryption. You can completely delete your data at any time." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white antialiased">
      
      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-sm' 
          : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="#" className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-black">JR</span>
                Job Recon
              </a>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">How it Works</a>
              <span className="text-sm font-medium text-slate-400 cursor-not-allowed flex items-center gap-1.5">
                Pricing <span className="text-[10px] font-semibold bg-slate-200/60 text-slate-600 px-1.5 py-0.5 rounded">Soon</span>
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button onClick={() => navigate('/login')} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors" >Login</button>
              <button onClick={() => navigate('/signup')} className="text-sm font-medium bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg absolute w-full left-0">
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-md">Features</a>
            <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-md">How it Works</a>
            <div className="px-3 py-2 text-base font-medium text-slate-400 flex items-center justify-between">
              <span>Pricing</span>
              <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded">Coming Soon</span>
            </div>
            <hr className="border-slate-100" />
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button className="w-full text-center py-2.5 text-sm font-medium text-slate-700 bg-slate-50 rounded-lg hover:bg-slate-100">Login</button>
              <button className="w-full text-center py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm">Get Started</button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Find jobs that actually match your <span className="text-blue-600">resume.</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Upload your resume once. Job Recon parses your experience, understands your core skills, and recommends the most relevant opportunities in seconds.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium rounded-xl shadow-sm transition-all">
                  View Demo
                </button>
              </div>
            </div>

            {/* Right Mockup */}
            <div className="lg:col-span-6 relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 to-transparent blur-3xl rounded-3xl -z-10" />
              <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 md:p-6 transition-transform duration-500 hover:-translate-y-1">
                {/* Window Controls */}
                <div className="flex items-center space-x-1.5 border-b border-slate-100 pb-4 mb-4">
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                  <span className="text-xs text-slate-400 font-mono ml-4">dashboard.jobrecon.ai/matches</span>
                </div>
                {/* Mock UI Content */}
                <div className="space-y-4">
                  <div className="h-8 bg-slate-100 rounded-lg w-1/3 animate-pulse" />
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-20 bg-blue-50/50 border border-blue-100 rounded-xl p-3 flex flex-col justify-between">
                      <span className="text-[10px] font-bold tracking-wider text-blue-600 uppercase">Match score</span>
                      <span className="text-xl font-extrabold text-blue-700">98%</span>
                    </div>
                    <div className="h-20 bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col justify-between">
                      <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Parsed Skills</span>
                      <span className="text-xl font-extrabold text-slate-700">24</span>
                    </div>
                    <div className="h-20 bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col justify-between">
                      <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Indexed Jobs</span>
                      <span className="text-xl font-extrabold text-slate-700">10k+</span>
                    </div>
                  </div>
                  <div className="border border-slate-100 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-slate-200 rounded w-1/2" />
                      <div className="h-4 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Strong Match</div>
                    </div>
                    <div className="h-3 bg-slate-100 rounded w-3/4" />
                    <div className="h-3 bg-slate-100 rounded w-1/2" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 bg-white border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <h2 className="text-xs font-bold tracking-widest text-blue-600 uppercase">Features</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Engineered for smarter searching.
            </p>
            <p className="text-slate-500 text-base">
              Everything you need to bypass broken applicant tracking systems and locate your ideal role.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  {feature.icon}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
                  {feature.tag && (
                    <span className="text-[10px] font-semibold bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-md">
                      {feature.tag}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-xs font-bold tracking-widest text-blue-600 uppercase">Workflow</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Four simple steps</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="text-4xl font-black text-slate-100 absolute top-4 right-4 select-none">
                  {step.number}
                </div>
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                  <Upload className="w-4 h-4" />
                </div>
                <h3 className="text-md font-bold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY JOB RECON (COMPARISON) */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-xs font-bold tracking-widest text-blue-600 uppercase">The Difference</h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">Why Job Recon?</p>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                  <th className="p-4">Feature</th>
                  <th className="p-4">Traditional Job Boards</th>
                  <th className="p-4 bg-blue-50/40 text-blue-900">Job Recon</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="p-4 font-medium text-slate-900">Search Strategy</td>
                  <td className="p-4 flex items-center gap-1.5"><X className="w-4 h-4 text-rose-500" /> Keyword matching</td>
                  <td className="p-4 bg-blue-50/20 flex items-center gap-1.5 font-medium text-blue-900"><Check className="w-4 h-4 text-emerald-500" /> Semantic mapping</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900">Curation</td>
                  <td className="p-4">Hundreds of irrelevant listings</td>
                  <td className="p-4 bg-blue-50/20 font-medium text-blue-900">Highly curated daily matches</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900">Data Entry</td>
                  <td className="p-4 flex items-center gap-1.5"><X className="w-4 h-4 text-rose-500" /> Manual form screening</td>
                  <td className="p-4 bg-blue-50/20 flex items-center gap-1.5 font-medium text-blue-900"><Check className="w-4 h-4 text-emerald-500" /> AI-powered extraction</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900">Context Strategy</td>
                  <td className="p-4">Apply blindly</td>
                  <td className="p-4 bg-blue-50/20 font-medium text-blue-900 text-xs">Deep Company Insights <span className="text-[9px] bg-blue-100 text-blue-700 px-1 py-0.2 rounded font-mono">Soon</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-black text-blue-500 mb-1">95%</div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Matching Accuracy</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-blue-500 mb-1">10k+</div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Jobs Indexed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-blue-500 mb-1">&lt;30s</div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Resume Processing</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-blue-500 mb-1">24/7</div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-12">
            <h2 className="text-xs font-bold tracking-widest text-blue-600 uppercase">FAQ</h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">Frequently Asked Questions</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden transition-colors">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-sm text-slate-500 border-t border-slate-100 bg-slate-50/50 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/60 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Ready to find your next opportunity?
          </h2>
          <p className="text-slate-500 max-w-md mx-auto text-sm">
            Stop losing hours pasting information into forms. Let intelligence match you directly.
          </p>
          <div className="pt-2">
            <button onClick={() => navigate('/signup')} className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all">
              Create Free Account
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-12 text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <span className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-white text-[10px] font-black">JR</span>
              Job Recon
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              <a href="#" className="hover:text-slate-900 transition-colors">About</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
              <a href="#" className="hover:text-slate-900 transition-colors">GitHub</a>
            </div>
            <div className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} Job Recon. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}