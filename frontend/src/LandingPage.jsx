import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

/* ── Scroll-reveal hook ── */
function useScrollReveal(selector = '[data-reveal]', rootMargin = '0px 0px -80px 0px') {
  useEffect(() => {
    const els = document.querySelectorAll(selector);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.delay || '0';
            setTimeout(() => el.classList.add('revealed'), Number(delay));
            io.unobserve(el);
          }
        });
      },
      { rootMargin }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector, rootMargin]);
}

export default function LandingPage() {
  const navigate = useNavigate();
  useScrollReveal();

  return (
    <div className="landing-page">

      {/* Navigation */}
      <nav className="lp-nav lp-nav-animate">
        <div className="lp-nav-brand">NeuroPlay</div>
        <div className="lp-nav-links">
          <a href="#">Dashboard</a>
          <a href="#">Games</a>
          <a href="#">Insights</a>
          <a href="#">Community</a>
        </div>
        <div className="lp-nav-actions">
          <button className="lp-btn-ghost" onClick={() => navigate('/auth', { state: { defaultMode: 'login' } })}>Log In</button>
          <button className="lp-btn-primary" onClick={() => navigate('/auth', { state: { defaultMode: 'signup' } })}>Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="lp-hero">
        <div className="lp-hero-content">
          <div className="lp-badge lp-hero-anim" style={{ animationDelay: '0.1s' }}>The Fluid Sanctuary</div>
          <h1 className="lp-hero-title lp-hero-anim" style={{ animationDelay: '0.25s' }}>
            Understand your mind<br />
            <span className="lp-gradient-text">through play</span>
          </h1>
          <p className="lp-hero-subtitle lp-hero-anim" style={{ animationDelay: '0.4s' }}>
            Transform mental wellness into a journey of discovery. NeuroPlay uses clinically-backed
            games to measure and improve your cognitive resilience daily.
          </p>
          <div className="lp-hero-actions lp-hero-anim" style={{ animationDelay: '0.55s' }}>
            <button className="lp-btn-primary large lp-btn-shimmer" onClick={() => navigate('/auth', { state: { defaultMode: 'signup' } })}>
              Begin Your Journey
            </button>
            <button className="lp-btn-ghost large" onClick={() => navigate('/auth', { state: { defaultMode: 'login' } })}>
              See How It Works
            </button>
          </div>
          <div className="lp-hero-stats lp-hero-anim" style={{ animationDelay: '0.7s' }}>
            <div className="lp-stat"><span className="lp-stat-num">2,000+</span><span className="lp-stat-label">Active Users</span></div>
            <div className="lp-stat-divider" />
            <div className="lp-stat"><span className="lp-stat-num">5-min</span><span className="lp-stat-label">Daily Sessions</span></div>
            <div className="lp-stat-divider" />
            <div className="lp-stat"><span className="lp-stat-num">+12%</span><span className="lp-stat-label">Avg. Focus Gain</span></div>
          </div>
        </div>
        <div className="lp-hero-visual">
          <div className="lp-neural-ring-wrapper lp-ring-entrance">
            <div className="lp-neural-ring">
              <div className="lp-ring-inner">
                <span className="lp-ring-icon lp-ring-float">🧠</span>
              </div>
            </div>
            <span className="lp-ring-label">Neural Map</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="lp-section lp-how">
        <div className="lp-section-header" data-reveal data-delay="0">
          <div className="lp-badge secondary">How It Works</div>
          <h2>Three simple steps to bridge the gap between complex neuroscience and your daily routine.</h2>
        </div>
        <div className="lp-steps">
          <div className="lp-step-card lp-card-hover" data-reveal data-delay="0">
            <div className="lp-step-num">01</div>
            <div className="lp-step-icon">🎮</div>
            <h3>Play Focused Games</h3>
            <p>Engage in 5-minute cognitive challenges designed by neuroscientists to test memory and focus.</p>
          </div>
          <div className="lp-step-card lp-card-hover" data-reveal data-delay="120">
            <div className="lp-step-num">02</div>
            <div className="lp-step-icon">📊</div>
            <h3>Analyze Patterns</h3>
            <p>Our AI maps your reaction times and decision patterns to identify mental fatigue or high-flow states.</p>
          </div>
          <div className="lp-step-card lp-card-hover" data-reveal data-delay="240">
            <div className="lp-step-num">03</div>
            <div className="lp-step-icon">✨</div>
            <h3>Personalize Care</h3>
            <p>Receive tailored mindfulness exercises and cognitive rest routines based on your unique profile.</p>
          </div>
        </div>
      </section>

      {/* Game-Changer Features */}
      <section className="lp-section lp-features">
        <div className="lp-section-header" data-reveal data-delay="0">
          <div className="lp-badge tertiary">Game-Changer Features</div>
          <h2>Deep clinical insights wrapped in a high-fidelity digital sanctuary.</h2>
        </div>
        <div className="lp-features-grid">
          <div className="lp-feature-card large lp-card-hover" data-reveal data-delay="0">
            <div className="lp-feature-icon">🗺️</div>
            <h3>Neural Mapping</h3>
            <p>Visualize your brain's performance across 5 key dimensions: Focus, Memory, Flexibility, Speed, and Calm.</p>
            <div className="lp-dimension-chips">
              {['Focus', 'Memory', 'Flexibility', 'Speed', 'Calm'].map(d => (
                <span key={d} className="lp-chip">{d}</span>
              ))}
            </div>
          </div>
          <div className="lp-feature-card lp-card-hover" data-reveal data-delay="100">
            <div className="lp-feature-icon">🤝</div>
            <h3>Community Challenges</h3>
            <p>Engage with others in low-stress cognitive trials to build community resilience together.</p>
          </div>
          <div className="lp-feature-card lp-card-hover" data-reveal data-delay="200">
            <div className="lp-feature-icon">🔒</div>
            <h3>Privacy First</h3>
            <p>Your cognitive data is end-to-end encrypted. You own your mind, we just provide the map.</p>
          </div>
        </div>
      </section>

      {/* Experience the Flow */}
      <section className="lp-etf-section">
        <div className="lp-etf-card">
          <div className="lp-etf-content" data-reveal data-reveal-dir="left" data-delay="0">
            <h2 className="lp-etf-title">Experience the Flow</h2>
            <p className="lp-etf-subtitle">
              Every NeuroPlay session is designed to be a &ldquo;moment of flow&rdquo; &mdash; a perfect
              balance between challenge and relaxation that resets your nervous system.
            </p>
            <ul className="lp-etf-features">
              <li className="lp-etf-feature">
                <span className="lp-etf-check">check_circle</span>
                Dynamic difficulty adjustment
              </li>
              <li className="lp-etf-feature">
                <span className="lp-etf-check">check_circle</span>
                Spatial audio soundscapes
              </li>
            </ul>
          </div>
          <div className="lp-etf-visual" data-reveal data-reveal-dir="right" data-delay="150">
            <div className="lp-etf-player lp-player-pulse">
              <button className="lp-etf-play-btn" onClick={() => navigate('/auth', { state: { defaultMode: 'signup' } })} aria-label="Watch demo">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="lp-footer-new">
        <div className="lp-footer-inner">
          <div className="lp-footer-left">
            <span className="lp-footer-brand-new">NeuroPlay</span>
            <span className="lp-footer-copy-new">&copy; 2026 NeuroPlay. The Fluid Sanctuary.</span>
          </div>
          <div className="lp-footer-center">
            <a href="#" className="lp-footer-link">Privacy Policy</a>
            <span className="lp-footer-sep">·</span>
            <a href="#" className="lp-footer-link">Terms of Service</a>
            <span className="lp-footer-sep">·</span>
            <a href="#" className="lp-footer-link">Contact Support</a>
          </div>
          <div className="lp-footer-right">
            <button className="lp-footer-icon-btn" title="Share" aria-label="Share">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button className="lp-footer-icon-btn" title="Settings" aria-label="Settings">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
