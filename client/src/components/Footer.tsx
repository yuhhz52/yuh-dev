import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface FooterProps {
  brandName?: string;
  year?: number;
}

const Footer: React.FC<FooterProps> = ({
  brandName = 'HUY',
  year = new Date().getFullYear(),
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>(0.3);

  return (
    <footer
      ref={ref}
      className="py-12 bg-agency-black border-t border-white/5"
      data-purpose="site-footer"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className={`flex flex-col md:flex-row justify-between items-center gap-8 ${isVisible ? 'anim-fade-up' : 'reveal-hidden'}`}>
          <div className="text-xl font-black font-display tracking-tighter">
          {brandName}<span className="text-agency-accent">.</span>NT
          </div>
          <div className="text-gray-500 text-sm">
            &copy; {year} Built with Passion. All Rights Reserved. By Nguyen Thanh Huy.
          </div>
          <a
            className="group flex items-center space-x-2 text-xs font-bold uppercase tracking-widest hover:text-agency-accent transition-colors duration-300"
            href="#home"
          >
            <span>Back to top</span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M5 10l7-7m0 0l7 7m-7-7v18"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
