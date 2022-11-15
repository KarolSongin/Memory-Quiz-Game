import { useState, useEffect } from "react";

export default function CurrentTime(props) {
  const [time, setTime] = useState(props.time);
  useEffect(() => {
    let interval;
    if (props.started) {
      interval = setInterval(() => {
        setTime((prev) => prev + 0.01);
      }, 10);
    } else if (!props.started && props.saved) {
      props.saveGame(time);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [props.started, props.saved]);

  return (
    <div className="current-time">{`Time: ${time.toFixed(2)} seconds`}</div>
  );
}
