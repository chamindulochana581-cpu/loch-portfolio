'use strict';
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
});
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open'); menuToggle.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-card');
filters.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filters.forEach(b => {const selected = b === button; b.classList.toggle('is-active', selected); b.setAttribute('aria-pressed', String(selected));});
  projects.forEach(card => {card.hidden = !(category === 'all' || card.dataset.category === category);});
}));
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {entry.target.classList.add('visible'); observer.unobserve(entry.target);}
  }), { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
  reveals.forEach(el => observer.observe(el));
} else { reveals.forEach(el => el.classList.add('visible')); }
const progress = document.querySelector('.scroll-progress');
const header = document.querySelector('.site-header');
let ticking = false;
function updateScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? Math.min(100, window.scrollY / max * 100) : 0}%`;
  header.classList.toggle('scrolled', window.scrollY > 24); ticking = false;
}
window.addEventListener('scroll', () => { if (!ticking) {requestAnimationFrame(updateScroll); ticking = true;} }, {passive:true});
updateScroll();
document.getElementById('year').textContent = new Date().getFullYear();
const glow = document.querySelector('.cursor-glow');
if (window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
  window.addEventListener('pointermove', e => {glow.style.transform = `translate3d(${e.clientX - 240}px, ${e.clientY - 240}px, 0)`;}, {passive:true});
} else {glow.hidden = true;}
