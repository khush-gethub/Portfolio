import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin, TwitterIcon } from './Icons';

const Hero = () => {
  // Staggered container for tech stack
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden relative">
      {/* Animated Background glow effects */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 50, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] -z-10 mix-blend-screen"
      ></motion.div>
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, -50, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -z-10 mix-blend-screen"
      ></motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md text-sm font-semibold text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.15)] cursor-default"
          >
            <Sparkles size={16} className="text-yellow-400 animate-pulse" />
            <span>Available for new opportunities</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight mb-6 leading-tight"
          >
            Hi, I'm{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient-x">Khushal</span>
              {/* Highlight behind text */}
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.8, duration: 0.8, ease: "easeInOut" }}
                className="absolute bottom-2 left-0 h-4 bg-cyan-500/20 -z-10 rounded-full blur-sm"
              ></motion.span>
            </span>
            <br />
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-4xl md:text-6xl text-slate-300 font-bold"
            >
              Frontend Developer
            </motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="max-w-2xl text-lg md:text-xl text-slate-400 mb-10 leading-relaxed"
          >
            I build responsive, fast, and user-friendly web applications using React and modern technologies. Transforming ideas into elegant, interactive digital experiences.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5, type: "spring" }}
            className="flex flex-col sm:flex-row gap-5 mb-16"
          >
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="group flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
            >
              View Projects
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, backgroundColor: "rgba(34,211,238,0.1)" }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="group flex items-center justify-center gap-2 border-2 border-slate-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
            >
              <Mail size={20} className="group-hover:scale-110 transition-transform duration-300" />
              Contact Me
            </motion.a>
          </motion.div>

          {/* Social Links & Tech Stack */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col items-center gap-8 w-full max-w-3xl"
          >
            <div className="flex gap-8">
              {[
                { icon: Github, link: "https://github.com/khush-gethub", color: "hover:text-white" },
                { icon: Linkedin, link: "https://www.linkedin.com/in/khushal-sonarghare/", color: "hover:text-[#0a66c2]" },
                { icon: TwitterIcon, link: "#", color: "hover:text-[#1DA1F2]" }
              ].map((social, index) => (
                <motion.a 
                  key={index}
                  whileHover={{ y: -5, scale: 1.2 }}
                  href={social.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`text-slate-400 ${social.color} transition-colors duration-300`}
                >
                  <social.icon size={28} />
                </motion.a>
              ))}
            </div>

            <div className="pt-8 border-t border-slate-800/80 w-full">
              <p className="w-full text-sm text-slate-500 mb-4 uppercase tracking-widest font-bold">Core Tech Stack</p>
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap justify-center gap-3 md:gap-4"
              >
                {['React', 'Tailwind CSS', 'JavaScript', 'Git', 'TypeScript'].map((tech) => (
                  <motion.span 
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, y: -2, backgroundColor: "rgba(34,211,238,0.15)", borderColor: "rgba(34,211,238,0.5)", color: "#67e8f9" }}
                    key={tech} 
                    className="px-5 py-2.5 bg-slate-800/40 backdrop-blur-sm border border-slate-700/80 rounded-xl text-sm font-semibold text-slate-300 shadow-sm transition-colors duration-300 cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
