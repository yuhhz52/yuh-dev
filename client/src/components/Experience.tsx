import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  isHighlighted?: boolean;
}

interface ExperienceProps {
  experiences?: ExperienceItem[];
}

const Experience: React.FC<ExperienceProps> = ({
  experiences = [
    {
    id: '1',
    title: 'Open to Work',
    company: 'Looking for new opportunities',
    period: 'PRESENT',
    description:
      'Actively seeking a Fullstack Developer position. Passionate about building scalable web applications.',
    isHighlighted: true,
  },
    {
      id: '2',
      title: 'Product Backend (Intern)',
      company: 'GEEK Up Product Development',
      period: '10/2025 — 12/2025',
      description:
        'Built an internal management application for the company. Gained hands-on experience in the complete product development lifecycle, working with technologies such as NestJS, eByte, dbt, GitLab, and more.',
    },
    {
    id: '3',
    title: 'Information Technology',
    company: 'Nguyen Tat Thanh University',
    period: '10/2022 — 6/2026',
    description:
      'Studying Information Technology with a focus on software development. Gaining knowledge in programming, databases, networking, and modern web technologies.',
  },
  ],
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-24 bg-agency-gray" data-purpose="career-timeline" id="experience">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className={`mb-4 ${isVisible ? 'anim-fade-up' : 'reveal-hidden'}`}>
          <span className="section-label">[004] Career</span>
        </div>
        <div className="text-center mb-20">
          <h2 className={`text-sm font-bold text-agency-accent uppercase tracking-[0.3em] mb-4 ${isVisible ? 'anim-fade-up' : 'reveal-hidden'}`}>
            Journey
          </h2>
          <h3 className={`text-4xl md:text-5xl font-display font-black ${isVisible ? 'anim-fade-up delay-100' : 'reveal-hidden'}`}>CAREER TIMELINE</h3>
        </div>

        <div className="relative ml-4 md:ml-0 md:mx-auto">
          {/* Animated timeline line */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-px origin-top ${isVisible ? '' : 'scale-y-0'}`}
            style={{
              background: 'linear-gradient(to bottom, rgba(255,77,0,0.4), rgba(255,255,255,0.1))',
              transition: 'transform 1.2s cubic-bezier(.22,1,.36,1)',
              transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
            }}
          />

          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              className={`mb-16 ml-8 relative ${isVisible ? 'anim-slide-right' : 'reveal-hidden'}`}
              style={{ animationDelay: `${0.2 + idx * 0.15}s` }}
            >
              {/* Timeline dot with pulse */}
              <div
                className={`absolute -left-[41px] top-0 w-5 h-5 rounded-full border-2 transition-all duration-500 ${
                  exp.isHighlighted
                    ? 'bg-agency-accent border-agency-accent'
                    : 'bg-agency-black border-white/20 hover:border-agency-accent'
                }`}
                style={exp.isHighlighted ? { animation: 'pulse-glow 2s ease-in-out infinite' } : {}}
              />

              <div className="group p-6 -m-6 rounded-lg hover:bg-white/[0.02] transition-colors duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h4 className="text-2xl font-display font-bold group-hover:text-agency-accent transition-colors duration-300">{exp.title}</h4>
                  <span
                    className={`font-bold ${
                      exp.isHighlighted ? 'text-agency-accent' : 'text-gray-500'
                    }`}
                  >
                    {exp.period}
                  </span>
                </div>
                <p className="text-lg font-semibold text-gray-300 mb-4">{exp.company}</p>
                <p className="text-gray-400 leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
