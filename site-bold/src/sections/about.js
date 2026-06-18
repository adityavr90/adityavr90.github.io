import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

function typeInto(el, text, speed = 28) {
  return new Promise(resolve => {
    let i = 0;
    const interval = setInterval(() => {
      el.textContent += text[i++];
      if (i >= text.length) { clearInterval(interval); resolve(); }
    }, speed);
  });
}

export function initAbout(cv) {
  const section = document.querySelector('#about .container');
  section.innerHTML = `
    <h2 class="section-title reveal">ABOUT <span>ME</span></h2>
    <div class="section-divider reveal"></div>
    <div class="terminal-window reveal">
      <div class="terminal-bar"><span class="t-dot red"></span><span class="t-dot yellow"></span><span class="t-dot green"></span><span class="t-title">avr@secure:~</span></div>
      <div class="terminal-body">
        <p class="t-line"><span class="t-prompt">&gt; </span><span class="t-cmd">whoami</span></p>
        <p class="t-line t-output" id="t-summary"></p>
        <p class="t-line" style="margin-top:1.5rem"><span class="t-prompt">&gt; </span><span class="t-cmd">stats --verified</span></p>
        <div id="t-stats"></div>
        <p class="t-line t-cursor">&#9607;</p>
      </div>
    </div>
  `;

  gsap.utils.toArray('#about .reveal').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 32 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onStart: () => gsap.set(el, { willChange: 'transform, opacity' }),
      onComplete: () => gsap.set(el, { willChange: 'auto' })
    });
  });

  ScrollTrigger.create({
    trigger: '.terminal-window',
    start: 'top 75%',
    once: true,
    onEnter: async () => {
      const summaryEl = document.getElementById('t-summary');
      await typeInto(summaryEl, cv.summary, 12);

      const statsEl = document.getElementById('t-stats');
      for (const s of cv.stats) {
        const line = document.createElement('p');
        line.className = 't-line t-output';
        line.innerHTML = `<span class="t-confirmed">[CONFIRMED]</span> ${s.label}: <strong>${s.value}${s.suffix}</strong>`;
        statsEl.appendChild(line);
        gsap.fromTo(line, { opacity: 0, x: -16 }, {
          opacity: 1, x: 0, duration: 0.4,
          onStart: () => gsap.set(line, { willChange: 'transform, opacity' }),
          onComplete: () => gsap.set(line, { willChange: 'auto' })
        });
        await new Promise(r => setTimeout(r, 300));
      }
    }
  });
}
