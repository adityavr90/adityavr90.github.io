# CV Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build two separate static personal websites for Aditya Vignesh Ram G K — one professional/approachable (Site B), one bold/modern (Site C) — sharing a single CV data source, using Vanilla JS + Vite + GSAP + Three.js.

**Architecture:** Each site is an independent Vite project outputting static files. A `shared/cv-data.js` module is the single source of truth for all CV content, imported by both sites. GSAP handles all scroll and entrance animations; Three.js renders the hero canvas on each site.

**Tech Stack:** Vite 5, GSAP 3 (ScrollTrigger, TextPlugin, DrawSVG), Three.js 0.x, EmailJS (contact forms), vanilla HTML/CSS/JS.

## Global Constraints

- No frameworks (no React, Vue, Angular) — vanilla JS only
- Both sites must build cleanly with `npm run build` to a `dist/` folder
- Three.js canvas only active while hero is in viewport (IntersectionObserver cleanup)
- `will-change: transform` applied only during active GSAP animation, removed after
- All CV content sourced from `shared/cv-data.js` — never hardcoded in HTML
- Contact form via EmailJS free tier — no backend
- Node 18+ required

---

## File Map

```
E:/AI/CV/
├── shared/
│   └── cv-data.js                  ← All CV content as JS export
│
├── site-professional/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html                  ← Shell with section placeholders
│   └── src/
│       ├── main.js                 ← Imports + initialises all sections
│       ├── style.css               ← Design tokens, reset, global layout
│       └── sections/
│           ├── hero.js             ← Three.js particle network + GSAP entrance
│           ├── about.js            ← Stat counters + split layout
│           ├── skills.js           ← Card groups + tooltips
│           ├── experience.js       ← ScrollTrigger timeline + DrawSVG
│           ├── projects.js         ← Card grid
│           ├── certifications.js   ← Badge grid + progress rings
│           ├── blog.js             ← Article list
│           └── contact.js          ← EmailJS form
│
└── site-bold/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.js
        ├── style.css               ← Black/green tokens, Space Grotesk
        └── sections/
            ├── hero.js             ← Three.js threat globe + letter scramble
            ├── about.js            ← Terminal window typewriter
            ├── skills.js           ← SVG radar chart + tool cascade
            ├── experience.js       ← Horizontal scroll flip cards
            ├── projects.js         ← Threat-level cards
            ├── certifications.js   ← Clearance badge grid
            ├── blog.js             ← Intel reports list
            └── contact.js          ← Terminal-style EmailJS form
```

---

## Task 1: Shared CV Data Module

**Files:**
- Create: `shared/cv-data.js`

**Interfaces:**
- Produces: `export const cv` — consumed by every section in both sites

- [ ] **Step 1: Create the shared data file**

```javascript
// shared/cv-data.js
export const cv = {
  name: 'Aditya Vignesh Ram G K',
  title: 'Senior IT/OT Security Manager',
  subtitle: 'IEC 62443 & NIST 800-82 Specialist',
  tagline: 'Securing Critical Infrastructure Across the Middle East',
  contact: {
    phone: '+971568804898',
    email: 'adityavr90@gmail.com',
    location: 'Dubai, United Arab Emirates',
    linkedin: '' // add LinkedIn URL before launch
  },
  summary: 'IT/OT Cybersecurity Program Lead and OT Specialist with 10+ years of cross-functional experience at Big 4 firms (KPMG, PwC) specializing in securing large-scale Industrial Control Systems (ICS) and Operational Technology (OT). Proven track record directing multimillion-dollar security programs and risk assessments across 60+ critical infrastructure sites in the UAE/KSA.',
  stats: [
    { value: 10, suffix: '+', label: 'Years Experience' },
    { value: 60, suffix: '+', label: 'Sites Assessed' },
    { value: 2, suffix: '', label: 'Big 4 Firms' }
  ],
  experience: [
    {
      title: 'IT/OT Cyber Security Manager',
      company: 'KPMG Lower Gulf',
      location: 'Dubai, UAE',
      period: 'Sep 2022 — Present',
      highlights: [
        'Managed PMO for a multimillion-dollar cybersecurity portfolio with 10+ staff — 100% on-time delivery',
        'Directed OT cybersecurity assessments across 60+ sites for the largest oil & gas company in UAE using a custom Unified Control Framework',
        'Led high-stakes IT/OT assessment and transformation roadmap for a major UAE Air Navigation entity',
        'Identified critical OT vulnerabilities; delivered remediation plans aligned with NIST CSF and IEC 62443',
        'Led ISO 27001 audit readiness and tracked key security KPIs aligned with regulatory goals'
      ]
    },
    {
      title: 'Cyber Security Manager',
      company: 'PwC Middle East',
      location: 'Dubai, UAE',
      period: 'Sep 2015 — Sep 2022',
      highlights: [
        'Conducted comprehensive OT security assessments for a leading chemical manufacturer with custom automated configuration reviews',
        'Delivered risk-based cybersecurity audits across IT and OT for government, finance, and manufacturing sectors',
        'Crafted cybersecurity strategies and enterprise security architectures for government agencies aligned with ISO 27001, NIST CSF, NCA, HCIS',
        'Performed standards-based assessments ensuring compliance with NIST 800-82 and the NIS Directive',
        'Mentored junior staff and championed a culture of continuous learning'
      ]
    }
  ],
  education: [
    {
      degree: 'MSc in Information Security',
      institution: 'Royal Holloway, University of London',
      location: 'London, UK',
      period: '2013 — 2014',
      note: 'Distinction & First-Class Honours'
    },
    {
      degree: 'B.E. in Electronics & Communication Engineering',
      institution: 'Syed Ammal Engineering College, Anna University',
      location: 'Tamil Nadu, India',
      period: '2007 — 2011'
    }
  ],
  certifications: [
    { name: 'Certified Information Security Manager (CISM)', issuer: 'ISACA', date: 'Jun 2025', status: 'active' },
    { name: 'ISO 27001 Lead Implementer', issuer: 'BSI', date: 'Dec 2016', status: 'active' },
    { name: 'Certificate of Cloud Security Knowledge v4', issuer: 'Cloud Security Alliance', date: 'May 2022', status: 'active' },
    { name: 'Certified Ethical Hacker (CEH v7)', issuer: 'EC-Council', date: 'Sep 2011', status: 'active' },
    { name: 'G42 Cloud Certified Associate', issuer: 'G42', date: 'May 2021', status: 'active' },
    { name: 'Maritime Cybersecurity Essentials', issuer: 'Northeast Maritime Institute', date: 'Aug 2023', status: 'active' },
    { name: 'Getting Started in OT/ICS Penetration Testing', issuer: '', date: 'Aug 2025', status: 'active' },
    { name: 'Nuclear Security Threats and Risks: Cyber Threats', issuer: 'IAEA', date: 'Sep 2025', status: 'active' },
    { name: 'AI Security Governance', issuer: 'Securiti', date: 'Aug 2025', status: 'active' },
    { name: 'ISA/IEC 62443', issuer: 'ISA', date: '', status: 'in-progress' },
    { name: 'Project Management Professional (PMP)', issuer: 'PMI', date: 'Q1 2026', status: 'planned' }
  ],
  skills: {
    core: [
      'IT/OT Security Program Management',
      'Project Lifecycle Management',
      'GRC Strategy & Regulatory Compliance',
      'OT & ICS Security Assessment',
      'Cyber Program Design & Board Reporting',
      'Security Architecture Oversight',
      'Digital Transformation Delivery',
      'Team Leadership & Mentorship'
    ],
    standards: [
      'ISA/IEC 62443', 'ISO 27001', 'NIST 800-82', 'NIST CSF',
      'NIST 800-53', 'ISO 27002', 'NCA ECC', 'NCA OTCC', 'UAE IA', 'CAF'
    ],
    tools: [
      'Nessus', 'Nozomi', 'Claroty', 'Kali Linux',
      'Wireshark', 'VirtualBox', 'BloodHound', 'BurpSuite', 'nmap'
    ]
  },
  projects: [
    // Add before launch: { title, description, tags: [], link, impact: 'LOW'|'MEDIUM'|'HIGH' }
  ],
  blog: [
    // Add before launch: { title, date, category, readTime, excerpt, link }
  ]
};
```

