# MATEUS LIRA JL

Site comercial de uma distribuidora B2B de cosméticos capilares profissionais, criado para apresentar um portfólio premium a salões de beleza de alto padrão e converter o atendimento pelo WhatsApp.

## Sobre o projeto

A experiência combina uma home editorial, catálogo com comportamento de e-commerce e páginas detalhadas de produto. Não há compra online: disponibilidade e condições comerciais são tratadas de forma consultiva.

## Público-alvo

Salões de beleza premium e profissionais que buscam linhas técnicas de hidratação, nutrição, reconstrução, alinhamento e finalização.

## Stack

- HTML5 semântico
- CSS com Custom Properties e abordagem mobile-first
- JavaScript puro com ES Modules
- Sem framework, bundler, backend ou dependências de instalação

## Funcionalidades atuais

- Home institucional e comercial
- Catálogo de 12 produtos reais de Impactos Professional e ÉLURE Professional
- Filtros por categoria e marca
- Busca por produto, marca, categoria ou descrição
- URLs compartilháveis com filtros
- Página de produto por query string
- Produtos relacionados
- Estado de produto inexistente
- CTAs gerais e contextuais para WhatsApp
- Menu móvel, animações de entrada e suporte a movimento reduzido

## Estrutura do projeto

```text
/
├── index.html
├── catalogo.html
├── produto.html
├── assets/
│   ├── images/                  # Fotografia editorial
│   └── products/
│       ├── impactos/            # Imagens reais Impactos
│       └── elure/               # Imagens reais ÉLURE
├── css/                         # Tokens, base, layout, componentes e páginas
├── js/
│   ├── config.js                # Identidade e contatos da distribuidora
│   ├── data/                    # Catálogo aprovado
│   ├── services/                # Acesso desacoplado aos produtos
│   ├── components/              # Shell, cards e animações
│   └── utils/                   # WhatsApp e utilitários de DOM
└── codex-material-produtos/     # Material-fonte da seleção real
```

## Como executar localmente

ES Modules exigem um servidor HTTP. Na raiz do projeto, use uma das opções:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`. Também é possível usar a extensão Live Server do VS Code. Não é necessário instalar dependências nem executar build.

Rotas úteis:

- `index.html`
- `catalogo.html?categoria=Progressivos`
- `produto.html?id=impactos-bioplastia-organic-1l`

## Configuração da distribuidora

Todos os dados white-label ficam em `js/config.js`: nome, wordmark, subtítulo, WhatsApp, Instagram, e-mail, região e cores básicas. Altere-os somente nesse arquivo.

## Catálogo

`js/data/products.js` expõe a seleção consolidada por `products-selecionados.js`, que reúne os módulos de Impactos e ÉLURE. As páginas acessam o catálogo exclusivamente por `js/services/product-service.js`; essa separação permite trocar a fonte de dados no futuro sem reconstruir a interface.

## Adicionando produtos

1. Adicione o objeto no módulo da marca em `js/data/` seguindo o schema existente.
2. Use um `id` único e mantenha uma das categorias já existentes.
3. Coloque a imagem correspondente na pasta da marca em `assets/products/`.
4. Aponte `image` para esse arquivo — cada produto deve usar seu próprio asset.
5. Confirme card, busca, filtro, página de detalhe, relacionados e WhatsApp.

Não invente dados ou alegações para produtos de marcas reais.

## WhatsApp

O número é lido de `businessConfig.whatsapp`. `js/utils/whatsapp.js` monta a mensagem geral ou contextual com nome e volume do produto e aplica `encodeURIComponent()` antes de gerar o link.

## Assets e imagens

Fotografias editoriais ficam em `assets/images/`. Imagens de catálogo ficam separadas por marca em `assets/products/impactos/` e `assets/products/elure/`. Os arquivos WebP da seleção foram fornecidos e não devem ser substituídos, repetidos ou associados a produtos diferentes sem validação.

## Tipografia

- Cormorant Garamond: títulos e linguagem editorial
- Inter: interface, navegação e corpo

As duas famílias são carregadas pelo Google Fonts nas três páginas, com fallbacks definidos em `css/tokens.css`.

## Deploy

O site é totalmente estático. Pode ser publicado no GitHub Pages selecionando a branch de produção e a pasta raiz em **Settings → Pages**. Não existe etapa de build.

## Estado atual

O protótipo possui home, catálogo, detalhes de produto, responsividade e conversão por WhatsApp operacionais. A seleção atual contém 12 produtos reais e representa uma amostra comercial, não os catálogos completos das marcas.

## Fora do escopo atual

Checkout, carrinho, pagamento, login, cadastro, backend, banco de dados, Supabase, painel administrativo, geolocalização e múltiplos distribuidores não estão implementados.

## Evoluções futuras

O roadmap pode incluir Supabase como fonte do catálogo, expansão do portfólio real, múltiplos distribuidores, territorialização e painel administrativo. Essas possibilidades estão apenas documentadas e não fazem parte da versão atual.
