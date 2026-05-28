'use client';

import { useEffect, useRef, useState } from 'react';
import * as SI from 'simple-icons/icons';

const SimpleIcon = ({ icon, size = 40 }: { icon: SI.SimpleIcon; size?: number }) => {
  return (
    <span
      className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
      style={{
        width: size,
        height: size,
        fill: `#${icon.hex}`,
      }}
      dangerouslySetInnerHTML={{ __html: icon.svg }}
    />
  );
};

const TECH_DATA = [
  { name: 'React', category: 'frontend', icon: SI.siReact },
  { name: 'Angular', category: 'frontend', icon: SI.siAngular },
  { name: 'Next.js', category: 'frontend', icon: SI.siNextdotjs },
  { name: 'TypeScript', category: 'languages', icon: SI.siTypescript },
  { name: 'Tailwind CSS', category: 'frontend', icon: SI.siTailwindcss },
  { name: 'Flutter', category: 'frontend', icon: SI.siFlutter },
  { name: 'Dart', category: 'languages', icon: SI.siDart },
  { name: 'JavaScript', category: 'languages', icon: SI.siJavascript },
  { name: 'HTML5 / CSS3', category: 'frontend', icon: SI.siHtml5 },
  { name: 'Node.js', category: 'backend', icon: SI.siNodedotjs },
  { name: 'Firebase', category: 'backend', icon: SI.siFirebase },
  { name: 'Supabase', category: 'backend', icon: SI.siSupabase },
  { name: 'PHP', category: 'languages', icon: SI.siPhp },
  { name: 'Ruby', category: 'languages', icon: SI.siRuby },
  { name: 'Django', category: 'backend', icon: SI.siDjango },
  { name: 'FastAPI', category: 'backend', icon: SI.siFastapi },
  { name: 'C++', category: 'languages', icon: SI.siCplusplus },
  { name: 'XAMPP', category: 'tools', icon: SI.siXampp },
  { name: 'Figma', category: 'tools', icon: SI.siFigma },
  { name: 'FlutterFlow', category: 'tools', icon: SI.siFlutter },
  { name: 'Storybook', category: 'tools', icon: SI.siStorybook },
  { name: 'Git', category: 'tools', icon: SI.siGit },
  { name: 'GitHub', category: 'tools', icon: SI.siGithub },
];

const CATEGORIES = ['all', 'frontend', 'backend', 'languages', 'tools'] as const;
type CategoryType = typeof CATEGORIES[number];

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const filteredTech = activeCategory === 'all'
    ? TECH_DATA
    : TECH_DATA.filter(t => t.category === activeCategory);

  // Layout architecture font references
  const headingFont = "'Monument Extended', var(--font-metropolis), sans-serif";
  const bodyFont = "var(--font-sans), 'Inter', sans-serif";

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="min-h-screen"
      style={{ background: 'var(--bg)', color: 'var(--text)', padding: '6rem 3rem' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-10">

        <div className="reveal">
          <h2 
            className="text-2xl sm:text-3xl font-black uppercase tracking-wide mb-5"
            style={{ 
              fontFamily: headingFont,
              color: 'var(--text)', 
              lineHeight: 0.85 
            }}
          >
            Tech Stack
          </h2>
          <p 
            className="text-[1.02rem] leading-relaxed tracking-normal"
            style={{ 
              fontFamily: bodyFont, 
              color: 'var(--text-muted)', 
              maxWidth: '800px' 
            }}
          >
            These are the technologies, frameworks, and tools I use to bring ideas to life, covering everything from frontend to backend development.
          </p>
        </div>

        {/* Category filter pills */}
        <div className="reveal delay-1 flex flex-wrap gap-2">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="transition-all duration-200 uppercase tracking-wider rounded-md"
              style={{
                fontFamily: bodyFont,
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '0.6rem 1.4rem',
                border: '1px solid',
                borderColor: activeCategory === category ? 'var(--border-card)' : 'var(--border)',
                backgroundColor: activeCategory === category ? 'var(--bg-card)' : 'var(--bg-secondary)',
                color: activeCategory === category ? 'var(--text)' : 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              {category === 'all'
                ? 'All'
                : category === 'frontend'
                ? 'Front-End'
                : category === 'backend'
                ? 'Back-End & Database'
                : category === 'languages'
                ? 'Languages'
                : 'Ecosystem & Tools'}
            </button>
          ))}
        </div>

        {/* Technology grid list */}
        <div className="reveal delay-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-12 gap-x-6 mt-6 min-h-[320px] content-start">
          {filteredTech.map(t => (
            <div
              key={t.name}
              className="group flex flex-col items-center text-center justify-center gap-4 p-4 rounded-xl transition-all duration-300"
            >
              {t.icon && <SimpleIcon icon={t.icon} size={42} />}
              <span
                className="transition-colors duration-300"
                style={{
                  fontFamily: bodyFont,
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  letterSpacing: '-0.01em',
                }}
              >
                {t.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}