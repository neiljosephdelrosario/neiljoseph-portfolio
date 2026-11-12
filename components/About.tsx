'use client';

import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import AsciiPortrait from './AsciiProtrait';

/* Client-only on purpose: SplitFlapText injects its CSS through a <style> tag whose text
   contains quotes. React escapes those during SSR but not on the client, which is what
   caused the "Text content does not match server-rendered HTML" hydration error. */
const SplitFlapText = dynamic(() => import('./SplitFlapText'), { ssr: false });

/* ──────────────────────────────────────────────────────────────
   About
   · SplitFlapText headings (client-only, sized to always fit the container)
   · ASCII portrait of neil.png (scan-in reveal + chromatic cursor lens)
   · glyph field: a tiled CSS background + one small canvas that follows the cursor
   · bio that scans in word by word on scroll
   · monochrome scroll-driven timeline for work + education
   ────────────────────────────────────────────────────────────── */

const fontStack = "var(--font-fk-grotesk), 'FK Grotesk', sans-serif";
const MONO = "ui-monospace, 'SFMono-Regular', Menlo, Consolas, 'Liberation Mono', monospace";

const ACCENTS = ['#ffa31a', '#19f5a0', '#1a4dff', '#b21aff'];
const GLYPHS = 'X0#7@nx+X0#7@   ';

/* glyph field geometry */
const CW = 14; // cell width
const CH = 18; // cell height
const TC = 56; // tile columns  (tile = 784 x 864 px, repeated)
const TR = 48; // tile rows
const R = 170; // cursor light radius
const SIZE = R * 2; // glow canvas is only this big, not the whole section

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/* deterministic [0,1) hash, so the field needs no stored grid and never reshuffles on resize */
const hash = (a: number, b: number, c = 0) => {
  let h = (Math.imul(a, 374761393) + Math.imul(b, 668265263) + Math.imul(c, 362437)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};

/* char at a cell; `bucket` >= 0 makes ~30% of cells flicker to another glyph */
const glyphAt = (r: number, c: number, bucket = -1) => {
  const rr = r % TR;
  const cc = c % TC;
  if (bucket >= 0 && hash(rr, cc, bucket + 1) < 0.3) {
    return GLYPHS[Math.floor(hash(rr, cc, bucket + 7) * GLYPHS.length)];
  }
  return GLYPHS[Math.floor(hash(rr, cc) * GLYPHS.length)];
};

const BIO =
  "I'm Neil Joseph, a frontend developer passionate about creating seamless, visually compelling digital experiences. I specialize in bringing layouts to life, bridging the gap between pixel-perfect designs and clean, functional interfaces. I enjoy learning new modern frameworks, tackling development challenges, and keeping up with the latest trends in UI animation and web performance.";

const BIO_WORDS = BIO.split(' ');

type Entry = {
  id: string;
  title: string;
  org: string;
  date: string;
  body?: string;
  tags: string[];
  href?: string;
  logo?: string;
};

// newest first, so the timeline reads like a commit log
const JOURNEY: Entry[] = [
  {
    id: 'mis',
    title: 'management information system officer',
    org: 'The Manila Prince Hotel',
    date: 'august 2026 - october 2026',
    body: 'Maintained hotel Management Information Systems (MIS) and database infrastructure, providing daily IT support across departments to ensure uninterrupted operations.',
    tags: ['Networking', 'IT Operations Management', 'Database Infrastructure', 'System Administration', 'Technical Support'],
  },
  {
    id: 'frontend',
    title: 'frontend developer',
    org: 'Xentra Infotech Solutions Inc.',
    date: 'january 2026 - april 2026',
    href: 'https://www.xentrasolutions.com/',
    logo: '/assets/xentra.png',
    body: 'Developed responsive web interfaces, built layout architectures translating Figma wireframes into performant React modules, optimized animations, and collaborated closely with cross-functional technical teams to deliver rich, modern consumer-facing dashboard applications.',
    tags: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'React Native Expo', 'Storybook'],
  },
  {
    id: 'edu',
    title: 'bachelor of science in information technology',
    org: 'La Consolacion University Philippines',
    date: '2022 - 2026',
    tags: [],
  },
];

