export function initReveals(scope = document) {
  const elements = [...scope.querySelectorAll('.reveal:not(.is-visible)')];
  if (!elements.length) return;

  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  elements.forEach((element, index) => {
    element.style.setProperty('--reveal-delay', (index % 4) * 70 + 'ms');
    observer.observe(element);
  });
}
