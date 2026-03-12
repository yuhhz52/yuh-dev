import React, { useState } from 'react';

interface HeroProps {
  badge?: string;
  title?: string;
  description?: string;
}

const Hero: React.FC<HeroProps> = ({
  badge = 'Available for new projects',
  title = 'BACKEND DEVELOPER',
  description = 'Crafting immersive digital experiences through clean code and modern aesthetics. Specialized in high-performance web applications.',
}) => {
  const [showResume, setShowResume] = useState(false);

  return (
    <>
    {/* Resume PDF Modal */}
    {showResume && (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={() => setShowResume(false)}
      >
        <div
          className="relative w-[95vw] h-[92vh] max-w-5xl bg-agency-gray rounded-lg overflow-hidden shadow-2xl border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-3 bg-black/50 border-b border-white/10">
            <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Resume / CV</span>
            <div className="flex items-center gap-3">
              <a
                href="/resume.pdf"
                download
                className="text-sm font-bold uppercase tracking-wider text-agency-accent hover:text-white transition-colors duration-300 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </a>
              <button
                className="text-gray-400 hover:text-white transition-colors duration-300"
                onClick={() => setShowResume(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          {/* PDF Viewer */}
          <iframe
            src="/resume.pdf"
            className="w-full"
            style={{ height: 'calc(92vh - 52px)' }}
            title="Resume"
          />
        </div>
      </div>
    )}

    <section
      className="relative min-h-screen flex items-center pt-20 overflow-hidden gradient-bg"
      id="home"
    >
      {/* Animated background elements */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-agency-accent/10 rounded-full blur-[120px]" style={{ animation: 'float 6s ease-in-out infinite' }} />
      <div className="absolute bottom-1/4 -left-32 w-72 h-72 bg-agency-accent/5 rounded-full blur-[100px]" style={{ animation: 'float 8s ease-in-out infinite 2s' }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Decorative rotating ring */}
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[400px] h-[400px] border border-white/[0.03] rounded-full hidden lg:block" style={{ animation: 'slowRotate 40s linear infinite' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl">

          {/* Top meta row — role + status */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-10 reveal-hidden anim-fade-up" style={{ animationDelay: '0.2s' }}>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">Backend Developer</span>
            <span className="hidden sm:block w-8 h-px bg-white/10" />
            <span
              className="inline-flex items-center gap-2 text-xs font-bold text-agency-accent uppercase tracking-widest"
              style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}
            >
              <span className="w-1.5 h-1.5 bg-agency-accent rounded-full" style={{ animation: 'pulse-glow 2s ease-in-out infinite' }} />
              {badge}
            </span>
          </div>

          {/* Headline */}
          <div className="overflow-hidden mb-1">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black font-display leading-[0.85] tracking-tighter reveal-hidden anim-hero-text delay-300">
              BACKEND
            </h1>
          </div>
          <div className="mb-6 sm:mb-8">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black font-display leading-[0.85] tracking-tighter reveal-hidden anim-hero-text delay-500">
              <span className="text-outline">DEV</span>
              <span className="gradient-text">ELOPER</span>
            </h1>
          </div>

          {/* Description */}
          <div className="flex items-start gap-4 sm:gap-6 mb-10 sm:mb-12 reveal-hidden anim-fade-up delay-500">
            <div className="w-12 sm:w-16 h-px bg-agency-accent mt-3 flex-shrink-0" />
            <p className="text-base sm:text-lg md:text-xl text-gray-400 font-light max-w-lg leading-relaxed">
              {description}
            </p>
          </div>

          {/* CTA Buttons — responsive grid */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 reveal-hidden anim-fade-up delay-700">
            <a
              className="group relative inline-flex items-center justify-center h-14 px-8 bg-agency-accent text-white font-bold text-sm uppercase tracking-wider overflow-hidden transition-transform duration-300 hover:scale-[1.03]"
              href="#projects"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
            <a
              className="group relative inline-flex items-center justify-center h-14 px-8 border border-white/20 text-white font-bold text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 hover:border-agency-accent"
              href="#contact"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Me
              </span>
              <span className="absolute inset-0 bg-agency-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
            <button
              className="group relative inline-flex items-center justify-center h-14 px-8 border border-white/10 text-gray-400 font-bold text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 hover:border-agency-accent hover:text-white"
              onClick={() => setShowResume(true)}
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resume
              </span>
              <span className="absolute inset-0 bg-agency-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 reveal-hidden anim-fade-in delay-800">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-agency-accent to-transparent" style={{ animation: 'lineGrow 1.5s ease-in-out infinite', transformOrigin: 'top' }} />
      </div>

      {/* Vertical Side Text */}
      <div className="absolute right-10 bottom-10 hidden lg:block">
        <p className="rotate-90 origin-bottom-right text-xs uppercase tracking-[0.5em] text-gray-500 font-bold">
          Scroll to explore • Scroll to explore
        </p>
      </div>
    </section>
    </>
  );
};

export default Hero;
