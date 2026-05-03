import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import { GithubIcon as Github } from './Icons';
import { motion } from 'framer-motion';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// ===================================================================
// Projects Section — Scroll-Driven Card Split & Flip Animation
// ===================================================================
// Desktop (>= 768px): GSAP + ScrollTrigger cinematic 5-phase animation
// Mobile (< 768px):   Simple stacked card grid with Framer Motion
// ===================================================================

const Projects = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  // Refs for GSAP targeting (desktop only)
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
      bgColor: '#b0b0b0',
      textColor: '#1a1a1a',
    },
    {
      title: "PCPARTS",
      headline: "PC\nParts",
      description: "A comprehensive frontend for PC component browsing and building. Built with modern web standards focusing on performance and user experience.",
      techStack: ['React', 'JavaScript', 'Tailwind CSS', 'MongoDB', 'Stripe', 'JWT Auth'],
      githubLink: 'https://github.com/khush-gethub/PCPARTS',
      liveLink: '#',
      bgColor: '#e52b20',
      textColor: '#ffffff',
    },
    {
      title: "Skilliva",
      headline: "Skill\niva",
      description: "A clean, modern skill-learning platform showcasing structured courses, intuitive navigation, and smooth user experience.",
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'GitHub Pages'],
      githubLink: 'https://github.com/daxmore/Skilliva',
      liveLink: 'https://daxmore.github.io/Skilliva/',
      bgColor: '#151515',
      textColor: '#ffffff',
    }
  ];

  const bgPositions = ['0% 50%', '50% 50%', '100% 50%'];
  const noiseTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`;

  // Track resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ---- DESKTOP: GSAP scroll animation ----
  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const hero = heroRef.current;
    const container = containerRef.current;
    const cardWrappers = cardWrapperRefs.current.filter(Boolean);
    const cards = cardRefs.current.filter(Boolean);
    const grid = gridRef.current;

    if (!section || !container || cardWrappers.length < 3 || cards.length < 3) return;

    gsap.set(container, { opacity: 0, y: 60 });
    gsap.set(hero, { opacity: 1, y: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=300%',
        scrub: 0.8,
        pin: true,
        anticipatePin: 1
      }
    });

    tl.to(hero, { opacity: 0, y: -80, duration: 1, ease: 'power2.inOut' }, 0);
    tl.to(container, { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }, 0.3);
    tl.to(container, { gap: '2rem', duration: 2, ease: 'power1.inOut' }, 1);
    tl.to(cards, { borderRadius: '1.2rem', duration: 1.5, ease: 'power1.inOut' }, 1);
    tl.to(grid, { scale: 3, duration: 6, ease: 'none' }, 0);
    tl.to(cardWrappers[0], { rotateZ: -8, x: -20, duration: 1.5, ease: 'power2.out' }, 2.5);
    tl.to(cardWrappers[2], { rotateZ: 8, x: 20, duration: 1.5, ease: 'power2.out' }, 2.5);
    tl.to(cards, { rotateY: 180, duration: 2.5, stagger: 0.1, ease: 'power2.inOut' }, 4);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      tl.kill();
    };
  }, [isMobile]);

  // ============================================================
  // MOBILE VIEW — Direct card grid, no animation pinning
  // ============================================================
  if (isMobile) {
    return (
      <section
        id="projects"
        style={{
          background: '#0f172a',
          padding: '4rem 1rem',
          minHeight: '100vh',
        }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <h2 style={{
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(2.2rem, 10vw, 3.5rem)',
            textTransform: 'uppercase',
            color: 'white',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            margin: 0,
          }}>
            Featured <span style={{ color: '#22d3ee' }}>Projects</span>
          </h2>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            color: '#94a3b8',
            fontSize: '0.95rem',
            marginTop: '0.75rem',
          }}>
            A showcase of my latest work and passion projects.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          maxWidth: '480px',
          margin: '0 auto',
        }}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
              style={{
                borderRadius: '1.25rem',
                overflow: 'hidden',
                backgroundColor: project.bgColor,
                color: project.textColor,
                backgroundImage: noiseTexture,
                padding: '1.5rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              {/* Project Title */}
              <h3 style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: 'clamp(1.6rem, 7vw, 2rem)',
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                margin: 0,
              }}>
                {project.title}
              </h3>

              {/* Description */}
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.85rem',
                lineHeight: 1.5,
                opacity: 0.75,
                margin: 0,
              }}>
                {project.description}
              </p>

              {/* Tech Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {project.techStack.map((tech, tIdx) => (
                  <span key={tIdx} style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: 'rgba(0,0,0,0.15)',
                    border: `1px solid ${project.textColor === '#ffffff' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
                    color: 'inherit',
                  }}>
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '0.25rem' }}>
                <a
                  href={project.githubLink}
                  target={project.githubLink !== '#' ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  aria-label={`${project.title} GitHub`}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '8px 14px', borderRadius: '10px',
                    background: 'rgba(0,0,0,0.15)',
                    border: `1px solid ${project.textColor === '#ffffff' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
                    color: 'inherit', textDecoration: 'none',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '0.75rem', fontWeight: 600,
                  }}
                >
                  <Github size={14} /> GitHub
                </a>
                <a
                  href={project.liveLink}
                  target={project.liveLink !== '#' ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  aria-label={`${project.title} Live Demo`}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '8px 14px', borderRadius: '10px',
                    background: 'rgba(0,0,0,0.15)',
                    border: `1px solid ${project.textColor === '#ffffff' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
                    color: 'inherit', textDecoration: 'none',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '0.75rem', fontWeight: 600,
                  }}
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  // ============================================================
  // DESKTOP VIEW — Full GSAP scroll animation
  // ============================================================
  return (
    <>
      {/* Dot Grid Background */}
      <div
        ref={gridRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw', height: '100vh',
          zIndex: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1.5px, transparent 1.5px)',
          backgroundSize: '40px 40px',
          willChange: 'transform',
          transformOrigin: 'center center',
          pointerEvents: 'none'
        }}
      />

      {/* Pinned Animation Section */}
      <section
        id="projects"
        ref={sectionRef}
        style={{
          height: '100vh', width: '100vw',
          position: 'relative',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
          background: '#0f172a'
        }}
      >
        {/* Hero Header */}
        <div ref={heroRef} className="skills-hero-header">
          <h2>
            Featured <span>Projects</span>
          </h2>
          <p>A showcase of my latest work and passion projects.</p>
        </div>

        {/* Card Container */}
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
            <div
              key={index}
              ref={el => (cardWrapperRefs.current[index] = el)}
              className="projects-card-wrapper"
            >
              <div
                ref={el => (cardRefs.current[index] = el)}
                style={{
                  width: '100%', height: '100%',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  borderRadius: '0px'
                }}
              >
                {/* Front Face */}
                <div
                  style={{
                    position: 'absolute', inset: 0,
                    backfaceVisibility: 'hidden',
                    borderRadius: 'inherit',
                    overflow: 'hidden',
                    willChange: 'transform, border-radius',
                    backgroundImage: 'url("/images/projects-panoramic.png")',
                    backgroundSize: '300% 100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: bgPositions[index],
                    transform: 'scale(1.01) translateZ(1px)'
                  }}
                />

                {/* Back Face */}
                <div
                  style={{
                    position: 'absolute', inset: 0,
                    backfaceVisibility: 'hidden',
                    borderRadius: 'inherit',
                    overflow: 'hidden',
                    willChange: 'transform, border-radius',
                    transform: 'rotateY(180deg) translateZ(1px)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    padding: 'clamp(1rem, 2vw, 1.5rem)',
                    textAlign: 'left',
                    backgroundColor: project.bgColor,
                    color: project.textColor,
                    backgroundImage: noiseTexture
                  }}
                >
                  <h3 style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                    fontWeight: 900, lineHeight: 1,
                    marginBottom: 'clamp(0.4rem, 0.8vw, 0.65rem)',
                    letterSpacing: '-0.02em', textTransform: 'uppercase'
                  }}>
                    {project.title}
                  </h3>
                  <p style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)',
                    lineHeight: 1.45, opacity: 0.75,
                    marginBottom: 'clamp(0.4rem, 0.8vw, 0.65rem)'
                  }}>
                    {project.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginBottom: 'clamp(0.4rem, 0.6vw, 0.5rem)' }}>
                    {project.techStack.map((tech, tIdx) => (
                      <span key={tIdx} style={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: 'clamp(0.5rem, 0.6vw, 0.65rem)',
                        fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        padding: '2px 6px', borderRadius: '4px',
                        background: 'rgba(0,0,0,0.15)',
                        border: `1px solid ${project.textColor === '#ffffff' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
                        color: 'inherit'
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <a href={project.githubLink} target={project.githubLink !== '#' ? '_blank' : '_self'}
                      rel="noopener noreferrer" aria-label={`${project.title} GitHub`}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '6px', borderRadius: '8px', background: 'rgba(0,0,0,0.15)',
                        border: `1px solid ${project.textColor === '#ffffff' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
                        color: 'inherit', textDecoration: 'none', pointerEvents: 'auto', transition: 'background 0.2s'
                      }}>
                      <Github size={16} />
                    </a>
                    <a href={project.liveLink} target={project.liveLink !== '#' ? '_blank' : '_self'}
                      rel="noopener noreferrer" aria-label={`${project.title} Live Demo`}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '6px', borderRadius: '8px', background: 'rgba(0,0,0,0.15)',
                        border: `1px solid ${project.textColor === '#ffffff' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
                        color: 'inherit', textDecoration: 'none', pointerEvents: 'auto', transition: 'background 0.2s'
                      }}>
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
