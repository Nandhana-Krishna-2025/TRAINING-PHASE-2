import { useEffect, useRef, useState } from "react";
import TimerControls from "./TimerContrils";
import TimerDisplay from "./TimerDisplay";

function Countdown() {
  const initialTime = 30; 
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

 
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  
  const start = () => {
    if (timeLeft > 0) setIsRunning(true);
  };

  const pause = () => setIsRunning(false);

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  const stop = () => {
    setIsRunning(false);
    setTimeLeft(0);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold text-center mb-4">Countdown Timer</h2>
      <TimerDisplay timeLeft={timeLeft} />
      <TimerControls onStart={start} onPause={pause} onReset={reset} onStop={stop} isRunning={isRunning} />
    </div>
  );
}

export default Countdown;
