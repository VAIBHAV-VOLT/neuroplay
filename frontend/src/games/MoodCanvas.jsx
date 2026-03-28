import React, { useState, useEffect } from 'react';

const STEPS = [
  {
    title: "How does your mind feel right now?",
    options: [
      { id: 'sunny', label: 'Clear & Bright', icon: 'light_mode', color: 'text-tertiary-container', bg: 'bg-tertiary' },
      { id: 'cloudy', label: 'A Bit Foggy', icon: 'cloud', color: 'text-surface-dim', bg: 'bg-surface-variant' },
      { id: 'stormy', label: 'Overwhelmed', icon: 'thunderstorm', color: 'text-primary-container', bg: 'bg-primary' }
    ]
  },
  {
    title: "What is your internal rhythm?",
    options: [
      { id: 'lofi', label: 'Slow & Steady', icon: 'headphones', color: 'text-secondary-container', bg: 'bg-secondary' },
      { id: 'jazz', label: 'Unpredictable', icon: 'piano', color: 'text-error-container', bg: 'bg-error' },
      { id: 'electronic', label: 'High Energy', icon: 'bolt', color: 'text-primary-fixed', bg: 'bg-primary-dim' }
    ]
  },
  {
    title: "Choose a color that grounds you.",
    options: [
      { id: 'warm', label: 'Warm & Cozy', icon: 'local_fire_department', color: 'text-error', bg: 'bg-error-container' },
      { id: 'cool', label: 'Cool & Distant', icon: 'water_drop', color: 'text-primary', bg: 'bg-primary-container' },
      { id: 'mono', label: 'Neutral', icon: 'contrast', color: 'text-on-surface-variant', bg: 'bg-surface-container-high' }
    ]
  }
];

export default function MoodCanvas({ onComplete }) {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState([]);
  const [stepStartTime, setStepStartTime] = useState(Date.now());
  const [timeTaken, setTimeTaken] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      const avgTime = timeTaken / Math.max(step, 1);
      
      // Compute specialized mood tracking metrics
      const moodType = selections[0] || 'Neutral'; // e.g. 'sunny', 'cloudy', 'stormy'
      const moodIntensity = selections.length 
        ? (selections.includes('stormy') || selections.includes('electronic') ? 8 : 4) 
        : 0;

      onComplete({
        focus_score: avgTime < 2500 ? 95 : 70, 
        reaction_time: Math.round(avgTime),
        mood_type: moodType.charAt(0).toUpperCase() + moodType.slice(1),
        mood_intensity: moodIntensity,
        mood_response_time: Number((avgTime / 1000).toFixed(2))
      });
    }
  }, [timeLeft, step, timeTaken]);

  const handleSelect = (optionId) => {
    const elapsed = Date.now() - stepStartTime;
    setTimeTaken(prev => prev + elapsed);
    
    const newSelections = [...selections, optionId];
    setSelections(newSelections);
    
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
      setStepStartTime(Date.now());
    } else {
      // User completed all 3 steps manually — calc mood metrics from their answers
      const finalSelections = [...selections, optionId];
      const avgTime = (timeTaken + elapsed) / STEPS.length;
      const moodType = finalSelections[0] || 'Neutral';
      const moodIntensity = finalSelections.includes('stormy') || finalSelections.includes('electronic') ? 8
        : finalSelections.includes('cloudy') || finalSelections.includes('jazz') ? 5 : 3;

      onComplete({
        focus_score: avgTime < 2500 ? 95 : 70,
        reaction_time: Math.round(avgTime),
        mood_type: moodType.charAt(0).toUpperCase() + moodType.slice(1),
        mood_intensity: moodIntensity,
        mood_response_time: Number((avgTime / 1000).toFixed(2))
      });
    }
  };

  const current = STEPS[step];

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full max-w-lg mx-auto h-full animate-fade-in-up relative pt-20">
      <div className="absolute top-4 left-4 z-10 bg-surface-container-low px-4 py-2 rounded-full font-bold text-on-surface-variant shadow-sm border border-surface-container">
        00:{timeLeft.toString().padStart(2, '0')}
      </div>
      
      <div className="flex gap-3 mb-12">
        {STEPS.map((_, i) => (
          <div key={i} className={`h-2 rounded-full transition-all duration-500 ${i <= step ? 'w-10 bg-primary' : 'w-4 bg-surface-container-high'}`} />
        ))}
      </div>
      
      <h2 className="text-3xl font-headline font-bold text-center text-on-surface mb-10">
        {current.title}
      </h2>
      
      <div className="flex flex-col gap-4 w-full">
        {current.options.map(opt => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt.id)}
            className="flex items-center gap-6 p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high hover:border-primary/50 shadow-sm hover:shadow-md transition-all active:scale-95 group"
          >
            <div className={`w-14 h-14 rounded-full ${opt.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
              <span className={`material-symbols-outlined text-2xl ${opt.color}`}>{opt.icon}</span>
            </div>
            <span className="font-bold text-xl text-on-surface">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
