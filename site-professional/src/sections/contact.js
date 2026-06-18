import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initContact(cv) {
  const section = document.querySelector('#contact .container');
  section.innerHTML = `
    <h2 class="section-title reveal">Get In <span>Touch</span></h2>
    <div class="section-divider reveal"></div>
    <div class="contact-grid">
      <div class="contact-info reveal">
        <p style="color:var(--text-muted);margin-bottom:2rem">Available for senior IT/OT security consulting, advisory roles, and speaking engagements.</p>
        <div class="contact-links">
          <a href="mailto:${cv.contact.email}" class="contact-link">✉ ${cv.contact.email}</a>
          <a href="tel:${cv.contact.phone}" class="contact-link">📞 ${cv.contact.phone}</a>
          <span class="contact-link">📍 ${cv.contact.location}</span>
          ${cv.contact.linkedin ? `<a href="${cv.contact.linkedin}" class="contact-link" target="_blank" rel="noopener">in LinkedIn</a>` : ''}
        </div>
      </div>
      <form id="contact-form" class="contact-form reveal">
        <input type="text" name="from_name" placeholder="Your Name" required />
        <input type="email" name="reply_to" placeholder="Your Email" required />
        <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
        <button type="submit" class="btn btn-primary" id="submit-btn">Send Message</button>
        <p id="form-status" style="margin-top:1rem;color:var(--accent);display:none"></p>
      </form>
    </div>
  `;

  // EmailJS — replace with your own service/template/public key before launch
  emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');
  document.getElementById('contact-form').addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const status = document.getElementById('form-status');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    try {
      await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target);
      status.textContent = 'Message sent successfully!';
      status.style.display = 'block';
      e.target.reset();
    } catch {
      status.textContent = 'Failed to send. Please email directly.';
      status.style.color = '#FF6B6B';
      status.style.display = 'block';
    }
    btn.textContent = 'Send Message';
    btn.disabled = false;
  });

  gsap.utils.toArray('#contact .reveal').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 32 }, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onStart: () => gsap.set(el, { willChange: 'transform, opacity' }),
      onComplete: () => gsap.set(el, { willChange: 'auto' })
    });
  });
}
