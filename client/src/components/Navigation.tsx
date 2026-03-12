import React, { useMemo, useState, useEffect, useRef } from 'react';

const TOTAL_TICKS = 80;

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [activeTicks, setActiveTicks] = useState<number[]>([]);
  const navRef = useRef<HTMLDivElement>(null);

  const sections = useMemo(
    () => ['home', 'about', 'skills', 'projects', 'experience', 'contact'],
    [],
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let currentSection = 'home';
      let smallestDistance = Infinity;

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;
        const viewportCenter = window.innerHeight / 2;

        // Calculate distance from section center to viewport center
        const sectionCenter = (sectionTop + sectionBottom) / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        // Only consider sections that are in viewport
        if (sectionTop < window.innerHeight && sectionBottom > 0) {
          if (distance < smallestDistance) {
            smallestDistance = distance;
            currentSection = section.id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate which ticks should light up based on grid position (6 equal rows)
  useEffect(() => {
    const sectionIndex = sections.indexOf(activeSection);
    if (sectionIndex === -1) return;

    const ticksPerSection = TOTAL_TICKS / sections.length;
    const startTick = Math.round(sectionIndex * ticksPerSection);
    const endTick = Math.round((sectionIndex + 1) * ticksPerSection);

    const newActiveTicks: number[] = [];
    for (let i = startTick; i < endTick && i < TOTAL_TICKS; i++) {
      newActiveTicks.push(i);
    }

    setActiveTicks(newActiveTicks);
  }, [activeSection, sections]);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Work', href: '#projects' },
    { label: 'Career', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  // Handle menu item click with scroll offset so sections (like Skills/Tech Stack)
  // are not hidden behind the fixed top navbar
  const handleMenuClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    event.preventDefault();

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      const topNavOffset = 80; // approximate height of the fixed top navbar
      const elementRect = targetSection.getBoundingClientRect();
      const scrollY =
        window.pageYOffset + elementRect.top - topNavOffset;

      window.scrollTo({
        top: scrollY,
        behavior: 'smooth',
      });
    }

    setActiveSection(sectionId);
  };

  return (
    <>
      <style>{`
        .ruler-nav {
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 50;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px 0;
          border-right: 1px solid rgba(255, 77, 0, 0.2);
          background: #0a0a0a;
        }

        .ruler-line {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 1px;
          background: rgba(255, 77, 0, 0.1);
        }

        .ruler-ticks {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 15px;
          pointer-events: none;
        }

        .tick {
          position: absolute;
          right: 0;
          height: 1px;
          background: rgba(255, 77, 0, 0.15);
          width: 8px;
          transition: all 0.4s cubic-bezier(.22,1,.36,1);
        }

        .tick.large {
          width: 18px;
          background: rgba(255, 77, 0, 0.25);
        }

        .tick.active {
          background: #ff4d00;
          width: 15px;
          box-shadow: 0 0 15px rgba(255, 77, 0, 0.7), 0 0 30px rgba(255, 77, 0, 0.4);
        }

        .tick.active.large {
          background: #ff6d1f;
          box-shadow: 0 0 18px rgba(255, 77, 0, 0.9), 0 0 35px rgba(255, 77, 0, 0.6);
        }

        .ruler-menu {
          position: relative;
          display: grid;
          grid-template-rows: repeat(6, 1fr);
          justify-items: center;
          align-items: center;
          z-index: 10;
          width: 100%;
          flex: 1;
          padding: 0;
          margin: 0;
        }

        .ruler-item {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          text-transform: uppercase;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.4);
          transition: all 0.4s cubic-bezier(.22,1,.36,1);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
          text-decoration: none;
        }

        .ruler-item:hover {
          color: rgba(255, 77, 0, 0.7);
          text-shadow: 0 0 6px rgba(255, 77, 0, 0.3);
          transform: rotate(180deg) scale(1.1);
        }

        .ruler-item.active {
          color: #ff4d00;
          text-shadow: 0 0 10px rgba(255, 77, 0, 0.6);
          transform: rotate(180deg) scale(1.15);
        }

        .ruler-logo {
          font-size: 1.25rem;
          font-weight: 900;
          letter-spacing: -0.05em;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .social-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(255, 77, 0, 0.08);
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 77, 0, 0.3);
        }

        .social-icon:hover {
          background: rgba(255, 77, 0, 0.15);
          border-color: #ff4d00;
          transform: scale(1.1);
          box-shadow: 0 0 12px rgba(255, 77, 0, 0.5);
        }

        .social-icon svg {
          width: 16px;
          height: 16px;
          stroke: rgba(255, 255, 255, 0.6);
          transition: all 0.3s ease;
        }

        .social-icon:hover svg {
          stroke: #ff4d00;
        }

        @media (max-width: 768px) {
          .ruler-nav {
            display: none;
          }
        }
      `}</style>

      <nav className="ruler-nav hidden md:flex" ref={navRef}>
        {/* Logo */}
        <div className="ruler-logo">
          <span className="text-agency-accent">.</span>
        </div>

        {/* Menu Items + Ruler Ticks */}
        <div className="ruler-menu">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(event) =>
                handleMenuClick(event, item.href.substring(1))
              }
              className={`ruler-item ${activeSection === item.href.substring(1) ? 'active' : ''}`}
            >
              {item.label}
            </a>
          ))}

          {/* Ruler Ticks */}
          <div className="ruler-ticks">
            {Array.from({ length: TOTAL_TICKS }).map((_, i) => (
              <div
                key={i}
                className={`tick ${i % 4 === 0 ? 'large' : ''} ${activeTicks.includes(i) ? 'active' : ''}`}
                style={{ top: `${(i / TOTAL_TICKS) * 100}%` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Social Icons - Footer */}
        <div className="flex flex-col items-center space-y-3 pb-6 pt-4">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/nguy%E1%BB%85n-th%C3%A0nh-huy-934348352/"
            className="social-icon"
            title="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
              />
              <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth={1.5} />
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/yuhhz52"
            className="social-icon"
            title="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.89 1.529 2.341 1.544 2.914 1.186.092-.923.349-1.543.635-1.897-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
              />
            </svg>
          </a>

        {/* Email */}
          <a
            href="mailto:huy.nt0910@gmail.com"
            className="social-icon"
            title="Email"
          >
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </a>
        </div>

        {/* Ruler Line */}
        <div className="ruler-line"></div>
      </nav>
    </>
  );
};

export default Navigation;

