import { STORY, BUILDS, NOW, OFFLINE, HI } from './content.js';

const head = (n, title) => `
  <header class="sh reveal">
    <span class="sh-n">${n}</span>
    <h2>${title}</h2>
    <span class="sh-rule"></span>
  </header>
`;

export function initSections(cv) {
  // ── Story ───────────────────────────────────────────────────
  document.querySelector('#story .wrap').innerHTML = `
    ${head('01', STORY.title)}
    <div class="prose">
      ${STORY.paras.map(p => `<p class="reveal">${p}</p>`).join('')}
    </div>
  `;

  // ── Builds ──────────────────────────────────────────────────
  document.querySelector('#builds .wrap').innerHTML = `
    ${head('02', BUILDS.title)}
    <p class="lede reveal">${BUILDS.intro}</p>
    <div class="build-grid">
      ${BUILDS.items.map(b => `
        <article class="build reveal${b.placeholder ? ' is-todo' : ''}">
          <div class="build-tags">
            ${b.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
          <h3>${b.name}</h3>
          <p>${b.body}</p>
          ${b.link ? `<a class="build-link" href="${b.link}" target="_blank" rel="noopener">Have a look →</a>` : ''}
        </article>
      `).join('')}
    </div>
  `;

  // ── Now ─────────────────────────────────────────────────────
  document.querySelector('#now .wrap').innerHTML = `
    ${head('03', NOW.title)}
    <p class="lede reveal">${NOW.note}</p>
    <ul class="now-list">
      ${NOW.items.map(i => `
        <li class="reveal ${i.state}">
          <span class="now-dot"></span>
          <div>
            <h3>${i.label}</h3>
            <p>${i.body}</p>
          </div>
        </li>
      `).join('')}
    </ul>
  `;

  // ── Offline ─────────────────────────────────────────────────
  document.querySelector('#offline .wrap').innerHTML = `
    ${head('04', OFFLINE.title)}
    <p class="lede reveal">${OFFLINE.intro}</p>
    <div class="off-grid">
      ${OFFLINE.items.map(i => `
        <div class="off reveal${i.placeholder ? ' is-todo' : ''}">
          <h3>${i.label}</h3>
          <p>${i.body}</p>
        </div>
      `).join('')}
    </div>
  `;

  // ── Say hi ──────────────────────────────────────────────────
  const { email, linkedin, location } = cv.contact;
  document.querySelector('#say-hi .wrap').innerHTML = `
    ${head('05', HI.title)}
    <p class="lede reveal hi-lede">${HI.body}</p>
    <div class="hi-row">
      <a class="btn btn-solid reveal" href="mailto:${email}">Email me</a>
      ${linkedin ? `<a class="btn btn-line reveal" href="${linkedin}" target="_blank" rel="noopener">LinkedIn</a>` : ''}
      <a class="btn btn-line reveal" href="/Aditya_Vignesh_Ram_CV.pdf" download>The formal CV</a>
    </div>
    <p class="hi-outro reveal">${HI.outro} <span class="dim">· ${location}</span></p>
  `;
}
