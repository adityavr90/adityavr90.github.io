# CV Website Design Spec
**Date:** 2026-06-18
**Subject:** Aditya Vignesh Ram G K — Personal CV Website (Two Deployments)
**Stack:** Vanilla JS + Vite, GSAP, Three.js

---

## Overview

Two separate static websites built from a single shared CV data source. Both sites cover the same content sections but differ entirely in visual tone, animation style, and target audience impression.

- **Site B (`site-professional/`)** — Technical & Approachable: targets recruiters and hiring managers at a glance, warm expert tone
- **Site C (`site-bold/`)** — Bold & Modern: targets peers, clients, and technical audiences, aggressive cinematic energy

---

## Project Structure

```
E:/AI/CV/
├── site-professional/
│   ├── index.html
│   ├── src/
│   │   ├── main.js            ← GSAP + Three.js entry point
│   │   ├── sections/          ← hero.js, about.js, skills.js, experience.js,
│   │   │                         projects.js, certifications.js, blog.js, contact.js
│   │   └── style.css
│   ├── public/
│   └── vite.config.js
│
├── site-bold/
│   ├── index.html
│   ├── src/
│   │   ├── main.js
│   │   ├── sections/
│   │   └── style.css
│   ├── public/
│   └── vite.config.js
│
└── shared/
    └── cv-data.js             ← Single source of truth for all CV content
```

`shared/cv-data.js` is imported by both sites. All CV content (name, experience, skills, certifications, projects) lives here — update once, both sites reflect it.

---

## CV Content (Source of Truth)

Parsed from `Aditya Vignesh Ram_CV.pdf`:

**Name:** Aditya Vignesh Ram G K
**Title:** Senior IT/OT Security Manager | IEC 62443 & NIST 800-82 Specialist
**Location:** Dubai, United Arab Emirates
**Contact:** +971568804898 | adityavr90@gmail.com

**Experience:**
- IT/OT Cyber Security Manager — KPMG Lower Gulf, Dubai (Sep 2022 – Present)
- Cyber Security Manager — PwC Middle East, Dubai (Sep 2015 – Sep 2022)

**Education:**
- MSc Information Security — Royal Holloway, University of London (2013–2014), Distinction & First-Class Honours
- B.E. Electronics & Communication Engineering — Syed Ammal Engineering College, Anna University (2007–2011)

**Certifications:**
- CISM (Jun 2025)
- ISO 27001 Lead Implementer, BSI (Dec 2016)
- Certificate of Cloud Security Knowledge v4, Cloud Security Alliance (May 2022)
- CEH v7, EC-Council (Sep 2011)
- G42 Cloud Certified Associate (May 2021)
- Maritime Cybersecurity Essentials (Aug 2023)
- Diploma in Cyber Law (Jul 2012)
- Getting Started in OT/ICS Penetration Testing (Aug 2025)
- Nuclear Security Threats and Risks: Cyber Threats, IAEA (Sep 2025)
- AI Security Governance, Securiti (Aug 2025)
- ISA 62443 (In Progress)
- PMP (Planned Q1 2026)

**Core Skills:**
- IT/OT Security Program Management
- Project Lifecycle Management (Budgeting, Resourcing, Delivery)
- GRC Strategy & Regulatory Compliance (UAE IA, IEC 62443, NIST)
- OT & ICS Security Assessment and Governance
- Cyber Program Design & Board Reporting
- Security Architecture Oversight & Digital Transformation
- Cross-Functional Stakeholder Engagement
- Team Leadership & Mentorship

**International Standards:** ISA/IEC 62443, ISO 27001, NIST 800-82, NIST CSF, NIST 800-53, ISO 27002, NCA ECC, NCA OTCC, UAE IA, CAF

**Technical Tools:** Nessus, Nozomi, Claroty, Kali Linux, Wireshark, VirtualBox, BloodHound, BurpSuite, nmap

**Projects:** Mix of AI security experiments and small deployed tools integrating AI into OT/IT cybersecurity workflows (details to be filled in by Aditya before launch).

---

## Sections (Both Sites)

Both sites include all eight sections in this order: Hero → About → Skills → Experience → Projects → Certifications → Blog/Writeups → Contact.

---

## Site B — Professional & Approachable

### Visual Identity
- **Palette:** Deep navy `#0A0E1A` base, white text, electric teal `#00D4FF` accent
- **Typography:** Inter or Plus Jakarta Sans — clean, modern, legible. Body at 18px, headers bold
- **Overall feel:** High-end consulting polish, personal and human

### Three.js — Hero (Particle Network)
- `BufferGeometry` with randomized points representing IT/OT nodes
- `LineSegments` connecting nearby nodes, connections form and dissolve slowly
- Positions animated with slow `sin()` wave each frame
- Resembles a live network topology map — calm and intelligent

