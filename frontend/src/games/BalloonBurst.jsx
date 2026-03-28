import React, { useState, useEffect, useRef } from 'react';

const COLORS = [
  { type: 'single', bg: 'bg-primary-container', iconColor: 'text-primary', icon: 'circle', health: 1 },
  { type: 'double', bg: 'bg-secondary-container', iconColor: 'text-secondary', icon: 'change_history', health: 2 },
  { type: 'triple', bg: 'bg-error-container', iconColor: 'text-error', icon: 'star', health: 3 }
];

export default function BalloonBurst({ onComplete }) {
  const [balloons, setBalloons] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [wrongTaps, setWrongTaps] = useState(0);
  const [totalReactionTime, setTotalReactionTime] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  
  const idCounter = useRef(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      
      const spawner = setInterval(() => {
        const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        const newBalloon = {
          id: idCounter.current++,
          ...randomColor,
          left: Math.floor(Math.random() * 80) + 10,
          spawnTime: Date.now()
        };
        setBalloons(prev => [...prev, newBalloon]);
      }, 700); // spawn every 700ms
      
      const cleaner = setInterval(() => {
        setBalloons(prev => {
          const now = Date.now();
          let missedCount = 0;
          const kept = prev.filter(b => {
             if (now - b.spawnTime > 3500) {
                missedCount++;
                return false;
             }
             return true;
          });
          if (missedCount > 0) setMissed(m => m + missedCount);
          return kept;
        });
      }, 500);
      
      return () => {
        clearInterval(timer);
        clearInterval(spawner);
        clearInterval(cleaner);
      };
    } else if (timeLeft === 0) {
      const avgReaction = tapCount > 0 ? totalReactionTime / tapCount : 0;
      const consistency = (tapCount / Math.max(1, tapCount + wrongTaps + missed)) * 100;
      
      onComplete({
        focus_score: score,
        reaction_time: Math.round(avgReaction),
        wrong_time: wrongTaps * 0.5, // Calculate literal equivalent wasted time (penalty)
        missed_targets: missed,
        consistency_score: Math.round(Math.max(0, consistency))
      });
    }
  }, [timeLeft, score, missed, wrongTaps, tapCount, totalReactionTime]);

  const handleContainerTap = () => {
     setWrongTaps(prev => prev + 1);
  };

  const handleTap = (id, e) => {
    e.stopPropagation();
    setBalloons(prev => prev.map(b => {
      if (b.id === id) {
        setTotalReactionTime(prevRT => prevRT + (Date.now() - b.spawnTime));
        setTapCount(prevTC => prevTC + 1);
        if (b.health - 1 <= 0) {
          setScore(s => s + (b.type === 'triple' ? 30 : b.type === 'double' ? 20 : 10));
          return null; 
        }
        return { ...b, health: b.health - 1 };
      }
      return b;
    }).filter(Boolean));
  };

  return (
    <div 
      className="relative w-full h-[500px] overflow-hidden rounded-[2rem] bg-surface-container-low border border-surface-container shadow-inner animate-fade-in-up cursor-default" 
      ref={containerRef}
      onMouseDown={handleContainerTap}
    >
      <div className="absolute top-4 left-4 z-10 bg-tertiary-container/80 backdrop-blur-sm px-6 py-2 rounded-full font-bold text-tertiary shadow-sm">
        00:{timeLeft.toString().padStart(2, '0')}
      </div>
      <div className="absolute top-4 right-4 z-10 bg-primary-container/80 backdrop-blur-sm px-6 py-2 rounded-full font-bold text-primary shadow-sm">
        {score} pts
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-6 left-6 z-10 flex flex-col gap-3 bg-surface/90 backdrop-blur-md p-4 rounded-3xl border border-surface-variant shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest pl-1">Targets</h3>
        <div className="flex flex-col gap-2">
          {COLORS.map(c => (
            <div key={c.type} className="flex items-center gap-3 text-sm">
              <div className={`w-8 h-8 rounded-full ${c.bg} flex items-center justify-center shadow-inner`}>
                  <span className={`material-symbols-outlined text-[18px] ${c.iconColor}`}>{c.icon}</span>
              </div>
              <span className="text-on-surface font-bold">{c.health} {c.health === 1 ? 'Tap' : 'Taps'}</span>
            </div>
          ))}
        </div>
      </div>
      
      {balloons.map(b => (
        <button
          key={b.id}
          onMouseDown={(e) => handleTap(b.id, e)}
          className={`absolute bottom-0 w-20 h-24 rounded-t-[50%] rounded-b-[40%] ${b.bg} transform -translate-x-1/2 shadow-lg transition-transform active:scale-90 cursor-crosshair`}
          style={{ 
            left: `${b.left}%`,
            animation: `floatUp 3.5s linear forwards` 
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-70">
            <span className={`material-symbols-outlined text-4xl ${b.iconColor}`}>{b.icon}</span>
          </div>
          <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-3 rounded-full ${b.bg} shadow-sm`} />
        </button>
      ))}
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatUp {
          0% { bottom: -20%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { bottom: 120%; opacity: 0; }
        }
      `}} />
    </div>
  );
}
