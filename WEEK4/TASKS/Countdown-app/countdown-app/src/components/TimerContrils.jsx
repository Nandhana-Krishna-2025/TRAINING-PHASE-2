function TimerControls({ onStart, onPause, onReset, onStop, isRunning }) {
  return (
    <div className="flex gap-2 justify-center">
      {!isRunning ? (
        <button onClick={onStart} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Start
        </button>
      ) : (
        <button onClick={onPause} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
          Pause
        </button>
      )}

      <button onClick={onReset} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Reset
      </button>

      <button onClick={onStop} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Stop
      </button>
    </div>
  );
}

export default TimerControls;
