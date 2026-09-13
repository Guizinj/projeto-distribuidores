# Contexto permanente do projeto

## Visão geral

Este repositório contém o site comercial da **MATEUS LIRA JL**, uma distribuidora B2B de cosméticos capilares profissionais. O público é formado exclusivamente por salões de beleza de alto padrão. A experiência tem aparência de e-commerce premium, mas a conversão é consultiva e acontece pelo WhatsApp; não há compra online.

O produto atual já possui direção visual e arquitetura aprovadas. Preserve o que funciona e altere somente o que for solicitado. Não redesenhe áreas estáveis nem faça “melhorias” espontâneas fora do escopo da tarefa.

## Stack e páginas

- HTML, CSS e JavaScript puro.
- ES Modules nativos.
- Sem framework, bundler, npm obrigatório ou backend.
- `index.html`: home institucional e comercial.
- `catalogo.html`: catálogo com busca e filtros.
- `produto.html?id=<id>`: detalhe do produto e relacionados.

O projeto deve ser servido por HTTP durante o desenvolvimento porque usa ES Modules.

## Princípios arquiteturais

- Mantenha responsabilidades separadas entre HTML, estilos, componentes, serviços e dados.
- Componentes nunca devem depender diretamente da origem dos dados.
- `js/services/product-service.js` é a única porta de acesso ao catálogo para as páginas.
- `js/data/products.js` expõe o contrato consumido pelo serviço.
- `js/data/products-selecionados.js` consolida os catálogos de Impactos e ÉLURE.
- Uma integração futura com Supabase deve substituir apenas a implementação da fonte no serviço, preservando componentes e páginas.
- Evite duplicação, scripts inline, estilos inline e dependências sem necessidade.

## Arquitetura white-label

Nome, wordmark, subtítulo, WhatsApp, Instagram, e-mail, região e cores configuráveis pertencem exclusivamente a `js/config.js`.

- Não espalhe dados comerciais por HTML, CSS ou outros módulos.
- Não reverta a identidade atual para nomes antigos de protótipo.
- Não altere marca ou contatos sem solicitação explícita.
- Componentes de header, footer, títulos e links devem consumir `businessConfig`.

## Direção visual permanente

A linguagem é luxo contemporâneo, editorial, premium e minimalista. Ela depende de proporção, tipografia, fotografia forte, ritmo e bastante espaço negativo.

- Paleta: preto profundo, grafite, off-white, branco quente e champagne apenas pontual.
- Tipografia oficial: **Cormorant Garamond** em títulos/editorial e **Inter** em interface/corpo.
- Preserve hero, header, footer, grids, cards, bordas, espaçamentos, hovers, animações e comportamento de scroll salvo pedido explícito.

Regressões visuais proibidas:

- aparência de template de IA;
- estética de startup ou SaaS;
- neon ou glow exagerado;
- dourado como cor dominante;
- glassmorphism indiscriminado;
- sombras pesadas, gradientes chamativos ou decoração sem função.

## Mobile-first, acessibilidade e performance

- Desenvolva mobile-first e valide smartphones, tablets, notebooks e telas grandes.
- Não aceite overflow horizontal; filtros móveis podem rolar apenas dentro do próprio trilho.
- Preserve HTML semântico, textos alternativos, labels, foco visível e navegação por teclado.
- Use ARIA somente quando necessário e mantenha o menu móvel operável por teclado e `Escape`.
- Respeite `prefers-reduced-motion`.
- Preserve lazy loading para imagens fora da primeira dobra.
- Prefira assets otimizados e JavaScript enxuto; não adicione bibliotecas para tarefas resolvíveis nativamente.

## Regras do catálogo

- Não invente produtos, nomes, volumes, benefícios ou alegações para marcas reais.
- Use dados aprovados em `js/data/`; o pacote `codex-material-produtos/` é a referência desta seleção.
- Cada produto deve apontar para sua própria imagem correspondente.
- Nunca repita arbitrariamente um asset para representar itens diferentes.
- Preserve as categorias: Hidratação, Nutrição, Reconstrução, Progressivos e Finalização.
- Preserve o schema existente: `id`, `brand`, `line`, `name`, `category`, `volume`, descrições, benefícios, indicação, uso, imagem e destaque.
- Cards, busca, filtros, relacionados e URLs `produto.html?id=...` devem continuar usando `product-service`.

## WhatsApp

- O número vem sempre de `businessConfig.whatsapp`.
- Mensagens gerais e contextuais são montadas em `js/utils/whatsapp.js`.
- Preserve `encodeURIComponent()` e inclua nome e volume do produto quando aplicável.
- Não espalhe números ou URLs `wa.me` hardcoded.
- O WhatsApp só abre após interação explícita do visitante.

## Fora do escopo atual

Não implementar sem solicitação expressa:

- checkout, carrinho, pagamento ou pedidos online;
- login, cadastro, autenticação ou painel administrativo;
- backend, CMS, analytics ou dashboards;
- geolocalização, múltiplos distribuidores ou roteamento territorial;
- Supabase, SDK, variáveis de ambiente ou banco de dados.

Supabase é apenas uma evolução futura. Quando autorizado, preserve `product-service` e troque somente a origem dos produtos.

## Disciplina de mudanças

- Leia o projeto e o briefing da rodada antes de editar.
- Verifique o estado do Git e preserve mudanças existentes do usuário.
- Identifique o menor conjunto de arquivos necessário.
- Não refatore ou redesenhe áreas que não fazem parte do pedido.
- Não altere a identidade comercial como efeito colateral.
- Para produtos reais, prefira sempre os materiais fornecidos a conteúdo inventado ou imagens alternativas.

## Checklist de regressão

Antes de concluir qualquer mudança relevante, valide:

- home, catálogo e produto em desktop e mobile;
- menu móvel, foco e fechamento com `Escape`;
- busca, filtros, contagem e estado vazio;
- query string do produto e estado inexistente;
- produtos relacionados;
- CTA geral e WhatsApp contextual;
- correspondência única entre produto e imagem;
- ausência de overflow;
- fontes Cormorant Garamond e Inter carregadas;
- imports, assets, links e sintaxe JavaScript;
- console do navegador sem erros.
