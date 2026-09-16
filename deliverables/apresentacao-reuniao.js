const slides = [...document.querySelectorAll('.slide')];
const current = document.querySelector('[data-current]');
const total = document.querySelector('[data-total]');
const preview = Number(new URLSearchParams(window.location.search).get('preview'));

total.textContent = String(slides.length);

if (preview >= 1 && preview <= slides.length) {
  slides.forEach((slide, index) => { slide.hidden = index !== preview - 1; });
  document.querySelector('.deck-controls').hidden = true;
}

function activeIndex() {
  const middle = window.scrollY + window.innerHeight / 2;
  return slides.reduce((best, slide, index) => {
    return Math.abs(slide.offsetTop - middle) < Math.abs(slides[best].offsetTop - middle) ? index : best;
  }, 0);
}

function goTo(offset) {
  const index = Math.max(0, Math.min(slides.length - 1, activeIndex() + offset));
  slides[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateCurrent() {
  current.textContent = String(activeIndex() + 1);
}

document.querySelector('[data-prev]').addEventListener('click', () => goTo(-1));
document.querySelector('[data-next]').addEventListener('click', () => goTo(1));

document.addEventListener('keydown', (event) => {
  if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key)) {
    event.preventDefault();
    goTo(1);
  }
  if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) {
    event.preventDefault();
    goTo(-1);
  }
  if (event.key === 'Home') slides[0].scrollIntoView();
  if (event.key === 'End') slides.at(-1).scrollIntoView();
});

window.addEventListener('scroll', updateCurrent, { passive: true });
updateCurrent();
