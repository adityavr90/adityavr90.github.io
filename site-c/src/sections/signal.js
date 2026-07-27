export function initSignal(cv) {
  const el = document.querySelector('#signal .wrap');
  const { email, phone, location, linkedin } = cv.contact;

  const card = (label, value, href, external) => `
    <a class="link-card reveal" href="${href}"${external ? ' target="_blank" rel="noopener"' : ''}>
      <span class="link-label mono">${label}</span>
      <span class="link-value">${value}</span>
      <span class="link-arrow" aria-hidden="true">→</span>
    </a>
  `;

  el.innerHTML = `
    <header class="sec-head reveal">
      <span class="sec-index">03</span>
      <h2 class="sec-title">Contact</h2>
      <span class="sec-rule"></span>
    </header>

    <p class="lede reveal signal-lede">
      Available for senior IT/OT security consulting, advisory roles, and speaking engagements.
    </p>

    <div class="link-grid">
      ${card('Email', email, `mailto:${email}`)}
      ${card('Phone', phone, `tel:${phone}`)}
      ${linkedin ? card('LinkedIn', 'Connect', linkedin, true) : ''}
      <div class="link-card static reveal">
        <span class="link-label mono">Based in</span>
        <span class="link-value">${location}</span>
      </div>
    </div>
  `;
}
