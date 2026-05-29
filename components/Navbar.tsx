'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTheme } from '@/components/context/ThemeContext';
import AnimatedThemeToggler from '@/components/ui/animated-theme-toggler';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'TechStack', href: '#tech-stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme } = useTheme();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const isDark = theme === 'dark';

  // Minimal toggle button base layout styles with background and borders completely stripped out
  const getToggleStyles = () => ({
    width: '24px',
    height: '24px',
    background: 'none',
    border: 'none',
    color: isDark ? '#ffffff' : '#0a0a09',
    cursor: 'pointer',
    padding: 0,
  });

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between py-6 px-6 md:px-12"
        style={{
          mixBlendMode: isDark ? 'difference' : 'normal',
        }}
      >
        {/* Left Side: Branding + Social Links */}
        <div className="flex items-center gap-5">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#hero');
            }}
            className="group block transition-transform duration-200 active:scale-95 origin-left"
            style={{ cursor: 'pointer' }}
            title="Home"
          >
            <div className="relative w-7 h-7 opacity-90 group-hover:opacity-100 transition-opacity">
              <Image
                src="/assets/nj-logo.png"
                alt="NJ Logo"
                fill
                priority
                className="object-contain"
                sizes="28px"
                style={{ filter: isDark ? 'none' : 'invert(1)' }}
              />
            </div>
          </a>

          <div
            className="flex items-center gap-3"
            style={{
              borderLeft: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
              paddingLeft: '0.85rem',
            }}
          >
            {/* GitHub */}
            <a
              href="https://github.com/neiljosephdelrosario"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="opacity-60 hover:opacity-100 transition-opacity duration-200"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <svg height="16" width="16" viewBox="0 0 16 16" fill={isDark ? '#ffffff' : '#0a0a09'}>
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/neil-joseph-del-rosario/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="opacity-60 hover:opacity-100 transition-opacity duration-200"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <svg height="15" width="15" viewBox="0 0 24 24" fill={isDark ? '#ffffff' : '#0a0a09'}>
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Right side: Desktop nav links + Clean Animated Theme toggle */}
        <div className="flex items-center gap-6">
          <ul className="hidden md:flex gap-8 list-none">
            {LINKS.map(link => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="bg-transparent border-none font-sans tracking-tight font-medium"
                  style={{
                    fontSize: '0.9rem',
                    color: isDark ? '#ffffff' : '#0a0a09',
                    opacity: 0.6,
                    transition: 'opacity 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => ((e.target as HTMLElement).style.opacity = '1')}
                  onMouseLeave={e => ((e.target as HTMLElement).style.opacity = '0.6')}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Clean Borderless Animated Theme Toggle */}
          <AnimatedThemeToggler
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex items-center justify-center transition-opacity duration-200 opacity-60 hover:opacity-100"
            style={getToggleStyles()}
          />

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 bg-transparent border-none p-1"
            style={{ cursor: 'pointer' }}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-5 h-px" style={{ background: isDark ? '#ffffff' : '#0a0a09' }} />
            <span className="block w-5 h-px" style={{ background: isDark ? '#ffffff' : '#0a0a09' }} />
            <span className="block w-5 h-px" style={{ background: isDark ? '#ffffff' : '#0a0a09' }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[150] flex flex-col items-center justify-center gap-8"
          style={{ background: isDark ? '#000000' : '#ffffff' }}
        >
          {/* Header inside Mobile Overlay */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between py-6 px-6">
            <div className="flex items-center gap-5">
              <div className="relative w-7 h-7 opacity-90">
                <Image
                  src="/assets/nj-logo.png"
                  alt="NJ Logo"
                  fill
                  priority
                  className="object-contain"
                  sizes="28px"
                  style={{ filter: isDark ? 'none' : 'invert(1)' }}
                />
              </div>
              <div
                className="flex items-center gap-3"
                style={{
                  borderLeft: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
                  paddingLeft: '0.85rem',
                }}
              >
                <svg height="16" width="16" viewBox="0 0 16 16" fill={isDark ? '#ffffff' : '#0a0a09'} className="opacity-60">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                <svg height="15" width="15" viewBox="0 0 24 24" fill={isDark ? '#ffffff' : '#0a0a09'} className="opacity-60">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
            </div>

            {/* Action Group */}
            <div className="flex items-center gap-4">
              {/* Clean Borderless Animated Theme Toggle inside overlay */}
              <AnimatedThemeToggler
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                style={getToggleStyles()}
              />
              
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center bg-transparent border-none opacity-60 hover:opacity-100 transition-opacity"
                style={{ 
                  color: isDark ? '#ffffff' : '#0a0a09', 
                  cursor: 'pointer', 
                  width: '24px',
                  height: '24px',
                  padding: 0
                }}
                aria-label="Close menu"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Centered nav items */}
          <div className="flex flex-col items-center gap-6 mt-12">
            {LINKS.map((link, i) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="bg-transparent border-none font-sans font-bold tracking-tighter"
                style={{
                  fontSize: '2.5rem',
                  color: isDark ? '#ffffff' : '#0a0a09',
                  cursor: 'pointer',
                  animation: `letterUp 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s both`,
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}