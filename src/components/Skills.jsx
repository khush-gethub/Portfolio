import React from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      description: "Expertise in state management in React, crafting fully responsive designs, and creating scalable folder structures. Proficient in using Framer Motion to build smooth, interactive animations and more.",
      skills: ["React.js", "State Management", "Responsive Design", "Framer Motion", "Tailwind CSS", "Next.js", "TypeScript"]
    },
    {
      title: "Backend Integration",
      description: "Skilled in API integration, creating and managing databases using MongoDB (with Node.js and Mongoose) and Firebase. Experienced in seamlessly connecting frontend with backend systems and managing complex data flows.",
      skills: ["Node.js", "MongoDB", "Mongoose", "Firebase", "API Integration", "RESTful APIs"]
    },
    {
      title: "Tools & Ecosystem",
      description: "Utilizing a modern toolkit for efficient development workflows. Leveraging advanced AI tools like Antigravity, along with standard industry tools like GitHub Desktop and Git, to build, manage, and deploy high-quality applications.",
      skills: ["Antigravity", "GitDesktop", "Git", "GitHub", "VS Code", "Vite", "Chrome DevTools"]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
            <Layers className="text-cyan-400" size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Technical Skills</h2>
          <div className="h-px bg-slate-800 flex-grow ml-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.6, type: "spring", stiffness: 50 }}
              whileHover={{ scale: 1.02 }}
              className="bg-slate-800/40 border border-slate-700 rounded-2xl p-8 hover:bg-slate-800/60 hover:border-slate-500 transition-all duration-300 flex flex-col md:flex-row gap-8 items-center group relative overflow-hidden"
            >
              {/* Background gradient effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:via-cyan-500/5 group-hover:to-transparent transition-all duration-500"></div>

              <div className="flex-1 relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2 group-hover:text-cyan-300 transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {category.description}
                </p>
              </div>

              <div className="flex-1 flex flex-wrap gap-3 md:justify-end relative z-10 w-full md:w-auto">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="px-4 py-2 bg-slate-900/80 border border-slate-700 rounded-lg text-sm font-medium text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
