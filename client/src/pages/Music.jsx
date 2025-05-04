import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

const Music = () => {
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const deadlineTime = "May 29 2025";
  const getTime = () => {
    const time = Date.parse(deadlineTime) - Date.now();
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / (1000 * 60)) % 60));
    setSeconds(Math.floor(time / 1000) % 60);
  };
  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="p-5">
        <div className="bg-black flex w-full mb-10 h-96 relative rounded-lg ">
      <div className=" flex flex-col w-1/2 space-y-8 p-5">
        <span className="text-green-300 font-sans">Categories</span>
        <p className="text-xl md:text-2xl font-bold lg:text-3xl lg:font-extrabold text-white">
          Enhance Your
          <br /> Music Experience
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3 ">
          <div className="w-15 h-15  lg:w-20 lg:h-20 bg-white rounded-full font-bold text-lg lg:text-2xl flex flex-col items-center justify-center">
            {days < 10 ? "0" + days : days}
            <span className="font-mono text-sm ">Days</span>
          </div>
          <div className="w-15 h-15  lg:w-20 lg:h-20 bg-white rounded-full font-bold text-lg lg:text-2xl flex flex-col items-center justify-center">
            {hours < 10 ? "0" + hours : hours}
            <span className="font-mono text-sm ">Hours</span>
          </div>
          <div className="w-15 h-15  lg:w-20 lg:h-20 bg-white rounded-full font-bold text-lg lg:text-2xl flex flex-col items-center justify-center">
            {minutes < 10 ? "0" + minutes : minutes}
            <span className="font-mono text-sm ">Minut</span>
          </div>
          <div className="w-15 h-15  lg:w-20 lg:h-20 bg-white rounded-full font-bold text-lg lg:text-2xl flex flex-col items-center justify-center">
            {seconds < 10 ? "0" + seconds : seconds}
            <span className="font-mono text-sm ">Sec</span>
          </div>
        </div>
        <Button
          className={" py-3 lg:py-8 w-1/2 lg:w-1/4 bg-green-400 cursor-pointer text-white hover:bg-green-600"}
        >
          Buy Now
        </Button>
      </div>
      <div className="w-1/2 relative ">
        <img className=" absolute z-20 top-25 lg:right-10 lg:-top-6 drop-shadow-[0_0_40px_rgba(255,255,255,0.6)]" src="/Music.png" alt="" />
      </div>
    </div>
    </div>
  );
};

export default Music;
