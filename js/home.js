import { initSiteShell } from './components/site-shell.js';
import { renderProductCards } from './components/product-card.js';
import { initReveals } from './components/reveal.js';
import { productService } from './services/product-service.js';

async function initHome() {
  initSiteShell();
  const featured = await productService.getFeatured(4);
  renderProductCards(document.querySelector('[data-featured-products]'), featured, { compact: true });
  initReveals();
}

initHome();
