import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`md:hidden fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/80 backdrop-blur-md py-4 shadow-lg shadow-slate-900/20 border-b border-slate-800' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <a href="#home" className="text-xl font-bold tracking-tight text-white hover:text-cyan-400 transition-colors duration-300">
              Khushal<span className="text-cyan-400">.</span>
            </a>
          </div>

          {/* Mobile Menu Button - Animated Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white focus:outline-none w-8 h-8 flex flex-col justify-center items-center relative z-50"
              aria-label="Toggle Menu"
            >
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: -4 }}
                className="w-6 h-0.5 bg-current absolute block transition-colors"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-current absolute block transition-colors"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 4 }}
                className="w-6 h-0.5 bg-current absolute block transition-colors"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden absolute w-full bg-slate-900 border-b border-slate-800 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-md transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
