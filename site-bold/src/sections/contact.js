import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initContact(cv) {
  const section = document.querySelector('#contact .container');
  section.innerHTML = `
    <h2 class="section-title reveal">INITIATE <span>CONTACT</span></h2>
    <div class="section-divider reveal"></div>
    <div class="contact-bold-grid">
      <div class="contact-bold-info reveal">
        <div class="terminal-window">
          <div class="terminal-bar"><span class="t-dot red"></span><span class="t-dot yellow"></span><span class="t-dot green"></span></div>
          <div class="terminal-body">
            <p class="t-line"><span class="t-prompt">&gt; </span>contact --info</p>
            <p class="t-line t-output">EMAIL: <a href="mailto:${cv.contact.email}" style="color:var(--green)">${cv.contact.email}</a></p>
            <p class="t-line t-output">PHONE: ${cv.contact.phone}</p>
            <p class="t-line t-output">LOC: ${cv.contact.location}</p>
            ${cv.contact.linkedin ? `<p class="t-line t-output">LINKEDIN: <a href="${cv.contact.linkedin}" style="color:var(--green)" target="_blank" rel="noopener">profile</a></p>` : ''}
            <p class="t-line t-output" style="margin-top:1rem;color:#888">Available for senior IT/OT security consulting,<br>advisory roles, and speaking engagements.</p>
          </div>
        </div>
      </div>
      <form id="contact-form" class="contact-bold-form reveal">
        <div class="term-field"><span class="t-prompt">&gt; name: </span><input type="text" name="from_name" required /></div>
        <div class="term-field"><span class="t-prompt">&gt; email: </span><input type="email" name="reply_to" required /></div>
        <div class="term-field term-field--area"><span class="t-prompt">&gt; msg: </span><textarea name="message" rows="5" required></textarea></div>
        <button type="submit" class="btn-enter" id="submit-btn">SEND TRANSMISSION &#9654;</button>
        <p id="form-status" style="font-family:var(--mono);font-size:0.85rem;margin-top:1rem;display:none"></p>
      </form>
    </div>
  `;

  emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');

  document.getElementById('contact-form').addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const status = document.getElementById('form-status');
    btn.textContent = 'TRANSMITTING...';
    btn.disabled = true;
    try {
      await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target);
      status.textContent = '[SUCCESS] TRANSMISSION RECEIVED';
      status.style.color = 'var(--green)';
      status.style.display = 'block';
      e.target.reset();
    } catch {
      status.textContent = '[ERROR] TRANSMISSION FAILED — EMAIL DIRECTLY';
      status.style.color = 'var(--red)';
      status.style.display = 'block';
    }
    btn.textContent = 'SEND TRANSMISSION ▶';
    btn.disabled = false;
  });

  gsap.utils.toArray('#contact .reveal').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 32 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onStart: () => gsap.set(el, { willChange: 'transform, opacity' }),
      onComplete: () => gsap.set(el, { willChange: 'auto' })
    });
  });
}
