import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Game.css';

export default function Game() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentWord, setCurrentWord] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [words, setWords] = useState(['Focus', 'Calm', 'Resilient', 'Flow', 'Serenity', 'Clarity', 'Mindful', 'Zen', 'Peace', 'Pulse', 'Stillness', 'Growth']);
  
  const timerRef = useRef(null);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(60);
    setNextWord();
    setInputValue('');
  };

  const setNextWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
  };

  const handleInput = (e) => {
    const val = e.target.value;
    setInputValue(val);
    
    if (val.toLowerCase() === currentWord.toLowerCase()) {
      setScore(prev => prev + 10);
      setInputValue('');
      setNextWord();
    }
  };

  return (
    <div className="game-wrapper">
      <nav className="game-nav">
        <button className="game-back-btn" onClick={() => navigate('/dashboard')}>
          ← Dashboard
        </button>
        <div className="game-title-badge">
          {id?.replace('-', ' ').toUpperCase()}
        </div>
        <div className="game-score-box">
          <span className="label">Score</span>
          <span className="value">{score}</span>
        </div>
      </nav>

      <main className="game-container glass-card">
        {!isPlaying ? (
          <div className="game-intro">
            <div className="game-icon-large">📝</div>
            <h1>Word Rush</h1>
            <p>Focus your mind and type the words as they appear. Speed and accuracy build cognitive resilience.</p>
            {timeLeft === 0 && (
              <div className="game-results">
                <h2>Session Complete</h2>
                <div className="final-score">{score}</div>
                <p>Cognitive load reduced by 8%</p>
              </div>
            )}
            <button className="game-start-btn" onClick={startGame}>
              {timeLeft === 0 ? 'Try Again' : 'Begin Session'}
            </button>
          </div>
        ) : (
          <div className="game-play">
            <div className="timer-ring">
              <svg viewBox="0 0 100 100">
                <circle className="bg" cx="50" cy="50" r="45" />
                <circle 
                  className="progress" 
                  cx="50" cy="50" r="45" 
                  style={{ strokeDashoffset: (283 * (1 - timeLeft/60)) }}
                />
              </svg>
              <div className="timer-text">{timeLeft}s</div>
            </div>

            <div className="target-word-container">
               <h2 className="target-word">{currentWord}</h2>
            </div>

            <input
              type="text"
              className="game-input"
              value={inputValue}
              onChange={handleInput}
              autoFocus
              placeholder="Type here..."
            />
            
            <p className="game-tip">Stay focused on the letters. Breathe steady.</p>
          </div>
        )}
      </main>

      <footer className="game-footer">
        <p>"Flow is the state where challenge meets capability."</p>
      </footer>
    </div>
  );
}
