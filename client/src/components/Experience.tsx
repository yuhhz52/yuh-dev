import React from 'react';

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
      title: 'Senior Fullstack Engineer',
      company: 'Innovate Tech Solutions',
      period: '2021 — PRESENT',
      description:
        'Leading the frontend migration from legacy systems to Next.js. Improved site performance by 40% and mentored a team of 5 junior developers. Spearheaded the implementation of a proprietary design system.',
      isHighlighted: true,
    },
    {
      id: '2',
      title: 'Web Developer',
      company: 'Pixel Perfect Agency',
      period: '2019 — 2021',
      description:
        'Developed over 20+ responsive websites for international clients. Focused on creating high-fidelity animations using GSAP and building custom WordPress themes with modern tooling.',
    },
    {
      id: '3',
      title: 'Junior Developer (Intern)',
      company: 'Startup Hub',
      period: '2018 — 2019',
      description:
        'Assisted in building MVP products for early-stage startups. Gained extensive experience in JavaScript fundamentals and collaborative version control using Git.',
    },
  ],
}) => {
  return (
    <section className="py-24 bg-agency-gray" data-purpose="career-timeline" id="experience">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-agency-accent uppercase tracking-[0.3em] mb-4">
            Journey
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-black">CAREER TIMELINE</h3>
        </div>

        <div className="relative border-l border-white/10 ml-4 md:ml-0 md:mx-auto">
          {experiences.map((exp) => (
            <div key={exp.id} className="mb-16 ml-8 relative">
              <div
                className={`absolute -left-[41px] top-0 w-5 h-5 rounded-full border-2 ${
                  exp.isHighlighted
                    ? 'bg-agency-black border-agency-accent'
                    : 'bg-agency-black border-white/20'
                }`}
              />
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h4 className="text-2xl font-display font-bold">{exp.title}</h4>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
