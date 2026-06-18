import * as THREE from 'three';
import gsap from 'gsap';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
const CITIES = [
  { lat: 25.2, lng: 55.3 },   // Dubai
  { lat: 51.5, lng: -0.1 },   // London
  { lat: 24.7, lng: 46.7 },   // Riyadh
  { lat: 40.7, lng: -74.0 },  // New York
  { lat: 1.3,  lng: 103.8 },  // Singapore
  { lat: 48.9, lng: 2.3 },    // Paris
  { lat: 35.7, lng: 139.7 },  // Tokyo
  { lat: -33.9, lng: 18.4 }   // Cape Town
];

function latLngToVec3(lat, lng, r) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (lng + 180) * Math.PI / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta)
  );
}

export function initHero(cv) {
  const canvas = document.getElementById('hero-canvas');
  const nameEl = document.querySelector('.hero-name');
  const subtitleEl = document.querySelector('.hero-subtitle');
  subtitleEl.textContent = cv.subtitle;

  // ── Three.js ────────────────────────────────────────────────────
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 90;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Globe
  const globe = new THREE.Mesh(
    new THREE.SphereGeometry(30, 64, 64),
    new THREE.MeshPhongMaterial({ color: 0x001100, emissive: 0x001100, wireframe: false, transparent: true, opacity: 0.9 })
  );
  scene.add(globe);

  // Wireframe overlay
  const wire = new THREE.Mesh(
    new THREE.SphereGeometry(30.1, 24, 24),
    new THREE.MeshBasicMaterial({ color: 0x00FF41, wireframe: true, transparent: true, opacity: 0.07 })
  );
  scene.add(wire);

  // City dots
  CITIES.forEach(c => {
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0x00FF41 })
    );
    dot.position.copy(latLngToVec3(c.lat, c.lng, 30.3));
    scene.add(dot);
  });

  // Arc lines between cities
  const arcMat = new THREE.MeshBasicMaterial({ color: 0x00FF41, transparent: true, opacity: 0.5 });
  const pairs = [[0,1],[0,2],[0,3],[1,4],[2,5],[3,6],[4,7],[1,2],[3,5]];
  pairs.forEach(([a, b]) => {
    const p1 = latLngToVec3(CITIES[a].lat, CITIES[a].lng, 30.3);
    const p2 = latLngToVec3(CITIES[b].lat, CITIES[b].lng, 30.3);
    const mid = p1.clone().add(p2).multiplyScalar(0.5).normalize().multiplyScalar(40);
    const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
    const tube = new THREE.TubeGeometry(curve, 20, 0.12, 6, false);
    scene.add(new THREE.Mesh(tube, arcMat));
  });

  // Lighting
  scene.add(new THREE.AmbientLight(0x002200, 2));
  const pt = new THREE.PointLight(0x00FF41, 3, 200);
  pt.position.set(50, 50, 50);
  scene.add(pt);

  let frameId;
  function animate() {
    frameId = requestAnimationFrame(animate);
    globe.rotation.y += 0.0015;
    wire.rotation.y += 0.0015;
    renderer.render(scene, camera);
  }
  animate();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(frameId); else animate();
  });

  const observer = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) cancelAnimationFrame(frameId); else animate();
  }, { threshold: 0 });
  observer.observe(document.getElementById('hero'));

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ── Letter scramble ──────────────────────────────────────────────
  function scrambleTo(el, finalText, duration = 1400) {
    const letters = finalText.split('');
    const resolved = new Array(letters.length).fill(false);
    const start = performance.now();
    el.style.opacity = 1;

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const resolveCount = Math.floor(progress * letters.length);
      for (let i = 0; i < resolveCount; i++) resolved[i] = true;

      el.textContent = letters.map((ch, i) => {
        if (resolved[i]) return ch;
        return ch === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');

      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = finalText;
    }
    requestAnimationFrame(tick);
  }

  // ── GSAP entrance ────────────────────────────────────────────────
  const animatedEls = '.hero-eyebrow, .hero-subtitle, .btn-enter';
  const tl = gsap.timeline({
    delay: 0.5,
    onStart: () => gsap.set(animatedEls, { willChange: 'transform, opacity' }),
    onComplete: () => gsap.set(animatedEls, { willChange: 'auto' })
  });
  tl.to('.hero-eyebrow', { opacity: 1, duration: 0.4 })
    .add(() => scrambleTo(nameEl, cv.name.toUpperCase(), 1600))
    .to('.hero-subtitle', { opacity: 1, duration: 0.5, delay: 0.8 }, '-=0.5')
    .to('.btn-enter', { opacity: 1, duration: 0.4 }, '+=0.2');
}
