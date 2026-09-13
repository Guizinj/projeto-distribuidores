import { businessConfig } from '../config.js';

export function buildWhatsAppUrl(product = null) {
  const phone = businessConfig.whatsapp.replace(/\D/g, '');
  const message = product
    ? 'Olá! Vim pelo catálogo profissional da ' + businessConfig.name + ' e gostaria de informações sobre o ' + product.name + ' ' + product.volume + '.'
    : 'Olá! Vim pelo site da ' + businessConfig.name + ' e gostaria de falar com um consultor sobre as linhas profissionais.';

  return 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);
}