const CSS = `
.ab-root{position:relative;overflow:hidden;isolation:isolate}

/* ── glyph field ── */
.ab-field{position:absolute;inset:0;z-index:0;pointer-events:none;
  -webkit-mask-image:linear-gradient(to bottom,transparent 0,#000 14%,#000 82%,transparent 100%);
          mask-image:linear-gradient(to bottom,transparent 0,#000 14%,#000 82%,transparent 100%)}
.ab-field-base{position:absolute;inset:0;background-repeat:repeat;background-size:${TC * CW}px ${TR * CH}px}
.ab-glow{position:absolute;left:0;top:0;width:${SIZE}px;height:${SIZE}px;will-change:transform;display:none}
@media (hover:hover) and (pointer:fine){.ab-glow{display:block}}
.ab-content{position:relative;z-index:1}

/* ── split-flap headings ── */
.ab-flap-root{display:flex;margin:0;min-height:1.08em;line-height:1}

/* ── bio ── */
.ab-w{opacity:.16}

/* ── timeline (black & white) ── */
.ab-track{--p:0;--pad:1.5rem;position:relative;padding-left:var(--pad)}
.ab-rail{position:absolute;left:5px;top:.5rem;bottom:.5rem;width:2px;background:var(--border)}
.ab-rail-fill{position:absolute;inset:0;background:var(--text);
  clip-path:inset(0 0 calc((1 - var(--p)) * 100%) 0)}
.ab-entry{position:relative;display:grid;gap:.5rem;padding-bottom:3rem;opacity:.3;transition:opacity .5s ease}
.ab-entry:last-child{padding-bottom:0}
.ab-entry.on{opacity:1}
.ab-node{position:absolute;left:calc(var(--pad) * -1);top:.35rem;width:12px;height:12px;background:var(--bg);
  border:2px solid var(--border-card,var(--text-dim));transition:background .3s,border-color .3s,box-shadow .3s}
.ab-entry.on .ab-node{background:var(--text);border-color:var(--text);box-shadow:0 0 0 3px var(--bg),0 0 0 4px var(--text)}
.ab-date{font-family:${MONO};font-size:.78rem;letter-spacing:.02em;color:var(--text-dim);padding-top:.15rem}
.ab-tag{font-size:.72rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:.25rem .75rem;border-radius:999px;
  border:1px solid var(--border);color:var(--text-muted);background:var(--bg-tag-alt);
  transition:text-shadow .2s,border-color .2s,color .2s;cursor:default}
.ab-tag:hover{color:var(--text);border-color:var(--text-muted);text-shadow:-1px 0 #ffa31a,1px 0 #1a4dff}
.ab-logo:focus-visible{outline:2px solid #19f5a0;outline-offset:3px;border-radius:4px}

@media (min-width:768px){
  .ab-track{--pad:3rem}
  .ab-entry{gap:.6rem 2rem;padding-bottom:4rem;grid-template-columns:13rem 1fr}
}
@media (prefers-reduced-motion:reduce){
  .ab-w{opacity:1}
  .ab-entry{opacity:1;transition:none}
}
`;

/* ───────────── split-flap heading ─────────────
   Blank tiles first, then flips to the text the first time it scrolls into view.
   Font size is derived from the character count so the whole row always fits the
   container, from phones up to desktop. */

