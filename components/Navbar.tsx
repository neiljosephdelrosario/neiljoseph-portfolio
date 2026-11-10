'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  MotionValue 
} from 'framer-motion';
import { useTheme } from '@/components/context/ThemeContext';
import AnimatedThemeToggler from '@/components/ui/animated-theme-toggler';
import { User, Code2, FolderGit2, Mail } from 'lucide-react';

const LINKS = [
  { label: 'about', href: '#about', icon: User },
  { label: 'techstack', href: '#tech-stack', icon: Code2 },
  { label: 'projects', href: '#projects', icon: FolderGit2 },
  { label: 'contact', href: '#contact', icon: Mail },
];

const SOCIALS = [
  { 
    label: 'GitHub', 
    href: 'https://github.com/neiljosephdelrosario', 
    icon: (props: any) => (
      <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
      </svg>
    ) 
  },
  { 
    label: 'LinkedIn', 
    href: 'https://linkedin.com/in/neil-joseph-del-rosario/', 
    icon: (props: any) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ) 
  },
];

// ── MAGIC UI DOCK ITEM WITH MAGNIFICATION ANIMATION ──
function MagicDockItem({
  children,
  mouseX,
  size = 40,
  magnification = 60,
  distance = 140,
  className = '',
}: {
  children: React.ReactNode;
  mouseX: MotionValue<number>;
  size?: number;
  magnification?: number;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, magnification, size]
  );

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize }}
      className={`relative flex cursor-pointer items-center justify-center rounded-full ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme } = useTheme();
  const mouseX = useMotionValue(Infinity);

  const scrollTo = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const isDark = theme === 'dark';
  const fontStack = "var(--font-fk-grotesk), 'FK Grotesk', sans-serif";

  const getToggleStyles = () => ({
    width: '20px',
    height: '20px',
    background: 'none',
    border: 'none',
    color: isDark ? '#ffffff' : '#0a0a09',
    cursor: 'pointer',
    padding: 0,
  });

  return (
    <>
      {/* ── DESKTOP TOP PERMANENT MAGIC UI DOCK ── */}
      <div 
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] hidden md:flex items-center px-6"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        <nav
          className="flex items-center gap-2 px-3 py-2 rounded-full shadow-2xl backdrop-blur-md font-bold"
          style={{
            background: isDark ? 'rgba(26, 26, 26, 0.85)' : 'rgba(235, 235, 234, 0.85)',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
            fontFamily: fontStack,
          }}
        >
          {/* Logo */}
          <MagicDockItem mouseX={mouseX}>
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#hero');
              }}
              className="group/icon relative flex items-center justify-center w-full h-full rounded-full transition-colors"
              style={{ background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
              title="Home"
            >
              <div className="relative w-5 h-5 opacity-90 group-hover/icon:opacity-100">
                <Image
                  src="/assets/nj-logo.png"
                  alt="NJ Logo"
                  fill
                  priority
                  className="object-contain"
                  sizes="20px"
                  style={{ filter: isDark ? 'none' : 'invert(1)' }}
                />
              </div>
            </a>
          </MagicDockItem>

          <div className="h-6 w-[1px] mx-1" style={{ background: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)' }} />

          {/* Nav Icons */}
          {LINKS.map((link) => {
            const IconComponent = link.icon;
            return (
              <MagicDockItem key={link.href} mouseX={mouseX}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="group/icon relative flex items-center justify-center w-full h-full rounded-full border-none cursor-pointer"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    color: isDark ? '#ffffff' : '#0a0a09',
                  }}
                >
                  <IconComponent className="w-4 h-4 opacity-70 group-hover/icon:opacity-100 transition-opacity" />
                  
                  {/* Dropdown Tooltip */}
                  <span 
                    className="absolute top-14 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-[10px] lowercase tracking-wide opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md"
                    style={{
                      background: isDark ? '#ffffff' : '#0a0a09',
                      color: isDark ? '#0a0a09' : '#ffffff',
                      fontFamily: fontStack,
                    }}
                  >
                    {link.label}
                  </span>
                </button>
              </MagicDockItem>
            );
          })}

          <div className="h-6 w-[1px] mx-1" style={{ background: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)' }} />

          {/* Social Icons */}
          {SOCIALS.map((social) => {
            const SocialIcon = social.icon;
            return (
              <MagicDockItem key={social.label} mouseX={mouseX}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/icon relative flex items-center justify-center w-full h-full rounded-full"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    color: isDark ? '#ffffff' : '#0a0a09',
                  }}
                >
                  <SocialIcon className="w-4 h-4 opacity-70 group-hover/icon:opacity-100 transition-opacity" />
                  
                  <span 
                    className="absolute top-14 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-[10px] lowercase tracking-wide opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md"
                    style={{
                      background: isDark ? '#ffffff' : '#0a0a09',
                      color: isDark ? '#0a0a09' : '#ffffff',
                      fontFamily: fontStack,
                    }}
                  >
                    {social.label}
                  </span>
                </a>
              </MagicDockItem>
            );
          })}

          <div className="h-6 w-[1px] mx-1" style={{ background: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)' }} />

          {/* Theme Switcher */}
          <MagicDockItem mouseX={mouseX}>
            <div 
              className="flex items-center justify-center w-full h-full rounded-full"
              style={{ background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
            >
              <AnimatedThemeToggler
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
                style={getToggleStyles()}
              />
            </div>
          </MagicDockItem>
        </nav>
      </div>

      {/* ── MOBILE HEADER (BURGER BUTTON) ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-[100] flex md:hidden items-center justify-between py-6 px-6 font-bold"
        style={{
          mixBlendMode: isDark ? 'difference' : 'normal',
          fontFamily: fontStack,
        }}
      >
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('#hero');
          }}
          className="group block"
          style={{ cursor: 'pointer' }}
        >
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
        </a>

        <div className="flex items-center gap-4">
          <AnimatedThemeToggler
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
            style={getToggleStyles()}
          />

          <button
            className="flex flex-col gap-1.5 bg-transparent border-none p-1"
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

      {/* ── MOBILE MENU OVERLAY ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[150] flex md:hidden flex-col items-center justify-center gap-8 font-bold"
            style={{
              background: isDark ? '#0a0a09' : '#f5f5f3',
              fontFamily: fontStack,
            }}
          >
            {/* Header inside Overlay */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between py-6 px-6">
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

              <div className="flex items-center gap-4">
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
                    padding: 0,
                  }}
                  aria-label="Close menu"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Staggered Animated Nav Items */}
            <motion.div 
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.2 }
                },
                hidden: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 }
                }
              }}
              className="flex flex-col items-center gap-6 mt-12 font-bold"
            >
              {LINKS.map((link) => (
                <div key={link.href} className="overflow-hidden">
                  <motion.button
                    variants={{
                      hidden: { y: 80, opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    onClick={() => scrollTo(link.href)}
                    className="bg-transparent border-none font-bold tracking-tighter lowercase transition-opacity duration-200 opacity-80 hover:opacity-100"
                    style={{
                      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                      color: isDark ? '#ffffff' : '#0a0a09',
                      cursor: 'pointer',
                      fontFamily: fontStack,
                    }}
                  >
                    {link.label}
                  </motion.button>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}