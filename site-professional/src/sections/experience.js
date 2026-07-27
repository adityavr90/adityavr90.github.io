import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
            ${job.roles && job.roles.length
              ? `<ul class="role-ladder">
                  ${job.roles.map(r => `
                    <li><span class="role-title">${r.title}</span><span class="role-period">${r.period}</span></li>
                  `).join('')}
                </ul>`
              : job.progression
                ? `<p class="timeline-progression">${job.progression}</p>`
                : ''
            }
            <p class="timeline-location">${job.location}</p>
            <ul class="timeline-highlights">
              ${job.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Animate the vertical line fill on scroll with will-change for performance
  const fillEl = document.querySelector('.timeline-line-fill');
  gsap.fromTo(fillEl,
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.timeline',
        start: 'top 70%',
        end: 'bottom 80%',
        scrub: true,
        onEnter: () => gsap.set(fillEl, { willChange: 'transform' }),
        onLeaveBack: () => gsap.set(fillEl, { willChange: 'auto' })
      }
    }
  );

  // Reveal each card with will-change callbacks
  gsap.utils.toArray('.timeline-item').forEach(el => {
    gsap.fromTo(el, { opacity: 0, x: -40 }, {
      opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
      onStart: () => gsap.set(el, { willChange: 'transform, opacity' }),
      onComplete: () => gsap.set(el, { willChange: 'auto' }),
      scrollTrigger: { trigger: el, start: 'top 82%' }
    });
  });
}