function FlapHeading({ text, max }: { text: string; max: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setOn(true);
        io.disconnect();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const n = text.length;
  const em = n * 0.78 + (n - 1) * 0.08 + 0.4; // tiles + gaps + a little slack
  // tighter side padding on phones (2rem total) vs desktop (4rem total)
  const size = `min(${max}, calc((100vw - 3rem) / ${em.toFixed(2)}))`;

  return (
    <h2
      ref={ref}
      className="ab-flap-root"
      style={
        {
          fontSize: size,
          '--split-flap-font-size': size,
          '--split-flap-gap': '0.08em',
          '--split-flap-radius': '0.12em',
          '--split-flap-tile-color': 'var(--text)',
          '--split-flap-text-color': 'var(--bg)',
        } as CSSProperties
      }
    >
      <SplitFlapText text={on ? text : ' '.repeat(n)} />
    </h2>
  );
}

/* ───────────── glyph field ─────────────
   · base layer: one small tile painted once and repeated by CSS (no full-size canvas)
   · light layer: a 340px canvas that follows the cursor — ~460 glyphs per frame
   Nothing depends on the section's height, so layout changes never trigger a repaint. */

type HostRef = { current: HTMLElement | null };

function GlyphField({ host }: { host: HostRef }) {
  const baseRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = host.current;
    const baseEl = baseRef.current;
    const glow = glowRef.current;
    if (!section || !baseEl || !glow) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let color = '#fff';

    /* base tile */
    const paintTile = () => {
      color = getComputedStyle(section).color;
      const tile = document.createElement('canvas');
      tile.width = TC * CW * dpr;
      tile.height = TR * CH * dpr;
      const ctx = tile.getContext('2d');
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      ctx.font = `12px ${MONO}`;
      ctx.textBaseline = 'top';
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.1;
      for (let r = 0; r < TR; r++) {
        for (let c = 0; c < TC; c++) {
          const ch = glyphAt(r, c);
          if (ch !== ' ') ctx.fillText(ch, c * CW, r * CH);
        }
      }
      baseEl.style.backgroundImage = `url(${tile.toDataURL()})`;
    };
    paintTile();

    // repaint when the theme toggler flips light/dark
    let themeRaf = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(themeRaf);
      themeRaf = requestAnimationFrame(paintTile);
    });
    mo.observe(document.documentElement, { attributes: true });
    mo.observe(document.body, { attributes: true });

    // pointer-driven glow only matters on hover-capable, fine-pointer devices.
    // On touch/coarse-pointer phones we skip setting up the canvas entirely.
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (reduce || !canHover) {
      return () => {
        cancelAnimationFrame(themeRaf);
        mo.disconnect();
      };
    }

    const gctx = glow.getContext('2d');
    if (!gctx) {
      return () => {
        cancelAnimationFrame(themeRaf);
        mo.disconnect();
      };
    }

    /* cursor light */
    glow.width = SIZE * dpr;
    glow.height = SIZE * dpr;

    const mouse = { cx: 0, cy: 0, power: 0, target: 0 };
    let raf = 0;
    let running = false;
    let lastKey = '';

    const frame = (t: number) => {
      mouse.power += (mouse.target - mouse.power) * 0.14;
      const p = mouse.power;

      if (p > 0.01) {
        const rect = section.getBoundingClientRect();
        const x = mouse.cx - rect.left;
        const y = mouse.cy - rect.top;
        const left = Math.round(x - R);
        const top = Math.round(y - R);
        const bucket = Math.floor(t / 110);
        const key = `${left}|${top}|${bucket}|${Math.round(p * 50)}`;

        if (key !== lastKey) {
          lastKey = key;
          glow.style.transform = `translate3d(${left}px,${top}px,0)`;
          gctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          gctx.clearRect(0, 0, SIZE, SIZE);
          gctx.font = `12px ${MONO}`;
          gctx.textBaseline = 'top';

          const c0 = Math.max(0, Math.floor(left / CW));
          const c1 = Math.ceil((left + SIZE) / CW);
          const r0 = Math.max(0, Math.floor(top / CH));
          const r1 = Math.ceil((top + SIZE) / CH);

          for (let r = r0; r <= r1; r++) {
            for (let c = c0; c <= c1; c++) {
              const d = Math.hypot(c * CW + CW / 2 - x, r * CH + CH / 2 - y);
              if (d > R) continue;
              const ch = glyphAt(r, c, bucket);
              if (ch === ' ') continue;
              const k = 1 - d / R;
              gctx.globalAlpha = Math.min(1, k * k * 1.15 + 0.04) * p;
              // bright core, chromatic rim
              gctx.fillStyle = k < 0.4 ? ACCENTS[(r * 3 + c) & 3] : color;
              gctx.fillText(ch, c * CW - left, r * CH - top);
            }
          }
        }
      } else if (lastKey) {
        lastKey = '';
        gctx.setTransform(1, 0, 0, 1, 0, 0);
        gctx.clearRect(0, 0, glow.width, glow.height);
      }

      if (p > 0.01 || mouse.target > 0) raf = requestAnimationFrame(frame);
      else running = false;
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return; // no hover on touch screens
      mouse.cx = e.clientX;
      mouse.cy = e.clientY;
      mouse.target = 1;
      start();
    };
    const onLeave = () => {
      mouse.target = 0;
      start();
    };

    section.addEventListener('pointermove', onMove, { passive: true });
    section.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(themeRaf);
      mo.disconnect();
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
    };
  }, [host]);

  return (
    <div className="ab-field" aria-hidden="true">
      <div ref={baseRef} className="ab-field-base" />
      <canvas ref={glowRef} className="ab-glow" />
    </div>
  );
}

