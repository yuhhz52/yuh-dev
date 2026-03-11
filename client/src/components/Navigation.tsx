import React, { useMemo, useState, useEffect, useRef } from 'react';

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [activeTicks, setActiveTicks] = useState<number[]>([]);
  const navRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

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

  // Calculate which ticks should light up based on active menu item position
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!navRef.current) return;

      const sectionIndex = sections.indexOf(activeSection);
      if (sectionIndex === -1) return;

      const menuItem = menuItemsRef.current[sectionIndex];
      if (!menuItem) return;

      const navBar = navRef.current;
      const navRect = navBar.getBoundingClientRect();
      const itemRect = menuItem.getBoundingClientRect();

      // Calculate menu item position within navbar
      const itemTopInNav = itemRect.top - navRect.top;
      const itemBottomInNav = itemRect.bottom - navRect.top;
      const itemMidpointInNav = (itemTopInNav + itemBottomInNav) / 2;

      // Map to tick indices (each tick is 15px apart, 80 ticks total)
      const padding = 15; // Light up ticks around the menu item
      const startPixel = Math.max(0, itemMidpointInNav - padding);
      const endPixel = Math.min(80 * 15, itemMidpointInNav + padding + 15);

      const startTick = Math.floor(startPixel / 15);
      const endTick = Math.ceil(endPixel / 15);

      const newActiveTicks: number[] = [];
      for (let i = startTick; i < endTick && i < 80; i++) {
        newActiveTicks.push(i);
      }

      setActiveTicks(newActiveTicks);
    }, 50);

    return () => clearTimeout(timer);
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
          padding: 40px 0;
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
          transition: all 0.3s ease;
        }

        .tick.large {
          width: 15px;
          background: rgba(255, 77, 0, 0.25);
        }

        .tick.active {
          background: #ff4d00;
          width: 15px;
          box-shadow: 0 0 15px rgba(255, 77, 0, 0.7), 0 0 30px rgba(255, 77, 0, 0.4), 0 0 45px rgba(255, 77, 0, 0.2);
        }

        .tick.active.large {
          background: #ff6d1f;
          box-shadow: 0 0 18px rgba(255, 77, 0, 0.9), 0 0 35px rgba(255, 77, 0, 0.6), 0 0 50px rgba(255, 77, 0, 0.3);
        }

        .ruler-menu {
          position: relative;
          display: grid;
          grid-template-rows: repeat(6, 1fr); /* 6 ô đều nhau cho 6 mục menu */
          justify-items: center;
          align-items: center; /* mỗi item nằm giữa ô của nó */
          z-index: 10;
          width: 100%;
          flex: 1; /* chiếm toàn bộ chiều cao còn lại giữa logo và social icons */
          padding: 1.5rem 0;
        }

        .ruler-item {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          text-transform: uppercase;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.4);
          transition: all 0.3s ease;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 0;
          cursor: pointer;
          width: 100%;
        }

        .ruler-item:hover,
        .ruler-item.active {
          color: #ff4d00;
          text-shadow: 0 0 8px rgba(255, 77, 0, 0.6);
        }

        .ruler-logo {
          text-xl;
          font-weight: 900;
          font-display;
          tracking-tighter;
          margin-bottom: 3rem;
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

        {/* Menu Items */}
        <div className="ruler-menu">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              ref={(el) => {
                menuItemsRef.current[index] = el;
              }}
              href={item.href}
              onClick={(event) =>
                handleMenuClick(event, item.href.substring(1))
              }
              className={`ruler-item ${activeSection === item.href.substring(1) ? 'active' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Social Icons - Footer */}
        <div className="mt-auto flex flex-col items-center space-y-4 pb-8">
          {/* Twitter/X */}
          <a
            href="https://twitter.com"
            className="social-icon"
            title="Twitter"
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
                d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 9-7 9-7"
              />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
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
            href="https://github.com"
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
            href="mailto:hello@developer.com"
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

        {/* Ruler Ticks - Decorative */}
        <div className="ruler-ticks" id="ruler-ticks-container">
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={i}
              className={`tick ${i % 4 === 0 ? 'large' : ''} ${activeTicks.includes(i) ? 'active' : ''}`}
              style={{ top: `${i * 15}px` }}
            ></div>
          ))}
        </div>

        {/* Ruler Line */}
        <div className="ruler-line"></div>
      </nav>
    </>
  );
};

export default Navigation;

