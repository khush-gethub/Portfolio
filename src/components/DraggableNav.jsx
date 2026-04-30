import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(Draggable);

const DraggableNav = () => {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const toggleRef = useRef(null);
  const contentRef = useRef(null);
  const l1Ref = useRef(null);
  const l2Ref = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  const { contextSafe } = useGSAP({ scope: wrapperRef });

  useEffect(() => {
    const draggables = Draggable.create(wrapperRef.current, {
      type: "x,y",
      onDragStart: () => {
        setIsDragging(true);
        gsap.to(containerRef.current, { scale: 1.05, duration: 0.2 });
      },
      onDragEnd: () => {
        setTimeout(() => { setIsDragging(false); }, 100);
        gsap.to(containerRef.current, { scale: 1, duration: 0.2 });
      }
    });

    return () => {
      draggables.forEach(d => d.kill());
    };
  }, []);

  const toggleMenu = contextSafe(() => {
    if (isDragging) return;
    
    if (isOpen) {
      gsap.to(contentRef.current, { autoAlpha: 0, y: 10, duration: 0.2, ease: "power2.in" });
      gsap.to(l1Ref.current, { y: 0, rotate: 0, duration: 0.3 });
      gsap.to(l2Ref.current, { y: 0, rotate: 0, duration: 0.3 });
      setIsOpen(false);
    } else {
      gsap.fromTo(contentRef.current, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" });
      gsap.to(l1Ref.current, { y: 3, rotate: 45, duration: 0.3 });
      gsap.to(l2Ref.current, { y: -3, rotate: -45, duration: 0.3 });
      setIsOpen(true);
    }
  });

  return (
    <div className="hidden md:block">
      <div 
        ref={wrapperRef}
        className="fixed bottom-10 left-[calc(50%-30px)] z-[60] flex flex-col items-center"
      >
        {/* Dropdown Menu (Above) */}
        <div 
          ref={contentRef}
          className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-full p-2 flex flex-row shadow-[0_10px_40px_rgba(0,0,0,0.5)] opacity-0 invisible"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white text-sm font-semibold tracking-wider opacity-60 hover:opacity-100 hover:text-cyan-400 hover:bg-white/5 rounded-full transition-all duration-300 py-2 px-5 whitespace-nowrap"
              onClick={(e) => {
                if (isDragging) {
                  e.preventDefault();
                } else {
                  toggleMenu();
                }
              }}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Draggable Button */}
        <div 
          ref={containerRef}
          className="h-[60px] w-[60px] bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
        >
          <div 
            ref={toggleRef}
            onClick={toggleMenu}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 transition-colors rounded-full flex flex-col justify-center items-center gap-1 cursor-pointer"
          >
            <span ref={l1Ref} className="w-[14px] h-[2px] bg-white rounded-full"></span>
            <span ref={l2Ref} className="w-[14px] h-[2px] bg-white rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraggableNav;
