import React, { useState } from 'react';

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
  email = 'hello@developer.com',
  socialLinks = [
    { label: 'GitHub', url: '#' },
    { label: 'LinkedIn', url: '#' },
    { label: 'Twitter (X)', url: '#' },
  ],
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      // TODO: Implement form submission logic
      console.log('Form submitted:', formData);
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="py-24 bg-agency-black"
      data-purpose="contact-form-section"
      id="contact"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-sm font-bold text-agency-accent uppercase tracking-[0.3em] mb-4">
              Get in touch
            </h2>
            <h3 className="text-6xl md:text-7xl font-display font-black leading-[0.9] mb-8">
              LET'S START <br />A PROJECT.
            </h3>
            <p className="text-gray-400 text-xl mb-12">
              I'm currently looking for new opportunities. Whether you have a question or just want to
              say hi, I'll try my best to get back to you!
            </p>
            <div className="space-y-6">
              <a
                className="block text-2xl font-display font-bold hover:text-agency-accent transition-colors"
                href={`mailto:${email}`}
              >
                {email}
              </a>
              <div className="flex space-x-6">
                {socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    className="text-gray-500 hover:text-white transition-colors"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card p-8 md:p-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2"
                    htmlFor="name"
                  >
                    Your Name
                  </label>
                  <input
                    className="w-full bg-transparent border-b border-white/10 focus:border-agency-accent focus:ring-0 px-0 py-3 text-white transition-colors"
                    id="name"
                    name="name"
                    required
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2"
                    htmlFor="email"
                  >
                    Your Email
                  </label>
                  <input
                    className="w-full bg-transparent border-b border-white/10 focus:border-agency-accent focus:ring-0 px-0 py-3 text-white transition-colors"
                    id="email"
                    name="email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="w-full bg-transparent border-b border-white/10 focus:border-agency-accent focus:ring-0 px-0 py-3 text-white transition-colors"
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              <button
                className="w-full py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-agency-accent hover:text-white transition-all duration-300 disabled:opacity-50"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
