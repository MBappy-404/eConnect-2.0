"use client";

import { useEffect, useRef } from 'react';
import "./eConnectCrypto.css";
const Crypto = () => {

  const particleContainerRef = useRef(null);

  // Function to create a particle
  const createParticle = () => {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 5 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    const x = Math.random() * window.innerWidth;
    const y = window.innerHeight;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    const hue = Math.random() * 360;
    particle.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;

    const duration = Math.random() * 3 + 2;
    particle.style.animation = `float-up ${duration}s linear`;

    // Append particle to the particle container
    if (particleContainerRef.current) {
      particleContainerRef.current.appendChild(particle);
    }

    // Remove particle after the animation ends
    setTimeout(() => {
      if (particleContainerRef.current) {
        particle.remove();
      }
    }, duration * 1000);
  };

  useEffect(() => {
    // Create particles at intervals
    const intervalId = setInterval(createParticle, 50);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <div className="bg-animated     min-h-screen  flex items-center justify-center p-4 overflow-hidden">
        <div id="particles"></div>
        <div className="text-center z-10 bg-[#1e293bcb] px-5 py-16 rounded-md">
          <h1  className="text-4xl  font-extrabold mb-4 text-white neon-text glitch hover-3d" data-text="eConect  X Crypto">eConect X Crypto</h1>
          <p className="text-xl text-cyan-300 mb-8">Enter the digital realm of <br /> infinite possibilities</p>
          <a href="https://t.me/cryptobdbappy" target='_blank'>


            <button className='mt-10 joinNow'>
             Join Now
              {Array.from({ length: 6 }, (_, index) => (
                <div key={index} className={`star_${index + 1}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 784.11 815.53"
                    style={{
                      shapeRendering: "geometricPrecision",
                      textRendering: "geometricPrecision",
                      imageRendering: "optimizeQuality",
                      fillRule: "evenodd",
                      clipRule: "evenodd",
                    }}
                  >
                    <g id="Layer_x0020_1">
                      <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                      <path
                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                        className="fil0"
                      ></path>
                    </g>
                  </svg>
                </div>
              ))}
            </button>



          </a>
        </div>


      </div>
    </>
  );
};

export default Crypto;
