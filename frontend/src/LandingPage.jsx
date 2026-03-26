import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <nav className="landing-nav">
        <div className="nav-brand">NeuroPlay</div>
        <div className="nav-actions">
          <button className="nav-login-btn" onClick={() => navigate('/auth')}>Log In</button>
          <button className="primary-hero-btn small" onClick={() => navigate('/auth')}>Get Started</button>
        </div>
      </nav>

      <main className="landing-main">
        <div className="hero-section">
          <h1 className="hero-title">
            Your Sanctuary for <span className="highlight">Mental Fitness</span>
          </h1>
          <p className="hero-subtitle">
            Gamified cognitive exercises designed to reduce stress, improve memory, and bring clarity to your day.
          </p>
          <button className="primary-hero-btn" onClick={() => navigate('/auth')}>
            Start Your Journey →
          </button>
        </div>

        <div className="features-section">
          <div className="feature-card" onClick={() => navigate('/auth')}>
            <div className="feature-icon">🌿</div>
            <h3>Calming Environment</h3>
            <p>Experience a fluid, peaceful UI that breathes with you.</p>
          </div>
          <div className="feature-card" onClick={() => navigate('/auth')}>
            <div className="feature-icon">🧠</div>
            <h3>Cognitive Games</h3>
            <p>Engage in therapeutic exercises like Word Rush and Pattern Recall.</p>
          </div>
          <div className="feature-card" onClick={() => navigate('/auth')}>
            <div className="feature-icon">📈</div>
            <h3>Track Progress</h3>
            <p>Build healthy habits with daily streaks and personalized insights.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