### GSAP Usage
- **ScrollTrigger** on all sections — elements fade in with slight upward drift on viewport entry
- **TextPlugin** — hero title types out character by character on load
- **DrawSVG** — experience timeline line draws as user scrolls through
- `gsap.timeline()` for sequenced hero entrance (canvas → name → title → CTA)

### Section Details

**Hero:** Name fades in, title types out, particle network plays behind. Two CTAs: "View My Work" + "Download CV"

**About:** Split layout — left: avatar with teal border glow, right: 3-sentence bio + animated stat counters (10+ years / 60+ sites / Big 4) that count up on scroll entry

**Skills:** Three grouped card clusters — Core Expertise / International Standards / Technical Tools. Standards shown as pill badges. Hover reveals tooltip context

**Experience:** Vertical scroll-scrubbed timeline. GSAP ScrollTrigger draws a connecting line as user scrolls. Each role card pins and reveals with KPMG and PwC branding

**Projects:** Card grid with tags (AI, OT, Python, etc.). Brief description, links. Hover lifts card with soft shadow

**Certifications:** Badge grid. CISM featured prominently. In-progress certs (ISA 62443, PMP) shown with animated progress ring

**Blog/Writeups:** Clean article list. Category tags (OT Security, AI, GRC). Date and estimated read time shown

**Contact:** Simple form + LinkedIn / email / phone. Teal CTA button. Form handled via Formspree or EmailJS (no backend)

---

## Site C — Bold & Modern

### Visual Identity
- **Palette:** Pure black `#000000` base, white text, toxic green `#00FF41` accent, red `#FF003C` for danger/threat emphasis
- **Typography:** Space Grotesk (headers, uppercase), JetBrains Mono (stats, code callouts)
- **Overall feel:** Cinematic hacker terminal — aggressive, visceral, global-scale authority

### Three.js — Hero (Threat Globe)
- `SphereGeometry` with dark earth texture
- Arc lines drawn with `TubeGeometry` along `QuadraticBezierCurve3` paths between lat/long city coordinates
- Lines glow with `AdditiveBlending`, animated opacity pulse
- Communicates global-scale threat intelligence operations

### GSAP Usage
- Hero entrance: name slams in letter-by-letter, title glitches with scanline distortion
- Letter scramble: custom GSAP ticker loop cycles random characters before each letter settles
- Section transitions: hard cuts with brief screen flicker effect
- ScrollTrigger used for all section entrances — faster, more aggressive easing than Site B

### Section Details

**Hero:** Name scramble resolves to "ADITYA VIGNESH RAM G K", globe rotates behind. Single brutal CTA: "ENTER"

**About:** Full-width terminal window — bio renders as if typed into CLI. Stats displayed as `[CONFIRMED]` status lines. Green cursor blinks

**Skills:** Animated radar/hexagon chart (Three.js or SVG) for skill domains. Tools list cascades in as terminal output lines

**Experience:** Horizontal scroll panel. Each role is a "classified file" card that flips open on enter. Timeline feels like unlocking mission case files

**Projects:** Dark cards with toxic green glowing border on hover. Project impact shown as threat-level badge: `LOW` / `MEDIUM` / `HIGH`

**Certifications:** Rendered as security clearance badges with issue dates. ISA 62443 shown as `[PENDING CLEARANCE]`. PMP shown as `[SCHEDULED Q1 2026]`

**Blog/Writeups:** Articles listed as "INTEL REPORTS" with classification stamps (UNCLASSIFIED / RESTRICTED). Grain texture overlay on cards

**Contact:** Terminal-style form — input fields styled as command prompts with `>` prefix. Submit button labeled `SEND TRANSMISSION`

---

## Shared Technical Architecture

### Performance
- Three.js canvas active only in hero viewport — destroyed via IntersectionObserver when scrolled past 100vh
- `will-change: transform` applied only during active animation, removed after completion
- Images lazy-loaded with native `loading="lazy"`
- Vite handles bundling, tree-shaking, chunk splitting, and cache-busting

### Deployment
- Both sites build to static `dist/` folders
- Deploy independently to Netlify, Vercel, or GitHub Pages (free tier)
- Contact form via Formspree or EmailJS — no backend required

### Dependencies
```json
{
  "gsap": "^3.x",
  "three": "^0.x",
  "vite": "^5.x"
}
```
GSAP ScrollTrigger, TextPlugin, DrawSVG registered as GSAP plugins. No other runtime dependencies.

---

## Open Items (To Fill Before Launch)
- [ ] Project details: names, descriptions, links, tags for each AI/security project
- [ ] Blog/writeup content: titles, dates, categories for initial articles
- [ ] Profile photo or avatar asset
- [ ] LinkedIn URL
- [ ] Preferred deployment platform (Netlify / Vercel / GitHub Pages)
- [ ] Custom domain (if any)
