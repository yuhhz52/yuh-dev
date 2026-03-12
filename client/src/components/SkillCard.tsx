import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface SkillItem {
  icon: React.ReactNode;
  title: string;
  skills: string[];
}

interface SkillsProps {
  skillCategories?: SkillItem[];
}

const SkillCard: React.FC<{ skill: SkillItem; index: number; delay: number; isVisible: boolean }> = ({ skill, index, delay, isVisible }) => (
  <div
    className={`group relative p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-agency-accent/40 transition-all duration-500 ${isVisible ? 'anim-fade-up' : 'reveal-hidden'}`}
    style={{ animationDelay: `${delay}s` }}
  >
    {/* Index number */}
    <span className="absolute top-4 right-4 text-[10px] font-bold tracking-widest text-white/10 group-hover:text-agency-accent/30 transition-colors duration-500">
      {String(index + 1).padStart(2, '0')}
    </span>

    {/* Icon with accent bar */}
    <div className="flex items-center gap-4 mb-6">
      <div className="w-1 h-10 bg-agency-accent rounded-full transition-all duration-500 group-hover:h-14" />
      <div className="text-agency-accent transition-transform duration-500 group-hover:scale-110 group-hover:translate-x-1">
        {skill.icon}
      </div>
    </div>

    <h4 className="text-xl font-display font-black uppercase tracking-tight mb-5 transition-colors duration-300 group-hover:text-agency-accent">
      {skill.title}
    </h4>

    <div className="flex flex-wrap gap-2">
      {skill.skills.map((item, idx) => (
        <span
          key={idx}
          className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 bg-white/5 text-gray-400 border border-white/5 transition-all duration-300 hover:bg-agency-accent/15 hover:text-agency-accent hover:border-agency-accent/30"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);

/* ── Category-specific icons ── */
const icons = {
  code: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  ),
  framework: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7z" />
      <path d="M12 4v16M4 12h16" />
    </svg>
  ),
  server: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="6" rx="1" />
      <rect x="2" y="15" width="20" height="6" rx="1" />
      <path d="M6 6h.01M6 18h.01M12 9v6" />
    </svg>
  ),
  database: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  tools: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  soft: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
};

const Skills: React.FC<SkillsProps> = ({
  skillCategories = [
    {
      icon: icons.code,
      title: 'Programming Languages',
      skills: ['Java', 'Go', 'TypeScript', 'JavaScript'],
    },
    {
      icon: icons.framework,
      title: 'Frameworks & Libraries',
      skills: ['Spring Framework', 'Gin', 'NestJS', 'ReactJS'],
    },
    {
      icon: icons.server,
      title: 'Backend & API',
      skills: ['RESTful API Design', 'WebClient', 'WebSocket'],
    },
    {
      icon: icons.database,
      title: 'Databases',
      skills: ['MySQL', 'PostgreSQL', 'MongoDB'],
    },
    {
      icon: icons.tools,
      title: 'DevOps & Tools',
      skills: ['Git & GitHub', 'GitLab', 'Docker', 'Render / Vercel', 'CI/CD'],
    },
    {
      icon: icons.soft,
      title: 'Soft Skills',
      skills: ['Self-Management', 'Teamwork', 'Problem Solving'],
    },
  ],
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-24 bg-agency-gray relative overflow-hidden" data-purpose="skills-grid" id="skills">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-agency-accent/[0.03] rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className={`mb-4 ${isVisible ? 'anim-fade-up' : 'reveal-hidden'}`}>
          <span className="section-label">[002] Skills</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <div>
            <h2 className={`text-sm font-bold text-agency-accent uppercase tracking-[0.3em] mb-4 ${isVisible ? 'anim-fade-up' : 'reveal-hidden'}`}>
              Core Competencies
            </h2>
            <h3 className={`text-4xl md:text-6xl font-display font-black leading-[0.9] ${isVisible ? 'anim-fade-up delay-100' : 'reveal-hidden'}`}>
              MY TECH<br /><span className="text-outline">STACK</span>
            </h3>
          </div>
          <p className={`text-gray-500 max-w-sm text-sm ${isVisible ? 'anim-fade-up delay-200' : 'reveal-hidden'}`}>
            Technologies and tools I use to bring ideas to life and build robust systems.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((category, idx) => (
            <SkillCard key={idx} skill={category} index={idx} delay={0.1 * (idx + 1)} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
