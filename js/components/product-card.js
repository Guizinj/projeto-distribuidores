import { escapeHtml } from '../utils/dom.js';

export function createProductCard(product, options = {}) {
  const compact = options.compact ? ' product-card--compact' : '';
  const href = 'produto.html?id=' + encodeURIComponent(product.id);

  return [
    '<article class="product-card reveal' + compact + '">',
      '<a class="product-card__image" href="' + href + '" aria-label="Ver ' + escapeHtml(product.name) + '">',
        '<img src="' + escapeHtml(product.image) + '" alt="Embalagem ilustrativa de ' + escapeHtml(product.name) + '" width="820" height="1230" loading="lazy">',
        '<span class="product-card__category">' + escapeHtml(product.category) + '</span>',
        '<span class="product-card__view" aria-hidden="true">Ver detalhes ↗</span>',
      '</a>',
      '<div class="product-card__body">',
        '<p class="product-card__brand">' + escapeHtml(product.brand) + '</p>',
        '<h3><a href="' + href + '">' + escapeHtml(product.name) + '</a></h3>',
        '<p class="product-card__description">' + escapeHtml(product.shortDescription) + '</p>',
        '<div class="product-card__meta"><span>' + escapeHtml(product.volume) + '</span><span>Consulte condições comerciais</span></div>',
      '</div>',
    '</article>'
  ].join('');
}

export function renderProductCards(container, products, options = {}) {
  container.innerHTML = products.map((product) => createProductCard(product, options)).join('');
}
