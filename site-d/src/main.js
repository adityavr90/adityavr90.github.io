import { cv } from '@shared/cv-data.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { initTree } from './tree.js';
import { initSections } from './sections.js';

gsap.registerPlugin(ScrollTrigger);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

function initChrome() {
  document.getElementById('yr').textContent = new Date().getFullYear();

  const btn = document.querySelector('.bar-menu');
  const menu = document.getElementById('bar-nav-m');
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
  if (reduceMotion) { gsap.set('.reveal', { opacity: 1, y: 0 }); return; }

  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.65, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 89%' },
      onStart: () => gsap.set(el, { willChange: 'transform, opacity' }),
      onComplete: () => gsap.set(el, { willChange: 'auto' })
    });
  });

  gsap.timeline({ delay: 0.25 })
    .fromTo('.stage-intro .kick', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45 })
    .fromTo('.stage-intro h1',    { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
    .fromTo('.stage-intro .sub',  { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.35')
    .fromTo('.stage-intro .nudge',{ opacity: 0 },        { opacity: 1, duration: 0.5 }, '-=0.25')
    .fromTo('.stage-hud, .stage-ctrl, .legend', { opacity: 0 }, { opacity: 1, duration: 0.55 }, '-=0.3');
}

document.addEventListener('DOMContentLoaded', () => {
  initChrome();
  initSections(cv);
  initTree();
  initReveals();
});
