function TimerDisplay({ timeLeft }) {
  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="text-4xl font-mono text-center mb-4">
      {hours}:{minutes}:{seconds}
    </div>
  );
}

export default TimerDisplay;

