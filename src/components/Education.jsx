import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Calendar, Award, Star, RefreshCw } from 'lucide-react';
import gsap from 'gsap';

// ===================================================================
// Procedural ASCII Reveal Animation Configuration
// ===================================================================
const CONFIG = {
  fontSize: 10,
  asciiChars: " .:-=+*#%@".split(""), // Lightest → darkest
  noiseChars: "X$KMWB&@Q#".split(""), // Random flicker characters
  flickerRange: [15, 40], // [min, max] frames of noise
  stagger: 0.0001, // Delay between each cell start
  revealDelay: 500, // ms after last settle → image fade
  fontFamily: 'JetBrains Mono, monospace',
  asciiColor: '#22d3ee', // Cyan color for the ASCII chars
  canvasBg: '#0f172a', // slate-900
};

const Education = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + (i * 0.15),
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    })
  };

  // --- ASCII Reveal Logic ---
  const requestRef = useRef();
  const cellsRef = useRef([]);

  const startSequence = () => {
    setIsRevealed(false);
    setIsAnimating(true);
    setupCanvas();
  };

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Prepare virtual source for sampling
    const cols = Math.ceil(rect.width / CONFIG.fontSize);
    const rows = Math.ceil(rect.height / CONFIG.fontSize);

    const samplingCanvas = document.createElement('canvas');
    samplingCanvas.width = cols;
    samplingCanvas.height = rows;
    const sCtx = samplingCanvas.getContext('2d');

    // Draw a virtual "education" gradient + text for sampling
    const grad = sCtx.createLinearGradient(0, 0, cols, rows);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.5, '#444444');
    grad.addColorStop(1, '#111111');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, cols, rows);

    sCtx.fillStyle = '#ffffff';
    sCtx.font = `bold ${rows * 0.4}px Arial`;
    sCtx.textAlign = 'center';
    sCtx.textBaseline = 'middle';
    sCtx.fillText('BCA', cols / 2, rows / 2);

    // Add some random dots for texture
    for (let i = 0; i < 100; i++) {
      sCtx.fillStyle = Math.random() > 0.5 ? '#fff' : '#000';
      sCtx.fillRect(Math.random() * cols, Math.random() * rows, 1, 1);
    }

    const imgData = sCtx.getImageData(0, 0, cols, rows).data;
    const cells = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = (y * cols + x) * 4;
        const r = imgData[i];
        const g = imgData[i + 1];
        const b = imgData[i + 2];
        const brightness = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

        const charIndex = Math.floor(brightness * (CONFIG.asciiChars.length - 1));
        const targetChar = CONFIG.asciiChars[charIndex];

        cells.push({
          x: x * CONFIG.fontSize,
          y: y * CONFIG.fontSize,
          targetChar,
          currentChar: '',
          state: 'waiting',
          flickerFrames: 0,
        });
      }
    }

    // Shuffle and schedule staggers
    gsap.utils.shuffle(cells);
    cells.forEach((cell, i) => {
      gsap.delayedCall(i * CONFIG.stagger, () => {
        cell.state = 'flickering';
        cell.flickerFrames = Math.floor(gsap.utils.random(CONFIG.flickerRange[0], CONFIG.flickerRange[1]));
      });
    });

    cellsRef.current = cells;
    requestRef.current = requestAnimationFrame(animate);
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas.getBoundingClientRect();

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = CONFIG.asciiColor;
    ctx.font = `${CONFIG.fontSize}px ${CONFIG.fontFamily}`;
    ctx.textBaseline = 'top';

    let settledCount = 0;
    const cells = cellsRef.current;

    cells.forEach(cell => {
      if (cell.state === 'flickering') {
        cell.currentChar = CONFIG.noiseChars[Math.floor(Math.random() * CONFIG.noiseChars.length)];
        cell.flickerFrames--;
        if (cell.flickerFrames <= 0) {
          cell.state = 'settled';
          cell.currentChar = cell.targetChar;
        }
      } else if (cell.state === 'settled') {
        settledCount++;
      }

      if (cell.currentChar) {
        ctx.fillText(cell.currentChar, cell.x, cell.y);
      }
    });

    if (settledCount === cells.length && cells.length > 0) {
      setTimeout(() => {
        setIsRevealed(true);
        setIsAnimating(false);
      }, CONFIG.revealDelay);
      return;
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Start animation when component mounts and comes into view
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startSequence();
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      cancelAnimationFrame(requestRef.current);
      gsap.killTweensOf(gsap.delayedCall);
    };
  }, []);

  const handleRestart = (e) => {
    if (e) e.stopPropagation();
    cancelAnimationFrame(requestRef.current);
    gsap.killTweensOf(gsap.delayedCall);
    startSequence();
  };

  return (
    <section id="education" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background Dots Grid - matching the style of other sections if needed */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Header — centered, matching Skills/Projects design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="skills-hero-header !relative !top-0 !left-0 !transform-none !mb-20"
        >
          <h2>
            Education <span>Path</span>
          </h2>
          <p>A chronological journey of my academic background and achievements.</p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">

            {/* ASCII Reveal Container */}
            <div
              ref={containerRef}
              onClick={handleRestart}
              className={`relative bg-slate-950 border border-slate-800 rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl transition-all duration-500 cursor-pointer min-h-[320px] sm:min-h-[400px] flex items-center justify-center ${isRevealed ? 'border-cyan-500/30' : 'border-slate-700'}`}
            >
              {/* ASCII Canvas Layer */}
              <canvas
                ref={canvasRef}
                className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-1000 ${isRevealed ? 'opacity-0' : 'opacity-100'}`}
              />

              {/* Real Content Layer - Revealed after ASCII settles */}
              <div className={`relative z-10 w-full p-5 sm:p-8 md:p-12 transition-all duration-1000 transform ${isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}`}>

                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-10">
                  <div>
                    <div className="flex items-center gap-2 text-cyan-400 mb-4 font-bold tracking-widest uppercase text-sm">
                      <Award size={16} />
                      Academic Excellence
                    </div>
                    <h3 className="text-2xl sm:text-4xl md:text-6xl font-black text-white uppercase font-outfit leading-none mb-3 sm:mb-4">
                      Bachelor of<br />Computer Applications
                    </h3>
                    <p className="text-base sm:text-xl md:text-2xl text-slate-400 font-medium font-inter">
                      S.M.T.Z.S Patel College
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-white bg-cyan-500/20 px-6 py-3 rounded-2xl border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.1)] whitespace-nowrap mt-8 md:mt-0 font-bold uppercase tracking-wider font-outfit">
                    <Calendar size={20} className="text-cyan-400" />
                    <span>Class of 2026</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { label: "CGPA", value: "7.66", color: "text-yellow-500", icon: <Star size={24} className="fill-yellow-500/20" /> },
                    { label: "Percentage", value: "76.80", suffix: "%", color: "text-blue-500", icon: <Award size={24} /> },
                    { label: "YGPA", value: "8.27", color: "text-green-500", icon: <Star size={24} className="fill-green-500/20" /> }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={statsVariants}
                      initial="hidden"
                      animate={isRevealed ? "visible" : "hidden"}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="flex flex-col gap-2 sm:gap-3 bg-slate-900/80 p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-800 hover:border-slate-600 transition-all duration-300"
                    >
                      <div className={`flex items-center gap-3 ${stat.color} font-bold uppercase tracking-widest text-xs`}>
                        {stat.icon}
                        {stat.label}
                      </div>
                      <div className="text-3xl sm:text-5xl font-black text-white font-outfit">
                        {stat.value}{stat.suffix && <span className="text-2xl text-slate-500 ml-1">{stat.suffix}</span>}
                      </div>
                    </motion.div>
                  ))}
                </div>


              </div>

              {/* Initial Loading State / Placeholder while waiting for reveal */}
              {!isRevealed && !isAnimating && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 gap-4">
                  <RefreshCw size={48} className="animate-spin opacity-20" />
                  <p className="uppercase tracking-[0.3em] font-bold text-xs opacity-50">Decoding Educational Data...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