- [ ] **Step 2: Commit**

```bash
git init
git add shared/cv-data.js
git commit -m "feat: add shared CV data module"
```

---

## Task 2: Scaffold Site B (Professional)

**Files:**
- Create: `site-professional/package.json`
- Create: `site-professional/vite.config.js`
- Create: `site-professional/index.html`
- Create: `site-professional/src/style.css`
- Create: `site-professional/src/main.js`

**Interfaces:**
- Consumes: `../../shared/cv-data.js` via relative import
- Produces: Vite dev server on `localhost:5173` showing the HTML shell

- [ ] **Step 1: Create package.json**

```json
{
  "name": "site-professional",
  "private": true,
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "gsap": "^3.12.5",
    "three": "^0.169.0",
    "@emailjs/browser": "^4.4.1"
  },
  "devDependencies": {
    "vite": "^5.4.0"
  }
}
```

- [ ] **Step 2: Create vite.config.js**

```javascript
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: { '@shared': resolve(__dirname, '../shared') }
  },
  build: { outDir: 'dist' }
});
```

- [ ] **Step 3: Create index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Aditya Vignesh Ram — IT/OT Cybersecurity</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/src/style.css" />
</head>
<body>
  <nav id="nav">
    <span class="nav-logo">AVR</span>
    <ul class="nav-links">
      <li><a href="#about">About</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#experience">Experience</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#certifications">Certifications</a></li>
      <li><a href="#blog">Blog</a></li>
      <li><a href="#contact" class="nav-cta">Contact</a></li>
    </ul>
  </nav>

  <section id="hero">
    <canvas id="hero-canvas"></canvas>
    <div class="hero-content">
      <p class="hero-eyebrow">Senior IT/OT Security Manager</p>
      <h1 class="hero-name"></h1>
      <p class="hero-title"></p>
      <div class="hero-actions">
        <a href="#projects" class="btn btn-primary">View My Work</a>
        <a href="/Aditya_Vignesh_Ram_CV.pdf" download class="btn btn-ghost">Download CV</a>
      </div>
    </div>
  </section>

  <section id="about"><div class="container"></div></section>
  <section id="skills"><div class="container"></div></section>
  <section id="experience"><div class="container"></div></section>
  <section id="projects"><div class="container"></div></section>
  <section id="certifications"><div class="container"></div></section>
  <section id="blog"><div class="container"></div></section>
  <section id="contact"><div class="container"></div></section>

  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

- [ ] **Step 4: Create src/style.css**

```css
:root {
  --bg: #0A0E1A;
  --surface: #111827;
  --accent: #00D4FF;
  --accent-dim: rgba(0, 212, 255, 0.12);
  --text: #F0F4F8;
  --text-muted: #8899AA;
  --font: 'Plus Jakarta Sans', sans-serif;
  --radius: 12px;
  --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  font-size: 18px;
  line-height: 1.7;
  overflow-x: hidden;
}

.container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }

section { padding: 6rem 0; }

#hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

#hero-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  padding: 0 2rem;
}

.hero-eyebrow {
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 1rem;
  opacity: 0;
}

.hero-name {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
  opacity: 0;
}

.hero-title {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--text-muted);
  margin-bottom: 2.5rem;
  opacity: 0;
}

.hero-actions { display: flex; gap: 1rem; justify-content: center; opacity: 0; }

.btn {
  display: inline-block;
  padding: 0.85rem 2rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: var(--transition);
  cursor: pointer;
  border: none;
}

.btn-primary { background: var(--accent); color: #000; }
.btn-primary:hover { background: #33DDFF; transform: translateY(-2px); }
.btn-ghost { border: 1px solid var(--accent); color: var(--accent); background: transparent; }
.btn-ghost:hover { background: var(--accent-dim); transform: translateY(-2px); }

#nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  background: rgba(10, 14, 26, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 212, 255, 0.08);
}

.nav-logo { font-weight: 800; font-size: 1.25rem; color: var(--accent); }
.nav-links { display: flex; gap: 2rem; list-style: none; }
.nav-links a { color: var(--text-muted); text-decoration: none; font-size: 0.9rem; transition: var(--transition); }
.nav-links a:hover { color: var(--accent); }
.nav-cta { color: var(--accent) !important; border: 1px solid var(--accent); padding: 0.4rem 1rem; border-radius: 4px; }

h2.section-title {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  margin-bottom: 0.5rem;
}

h2.section-title span { color: var(--accent); }

.section-divider {
  width: 48px; height: 3px;
  background: var(--accent);
  margin-bottom: 3rem;
}

.reveal { opacity: 0; transform: translateY(32px); }
```

- [ ] **Step 5: Create src/main.js (stub)**

```javascript
import { cv } from '@shared/cv-data.js';
import { initHero } from './sections/hero.js';
import { initAbout } from './sections/about.js';
import { initSkills } from './sections/skills.js';
import { initExperience } from './sections/experience.js';
import { initProjects } from './sections/projects.js';
import { initCertifications } from './sections/certifications.js';
import { initBlog } from './sections/blog.js';
import { initContact } from './sections/contact.js';

document.addEventListener('DOMContentLoaded', () => {
  initHero(cv);
  initAbout(cv);
  initSkills(cv);
  initExperience(cv);
  initProjects(cv);
  initCertifications(cv);
  initBlog(cv);
  initContact(cv);
});
```

- [ ] **Step 6: Create stub section files so main.js doesn't error**

Create each of these files with a single exported no-op:

`src/sections/hero.js`, `about.js`, `skills.js`, `experience.js`, `projects.js`, `certifications.js`, `blog.js`, `contact.js` — each containing:

```javascript
export function initHero(cv) {}   // replace initHero with the correct name per file
```

- [ ] **Step 7: Install dependencies and verify dev server**

```bash
cd site-professional
npm install
npm run dev
```

Expected: Browser opens at `http://localhost:5173`. Page is dark navy with empty sections and a working nav. No console errors.

- [ ] **Step 8: Commit**

```bash
cd ..
git add site-professional/
git commit -m "feat: scaffold site-professional with Vite + CSS tokens"
```

---

## Task 3: Site B — Three.js Particle Network Hero

**Files:**
- Modify: `site-professional/src/sections/hero.js`

**Interfaces:**
- Consumes: `cv.name`, `cv.title`, `cv.subtitle`
- Produces: Three.js particle canvas running in `#hero-canvas`; GSAP entrance sequence animating `.hero-eyebrow`, `.hero-name`, `.hero-title`, `.hero-actions`

- [ ] **Step 1: Implement hero.js**

```javascript
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
```

- [ ] **Step 2: Verify in browser**

Run `npm run dev` in `site-professional/`. Open `http://localhost:5173`. Expected:
- Teal particle network animates in the hero background
- Name types out character by character
- Subtitle types after name
- Two CTA buttons fade in
- No console errors

- [ ] **Step 3: Commit**

```bash
git add site-professional/src/sections/hero.js
git commit -m "feat(site-b): Three.js particle network + GSAP hero entrance"
```

---

## Task 4: Site B — About Section

**Files:**
- Modify: `site-professional/src/sections/about.js`
- Modify: `site-professional/src/style.css` (append about styles)

