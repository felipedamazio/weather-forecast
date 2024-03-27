import { useEffect, useState } from "react";
import localFont from "next/font/local";
const mylocalFont = localFont({ src: "../../assets/fonts/DS-DIGI.ttf" });

type Props = {
  time: number;
};

export const Clock = ({ time: initial }: Props) => {
  const [time, setTime] = useState(new Date(initial));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // greeting message

  const dataTime = new Date();
  const currentHour = dataTime.getHours();
  const message =
    currentHour >= 0 && currentHour < 12
      ? "Good Morning 😎 "
      : currentHour >= 12 && currentHour < 18
      ? "Good Afternoon 😄"
      : "Good Night 😴";

  return (
    <div className="flex justify-center items-left flex-col">
      <span className={mylocalFont.className}>
        <span className="hour font-semibold text-2xl text-green-500">
          {time.toLocaleTimeString()}
        </span>
      </span>

      <span className="msg font-semibold text-sl text-gray-400 ">
        {message}
      </span>
    </div>
  );
};
