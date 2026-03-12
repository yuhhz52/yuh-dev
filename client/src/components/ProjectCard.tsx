import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  codeUrl: string;
  liveUrl?: string;
  technologies: string[];
}

interface ProjectsProps {
  projects?: Project[];
}

const ProjectCard: React.FC<{ project: Project; index: number; isVisible: boolean }> = ({ project, index, isVisible }) => {
  const isEven = index % 2 === 0;

  return (
    <article
      className={`group grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-center ${isVisible ? (isEven ? 'anim-slide-left' : 'anim-slide-right') : 'reveal-hidden'}`}
      style={{ animationDelay: `${0.15 * index}s` }}
    >
      {/* Image — alternates side on desktop */}
      <div className={`relative overflow-hidden aspect-[16/10] lg:col-span-7 ${isEven ? '' : 'lg:order-2'}`}>
        <div className="absolute inset-0 bg-agency-accent/10 mix-blend-multiply z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <img
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          src={project.imageUrl}
        />
        {/* Reveal overlay wipe */}
        <div
          className="absolute inset-0 bg-agency-accent z-20 origin-left transition-transform duration-[0.8s] ease-[cubic-bezier(0.77,0,0.18,1)]"
          style={{ transform: isVisible ? 'scaleX(0)' : 'scaleX(1)', transitionDelay: `${0.2 + index * 0.15}s` }}
        />
        {/* Index badge */}
        <span className="absolute top-4 left-4 z-20 text-[11px] font-black tracking-widest text-white/40 bg-black/40 backdrop-blur-sm px-3 py-1 border border-white/10">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Content */}
      <div className={`lg:col-span-5 py-8 lg:py-0 ${isEven ? '' : 'lg:order-1'}`}>
        <div className={`flex items-center gap-3 mb-4 ${isVisible ? 'anim-fade-up' : 'reveal-hidden'}`} style={{ animationDelay: `${0.3 + index * 0.15}s` }}>
          <div className="w-8 h-px bg-agency-accent transition-all duration-500 group-hover:w-14" />
          <span className="text-[10px] font-bold text-agency-accent uppercase tracking-[0.2em]">
            {project.category}
          </span>
        </div>

        <h4
          className={`text-3xl md:text-4xl font-display font-black leading-[0.95] mb-4 transition-colors duration-300 group-hover:text-agency-accent ${isVisible ? 'anim-fade-up' : 'reveal-hidden'}`}
          style={{ animationDelay: `${0.4 + index * 0.15}s` }}
        >
          {project.title}
        </h4>

        <p
          className={`text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 ${isVisible ? 'anim-fade-up' : 'reveal-hidden'}`}
          style={{ animationDelay: `${0.5 + index * 0.15}s` }}
        >
          {project.description}
        </p>

        <div className={`flex flex-wrap gap-2 mb-8 ${isVisible ? 'anim-fade-up' : 'reveal-hidden'}`} style={{ animationDelay: `${0.55 + index * 0.15}s` }}>
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 border border-white/10 text-gray-400 hover:border-agency-accent/40 hover:text-agency-accent transition-all duration-300 hover:scale-105"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className={`flex flex-wrap items-center gap-3 ${isVisible ? 'anim-fade-up' : 'reveal-hidden'}`} style={{ animationDelay: `${0.6 + index * 0.15}s` }}>
          {project.liveUrl && (
            <a
              className="group/btn relative inline-flex items-center gap-2 px-6 py-3 bg-agency-accent text-white text-xs font-black uppercase tracking-wider overflow-hidden transition-transform duration-300 hover:scale-105"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="relative z-10">Visit Site</span>
              <svg className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
            </a>
          )}
          <a
            className="group/btn inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-xs font-black uppercase tracking-wider text-gray-300 transition-all duration-300 hover:border-agency-accent hover:text-agency-accent"
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Source Code
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
};

const Projects: React.FC<ProjectsProps> = ({
  projects = [
    {
      id: '1',
      category: 'Health Tech / FitTech',
      title: 'VieGym App',
      description:
        'A fitness technology platform designed for people who want to exercise at home. Features workout tracking, personalized routines, and progress analytics.',
      imageUrl: `${process.env.PUBLIC_URL}/pr2.png`,
      codeUrl: '#',
      liveUrl: '#',
      technologies: ['Spring Framework', 'React', 'PostgreSQL'],
    },
    {
      id: '2',
      category: 'E-Commerce',
      title: 'Drobee Shop',
      description:
        'Complete brand identity and headless commerce solution for a premium fashion label featuring seamless checkout and 3D previews.',
      imageUrl: `${process.env.PUBLIC_URL}/pr1.png`,
      codeUrl: 'https://github.com/yuhhz52/drobee_shop',
      liveUrl: '#',
      technologies: ['Spring Framework', 'ReactJs', 'Stripe API'],
    },
  ],
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, 4);
  const hasMore = projects.length > 4;

  return (
    <section ref={ref} className="py-24 bg-agency-black relative" data-purpose="work-showcase" id="projects">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className={`mb-4 ${isVisible ? 'anim-fade-up' : 'reveal-hidden'}`}>
          <span className="section-label">[003] Work</span>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-4">
          <div>
            <h2 className={`text-sm font-bold text-agency-accent uppercase tracking-[0.3em] mb-4 ${isVisible ? 'anim-fade-up' : 'reveal-hidden'}`}>
              Portfolio
            </h2>
            <h3 className={`text-4xl md:text-6xl font-display font-black leading-[0.9] ${isVisible ? 'anim-fade-up delay-100' : 'reveal-hidden'}`}>
              FEATURED<br /><span className="text-outline">PROJECTS</span>
            </h3>
          </div>
          <p className={`text-gray-500 max-w-sm text-sm ${isVisible ? 'anim-fade-up delay-200' : 'reveal-hidden'}`}>
            A selection of recent projects built with modern technologies and a focus on performance.
          </p>
        </div>

        {/* Projects list */}
        <div className="space-y-16 lg:space-y-24">
          {visibleProjects.map((project, idx) => (
            <React.Fragment key={project.id}>
              {idx > 0 && (
                <div className="border-t border-white/5" />
              )}
              <ProjectCard project={project} index={idx} isVisible={isVisible} />
            </React.Fragment>
          ))}
        </div>

        {/* Show more button */}
        {hasMore && !showAll && (
          <div className={`text-center mt-16 ${isVisible ? 'anim-fade-up delay-400' : 'reveal-hidden'}`}>
            <button
              onClick={() => setShowAll(true)}
              className="group relative inline-flex items-center gap-3 px-10 py-4 border border-white/15 text-sm font-black uppercase tracking-wider text-gray-300 overflow-hidden transition-all duration-300 hover:border-agency-accent hover:text-white"
            >
              <span className="relative z-10">View All Projects ({projects.length})</span>
              <svg className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 9l-7 7-7-7" />
              </svg>
              <span className="absolute inset-0 bg-agency-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
