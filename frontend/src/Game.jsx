import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Game.css';

const GAME_INFO = {
  'word-rush': { title: 'Word Rush', description: 'Enhance vocabulary & cognitive speed', icon: '📝' },
  'pattern-recall': { title: 'Pattern Recall', description: 'Train your short-term memory', icon: '🧩' },
  'mood-canvas': { title: 'Mood Canvas', description: 'Reflect, paint & relax', icon: '🎨' },
  'focus-breath': { title: 'Focus Breath', description: 'Guided breathing session', icon: '🌬️' },
};

export default function Game() {
  const { id } = useParams();
  const navigate = useNavigate();
  const game = GAME_INFO[id] || { title: id, description: 'Therapeutic Session', icon: '🧠' };

  return (
    <div className="game-container">
      <nav className="game-nav">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
        <div className="nav-brand">NeuroPlay</div>
      </nav>

      <main className="game-main">
        <div className="game-board glass-card">
          <div className="game-header-icon">{game.icon}</div>
          <h1>{game.title}</h1>
          <p className="subtitle">{game.description}</p>

          <div className="game-area">
            <div className="game-placeholder">
              <span>Game session will load here</span>
            </div>
          </div>

          <div className="game-actions">
            <button className="primary-action-btn">
              Start Game
            </button>
            <button className="secondary-action-btn" onClick={() => navigate('/dashboard')}>
              Choose Another
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
