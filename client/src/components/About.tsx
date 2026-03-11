import React from 'react';

interface AboutStats {
  value: string;
  label: string;
}

interface AboutProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  stats?: AboutStats[];
}

const About: React.FC<AboutProps> = ({
  title = 'BLENDING STRATEGY WITH TECHNOLOGY.',
  description = 'I am a backend developer with a passion for building scalable, high-performance systems and robust server-side architectures. My approach focuses on designing clean APIs, optimizing database performance, and ensuring the reliability and security of the core infrastructure. I believe that every line of code should contribute to a stable, efficient, and maintainable system.',
  imageUrl = `${process.env.PUBLIC_URL}/avatar.jpg`,
  stats = [
    { value: '1+', label: 'Years Experience' },
    { value: '5+', label: 'Projects Delivered' },
  ],
}) => {
  return (
    <section className="py-24 bg-agency-black" data-purpose="about-me" id="about">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div className="relative group" data-purpose="profile-image-container">
            <div className="aspect-square overflow-hidden border border-white/5">
              <img
                alt="Developer Portrait"
                className="w-full h-full object-cover"
                src={imageUrl}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-agency-accent flex items-center justify-center p-8">
              <p className="font-display font-black text-4xl leading-tight">EST. 2025</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-display font-black leading-tight">
              {title}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">{description}</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <span className="block text-5xl font-display font-black text-agency-accent">
                    {stat.value}
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
