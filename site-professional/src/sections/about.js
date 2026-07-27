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
          <!-- public/avatar.jpg existed but was never rendered. Falls back
               to the initials block if the file is missing or fails to load. -->
          <img src="/avatar.jpg" alt="${cv.name}" class="avatar-img"
               onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'avatar-placeholder',textContent:'AVR'}))" />
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
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onStart: () => gsap.set(el, { willChange: 'transform, opacity' }),
      onComplete: () => gsap.set(el, { willChange: 'auto' })
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
        gsap.set(el, { willChange: 'transform' });
        gsap.to({ val: 0 }, {
          val: target, duration: 1.8, ease: 'power2.out',
          onUpdate: function() { el.textContent = Math.round(this.targets()[0].val) + suffix; },
          onComplete: () => gsap.set(el, { willChange: 'auto' })
        });
      }
    });
  });
}
