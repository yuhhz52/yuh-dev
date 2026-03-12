import React from 'react';
import './App.css';
import {
  Navigation,
  TopNav,
  Hero,
  Marquee,
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
      <Navigation />
      <TopNav />
      <div className="pt-20 md:ml-20">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Marquee reverse />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
