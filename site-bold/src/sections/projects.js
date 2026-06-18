import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IMPACT_COLOR = { LOW: '#00FF41', MEDIUM: '#FFB800', HIGH: '#FF003C' };

export function initProjects(cv) {
  const section = document.querySelector('#projects .container');
  const isEmpty = !cv.projects || cv.projects.length === 0;
  section.innerHTML = `
    <h2 class="section-title reveal">AI & SECURITY <span>PROJECTS</span></h2>
    <div class="section-divider reveal"></div>
    ${isEmpty
      ? `<p class="reveal t-output" style="font-family:var(--mono)">// PROJECTS LOADING — CHECK BACK SOON</p>`
      : `<div class="projects-bold-grid">
          ${cv.projects.map(p => `
            <div class="project-bold-card reveal">
              <div class="project-bold-header">
                <span class="project-bold-tags">${p.tags.map(t => `<span class="bold-pill">${t}</span>`).join('')}</span>
                <span class="threat-badge" style="color:${IMPACT_COLOR[p.impact] || '#00FF41'}">[${p.impact || 'LOW'} IMPACT]</span>
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
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onStart: () => gsap.set(el, { willChange: 'transform, opacity' }),
      onComplete: () => gsap.set(el, { willChange: 'auto' })
    });
  });
}
