import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import DraggableNav from './components/DraggableNav';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const mainContentRef = useRef(null);

  // Animate the main content in when loading completes
  useGSAP(() => {
    if (loadingComplete && mainContentRef.current) {
      gsap.fromTo(mainContentRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          clearProps: "all" // Critical: removes the transform property after animation so 'fixed' children (like DraggableNav) position relative to the viewport again
        }
      );
    }
  }, [loadingComplete]);

  return (
    <div className="bg-slate-900 min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      <Preloader onComplete={() => setLoadingComplete(true)} />

      {/* Hide scrollbar or overflow issues during preloading by constraining if needed, 
          but usually wrapping everything in a ref is enough */}
      <div
        ref={mainContentRef}
        // Use class for initial hidden state to avoid hardcoded styles conflicting with GSAP clearProps
        className={loadingComplete ? "" : "opacity-0 h-screen overflow-hidden pointer-events-none"}
      >
        <Navbar />
        <DraggableNav />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;