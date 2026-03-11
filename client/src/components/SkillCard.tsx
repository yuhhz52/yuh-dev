import React from 'react';

interface SkillItem {
  icon: React.ReactNode;
  title: string;
  skills: string[];
}

interface SkillsProps {
  skillCategories?: SkillItem[];
}

const SkillCard: React.FC<{ skill: SkillItem }> = ({ skill }) => (
  <div className="glass-card p-10 hover:border-agency-accent transition-colors duration-500">
    <div className="mb-6 text-agency-accent">{skill.icon}</div>
    <h4 className="text-2xl font-display font-bold mb-4">{skill.title}</h4>
    <ul className="space-y-2 text-gray-400">
      {skill.skills.map((item, idx) => (
        <li key={idx} className="flex items-center">
          <span className="w-2 h-2 bg-agency-accent mr-3" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const defaultSkillIcon = (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const Skills: React.FC<SkillsProps> = ({
  skillCategories = [
    {
      icon: defaultSkillIcon,
      title: 'Frontend',
      skills: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion / GSAP'],
    },
    {
      icon: defaultSkillIcon,
      title: 'Backend',
      skills: ['Node.js & Express', 'PostgreSQL / MongoDB', 'RESTful APIs & GraphQL', 'Redis Caching'],
    },
    {
      icon: defaultSkillIcon,
      title: 'Tools',
      skills: ['Git & GitHub', 'Docker & Kubernetes', 'AWS / Vercel', 'CI/CD Pipelines'],
    },
  ],
}) => {
  return (
    <section className="py-24 bg-agency-gray" data-purpose="skills-grid" id="skills">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-16">
          <h2 className="text-sm font-bold text-agency-accent uppercase tracking-[0.3em] mb-4">
            Core Competencies
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-black">MY TECH STACK</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <SkillCard key={idx} skill={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
