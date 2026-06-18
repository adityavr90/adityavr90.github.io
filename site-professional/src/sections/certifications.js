import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onStart: () => gsap.set(el, { willChange: 'transform, opacity' }),
      onComplete: () => gsap.set(el, { willChange: 'auto' })
    });
  });
}
