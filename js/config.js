export const businessConfig = Object.freeze({
  name: 'MATEUS LIRA JL',
  wordmark: 'MATEUS LIRA',
  subtitle: 'Distribuidor Profissional',
  whatsapp: '5581979007035',
  instagram: '@mateuslirajl',
  instagramUrl: 'https://instagram.com/mateuslirajl',
  email: 'atendimento@mateuslira.com.br',
  region: 'Atendimento profissional',
  theme: {
    accent: '#aa8d63',
    ink: '#171715',
    paper: '#f4f1eb'
  }
});

export function applyBusinessTheme() {
  const root = document.documentElement;
  root.style.setProperty('--color-accent', businessConfig.theme.accent);
  root.style.setProperty('--color-ink', businessConfig.theme.ink);
  root.style.setProperty('--color-paper', businessConfig.theme.paper);
}
