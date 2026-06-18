import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initBlog(cv) {
  const section = document.querySelector('#blog .container');
  const isEmpty = !cv.blog || cv.blog.length === 0;
  section.innerHTML = `
    <h2 class="section-title reveal">Blog & <span>Writeups</span></h2>
    <div class="section-divider reveal"></div>
    ${isEmpty
      ? `<p class="reveal" style="color:var(--text-muted)">Articles coming soon.</p>`
      : `<div class="blog-list">
          ${cv.blog.map(b => `
            <a href="${b.link}" class="blog-item reveal" target="_blank" rel="noopener">
              <div class="blog-meta"><span class="blog-category">${b.category}</span><span class="blog-date">${b.date} · ${b.readTime}</span></div>
              <h3 class="blog-title">${b.title}</h3>
              <p class="blog-excerpt">${b.excerpt}</p>
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
