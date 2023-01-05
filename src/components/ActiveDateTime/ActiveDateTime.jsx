import dayjs from "dayjs";
import { useEffect, useState } from "react";

export const ActiveDateTime = () => {
  const [dateTime, setDateTime] = useState(
    dayjs().format("DD MMM YYYY HH:mm:ss")
  );

  useEffect(() => {
    setInterval(() => {
      setDateTime(dayjs().format("DD MMM YYYY HH:mm:ss"));
    }, 1000);
  }, []);

  return (
    <div className="ActiveDateTime">
      <span>{dateTime}</span>
    </div>
  );
};
