import React from 'react';

export interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl: string;
  codeUrl: string;
  technologies: string[];
}

interface ProjectsProps {
  projects?: Project[];
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <article className="group">
    <div className="relative overflow-hidden bg-agency-gray aspect-[16/10]">
      <img
        alt={project.title}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        src={project.imageUrl}
      />
      <div className="absolute inset-0 bg-agency-accent/80 opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex items-center justify-center space-x-4">
        <a
          className="bg-white text-black p-4 rounded-full font-bold hover:bg-black hover:text-white transition-colors"
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Demo
        </a>
        <a
          className="bg-black text-white p-4 rounded-full font-bold hover:bg-white hover:text-black transition-colors"
          href={project.codeUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Code
        </a>
      </div>
    </div>
    <div className="mt-8">
      <span className="text-xs font-bold text-agency-accent uppercase tracking-widest">
        {project.category}
      </span>
      <h4 className="text-3xl font-display font-black mt-2">{project.title}</h4>
      <p className="text-gray-400 mt-4 line-clamp-2">{project.description}</p>
      <div className="flex flex-wrap gap-2 mt-6">
        {project.technologies.map((tech, idx) => (
          <span
            key={idx}
            className="text-[10px] uppercase font-bold tracking-tighter px-2 py-1 bg-white/5 text-gray-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </article>
);

const Projects: React.FC<ProjectsProps> = ({
  projects = [
    {
      id: '1',
      category: 'SaaS Dashboard',
      title: 'GrowthPulse CRM',
      description:
        'A high-performance sales analytics platform designed for small to medium enterprises with real-time data visualization.',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCVpuMQ433T_SFJpjrpxa5gw0xt-GjDmre0C8Z1lH4vq6ZBNnSVTwNGdGTAPLs6zl_kDqsj3a4g4ObAIpmcQrBKkaHLHMe8vXWham0N9KzYUvCBRn_Qpa671oSIf0BwKcxwIgEJ8HAu19Erhr4jS8kWj_KAxblgz7tQP6tAwCUMjTl4HEf-XJ6LvkzkSvgeEEujd6myeX173ZQ3J3q6IM_jIJyLIey7jGL4maNHwsVf3uYwn363HDug4HgUXw6kM4ZLipfvwNnxLIU',
      demoUrl: '#',
      codeUrl: '#',
      technologies: ['Next.js', 'PostgreSQL', 'Chart.js'],
    },
    {
      id: '2',
      category: 'E-Commerce',
      title: 'NovaMark Rebranding',
      description:
        'Complete brand identity and headless commerce solution for a premium fashion label featuring seamless checkout and 3D previews.',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCMgezpynBE4Xyx6WpigLJdyWtd1nQkKnSR7oHcyPIjBYmqA3AijAFUahPnkV29wI-lR_d7xQ8tx4op4l8BX_uAKjraXTSTvjBYJFgz_ZrJLM9RNDKOM9Q2kAF5H7hVX02QtN5wrIHYUUvDMfXzDcgPh5qcwvAc_6BJNJNP85_GrwHtLm3Q1kueEKAegmAgb-ksEAmhi4LJTfJbNoDuH_59ZpE425_K4d779jXpRZe9xon4JCBHiHzCkpKTv-znQ4Cf40kag2wWico',
      demoUrl: '#',
      codeUrl: '#',
      technologies: ['React', 'Shopify API', 'Three.js'],
    },
  ],
}) => {
  return (
    <section className="py-24 bg-agency-black" data-purpose="work-showcase" id="projects">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-sm font-bold text-agency-accent uppercase tracking-[0.3em] mb-4">
              Portfolio
            </h2>
            <h3 className="text-4xl md:text-5xl font-display font-black leading-[0.9]">
              FEATURED PROJECTS
            </h3>
          </div>
          <p className="text-gray-500 max-w-sm">
            A selection of recent projects built with modern technologies and a focus on performance.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
