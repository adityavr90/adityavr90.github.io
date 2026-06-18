import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATUS_LABEL = { active: 'CLEARED', 'in-progress': 'PENDING CLEARANCE', planned: 'SCHEDULED' };
const STATUS_COLOR = { active: '#00FF41', 'in-progress': '#FFB800', planned: '#666666' };

export function initCertifications(cv) {
  const section = document.querySelector('#certifications .container');
  section.innerHTML = `
    <h2 class="section-title reveal">CERTIFICATIONS & <span>CLEARANCES</span></h2>
    <div class="section-divider reveal"></div>
    <div class="certs-bold-grid">
      ${cv.certifications.map(c => `
        <div class="cert-bold-card reveal">
          <div class="cert-bold-status" style="color:${STATUS_COLOR[c.status] || '#666666'}">[${STATUS_LABEL[c.status] || c.status}]</div>
          <div class="cert-bold-name">${c.name}</div>
          ${c.issuer ? `<div class="cert-bold-issuer">${c.issuer}</div>` : ''}
          <div class="cert-bold-date" style="color:${STATUS_COLOR[c.status] || '#666666'}">${c.date || ''}</div>
        </div>
      `).join('')}
    </div>
  `;

  gsap.utils.toArray('#certifications .reveal').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onStart: () => gsap.set(el, { willChange: 'transform, opacity' }),
      onComplete: () => gsap.set(el, { willChange: 'auto' })
    });
  });
}
