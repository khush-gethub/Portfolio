import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import { GithubIcon as Github } from './Icons';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// ===================================================================
// Projects Section — Scroll-Driven Card Split & Flip Animation
// ===================================================================
// Uses GSAP + ScrollTrigger to create a cinematic 5-phase experience:
//   Phase 0: Cards fade in and rise from below
//   Phase 1: Cards separate with rounded corners
//   Phase 2: Outer cards fan out with gentle rotation
//   Phase 3: All cards flip to reveal project details on back faces
//   Phase 4: Hold for reading before unpin
//
// The front faces share ONE panoramic image "sliced" across 3 cards.
// Each back face shows project details with a unique color theme.
// ===================================================================

const Projects = () => {
  // Refs for GSAP targeting
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const containerRef = useRef(null);
  const cardWrapperRefs = useRef([]);
  const cardRefs = useRef([]);
  const gridRef = useRef(null);

  // ---- Project data ----
  const projects = [
    {
      title: "MealMate",
      headline: "Meal\nMate",
      description: "A React-based recipe application featuring browsing, favorites management, and advanced filtering for a seamless culinary discovery experience.",
      techStack: ['React', 'Tailwind CSS', 'API Integration', 'MongoDB', 'JWT Auth', 'Framer Motion'],
      githubLink: 'https://github.com/khush-gethub/Meal-Mate',
      liveLink: '#',
      // Card back colors — Gray theme
      bgColor: '#b0b0b0',
      textColor: '#1a1a1a',
      // SVG icon — code brackets

    },
    {
      title: "PCPARTS",
      headline: "PC\nParts",
      description: "A comprehensive frontend for PC component browsing and building. Built with modern web standards focusing on performance and user experience.",
      techStack: ['React', 'JavaScript', 'Tailwind CSS', 'MongoDB', 'Stripe', 'JWT Auth'],
      githubLink: 'https://github.com/khush-gethub/PCPARTS',
      liveLink: '#',
      // Card back colors — Red theme
      bgColor: '#e52b20',
      textColor: '#ffffff',
      // SVG icon — layers/stack

    },
    {
      title: "Skilliva",
      headline: "Skill\niva",
      description: "A clean, modern skill-learning platform showcasing structured courses, intuitive navigation, and smooth user experience.",
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'GitHub Pages'],
      githubLink: 'https://github.com/daxmore/Skilliva',
      liveLink: 'https://daxmore.github.io/Skilliva/',
      // Card back colors — Near-black theme
      bgColor: '#151515',
      textColor: '#ffffff',
      // SVG icon — shield

    }
  ];

  // Background positions for slicing the panoramic image across 3 cards
  const bgPositions = ['0% 50%', '50% 50%', '100% 50%'];

  // SVG noise texture for card backs (inline data URI)
  const noiseTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`;

  useEffect(() => {
    // Guard: ensure all refs are attached
    const section = sectionRef.current;
    const hero = heroRef.current;
    const container = containerRef.current;
    const cardWrappers = cardWrapperRefs.current.filter(Boolean);
    const cards = cardRefs.current.filter(Boolean);
    const grid = gridRef.current;

    if (!section || !container || cardWrappers.length < 3 || cards.length < 3) return;

    // ===========================================
    // INITIAL STATE
    // ===========================================
    // Card container starts slightly below and transparent
    // for a smooth entrance animation
    gsap.set(container, { opacity: 0, y: 60 });

    // Hero header starts visible (will fade during Phase 0)
    gsap.set(hero, { opacity: 1, y: 0 });

    // ===========================================
    // MASTER TIMELINE — ScrollTrigger pinned
    // ===========================================
    // The section is pinned while the animation plays.
    // end: "+=300%" gives 3x viewport scroll distance
    // for comfortable pacing across all phases.
    // scrub: 0.8 provides smooth interpolation.

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=300%',     // 3× viewport for breathing room per phase
        scrub: 0.8,        // Smooth interpolation, not snappy
        pin: true,
        anticipatePin: 1
      }
    });

    // ===========================================
    // PHASE 0: ENTRANCE
    // ===========================================
    // Hero header fades out while cards fade in and rise.

    // Hero header animates UP and fades out
    tl.to(hero, {
      opacity: 0,
      y: -80,
      duration: 1,
      ease: 'power2.inOut'
    }, 0);

    // Cards fade in and rise from 60px below
    tl.to(container, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power2.out'
    }, 0.3);

    // ===========================================
    // PHASE 1: SEPARATE & ROUND
    // ===========================================
    // Cards spread apart (gap: 0 → 2rem) and corners
    // soften (borderRadius: 0 → 1.2rem) simultaneously.
    tl.to(container, {
      gap: '2rem',
      duration: 2,
      ease: 'power1.inOut'
    }, 1);

    tl.to(cards, {
      borderRadius: '1.2rem',
      duration: 1.5,
      ease: 'power1.inOut'
    }, 1);

    // Background dot grid slowly zooms across entire timeline
    // for subtle parallax depth effect
    tl.to(grid, {
      scale: 3,
      duration: 6,
      ease: 'none'
    }, 0);

    // ===========================================
    // PHASE 2: FAN OUT
    // ===========================================
    // Outer cards tilt and shift outward; center stays still.
    // Card 1 tilts left, Card 3 tilts right.
    tl.to(cardWrappers[0], {
      rotateZ: -8,
      x: -20,
      duration: 1.5,
      ease: 'power2.out'
    }, 2.5);

    tl.to(cardWrappers[2], {
      rotateZ: 8,
      x: 20,
      duration: 1.5,
      ease: 'power2.out'
    }, 2.5);

    // ===========================================
    // PHASE 3: FLIP
    // ===========================================
    // All cards flip around Y-axis with a slight
    // left-to-right stagger to reveal back faces.
    tl.to(cards, {
      rotateY: 180,
      duration: 2.5,
      stagger: 0.1,
      ease: 'power2.inOut'
    }, 4);

    // ===========================================
    // PHASE 4: HOLD
    // ===========================================
    // No animation — the timeline just "sits" here
    // so the user has time to read the back-face content
    // before the section unpins.

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      tl.kill();
    };
  }, []);

  return (
    <>
      {/* ==============================================
          DOT GRID BACKGROUND
          Fixed full-viewport overlay with subtle dot pattern.
          Slowly scales from 1× → 3× across the scroll timeline
          to create a parallax zoom feel.
          ============================================== */}
      <div
        ref={gridRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1.5px, transparent 1.5px)',
          backgroundSize: '40px 40px',
          willChange: 'transform',
          transformOrigin: 'center center',
          pointerEvents: 'none'
        }}
      />

      {/* ==============================================
          PINNED ANIMATION SECTION
          This is the main container that gets pinned by
          ScrollTrigger while the card animation plays.
          ============================================== */}
      <section
        id="projects"
        ref={sectionRef}
        style={{
          height: '100vh',
          width: '100vw',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#0f172a'  // slate-900 — matches portfolio theme
        }}
      >
        {/* Hero Header — centered, fades out on scroll (matches Skills design) */}
        <div ref={heroRef} className="skills-hero-header">
          <h2>
            Featured <span>Projects</span>
          </h2>
          <p>A showcase of my latest work and passion projects.</p>
        </div>

        {/* ====================================
            CARD CONTAINER
            Flex layout, centered, gap starts at
            0px (cards flush → panoramic image).
            transform-style: preserve-3d for 3D context.
            ==================================== */}
        <div
          ref={containerRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0px',
            transformStyle: 'preserve-3d',
            willChange: 'transform, gap'
          }}
        >
          {projects.map((project, index) => (
            // ====================================
            // CARD WRAPPER
            // Each wrapper provides its own perspective
            // context (2000px) for the 3D flip.
            // ====================================
            <div
              key={index}
              ref={el => (cardWrapperRefs.current[index] = el)}
              className="projects-card-wrapper"
            >
              {/* ====================================
                  CARD — Inner container that actually flips.
                  Has preserve-3d and starts with
                  borderRadius: 0 (animated to 1.2rem).
                  ==================================== */}
              <div
                ref={el => (cardRefs.current[index] = el)}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  borderRadius: '0px'
                }}
              >
                {/* ====================================
                    FRONT FACE — Panoramic image slice
                    background-size: 300% 100% means the
                    full image spans 3 cards. Each card
                    shows 1/3 via background-position.
                    ==================================== */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    borderRadius: 'inherit',
                    overflow: 'hidden',
                    willChange: 'transform, border-radius',
                    backgroundImage: 'url("/images/projects-panoramic.png")',
                    backgroundSize: '300% 100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: bgPositions[index],
                    // Scale slightly + translateZ to prevent z-fighting
                    // and hide sub-pixel gaps when cards are flush.
                    transform: 'scale(1.01) translateZ(1px)'
                  }}
                />

                {/* ====================================
                    BACK FACE — Project details card
                    Rotated 180° on Y so it's hidden initially.
                    Revealed when the card flips in Phase 3.
                    ==================================== */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    borderRadius: 'inherit',
                    overflow: 'hidden',
                    willChange: 'transform, border-radius',
                    transform: 'rotateY(180deg) translateZ(1px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: 'clamp(1rem, 2vw, 1.5rem)',
                    textAlign: 'left',
                    backgroundColor: project.bgColor,
                    color: project.textColor,
                    backgroundImage: noiseTexture
                  }}
                >
                  {/* Project headline */}
                  <h3 style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: 'clamp(2.3rem, 3.5vw, 2.4rem)',
                    fontWeight: 900,
                    lineHeight: 1,
                    marginBottom: 'clamp(0.5rem, 1vw, 0.75rem)',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase'
                  }}>
                    {project.title}
                  </h3>

                  {/* Project description */}
                  <p style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: 'clamp(1.5rem, 1vw, 0.8rem)',
                    lineHeight: 1.4,
                    opacity: 0.75,
                    fontWeight: 400,
                    marginBottom: 'clamp(0.5rem, 1vw, 0.75rem)'
                  }}>
                    {project.description}
                  </p>

                  {/* Tech stack tags */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '3px',
                    marginBottom: 'clamp(0.4rem, 0.8vw, 0.6rem)'
                  }}>
                    {project.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontFamily: '"Inter", sans-serif',
                          fontSize: 'clamp(1rem, 0.7vw, 0.55rem)',
                          fontWeight: 400,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: 'rgba(0, 0, 0, 0.15)',
                          border: `1px solid ${project.textColor === '#ffffff' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
                          color: 'inherit'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links — GitHub + Live */}
                  <div style={{
                    display: 'flex',
                    gap: '6px'
                  }}>
                    <a
                      href={project.githubLink}
                      target={project.githubLink !== '#' ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      aria-label={`${project.title} GitHub`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '6px',
                        borderRadius: '8px',
                        background: 'rgba(0,0,0,0.15)',
                        border: `1px solid ${project.textColor === '#ffffff' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
                        color: 'inherit',
                        textDecoration: 'none',
                        pointerEvents: 'auto',
                        transition: 'background 0.2s'
                      }}
                    >
                      <Github size={16} />
                    </a>
                    <a
                      href={project.liveLink}
                      target={project.liveLink !== '#' ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      aria-label={`${project.title} Live Demo`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '6px',
                        borderRadius: '8px',
                        background: 'rgba(0,0,0,0.15)',
                        border: `1px solid ${project.textColor === '#ffffff' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
                        color: 'inherit',
                        textDecoration: 'none',
                        pointerEvents: 'auto',
                        transition: 'background 0.2s'
                      }}
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Projects;
