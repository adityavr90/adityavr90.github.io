import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initProjects(cv) {
  const section = document.querySelector('#projects .container');

  // An empty section reading "coming soon" makes a live site look unfinished.
  // Hide the section and its nav link instead; both return automatically
  // as soon as cv.projects has entries.
  if (!cv.projects || cv.projects.length === 0) {
    document.getElementById('projects')?.remove();
    document.querySelector('.nav-links a[href="#projects"]')?.closest('li')?.remove();
    return;
  }

  section.innerHTML = `
    <h2 class="section-title reveal">AI & Security <span>Projects</span></h2>
    <div class="section-divider reveal"></div>
    <div class="projects-grid">
      ${cv.projects.map(p => `
        <div class="project-card reveal">
          <div class="project-tags">${(p.tags || []).map(t => `<span class="pill">${t}</span>`).join('')}</div>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>
          ${p.link ? `<a href="${p.link}" class="project-link" target="_blank" rel="noopener">View Project →</a>` : ''}
        </div>
      `).join('')}
    </div>
  `;

  gsap.utils.toArray('#projects .reveal').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 32 }, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onStart: () => gsap.set(el, { willChange: 'transform, opacity' }),
      onComplete: () => gsap.set(el, { willChange: 'auto' })
    });
  });
}