**Interfaces:**
- Consumes: `cv.summary`, `cv.stats`
- Produces: Split layout with animated stat counters triggered by ScrollTrigger

- [ ] **Step 1: Implement about.js**

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function initAbout(cv) {
  const section = document.querySelector('#about .container');
  section.innerHTML = `
    <h2 class="section-title reveal">About <span>Me</span></h2>
    <div class="section-divider reveal"></div>
    <div class="about-grid">
      <div class="about-avatar reveal">
        <div class="avatar-ring">
          <div class="avatar-placeholder">AVR</div>
        </div>
      </div>
      <div class="about-content">
        <p class="about-summary reveal">${cv.summary}</p>
        <div class="about-stats">
          ${cv.stats.map(s => `
            <div class="stat-card reveal">
              <span class="stat-value" data-target="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</span>
              <span class="stat-label">${s.label}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Reveal animations
  gsap.utils.toArray('#about .reveal').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 32 }, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  // Stat counters
  document.querySelectorAll('.stat-value').forEach(el => {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target, duration: 1.8, ease: 'power2.out',
          onUpdate: function() { el.textContent = Math.round(this.targets()[0].val) + suffix; }
        });
      }
    });
  });
}
```

- [ ] **Step 2: Append to style.css**

```css
.about-grid { display: grid; grid-template-columns: 280px 1fr; gap: 4rem; align-items: start; }
.avatar-ring { width: 220px; height: 220px; border-radius: 50%; border: 2px solid var(--accent); padding: 6px; }
.avatar-placeholder { width: 100%; height: 100%; border-radius: 50%; background: var(--surface); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: 800; color: var(--accent); }
.about-summary { color: var(--text-muted); margin-bottom: 2.5rem; }
.about-stats { display: flex; gap: 2rem; flex-wrap: wrap; }
.stat-card { text-align: center; }
.stat-value { display: block; font-size: 2.5rem; font-weight: 800; color: var(--accent); line-height: 1; }
.stat-label { font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; }
```

- [ ] **Step 3: Verify — scroll down to About section, stat numbers count up**

- [ ] **Step 4: Commit**

```bash
git add site-professional/src/sections/about.js site-professional/src/style.css
git commit -m "feat(site-b): about section with animated stat counters"
```

---

## Task 5: Site B — Skills Section

**Files:**
- Modify: `site-professional/src/sections/skills.js`
- Modify: `site-professional/src/style.css` (append)

**Interfaces:**
- Consumes: `cv.skills.core`, `cv.skills.standards`, `cv.skills.tools`
- Produces: Three card groups with pill badges and hover tooltips

- [ ] **Step 1: Implement skills.js**

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initSkills(cv) {
  const section = document.querySelector('#skills .container');
  const groups = [
    { label: 'Core Expertise', items: cv.skills.core, type: 'list' },
    { label: 'International Standards', items: cv.skills.standards, type: 'pills' },
    { label: 'Technical Tools', items: cv.skills.tools, type: 'pills' }
  ];

  section.innerHTML = `
    <h2 class="section-title reveal">Skills & <span>Expertise</span></h2>
    <div class="section-divider reveal"></div>
    <div class="skills-grid">
      ${groups.map(g => `
        <div class="skill-card reveal">
          <h3 class="skill-card-title">${g.label}</h3>
          ${g.type === 'list'
            ? `<ul class="skill-list">${g.items.map(i => `<li>${i}</li>`).join('')}</ul>`
            : `<div class="skill-pills">${g.items.map(i => `<span class="pill">${i}</span>`).join('')}</div>`
          }
        </div>
      `).join('')}
    </div>
  `;

  gsap.utils.toArray('#skills .reveal').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 32 }, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });
}
```

- [ ] **Step 2: Append to style.css**

```css
.skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
.skill-card { background: var(--surface); border: 1px solid rgba(0,212,255,0.1); border-radius: var(--radius); padding: 2rem; transition: var(--transition); }
.skill-card:hover { border-color: var(--accent); transform: translateY(-4px); }
.skill-card-title { font-size: 1rem; font-weight: 700; color: var(--accent); margin-bottom: 1.25rem; text-transform: uppercase; letter-spacing: 0.08em; }
.skill-list { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
.skill-list li { color: var(--text-muted); padding-left: 1rem; position: relative; }
.skill-list li::before { content: '▸'; position: absolute; left: 0; color: var(--accent); }
.skill-pills { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.pill { background: var(--accent-dim); color: var(--accent); border: 1px solid rgba(0,212,255,0.3); border-radius: 999px; padding: 0.3rem 0.85rem; font-size: 0.8rem; font-weight: 600; }
```

- [ ] **Step 3: Verify — three skill cards visible, pills render, hover lifts card**

- [ ] **Step 4: Commit**

```bash
git add site-professional/src/sections/skills.js site-professional/src/style.css
git commit -m "feat(site-b): skills section with card groups and pill badges"
```

---

## Task 6: Site B — Experience Timeline

**Files:**
- Modify: `site-professional/src/sections/experience.js`
- Modify: `site-professional/src/style.css` (append)

**Interfaces:**
- Consumes: `cv.experience` array
- Produces: Vertical scroll-scrubbed timeline with GSAP ScrollTrigger line draw

