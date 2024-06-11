"use client";
import { dotWave } from "ldrs";

const Loader = () => {
  dotWave.register();
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex justify-center items-center">
        <l-dot-wave size="47" speed="1" color="white"></l-dot-wave>
      </div>
    </div>
  );
};

export default Loader;
