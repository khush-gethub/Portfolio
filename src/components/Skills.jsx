import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Database, Cpu, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// ===================================================================
// Skills Section — Scroll-Driven 3D Card Stack Flip Animation
// ===================================================================
// Desktop (>= 768px): GSAP + ScrollTrigger cinematic 4-phase animation
// Mobile (< 768px):   Simple scrollable grid of skill cards
// ===================================================================

const Skills = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  // Refs for GSAP targeting (desktop only)
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const cardStackRef = useRef(null);
  const coverCardRef = useRef(null);
  const backCardsRef = useRef([]);
  const glowRef = useRef(null);
  const indicatorRef = useRef(null);

  // ---- Skill category data ----
  const skillCategories = [
    {
      title: "Frontend\nDevelopment",
      icon: <Terminal size={28} />,
      description: "Expertise in state management, crafting responsive designs, and building smooth interactive animations with modern frameworks.",
      skills: ["React.js", "Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "State Management"],
      colorClass: "skills-card--1",
      glowColor: "rgba(200, 216, 204, 0.12)"
    },
    {
      title: "Backend\nIntegration",
      icon: <Database size={28} />,
      description: "Skilled in API integration, database management with MongoDB and Firebase, connecting frontend with backend seamlessly.",
      skills: ["Node.js", "MongoDB", "Mongoose", "Firebase", "RESTful APIs", "API Integration"],
      colorClass: "skills-card--2",
      glowColor: "rgba(212, 201, 227, 0.12)"
    },
    {
      title: "Tools &\nEcosystem",
      icon: <Cpu size={28} />,
      description: "Leveraging modern tooling, AI-powered development, and industry standard version control for efficient workflows.",
      skills: ["Antigravity", "Git", "GitHub", "VS Code", "Vite", "Chrome DevTools"],
      colorClass: "skills-card--3",
      glowColor: "rgba(240, 217, 209, 0.12)"
    },
    {
      title: "Design &\nCreative",
      icon: <Palette size={28} />,
      description: "Creating visually stunning interfaces with an eye for typography, color theory, motion design, and user experience.",
      skills: ["Figma", "UI/UX Design", "GSAP Animations", "Motion Design", "Responsive Design", "Prototyping"],
      colorClass: "skills-card--4",
      glowColor: "rgba(184, 212, 232, 0.12)"
    }
  ];

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
    const cardStack = cardStackRef.current;
    const coverCard = coverCardRef.current;
    const backCards = backCardsRef.current.filter(Boolean);
    const glow = glowRef.current;
    const indicator = indicatorRef.current;

    if (!section || !hero || !cardStack || !coverCard || backCards.length < 4) return;

    gsap.set(coverCard, { rotationY: 0, z: 100 });
    backCards.forEach((card, i) => {
      gsap.set(card, { rotationY: 180, z: -(i + 1) * 5 });
    });
    gsap.set(cardStack, { y: '120vh', rotationX: 15 });
    gsap.set(hero, { opacity: 1, y: 0 });
    gsap.set(indicator, { opacity: 0.4 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=300%',
        scrub: 2.2,
        pin: true,
        anticipatePin: 1
      }
    });

    tl.to(indicator, { opacity: 0, duration: 0.3 }, 0);
    tl.to(hero, { opacity: 0, y: -100, duration: 0.8, ease: 'power2.inOut' }, 0);
    tl.to(cardStack, { y: 0, rotationX: 0, duration: 1, ease: 'power2.out' }, 0.1);

    tl.to(coverCard, { rotationY: -180, z: -500, x: -120, duration: 0.8, ease: 'back.inOut(1.2)' }, 1.2);
    backCards.forEach((card, i) => {
      tl.to(card, { rotationY: 0, z: (backCards.length - i) * 20, duration: 0.8, ease: 'back.inOut(1.2)' }, 1.2 + (i * 0.08));
    });

    const dismissalStart = 2.5;
    const cardDuration = 0.5;
    const cardDelay = 0.4;

    backCards.forEach((card, i) => {
      const startAt = dismissalStart + (i * cardDelay);
      const isEven = i % 2 === 0;
      tl.to(card, {
        y: '-150vh', x: isEven ? '-20vw' : '20vw',
        rotationX: 20, rotationZ: isEven ? -15 : 15,
        scale: 0.85, duration: cardDuration, ease: 'power3.in'
      }, startAt);
      tl.to(glow, {
        background: `radial-gradient(circle, ${skillCategories[i].glowColor} 0%, transparent 70%)`,
        duration: cardDuration * 0.5, ease: 'none'
      }, startAt);
    });

    tl.to(cardStack, { opacity: 0, duration: 0.3, ease: 'power2.inOut' }, dismissalStart + (4 * cardDelay));
    tl.to(glow, { opacity: 0, duration: 0.3 }, dismissalStart + (4 * cardDelay));

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      tl.kill();
    };
  }, [isMobile]);

  // Mobile card theme map
  const mobileThemes = [
    { bg: 'linear-gradient(135deg, #C8D8CC 0%, #a8c4ae 100%)', color: '#2a3b2e' },
    { bg: 'linear-gradient(135deg, #D4C9E3 0%, #b9aad4 100%)', color: '#2e2841' },
    { bg: 'linear-gradient(135deg, #F0D9D1 0%, #e0bfb4 100%)', color: '#3d2d26' },
    { bg: 'linear-gradient(135deg, #B8D4E8 0%, #96bdd9 100%)', color: '#1e3448' },
  ];

  // ============================================================
  // MOBILE VIEW — Simple card grid
  // ============================================================
  if (isMobile) {
    return (
      <section
        id="skills"
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
            Technical <span style={{ color: '#22d3ee' }}>Skills</span>
          </h2>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            color: '#94a3b8',
            fontSize: '0.95rem',
            marginTop: '0.75rem',
          }}>
            A comprehensive look at my technological expertise.
          </p>
        </motion.div>

        {/* Cover Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          style={{
            maxWidth: '480px',
            margin: '0 auto 1.25rem',
            borderRadius: '1.5rem',
            background: 'linear-gradient(135deg, #E8C4BC 0%, #d4a99f 100%)',
            color: '#3d2828',
            padding: '1.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <span style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 900, fontSize: '1.1rem', opacity: 0.4 }}>00</span>
          <h3 style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 900, fontSize: 'clamp(1.6rem, 7vw, 2rem)', textTransform: 'uppercase', lineHeight: 1.05, margin: '0.5rem 0' }}>
            Technical<br/>Expertise
          </h3>
          <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.85rem', lineHeight: 1.5, opacity: 0.75, margin: 0 }}>
            An overview of the core technologies I use to build scalable web applications — modern frameworks, efficient state management, and seamless integrations.
          </p>
        </motion.div>

        {/* Skill Category Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '480px', margin: '0 auto' }}>
          {skillCategories.map((category, index) => {
            const theme = mobileThemes[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
                style={{
                  borderRadius: '1.5rem',
                  background: theme.bg,
                  color: theme.color,
                  padding: '1.5rem',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 900, fontSize: '1.1rem', opacity: 0.4 }}>0{index + 1}</span>
                  <div style={{ opacity: 0.5 }}>{category.icon}</div>
                </div>
                <h3 style={{
                  fontFamily: '"Outfit", sans-serif', fontWeight: 900,
                  fontSize: 'clamp(1.4rem, 6vw, 1.8rem)',
                  textTransform: 'uppercase', lineHeight: 1.05,
                  margin: '0 0 0.5rem', whiteSpace: 'pre-line'
                }}>
                  {category.title}
                </h3>
                <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.82rem', lineHeight: 1.5, opacity: 0.75, marginBottom: '0.75rem' }}>
                  {category.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {category.skills.map((skill, sIdx) => (
                    <span key={sIdx} style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: '0.6rem', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.08em',
                      padding: '3px 8px', borderRadius: '6px',
                      background: 'rgba(0,0,0,0.15)',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    );
  }

  // ============================================================
  // DESKTOP VIEW — Full GSAP scroll animation
  // ============================================================
  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        position: 'relative', width: '100%', height: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', background: '#0f172a'
      }}
    >
      <div ref={glowRef} className="skills-bg-glow" />

      <div ref={heroRef} className="skills-hero-header">
        <h2>Technical <span>Skills</span></h2>
        <p>A comprehensive look at my technological expertise.</p>
      </div>

      <div ref={cardStackRef} className="skills-card-stack">
        <div ref={coverCardRef} className="skills-card skills-card--cover">
          <div><span className="card-number">00</span></div>
          <div>
            <h3 className="card-heading">Technical<br/>Expertise</h3>
            <p className="card-desc">
              An overview of the core technologies I use to build scalable web applications — modern frameworks, efficient state management, and seamless integrations.
            </p>
          </div>
        </div>

        {skillCategories.map((category, index) => (
          <div
            key={index}
            ref={el => (backCardsRef.current[index] = el)}
            className={`skills-card ${category.colorClass}`}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span className="card-number">0{index + 1}</span>
              <div style={{ opacity: 0.5 }}>{category.icon}</div>
            </div>
            <div>
              <h3 className="card-heading" style={{ whiteSpace: 'pre-line' }}>{category.title}</h3>
              <p className="card-desc">{category.description}</p>
              <div className="card-tags">
                {category.skills.map((skill, sIdx) => (
                  <span key={sIdx}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div ref={indicatorRef} className="skills-scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
};

export default Skills;
