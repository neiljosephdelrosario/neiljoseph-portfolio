'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function About() {
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

  // Clean and reliable font stack leveraging your global CSS variable
  const fontStack = "var(--font-fk-grotesk), 'FK Grotesk', sans-serif";

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen font-bold"
      style={{ 
        background: 'var(--bg)', 
        color: 'var(--text)', 
        padding: '6rem 2rem',
        fontFamily: fontStack 
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-16">

        {/* ── TWO COLUMN GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16 items-start">

          {/* Left: Profile & Objective */}
          <div className="md:col-span-3 flex flex-col gap-10">
            <div className="reveal">
              <h2 
                className="text-2xl sm:text-3xl font-bold lowercase tracking-wide mb-6" 
                style={{ fontFamily: fontStack, color: 'var(--text)', lineHeight: 0.9 }}
              >
                about me
              </h2>
              <p 
                className="text-[1.02rem] leading-relaxed tracking-normal font-bold" 
                style={{ fontFamily: fontStack, color: 'var(--text-muted)' }}
              >
                I'm Neil Joseph, a frontend developer passionate about creating seamless, visually compelling digital experiences.
                I specialize in bringing layouts to life, bridging the gap between pixel-perfect designs and clean, functional interfaces.
                I enjoy learning new modern frameworks, tackling development challenges, and keeping up with the latest trends in UI animation and web performance.
              </p>
            </div>

            <div className="reveal delay-1">
              <h3 
                className="text-2xl sm:text-3xl font-bold lowercase tracking-wide mb-6" 
                style={{ fontFamily: fontStack, color: 'var(--text)', lineHeight: 0.9 }}
              >
                my goal
              </h3>
              <p 
                className="text-[1.02rem] leading-relaxed tracking-normal font-bold" 
                style={{ fontFamily: fontStack, color: 'var(--text-muted)' }}
              >
                To work with cross-functional teams to create intuitive, responsive web applications and tactile UI solutions that make a real difference in user experience and digital products.
              </p>
            </div>
          </div>

          {/* Right: Education */}
          <div className="md:col-span-2 reveal reveal-right pl-0 md:pl-8 flex flex-col gap-6">
            <h2 
              className="text-2xl sm:text-3xl font-bold tracking-wide lowercase" 
              style={{ fontFamily: fontStack, color: 'var(--text)', lineHeight: 0.9 }}
            >
              education
            </h2>
            <div style={{ fontFamily: fontStack }}>
              <h4 className="text-lg font-bold leading-snug tracking-tight" style={{ color: 'var(--text)' }}>
                La Consolacion University Philippines
              </h4>
              <p className="text-[0.95rem] mt-1.5 font-bold" style={{ color: 'var(--text-muted)' }}>
                Bachelor of Science in Information Technology
              </p>
              <p className="text-[0.9rem] mt-2 font-bold tracking-wider uppercase text-xs" style={{ color: 'var(--text-dim)' }}>
                2022 - 2026
              </p>
            </div>
          </div>
        </div>

        {/* ── WORK EXPERIENCE ── */}
        <div
          className="flex flex-col gap-8 pt-12 mt-4"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <div className="reveal">
            <h2 
              className="text-2xl sm:text-3xl font-bold lowercase tracking-wide" 
              style={{ fontFamily: fontStack, color: 'var(--text)', lineHeight: 0.9 }}
            >
              work experience
            </h2>
            <p 
              className="text-[1rem] mt-3 font-bold" 
              style={{ fontFamily: fontStack, color: 'var(--text-muted)' }}
            >
              My professional journey and the companies I've worked with.
            </p>
          </div>

          {/* Experience 1: Xentra */}
          <div
            className="reveal delay-1 p-6 sm:p-8 rounded-xl flex flex-col gap-4 mt-2 transition-all duration-300"
            style={{
              fontFamily: fontStack,
              backgroundColor: 'var(--work-card-bg)',
              border: '1px solid var(--border)',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-card)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
                  frontend developer
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-[1rem] font-bold" style={{ color: 'var(--text-muted)' }}>
                    Xentra Infotech Solutions Inc.
                  </p>
                  <a 
                    href="https://www.xentrasolutions.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block transition-all duration-200 active:scale-95 hover:opacity-80 cursor-pointer"
                  >
                    <Image 
                      src="/assets/xentra.png" 
                      alt="Xentra Logo" 
                      width={18} 
                      height={18} 
                      className="object-contain"
                    />
                  </a>
                </div>
              </div>
              <span className="text-[0.8rem] font-bold tracking-wider self-start sm:self-center" style={{ color: 'var(--text-dim)' }}>
                january 2026 - april 2026
              </span>
            </div>

            <p className="text-[0.98rem] leading-relaxed tracking-normal font-bold" style={{ color: 'var(--text-muted)' }}>
              Developed responsive web interfaces, built layout architectures translating Figma wireframes into performant React modules, optimized animations, and collaborated closely with cross-functional technical teams to deliver rich, modern consumer-facing dashboard applications.
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              {['TypeScript', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'React Native Expo', 'Storybook'].map(tag => (
                <span
                  key={tag}
                  className="text-[0.72rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                  style={{
                    fontFamily: fontStack,
                    border: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                    backgroundColor: 'var(--bg-tag-alt)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Experience 2: The Manila Prince Hotel */}
          <div
            className="reveal delay-2 p-6 sm:p-8 rounded-xl flex flex-col gap-4 transition-all duration-300"
            style={{
              fontFamily: fontStack,
              backgroundColor: 'var(--work-card-bg)',
              border: '1px solid var(--border)',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-card)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
                  management information system officer 
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-[1rem] font-bold" style={{ color: 'var(--text-muted)' }}>
                    The Manila Prince Hotel
                  </p>
                </div>
              </div>
              <span className="text-[0.8rem] font-bold tracking-wider self-start sm:self-center" style={{ color: 'var(--text-dim)' }}>
                august 2026 - october 2026
              </span>
            </div>

            <p className="text-[0.98rem] leading-relaxed tracking-normal font-bold" style={{ color: 'var(--text-muted)' }}>
              Maintained hotel Management Information Systems (MIS) and database infrastructure, providing daily IT support across departments to ensure uninterrupted operations.
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              {['Networking', 'IT Operations Management', 'Database Infrastructure', 'System Administration', 'Technical Support'].map(tag => (
                <span
                  key={tag}
                  className="text-[0.72rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                  style={{
                    fontFamily: fontStack,
                    border: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                    backgroundColor: 'var(--bg-tag-alt)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}