import React from 'react';
import { motion } from 'framer-motion';
import { Code, ExternalLink } from 'lucide-react';
import { GithubIcon as Github } from './Icons';

const Projects = () => {
  const projects = [
    {
      title: 'MealMate',
      description: 'A React-based recipe application featuring browsing, favorites management, and advanced filtering options. Designed for a seamless culinary discovery experience.',
      techStack: ['React', 'Tailwind CSS', 'API Integration', 'Mongodb', 'JWT Authentication', 'Framer Motion'],
      githubLink: 'https://github.com/khush-gethub/Meal-Mate',
      liveLink: '#',
      featured: true,
    },
    {
      title: 'PCPARTS',
      description: 'A comprehensive frontend interface for PC component browsing and building. Built with modern web standards focusing on performance and user experience.',
      techStack: ['React', 'JavaScript', 'Tailwind CSS', 'Mongodb', 'Stripe Payment Gateway', 'JWT Authentication',],
      githubLink: 'https://github.com/khush-gethub/PCPARTS',
      liveLink: '#',
    },
    {
      title: 'Skilliva',
      description: 'A clean, modern skill-learning platform designed to showcase structured courses, intuitive navigation, and a smooth user experience',
      techStack: ['HTML5', 'CSS3', 'JavaScript (ES6)', 'Bootstrap', 'Git & GitHub Pages'],
      githubLink: 'https://github.com/daxmore/Skilliva',
      liveLink: 'https://daxmore.github.io/Skilliva/',
    }
  ];

  return (
    <section id="projects" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-40 -left-64 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-40 -right-64 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-4 mb-20"
        >
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
            <Code className="text-cyan-400" size={28} />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Featured Projects</h2>
          <div className="h-px bg-slate-800 flex-grow ml-6"></div>
        </motion.div>

        {/* 2 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.3, type: "spring", stiffness: 60 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className={`group flex flex-col bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-3xl overflow-hidden hover:border-cyan-500/60 transition-all duration-500 relative ${project.featured ? 'shadow-lg shadow-cyan-500/10' : 'shadow-xl'}`}
            >
              {/* Card Hover Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 via-transparent to-cyan-500/0 group-hover:to-cyan-500/10 transition-all duration-500 pointer-events-none"></div>

              <div className="p-8 md:p-10 flex-grow flex flex-col relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <motion.h3
                    className="text-3xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300"
                  >
                    {project.title}
                  </motion.h3>
                  <div className="flex gap-4">
                    <motion.a
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      href={project.githubLink}
                      target={project.githubLink !== '#' ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white bg-slate-900/50 p-2 rounded-full border border-slate-700/50 hover:border-slate-500 transition-all"
                      aria-label="GitHub Repository"
                    >
                      <Github size={22} />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                      href={project.liveLink}
                      target={project.liveLink !== '#' ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-cyan-400 bg-slate-900/50 p-2 rounded-full border border-slate-700/50 hover:border-cyan-500/50 hover:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all"
                      aria-label="Live Demo"
                    >
                      <ExternalLink size={22} />
                    </motion.a>
                  </div>
                </div>

                <p className="text-slate-300 mb-8 flex-grow leading-relaxed text-lg">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 mt-auto pt-6 border-t border-slate-700/50">
                  {project.techStack.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      whileHover={{ y: -3, scale: 1.1 }}
                      className="text-sm font-semibold text-cyan-300 bg-cyan-900/30 px-4 py-1.5 rounded-full border border-cyan-700/50 hover:bg-cyan-800/40 hover:border-cyan-500 transition-colors cursor-default shadow-sm"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
