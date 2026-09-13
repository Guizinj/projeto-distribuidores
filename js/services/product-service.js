import { products } from '../data/products.js';

const normalize = (value = '') => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .trim();

const catalog = products.map((product, index) => Object.freeze({ ...product, order: index }));

export const productService = {
  async getAll() {
    return [...catalog];
  },

  async getById(id) {
    return catalog.find((product) => product.id === id) ?? null;
  },

  async getFeatured(limit = 4) {
    return catalog.filter((product) => product.featured).slice(0, limit);
  },

  async getRelated(product, limit = 3) {
    if (!product) return [];
    const sameCategory = catalog.filter((item) => item.id !== product.id && item.category === product.category);
    const complementary = catalog.filter((item) => item.id !== product.id && item.category !== product.category);
    return [...sameCategory, ...complementary].slice(0, limit);
  },

  async getCategories() {
    return [...new Set(catalog.map((product) => product.category))];
  },

  async getBrands() {
    return [...new Set(catalog.map((product) => product.brand))];
  },

  async filter({ category = '', brand = '', query = '' } = {}) {
    const normalizedQuery = normalize(query);
    return catalog.filter((product) => {
      const matchesCategory = !category || product.category === category;
      const matchesBrand = !brand || product.brand === brand;
      const searchableText = normalize([product.name, product.brand, product.category, product.shortDescription].join(' '));
      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
      return matchesCategory && matchesBrand && matchesQuery;
    });
  }
};