/* ───────────── section ───────────── */

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // scroll-driven: bio word scan + timeline progress. Only does work while one of them is on screen,
  // and only touches the words / values that actually changed.
  useEffect(() => {
    const bio = bioRef.current;
    const track = trackRef.current;
    if (!bio || !track) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const words = Array.from(bio.querySelectorAll<HTMLElement>('.ab-w'));
    const entries = Array.from(track.querySelectorAll<HTMLElement>('.ab-entry'));
    const visible = { bio: false, track: false };
    let ticking = false;
    let prevReveal = 0;
    let prevP = -1;

    const update = () => {
      ticking = false;
      const vh = window.innerHeight;

      if (visible.bio && !reduce) {
        const rect = bio.getBoundingClientRect();
        const p = clamp((vh * 0.9 - rect.top) / (vh * 0.3 + rect.height));
        const reveal = p * (words.length + 4);
        const lo = Math.max(0, Math.floor(Math.min(prevReveal, reveal)) - 1);
        const hi = Math.min(words.length - 1, Math.ceil(Math.max(prevReveal, reveal)) + 1);
        for (let i = lo; i <= hi; i++) {
          const x = clamp(reveal - i);
          const el = words[i];
          el.style.opacity = String(0.16 + 0.84 * x);
          // the word being "scanned" right now gets the RGB split
          el.style.textShadow = x > 0 && x < 1 ? '-2px 0 #ffa31a, 2px 0 #1a4dff' : '';
        }
        prevReveal = reveal;
      }

      if (visible.track) {
        const rect = track.getBoundingClientRect();
        const line = vh * 0.68;
        const p = clamp((line - rect.top) / rect.height);
        if (Math.abs(p - prevP) > 0.001) {
          prevP = p;
          track.style.setProperty('--p', p.toFixed(4));
        }
        for (const el of entries) el.classList.toggle('on', el.getBoundingClientRect().top < line);
      }
    };

    const schedule = () => {
      if (ticking || (!visible.bio && !visible.track)) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      list => {
        list.forEach(e => {
          if (e.target === bio) visible.bio = e.isIntersecting;
          if (e.target === track) visible.track = e.isIntersecting;
        });
        schedule();
      },
      { rootMargin: '120px 0px' }
    );
    io.observe(bio);
    io.observe(track);

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="ab-root min-h-screen"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
        padding: 'clamp(3.5rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem)',
        fontFamily: fontStack,
        contain: 'layout paint',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <GlyphField host={sectionRef} />

      <div className="ab-content max-w-6xl mx-auto flex flex-col gap-5">
        {/* ── TITLE ── */}
        <FlapHeading text="get to know me" max="6rem" />

        {/* ── BIO + ASCII PORTRAIT ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
          <p
            ref={bioRef}
            className="md:col-span-7 font-bold"
            style={{
              margin: 0,
              fontFamily: fontStack,
              fontSize: 'clamp(1.15rem, 3.8vw, 2.15rem)',
              lineHeight: 1.3,
              letterSpacing: '-0.015em',
              color: 'var(--text)',
              overflowWrap: 'break-word',
            }}
          >
            {BIO_WORDS.map((w, i) => (
              <Fragment key={i}>
                <span className="ab-w">{w}</span>{' '}
              </Fragment>
            ))}
          </p>

          <figure
            className="md:col-span-5 w-full min-w-0 md:sticky md:top-28 flex flex-col gap-2"
            style={{ margin: 0 }}
          >
            <AsciiPortrait src="/assets/neil.png" cols={84} alt="ASCII portrait of Neil Joseph" />
          </figure>
        </div>

        {/* ── JOURNEY: work + education on one timeline ── */}
        <div className="flex flex-col gap-8 md:gap-12">
          <div className="flex flex-col gap-3 md:gap-5">
            <FlapHeading text="my journey" max="4.5rem" />
            <p
              className="font-bold"
              style={{
                margin: 0,
                fontSize: 'clamp(0.95rem, 2.5vw, 1rem)',
                color: 'var(--text-muted)',
              }}
            >
              My professional journey and the companies I&apos;ve worked with.
            </p>
          </div>

          <div ref={trackRef} className="ab-track">
            <div className="ab-rail" aria-hidden="true">
              <i className="ab-rail-fill" />
            </div>

            {JOURNEY.map(j => (
              <article key={j.id} className="ab-entry">
                <span className="ab-node" aria-hidden="true" />
                <div className="ab-date">{j.date}</div>

                <div className="flex flex-col gap-3 md:gap-4 min-w-0">
                  <div>
                    <h3
                      className="font-bold tracking-tight"
                      style={{
                        margin: 0,
                        fontSize: 'clamp(1.1rem, 3.5vw, 1.6rem)',
                        lineHeight: 1.15,
                        color: 'var(--text)',
                      }}
                    >
                      {j.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <p
                        className="font-bold"
                        style={{ margin: 0, fontSize: 'clamp(0.92rem, 2.6vw, 1rem)', color: 'var(--text-muted)' }}
                      >
                        {j.org}
                      </p>
                      {j.href && j.logo && (
                        <a
                          href={j.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${j.org} website`}
                          className="ab-logo inline-block transition-all duration-200 active:scale-95 hover:opacity-80"
                        >
                          <Image src={j.logo} alt="" width={18} height={18} className="object-contain" />
                        </a>
                      )}
                    </div>
                  </div>

                  {j.body && (
                    <p
                      className="font-bold"
                      style={{
                        margin: 0,
                        maxWidth: '62ch',
                        fontSize: 'clamp(0.92rem, 2.6vw, 0.98rem)',
                        lineHeight: 1.65,
                        color: 'var(--text-muted)',
                      }}
                    >
                      {j.body}
                    </p>
                  )}

                  {j.tags.length > 0 && (
                    <ul className="flex flex-wrap gap-1.5 md:gap-2" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                      {j.tags.map(tag => (
                        <li key={tag} className="ab-tag" style={{ fontFamily: fontStack }}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}