import { useEffect, useState } from 'react';
import PWABadge from './PWABadge.tsx';
import '@picocss/pico/css/pico.min.css';
import { BASE_TIMER, MAX_CYCLES, LONG_BREAK, SHORT_BREAK } from './constants.ts';
import { padString } from './pad-string.ts';

function App() {
  const [countdown, setCountdown] = useState(BASE_TIMER);
  const [currentCycle, setCurrentCycle] = useState(MAX_CYCLES);
  const [isBreak, setIsBreak] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  useEffect(() => {
    if (isPaused) return;
    const timeout = setTimeout(() => {
      if (countdown > 0) {
        // Countdown is still going
        setCountdown((prev) => prev - 1);
      } else {
        // We've finished the timer
        if (isBreak) {
          setIsBreak(false);
          console.log('reset to base timer');
          setCountdown(BASE_TIMER);
        } else {
          setIsBreak(true);
          const newTime = currentCycle > 0 ? SHORT_BREAK : LONG_BREAK;
          console.log(newTime == SHORT_BREAK ? 'short break' : 'long break');
          setCountdown(newTime);
          if (currentCycle > 0) {
            setCurrentCycle((prev) => prev - 1);
          } else {
            console.log('reset cycle');
            setCurrentCycle(MAX_CYCLES);
          }
        }
      }
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [countdown, currentCycle, isBreak, isPaused]);
  const minutes = padString(`${Math.floor(countdown / 60)}`);
  const seconds = padString(`${countdown % 60}`);

  function startTimer() {
    setIsPaused(false);
  }

  function stopTimer() {
    setIsPaused(true);
  }

  return (
    <main className="container-fluid">
      <article>
        <h2>
          {minutes}:{padString(`${seconds}`)}
        </h2>
        <h6>Current Cycle: {currentCycle}</h6>
        <h6>Is Break: {isBreak ? 'Break time!' : 'Do your work!'}</h6>
        <button onClick={() => startTimer()}>Start</button>
        <button onClick={() => stopTimer()}>Stop</button>
      </article>
      <PWABadge />
    </main>
  );
}

export default App;
