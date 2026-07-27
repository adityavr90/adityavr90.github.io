import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

/**
 * Particle-network hero background.
 *
 * Previously drawn with Three.js, which pulled ~1.3 MB of source (about
 * 170 kB gzipped) into the bundle to render dots and lines on a flat
 * plane — nothing in the scene ever used the third dimension. This is the
 * same effect in plain Canvas 2D at a fraction of the weight.
 */
export function initHero(cv) {
  const canvas = document.getElementById('hero-canvas');
  const heroEl = document.getElementById('hero');
  const nameEl = document.querySelector('.hero-name');
  const titleEl = document.querySelector('.hero-title');
  const ctx = canvas.getContext('2d');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ACCENT = '0, 212, 255';
  let w = 0, h = 0, dpr = 1;
  let particles = [];
  let linkDist = 130;

  // ── Sizing ───────────────────────────────────────────────────────
  function resize() {
    // Measure the canvas, not the window: the hero uses 100svh, which is
    // shorter than window.innerHeight while the mobile URL bar is showing.
    w = canvas.clientWidth || window.innerWidth;
    h = canvas.clientHeight || window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);   // draw in CSS pixels

    // Density scales with area so phones don't get a dense mesh and
    // desktops don't get a sparse one. Clamped at both ends.
    const target = Math.round((w * h) / 14000);
    const count = Math.max(28, Math.min(target, 110));
    linkDist = w < 700 ? 95 : 130;

    seed(count);
  }

  function seed(count) {
    const prev = particles;
    particles = [];
    for (let i = 0; i < count; i++) {
      // Keep existing particles on resize so the mesh doesn't visibly
      // reshuffle when the mobile URL bar hides.
      if (prev[i] && prev[i].x < w && prev[i].y < h) {
        particles.push(prev[i]);
      } else {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          phase: Math.random() * Math.PI * 2
        });
      }
    }
  }

  // ── Drawing ──────────────────────────────────────────────────────
  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Links first so dots sit on top
    ctx.lineWidth = 1;
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < linkDist * linkDist) {
          // Fade with distance — the Three.js version used a flat 0.12,
          // this reads slightly softer at the edges of each cluster.
          const alpha = (1 - Math.sqrt(d2) / linkDist) * 0.18;
          ctx.strokeStyle = `rgba(${ACCENT}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    ctx.fillStyle = `rgba(${ACCENT}, 0.8)`;
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // ── Animation loop ───────────────────────────────────────────────
  let frameId = null;
  let heroVisible = true;
  let tick = 0;

  function step() {
    frameId = requestAnimationFrame(step);
    tick += 0.005;

    for (const p of particles) {
      p.x += p.vx + Math.sin(tick + p.phase) * 0.06;
      p.y += p.vy + Math.cos(tick + p.phase) * 0.06;

      // Bounce off the edges with a small inset so dots don't clip
      if (p.x < 4 || p.x > w - 4) p.vx *= -1;
      if (p.y < 4 || p.y > h - 4) p.vy *= -1;
      p.x = Math.max(4, Math.min(w - 4, p.x));
      p.y = Math.max(4, Math.min(h - 4, p.y));
    }

    draw();
  }

  // Guarded start/stop: the visibility listener and the IntersectionObserver
  // can both fire, and an unguarded start would stack two rAF loops.
  function start() { if (frameId === null && !reduceMotion) step(); }
  function stop()  { if (frameId !== null) { cancelAnimationFrame(frameId); frameId = null; } }

  resize();

  if (reduceMotion) {
    draw();                       // one static frame, no loop
  } else {
    start();
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (heroVisible) start();
  });

  new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    if (heroVisible && !document.hidden) start(); else stop();
  }, { threshold: 0 }).observe(heroEl);

  // Debounced: mobile browsers fire resize continuously as the URL bar
  // hides, and reallocating the backing store each time causes jank.
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      if (reduceMotion) draw();
    }, 150);
  });

  // ── GSAP entrance sequence ───────────────────────────────────────
  if (reduceMotion) {
    gsap.set('.hero-eyebrow, .hero-name, .hero-title, .hero-actions', { opacity: 1 });
    nameEl.textContent = cv.name;
    titleEl.textContent = cv.subtitle;
    return;
  }

  const animated = '.hero-eyebrow, .hero-name, .hero-title, .hero-actions';
  const tl = gsap.timeline({
    delay: 0.3,
    onStart: () => gsap.set(animated, { willChange: 'transform, opacity' }),
    onComplete: () => gsap.set(animated, { willChange: 'auto' })
  });
  tl.to('.hero-eyebrow', { opacity: 1, duration: 0.6, ease: 'power2.out' })
    .to('.hero-name',    { opacity: 1, duration: 0.01 }, '-=0.2')
    .to(nameEl, { duration: 1.2, text: cv.name, ease: 'none' })
    .to('.hero-title',   { opacity: 1, duration: 0.01 }, '-=0.4')
    .to(titleEl, { duration: 0.9, text: cv.subtitle, ease: 'none' })
    .to('.hero-actions', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
}
