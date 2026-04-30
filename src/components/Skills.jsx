import { motion } from 'framer-motion';
import { Layers, Terminal, Database, Cpu } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Terminal className="text-cyan-400" size={32} />,
      color: "border-cyan-500/50 shadow-cyan-500/20",
      glow: "#06b6d4",
      description: "Expertise in state management in React, crafting fully responsive designs, and creating scalable folder structures. Proficient in using Framer Motion to build smooth, interactive animations.",
      skills: ["React.js", "State Management", "Responsive Design", "Framer Motion", "Tailwind CSS", "Next.js", "TypeScript"]
    },
    {
      title: "Backend Integration",
      icon: <Database className="text-purple-400" size={32} />,
      color: "border-purple-500/50 shadow-purple-500/20",
      glow: "#a855f7",
      description: "Skilled in API integration, creating and managing databases using MongoDB (with Node.js and Mongoose) and Firebase. Experienced in seamlessly connecting frontend with backend systems.",
      skills: ["Node.js", "MongoDB", "Mongoose", "Firebase", "API Integration", "RESTful APIs"]
    },
    {
      title: "Tools & Ecosystem",
      icon: <Cpu className="text-emerald-400" size={32} />,
      color: "border-emerald-500/50 shadow-emerald-500/20",
      glow: "#10b981",
      description: "Utilizing a modern toolkit for efficient development workflows. Leveraging advanced AI tools, along with industry standard tools like Git and GitHub, to build and deploy high-quality applications.",
      skills: ["Antigravity", "Git", "GitHub", "VS Code", "Vite", "Chrome DevTools"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="skills" className="relative min-h-screen py-24 px-4 md:px-8 bg-slate-950 overflow-hidden flex flex-col justify-center">
      {/* Background Subtle Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        
        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 shadow-xl shadow-cyan-500/10">
              <Layers className="text-cyan-400" size={24} />
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter font-outfit">
              Technical <span className="text-cyan-400">Skills</span>
            </h2>
          </div>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto font-inter">
            A comprehensive look at my technological stack and expertise across the development lifecycle.
          </p>
        </motion.div>

        {/* Stack Layout for Horizontal Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-6 lg:gap-8"
        >
          
          {/* Cover Card (Technical Expertise) */}
          <motion.div
            variants={itemVariants}
            className="bg-slate-800 border-2 border-cyan-500/30 rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(6,182,212,0.1)] p-8 lg:p-10 flex flex-col md:flex-row gap-8 md:gap-12 hover:border-cyan-400/60 transition-colors duration-300"
          >
            <div className="flex flex-col justify-between w-full md:w-1/3">
              <div className="flex justify-between items-start mb-8 md:mb-0">
                <span className="text-7xl font-black text-cyan-500/10 font-outfit">00</span>
                <Layers className="text-cyan-400" size={48} />
              </div>
              <h3 className="text-4xl font-black text-white uppercase font-outfit leading-none mt-auto">Technical<br />Expertise</h3>
            </div>
            
            <div className="flex flex-col justify-center w-full md:w-2/3">
              <p className="text-slate-400 text-base md:text-lg font-inter mb-8">
                An overview of the core technologies I use to build scalable web applications. Focusing on modern frameworks, efficient state management, and seamless backend integrations.
              </p>
              
              <div className="space-y-4">
                <div className="flex justify-between text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <span>Core Competencies</span>
                  <span>2024 Edition</span>
                </div>
                <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    className="h-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skill Category Cards */}
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ x: 8 }}
              className={`bg-slate-800 border-2 ${category.color} rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.3)] p-8 lg:p-10 flex flex-col md:flex-row gap-8 md:gap-12 transition-all duration-300 hover:shadow-xl cursor-default`}
            >
              <div className="flex flex-col justify-between w-full md:w-1/3">
                <div className="flex justify-between items-start mb-8 md:mb-0">
                  <span className="text-7xl font-black text-white/5 font-outfit">0{index + 1}</span>
                  <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-700/50">
                    {category.icon}
                  </div>
                </div>
                <h3 className="text-3xl font-black text-white uppercase font-outfit leading-none mt-auto">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-col justify-center w-full md:w-2/3">
                <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 font-inter">
                  {category.description}
                </p>

                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-4 py-2 bg-slate-900/80 border border-slate-700/50 rounded-xl text-xs font-bold text-slate-300 uppercase tracking-wider hover:border-cyan-500/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
