 "use client";

import  { useEffect, useRef } from 'react';
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
            <div className="bg-animated min-h-screen flex items-center justify-center p-4 overflow-hidden">
                <div id="particles"></div>
                <div className="text-center z-10">
                    <h1 className="text-6xl font-bold mb-4 text-white neon-text glitch hover-3d" data-text="eConect X Crypto">eConect X Crypto</h1>
                    <p className="text-xl text-cyan-300 mb-8">Enter the digital realm of infinite possibilities</p>
                    <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-8 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 hover:scale-110 inline-block">
                        <i className="fas fa-rocket mr-2"></i>Join Community
                    </button>
                </div>


            </div>
        </>
    );
};

export default Crypto;
