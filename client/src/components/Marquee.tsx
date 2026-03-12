import React from 'react';

interface MarqueeProps {
  items?: string[];
  reverse?: boolean;
}

const Marquee: React.FC<MarqueeProps> = ({
  items = ['Java', 'Spring Boot', 'NestJS', 'React', 'PostgreSQL', 'Docker', 'TypeScript', 'Go', 'MongoDB', 'REST API', 'WebSocket', 'CI/CD'],
  reverse = false,
}) => {
  const trackClass = reverse ? 'marquee-track-reverse' : 'marquee-track';
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden py-6 border-y border-white/5 bg-agency-black/50 select-none">
      <div className={trackClass}>
        {doubled.map((item, idx) => (
          <span
            key={idx}
            className="flex-shrink-0 px-8 text-3xl md:text-5xl font-black font-display uppercase tracking-tight whitespace-nowrap text-white/[0.07] hover:text-agency-accent/30 transition-colors duration-500"
          >
            {item}
            <span className="inline-block mx-6 text-agency-accent/20">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
