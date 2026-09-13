# Velora Professional

Protótipo comercial estático de uma distribuidora B2B de cosméticos capilares profissionais. O projeto usa somente HTML, CSS e JavaScript puro, sem build, dependências, frameworks ou backend.

## Visualização

Sirva a pasta por qualquer servidor HTTP estático e acesse `index.html`. ES Modules exigem contexto HTTP; não há instalação ou compilação.

Exemplos de rotas:

- `index.html`
- `catalogo.html?categoria=Reconstrução`
- `produto.html?id=fiber-architecture-mask`

## Personalização white-label

Os dados comerciais e os tokens de identidade estão centralizados em `js/config.js`. Nome, subtítulo, WhatsApp, Instagram, e-mail, região e cores básicas podem ser alterados ali sem modificar os componentes.

O catálogo consome exclusivamente `js/services/product-service.js`. Uma integração futura com Supabase pode substituir a origem mockada dentro desse serviço, preservando cards e páginas.
