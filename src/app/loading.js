"use client";
import { waveform } from "ldrs";

const loading = () => {
  waveform.register(); // Default values shown
  return (
    <div className="flex justify-center items-center  min-h-[100vh]">
      <div className="flex justify-center items-center">
        <l-waveform size="40" stroke="4" speed="1" color="#7aa5e9"></l-waveform>
      </div>
    </div>
  );
};

export default loading;
