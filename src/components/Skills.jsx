import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Database, Cpu, Palette } from 'lucide-react';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// ===================================================================
// Skills Section — Scroll-Driven 3D Card Stack Flip Animation
// ===================================================================
// Uses GSAP + ScrollTrigger (pin: true) to create a cinematic
// 4-phase experience WITHOUT fixed-position overlap issues:
//   Phase 1: Hero header fades out, card stack enters from bottom
//   Phase 2: Cover card flips away, revealing 4 skill cards behind
//   Phase 3: Skill cards fly off screen one by one (alternating L/R)
//   Phase 4: Card stack fades out completely
// ===================================================================

const Skills = () => {
  // Refs for GSAP targeting
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

  useEffect(() => {
    // Guard: ensure all refs are attached
    const section = sectionRef.current;
    const hero = heroRef.current;
    const cardStack = cardStackRef.current;
    const coverCard = coverCardRef.current;
    const backCards = backCardsRef.current.filter(Boolean);
    const glow = glowRef.current;
    const indicator = indicatorRef.current;

    if (!section || !hero || !cardStack || !coverCard || backCards.length < 4) return;

    // ===========================================
    // 3D INITIAL STATE SETUP
    // ===========================================

    // The cover card faces forward — no rotation needed.
    // It sits at the front of the stack in Z-space.
    gsap.set(coverCard, {
      rotationY: 0,
      z: 100   // Slightly forward to prevent z-fighting
    });

    // The 4 back cards start FACING BACKWARD (rotateY: 180deg).
    // They are positioned behind the cover card in Z-space.
    // When they flip forward (rotateY → 0), they will become visible.
    backCards.forEach((card, i) => {
      gsap.set(card, {
        rotationY: 180,
        z: -(i + 1) * 5   // Stack them progressively further back
      });
    });

    // The entire card stack starts off-screen at the bottom
    // with a slight 3D tilt for a dramatic entrance effect.
    gsap.set(cardStack, {
      y: '120vh',
      rotationX: 15
    });

    // Hero header starts visible (will fade during Phase 1)
    gsap.set(hero, { opacity: 1, y: 0 });

    // Scroll indicator visible at start
    gsap.set(indicator, { opacity: 0.4 });

    // ===========================================
    // MASTER TIMELINE — Attached to ScrollTrigger
    // ===========================================
    // pin: true pins the section during animation,
    // preventing any overlap with other components.
    // end: "+=300%" gives 3× viewport scroll distance.
    // scrub: 2.2 gives a smooth, slightly delayed response.

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=300%',     // 3× viewport for breathing room
        scrub: 2.2,
        pin: true,         // Pin the section — no overlap!
        anticipatePin: 1
      }
    });

    // ===========================================
    // PHASE 1: ENTRANCE
    // ===========================================
    // The hero header moves up and fades out while the card
    // stack simultaneously rises from below into view.

    // Fade out the scroll indicator immediately
    tl.to(indicator, {
      opacity: 0,
      duration: 0.3
    }, 0);

    // Hero header animates UP and fades out
    tl.to(hero, {
      opacity: 0,
      y: -100,
      duration: 0.8,
      ease: 'power2.inOut'
    }, 0);

    // Card stack rises from off-screen into center view
    // Simultaneously removing the initial rotateX tilt
    tl.to(cardStack, {
      y: 0,
      rotationX: 0,
      duration: 1,
      ease: 'power2.out'
    }, 0.1);

    // ===========================================
    // PHASE 2: THE FLIP
    // ===========================================
    // The cover card flips away (rotationY → -180), revealing
    // the 4 back cards that flip forward (rotationY → 0).
    // Z-depth is recalculated so Card 1 ends up on top.

    // Cover card flips away — pushed far back in Z-space
    tl.to(coverCard, {
      rotationY: -180,      // Flip it fully backward
      z: -500,              // Push it far behind everything
      x: -120,              // Slide it left for visual flair
      duration: 0.8,
      ease: 'back.inOut(1.2)'
    }, 1.2);

    // Back cards flip forward — they rotate from 180 → 0
    // Each card gets a slight stagger for a cascading reveal.
    // Z-translation is recalculated: Card 1 ends up closest
    // to the viewer (highest Z), Card 4 furthest back.
    backCards.forEach((card, i) => {
      tl.to(card, {
        rotationY: 0,
        // Card 0 (first back card) gets the highest Z (closest to viewer)
        // Card 3 (last back card) gets the lowest Z (furthest away)
        z: (backCards.length - i) * 20,
        duration: 0.8,
        ease: 'back.inOut(1.2)'
      }, 1.2 + (i * 0.08)); // Slight stagger per card
    });

    // ===========================================
    // PHASE 3: THE DISMISSAL
    // ===========================================
    // Cards fly off screen one by one. Even-indexed cards go
    // LEFT, odd-indexed cards go RIGHT. Each card scales down
    // slightly and tilts as it leaves.
    // The background glow changes color to match each departing card.

    const dismissalStart = 2.5;   // Starting point in the timeline
    const cardDuration = 0.5;     // Duration each card takes to fly off
    const cardDelay = 0.4;        // Delay between each card's departure

    backCards.forEach((card, i) => {
      const startAt = dismissalStart + (i * cardDelay);
      const isEven = i % 2 === 0;

      // Fly the card off screen with alternating trajectory
      tl.to(card, {
        y: '-150vh',                         // Fly upward
        x: isEven ? '-20vw' : '20vw',       // Alternate left/right
        rotationX: 20,                       // Tilt forward as it leaves
        rotationZ: isEven ? -15 : 15,        // Spin slightly
        scale: 0.85,                         // Shrink subtly
        duration: cardDuration,
        ease: 'power3.in'
      }, startAt);

      // Synchronize background glow color to match the leaving card
      tl.to(glow, {
        background: `radial-gradient(circle, ${skillCategories[i].glowColor} 0%, transparent 70%)`,
        duration: cardDuration * 0.5,
        ease: 'none'
      }, startAt);
    });

    // ===========================================
    // PHASE 4: EXIT
    // ===========================================
    // Fade out the entire card stack at the very end.

    tl.to(cardStack, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.inOut'
    }, dismissalStart + (4 * cardDelay));

    // Also fade out the glow
    tl.to(glow, {
      opacity: 0,
      duration: 0.3
    }, dismissalStart + (4 * cardDelay));

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      tl.kill();
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#0f172a'  // slate-900
      }}
    >
      {/* Background Glow — shifts color during Phase 3 */}
      <div ref={glowRef} className="skills-bg-glow" />

      {/* Hero Header — visible at start, fades out in Phase 1 */}
      <div ref={heroRef} className="skills-hero-header">
        <h2>
          Technical <span>Skills</span>
        </h2>
        <p>A comprehensive look at my technological expertise.</p>
      </div>

      {/* ====================================
          CARD STACK
          Contains 5 cards: 1 cover + 4 back
          transform-style: preserve-3d enables
          the 3D stacking and flip effects.
          ==================================== */}
      <div ref={cardStackRef} className="skills-card-stack">

        {/* COVER CARD (00) — "Technical Expertise" overview */}
        <div
          ref={coverCardRef}
          className="skills-card skills-card--cover"
        >
          <div>
            <span className="card-number">00</span>
          </div>
          <div>
            <h3 className="card-heading">Technical<br/>Expertise</h3>
            <p className="card-desc">
              An overview of the core technologies I use to build scalable web applications — modern frameworks, efficient state management, and seamless integrations.
            </p>
          </div>
        </div>

        {/* BACK CARDS (01–04) — One per skill category */}
        {/* These start facing backward (rotateY: 180deg) and
            flip forward during Phase 2 of the animation. */}
        {skillCategories.map((category, index) => (
          <div
            key={index}
            ref={el => (backCardsRef.current[index] = el)}
            className={`skills-card ${category.colorClass}`}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span className="card-number">0{index + 1}</span>
              <div style={{ opacity: 0.5 }}>
                {category.icon}
              </div>
            </div>
            <div>
              <h3 className="card-heading" style={{ whiteSpace: 'pre-line' }}>
                {category.title}
              </h3>
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

      {/* Scroll Indicator — subtle hint to scroll */}
      <div ref={indicatorRef} className="skills-scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
};

export default Skills;
