import React, { useRef } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(CustomEase);

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const fillCircleRef = useRef(null);
  const percentageRef = useRef(null);
  const terminalRef = useRef(null);

  useGSAP(() => {
    CustomEase.create("shutter", "M0,0 C0.64,0 0.35,1 1,1");

    const terminalLines = terminalRef.current.children;
    const masterTl = gsap.timeline();

    // 1. Terminal Sequence
    const terminalTl = gsap.timeline();
    Array.from(terminalLines).forEach((line, index) => {
      terminalTl.to(line, {
        opacity: 1,
        y: 0,
        duration: 0.2, // Slower text fade in
        ease: "power2.out"
      }, index * 1.0); // More delay between lines

      if (index > 0) {
        terminalTl.to(terminalLines[index - 1], {
          opacity: 0.3,
          duration: 0.4
        }, "<");
      }
    });

    // 2. Progress Animation
    const progressTl = gsap.timeline();
    progressTl.to(fillCircleRef.current, {
      strokeDashoffset: 0,
      duration: 2.3, // Slowed down from 3s to 4.5s
      ease: "power2.inOut"
    }, 0);

    const counter = { val: 0 };
    progressTl.to(counter, {
      val: 100,
      duration: 2.3, // Slowed down from 3s to 4.5s
      ease: "power2.inOut",
      onUpdate: () => {
        if (percentageRef.current) {
          percentageRef.current.innerText = Math.round(counter.val) + "%";
        }
      }
    }, 0);

    masterTl.add(terminalTl, 0);
    masterTl.add(progressTl, 0);

    // 3. Shutter Wipe
    masterTl.to(containerRef.current, {
      clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
      duration: 0.8, // Slightly slower wipe
      ease: "shutter",
      delay: 0.1, // Wait longer at 100% before wiping
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = "none";
          containerRef.current.style.pointerEvents = "none";
        }
        onComplete();
      }
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full bg-[#0A0A0A] text-[#C0C0C0] z-[9999] flex flex-col items-center justify-center pointer-events-auto"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      <div className="relative w-[200px] h-[200px] flex items-center justify-center mb-10 ">
        <svg className="absolute -rotate-90" width="200" height="200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#222" strokeWidth="4"></circle>
          <circle
            ref={fillCircleRef}
            cx="100" cy="100" r="90"
            fill="none"
            stroke="#C0C0C0"
            strokeWidth="4"
            strokeDasharray="565"
            strokeDashoffset="565"
          ></circle>
        </svg>
        <div ref={percentageRef} className="font-mono text-4xl font-bold text-[#C0C0C0]">
          0%
        </div>
      </div>

      <div ref={terminalRef} className="font-mono text-sm text-[#888] h-24 overflow-hidden flex flex-col items-center">
        <div className="opacity-0 translate-y-5 mb-1">&gt; BOOTING CORE SYSTEM...</div>
        <div className="opacity-0 translate-y-5 mb-1">&gt; INITIALIZING DOM...</div>
        <div className="opacity-0 translate-y-5 mb-1">&gt; PARSING STYLESHEETS...</div>
        <div className="opacity-0 translate-y-5 mb-1">&gt; READY.</div>
      </div>
    </div>
  );
};

export default Preloader;
