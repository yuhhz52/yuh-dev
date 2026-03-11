import React from 'react';

interface FooterProps {
  brandName?: string;
  year?: number;
}

const Footer: React.FC<FooterProps> = ({
  brandName = 'DEV.PORTFOLIO',
  year = new Date().getFullYear(),
}) => {
  return (
    <footer
      className="py-12 bg-agency-black border-t border-white/5"
      data-purpose="site-footer"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-black font-display tracking-tighter">
            DEV<span className="text-agency-accent">.</span>PORTFOLIO
          </div>
          <div className="text-gray-500 text-sm">
            © {year} Built with Passion. All Rights Reserved.
          </div>
          <a
            className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest hover:text-agency-accent transition-colors"
            href="#home"
          >
            <span>Back to top</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
