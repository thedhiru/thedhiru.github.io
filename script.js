// Dropp — shared site behavior
document.addEventListener('DOMContentLoaded', () => {
  // mobile menu
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav){
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  // dynamic year
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  // contact form: prevent real submission, show a quiet confirmation
  const form = document.querySelector('#contact-form');
  if (form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = document.querySelector('#form-note');
      if (note){
        note.textContent = 'Message received — we reply within two business days.';
        note.style.color = 'var(--primary)';
      }
      form.reset();
    });
  }

  // hero slider
  const slider = document.querySelector('.hero-slider');
  if (slider){
    const slides = slider.querySelectorAll('.slide');
    const dots   = slider.querySelectorAll('.slider-dots button');
    const prev   = slider.querySelector('.slider-arrow.prev');
    const next   = slider.querySelector('.slider-arrow.next');
    let i = 0;
    let timer;

    const go = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
      dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
    };

    const start = () => { stop(); timer = setInterval(() => go(i + 1), 6500); };
    const stop  = () => { if (timer) clearInterval(timer); };

    if (prev) prev.addEventListener('click', () => { go(i - 1); start(); });
    if (next) next.addEventListener('click', () => { go(i + 1); start(); });
    dots.forEach((d, idx) => d.addEventListener('click', () => { go(idx); start(); }));

    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);

    // swipe support (mobile)
    let touchStartX = 0;
    let touchEndX = 0;
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stop();
    }, { passive: true });
    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const dx = touchEndX - touchStartX;
      if (Math.abs(dx) > 40){
        go(dx < 0 ? i + 1 : i - 1);
      }
      start();
    }, { passive: true });

    start();
  }
});