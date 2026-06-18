import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initBlog(cv) {
  const section = document.querySelector('#blog .container');
  const isEmpty = !cv.blog || cv.blog.length === 0;
  section.innerHTML = `
    <h2 class="section-title reveal">INTEL <span>REPORTS</span></h2>
    <div class="section-divider reveal"></div>
    ${isEmpty
      ? `<p class="reveal t-output" style="font-family:var(--mono)">// NO INTEL REPORTS FILED YET</p>`
      : `<div class="blog-bold-list">
          ${cv.blog.map(b => `
            <a href="${b.link}" class="blog-bold-item reveal" target="_blank" rel="noopener">
              <div class="blog-bold-header">
                <span class="blog-bold-class">[UNCLASSIFIED]</span>
                <span class="t-output" style="font-family:var(--mono);font-size:0.78rem">${b.date} · ${b.readTime}</span>
              </div>
              <div class="blog-bold-category">${b.category}</div>
              <h3 class="blog-bold-title">${b.title}</h3>
              <p class="blog-bold-excerpt">${b.excerpt}</p>
            </a>
          `).join('')}
        </div>`
    }
  `;

  gsap.utils.toArray('#blog .reveal').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onStart: () => gsap.set(el, { willChange: 'transform, opacity' }),
      onComplete: () => gsap.set(el, { willChange: 'auto' })
    });
  });
}
