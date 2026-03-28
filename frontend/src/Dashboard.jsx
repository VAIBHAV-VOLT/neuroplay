import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* ── Scroll-reveal hook for Dashboard ── */
function useScrollReveal(selector = '[data-reveal]', rootMargin = '0px 0px -60px 0px') {
  useEffect(() => {
    const els = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.revealDelay || '0';
          setTimeout(() => el.classList.add('revealed'), Number(delay));
          observer.unobserve(el);
        }
      });
    }, { rootMargin });
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [selector, rootMargin]);
}

export default function Dashboard() {
  const navigate = useNavigate();
  useScrollReveal();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-[0_20_40px_rgba(0,88,185,0.08)]">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <div 
            className="text-2xl font-bold tracking-tighter text-blue-600 dark:text-blue-400 font-headline cursor-pointer hover:opacity-80 transition-opacity" 
            onClick={() => navigate('/dashboard')}
          >
            NeuroPlay
          </div>
          <div className="hidden md:flex items-center space-x-8 font-plus-jakarta text-sm font-medium tracking-tight">
            <button className="text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400 pb-1" onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button className="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors">Games</button>
            <button className="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors">Insights</button>
            <button className="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors">Community</button>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-full transition-all active:scale-95 duration-200" title="Notifications">
              <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
            </button>
            <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all active:scale-95 duration-200" title="Logout" onClick={handleLogout}>
              <span className="material-symbols-outlined text-error">logout</span>
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container hover:scale-105 transition-transform cursor-pointer">
              <img alt="User profile avatar" className="w-full h-full object-cover" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&gender=female" />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto min-h-screen">
        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-10 overflow-hidden">
          
          {/* Left: Hero Card */}
          <section 
            className="lg:col-span-4 flex flex-col gap-6 animate-fade-in-up" 
            style={{ animationDelay: '100ms' }}
          >
            <div className="bg-gradient-to-br from-white to-surface-container-low p-12 rounded-[3.5rem] relative overflow-hidden group min-h-[420px] flex flex-col justify-center lp-card-hover border border-white/40 shadow-[0_24px_48px_rgba(0,88,185,0.05)]">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary-container/20 rounded-full blur-3xl animate-pulse-slow"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-float"></div>
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#d1FAE5] text-[#065F46] rounded-full text-xs font-extrabold font-label mb-8 tracking-tight">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                  5 Day Streak
                </span>
                <h1 className="text-5xl md:text-6xl font-headline font-black text-on-surface tracking-tighter leading-[1.1] mb-6">
                  Welcome back,<br />
                  <span className="text-primary">Sarah.</span>
                </h1>
                <p className="text-on-surface-variant text-lg leading-relaxed max-w-xs font-medium opacity-90">
                  Your cognitive sanctuary is ready. Let's check your focus today.
                </p>
              </div>
            </div>
          </section>

          {/* Right: Game Grid (Daily Exercises) */}
          <section className="lg:col-span-8">
            <div 
              className="flex items-center justify-between mb-8 px-2 animate-fade-in-up" 
              style={{ animationDelay: '200ms' }}
            >
              <h2 className="text-2xl font-headline font-bold text-on-surface">Daily Exercises</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Word Rush */}
              <div 
                className="glass-card p-6 rounded-xl group hover:bg-white transition-all cursor-pointer relative overflow-hidden h-64 flex flex-col justify-end animate-fade-in-up lp-card-hover"
                onClick={() => navigate('/game/word-rush')}
                style={{ animationDelay: '300ms' }}
              >
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <span className="material-symbols-outlined">translate</span>
                </div>
                <div className="relative z-10">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1 font-label">Linguistic</span>
                  <h3 className="text-2xl font-bold font-headline mb-1">Word Rush</h3>
                  <p className="text-sm text-on-surface-variant line-clamp-2">Enhance vocabulary recall and processing speed.</p>
                </div>
              </div>
              
              {/* Pattern Recall */}
              <div 
                className="bg-surface-container-low p-6 rounded-xl group hover:bg-secondary-container/20 transition-all cursor-pointer h-64 flex flex-col justify-between animate-fade-in-up lp-card-hover"
                onClick={() => navigate('/game/pattern-recall')}
                style={{ animationDelay: '400ms' }}
              >
                <div className="w-full h-24 rounded-lg bg-surface-container-lowest/50 mb-4 flex items-center justify-center gap-1 overflow-hidden">
                  <div className="w-3 h-8 bg-secondary rounded-full opacity-20 group-hover:h-12 transition-all"></div>
                  <div className="w-3 h-14 bg-secondary rounded-full opacity-40 group-hover:h-10 transition-all"></div>
                  <div className="w-3 h-10 bg-secondary rounded-full opacity-60 group-hover:h-16 transition-all"></div>
                  <div className="w-3 h-16 bg-secondary rounded-full opacity-40 group-hover:h-8 transition-all"></div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest block mb-1 font-label">Memory</span>
                  <h3 className="text-2xl font-bold font-headline mb-1 text-on-surface">Pattern Recall</h3>
                  <p className="text-sm text-on-surface-variant line-clamp-2">Memorize grid sequences to test working memory and recall speed.</p>
                </div>
              </div>
              
              {/* Balloon Burst */}
              <div 
                className="bg-primary-container/10 p-6 rounded-xl group hover:bg-primary-container/20 transition-all cursor-pointer h-64 flex flex-col justify-between border border-primary-container/20 animate-fade-in-up lp-card-hover"
                onClick={() => navigate('/game/balloon-burst')}
                style={{ animationDelay: '500ms' }}
              >
                <div className="w-14 h-14 rounded-full bg-primary-container/30 flex items-center justify-center text-primary self-end group-hover:scale-110 group-hover:-rotate-12 transition-transform">
                  <span className="material-symbols-outlined text-3xl animate-bounce">bolt</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1 font-label">Processing Power</span>
                  <h3 className="text-2xl font-bold font-headline mb-1 text-on-surface">Balloon Burst</h3>
                  <p className="text-sm text-on-surface-variant line-clamp-2">React quickly to pop energetic clusters of color.</p>
                </div>
              </div>
              
              {/* Mood Canvas */}
              <div 
                className="bg-gradient-to-br from-tertiary-container/20 to-surface-container-lowest p-6 rounded-xl group hover:shadow-lg transition-all cursor-pointer relative flex flex-col justify-between overflow-hidden h-64 animate-fade-in-up lp-card-hover"
                onClick={() => navigate('/game/mood-canvas')}
                style={{ animationDelay: '600ms' }}
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-tertiary-container rounded-full blur-3xl opacity-20"></div>
                <div className="self-end group-hover:scale-110 group-hover:rotate-12 transition-transform">
                  <span className="material-symbols-outlined text-4xl text-tertiary">palette</span>
                </div>
                <div className="relative z-10">
                  <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest block mb-1 font-label">Emotional Intelligence</span>
                  <h3 className="text-2xl font-bold font-headline mb-1 text-on-surface">Mood Canvas</h3>
                  <p className="text-sm text-on-surface-variant line-clamp-2">Visualize your emotional landscape through abstract brush strokes.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Data Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Burnout Score Card */}
          <section 
            className="lg:col-span-4" 
            data-reveal
          >
            <div className="bg-surface-container-lowest glass-card rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-[0_20_40px_rgba(0,88,185,0.05)] lp-card-hover h-full">
              <h3 className="font-headline text-xl font-bold text-on-surface mb-8">Burnout Score</h3>
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-surface-container-low" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12" />
                  <circle className="text-tertiary transition-all duration-1000 ease-out" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeDasharray="552.92" strokeDashoffset="138" strokeWidth="12" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-on-surface">75%</span>
                  <span className="text-sm font-bold text-tertiary uppercase tracking-widest">Stable</span>
                </div>
              </div>
              <div className="mt-8 flex gap-2 items-center px-4 py-2 bg-tertiary-container/30 rounded-full animate-pulse-slow">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                <p className="text-xs font-bold text-on-tertiary-container">Optimal zone for cognitive play</p>
              </div>
            </div>
          </section>

          {/* Weekly Trend Graph */}
          <section 
            className="lg:col-span-8" 
            data-reveal
            data-reveal-delay="200"
          >
            <div className="bg-surface-container-lowest glass-card rounded-xl p-8 shadow-[0_20_40px_rgba(0,88,185,0.05)] lp-card-hover h-full">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="font-headline text-xl font-bold text-on-surface">Weekly Mental Trends</h3>
                  <p className="text-sm text-on-surface-variant">Average focus improvement: +12%</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-surface-container-low rounded-full text-xs font-bold text-on-surface-variant cursor-pointer hover:bg-surface-container transition-all">Daily</button>
                  <button className="px-3 py-1 bg-primary-container text-on-primary-container rounded-full text-xs font-bold cursor-pointer hover:bg-primary-dim transition-all">Weekly</button>
                </div>
              </div>
              <div className="h-64 w-full relative group">
                <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(0, 88, 185, 0.2)" />
                      <stop offset="100%" stopColor="rgba(0, 88, 185, 0)" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M0,150 Q100,120 200,140 T400,80 T600,100 T800,40" 
                    fill="none" 
                    stroke="#0058b9" 
                    strokeLinecap="round" 
                    strokeWidth="4" 
                    className="path-animate"
                  />
                  <path d="M0,150 Q100,120 200,140 T400,80 T600,100 T800,40 L800,200 L0,200 Z" fill="url(#chartGradient)" />
                  {[200, 400, 600, 800].map((x, i) => {
                    const y = [140, 80, 100, 40][i];
                    return (
                      <circle 
                        key={x} 
                        cx={x} 
                        cy={y} 
                        fill="#0058b9" 
                        r="6" 
                        stroke="#fff" 
                        strokeWidth="2" 
                        className="hover:r-8 transition-all cursor-pointer"
                      />
                    );
                  })}
                </svg>
                <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full rounded-t-[3rem] mt-auto bg-slate-50 dark:bg-slate-950 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-8 gap-4 max-w-7xl mx-auto">
          <div className="font-manrope text-xs text-slate-500 dark:text-slate-400">
            © 2026 NeuroPlay. A Fluid Sanctuary for your mind.
          </div>
          <div className="flex gap-6 font-manrope text-xs text-slate-400 dark:text-slate-500">
            <button className="hover:text-blue-500 dark:hover:text-blue-300 transition-colors pointer">Privacy Policy</button>
            <button className="hover:text-blue-500 dark:hover:text-blue-300 transition-colors pointer">Terms of Service</button>
            <button className="hover:text-blue-500 dark:hover:text-blue-300 transition-colors pointer">Support</button>
            <button className="hover:text-blue-500 dark:hover:text-blue-300 transition-colors pointer">Ethics Statement</button>
          </div>
        </div>
      </footer>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .revealed {
          opacity: 1 !important;
          transform: translate(0, 0) !important;
        }
        .path-animate {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: dash 3s ease-in-out forwards;
        }
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
      `}} />
    </div>
  );
}
