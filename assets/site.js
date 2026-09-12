const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const mobilePanel = document.querySelector('.mobile-panel');
const preview = document.getElementById('service-preview');
const serviceRows = [...document.querySelectorAll('.service-row')];
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');

document.getElementById('year').textContent = new Date().getFullYear();

const syncHeader = () => header.classList.toggle('scrolled', window.scrollY > 30);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  mobilePanel.hidden = open;
});
mobilePanel.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  mobilePanel.hidden = true;
}));

serviceRows.forEach(row => {
  const activate = () => {
    serviceRows.forEach(item => item.classList.remove('is-active'));
    row.classList.add('is-active');
    if (!preview) return;
    preview.style.opacity = '0';
    window.setTimeout(() => {
      preview.src = row.dataset.image;
      preview.style.opacity = '1';
    }, 120);
  };
  row.addEventListener('mouseenter', activate);
  row.addEventListener('focusin', activate);
});

document.querySelectorAll('.project-open').forEach(button => {
  button.addEventListener('click', () => {
    lightboxImage.src = button.dataset.full;
    if (typeof lightbox.showModal === 'function') lightbox.showModal();
  });
});
lightboxClose.addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) lightbox.close();
});
