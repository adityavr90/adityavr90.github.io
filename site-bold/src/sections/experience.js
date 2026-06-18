import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function initExperience(cv) {
  const section = document.querySelector('#experience .container');
  section.innerHTML = `
    <h2 class="section-title reveal">WORK <span>EXPERIENCE</span></h2>
    <div class="section-divider reveal"></div>
    <div class="exp-track">
      ${cv.experience.map((job, i) => `
        <div class="exp-card reveal" data-index="${i}">
          <div class="exp-card-header">
            <span class="exp-tag">[CASE FILE ${String(i + 1).padStart(2, '0')}]</span>
            <span class="exp-period">${job.period}</span>
          </div>
          <h3 class="exp-title">${job.title}</h3>
          <p class="exp-company">${job.company} &middot; ${job.location}</p>
          <ul class="exp-highlights">
            ${job.highlights.map(h => `<li><span class="t-prompt">&#9656; </span>${h}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>
  `;

  gsap.utils.toArray('.exp-card').forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 48, rotateX: -15 }, {
      opacity: 1, y: 0, rotateX: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onStart: () => gsap.set(el, { willChange: 'transform, opacity' }),
      onComplete: () => gsap.set(el, { willChange: 'auto' })
    });
  });

  gsap.utils.toArray('#experience .reveal').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 32 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onStart: () => gsap.set(el, { willChange: 'transform, opacity' }),
      onComplete: () => gsap.set(el, { willChange: 'auto' })
    });
  });
}
