import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initContact(cv) {
  const section = document.querySelector('#contact .container');
  const { email, phone, location, linkedin } = cv.contact;

  section.innerHTML = `
    <h2 class="section-title reveal">Get In <span>Touch</span></h2>
    <div class="section-divider reveal"></div>
    <div class="contact-block">
      <p class="contact-intro reveal">
        Available for senior IT/OT security consulting, advisory roles, and speaking engagements.
      </p>
      <a href="mailto:${email}" class="btn btn-primary contact-cta reveal">Email Me</a>
      <div class="contact-cards reveal">
        <a href="mailto:${email}" class="contact-card">
          <span class="contact-card-label">Email</span>
          <span class="contact-card-value">${email}</span>
        </a>
        <a href="tel:${phone}" class="contact-card">
          <span class="contact-card-label">Phone</span>
          <span class="contact-card-value">${phone}</span>
        </a>
        ${linkedin ? `
        <a href="${linkedin}" class="contact-card" target="_blank" rel="noopener">
          <span class="contact-card-label">LinkedIn</span>
          <span class="contact-card-value">Connect</span>
        </a>` : ''}
        <div class="contact-card contact-card-static">
          <span class="contact-card-label">Location</span>
          <span class="contact-card-value">${location}</span>
        </div>
      </div>
    </div>
  `;

  gsap.utils.toArray('#contact .reveal').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 32 }, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onStart: () => gsap.set(el, { willChange: 'transform, opacity' }),
      onComplete: () => gsap.set(el, { willChange: 'auto' })
    });
  });
}
