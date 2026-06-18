import * as THREE from 'three';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

export function initHero(cv) {
  const canvas = document.getElementById('hero-canvas');
  const nameEl = document.querySelector('.hero-name');
  const titleEl = document.querySelector('.hero-title');

  // ── Three.js setup ──────────────────────────────────────────────
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 80;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Particles
  const COUNT = 120;
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
  const dots = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0x00D4FF, size: 0.7, transparent: true, opacity: 0.8 }));
  scene.add(dots);

  // Connection lines between nearby nodes
  function buildLines() {
    scene.children.filter(c => c.isLine).forEach(l => scene.remove(l));
    const pos = geo.attributes.position.array;
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00D4FF, transparent: true, opacity: 0.12 });
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = pos[i*3] - pos[j*3], dy = pos[i*3+1] - pos[j*3+1];
        if (Math.sqrt(dx*dx + dy*dy) < 28) {
          const g = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(pos[i*3], pos[i*3+1], pos[i*3+2]),
            new THREE.Vector3(pos[j*3], pos[j*3+1], pos[j*3+2])
          ]);
          scene.add(new THREE.Line(g, lineMat));
        }
      }
    }
  }
  buildLines();

  // Animation loop
  let frameId;
  let tick = 0;
  function animate() {
    frameId = requestAnimationFrame(animate);
    tick += 0.005;
    const pos = geo.attributes.position.array;
    for (let i = 0; i < COUNT; i++) {
      pos[i*3]     += velocities[i].x + Math.sin(tick + i) * 0.01;
      pos[i*3 + 1] += velocities[i].y + Math.cos(tick + i) * 0.01;
      if (Math.abs(pos[i*3]) > 85)     velocities[i].x *= -1;
      if (Math.abs(pos[i*3+1]) > 55)   velocities[i].y *= -1;
    }
    geo.attributes.position.needsUpdate = true;
    if (Math.round(tick * 200) % 12 === 0) buildLines();
    renderer.render(scene, camera);
  }
  animate();

  // Pause when hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(frameId);
    else animate();
  });

  // Stop when hero leaves viewport
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) cancelAnimationFrame(frameId);
    else animate();
  }, { threshold: 0 });
  observer.observe(document.getElementById('hero'));

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ── GSAP entrance sequence ───────────────────────────────────────
  const tl = gsap.timeline({ delay: 0.3 });
  tl.to('.hero-eyebrow', { opacity: 1, duration: 0.6, ease: 'power2.out' })
    .to('.hero-name',    { opacity: 1, duration: 0.01 }, '-=0.2')
    .to(nameEl, { duration: 1.2, text: cv.name, ease: 'none' })
    .to('.hero-title',   { opacity: 1, duration: 0.01 }, '-=0.4')
    .to(titleEl, { duration: 0.9, text: cv.subtitle, ease: 'none' })
    .to('.hero-actions', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
}
