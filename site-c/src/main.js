import { cv } from '@shared/cv-data.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { initGraph } from './graph.js';
import { initDossier } from './sections/dossier.js';
import { initRecord } from './sections/record.js';
import { initSignal } from './sections/signal.js';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

function initChrome() {
  document.getElementById('year').textContent = new Date().getFullYear();

  document.querySelector('.map-name').textContent = cv.name;
  document.querySelector('.map-role').textContent = `${cv.title} · ${cv.subtitle}`;

  // Mobile menu
  const btn = document.querySelector('.hud-menu');
  const menu = document.getElementById('hud-nav-mobile');
  const setOpen = (open) => {
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', open);
  };
  btn.addEventListener('click', () => setOpen(menu.hidden));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  matchMedia('(min-width: 861px)').addEventListener('change', e => { if (e.matches) setOpen(false); });
}

function initReveals() {
  if (reduceMotion) {
    gsap.set('.reveal', { opacity: 1, y: 0 });
    document.querySelectorAll('.metric-value').forEach(el => {
      el.textContent = el.dataset.target + el.dataset.suffix;
    });
    return;
  }

  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 26 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
        onStart: () => gsap.set(el, { willChange: 'transform, opacity' }),
        onComplete: () => gsap.set(el, { willChange: 'auto' })
      }
    );
  });

  // Metric counters
  document.querySelectorAll('.metric-value').forEach((el) => {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    ScrollTrigger.create({
      trigger: el, start: 'top 85%', once: true,
      onEnter: () => gsap.to({ v: 0 }, {
        v: target, duration: 1.6, ease: 'power2.out',
        onUpdate() { el.textContent = Math.round(this.targets()[0].v) + suffix; }
      })
    });
  });

  // Hero intro
  gsap.timeline({ delay: 0.2 })
    .fromTo('.map-intro .eyebrow', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 })
    .fromTo('.map-name',  { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.25')
    .fromTo('.map-role',  { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.35')
    .fromTo('.map-hint',  { opacity: 0 },        { opacity: 1, duration: 0.5 }, '-=0.2')
    .fromTo('.map-readout, .scroll-cue', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.3');
}

document.addEventListener('DOMContentLoaded', () => {
  initChrome();
  initDossier(cv);
  initRecord(cv);
  initSignal(cv);
  initGraph(cv);        // after sections so .reveal collection is complete
  initReveals();
});
