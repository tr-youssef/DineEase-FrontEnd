import { useState, useEffect } from "react";
import "./Clock.css";

function Clock() {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  function refreshClock() {
    setDate(new Date());
  }
  return <span className="Timer">{date.toLocaleTimeString()}</span>;
}
export default Clock;
