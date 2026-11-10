'use client';

import { useEffect, useRef } from 'react';

const PROJECTS = [
  {
    year: '2026',
    name: 'XBank Portal',
    desc: 'An administrative web portal built to handle multi-tier transaction configurations and internal mock data simulations seamlessly.',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Postman', 'Axios', 'TypeScript'],
    image: '/assets/xbank.png',
    projectUrl: '',
    githubUrl: 'https://github.com/renaemariz/neil-xbank-portal',
  },
  {
    year: '2026',
    name: 'XBank Mobile',
    desc: 'A cross-platform mobile fintech application mockup utilizing a dedicated, component-driven UI library developed and isolated within Storybook for rigorous design verification.',
    tech: ['React Native', 'Expo', 'Storybook', 'TypeScript', 'JavaScript'],
    image: '/assets/xbank.png',
    projectUrl: '',
    githubUrl: 'https://github.com/renaemariz/neil-xbank-portal',
  },
  {
    year: '2025',
    name: 'MakeCents',
    desc: 'An AI-powered mobile budget tracker that delivers personalized financial insights through predictive analytical logging and a dynamic, responsive UI designed for localized user data.',
    tech: ['Flutter', 'Dart', 'Firebase', 'MySQL', 'BeeHive', 'Gemini AI'],
    image: '/assets/makecents.png',
    projectUrl: '',
    githubUrl: 'https://github.com/neiljosephdelrosario/makecents',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

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

  // Clean and reliable FK Grotesk font stack variable
  const fontStack = "var(--font-fk-grotesk), 'FK Grotesk', sans-serif";

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen relative font-bold"
      style={{ 
        background: 'var(--bg)', 
        padding: '8rem 3rem',
        fontFamily: fontStack 
      }}
    >
      {/* Decorative background element */}
      <div 
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle at center, var(--bg-secondary) 0%, transparent 70%)',
          opacity: 0.5,
          transform: 'translate(30%, -20%)',
        }}
      />

      {/* Header */}
      <div className="max-w-6xl mx-auto relative">
        <div className="reveal mb-20">
          <div style={{ 
            fontFamily: fontStack,
            fontSize: '0.72rem', 
            fontWeight: 700, 
            letterSpacing: '0.2em', 
            color: 'var(--text-subtle)', 
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}> 
          </div>
          <div 
            className="text-3xl sm:text-4xl md:text-5xl font-bold lowercase tracking-wide"
            style={{ 
              fontFamily: fontStack,
              color: 'var(--text)',
              lineHeight: 0.9,
              marginBottom: '0.5rem',
            }}
          >
            projects
          </div>
          <div style={{
            fontFamily: fontStack,
            fontSize: '1rem',
            color: 'var(--text-muted)',
            maxWidth: '500px',
            lineHeight: 1.6,
            marginTop: '1.5rem',
          }}
          className="font-bold"
          >
            A showcase of recent work spanning web applications, mobile solutions, and design systems.
          </div>
        </div>

        {/* All Projects - Featured Layout */}
        <div className="flex flex-col gap-8">
          {PROJECTS.map((p, i) => (
            <div
              key={p.name}
              className={`reveal delay-${i + 1} rounded-2xl overflow-hidden transition-all duration-300 group`}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-card)',
                fontFamily: fontStack,
              }}
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Side */}
                <div
                  className="flex items-center justify-center relative overflow-hidden"
                  style={{
                    minHeight: '400px',
                    background: 'linear-gradient(135deg, var(--bg) 0%, var(--bg-secondary) 100%)',
                  }}
                >
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(circle at center, var(--bg-secondary) 0%, transparent 70%)',
                      opacity: 0.8,
                    }}
                  />
                  <img
                    src={p.image}
                    alt={`${p.name} preview`}
                    className="relative z-10 max-h-[50%] max-w-[50%] object-contain filter grayscale brightness-[0.9] transition-all duration-500 group-hover:filter-none group-hover:scale-110"
                  />
                </div>

                {/* Content Side */}
                <div 
                  style={{ padding: '3.5rem' }} 
                  className="flex flex-col justify-center"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span style={{
                      fontFamily: fontStack,
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      background: 'var(--bg-card)',
                      color: 'var(--text-muted)',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '4px',
                    }}>
                      {p.year}
                    </span>
                    {i === 0 && (
                      <span style={{
                        fontFamily: fontStack,
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        color: 'var(--text-subtle)',
                        textTransform: 'lowercase',
                      }}>
                        featured project
                      </span>
                    )}
                  </div>

                  <h3 style={{ 
                    fontFamily: fontStack,
                    fontSize: '2rem', 
                    fontWeight: 700, 
                    color: 'var(--text)', 
                    letterSpacing: '-0.02em', 
                    marginBottom: '1rem',
                    lineHeight: 1.2,
                  }}>
                    <a href={p.projectUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {p.name}
                    </a>
                  </h3>

                  <p style={{ 
                    fontFamily: fontStack,
                    fontSize: '1rem', 
                    color: 'var(--text-muted)', 
                    lineHeight: 1.7, 
                    marginBottom: '2rem',
                    maxWidth: '90%',
                  }}
                  className="font-bold"
                  >
                    {p.desc}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {p.tech.map(t => (
                      <span
                        key={t}
                        className="tech-tag font-bold"
                        style={{
                          fontFamily: fontStack,
                          fontSize: '0.7rem',
                          color: 'var(--text-muted)',
                          border: '1px solid var(--border-card)',
                          padding: '0.3rem 0.75rem',
                          borderRadius: '6px',
                          backgroundColor: 'var(--bg-tag)',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Links - Icons Only */}
                  <div className="flex items-center gap-5">
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View Source on GitHub"
                      className="opacity-40 hover:opacity-100 transition-all duration-200"
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <svg height="22" width="22" viewBox="0 0 16 16" fill="currentColor" style={{ color: 'var(--text)' }}>
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                    </a>
                    <a
                      href={p.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View Live Site"
                      className="opacity-40 hover:opacity-100 transition-all duration-200"
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <svg height="22" width="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text)' }}>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}