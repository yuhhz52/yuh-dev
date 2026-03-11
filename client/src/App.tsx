import React from 'react';
import './App.css';
import {
  Navigation,
  TopNav,
  Hero,
  About,
  Skills,
  Projects,
  Experience,
  Contact,
  Footer,
} from './components';

function App() {
  return (
    <div className="App bg-agency-black text-white min-h-screen">
      {/* Tailwind configuration injected via CSS */}
      <style>{`
        :root {
          --agency-black: #0a0a0a;
          --agency-gray: #1a1a1a;
          --agency-accent: #ff4d00;
        }
        
        .text-outline {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
          color: transparent;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .gradient-bg {
          background: radial-gradient(circle at 50% -20%, #222, #0a0a0a);
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 0 !important;
          }
        }
      `}</style>

      <Navigation />
      <TopNav />
      <div className="pt-20 md:ml-20">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
