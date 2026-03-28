import React, { useState, useEffect, useRef } from 'react';

const WORDS = "focus calm resilient flow serenity clarity mindful zen peace pulse stillness growth energy balance harmony insight aware pure breath grounding reflect vision anchor".split(" ");

export default function WordRush({ onComplete }) {
  const [timeLeft, setTimeLeft] = useState(25);
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
  const [incorrectKeystrokes, setIncorrectKeystrokes] = useState(0);
  
  const inputRef = useRef(null);

  useEffect(() => {
    // Generate a sequence of 60 words
    const randomWords = [];
    for(let i=0; i<60; i++) randomWords.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setWords(randomWords);
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      // End game
      const accuracy = correctKeystrokes + incorrectKeystrokes > 0 
        ? Math.round((correctKeystrokes / (correctKeystrokes + incorrectKeystrokes)) * 100) 
        : 0;
      const wpm = Math.round((correctKeystrokes / 5) / (25 / 60));
      onComplete({ typing_speed: wpm, error_rate: 100 - accuracy, focus_score: wpm + accuracy });
    }
  }, [timeLeft, correctKeystrokes, incorrectKeystrokes, onComplete]);

  const handleChange = (e) => {
    const val = e.target.value;
    if (val.endsWith(' ')) {
      // Space pressed, validate word
      const trimmed = val.trim();
      if (trimmed === words[currentWordIndex]) {
        setCorrectKeystrokes(prev => prev + trimmed.length + 1);
      } else {
        setIncorrectKeystrokes(prev => prev + 1);
      }
      setUserInput('');
      setCurrentWordIndex(prev => prev + 1);
    } else {
      setUserInput(val);
      const targetPrefix = words[currentWordIndex]?.substring(0, val.length);
      if (val !== targetPrefix) {
        setIncorrectKeystrokes(prev => prev + 1);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full animate-fade-in-up px-4">
      <div className="absolute top-4 right-4 bg-tertiary-container/30 px-4 py-2 rounded-full font-bold text-tertiary">
        00:{timeLeft.toString().padStart(2, '0')}
      </div>
      
      <div className="text-3xl font-headline flex gap-3 flex-wrap justify-center mb-12 h-32 overflow-hidden text-center leading-[3rem]">
        {words.slice(currentWordIndex, currentWordIndex + 15).map((word, i) => {
          if (i === 0) { // Active word
            return (
              <span key={i} className="text-primary border-b-4 border-primary mx-2">
                {word.split('').map((char, charIdx) => {
                  let color = "text-on-surface-variant font-bold";
                  if (charIdx < userInput.length) {
                    color = userInput[charIdx] === char ? "text-primary brightness-150" : "text-error";
                  }
                  return <span key={charIdx} className={color}>{char}</span>;
                })}
              </span>
            );
          }
          return <span key={i} className="text-surface-dim font-medium mx-2">{word}</span>;
        })}
      </div>
      <input
        ref={inputRef}
        type="text"
        className="game-input bg-surface-container-low border-none rounded-xl px-8 py-5 text-2xl shadow-inner focus:ring-4 focus:ring-primary/20 outline-none text-center w-full max-w-sm text-on-surface"
        value={userInput}
        onChange={handleChange}
        autoFocus
        placeholder="..."
        spellCheck="false"
      />
      <p className="mt-8 text-on-surface-variant text-sm flex gap-2 items-center">
        <span className="material-symbols-outlined text-sm">keyboard</span>
        Type the active word and hit SPACE to submit
      </p>
    </div>
  );
}
