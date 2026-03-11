import React from 'react';

interface HeroProps {
  badge?: string;
  title?: string;
  description?: string;
}

const Hero: React.FC<HeroProps> = ({
  badge = 'Available for new projects',
  title = 'FULLSTACK DEVELOPER',
  description = 'Crafting immersive digital experiences through clean code and modern aesthetics. Specialized in high-performance web applications.',
}) => {
  return (
    <section
      className="relative min-h-screen flex items-center pt-20 overflow-hidden gradient-bg"
      id="home"
    >
      {/* Background visual element */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-agency-accent/10 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <span className="inline-block py-1 px-3 mb-6 border border-agency-accent/30 rounded-full text-xs font-bold text-agency-accent uppercase tracking-widest">
            {badge}
          </span>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-display leading-[0.9] mb-8 tracking-tighter">
            FULLSTACK <br />
            <span className="text-outline">DEVELOPER</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 font-light mb-10 max-w-2xl leading-relaxed">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-6">
            <a
              className="px-8 py-4 bg-agency-accent text-white font-bold text-lg hover:scale-105 transition-transform duration-300"
              href="#projects"
            >
              View Projects
            </a>
            <a
              className="px-8 py-4 border border-white/20 hover:bg-white hover:text-black font-bold text-lg transition-all duration-300"
              href="#contact"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* Vertical Side Text */}
      <div className="absolute right-10 bottom-10 hidden lg:block">
        <p className="rotate-90 origin-bottom-right text-xs uppercase tracking-[0.5em] text-gray-500 font-bold">
          Scroll to explore • Scroll to explore
        </p>
      </div>
    </section>
  );
};

export default Hero;