- [ ] **Step 1: Implement experience.js**

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initExperience(cv) {
  const section = document.querySelector('#experience .container');
  section.innerHTML = `
    <h2 class="section-title reveal">Work <span>Experience</span></h2>
    <div class="section-divider reveal"></div>
    <div class="timeline">
      <div class="timeline-line"><div class="timeline-line-fill"></div></div>
      ${cv.experience.map((job, i) => `
        <div class="timeline-item reveal" data-index="${i}">
          <div class="timeline-dot"></div>
          <div class="timeline-card">
            <div class="timeline-meta">
              <span class="timeline-company">${job.company}</span>
              <span class="timeline-period">${job.period}</span>
            </div>
            <h3 class="timeline-title">${job.title}</h3>
            <p class="timeline-location">${job.location}</p>
            <ul class="timeline-highlights">
              ${job.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Animate the vertical line fill on scroll
  gsap.fromTo('.timeline-line-fill',
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.timeline',
        start: 'top 70%',
        end: 'bottom 80%',
        scrub: true
      }
    }
  );

  // Reveal each card
  gsap.utils.toArray('.timeline-item').forEach(el => {
    gsap.fromTo(el, { opacity: 0, x: -40 }, {
      opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 82%' }
    });
  });
}
```

- [ ] **Step 2: Append to style.css**

```css
.timeline { position: relative; padding-left: 2.5rem; }
.timeline-line { position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: rgba(0,212,255,0.15); }
.timeline-line-fill { width: 100%; height: 100%; background: var(--accent); transform-origin: top; transform: scaleY(0); }
.timeline-item { position: relative; margin-bottom: 3.5rem; }
.timeline-dot { position: absolute; left: -2.85rem; top: 0.4rem; width: 14px; height: 14px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 4px var(--accent-dim); }
.timeline-card { background: var(--surface); border: 1px solid rgba(0,212,255,0.1); border-radius: var(--radius); padding: 1.75rem 2rem; }
.timeline-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem; }
.timeline-company { font-weight: 700; color: var(--accent); }
.timeline-period { font-size: 0.85rem; color: var(--text-muted); }
.timeline-title { font-size: 1.15rem; font-weight: 700; margin-bottom: 0.25rem; }
.timeline-location { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem; }
.timeline-highlights { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
.timeline-highlights li { color: var(--text-muted); font-size: 0.92rem; padding-left: 1rem; position: relative; }
.timeline-highlights li::before { content: '▸'; position: absolute; left: 0; color: var(--accent); }
```

- [ ] **Step 3: Verify — scroll through experience, teal line draws, cards slide in from left**

- [ ] **Step 4: Commit**

```bash
git add site-professional/src/sections/experience.js site-professional/src/style.css
git commit -m "feat(site-b): experience timeline with scroll-driven line draw"
```

---

## Task 7: Site B — Projects, Certifications, Blog, Contact

**Files:**
- Modify: `site-professional/src/sections/projects.js`
- Modify: `site-professional/src/sections/certifications.js`
- Modify: `site-professional/src/sections/blog.js`
- Modify: `site-professional/src/sections/contact.js`
- Modify: `site-professional/src/style.css` (append)

**Interfaces:**
- Consumes: `cv.projects`, `cv.certifications`, `cv.blog`, `cv.contact`
- Produces: All remaining sections rendered and animated

- [ ] **Step 1: Implement projects.js**

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initProjects(cv) {
  const section = document.querySelector('#projects .container');
  const isEmpty = !cv.projects || cv.projects.length === 0;
  section.innerHTML = `
    <h2 class="section-title reveal">AI & Security <span>Projects</span></h2>
    <div class="section-divider reveal"></div>
    ${isEmpty
      ? `<p class="reveal" style="color:var(--text-muted)">Projects coming soon.</p>`
      : `<div class="projects-grid">
          ${cv.projects.map(p => `
            <div class="project-card reveal">
              <div class="project-tags">${p.tags.map(t => `<span class="pill">${t}</span>`).join('')}</div>
              <h3 class="project-title">${p.title}</h3>
              <p class="project-desc">${p.description}</p>
              ${p.link ? `<a href="${p.link}" class="project-link" target="_blank" rel="noopener">View Project →</a>` : ''}
            </div>
          `).join('')}
        </div>`
    }
  `;

  gsap.utils.toArray('#projects .reveal').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 32 }, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });
}
```

- [ ] **Step 2: Implement certifications.js**

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initCertifications(cv) {
  const section = document.querySelector('#certifications .container');
  section.innerHTML = `
    <h2 class="section-title reveal">Certifications & <span>Education</span></h2>
    <div class="section-divider reveal"></div>
    <div class="certs-grid">
      ${cv.certifications.map(c => `
        <div class="cert-card reveal ${c.status}">
          <div class="cert-status-dot"></div>
          <div class="cert-name">${c.name}</div>
          ${c.issuer ? `<div class="cert-issuer">${c.issuer}</div>` : ''}
          <div class="cert-date">${c.status === 'in-progress' ? 'In Progress' : c.status === 'planned' ? c.date : c.date}</div>
        </div>
      `).join('')}
    </div>
  `;

  gsap.utils.toArray('#certifications .reveal').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 32 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });
}
```

- [ ] **Step 3: Implement blog.js**

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initBlog(cv) {
  const section = document.querySelector('#blog .container');
  const isEmpty = !cv.blog || cv.blog.length === 0;
  section.innerHTML = `
    <h2 class="section-title reveal">Blog & <span>Writeups</span></h2>
    <div class="section-divider reveal"></div>
    ${isEmpty
      ? `<p class="reveal" style="color:var(--text-muted)">Articles coming soon.</p>`
      : `<div class="blog-list">
          ${cv.blog.map(b => `
            <a href="${b.link}" class="blog-item reveal" target="_blank" rel="noopener">
              <div class="blog-meta"><span class="blog-category">${b.category}</span><span class="blog-date">${b.date} · ${b.readTime}</span></div>
              <h3 class="blog-title">${b.title}</h3>
              <p class="blog-excerpt">${b.excerpt}</p>
            </a>
          `).join('')}
        </div>`
    }
  `;

  gsap.utils.toArray('#blog .reveal').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });
}
```

- [ ] **Step 4: Implement contact.js**

```javascript
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initContact(cv) {
  const section = document.querySelector('#contact .container');
  section.innerHTML = `
    <h2 class="section-title reveal">Get In <span>Touch</span></h2>
    <div class="section-divider reveal"></div>
    <div class="contact-grid">
      <div class="contact-info reveal">
        <p style="color:var(--text-muted);margin-bottom:2rem">Available for senior IT/OT security consulting, advisory roles, and speaking engagements.</p>
        <div class="contact-links">
          <a href="mailto:${cv.contact.email}" class="contact-link">✉ ${cv.contact.email}</a>
          <a href="tel:${cv.contact.phone}" class="contact-link">📞 ${cv.contact.phone}</a>
          <span class="contact-link">📍 ${cv.contact.location}</span>
          ${cv.contact.linkedin ? `<a href="${cv.contact.linkedin}" class="contact-link" target="_blank" rel="noopener">in LinkedIn</a>` : ''}
        </div>
      </div>
      <form id="contact-form" class="contact-form reveal">
        <input type="text" name="from_name" placeholder="Your Name" required />
        <input type="email" name="reply_to" placeholder="Your Email" required />
        <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
        <button type="submit" class="btn btn-primary" id="submit-btn">Send Message</button>
        <p id="form-status" style="margin-top:1rem;color:var(--accent);display:none"></p>
      </form>
    </div>
  `;

  // EmailJS — replace with your own service/template/public key before launch
  emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');
  document.getElementById('contact-form').addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const status = document.getElementById('form-status');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    try {
      await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target);
      status.textContent = 'Message sent successfully!';
      status.style.display = 'block';
      e.target.reset();
    } catch {
      status.textContent = 'Failed to send. Please email directly.';
      status.style.color = '#FF6B6B';
      status.style.display = 'block';
    }
    btn.textContent = 'Send Message';
    btn.disabled = false;
  });

  gsap.utils.toArray('#contact .reveal').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 32 }, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });
}
```

- [ ] **Step 5: Append remaining CSS to style.css**

```css
/* Projects */
.projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
.project-card { background: var(--surface); border: 1px solid rgba(0,212,255,0.1); border-radius: var(--radius); padding: 1.75rem; transition: var(--transition); }
.project-card:hover { transform: translateY(-6px); border-color: var(--accent); box-shadow: 0 12px 40px rgba(0,212,255,0.1); }
.project-tags { margin-bottom: 1rem; display: flex; flex-wrap: wrap; gap: 0.4rem; }
.project-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem; }
.project-desc { color: var(--text-muted); font-size: 0.92rem; margin-bottom: 1rem; }
.project-link { color: var(--accent); font-size: 0.9rem; text-decoration: none; font-weight: 600; }

/* Certifications */
.certs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; }
.cert-card { background: var(--surface); border: 1px solid rgba(0,212,255,0.1); border-radius: var(--radius); padding: 1.25rem 1.5rem; position: relative; }
.cert-card.active { border-left: 3px solid var(--accent); }
.cert-card.in-progress { border-left: 3px solid #FFB800; }
.cert-card.planned { border-left: 3px solid #888; opacity: 0.7; }
.cert-status-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); margin-bottom: 0.75rem; }
.cert-card.in-progress .cert-status-dot { background: #FFB800; }
.cert-card.planned .cert-status-dot { background: #888; }
.cert-name { font-weight: 600; font-size: 0.92rem; margin-bottom: 0.25rem; }
.cert-issuer { font-size: 0.8rem; color: var(--text-muted); }
.cert-date { font-size: 0.8rem; color: var(--accent); margin-top: 0.5rem; }

/* Blog */
.blog-list { display: flex; flex-direction: column; gap: 1.5rem; }
.blog-item { display: block; background: var(--surface); border: 1px solid rgba(0,212,255,0.1); border-radius: var(--radius); padding: 1.75rem 2rem; text-decoration: none; transition: var(--transition); }
.blog-item:hover { border-color: var(--accent); transform: translateX(8px); }
.blog-meta { display: flex; gap: 1rem; margin-bottom: 0.5rem; }
.blog-category { color: var(--accent); font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }
.blog-date { color: var(--text-muted); font-size: 0.8rem; }
.blog-title { font-size: 1.1rem; font-weight: 700; color: var(--text); margin-bottom: 0.5rem; }
.blog-excerpt { color: var(--text-muted); font-size: 0.9rem; }

/* Contact */
.contact-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 4rem; align-items: start; }
.contact-links { display: flex; flex-direction: column; gap: 0.75rem; }
.contact-link { color: var(--text-muted); text-decoration: none; font-size: 0.95rem; transition: var(--transition); }
.contact-link:hover { color: var(--accent); }
.contact-form { display: flex; flex-direction: column; gap: 1rem; }
.contact-form input, .contact-form textarea { background: var(--surface); border: 1px solid rgba(0,212,255,0.15); border-radius: 6px; padding: 0.85rem 1rem; color: var(--text); font-family: var(--font); font-size: 0.95rem; outline: none; transition: var(--transition); resize: vertical; }
.contact-form input:focus, .contact-form textarea:focus { border-color: var(--accent); }

/* Footer spacing */
#contact { padding-bottom: 8rem; }
```

