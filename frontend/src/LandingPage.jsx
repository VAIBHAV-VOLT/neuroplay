import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">

      {/* Navigation */}
      <nav className="lp-nav">
        <div className="lp-nav-brand">NeuroPlay</div>
        <div className="lp-nav-links">
          <a href="#">Dashboard</a>
          <a href="#">Games</a>
          <a href="#">Insights</a>
          <a href="#">Community</a>
        </div>
        <div className="lp-nav-actions">
          <button className="lp-btn-ghost" onClick={() => navigate('/auth')}>Log In</button>
          <button className="lp-btn-primary" onClick={() => navigate('/auth')}>Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="lp-hero">
        <div className="lp-hero-content">
          <div className="lp-badge">The Fluid Sanctuary</div>
          <h1 className="lp-hero-title">
            Understand your mind<br />
            <span className="lp-gradient-text">through play</span>
          </h1>
          <p className="lp-hero-subtitle">
            Transform mental wellness into a journey of discovery. NeuroPlay uses clinically-backed
            games to measure and improve your cognitive resilience daily.
          </p>
          <div className="lp-hero-actions">
            <button className="lp-btn-primary large" onClick={() => navigate('/auth')}>
              Begin Your Journey
            </button>
            <button className="lp-btn-ghost large" onClick={() => navigate('/auth')}>
              See How It Works
            </button>
          </div>
          <div className="lp-hero-stats">
            <div className="lp-stat"><span className="lp-stat-num">2,000+</span><span className="lp-stat-label">Active Users</span></div>
            <div className="lp-stat-divider" />
            <div className="lp-stat"><span className="lp-stat-num">5-min</span><span className="lp-stat-label">Daily Sessions</span></div>
            <div className="lp-stat-divider" />
            <div className="lp-stat"><span className="lp-stat-num">+12%</span><span className="lp-stat-label">Avg. Focus Gain</span></div>
          </div>
        </div>
        <div className="lp-hero-visual">
          <div className="lp-neural-ring">
            <div className="lp-ring-inner">
              <span className="lp-ring-icon">🧠</span>
              <span className="lp-ring-label">Neural Map</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="lp-section lp-how">
        <div className="lp-section-header">
          <div className="lp-badge secondary">How It Works</div>
          <h2>Three simple steps to bridge the gap between complex neuroscience and your daily routine.</h2>
        </div>
        <div className="lp-steps">
          <div className="lp-step-card">
            <div className="lp-step-num">01</div>
            <div className="lp-step-icon">🎮</div>
            <h3>Play Focused Games</h3>
            <p>Engage in 5-minute cognitive challenges designed by neuroscientists to test memory and focus.</p>
          </div>
          <div className="lp-step-card">
            <div className="lp-step-num">02</div>
            <div className="lp-step-icon">📊</div>
            <h3>Analyze Patterns</h3>
            <p>Our AI maps your reaction times and decision patterns to identify mental fatigue or high-flow states.</p>
          </div>
          <div className="lp-step-card">
            <div className="lp-step-num">03</div>
            <div className="lp-step-icon">✨</div>
            <h3>Personalize Care</h3>
            <p>Receive tailored mindfulness exercises and cognitive rest routines based on your unique profile.</p>
          </div>
        </div>
      </section>

      {/* Game-Changer Features */}
      <section className="lp-section lp-features">
        <div className="lp-section-header">
          <div className="lp-badge tertiary">Game-Changer Features</div>
          <h2>Deep clinical insights wrapped in a high-fidelity digital sanctuary.</h2>
        </div>
        <div className="lp-features-grid">
          <div className="lp-feature-card large">
            <div className="lp-feature-icon">🗺️</div>
            <h3>Neural Mapping</h3>
            <p>Visualize your brain's performance across 5 key dimensions: Focus, Memory, Flexibility, Speed, and Calm.</p>
            <div className="lp-dimension-chips">
              {['Focus', 'Memory', 'Flexibility', 'Speed', 'Calm'].map(d => (
                <span key={d} className="lp-chip">{d}</span>
              ))}
            </div>
          </div>
          <div className="lp-feature-card">
            <div className="lp-feature-icon">🤝</div>
            <h3>Community Challenges</h3>
            <p>Engage with others in low-stress cognitive trials to build community resilience together.</p>
          </div>
          <div className="lp-feature-card">
            <div className="lp-feature-icon">🔒</div>
            <h3>Privacy First</h3>
            <p>Your cognitive data is end-to-end encrypted. You own your mind, we just provide the map.</p>
          </div>
        </div>
      </section>

      {/* Experience the Flow */}
      <section className="lp-flow-section">
        <div className="lp-flow-content">
          <div className="lp-badge">Experience the Flow</div>
          <h2>Every NeuroPlay session is designed to be a "moment of flow"</h2>
          <p>A perfect balance between challenge and relaxation that resets your nervous system.</p>
          <button className="lp-btn-primary large" onClick={() => navigate('/auth')}>
            Start for Free →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="lp-footer">
        <div className="lp-footer-brand">NeuroPlay</div>
        <p className="lp-footer-tagline">The Fluid Sanctuary.</p>
        <div className="lp-footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Support</a>
        </div>
        <p className="lp-footer-copy">© 2024 NeuroPlay. The Fluid Sanctuary.</p>
      </footer>

    </div>
  );
}
