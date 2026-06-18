import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

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
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onStart: () => gsap.set(el, { willChange: 'transform, opacity' }),
      onComplete: () => gsap.set(el, { willChange: 'auto' })
    });
  });
}
