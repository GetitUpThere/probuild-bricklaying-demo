const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const mobilePanel = document.querySelector('.mobile-panel');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');

document.getElementById('year').textContent = new Date().getFullYear();

const syncHeader = () => header.classList.toggle('scrolled', window.scrollY > 28);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  mobilePanel.hidden = isOpen;
});

mobilePanel.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  mobilePanel.hidden = true;
}));

document.querySelectorAll('.project-open').forEach(button => {
  button.addEventListener('click', () => {
    lightboxImage.src = button.dataset.full;
    lightboxImage.alt = button.querySelector('img')?.alt || 'Expanded project image';
    if (typeof lightbox.showModal === 'function') lightbox.showModal();
  });
});

lightboxClose.addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) lightbox.close();
});