- [ ] **Step 6: Verify all sections render without errors, scroll through full page**

- [ ] **Step 7: Commit**

```bash
git add site-professional/src/sections/
git commit -m "feat(site-b): projects, certifications, blog, contact sections"
```

---

## Task 8: Scaffold Site C (Bold)

**Files:**
- Create: `site-bold/package.json`
- Create: `site-bold/vite.config.js`
- Create: `site-bold/index.html`
- Create: `site-bold/src/style.css`
- Create: `site-bold/src/main.js`
- Create: stub `src/sections/*.js` files

**Interfaces:**
- Produces: Vite dev server on `localhost:5174` (or `5173` if run independently), black page with Space Grotesk font

- [ ] **Step 1: Create package.json** (identical to site-professional, name changed)

```json
{
  "name": "site-bold",
  "private": true,
  "version": "1.0.0",
  "scripts": {
    "dev": "vite --port 5174",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "gsap": "^3.12.5",
    "three": "^0.169.0",
    "@emailjs/browser": "^4.4.1"
  },
  "devDependencies": {
    "vite": "^5.4.0"
  }
}
```

- [ ] **Step 2: Create vite.config.js** (same as site-professional)

```javascript
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: { '@shared': resolve(__dirname, '../shared') }
  },
  build: { outDir: 'dist' }
});
```

- [ ] **Step 3: Create index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ADITYA VIGNESH RAM — IT/OT CYBERSECURITY</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/src/style.css" />
</head>
<body>
  <nav id="nav">
    <span class="nav-logo">[AVR]</span>
    <ul class="nav-links">
      <li><a href="#about">ABOUT</a></li>
      <li><a href="#skills">SKILLS</a></li>
      <li><a href="#experience">EXP</a></li>
      <li><a href="#projects">PROJECTS</a></li>
      <li><a href="#certifications">CERTS</a></li>
      <li><a href="#blog">INTEL</a></li>
      <li><a href="#contact" class="nav-cta">CONTACT</a></li>
    </ul>
  </nav>

  <section id="hero">
    <canvas id="hero-canvas"></canvas>
    <div class="hero-content">
      <p class="hero-eyebrow">&gt; SENIOR IT/OT SECURITY MANAGER_</p>
      <h1 class="hero-name"></h1>
      <p class="hero-subtitle"></p>
      <a href="#about" class="btn-enter">ENTER ▶</a>
    </div>
  </section>

  <section id="about"><div class="container"></div></section>
  <section id="skills"><div class="container"></div></section>
  <section id="experience"><div class="container"></div></section>
  <section id="projects"><div class="container"></div></section>
  <section id="certifications"><div class="container"></div></section>
  <section id="blog"><div class="container"></div></section>
  <section id="contact"><div class="container"></div></section>

  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

- [ ] **Step 4: Create src/style.css**

```css
:root {
  --bg: #000000;
  --surface: #0A0A0A;
  --surface2: #111111;
  --green: #00FF41;
  --green-dim: rgba(0, 255, 65, 0.1);
  --red: #FF003C;
  --text: #FFFFFF;
  --text-muted: #666666;
  --mono: 'JetBrains Mono', monospace;
  --sans: 'Space Grotesk', sans-serif;
  --transition: 0.2s ease;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--sans);
  font-size: 16px;
  line-height: 1.6;
  overflow-x: hidden;
}

.container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
section { padding: 6rem 0; }

#hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

#hero-canvas { position: absolute; inset: 0; z-index: 0; }

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0 2rem;
}

.hero-eyebrow {
  font-family: var(--mono);
  font-size: 0.85rem;
  color: var(--green);
  margin-bottom: 1.5rem;
  opacity: 0;
}

.hero-name {
  font-size: clamp(2.5rem, 7vw, 6rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  line-height: 1;
  margin-bottom: 1rem;
  opacity: 0;
}

.hero-subtitle {
  font-family: var(--mono);
  font-size: 1rem;
  color: var(--text-muted);
  margin-bottom: 3rem;
  opacity: 0;
}

.btn-enter {
  display: inline-block;
  font-family: var(--mono);
  font-size: 0.9rem;
  color: var(--bg);
  background: var(--green);
  padding: 0.9rem 2.5rem;
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 0.1em;
  clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
  opacity: 0;
  transition: var(--transition);
}

.btn-enter:hover { background: #33FF66; }

#nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  background: rgba(0,0,0,0.9);
  border-bottom: 1px solid rgba(0,255,65,0.15);
}

.nav-logo { font-family: var(--mono); font-weight: 700; font-size: 1.1rem; color: var(--green); }
.nav-links { display: flex; gap: 2rem; list-style: none; }
.nav-links a { font-family: var(--mono); font-size: 0.75rem; color: var(--text-muted); text-decoration: none; letter-spacing: 0.1em; transition: var(--transition); }
.nav-links a:hover { color: var(--green); }
.nav-cta { color: var(--green) !important; border: 1px solid var(--green) !important; padding: 0.4rem 1rem; }

h2.section-title {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

h2.section-title span { color: var(--green); }

.section-divider { width: 48px; height: 2px; background: var(--green); margin-bottom: 3rem; }

.reveal { opacity: 0; transform: translateY(32px); }

/* Glitch keyframe (used in hero) */
@keyframes glitch {
  0%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
  10% { clip-path: inset(20% 0 60% 0); transform: translate(-4px, 2px); }
  20% { clip-path: inset(60% 0 20% 0); transform: translate(4px, -2px); }
  30% { clip-path: inset(0 0 100% 0); transform: translate(0); }
}
```

- [ ] **Step 5: Create src/main.js**

```javascript
import { cv } from '@shared/cv-data.js';
import { initHero } from './sections/hero.js';
import { initAbout } from './sections/about.js';
import { initSkills } from './sections/skills.js';
import { initExperience } from './sections/experience.js';
import { initProjects } from './sections/projects.js';
import { initCertifications } from './sections/certifications.js';
import { initBlog } from './sections/blog.js';
import { initContact } from './sections/contact.js';

document.addEventListener('DOMContentLoaded', () => {
  initHero(cv);
  initAbout(cv);
  initSkills(cv);
  initExperience(cv);
  initProjects(cv);
  initCertifications(cv);
  initBlog(cv);
  initContact(cv);
});
```

- [ ] **Step 6: Create stub section files** (same pattern as site-professional, one stub per file)

- [ ] **Step 7: Install and verify**

```bash
cd site-bold
npm install
npm run dev
```

Expected: `http://localhost:5174` — pure black page, green nav, Space Grotesk font loaded, no errors.

- [ ] **Step 8: Commit**

