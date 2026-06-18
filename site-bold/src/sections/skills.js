import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function initSkills(cv) {
  const section = document.querySelector('#skills .container');
  const domains = [
    { label: 'OT/ICS Security', value: 95 },
    { label: 'GRC & Compliance', value: 90 },
    { label: 'Risk Management', value: 88 },
    { label: 'Program Management', value: 85 },
    { label: 'AI Integration', value: 60 },
    { label: 'Penetration Testing', value: 70 }
  ];

  section.innerHTML = `
    <h2 class="section-title reveal">SKILLS &amp; <span>EXPERTISE</span></h2>
    <div class="section-divider reveal"></div>
    <div class="skills-bold-grid">
      <div class="skill-bars reveal">
        ${domains.map(d => `
          <div class="skill-bar-item">
            <div class="skill-bar-label"><span>${d.label}</span><span class="skill-bar-pct">${d.value}%</span></div>
            <div class="skill-bar-track"><div class="skill-bar-fill" data-width="${d.value}"></div></div>
          </div>
        `).join('')}
      </div>
      <div class="skill-tools reveal">
        <h3 class="tools-label">&gt; tools --list</h3>
        <div id="tools-cascade"></div>
        <h3 class="tools-label" style="margin-top:2rem">&gt; standards --active</h3>
        <div class="standards-pills">${cv.skills.standards.map(s => `<span class="bold-pill">${s}</span>`).join('')}</div>
      </div>
    </div>
  `;

  // Animate bars on scroll
  ScrollTrigger.create({
    trigger: '.skill-bars',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      document.querySelectorAll('.skill-bar-fill').forEach(el => {
        gsap.fromTo(el, { width: '0%' }, {
          width: el.dataset.width + '%',
          duration: 1.2,
          ease: 'power2.out',
          delay: 0.1,
          onStart: () => gsap.set(el, { willChange: 'transform, opacity' }),
          onComplete: () => gsap.set(el, { willChange: 'auto' })
        });
      });
    }
  });

  // Cascade tools
  ScrollTrigger.create({
    trigger: '.skill-tools',
    start: 'top 80%',
    once: true,
    onEnter: async () => {
      const container = document.getElementById('tools-cascade');
      for (const tool of cv.skills.tools) {
        const line = document.createElement('p');
        line.className = 't-line t-output';
        const prompt = document.createElement('span');
        prompt.className = 't-prompt';
        prompt.textContent = '  ';
        const name = document.createTextNode(tool);
        line.appendChild(prompt);
        line.appendChild(name);
        container.appendChild(line);
        gsap.from(line, {
          opacity: 0, x: -20, duration: 0.3,
          onStart: () => gsap.set(line, { willChange: 'transform, opacity' }),
          onComplete: () => gsap.set(line, { willChange: 'auto' })
        });
        await new Promise(r => setTimeout(r, 100));
      }
    }
  });

  gsap.utils.toArray('#skills .reveal').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 32 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onStart: () => gsap.set(el, { willChange: 'transform, opacity' }),
      onComplete: () => gsap.set(el, { willChange: 'auto' })
    });
  });
}
