import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
            <User className="text-cyan-400" size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">About Me</h2>
          <div className="h-px bg-slate-800 flex-grow ml-4"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8 md:p-12 shadow-xl backdrop-blur-sm hover:shadow-cyan-500/5 transition-shadow duration-500"
        >
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-6">
            I'm a passionate Frontend Developer with a strong foundation in modern web technologies. As a BCA graduate (2026), I thrive on turning complex problems into intuitive, beautiful, and highly performant user interfaces. 
          </p>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
            Beyond academics, my experience includes active participation in hackathons and leading technical teams, which has honed my problem-solving skills and ability to collaborate effectively in fast-paced environments.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