```bash
cd ..
git add site-bold/
git commit -m "feat: scaffold site-bold with black/green design tokens"
```

---

## Task 9: Site C — Three.js Threat Globe + Letter Scramble Hero

**Files:**
- Modify: `site-bold/src/sections/hero.js`

**Interfaces:**
- Consumes: `cv.name`, `cv.subtitle`
- Produces: Rotating globe with arc lines in `#hero-canvas`; letter scramble resolves `cv.name`; `.hero-eyebrow`, `.hero-subtitle`, `.btn-enter` animate in

- [ ] **Step 1: Implement hero.js**

```javascript
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
  const tl = gsap.timeline({ delay: 0.5 });
  tl.to('.hero-eyebrow', { opacity: 1, duration: 0.4 })
    .add(() => scrambleTo(nameEl, cv.name.toUpperCase(), 1600))
    .to('.hero-subtitle', { opacity: 1, duration: 0.5, delay: 0.8 }, '-=0.5')
    .to('.btn-enter', { opacity: 1, duration: 0.4 }, '+=0.2');
}
```

- [ ] **Step 2: Verify**

Expected: Green wireframe globe rotates slowly, arc lines glow between cities, name scrambles and resolves, eyebrow + subtitle + button fade in. No console errors.

- [ ] **Step 3: Commit**

```bash
git add site-bold/src/sections/hero.js
git commit -m "feat(site-c): Three.js threat globe + letter scramble hero"
```

---

## Task 10: Site C — About, Skills, Experience Sections

**Files:**
- Modify: `site-bold/src/sections/about.js`
- Modify: `site-bold/src/sections/skills.js`
- Modify: `site-bold/src/sections/experience.js`
- Modify: `site-bold/src/style.css` (append)

- [ ] **Step 1: Implement about.js (terminal window)**

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

function typeInto(el, text, speed = 28) {
  return new Promise(resolve => {
    let i = 0;
    const interval = setInterval(() => {
      el.textContent += text[i++];
      if (i >= text.length) { clearInterval(interval); resolve(); }
    }, speed);
  });
}

export function initAbout(cv) {
  const section = document.querySelector('#about .container');
  section.innerHTML = `
    <h2 class="section-title reveal">ABOUT <span>ME</span></h2>
    <div class="section-divider reveal"></div>
    <div class="terminal-window reveal">
      <div class="terminal-bar"><span class="t-dot red"></span><span class="t-dot yellow"></span><span class="t-dot green"></span><span class="t-title">avr@secure:~</span></div>
      <div class="terminal-body">
        <p class="t-line"><span class="t-prompt">&gt; </span><span class="t-cmd">whoami</span></p>
        <p class="t-line t-output" id="t-summary"></p>
        <p class="t-line" style="margin-top:1.5rem"><span class="t-prompt">&gt; </span><span class="t-cmd">stats --verified</span></p>
        <div id="t-stats"></div>
        <p class="t-line t-cursor">▋</p>
      </div>
    </div>
  `;

  gsap.utils.toArray('#about .reveal').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 32 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  ScrollTrigger.create({
    trigger: '.terminal-window',
    start: 'top 75%',
    once: true,
    onEnter: async () => {
      const summaryEl = document.getElementById('t-summary');
      await typeInto(summaryEl, cv.summary, 12);

      const statsEl = document.getElementById('t-stats');
      for (const s of cv.stats) {
        const line = document.createElement('p');
        line.className = 't-line t-output';
        line.innerHTML = `<span class="t-confirmed">[CONFIRMED]</span> ${s.label}: <strong>${s.value}${s.suffix}</strong>`;
        statsEl.appendChild(line);
        await new Promise(r => setTimeout(r, 300));
      }
    }
  });
}
```

- [ ] **Step 2: Implement skills.js (radar + cascade)**

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initSkills(cv) {
  const section = document.querySelector('#skills .container');
  const domains = [
    { label: 'OT/ICS Security', value: 95 },
    { label: 'GRC & Compliance', value: 90 },
    { label: 'Risk Management', value: 88 },
    { label: 'Program Management', value: 85 },
    { label: 'AI Integration', value: 60 },
    { label: 'Penetration Testing', value: 70 }
  ];

  section.innerHTML = `
    <h2 class="section-title reveal">SKILLS & <span>EXPERTISE</span></h2>
    <div class="section-divider reveal"></div>
    <div class="skills-bold-grid">
      <div class="skill-bars reveal">
        ${domains.map(d => `
          <div class="skill-bar-item">
            <div class="skill-bar-label"><span>${d.label}</span><span class="skill-bar-pct">${d.value}%</span></div>
            <div class="skill-bar-track"><div class="skill-bar-fill" data-width="${d.value}"></div></div>
          </div>
        `).join('')}
      </div>
      <div class="skill-tools reveal">
        <h3 class="tools-label">&gt; tools --list</h3>
        <div id="tools-cascade"></div>
        <h3 class="tools-label" style="margin-top:2rem">&gt; standards --active</h3>
        <div class="standards-pills">${cv.skills.standards.map(s => `<span class="bold-pill">${s}</span>`).join('')}</div>
      </div>
    </div>
  `;

  // Animate bars on scroll
  ScrollTrigger.create({
    trigger: '.skill-bars',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      document.querySelectorAll('.skill-bar-fill').forEach(el => {
        gsap.fromTo(el, { width: '0%' }, { width: el.dataset.width + '%', duration: 1.2, ease: 'power2.out', delay: 0.1 });
      });
    }
  });

  // Cascade tools
  ScrollTrigger.create({
    trigger: '.skill-tools',
    start: 'top 80%',
    once: true,
    onEnter: async () => {
      const container = document.getElementById('tools-cascade');
      for (const tool of cv.skills.tools) {
        const line = document.createElement('p');
        line.className = 't-line t-output';
        line.innerHTML = `<span class="t-prompt">  </span>${tool}`;
        container.appendChild(line);
        gsap.from(line, { opacity: 0, x: -20, duration: 0.3 });
        await new Promise(r => setTimeout(r, 100));
      }
    }
  });

  gsap.utils.toArray('#skills .reveal').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 32 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });
}
```

