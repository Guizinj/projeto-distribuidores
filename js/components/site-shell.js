import { applyBusinessTheme, businessConfig } from '../config.js';
import { buildWhatsAppUrl } from '../utils/whatsapp.js';

function headerTemplate(page) {
  const homeBase = page === 'home' ? '' : 'index.html';
  const links = [
    { key: 'home', label: 'Início', href: 'index.html' },
    { key: 'treatments', label: 'Tratamentos', href: homeBase + '#tratamentos' },
    { key: 'brands', label: 'Marcas', href: homeBase + '#marcas' },
    { key: 'catalog', label: 'Catálogo', href: 'catalogo.html' },
    { key: 'service', label: 'Atendimento', href: homeBase + '#atendimento' }
  ];
  const nav = links.map((link) => {
    const active = (page === 'catalog' || page === 'product') && link.key === 'catalog' || page === 'home' && link.key === 'home';
    return '<a href="' + link.href + '"' + (active ? ' aria-current="page"' : '') + '>' + link.label + '</a>';
  }).join('');

  return [
    '<header class="site-header" data-site-header-element>',
      '<div class="site-header__inner">',
        '<a class="brand" href="index.html" aria-label="' + businessConfig.name + ' — Início">',
          '<strong>' + businessConfig.wordmark + '</strong><span>' + businessConfig.subtitle + '</span>',
        '</a>',
        '<nav class="site-nav" id="site-navigation" aria-label="Navegação principal">' + nav + '</nav>',
        '<a class="header-cta" href="catalogo.html">Ver catálogo <span class="icon-arrow-up-right" aria-hidden="true"></span></a>',
        '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Abrir menu">',
          '<span></span><span></span>',
        '</button>',
      '</div>',
      '<div class="mobile-menu" id="mobile-menu" aria-hidden="true">',
        '<nav aria-label="Navegação para dispositivos móveis">' + nav + '</nav>',
        '<div class="mobile-menu__footer">',
          '<p>' + businessConfig.region + '</p>',
          '<a href="' + buildWhatsAppUrl() + '" target="_blank" rel="noopener noreferrer">Falar com um consultor <span class="icon-arrow-up-right" aria-hidden="true"></span></a>',
        '</div>',
      '</div>',
    '</header>'
  ].join('');
}

function footerTemplate() {
  const year = new Date().getFullYear();
  return [
    '<footer class="site-footer">',
      '<div class="container site-footer__top">',
        '<div class="site-footer__brand">',
          '<a class="brand brand--footer" href="index.html"><strong>' + businessConfig.wordmark + '</strong><span>' + businessConfig.subtitle + '</span></a>',
          '<p>Curadoria de alta performance para profissionais que transformam técnica em experiência.</p>',
        '</div>',
        '<div class="site-footer__column"><p>Navegação</p><a href="index.html">Início</a><a href="catalogo.html">Catálogo</a><a href="index.html#tratamentos">Tratamentos</a><a href="index.html#marcas">Marcas</a></div>',
        '<div class="site-footer__column"><p>Tratamentos</p><a href="catalogo.html?categoria=Hidratação">Hidratação</a><a href="catalogo.html?categoria=Nutrição">Nutrição</a><a href="catalogo.html?categoria=Reconstrução">Reconstrução</a><a href="catalogo.html?categoria=Progressivos">Progressivos</a></div>',
        '<div class="site-footer__column"><p>Contato</p><a href="' + buildWhatsAppUrl() + '" target="_blank" rel="noopener noreferrer">WhatsApp <span class="icon-arrow-up-right" aria-hidden="true"></span></a><a href="' + businessConfig.instagramUrl + '" target="_blank" rel="noopener noreferrer">' + businessConfig.instagram + ' <span class="icon-arrow-up-right" aria-hidden="true"></span></a><a href="mailto:' + businessConfig.email + '">' + businessConfig.email + '</a></div>',
      '</div>',
      '<div class="container site-footer__bottom"><span>© ' + year + ' ' + businessConfig.name + '</span><span>' + businessConfig.region + '</span><span>Impactos Professional · ÉLURE Professional</span></div>',
    '</footer>'
  ].join('');
}

function setupMenu(header) {
  const toggle = header.querySelector('.menu-toggle');
  const menu = header.querySelector('.mobile-menu');
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.setAttribute('aria-hidden', String(!open));
    header.classList.toggle('menu-open', open);
    document.body.classList.toggle('menu-is-open', open);
    document.querySelector('main')?.toggleAttribute('inert', open);
    document.querySelector('[data-site-footer]')?.toggleAttribute('inert', open);
    if (open) {
      requestAnimationFrame(() => menu.querySelector('a')?.focus());
    } else if (menu.contains(document.activeElement)) {
      toggle.focus();
    }
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
  window.matchMedia('(min-width: 64rem)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}

function setupHeaderScroll(header) {
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

export function initSiteShell() {
  applyBusinessTheme();
  const page = document.body.dataset.page || '';
  const pageTitles = {
    home: businessConfig.name + ' — ' + businessConfig.subtitle,
    catalog: 'Catálogo Profissional — ' + businessConfig.name
  };
  if (pageTitles[page]) document.title = pageTitles[page];
  const headerMount = document.querySelector('[data-site-header]');
  const footerMount = document.querySelector('[data-site-footer]');
  headerMount.innerHTML = headerTemplate(page);
  footerMount.innerHTML = footerTemplate();

  const header = headerMount.querySelector('.site-header');
  setupMenu(header);
  setupHeaderScroll(header);

  document.querySelectorAll('[data-whatsapp-link]').forEach((link) => {
    link.href = buildWhatsAppUrl();
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}
