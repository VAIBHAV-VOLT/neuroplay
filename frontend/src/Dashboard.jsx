import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const GAMES = [
  { id: 'word-rush', title: 'Word Rush', description: 'Enhance your vocabulary & speed', icon: '📝', color: '#dac9ff' },
  { id: 'pattern-recall', title: 'Pattern Recall', description: 'Train your short-term memory', icon: '🧩', color: '#c8ffe1' },
  { id: 'mood-canvas', title: 'Mood Canvas', description: 'Reflect, paint & relax', icon: '🎨', color: '#6ba0ff33' },
  { id: 'focus-breath', title: 'Focus Breath', description: 'Guided breathing sessions', icon: '🌬️', color: '#6bffc144' },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-brand">NeuroPlay</div>
        <button className="logout-btn" onClick={handleLogout}>Log Out</button>
      </nav>

      <main className="dashboard-main">
        {/* Left Column: Welcome & Progress */}
        <section className="welcome-section">
          <div className="welcome-card glass-card">
            <h1>Good Morning!</h1>
            <p className="subtitle">Ready to continue your journey?</p>

            <div className="streak-indicator">
              <div className="streak-ring">
                <span className="streak-number">5</span>
                <span className="streak-label">Day Streak</span>
              </div>
            </div>

            <button className="primary-action-btn" onClick={() => navigate('/game/word-rush')}>
              Start Daily Session →
            </button>
          </div>
        </section>

        {/* Right Column: Game Grid */}
        <section className="games-section">
          <h2 className="section-title">Therapeutic Exercises</h2>
          <div className="games-grid">
            {GAMES.map((game) => (
              <div
                key={game.id}
                className="game-card"
                onClick={() => navigate(`/game/${game.id}`)}
                style={{ '--card-accent': game.color }}
              >
                <div className="game-icon">{game.icon}</div>
                <div className="game-info">
                  <h3>{game.title}</h3>
                  <p>{game.description}</p>
                </div>
                <span className="game-arrow">→</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
