import React, { useState } from 'react';

interface TopNavProps {
  brandName?: string;
  title?: string;
  contactText?: string;
}

const TopNav: React.FC<TopNavProps> = ({
  brandName = 'HUY',
  title = '# Backend Developer',
  contactText = 'Contact',
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-agency-black border-b border-white/10">
        <div className="px-6 py-4 flex justify-between items-center">
          {/* Brand Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-agency-accent rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">.</span>
            </div>
            <span className="text-xl font-black font-display tracking-tighter">
              {brandName}<span className="text-agency-accent">.</span>NT
            </span>
          </div>

          {/* Center Title - Hidden on mobile */}
          <div className="hidden md:block text-center text-sm font-bold uppercase tracking-widest text-gray-400">
            {title}
          </div>

          {/* Right Section - Contact and Menu */}
          <div className="flex items-center space-x-4">
            <a
              href="#contact"
              className="px-6 py-2 text-sm font-bold uppercase tracking-widest border border-agency-accent/30 text-gray-300 hover:text-agency-accent hover:border-agency-accent transition-all duration-300 hidden md:block"
            >
              {contactText}
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col space-y-1.5 w-6 h-6 items-center justify-center"
              aria-label="Toggle menu"
            >
              <div className={`w-full h-0.5 bg-agency-accent transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-full h-0.5 bg-agency-accent transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-full h-0.5 bg-agency-accent transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </button>

            {/* Desktop Menu Icon */}
            <button className="hidden md:flex flex-col space-y-1 w-6 cursor-pointer">
              <div className="w-full h-0.5 bg-agency-accent"></div>
              <div className="w-full h-0.5 bg-agency-accent"></div>
              <div className="w-full h-0.5 bg-agency-accent"></div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-agency-black border-t border-white/10 px-6 py-4 space-y-3">
            <a href="#home" className="block text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-agency-accent transition-colors">
              Home
            </a>
            <a href="#about" className="block text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-agency-accent transition-colors">
              About
            </a>
            <a href="#skills" className="block text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-agency-accent transition-colors">
              Skills
            </a>
            <a href="#projects" className="block text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-agency-accent transition-colors">
              Work
            </a>
            <a href="#experience" className="block text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-agency-accent transition-colors">
              Career
            </a>
            <a href="#contact" className="block text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-agency-accent transition-colors">
              Contact
            </a>
          </div>
        )}
      </nav>
    </>
  );
};

export default TopNav;
