import React, { useState, useEffect } from 'react';

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(10,10,10,0.85)' : '#0a0a0a',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div className="px-6 py-4 flex justify-between items-center">
          {/* Brand Logo */}
          <div className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-110">
              <img src={`${process.env.PUBLIC_URL}/avatar.jpg`} alt="Avatar" className="w-full h-full object-cover" />
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
              className="group relative px-6 py-2 text-sm font-bold uppercase tracking-widest border border-agency-accent/30 text-gray-300 overflow-hidden hidden md:block transition-colors duration-300 hover:text-white"
            >
              <span className="relative z-10">{contactText}</span>
              <span className="absolute inset-0 bg-agency-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-400" />
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
            <button className="hidden md:flex flex-col space-y-1 w-6 cursor-pointer group">
              <div className="w-full h-0.5 bg-agency-accent transition-all duration-300 group-hover:w-3/4"></div>
              <div className="w-full h-0.5 bg-agency-accent transition-all duration-300"></div>
              <div className="w-full h-0.5 bg-agency-accent transition-all duration-300 group-hover:w-1/2"></div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}
          style={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)' }}
        >
          <div className="px-6 py-4 space-y-3 border-t border-white/10">
            {[
              { href: '#home', label: 'Home' },
              { href: '#about', label: 'About' },
              { href: '#skills', label: 'Skills' },
              { href: '#projects', label: 'Work' },
              { href: '#experience', label: 'Career' },
              { href: '#contact', label: 'Contact' },
            ].map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                className="block text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-agency-accent hover:translate-x-2 transition-all duration-300"
                style={{ transitionDelay: menuOpen ? `${idx * 50}ms` : '0ms' }}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopNav;
