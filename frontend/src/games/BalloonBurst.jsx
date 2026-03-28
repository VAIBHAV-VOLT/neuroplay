import React, { useState, useEffect, useRef } from 'react';

const COLORS = [
  { type: 'single', bg: 'bg-primary-container', iconColor: 'text-primary', icon: 'radio_button_unchecked', health: 1 },
  { type: 'double', bg: 'bg-secondary-container', iconColor: 'text-secondary', icon: 'lens', health: 2 },
  { type: 'triple', bg: 'bg-error-container', iconColor: 'text-error', icon: 'star', health: 3 }
];

export default function BalloonBurst({ onComplete }) {
  const [balloons, setBalloons] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  
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
        };
        setBalloons(prev => [...prev, newBalloon]);
      }, 700); // spawn every 700ms
      
      return () => {
        clearInterval(timer);
        clearInterval(spawner);
      };
    } else if (timeLeft === 0) {
      onComplete({
        focus_score: score,
        reaction_time: 0,
        error_rate: missed
      });
    }
  }, [timeLeft, score, missed]);

  const handleTap = (id) => {
    setBalloons(prev => prev.map(b => {
      if (b.id === id) {
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
    <div className="relative w-full h-[500px] overflow-hidden rounded-[2rem] bg-surface-container-low border border-surface-container shadow-inner animate-fade-in-up" ref={containerRef}>
      <div className="absolute top-4 left-4 z-10 bg-tertiary-container/80 backdrop-blur-sm px-6 py-2 rounded-full font-bold text-tertiary shadow-sm">
        00:{timeLeft.toString().padStart(2, '0')}
      </div>
      <div className="absolute top-4 right-4 z-10 bg-primary-container/80 backdrop-blur-sm px-6 py-2 rounded-full font-bold text-primary shadow-sm">
        {score} pts
      </div>
      
      {balloons.map(b => (
        <button
          key={b.id}
          onClick={() => handleTap(b.id)}
          className={`absolute bottom-0 w-20 h-24 rounded-t-[50%] rounded-b-[40%] ${b.bg} transform -translate-x-1/2 shadow-lg transition-transform active:scale-90 cursor-crosshair`}
          style={{ 
            left: `${b.left}%`,
            animation: `floatUp 3.5s linear forwards` 
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-70">
            <span className={`material-symbols-outlined text-3xl ${b.iconColor}`}>{b.icon}</span>
            <span className={`font-black text-lg ${b.iconColor}`}>{b.health}</span>
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
