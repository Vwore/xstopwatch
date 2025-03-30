import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [second, setSecond] = useState(0);
  const timer = useRef(null);
  const [toggle, setToggle] = useState(true);
  const prevSecond = useRef(0);

  function handleStart(e) {
    e.preventDefault();
    timer.current = setInterval(() => {
      setSecond((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(timer.current);
    };
  }
  function handleRest(e) {
    e.preventDefault();
    setSecond(0);
    clearInterval(timer.current);
    timer.current = null;
  }
  function handleStop(e) {
    e.preventDefault();
    clearInterval(timer.current);
    timer.current = null;
    setToggle(!toggle);
  }
  function formatTime(second) {
    let sec = second % 60,
      min = Math.floor(second / 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  }
  return (
    <div className="App">
      <h1>Stopwatch</h1>
      <div>{formatTime(second)}</div>
      <form>
        {timer.current == null ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <button onClick={handleStop}>Stop</button>
        )}
        <button onClick={handleRest}>Reset</button>
      </form>
    </div>
  );
}

export default App;
