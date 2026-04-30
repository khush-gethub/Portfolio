import React from 'react';
import { Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-4">
            <a href="https://github.com/khush-gethub" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors hover:-translate-y-1 transform duration-300">
              <GithubIcon size={20} />
            </a>
            <a href="https://www.linkedin.com/in/khushal-sonarghare/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0a66c2] transition-colors hover:-translate-y-1 transform duration-300">
              <LinkedinIcon size={20} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#1DA1F2] transition-colors hover:-translate-y-1 transform duration-300">
              <TwitterIcon size={20} />
            </a>
            <a href="tel:+919081318142" className="text-slate-400 hover:text-cyan-400 transition-colors hover:-translate-y-1 transform duration-300">
              <Phone size={20} />
            </a>
          </div>
          
          <div className="text-slate-400 text-sm text-center md:text-left">
            © {currentYear} Khushal Sonarghare. All rights reserved.
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Built with</span>
            <span className="font-semibold text-cyan-400">React</span>
            <span className="text-slate-500">&</span>
            <span className="font-semibold text-blue-400">Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
