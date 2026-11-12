'use client';

import { useEffect, useRef } from 'react';

const MONO = "ui-monospace, 'SFMono-Regular', Menlo, Consolas, 'Liberation Mono', monospace";

/* sparse → dense */
const RAMP = ' .:-=+*#%@';
const GAMMA = 0.9;
const LENS = 340; // true-photo lens radius, px
const REVEAL_MS = 1400;

type Props = {
  src: string;
  /** glyph columns on desktop (auto-reduced on narrow screens) */
  cols?: number;
  /** flip the light/dark mapping, e.g. if your photo has a bright backdrop */
  invert?: boolean;
  alt?: string;
  className?: string;
};

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export default function AsciiPortrait({
  src,
  cols = 84,
  invert = false,
  alt = 'ASCII portrait',
  className,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLCanvasElement>(null);
  const lensRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    const base = baseRef.current;
    const lens = lensRef.current;
    if (!wrap || !inner || !base || !lens) return;

    const bctx = base.getContext('2d');
    const lctx = lens.getContext('2d');
    if (!bctx || !lctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    /* image-derived data */
    let img: HTMLImageElement | null = null;
    let n = cols; // effective columns
    let rows = 0;
    let lum = new Float32Array(0); // 0..1, auto-levelled
    let mask = new Uint8Array(0); // 1 = opaque pixel

    /* render state */
    let cw = 0;
    let ch = 0;
    let cssW = 0;
    let cssH = 0;
    let lastW = 0;
    let drawn = 0; // rows already painted
    let isDark = true;
    let color = '#fff';
    let bgColor = '#000';
    let inView = false;
    let revealing = false;
    let revealed = false;
    let revRaf = 0;
    let lensRaf = 0;
    let themeRaf = 0;
    let dead = false;

    /* lens state: pointer target + eased position/power */
    const mouse = { x: 0, y: 0, target: 0 };
    const lensPos = { x: 0, y: 0, power: 0 };

    const readTheme = () => {
      const cs = getComputedStyle(wrap);
      color = cs.color;
      bgColor = cs.backgroundColor;
      const [r, g, b] = (bgColor.match(/[\d.]+/g) ?? ['0', '0', '0']).map(Number);
      isDark = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.5;
    };

    /* downsample the photo to n x rows and auto-level its luminance */
    const sample = () => {
      if (!img) return;
      rows = Math.max(1, Math.round(n * (img.naturalHeight / img.naturalWidth) * 0.5)); // cells are 1:2

      // two-step downscale keeps detail instead of aliasing
      const mid = document.createElement('canvas');
      mid.width = n * 4;
      mid.height = rows * 4;
      const mctx = mid.getContext('2d');
      const out = document.createElement('canvas');
      out.width = n;
      out.height = rows;
      const octx = out.getContext('2d', { willReadFrequently: true });
      if (!mctx || !octx) return;
      mctx.imageSmoothingQuality = 'high';
      mctx.drawImage(img, 0, 0, mid.width, mid.height);
      octx.imageSmoothingQuality = 'high';
      octx.drawImage(mid, 0, 0, n, rows);

      const { data } = octx.getImageData(0, 0, n, rows);
      const total = n * rows;
      const raw = new Float32Array(total);
      mask = new Uint8Array(total);
      const solid: number[] = [];

      for (let i = 0; i < total; i++) {
        const o = i * 4;
        raw[i] = (0.2126 * data[o] + 0.7152 * data[o + 1] + 0.0722 * data[o + 2]) / 255;
        if (data[o + 3] > 76) {
          mask[i] = 1;
          solid.push(raw[i]);
        }
      }

      // stretch the 3rd–97th percentile to 0..1 so flat photos still get depth
      solid.sort((a, b) => a - b);
      const lo = solid[Math.floor(solid.length * 0.03)] ?? 0;
      const hi = solid[Math.floor(solid.length * 0.97)] ?? 1;
      const span = hi - lo || 1;
      lum = new Float32Array(total);
      for (let i = 0; i < total; i++) lum[i] = clamp((raw[i] - lo) / span);
    };

    const level = (i: number) => (isDark !== invert ? lum[i] : 1 - lum[i]);

    const sizeCanvases = () => {
      const w = inner.clientWidth;
      if (!w) return false;
      cw = w / n;
      ch = cw * 2;
      const h = Math.round(ch * rows);
      for (const c of [base, lens]) {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
        c.style.width = `${w}px`;
        c.style.height = `${h}px`;
      }
      cssW = w;
      cssH = h;
      lastW = w;
      return true;
    };

    const drawRows = (from: number, to: number) => {
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bctx.font = `${cw / 0.6}px ${MONO}`;
      bctx.textAlign = 'center';
      bctx.textBaseline = 'middle';
      bctx.fillStyle = color;
      for (let r = from; r < to; r++) {
        for (let c = 0; c < n; c++) {
          const i = r * n + c;
          if (!mask[i]) continue;
          const v = level(i);
          const k = Math.floor(Math.pow(v, GAMMA) * (RAMP.length - 1));
          if (k <= 0) continue;
          bctx.globalAlpha = 0.35 + 0.65 * v;
          bctx.fillText(RAMP[k], c * cw + cw / 2, r * ch + ch / 2);
        }
      }
      bctx.globalAlpha = 1;
    };

    const redraw = () => {
      bctx.setTransform(1, 0, 0, 1, 0, 0);
      bctx.clearRect(0, 0, base.width, base.height);
      drawRows(0, drawn);
    };

    /* scan-in reveal, top to bottom */
    const startReveal = () => {
      if (revealing || revealed || !inView || !rows) return;
      if (reduce) {
        drawn = rows;
        redraw();
        revealed = true;
        return;
      }
      revealing = true;
      const t0 = performance.now();
      const step = (t: number) => {
        const target = Math.min(rows, Math.floor(clamp((t - t0) / REVEAL_MS) * rows));
        if (target > drawn) {
          drawRows(drawn, target);
          drawn = target;
        }
        if (drawn < rows) revRaf = requestAnimationFrame(step);
        else {
          revealing = false;
          revealed = true;
        }
      };
      revRaf = requestAnimationFrame(step);
    };

    /* true-photo lens: a soft-edged circle that shows the original picture under the ASCII.
       Eased follow + grow/shrink, so it feels like a loupe rather than a hard mask. */
    const lensFrame = () => {
      lensRaf = 0;
      if (!img || !cssW || !cssH) return;

      const L = lensPos;
      L.power += (mouse.target - L.power) * 0.18;
      L.x += (mouse.x - L.x) * 0.35;
      L.y += (mouse.y - L.y) * 0.35;
      const p = L.power;

      lctx.globalCompositeOperation = 'source-over';
      lctx.setTransform(1, 0, 0, 1, 0, 0);
      lctx.clearRect(0, 0, lens.width, lens.height);

      if (p > 0.01) {
        const rad = LENS * (0.55 + 0.45 * p);
        const x0 = Math.max(0, Math.floor(L.x - rad));
        const y0 = Math.max(0, Math.floor(L.y - rad));
        const x1 = Math.min(cssW, Math.ceil(L.x + rad));
        const y1 = Math.min(cssH, Math.ceil(L.y + rad));
        const bw = x1 - x0;
        const bh = y1 - y0;

        if (bw > 0 && bh > 0) {
          lens.style.opacity = String(Math.min(1, p * 1.4));
          lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          lctx.imageSmoothingQuality = 'high';

          // 1. blank the ASCII underneath, 2. paint the matching crop of the real photo
          lctx.fillStyle = bgColor;
          lctx.fillRect(x0, y0, bw, bh);
          const iw = img.naturalWidth;
          const ih = img.naturalHeight;
          lctx.drawImage(img, (x0 / cssW) * iw, (y0 / cssH) * ih, (bw / cssW) * iw, (bh / cssH) * ih, x0, y0, bw, bh);

          // 3. feather everything outside the circle
          lctx.globalCompositeOperation = 'destination-in';
          const g = lctx.createRadialGradient(L.x, L.y, 0, L.x, L.y, rad);
          g.addColorStop(0, 'rgba(0,0,0,1)');
          g.addColorStop(0.74, 'rgba(0,0,0,1)');
          g.addColorStop(1, 'rgba(0,0,0,0)');
          lctx.fillStyle = g;
          lctx.fillRect(0, 0, cssW, cssH);
          lctx.globalCompositeOperation = 'source-over';
        }
      }

      if (p > 0.01 || mouse.target > 0) lensRaf = requestAnimationFrame(lensFrame);
    };
    const startLens = () => {
      if (!lensRaf) lensRaf = requestAnimationFrame(lensFrame);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const rect = inner.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      if (mouse.target === 0 && lensPos.power < 0.02) {
        // fresh entry: appear under the cursor instead of sliding in from the last spot
        lensPos.x = mouse.x;
        lensPos.y = mouse.y;
      }
      mouse.target = 1;
      startLens();
    };
    const onLeave = () => {
      mouse.target = 0;
      startLens();
    };

    /* boot */
    readTheme();
    const image = new window.Image();
    image.onload = () => {
      if (dead) return;
      img = image;
      n = inner.clientWidth < 420 ? Math.round(cols * 0.7) : cols;
      sample();
      if (sizeCanvases()) startReveal();
    };
    image.src = src;

    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting;
        if (inView) startReveal();
      },
      { threshold: 0.25 }
    );
    io.observe(wrap);

    const ro = new ResizeObserver(() => {
      if (!img || inner.clientWidth === lastW) return;
      const want = inner.clientWidth < 420 ? Math.round(cols * 0.7) : cols;
      if (want !== n) {
        n = want;
        const ratio = drawn / (rows || 1);
        sample();
        drawn = revealed ? rows : Math.floor(ratio * rows);
      }
      if (sizeCanvases()) redraw();
    });
    ro.observe(inner);

    // repaint when the theme toggler flips light/dark
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(themeRaf);
      themeRaf = requestAnimationFrame(() => {
        readTheme();
        if (rows) redraw();
      });
    });
    mo.observe(document.documentElement, { attributes: true });
    mo.observe(document.body, { attributes: true });

    if (canHover && !reduce) {
      wrap.addEventListener('pointermove', onMove, { passive: true });
      wrap.addEventListener('pointerleave', onLeave);
    }

    return () => {
      dead = true;
      cancelAnimationFrame(revRaf);
      cancelAnimationFrame(lensRaf);
      cancelAnimationFrame(themeRaf);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
    };
  }, [src, cols, invert]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
        border: '1px solid var(--border) rounded-full',
        padding: 'clamp(0.5rem, 2vw, 0.9rem)',
        position: 'relative',
        cursor: 'crosshair',
      }}
    >
      <div ref={innerRef} role="img" aria-label={alt} style={{ position: 'relative', lineHeight: 0 }}>
        <canvas ref={baseRef} style={{ display: 'block' }} />
        <canvas
          ref={lensRef}
          aria-hidden="true"
          style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none', opacity: 0 }}
        />
      </div>
    </div>
  );
}