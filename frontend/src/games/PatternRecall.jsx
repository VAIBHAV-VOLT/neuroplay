import React, { useState, useEffect } from 'react';

export default function PatternRecall({ onComplete }) {
  const [round, setRound] = useState(1);
  const [pattern, setPattern] = useState([]);
  const [userSelection, setUserSelection] = useState([]);
  const [showPattern, setShowPattern] = useState(true);
  const [gridSize] = useState(16); // 4x4 grid
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [totalReactionTime, setTotalReactionTime] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  const generatePattern = (size, count) => {
    const newPattern = [];
    while(newPattern.length < count) {
      const r = Math.floor(Math.random() * size);
      if(!newPattern.includes(r)) newPattern.push(r);
    }
    return newPattern;
  };

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      onComplete({
        focus_score: score,
        reaction_time: round > 1 ? Math.round(totalReactionTime / round) : 0,
        error_rate: round > 1 ? Math.round((mistakes / round) * 100) : 0
      });
    }
  }, [timeLeft, score, totalReactionTime, round, mistakes]);

  useEffect(() => {
    if (timeLeft > 0) {
      const count = Math.min(round + 2, 8); // Cap pattern at 8
      setPattern(generatePattern(gridSize, count));
      setUserSelection([]);
      setShowPattern(true);
      
      const displayTime = Math.max(800, 2000 - (round * 200)); // Gets faster every round
      const timer = setTimeout(() => {
        setShowPattern(false);
        setStartTime(Date.now());
      }, displayTime);
      return () => clearTimeout(timer);
    }
  }, [round, gridSize]);

  const handleCellClick = (index) => {
    if (showPattern) return;
    
    // First interaction records reaction time
    if (userSelection.length === 0 && startTime) {
      setTotalReactionTime(prev => prev + (Date.now() - startTime));
    }

    const newSelection = [...userSelection, index];
    setUserSelection(newSelection);

    if (newSelection.length === pattern.length) {
      // Validate
      const isCorrect = pattern.every(v => newSelection.includes(v)); // Sets match
      if (isCorrect) {
        setScore(prev => prev + (round * 50));
      } else {
        setMistakes(prev => prev + 1);
      }
      
      setTimeout(() => setRound(r => r + 1), 600); // Small pause before next round
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full h-full animate-fade-in-up relative pt-16">
      <div className="absolute top-4 left-4 z-10 bg-surface-container-low px-4 py-2 rounded-full font-bold text-on-surface-variant shadow-sm border border-surface-container">
        00:{timeLeft.toString().padStart(2, '0')}
      </div>
      
      <div className="flex items-center justify-between w-full max-w-sm mb-8">
        <h2 className="text-xl font-headline font-bold text-on-surface">Round {round}</h2>
        <span className="text-secondary font-bold bg-secondary-container/30 px-3 py-1 rounded-full">{score} pts</span>
      </div>
      
      <p className={`text-sm tracking-widest uppercase font-bold mb-8 transition-colors ${showPattern ? 'text-primary' : 'text-error'}`}>
        {showPattern ? "Memorize the pattern..." : "Recall the pattern!"}
      </p>
      
      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: gridSize }).map((_, i) => {
          const isTarget = pattern.includes(i);
          const isSelected = userSelection.includes(i);
          
          let bgClass = "bg-surface-container-high border-2 border-surface shadow-inner";
          if (showPattern && isTarget) bgClass = "bg-primary border-primary-container shadow-lg scale-105";
          else if (isSelected) {
            bgClass = isTarget ? "bg-tertiary" : "bg-error";
          }

          return (
            <button
              key={i}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl transition-all duration-300 ${bgClass} active:scale-95`}
              onClick={() => handleCellClick(i)}
              disabled={showPattern || isSelected}
            />
          );
        })}
      </div>
    </div>
  );
}
