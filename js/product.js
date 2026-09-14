import { businessConfig } from './config.js';
import { initSiteShell } from './components/site-shell.js';
import { renderProductCards } from './components/product-card.js';
import { initReveals } from './components/reveal.js';
import { productService } from './services/product-service.js';
import { buildWhatsAppUrl } from './utils/whatsapp.js';
import { escapeHtml } from './utils/dom.js';

function renderNotFound(container) {
  document.title = 'Produto não encontrado — ' + businessConfig.name;
  container.innerHTML = [
    '<section class="not-found container">',
      '<p class="eyebrow">Produto não encontrado</p>',
      '<h1>Este tratamento não está disponível no catálogo.</h1>',
      '<p>O link pode estar incompleto ou o produto pode ter sido atualizado.</p>',
      '<div class="button-group"><a class="button button--dark" href="catalogo.html">Voltar ao catálogo</a><a class="text-link" href="' + buildWhatsAppUrl() + '" target="_blank" rel="noopener noreferrer">Falar com um consultor <span class="icon-arrow-up-right" aria-hidden="true"></span></a></div>',
    '</section>'
  ].join('');
}

function renderProduct(container, product) {
  document.title = product.name + ' — ' + businessConfig.name;
  const benefits = product.benefits.map((benefit) => '<li>' + escapeHtml(benefit) + '</li>').join('');
  container.innerHTML = [
    '<div class="container product-breadcrumb"><a href="catalogo.html">Catálogo</a><span>/</span><a href="catalogo.html?categoria=' + encodeURIComponent(product.category) + '">' + escapeHtml(product.category) + '</a><span>/</span><span>' + escapeHtml(product.name) + '</span></div>',
    '<article class="container product-detail">',
      '<div class="product-gallery reveal">',
        '<div class="product-gallery__main"><img src="' + escapeHtml(product.image) + '" alt="Embalagem de ' + escapeHtml(product.name) + '" width="820" height="1230"></div>',
        '<p>Imagem do produto · Apresentação profissional</p>',
      '</div>',
      '<div class="product-info reveal">',
        '<div class="product-info__top"><p class="eyebrow">' + escapeHtml(product.brand) + '</p><span>' + escapeHtml(product.category) + '</span></div>',
        '<h1>' + escapeHtml(product.name) + '</h1>',
        '<p class="product-info__volume">' + escapeHtml(product.volume) + '</p>',
        '<p class="product-info__lead">' + escapeHtml(product.shortDescription) + '</p>',
        '<p class="product-info__description">' + escapeHtml(product.description) + '</p>',
        '<div class="product-commercial"><div><span>Condições</span><strong>Consulte condições comerciais</strong></div><div><span>Atendimento</span><strong>Exclusivo para profissionais</strong></div></div>',
        '<a class="button button--dark button--full" href="' + buildWhatsAppUrl(product) + '" target="_blank" rel="noopener noreferrer">Solicitar este tratamento <span class="icon-arrow-up-right" aria-hidden="true"></span></a>',
        '<a class="back-link" href="catalogo.html">← Voltar ao catálogo</a>',
        '<div class="product-specs">',
          '<section><h2>Benefícios</h2><ul>' + benefits + '</ul></section>',
          '<section><h2>Indicação</h2><p>' + escapeHtml(product.recommendedFor) + '</p></section>',
          '<section><h2>Modo de utilização</h2><p>' + escapeHtml(product.usage) + '</p></section>',
        '</div>',
        '<p class="professional-note">Produto destinado ao uso profissional. A escolha do protocolo deve considerar a avaliação técnica dos fios.</p>',
      '</div>',
    '</article>'
  ].join('');
}

async function initProduct() {
  initSiteShell();
  const container = document.querySelector('[data-product-page]');
  const id = new URLSearchParams(window.location.search).get('id');
  const product = id ? await productService.getById(id) : null;
  if (!product) {
    renderNotFound(container);
    initReveals();
    return;
  }

  renderProduct(container, product);
  const related = await productService.getRelated(product, 3);
  const relatedSection = document.querySelector('[data-related-section]');
  renderProductCards(document.querySelector('[data-related-products]'), related, { compact: true });
  relatedSection.hidden = false;
  initReveals();
}

initProduct();
