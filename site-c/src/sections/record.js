/**
 * Record: experience, certifications, education.
 * Rendered as a plain document: no interaction needed to read any of it.
 */
export function initRecord(cv) {
  const el = document.querySelector('#record .wrap');
  const dev = cv.development || [];
  const edu = cv.education || [];

  const job = (j) => `
    <article class="post reveal">
      <div class="post-rail"><span class="post-dot"></span></div>
      <div class="post-body">
        <div class="post-head">
          <h3 class="post-title">${j.title}</h3>
          <span class="post-period mono">${j.period}</span>
        </div>
        <p class="post-org">${j.company} <span class="hud-dim">·</span> ${j.location}</p>

        ${j.roles && j.roles.length ? `
          <ol class="ladder">
            ${j.roles.map(r => `
              <li><span>${r.title}</span><span class="mono hud-dim">${r.period}</span></li>
            `).join('')}
          </ol>
        ` : j.progression ? `<p class="progression">${j.progression}</p>` : ''}

        <ul class="post-points">
          ${j.highlights.map(hl => `<li>${hl}</li>`).join('')}
        </ul>
      </div>
    </article>
  `;

  const cert = (c) => `
    <li class="cred reveal ${c.status || 'done'}">
      <span class="cred-name">${c.name}</span>
      <span class="cred-meta mono">
        ${c.issuer ? c.issuer : ''}${c.issuer && (c.date || c.status === 'in-progress') ? ' · ' : ''}${c.status === 'in-progress' ? 'In progress' : (c.date || '')}
      </span>
    </li>
  `;

  el.innerHTML = `
    <header class="sec-head reveal">
      <span class="sec-index">02</span>
      <h2 class="sec-title">Record</h2>
      <span class="sec-rule"></span>
    </header>

    <div class="record-cols">
      <div class="record-main">
        <h3 class="sub reveal">Experience</h3>
        ${cv.experience.map(job).join('')}
      </div>

      <aside class="record-side">
        <h3 class="sub reveal">Certifications</h3>
        <ul class="creds">${cv.certifications.map(cert).join('')}</ul>

        ${edu.length ? `
          <h3 class="sub reveal">Education</h3>
          <ul class="creds">
            ${edu.map(e => `
              <li class="cred reveal done">
                <span class="cred-name">${e.degree}</span>
                <span class="cred-meta mono">${e.institution} · ${e.period}</span>
                ${e.note ? `<span class="cred-note">${e.note}</span>` : ''}
              </li>
            `).join('')}
          </ul>
        ` : ''}

        ${dev.length ? `
          <h3 class="sub reveal">Professional Development</h3>
          <ul class="creds compact">
            ${dev.map(d => `
              <li class="cred reveal muted">
                <span class="cred-name">${d.name}</span>
                <span class="cred-meta mono">${[d.issuer, d.date].filter(Boolean).join(' · ')}</span>
              </li>
            `).join('')}
          </ul>
        ` : ''}
      </aside>
    </div>
  `;
}
