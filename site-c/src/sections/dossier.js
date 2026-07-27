/**
 * Dossier — the scannable half of the site.
 *
 * The graph is the hook; this is the part a recruiter actually reads.
 * Everything a hiring manager needs is here in plain, linear HTML with no
 * interaction required.
 */
export function initDossier(cv) {
  const el = document.querySelector('#dossier .wrap');

  el.innerHTML = `
    <header class="sec-head reveal">
      <span class="sec-index">01</span>
      <h2 class="sec-title">Dossier</h2>
      <span class="sec-rule"></span>
    </header>

    <div class="dossier-grid">
      <div class="dossier-lede reveal">
        <p class="lede">${cv.summary}</p>
        <div class="dossier-actions">
          <a href="/Aditya_Vignesh_Ram_CV.pdf" download class="btn btn-solid">Download CV</a>
          ${cv.contact.linkedin ? `<a href="${cv.contact.linkedin}" target="_blank" rel="noopener" class="btn btn-line">LinkedIn</a>` : ''}
        </div>
      </div>

      <div class="metrics">
        ${cv.stats.map(s => `
          <div class="metric reveal">
            <span class="metric-value" data-target="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</span>
            <span class="metric-label">${s.label}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="capability-strip reveal">
      ${(cv.skills.core || []).map(c => `<span class="chip">${c}</span>`).join('')}
    </div>
  `;
}
