import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactProps {
  email?: string;
  socialLinks?: {
    label: string;
    url: string;
  }[];
}

const Contact: React.FC<ContactProps> = ({
  email = 'huy.nt0910@gmail.com',
  socialLinks = [
    { label: 'GitHub', url: 'https://github.com/yuhhz52' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/nguy%E1%BB%85n-th%C3%A0nh-huy-934348352/' },
    { label: 'Zalo', url: 'https://zalo.me/0335233757' },
  ],
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log('Form submitted:', formData);
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden"
      data-purpose="contact-form-section"
      id="contact"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 40%, #0a0a0a 100%)',
      }}
    >
      {/* Decorative floating shapes */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-agency-accent/5 rounded-full blur-[100px]" style={{ animation: 'float 8s ease-in-out infinite' }} />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-agency-accent/8 rounded-full blur-[80px]" style={{ animation: 'float 6s ease-in-out infinite 2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/[0.02] rounded-full" style={{ animation: 'slowRotate 60s linear infinite' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/[0.01] rounded-full" style={{ animation: 'slowRotate 90s linear infinite reverse' }} />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Number Label */}
        <div className={`mb-8 ${isVisible ? 'anim-fade-up' : 'reveal-hidden'}`}>
          <span className="section-label">[005] Contact</span>
        </div>

        {/* CTA Headline — Fluinto Style */}
        <div className={`text-center mb-20 ${isVisible ? 'anim-fade-up delay-100' : 'reveal-hidden'}`}>
          <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-black font-display leading-[0.85] tracking-tighter">
            LET'S <span className="gradient-text">BUILD</span>
          </h2>
          <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-black font-display leading-[0.85] tracking-tighter mt-2">
            SOMETHING
          </h2>
          <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-black font-display leading-[0.85] tracking-tighter text-outline mt-2">
            GREAT<span className="text-agency-accent" style={{ WebkitTextStroke: 'unset', color: '#ff4d00' }}>.</span>
          </h2>
        </div>

        {/* CTA Buttons & Info */}
        <div className={`flex flex-col items-center gap-8 mb-20 ${isVisible ? 'anim-fade-up delay-300' : 'reveal-hidden'}`}>
          <a
            className="group relative px-12 py-5 bg-agency-accent text-white font-black text-xl uppercase tracking-wider overflow-hidden transition-transform duration-300 hover:scale-105"
            href={`mailto:${email}`}
          >
            <span className="relative z-10">Get In Touch →</span>
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </a>

          <div className="flex items-center gap-4">
            {socialLinks.map((link, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="w-1 h-1 bg-white/20 rounded-full" />}
                <a
                  className="text-sm text-gray-400 hover:text-agency-accent transition-colors duration-300 uppercase tracking-wider font-bold"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className={`max-w-2xl mx-auto ${isVisible ? 'anim-fade-up delay-400' : 'reveal-hidden'}`}>
          <div className="glass-card p-8 md:p-12 hover:border-agency-accent/30 transition-colors duration-500">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label
                    className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-agency-accent transition-colors duration-300"
                    htmlFor="name"
                  >
                    Your Name
                  </label>
                  <input
                    className="w-full bg-transparent border-b border-white/10 focus:border-agency-accent focus:ring-0 px-0 py-3 text-white transition-colors duration-300"
                    id="name"
                    name="name"
                    required
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="group">
                  <label
                    className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-agency-accent transition-colors duration-300"
                    htmlFor="email"
                  >
                    Your Email
                  </label>
                  <input
                    className="w-full bg-transparent border-b border-white/10 focus:border-agency-accent focus:ring-0 px-0 py-3 text-white transition-colors duration-300"
                    id="email"
                    name="email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="group">
                <label
                  className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-agency-accent transition-colors duration-300"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="w-full bg-transparent border-b border-white/10 focus:border-agency-accent focus:ring-0 px-0 py-3 text-white transition-colors duration-300"
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              <button
                className="group relative w-full py-4 bg-white text-black font-black uppercase tracking-widest overflow-hidden transition-all duration-300 disabled:opacity-50"
                type="submit"
                disabled={isSubmitting}
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </span>
                <span className="absolute inset-0 bg-agency-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
