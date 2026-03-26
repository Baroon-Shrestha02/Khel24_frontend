import { useEffect, useState } from "react";

export default function TimeDisplay() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); // update every second

    return () => clearInterval(interval);
  }, []);

  // Local time (HH:MM:SS)
  const localTime = time.toLocaleTimeString();

  // Nepal Time (GMT+5:45)
  const nepalTime = time.toLocaleTimeString("en-US", {
    timeZone: "Asia/Kathmandu",
    hour12: false,
  });

  return (
    <div>
      {/* <h2>Local Time: {localTime}</h2> */}
      <h2>Nepal Time (GMT+5:45): {nepalTime}</h2>
    </div>
  );
}
