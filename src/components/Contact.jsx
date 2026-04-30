import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './Icons';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
            <Mail className="text-cyan-400" size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Get In Touch</h2>
          <div className="h-px bg-slate-800 flex-grow ml-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Let's talk about everything!</h3>
            <p className="text-slate-400 mb-8 leading-relaxed max-w-md">
              Feel free to reach out for collaborations, job opportunities, or just a friendly chat. I'm always open to discussing new projects and creative ideas.
            </p>

            <div className="space-y-6">
              <a href="mailto:khushalsonarghare@gmail.com" className="group flex items-center gap-4 p-4 bg-slate-800/40 border border-slate-700 rounded-2xl hover:border-cyan-500/50 transition-colors">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Email Me</p>
                  <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">khushalsonarghare@gmail.com</p>
                </div>
              </a>

              <a href="tel:+919081318142" className="group flex items-center gap-4 p-4 bg-slate-800/40 border border-slate-700 rounded-2xl hover:border-cyan-500/50 transition-colors">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Call Me</p>
                  <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">+91 9081318142</p>
                </div>
              </a>

              <div className="group flex items-center gap-4 p-4 bg-slate-800/40 border border-slate-700 rounded-2xl">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-cyan-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Location</p>
                  <p className="text-white font-medium">Surat</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <a
                href="https://github.com/khush-gethub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-all hover:-translate-y-1"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/khushal-sonarghare/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-[#0a66c2] hover:border-[#0a66c2] transition-all hover:-translate-y-1"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="bg-slate-800/30 border border-slate-700 rounded-3xl p-8 backdrop-blur-sm"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Your Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all resize-none"
                  placeholder="How can I help you?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full group flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-cyan-500/25"
              >
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
