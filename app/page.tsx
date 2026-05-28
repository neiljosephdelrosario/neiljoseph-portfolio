'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';
import TechStack from '@/components/TechStack';

export default function Home() {
  const [loaded] = useState(true);

  return (
    <main className="bg-black text-white overflow-x-hidden">
      <Cursor />
      <Navbar />
      <Hero isLoaded={loaded} />
      <About />
      <TechStack />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}