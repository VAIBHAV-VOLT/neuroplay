import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WordRush from './games/WordRush';
import PatternRecall from './games/PatternRecall';
import MoodCanvas from './games/MoodCanvas';
import BalloonBurst from './games/BalloonBurst';

export default function Game() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionData, setSessionData] = useState(null);

  const getGameConfig = () => {
    switch(id) {
      case 'word-rush': return { title: 'Word Rush', desc: 'Focus your mind and type the words as they appear.', icon: 'translate', Component: WordRush };
      case 'pattern-recall': return { title: 'Pattern Recall', desc: 'Memorize the highlighted grid and replicate the sequence.', icon: 'grid_view', Component: PatternRecall };
      case 'mood-canvas': return { title: 'Mood Canvas', desc: 'Map your internal state through sequential choices.', icon: 'palette', Component: MoodCanvas };
      case 'balloon-burst': return { title: 'Balloon Burst', desc: 'Pop balloons by tapping them their required number of times.', icon: 'bolt', Component: BalloonBurst };
      default: return { title: 'Unknown Phase', desc: 'Mini-game not found', icon: 'error', Component: () => <div className="text-error">Game Not Found</div>};
    }
  };

  const { title, desc, icon, Component } = getGameConfig();

  const handleGameComplete = async (resultData) => {
    setIsPlaying(false);
    setSessionData(resultData);
    
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch(`http://localhost:5000/game/submit-data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({
            game_type: id,
            score: resultData.focus_score || 0,
            typing_speed: resultData.typing_speed || 0,
            error_rate: resultData.error_rate || 0,
            reaction_time: resultData.reaction_time || 0,
            focus_score: resultData.focus_score || 0
          })
        });
      }
    } catch (e) {
      console.error("Failed to submit game data", e);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-body selection:bg-primary-container">
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-[0_20_40px_rgba(0,88,185,0.08)] h-16 flex items-center px-6">
        <button 
          className="flex items-center gap-2 text-primary font-bold hover:bg-primary-container/20 px-4 py-2 rounded-full transition-colors active:scale-95"
          onClick={() => navigate('/dashboard')}
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Dashboard
        </button>
        <div className="mx-auto font-headline font-bold text-lg hidden sm:block text-slate-800">
          {title}
        </div>
        <div className="w-[100px] hidden sm:block"></div> {/* Spacer for centering */}
      </nav>

      <main className="flex-1 flex items-center justify-center p-6 pt-24 max-w-4xl mx-auto w-full">
        <div className="w-full glass-card bg-surface-container-lowest/80 backdrop-blur-2xl border border-white/50 shadow-[0_40_80px_rgba(0,88,185,0.08)] rounded-[2.5rem] p-8 md:p-12 min-h-[500px] flex flex-col relative overflow-hidden">
          
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary-container/30 rounded-full blur-3xl animate-pulse-slow pointer-events-none fade-in-up"></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-tertiary-container/20 rounded-full blur-3xl animate-float pointer-events-none fade-in-up"></div>

          {!isPlaying && !sessionData && (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in-up relative z-10 w-full">
              <div className="w-24 h-24 rounded-full bg-primary-container/20 flex items-center justify-center text-primary mb-8 shadow-inner">
                <span className="material-symbols-outlined text-5xl">{icon}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-headline font-extrabold mb-4 tracking-tight text-on-surface">{title}</h1>
              <p className="text-lg text-on-surface-variant max-w-md mb-12">{desc}</p>
              <button 
                className="bg-primary hover:bg-primary-dim text-on-primary px-10 py-4 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-all active:scale-95 hover:-translate-y-1"
                onClick={() => setIsPlaying(true)}
              >
                Begin Session
              </button>
            </div>
          )}

          {isPlaying && (
            <div className="flex-1 flex flex-col w-full h-full relative z-10">
              <Component onComplete={handleGameComplete} />
            </div>
          )}

          {!isPlaying && sessionData && (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in-up relative z-10">
              <div className="w-24 h-24 rounded-full bg-tertiary-container/30 flex items-center justify-center text-tertiary mb-8 shadow-inner">
                <span className="material-symbols-outlined text-5xl">check_circle</span>
              </div>
              <h2 className="text-5xl font-headline font-extrabold mb-4 tracking-tight text-on-surface">Session Complete</h2>
              <p className="text-on-surface-variant text-lg mb-10">Data successfully recorded to your profile.</p>
              
              <div className="grid grid-cols-2 gap-6 w-full max-w-md mb-12">
                <div className="bg-surface-container-low border border-surface-container p-6 rounded-3xl shadow-sm">
                  <span className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 font-label">Total Score</span>
                  <span className="text-4xl font-black text-primary font-headline">{sessionData.focus_score || 0}</span>
                </div>
                {sessionData.typing_speed ? (
                  <div className="bg-surface-container-low border border-surface-container p-6 rounded-3xl shadow-sm">
                    <span className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 font-label">WPM</span>
                    <span className="text-4xl font-black text-secondary font-headline">{sessionData.typing_speed}</span>
                  </div>
                ) : sessionData.reaction_time ? (
                  <div className="bg-surface-container-low border border-surface-container p-6 rounded-3xl shadow-sm">
                    <span className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 font-label">Reaction</span>
                    <span className="text-4xl font-black text-tertiary font-headline">{sessionData.reaction_time}ms</span>
                  </div>
                ) : (
                  <div className="bg-surface-container-low border border-surface-container p-6 rounded-3xl shadow-sm">
                    <span className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 font-label">Errors</span>
                    <span className="text-4xl font-black text-error font-headline">{sessionData.error_rate || 0}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <button 
                  className="bg-surface-container-highest hover:bg-surface-variant text-on-surface px-8 py-4 rounded-full font-bold transition-all active:scale-95"
                  onClick={() => setSessionData(null)}
                >
                  Play Again
                </button>
                <button 
                  className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold shadow-md hover:bg-primary-dim transition-all active:scale-95 hover:-translate-y-1"
                  onClick={() => navigate('/dashboard')}
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
