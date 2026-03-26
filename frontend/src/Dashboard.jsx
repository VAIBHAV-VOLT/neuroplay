import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const GAMES = [
  { id: 'word-rush', title: 'Word Rush', description: 'Enhance vocabulary & cognitive speed', icon: '📝', color: 'rgba(218, 201, 255, 0.4)' },
  { id: 'pattern-recall', title: 'Pattern Recall', description: 'Train your short-term memory', icon: '🧩', color: 'rgba(200, 255, 225, 0.4)' },
  { id: 'mood-canvas', title: 'Mood Canvas', description: 'Reflect, paint & relax', icon: '🎨', color: 'rgba(107, 160, 255, 0.2)' },
  { id: 'focus-breath', title: 'Focus Breath', description: 'Guided breathing sessions', icon: '🌬️', color: 'rgba(107, 255, 193, 0.2)' },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="db-container">
      <nav className="db-nav">
        <div className="db-nav-brand">NeuroPlay</div>
        <div className="db-nav-actions">
          <button className="db-nav-item">Games</button>
          <button className="db-nav-item">Insights</button>
          <button className="db-nav-item">Community</button>
          <button className="db-logout-btn" onClick={handleLogout}>Log Out</button>
        </div>
      </nav>

      <main className="db-main">
        <header className="db-header">
          <div className="db-welcome">
            <h1>Welcome back (from stitch), Alex</h1>
            <p className="db-subtitle">Your cognitive sanctuary is ready. Let's check your focus today.</p>
          </div>
        </header>

        <div className="db-grid">
          {/* Main Content Column */}
          <div className="db-content-main">
            <section className="db-highlight-card glass-card">
              <div className="db-card-header">
                <div className="db-badge">Ready for your clarity session?</div>
              </div>
              <h2>Just 5 minutes of mindful play can reduce your burnout score by up to 15% today.</h2>
              <button className="db-play-btn" onClick={() => navigate('/game/word-rush')}>
                Start Daily Session →
              </button>
            </section>

            <section className="db-games-section">
              <h2 className="db-section-title">Therapeutic Exercises</h2>
              <div className="db-games-grid">
                {GAMES.map((game) => (
                  <div
                    key={game.id}
                    className="db-game-card"
                    onClick={() => navigate(`/game/${game.id}`)}
                    style={{ '--card-accent': game.color }}
                  >
                    <div className="db-game-icon">{game.icon}</div>
                    <div className="db-game-info">
                      <h3>{game.title}</h3>
                      <p>{game.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar / Insights Column */}
          <div className="db-sidebar">
            <div className="db-stat-card glass-card">
              <div className="db-stat-label">Burnout Score</div>
              <div className="db-stat-value">Low</div>
              <div className="db-stat-desc">Optimal zone for cognitive play</div>
            </div>

            <div className="db-stat-card glass-card">
              <div className="db-stat-label">Weekly Mental Trends</div>
              <div className="db-stat-value">+12%</div>
              <div className="db-stat-desc">Average focus improvement</div>
            </div>

            <div className="db-insight-card glass-card">
              <h3>Focus Analysis</h3>
              <p>Your peaks of productivity occur between 9:00 AM and 11:30 AM. Schedule deep work during this window.</p>
              <button className="db-text-link">Explore Insights arrow_forward</button>
            </div>

            <div className="db-small-cards-row">
               <div className="db-mini-card glass-card">
                  <h4>Rest Quality</h4>
                  <p>Sleep consistency is up 4% this week.</p>
               </div>
               <div className="db-mini-card glass-card">
                  <h4>Social Battery</h4>
                  <p>Mood score +1.2 points.</p>
               </div>
            </div>

            <div className="db-promo-card glass-card">
              <div className="db-badge tertiary">New Play Available</div>
              <h3>Zen Gardens: Advanced Layering</h3>
            </div>
          </div>
        </div>
      </main>

      <footer className="db-footer">
        <div className="db-footer-links">
           <a href="#">Privacy Policy</a>
           <a href="#">Terms of Service</a>
           <a href="#">Contact Support</a>
        </div>
        <p>© 2024 Fluid Sanctuary. Your companion in growth.</p>
      </footer>
    </div>
  );
}