- [ ] **Step 3: Implement experience.js (horizontal flip cards)**

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initExperience(cv) {
  const section = document.querySelector('#experience .container');
  section.innerHTML = `
    <h2 class="section-title reveal">WORK <span>EXPERIENCE</span></h2>
    <div class="section-divider reveal"></div>
    <div class="exp-track">
      ${cv.experience.map((job, i) => `
        <div class="exp-card reveal" data-index="${i}">
          <div class="exp-card-header">
            <span class="exp-tag">[CASE FILE ${String(i+1).padStart(2,'0')}]</span>
            <span class="exp-period">${job.period}</span>
          </div>
          <h3 class="exp-title">${job.title}</h3>
          <p class="exp-company">${job.company} · ${job.location}</p>
          <ul class="exp-highlights">
            ${job.highlights.map(h => `<li><span class="t-prompt">▸ </span>${h}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>
  `;

  gsap.utils.toArray('.exp-card').forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 48, rotateX: -15 }, {
      opacity: 1, y: 0, rotateX: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  gsap.utils.toArray('#experience .reveal').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 32 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });
}
```

- [ ] **Step 4: Append to site-bold/src/style.css**

```css
/* Terminal */
.terminal-window { background: #0A0A0A; border: 1px solid rgba(0,255,65,0.3); border-radius: 6px; overflow: hidden; max-width: 800px; }
.terminal-bar { background: #1A1A1A; padding: 0.75rem 1rem; display: flex; align-items: center; gap: 0.5rem; }
.t-dot { width: 12px; height: 12px; border-radius: 50%; }
.t-dot.red { background: #FF5F57; }
.t-dot.yellow { background: #FEBC2E; }
.t-dot.green { background: #28C840; }
.t-title { font-family: var(--mono); font-size: 0.8rem; color: var(--text-muted); margin-left: 0.5rem; }
.terminal-body { padding: 1.5rem; font-family: var(--mono); font-size: 0.88rem; line-height: 1.8; }
.t-line { margin-bottom: 0.25rem; }
.t-prompt { color: var(--green); }
.t-cmd { color: var(--text); }
.t-output { color: #AAAAAA; padding-left: 1rem; }
.t-confirmed { color: var(--green); font-weight: 700; }
.t-cursor { color: var(--green); animation: blink 1s step-end infinite; }
@keyframes blink { 50% { opacity: 0; } }

/* Skills Bold */
.skills-bold-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
.skill-bar-item { margin-bottom: 1.25rem; }
.skill-bar-label { display: flex; justify-content: space-between; font-family: var(--mono); font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--text-muted); }
.skill-bar-pct { color: var(--green); }
.skill-bar-track { height: 3px; background: #1A1A1A; border-radius: 2px; overflow: hidden; }
.skill-bar-fill { height: 100%; background: var(--green); width: 0%; box-shadow: 0 0 8px var(--green); }
.tools-label { font-family: var(--mono); font-size: 0.85rem; color: var(--green); margin-bottom: 0.75rem; }
.standards-pills { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.bold-pill { font-family: var(--mono); font-size: 0.75rem; border: 1px solid rgba(0,255,65,0.4); color: var(--green); padding: 0.25rem 0.6rem; background: var(--green-dim); }

/* Experience */
.exp-track { display: flex; flex-direction: column; gap: 2rem; }
.exp-card { background: var(--surface); border: 1px solid rgba(0,255,65,0.15); padding: 2rem; position: relative; }
.exp-card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--green); }
.exp-card-header { display: flex; justify-content: space-between; margin-bottom: 0.75rem; }
.exp-tag { font-family: var(--mono); font-size: 0.75rem; color: var(--green); letter-spacing: 0.1em; }
.exp-period { font-family: var(--mono); font-size: 0.75rem; color: var(--text-muted); }
.exp-title { font-size: 1.2rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 0.25rem; }
.exp-company { font-family: var(--mono); font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.25rem; }
.exp-highlights { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
.exp-highlights li { font-size: 0.88rem; color: #AAAAAA; padding-left: 1.5rem; position: relative; }
```

- [ ] **Step 5: Verify — terminal types bio, skill bars animate, experience cards reveal**

- [ ] **Step 6: Commit**

```bash
git add site-bold/src/sections/about.js site-bold/src/sections/skills.js site-bold/src/sections/experience.js site-bold/src/style.css
git commit -m "feat(site-c): about terminal, skill bars, experience case files"
```

---

## Task 11: Site C — Projects, Certifications, Blog, Contact

**Files:**
- Modify: `site-bold/src/sections/projects.js`
- Modify: `site-bold/src/sections/certifications.js`
- Modify: `site-bold/src/sections/blog.js`
- Modify: `site-bold/src/sections/contact.js`
- Modify: `site-bold/src/style.css` (append)

- [ ] **Step 1: Implement projects.js (threat-level cards)**

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const IMPACT_COLOR = { LOW: '#00FF41', MEDIUM: '#FFB800', HIGH: '#FF003C' };

export function initProjects(cv) {
  const section = document.querySelector('#projects .container');
  const isEmpty = !cv.projects || cv.projects.length === 0;
  section.innerHTML = `
    <h2 class="section-title reveal">AI & SECURITY <span>PROJECTS</span></h2>
    <div class="section-divider reveal"></div>
    ${isEmpty
      ? `<p class="reveal t-output" style="font-family:var(--mono)">[PROJECTS LOADING — CHECK BACK SOON]</p>`
      : `<div class="projects-bold-grid">
          ${cv.projects.map(p => `
            <div class="project-bold-card reveal">
              <div class="project-bold-header">
                <span class="project-bold-tags">${p.tags.map(t => `<span class="bold-pill">${t}</span>`).join('')}</span>
                <span class="threat-badge" style="color:${IMPACT_COLOR[p.impact]||'#00FF41'}">[${p.impact||'LOW'} IMPACT]</span>
              </div>
              <h3 class="project-bold-title">${p.title}</h3>
              <p class="project-bold-desc">${p.description}</p>
              ${p.link ? `<a href="${p.link}" class="project-bold-link" target="_blank" rel="noopener">&gt; OPEN PROJECT_</a>` : ''}
            </div>
          `).join('')}
        </div>`
    }
  `;

  gsap.utils.toArray('#projects .reveal').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 32 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });
}
```

- [ ] **Step 2: Implement certifications.js (clearance badges)**

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const STATUS_LABEL = { active: 'CLEARED', 'in-progress': 'PENDING CLEARANCE', planned: `SCHEDULED` };
const STATUS_COLOR = { active: '#00FF41', 'in-progress': '#FFB800', planned: '#666666' };

export function initCertifications(cv) {
  const section = document.querySelector('#certifications .container');
  section.innerHTML = `
    <h2 class="section-title reveal">CERTIFICATIONS & <span>CLEARANCES</span></h2>
    <div class="section-divider reveal"></div>
    <div class="certs-bold-grid">
      ${cv.certifications.map(c => `
        <div class="cert-bold-card reveal">
          <div class="cert-bold-status" style="color:${STATUS_COLOR[c.status]}">[${STATUS_LABEL[c.status]}]</div>
          <div class="cert-bold-name">${c.name}</div>
          ${c.issuer ? `<div class="cert-bold-issuer">${c.issuer}</div>` : ''}
          <div class="cert-bold-date" style="color:${STATUS_COLOR[c.status]}">${c.date || ''}</div>
        </div>
      `).join('')}
    </div>
  `;

  gsap.utils.toArray('#certifications .reveal').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });
}
```

- [ ] **Step 3: Implement blog.js (intel reports)**

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initBlog(cv) {
  const section = document.querySelector('#blog .container');
  const isEmpty = !cv.blog || cv.blog.length === 0;
  section.innerHTML = `
    <h2 class="section-title reveal">INTEL <span>REPORTS</span></h2>
    <div class="section-divider reveal"></div>
    ${isEmpty
      ? `<p class="reveal t-output" style="font-family:var(--mono)">[REPORTS PENDING DECLASSIFICATION]</p>`
      : `<div class="blog-bold-list">
          ${cv.blog.map(b => `
            <a href="${b.link}" class="blog-bold-item reveal" target="_blank" rel="noopener">
              <div class="blog-bold-header">
                <span class="blog-bold-class">[UNCLASSIFIED]</span>
                <span class="t-output" style="font-family:var(--mono);font-size:0.78rem">${b.date} · ${b.readTime}</span>
              </div>
              <div class="blog-bold-category">${b.category}</div>
              <h3 class="blog-bold-title">${b.title}</h3>
              <p class="blog-bold-excerpt">${b.excerpt}</p>
            </a>
          `).join('')}
        </div>`
    }
  `;

  gsap.utils.toArray('#blog .reveal').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });
}
```

- [ ] **Step 4: Implement contact.js (terminal form)**

```javascript
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initContact(cv) {
  const section = document.querySelector('#contact .container');
  section.innerHTML = `
    <h2 class="section-title reveal">INITIATE <span>CONTACT</span></h2>
    <div class="section-divider reveal"></div>
    <div class="contact-bold-grid">
      <div class="contact-bold-info reveal">
        <div class="terminal-window">
          <div class="terminal-bar"><span class="t-dot red"></span><span class="t-dot yellow"></span><span class="t-dot green"></span></div>
          <div class="terminal-body">
            <p class="t-line"><span class="t-prompt">&gt; </span>contact --info</p>
            <p class="t-line t-output">EMAIL: <a href="mailto:${cv.contact.email}" style="color:var(--green)">${cv.contact.email}</a></p>
            <p class="t-line t-output">PHONE: ${cv.contact.phone}</p>
            <p class="t-line t-output">LOC: ${cv.contact.location}</p>
            ${cv.contact.linkedin ? `<p class="t-line t-output">LINKEDIN: <a href="${cv.contact.linkedin}" style="color:var(--green)" target="_blank">profile</a></p>` : ''}
            <p class="t-line t-output" style="margin-top:1rem;color:#888">Available for senior IT/OT security consulting,<br>advisory roles, and speaking engagements.</p>
          </div>
        </div>
      </div>
      <form id="contact-form" class="contact-bold-form reveal">
        <div class="term-field"><span class="t-prompt">&gt; name: </span><input type="text" name="from_name" required /></div>
        <div class="term-field"><span class="t-prompt">&gt; email: </span><input type="email" name="reply_to" required /></div>
        <div class="term-field term-field--area"><span class="t-prompt">&gt; msg: </span><textarea name="message" rows="5" required></textarea></div>
        <button type="submit" class="btn-enter" id="submit-btn">SEND TRANSMISSION ▶</button>
        <p id="form-status" style="font-family:var(--mono);font-size:0.85rem;margin-top:1rem;display:none"></p>
      </form>
    </div>
  `;

  emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');
  document.getElementById('contact-form').addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const status = document.getElementById('form-status');
    btn.textContent = 'TRANSMITTING...';
    btn.disabled = true;
    try {
      await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target);
      status.textContent = '[SUCCESS] TRANSMISSION RECEIVED';
      status.style.color = 'var(--green)';
      status.style.display = 'block';
      e.target.reset();
    } catch {
      status.textContent = '[ERROR] TRANSMISSION FAILED — EMAIL DIRECTLY';
      status.style.color = 'var(--red)';
      status.style.display = 'block';
    }
    btn.textContent = 'SEND TRANSMISSION ▶';
    btn.disabled = false;
  });

  gsap.utils.toArray('#contact .reveal').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 32 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });
}
```

- [ ] **Step 5: Append to style.css**

```css
/* Projects Bold */
.projects-bold-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
.project-bold-card { background: var(--surface); border: 1px solid rgba(0,255,65,0.1); padding: 1.75rem; transition: var(--transition); position: relative; }
.project-bold-card:hover { border-color: var(--green); box-shadow: 0 0 20px rgba(0,255,65,0.08); }
.project-bold-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
.threat-badge { font-family: var(--mono); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; white-space: nowrap; }
.project-bold-title { font-size: 1.05rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 0.75rem; }
.project-bold-desc { color: #AAAAAA; font-size: 0.88rem; margin-bottom: 1rem; }
.project-bold-link { font-family: var(--mono); font-size: 0.8rem; color: var(--green); text-decoration: none; }

/* Certifications Bold */
.certs-bold-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; }
.cert-bold-card { background: var(--surface); border: 1px solid rgba(0,255,65,0.1); padding: 1.25rem 1.5rem; }
.cert-bold-status { font-family: var(--mono); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; margin-bottom: 0.5rem; }
.cert-bold-name { font-size: 0.9rem; font-weight: 600; margin-bottom: 0.25rem; }
.cert-bold-issuer { font-family: var(--mono); font-size: 0.78rem; color: var(--text-muted); }
.cert-bold-date { font-family: var(--mono); font-size: 0.78rem; margin-top: 0.5rem; }

/* Blog Bold */
.blog-bold-list { display: flex; flex-direction: column; gap: 1.25rem; }
.blog-bold-item { display: block; background: var(--surface); border: 1px solid rgba(0,255,65,0.1); padding: 1.5rem 2rem; text-decoration: none; transition: var(--transition); }
.blog-bold-item:hover { border-color: var(--green); background: var(--surface2); }
.blog-bold-header { display: flex; justify-content: space-between; margin-bottom: 0.25rem; }
.blog-bold-class { font-family: var(--mono); font-size: 0.72rem; color: var(--green); letter-spacing: 0.1em; }
.blog-bold-category { font-family: var(--mono); font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.4rem; }
.blog-bold-title { font-size: 1rem; font-weight: 700; text-transform: uppercase; color: var(--text); margin-bottom: 0.5rem; }
.blog-bold-excerpt { font-size: 0.88rem; color: #AAAAAA; }

/* Contact Bold */
.contact-bold-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 3rem; align-items: start; }
.contact-bold-form { display: flex; flex-direction: column; gap: 1rem; }
.term-field { display: flex; align-items: flex-start; gap: 0.5rem; font-family: var(--mono); font-size: 0.88rem; border-bottom: 1px solid rgba(0,255,65,0.2); padding-bottom: 0.5rem; }
.term-field .t-prompt { color: var(--green); white-space: nowrap; padding-top: 0.1rem; }
.term-field input, .term-field textarea { background: transparent; border: none; color: var(--text); font-family: var(--mono); font-size: 0.88rem; outline: none; width: 100%; resize: none; line-height: 1.6; }
.term-field--area { align-items: flex-start; }

#contact { padding-bottom: 8rem; }
```

- [ ] **Step 6: Verify full scroll through site-bold — all sections render, forms work, no console errors**

- [ ] **Step 7: Commit**

```bash
git add site-bold/src/sections/
git commit -m "feat(site-c): projects, certifications, intel reports, terminal contact"
```

---

## Task 12: Performance Pass + Build Verification

**Files:**
- Verify: both `site-professional/` and `site-bold/` build without errors

- [ ] **Step 1: Add CV PDF to both public folders**

Copy `Aditya_Vignesh Ram_CV.pdf` to:
- `site-professional/public/Aditya_Vignesh_Ram_CV.pdf`
- `site-bold/public/Aditya_Vignesh_Ram_CV.pdf`

- [ ] **Step 2: Build site-professional**

```bash
cd site-professional
npm run build
```

Expected: `dist/` folder created, no build errors. Check `dist/index.html` exists.

- [ ] **Step 3: Build site-bold**

```bash
cd ../site-bold
npm run build
```

Expected: `dist/` folder created, no build errors.

- [ ] **Step 4: Preview both built sites**

```bash
# Terminal 1
cd site-professional && npm run preview

# Terminal 2
cd site-bold && npm run preview
```

Open `http://localhost:4173` (professional) and `http://localhost:4174` (bold). Scroll through each fully built site. Verify:
- Three.js hero canvas runs in both
- All sections render with CV data from shared module
- No broken references or missing assets

- [ ] **Step 5: Configure EmailJS (before going live)**

In both `contact.js` files, replace:
- `'YOUR_EMAILJS_PUBLIC_KEY'` → your EmailJS public key from emailjs.com dashboard
- `'YOUR_SERVICE_ID'` → your EmailJS service ID
- `'YOUR_TEMPLATE_ID'` → your EmailJS template ID

- [ ] **Step 6: Final commit**

```bash
cd ..
git add .
git commit -m "chore: build verification pass, PDF assets added"
```

---

## Open Items (Before Launch)

| Item | Where to update |
|------|----------------|
| Project details (titles, descriptions, tags, links) | `shared/cv-data.js` → `projects` array |
| Blog/writeup content | `shared/cv-data.js` → `blog` array |
| Profile photo | Add to `site-professional/public/` + `site-bold/public/`, update `.avatar-placeholder` in about.js |
| LinkedIn URL | `shared/cv-data.js` → `cv.contact.linkedin` |
| EmailJS keys | Both `contact.js` files |
| Custom domain | Set in Netlify/Vercel dashboard after deploy |
