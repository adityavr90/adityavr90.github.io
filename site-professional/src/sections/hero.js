import * as THREE from 'three';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

export function initHero(cv) {
  const canvas = document.getElementById('hero-canvas');
  const heroEl = document.getElementById('hero');
  const nameEl = document.querySelector('.hero-name');
  const titleEl = document.querySelector('.hero-title');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 820px)').matches;

  // ── Sizing helpers ───────────────────────────────────────────────
  // Measure the canvas, not the window: with `100svh` the hero is shorter
  // than window.innerHeight on mobile, and using the window stretches the scene.
  const size = () => ({
    w: canvas.clientWidth || window.innerWidth,
    h: canvas.clientHeight || window.innerHeight
  });

  // ── Three.js setup ───────────────────────────────────────────────
  const initial = size();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, initial.w / initial.h, 0.1, 1000);
  camera.position.z = 80;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !isMobile,          // MSAA is expensive on mobile GPUs
    alpha: true,
    powerPreference: 'low-power'
  });
  renderer.setSize(initial.w, initial.h, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));

  // Fewer nodes on phones: link-building is O(n²), so halving the count
  // cuts the per-frame work to roughly a quarter.
  const COUNT = isMobile ? 55 : 120;
  const LINK_DIST_SQ = 28 * 28;

  const positions = new Float32Array(COUNT * 3);
  const velocities = [];
  for (let i = 0; i < COUNT; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 160;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    velocities.push({ x: (Math.random() - 0.5) * 0.04, y: (Math.random() - 0.5) * 0.04 });
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const dots = new THREE.Points(
    geo,
    new THREE.PointsMaterial({ color: 0x00D4FF, size: 0.7, transparent: true, opacity: 0.8 })
  );
  scene.add(dots);

  // ── Connection lines ─────────────────────────────────────────────
  // One reusable LineSegments with a pre-allocated buffer. The previous
  // version created a new BufferGeometry + Line per pair every few frames
  // and never disposed them, which leaked GPU memory until the tab stalled.
  const MAX_SEGMENTS = COUNT * 10;
  const linePositions = new Float32Array(MAX_SEGMENTS * 6);
  const lineGeo = new THREE.BufferGeometry();
  const lineAttr = new THREE.BufferAttribute(linePositions, 3);
  lineAttr.setUsage(THREE.DynamicDrawUsage);
  lineGeo.setAttribute('position', lineAttr);
  const lines = new THREE.LineSegments(
    lineGeo,
    new THREE.LineBasicMaterial({ color: 0x00D4FF, transparent: true, opacity: 0.12 })
  );
  lines.frustumCulled = false;
  scene.add(lines);

  function buildLines() {
    const pos = geo.attributes.position.array;
    let seg = 0;
    for (let i = 0; i < COUNT && seg < MAX_SEGMENTS; i++) {
      for (let j = i + 1; j < COUNT && seg < MAX_SEGMENTS; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        if (dx * dx + dy * dy < LINK_DIST_SQ) {   // squared compare, no sqrt
          const o = seg * 6;
          linePositions[o]     = pos[i * 3];
          linePositions[o + 1] = pos[i * 3 + 1];
          linePositions[o + 2] = pos[i * 3 + 2];
          linePositions[o + 3] = pos[j * 3];
          linePositions[o + 4] = pos[j * 3 + 1];
          linePositions[o + 5] = pos[j * 3 + 2];
          seg++;
        }
      }
    }
    lineGeo.setDrawRange(0, seg * 2);
    lineAttr.needsUpdate = true;
  }
  buildLines();

  // ── Animation loop ───────────────────────────────────────────────
  let frameId = null;
  let heroVisible = true;
  let tick = 0;

  function animate() {
    frameId = requestAnimationFrame(animate);
    tick += 0.005;
    const pos = geo.attributes.position.array;
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     += velocities[i].x + Math.sin(tick + i) * 0.01;
      pos[i * 3 + 1] += velocities[i].y + Math.cos(tick + i) * 0.01;
      if (Math.abs(pos[i * 3]) > 85)     velocities[i].x *= -1;
      if (Math.abs(pos[i * 3 + 1]) > 55) velocities[i].y *= -1;
    }
    geo.attributes.position.needsUpdate = true;
    if (Math.round(tick * 200) % 6 === 0) buildLines();
    renderer.render(scene, camera);
  }

  // Guarded start/stop. Previously visibilitychange and the IntersectionObserver
  // could each call animate(), stacking two rAF loops and doubling the speed.
  function start() {
    if (frameId === null && !reduceMotion) animate();
  }
  function stop() {
    if (frameId !== null) { cancelAnimationFrame(frameId); frameId = null; }
  }

  if (reduceMotion) {
    renderer.render(scene, camera);   // one static frame, no loop
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

  // ── Resize ───────────────────────────────────────────────────────
  // Debounced: mobile browsers fire resize continuously as the URL bar
  // hides, and reallocating the drawing buffer each time causes jank.
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const { w, h } = size();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }, 150);
  });

  // ── GSAP entrance sequence ───────────────────────────────────────
  if (reduceMotion) {
    // Skip the typewriter, show the finished text immediately
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
