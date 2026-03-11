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
  description = 'I am a fullstack web developer with a passion for building scalable, user-centric web applications. My approach combines the rigor of backend architecture with the finesse of modern frontend design. I believe that every line of code should contribute to a seamless user experience.',
  imageUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDe60iuyG0e-9GhLJnl6RyHricY06Gjct44bSR4BcJoRGuAn-dmB1nazABvWxPiRlxyYgBkeNiIffA4npn7sDTo_PmUfY7Pl-GfXhSHHDrf3vv9jsjy_tj4O1KpcKr-BSikUUboCu6LlcTiucjNQ028RBqoVyRCaVBn3_GCyUHAaR6Phn2Lg4miWS2353rhTbOTwrQWI6hxdKOxaEOKB_x2tjMwPye20rOniZrVJFwrb-6-H3Q3l_l46Od22Y_6-7Hrt16oEWtWPbM',
  stats = [
    { value: '5+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Delivered' },
  ],
}) => {
  return (
    <section className="py-24 bg-agency-black" data-purpose="about-me" id="about">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div className="relative group" data-purpose="profile-image-container">
            <div className="aspect-square bg-agency-gray overflow-hidden border border-white/5 grayscale hover:grayscale-0 transition-all duration-700">
              <img
                alt="Developer Portrait"
                className="w-full h-full object-cover"
                src={imageUrl}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-agency-accent flex items-center justify-center p-8">
              <p className="font-display font-black text-4xl leading-tight">EST. 2019</p>
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
