import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award, Star } from 'lucide-react';

const Education = () => {
  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + (i * 0.15),
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    })
  };

  return (
    <section id="education" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
            <GraduationCap className="text-cyan-400" size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Education Path</h2>
          <div className="h-px bg-slate-800 flex-grow ml-4"></div>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative pl-8 md:pl-0">
            {/* Timeline Line (Mobile) */}
            <div className="md:hidden absolute left-[11px] top-2 bottom-0 w-0.5 bg-slate-800"></div>

            {/* Education Item */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
              whileHover={{ scale: 1.01 }}
              className="relative md:flex items-start justify-between bg-slate-800/40 border border-slate-700 rounded-3xl p-8 md:p-12 hover:bg-slate-800/60 hover:border-slate-500 transition-all duration-300 group overflow-hidden shadow-xl"
            >
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:via-transparent group-hover:to-cyan-500/5 transition-all duration-700"></div>
              
              {/* Timeline Dot (Mobile) */}
              <div className="md:hidden absolute left-[-21px] top-12 w-4 h-4 rounded-full bg-cyan-500 border-4 border-slate-900 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-shadow"></div>

              <div className="relative z-10 w-full">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8">
                  <div>
                    <motion.h3 
                      className="text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300"
                    >
                      Bachelor of Computer Applications (BCA)
                    </motion.h3>
                    <p className="text-xl md:text-2xl text-cyan-400 font-medium flex items-center gap-2">
                      <GraduationCap size={24} className="hidden md:block opacity-70" />
                      S.M.T.Z.S Patel College
                    </p>
                  </div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 text-slate-300 bg-slate-900/80 px-5 py-3 rounded-full border border-slate-600 shadow-lg whitespace-nowrap mt-6 md:mt-0 self-start"
                  >
                    <Calendar size={18} className="text-cyan-400" />
                    <span className="font-semibold text-lg">Class of 2026</span>
                  </motion.div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8">
                  <motion.div 
                    custom={0}
                    variants={statsVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.03 }}
                    className="flex flex-col gap-2 bg-slate-900/60 p-5 rounded-2xl border border-slate-700/50 hover:border-yellow-500/50 hover:shadow-[0_0_20px_rgba(234,179,8,0.15)] transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 text-yellow-500 font-medium">
                      <Star size={20} className="fill-yellow-500/20" />
                      CGPA
                    </div>
                    <div className="text-3xl font-bold text-white">7.66</div>
                  </motion.div>

                  <motion.div 
                    custom={1}
                    variants={statsVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.03 }}
                    className="flex flex-col gap-2 bg-slate-900/60 p-5 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 text-blue-500 font-medium">
                      <Award size={20} />
                      Percentage
                    </div>
                    <div className="text-3xl font-bold text-white">76.80<span className="text-xl text-slate-400">%</span></div>
                  </motion.div>

                  <motion.div 
                    custom={2}
                    variants={statsVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.03 }}
                    className="flex flex-col gap-2 bg-slate-900/60 p-5 rounded-2xl border border-slate-700/50 hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 text-green-500 font-medium">
                      <Star size={20} className="fill-green-500/20" />
                      YGPA
                    </div>
                    <div className="text-3xl font-bold text-white">8.27</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
