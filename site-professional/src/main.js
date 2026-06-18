import { cv } from '@shared/cv-data.js';
import { initHero } from './sections/hero.js';
import { initAbout } from './sections/about.js';
import { initSkills } from './sections/skills.js';
import { initExperience } from './sections/experience.js';
import { initProjects } from './sections/projects.js';
import { initCertifications } from './sections/certifications.js';
import { initBlog } from './sections/blog.js';
import { initContact } from './sections/contact.js';

document.addEventListener('DOMContentLoaded', () => {
  initHero(cv);
  initAbout(cv);
  initSkills(cv);
  initExperience(cv);
  initProjects(cv);
  initCertifications(cv);
  initBlog(cv);
  initContact(cv);
});
