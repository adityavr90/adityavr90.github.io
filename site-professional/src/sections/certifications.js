import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const card = (c, tier) => `
  <div class="cert-card reveal ${tier === 'cert' ? c.status : 'development'}">
    ${tier === 'cert' ? '<div class="cert-status-dot"></div>' : ''}
    <div class="cert-name">${c.name}</div>
    ${c.issuer ? `<div class="cert-issuer">${c.issuer}</div>` : ''}
    ${c.date || c.status === 'in-progress'
      ? `<div class="cert-date">${c.status === 'in-progress' ? 'In Progress' : c.date}</div>`
      : ''}
  </div>
`;

export function initCertifications(cv) {
  const section = document.querySelector('#certifications .container');
  const development = cv.development || [];
  const education = cv.education || [];

  section.innerHTML = `
    <h2 class="section-title reveal">Certifications & <span>Education</span></h2>
    <div class="section-divider reveal"></div>

    <div class="certs-grid">
      ${cv.certifications.map(c => card(c, 'cert')).join('')}
    </div>

    ${education.length ? `
      <h3 class="subsection-title reveal">Education</h3>
      <div class="certs-grid">
        ${education.map(e => `
          <div class="cert-card reveal education">
            <div class="cert-name">${e.degree}</div>
            <div class="cert-issuer">${e.institution}</div>
            <div class="cert-date">${e.period}${e.note ? ` · ${e.note}` : ''}</div>
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${development.length ? `
      <h3 class="subsection-title reveal">Professional Development</h3>
      <div class="certs-grid">
        ${development.map(c => card(c, 'dev')).join('')}
      </div>
    ` : ''}
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
