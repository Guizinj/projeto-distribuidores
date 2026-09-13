import { initSiteShell } from './components/site-shell.js';
import { renderProductCards } from './components/product-card.js';
import { initReveals } from './components/reveal.js';
import { productService } from './services/product-service.js';

const state = { category: '', brand: '', query: '' };

function updateUrl() {
  const params = new URLSearchParams();
  if (state.category) params.set('categoria', state.category);
  if (state.brand) params.set('marca', state.brand);
  if (state.query) params.set('busca', state.query);
  const queryString = params.toString();
  history.replaceState(null, '', 'catalogo.html' + (queryString ? '?' + queryString : ''));
}

async function initCatalog() {
  initSiteShell();
  const params = new URLSearchParams(window.location.search);
  const categories = await productService.getCategories();
  const brands = await productService.getBrands();
  state.category = categories.includes(params.get('categoria')) ? params.get('categoria') : '';
  state.brand = brands.includes(params.get('marca')) ? params.get('marca') : '';
  state.query = params.get('busca') || '';

  const chipContainer = document.querySelector('[data-category-filters]');
  const brandSelect = document.querySelector('[data-brand-filter]');
  const searchInput = document.querySelector('[data-search-input]');
  const grid = document.querySelector('[data-catalog-grid]');
  const count = document.querySelector('[data-result-count]');
  const clear = document.querySelector('[data-clear-filters]');
  const empty = document.querySelector('[data-empty-state]');

  chipContainer.innerHTML = ['', ...categories].map((category) => {
    const label = category || 'Todos';
    const selected = state.category === category;
    return '<button class="filter-chip" type="button" data-category="' + category + '" aria-pressed="' + selected + '">' + label + '</button>';
  }).join('');
  brandSelect.insertAdjacentHTML('beforeend', brands.map((brand) => '<option value="' + brand + '">' + brand + '</option>').join(''));
  brandSelect.value = state.brand;
  searchInput.value = state.query;

  const render = async () => {
    const filtered = await productService.filter(state);
    renderProductCards(grid, filtered);
    grid.hidden = filtered.length === 0;
    empty.hidden = filtered.length !== 0;
    count.textContent = filtered.length + (filtered.length === 1 ? ' produto selecionado' : ' produtos selecionados');
    clear.hidden = !state.category && !state.brand && !state.query;
    chipContainer.querySelectorAll('[data-category]').forEach((chip) => {
      chip.setAttribute('aria-pressed', String(chip.dataset.category === state.category));
    });
    updateUrl();
    initReveals(grid);
  };

  chipContainer.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-category]');
    if (!chip) return;
    state.category = chip.dataset.category;
    render();
  });
  brandSelect.addEventListener('change', () => {
    state.brand = brandSelect.value;
    render();
  });
  searchInput.addEventListener('input', () => {
    state.query = searchInput.value.trim();
    render();
  });

  const clearFilters = () => {
    state.category = '';
    state.brand = '';
    state.query = '';
    brandSelect.value = '';
    searchInput.value = '';
    render();
  };
  clear.addEventListener('click', clearFilters);
  document.querySelector('[data-empty-clear]').addEventListener('click', clearFilters);

  await render();
  initReveals();
}

initCatalog();
