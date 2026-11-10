'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const fontStack = "var(--font-fk-grotesk), 'FK Grotesk', sans-serif";

  return (
    <footer
      className="relative overflow-hidden w-full flex flex-col justify-between transition-colors duration-300"
      style={{
        background: 'var(--bg, #0a0a09)',
        color: 'var(--text, #ffffff)',
        fontFamily: fontStack,
        padding: '5rem 2rem 2rem 2rem',
        borderTop: '1px solid var(--footer-divider, rgba(128, 128, 128, 0.2))',
        minHeight: '520px',
      }}
    >
      {/* Top Section: Socials/Info & Navigation Columns */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 z-10">
        
        {/* Left Column: Socials & Contact Info */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            {/* GitHub Icon */}
            <a
              href="https://github.com/neiljosephdelrosario"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 pointer-events-auto border border-current/10 hover:border-current/30"
              style={{ background: 'var(--icon-bg, rgba(128, 128, 128, 0.1))', color: 'inherit' }}
              aria-label="GitHub"
            >
              <svg className="w-4 h-4 opacity-80" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>

            {/* LinkedIn Icon */}
            <a
              href="https://linkedin.com/in/neil-joseph-del-rosario"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 pointer-events-auto border border-current/10 hover:border-current/30"
              style={{ background: 'var(--icon-bg, rgba(128, 128, 128, 0.1))', color: 'inherit' }}
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 opacity-80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            {/* Email Icon */}
            <a
              href="mailto:neiljoseph.delrosario@gmail.com"
              className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 pointer-events-auto border border-current/10 hover:border-current/30"
              style={{ background: 'var(--icon-bg, rgba(128, 128, 128, 0.1))', color: 'inherit' }}
              aria-label="Email"
            >
              <svg className="w-4 h-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>

          <div className="flex flex-col gap-2 text-sm opacity-70" style={{ fontFamily: fontStack }}>
            <p>Bulacan, Philippines</p>
            <p>neiljoseph.delrosario@gmail.com</p>
            <p>Frontend Dev / UI/UX Designer</p>
          </div>
        </div>

        {/* Right Columns: Navigation Menus */}
        <div className="md:col-span-7 grid grid-cols-3 gap-8 text-sm pointer-events-auto">
          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest opacity-40 font-bold">Navigation</span>
            <Link href="#about" className="opacity-70 hover:opacity-100 transition-opacity">About</Link>
            <Link href="#tech-stack" className="opacity-70 hover:opacity-100 transition-opacity">Tech Stack</Link>
            <Link href="#projects" className="opacity-70 hover:opacity-100 transition-opacity">Projects</Link>
          </div>

          {/* Socials / Links */}
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest opacity-40 font-bold">Socials</span>
            <a href="https://github.com/neiljosephdelrosario" target="_blank" rel="noreferrer" className="opacity-70 hover:opacity-100 transition-opacity flex items-center gap-1">
              GitHub
            </a>
            <a href="https://linkedin.com/in/neil-joseph-del-rosario" target="_blank" rel="noreferrer" className="opacity-70 hover:opacity-100 transition-opacity flex items-center gap-1">
              LinkedIn
            </a>
          </div>

          {/* Legal / Contact */}
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest opacity-40 font-bold">Connect</span>
            <Link href="#contact" className="opacity-70 hover:opacity-100 transition-opacity">Get in Touch</Link>
          </div>
        </div>

      </div>

      {/* Middle Divider with "Get In Touch" Action Button */}
      <div className="max-w-7xl mx-auto w-full relative flex items-center py-6 z-10 pointer-events-auto">
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="w-full border-t border-current/10" />
        </div>
        <div className="relative flex justify-end w-full">
          <a
            href="#contact"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold lowercase tracking-wider transition-all duration-200 hover:scale-105 shadow-lg pointer-events-auto"
            style={{
              background: 'var(--text, #ffffff)',
              color: 'var(--bg, #0a0a09)',
            }}
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Bottom Sub-bar: Copyright & Legal */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between text-xl opacity-60 pt-4 pb-12 gap-4 z-10 pointer-events-none">
        <p>© 2026 ALL RIGHTS RESERVED.</p>
        <div className="flex items-center gap-6"></div>
      </div>

      {/* Giant Background Watermark Text */}
      <div className="w-full leading-none select-none pointer-events-none mt-auto flex justify-center z-10">
        <h1 
          className="font-black tracking-tighter m-0 text-center whitespace-nowrap opacity-10"
          style={{
            fontSize: 'clamp(10rem, 15vw, 16rem)',
            color: 'var(--text, #ffffff)',
            transform: 'translateY(15%)',
          }}
        >
          neil joseph
        </h1>
      </div>
    </footer>
  );
}