import React, { useState, useEffect, useRef } from 'react';

const WORDS = "focus calm resilient flow serenity clarity mindful zen peace pulse stillness growth energy balance harmony insight aware pure breath grounding reflect vision anchor".split(" ");

export default function WordRush({ onComplete }) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [wordResults, setWordResults] = useState([]);
  
  // Metrics
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
  const [incorrectKeystrokes, setIncorrectKeystrokes] = useState(0);
  const [backspaceCount, setBackspaceCount] = useState(0);
  
  // Pause Time tracking
  const [lastKeystrokeTime, setLastKeystrokeTime] = useState(null);
  const [totalPauseTime, setTotalPauseTime] = useState(0);
  const [keystrokeCount, setKeystrokeCount] = useState(0);

  const inputRef = useRef(null);

  useEffect(() => {
    // Generate a sequence of 300 words
    const randomWords = [];
    for(let i=0; i<300; i++) randomWords.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setWords(randomWords);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Game completion
  useEffect(() => {
    if (timeLeft === 0) {
      // Calculate final metrics
      const accuracy = correctKeystrokes + incorrectKeystrokes > 0 
        ? Math.round((correctKeystrokes / (correctKeystrokes + incorrectKeystrokes)) * 100) 
        : 0;
      const wpm = Math.round((correctKeystrokes / 5) / (30 / 60)); // 30 seconds
      const avgPauseTime = keystrokeCount > 0 ? (totalPauseTime / keystrokeCount) / 1000 : 0;

      onComplete({ 
        typing_speed: wpm, 
        error_rate: 100 - accuracy, 
        focus_score: wpm + accuracy,
        backspace_count: backspaceCount,
        pause_time: parseFloat(avgPauseTime.toFixed(2))
      });
    }
  }, [timeLeft, correctKeystrokes, incorrectKeystrokes, onComplete, backspaceCount, keystrokeCount, totalPauseTime]);

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      setBackspaceCount(prev => prev + 1);
    }
  };

  const handleChange = (e) => {
    const now = Date.now();
    if (lastKeystrokeTime) {
      setTotalPauseTime(prev => prev + (now - lastKeystrokeTime));
      setKeystrokeCount(prev => prev + 1);
    }
    setLastKeystrokeTime(now);

    const val = e.target.value;
    if (val.endsWith(' ')) {
      // Space pressed, validate word
      const trimmed = val.trim();
      const isCorrect = trimmed === words[currentWordIndex];
      if (isCorrect) {
        setCorrectKeystrokes(prev => prev + trimmed.length + 1);
      } else {
        setIncorrectKeystrokes(prev => prev + 1);
      }
      setWordResults(prev => {
        const arr = [...prev];
        arr[currentWordIndex] = isCorrect ? 'correct' : 'incorrect';
        return arr;
      });
      setUserInput('');
      setCurrentWordIndex(prev => prev + 1);
    } else {
      setUserInput(val);
      const targetPrefix = words[currentWordIndex]?.substring(0, val.length);
      if (val !== targetPrefix) {
        setIncorrectKeystrokes(prev => prev + 1);
      } else if (val.length > userInput.length) {
        setCorrectKeystrokes(prev => prev + 1);
      }
    }
  };

  // Keep input focused
  const handleWrapperClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className="relative flex flex-col items-center justify-center w-full h-[500px] sm:h-full animate-fade-in-up px-4 py-20 bg-surface-container-lowest rounded-3xl cursor-text shadow-[0px_20px_40px_rgba(0,88,185,0.08)]"
      onClick={handleWrapperClick}
    >
      <div className="absolute top-6 left-8 bg-surface-container-low px-4 py-2 rounded-full font-bold text-on-surface-variant z-10">
        Time: 00:{timeLeft.toString().padStart(2, '0')}
      </div>
      
      <div className="w-full max-w-4xl text-4xl font-headline flex gap-4 flex-wrap justify-center mb-12 min-h-[12rem] leading-[4rem] px-8">
        {(() => {
          const windowStart = Math.floor(currentWordIndex / 15) * 15;
          return words.slice(windowStart, windowStart + 15).map((word, i) => {
            const actualIndex = windowStart + i;
            const isActive = actualIndex === currentWordIndex;
            const isPassed = actualIndex < currentWordIndex;

            if (isActive) { // Active word
              return (
                <span key={i} className="flex relative mx-2">
                  {word.split('').map((char, charIdx) => {
                    let color = "text-on-surface-variant/40"; // upcoming
                    if (charIdx < userInput.length) {
                      color = userInput[charIdx] === char ? "text-tertiary" : "text-error";
                    }
                    
                    // Blinking caret on the current letter
                    const isCurrentCaret = charIdx === userInput.length;
                    
                    return (
                      <span key={charIdx} className={`relative ${color} transition-colors duration-200`}>
                        {isCurrentCaret && (
                          <span className="absolute -left-[2px] top-1/2 -translate-y-1/2 h-[38px] w-[3px] bg-tertiary animate-pulse rounded-full" />
                        )}
                        {char}
                      </span>
                    );
                  })}
                  {/* Caret when at the end of the word */}
                  {userInput.length === word.length && (
                    <span className="absolute -right-[2px] top-1/2 -translate-y-1/2 h-[38px] w-[3px] bg-tertiary animate-pulse rounded-full" />
                  )}
                </span>
              );
            }
            
            let staticColor = "text-on-surface-variant/40";
            if (isPassed) {
              staticColor = wordResults[actualIndex] === 'correct' ? "text-tertiary opacity-80" : "text-error";
            }
            return <span key={i} className={`${staticColor} mx-2 transition-colors duration-200`}>{word}</span>;
          });
        })()}
      </div>
      
      {/* Hidden input field capturing typing */}
      <input
        ref={inputRef}
        type="text"
        className="opacity-0 absolute inset-0 w-full h-full pointer-events-none"
        value={userInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoFocus
        autoComplete="off"
        spellCheck="false"
        disabled={timeLeft === 0}
      />
      
      <p className="absolute bottom-6 text-on-surface-variant/60 text-sm flex gap-2 items-center">
        <span className="material-symbols-outlined text-sm">keyboard</span>
        Start typing to begin. Press SPACE to advance to next word.
      </p>
    </div>
  );
}
