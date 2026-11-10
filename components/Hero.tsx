'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import GradientASCII from '@/components/GradientASCII';
import { useTheme } from '@/components/context/ThemeContext';

const ASCIIText = dynamic(() => import('@/components/ASCIIText'), {
  ssr: false,
});

interface HeroProps {
  isLoaded: boolean;
}

export default function Hero({ isLoaded }: HeroProps) {
  const nameRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Theme-based ASCII colors
  const asciiTextColor = isDark ? '#fdf9f3' : '#000000';

  const asciiColors = isDark
    ? ['#bdbdbd', '#2d2f31', '#808080', '#2b2b2b']
    : ['#252525', '#777777', '#aaaaaa', '#e0e0e0'];

  // Detect phone screen size
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)');

    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
    };

    handleResize();
    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setShouldAnimate(true);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (!shouldAnimate) return;

    const ease = 'cubic-bezier(0.16, 1, 0.3, 1)';
    const el = nameRef.current;

    if (!el) return;

    const timer = setTimeout(() => {
      Object.assign(el.style, {
        transition: `all 1.2s ${ease}`,
        transform: 'translateY(0)',
        opacity: '1',
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [shouldAnimate]);

  return (
    <section
      id="hero"
      className="relative min-h-screen min-h-[100svh] flex items-end justify-center overflow-hidden transition-colors duration-300"
      style={{
        background: 'var(--bg)',
        padding: isMobile ? '0 1rem 2rem' : '0 3rem 3rem',
      }}
    >
      {/* Background Gradient ASCII */}
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-all duration-500"
        style={{
          opacity: isDark ? 0.5 : 1,
          filter: isDark ? 'none' : 'invert(1)',
          mixBlendMode: isDark ? 'screen' : 'multiply',
        }}
      >
        <GradientASCII
          dpr={undefined}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      {/* Main ASCII Name */}
      <div className="w-full relative z-100 flex justify-center">
        <div
          ref={nameRef}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '100rem',
            height: isMobile
              ? 'clamp(20rem, 70vw, 30rem)'
              : 'clamp(55rem, 22vw, 22rem)',
            transform: 'translateY(10px)',
            opacity: 0,
          }}
        >
          {shouldAnimate && (
            <ASCIIText
              text="/neil"
              asciiFontSize={isMobile ? 5 : 8}
              textColor={asciiTextColor}
              colors={asciiColors} style={undefined}            />
          )}
        </div>
      </div>
    </section>
  );
}