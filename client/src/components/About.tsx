import React, { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface AboutStats {
  value: string;
  numericValue: number;
  label: string;
}

interface AboutProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  stats?: AboutStats[];
}

/* ── Rolling Digit Counter (Fluinto slot-machine style) ── */
const RollingDigit: React.FC<{ digit: number; delay: number; isVisible: boolean }> = ({ digit, delay, isVisible }) => {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      const timer = setTimeout(() => setHasAnimated(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay, hasAnimated]);

  return (
    <span className="inline-block h-[1.1em] overflow-hidden relative" style={{ width: '0.65em' }}>
      <span
        className="flex flex-col transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: hasAnimated ? `translateY(-${digit * 10}%)` : 'translateY(-90%)',
        }}
      >
        {digits.map((d) => (
          <span key={d} className="block h-[1.1em] leading-[1.1em] text-center">{d}</span>
        ))}
      </span>
    </span>
  );
};

const RollingCounter: React.FC<{ target: number; suffix: string; isVisible: boolean }> = ({
  target,
  suffix,
  isVisible,
}) => {
  const digitArr = String(target).split('').map(Number);
  return (
    <span className="inline-flex items-baseline">
      {digitArr.map((d, i) => (
        <RollingDigit key={i} digit={d} delay={i * 150} isVisible={isVisible} />
      ))}
      <span className="ml-0.5">{suffix}</span>
    </span>
  );
};

const About: React.FC<AboutProps> = ({
  title = 'BLENDING STRATEGY WITH TECHNOLOGY.',
  description = 'I am a backend developer with a passion for building scalable, high-performance systems and robust server-side architectures. My approach focuses on designing clean APIs, optimizing database performance, and ensuring the reliability and security of the core infrastructure. I believe that every line of code should contribute to a stable, efficient, and maintainable system.',
  imageUrl = `${process.env.PUBLIC_URL}/avatar.jpg`,
  stats = [
    { value: '1+', numericValue: 1, label: 'Years Experience' },
    { value: '5+', numericValue: 5, label: 'Projects Delivered' },
  ],
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-24 bg-agency-black" data-purpose="about-me" id="about">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Number Label */}
        <div className={`mb-12 ${isVisible ? 'anim-fade-up' : 'reveal-hidden'}`}>
          <span className="section-label">[001] About</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div className={`relative group ${isVisible ? 'anim-slide-left' : 'reveal-hidden'}`} data-purpose="profile-image-container">
            <div className="aspect-square overflow-hidden border border-white/5">
              <img
                alt="Developer Portrait"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={imageUrl}
              />
            </div>
            <div className={`absolute -bottom-6 -right-6 w-48 h-48 bg-agency-accent flex items-center justify-center p-8 ${isVisible ? 'anim-scale-in delay-400' : 'reveal-hidden'}`}>
              <p className="font-display font-black text-4xl leading-tight">EST. 2025</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <p className={`text-agency-accent text-sm uppercase tracking-[0.3em] font-bold ${isVisible ? 'anim-fade-up delay-100' : 'reveal-hidden'}`}>Nguyễn Thành Huy</p>
            <h2 className={`text-4xl md:text-5xl font-display font-black leading-tight ${isVisible ? 'anim-fade-up delay-200' : 'reveal-hidden'}`}>
              {title}
            </h2>
            <p className={`text-gray-400 text-lg leading-relaxed text-justify ${isVisible ? 'anim-fade-up delay-300' : 'reveal-hidden'}`}>{description}</p>

            {/* Stats Grid with Rolling Digits */}
            <div className={`grid grid-cols-2 gap-8 pt-8 border-t border-white/10 ${isVisible ? 'anim-fade-up delay-400' : 'reveal-hidden'}`}>
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <span className="block text-5xl font-display font-black text-agency-accent">
                    <RollingCounter
                      target={stat.numericValue}
                      suffix="+"
                      isVisible={isVisible}
                    />
                  </span>
                  <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
