import React, { useState, useEffect } from 'react';

export default function PatternRecall({ onComplete }) {
  const [round, setRound] = useState(1);
  const [pattern, setPattern] = useState([]);
  const [userSelection, setUserSelection] = useState([]);
  const [showPattern, setShowPattern] = useState(true);
  const [gridSize] = useState(9); // 3x3 grid
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [totalReactionTime, setTotalReactionTime] = useState(0);

  const generatePattern = (size, count) => {
    const newPattern = [];
    while(newPattern.length < count) {
      const r = Math.floor(Math.random() * size);
      if(!newPattern.includes(r)) newPattern.push(r);
    }
    return newPattern;
  };

  useEffect(() => {
    if (round <= 4) {
      const count = round + 2; 
      setPattern(generatePattern(gridSize, count));
      setUserSelection([]);
      setShowPattern(true);
      
      const timer = setTimeout(() => {
        setShowPattern(false);
        setStartTime(Date.now());
      }, 2500); // 2.5s to memorize
      return () => clearTimeout(timer);
    } else {
      // Game Over immediately after round 4 logic
      onComplete({
        focus_score: score,
        reaction_time: Math.round(totalReactionTime / 4),
        error_rate: 0
      });
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
      }
      
      setTimeout(() => setRound(r => r + 1), 600); // Small pause before next round
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full h-full animate-fade-in-up">
      <div className="flex items-center justify-between w-full max-w-sm mb-8">
        <h2 className="text-xl font-headline font-bold text-on-surface">Round {round}/4</h2>
        <span className="text-secondary font-bold bg-secondary-container/30 px-3 py-1 rounded-full">{score} pts</span>
      </div>
      
      <p className={`text-sm tracking-widest uppercase font-bold mb-8 transition-colors ${showPattern ? 'text-primary' : 'text-error'}`}>
        {showPattern ? "Memorize the pattern..." : "Recall the pattern!"}
      </p>
      
      <div className="grid grid-cols-3 gap-4">
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
              className={`w-20 h-20 sm:w-28 sm:h-28 rounded-2xl transition-all duration-300 ${bgClass} active:scale-95`}
              onClick={() => handleCellClick(i)}
              disabled={showPattern || isSelected}
            />
          );
        })}
      </div>
    </div>
  );
}
