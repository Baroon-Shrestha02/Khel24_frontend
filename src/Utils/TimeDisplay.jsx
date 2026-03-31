import { useEffect, useState } from "react";

const nepaliDays = [
  "आइतबार",
  "सोमबार",
  "मंगलबार",
  "बुधबार",
  "बिहिबार",
  "शुक्रबार",
  "शनिबार",
];

const toNepaliNumber = (num) =>
  num.toString().replace(/\d/g, (d) => "०१२३४५६७८९"[d]);

export default function TimeDisplay() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const kathmanduTime = new Date(
    time.toLocaleString("en-US", { timeZone: "Asia/Kathmandu" }),
  );

  const day = nepaliDays[kathmanduTime.getDay()];

  const hh = toNepaliNumber(
    kathmanduTime.getHours().toString().padStart(2, "0"),
  );
  const mm = toNepaliNumber(
    kathmanduTime.getMinutes().toString().padStart(2, "0"),
  );
  const ss = toNepaliNumber(
    kathmanduTime.getSeconds().toString().padStart(2, "0"),
  );

  return (
    <div>
      <h2>
        {day}, {hh}:{mm}:{ss}
      </h2>
    </div>
  );
}
