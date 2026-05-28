'use client';

import { useEffect, useRef, useState } from 'react';
import LightRays from '@/components/LightRays';
import RotatingText from '@/components/RotatingText';

interface HeroProps {
  isLoaded: boolean;
}

const ROLES = [
  'FRONTEND DEVELOPER',
  'BACKEND DEVELOPER',
  'UI/UX DESIGNER',
  'SOFTWARE ENGINEER'
];

export default function Hero({ isLoaded }: HeroProps) {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setShouldAnimate(true);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (!shouldAnimate) return;
    
    const ease = 'cubic-bezier(0.16, 1, 0.3, 1)';

    const setVisible = (el: HTMLElement | null, delay: number, style: Partial<CSSStyleDeclaration>) => {
      if (!el) return;
      setTimeout(() => {
        Object.assign(el.style, { 
          transition: `all 1.2s ${ease}`, 
          ...style 
        });
      }, delay);
    };

    setVisible(eyebrowRef.current, 50, { transform: 'translateY(0)', opacity: '1' });
    setVisible(word1Ref.current, 200, { transform: 'translateY(0)' });
    setVisible(word2Ref.current, 350, { transform: 'translateY(0)' });
  }, [shouldAnimate]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end overflow-hidden transition-colors duration-300"
      style={{ background: 'var(--bg)', padding: '0 3rem 6rem' }}
    >
      <div className="absolute inset-0 pointer-events-none z-0 transition-all duration-500 opacity-15 invert mix-blend-multiply dark:opacity-40 dark:invert-0 dark:mix-blend-screen">
        <LightRays />
      </div>

      {/* Main content */}
      <div className="w-full relative z-20">
        
        {/* Eyebrow / Role Container */}
        <div 
          ref={eyebrowRef}
          style={{ 
            overflow: 'hidden', 
            marginBottom: '1.75rem',
            transform: 'translateY(30px)',
            opacity: 0,
            transition: 'transform 0.5s ease, opacity 0.5s ease',
          }}
        >
          {/* Adjusted font-size and heights via Tailwind for responsive scaling */}
          <div
            className="inline-flex items-center font-sans tracking-tight font-medium text-xl sm:text-2xl md:text-5xl h-10 sm:h-12 md:h-20"
            style={{
              color: 'var(--text-eyebrow)',
            }}
          >
            {shouldAnimate && (
              <RotatingText
                texts={ROLES}
                mainClassName="uppercase"
                staggerFrom="last"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-120%' }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                rotationInterval={2500}
              />
            )}
          </div>
        </div>

        {/* Headings */}
        <div
          className="font-sans font-black uppercase tracking-wide"
          style={{
            fontSize: 'clamp(3rem, 8.5vw, 7.5rem)',
            lineHeight: 0.88,
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <span
              ref={word1Ref}
              className="block transition-colors duration-300"
              style={{ color: 'var(--text)', transform: 'translateY(100%)' }}
            >
              Neil
            </span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span
              ref={word2Ref}
              className="block transition-colors duration-300"
              style={{ color: 'var(--text)', transform: 'translateY(100%)' }}
            >
              Joseph.
            </span>            
          </div>
        </div>

      </div>
    </section>
  );
}