# SIXT — Landing Page

> Tecnologia, estratégia e soluções digitais para empresas que buscam evoluir.

Landing page institucional da **SIXT**, reconstruída como uma aplicação **React** com identidade visual própria — preto + roxo + branco, sistema de nodes e conexões, composição editorial e um círculo roxo que guia a jornada do usuário pelo scroll.

---

## Índice

1. [Visão geral](#visão-geral)
2. [Stack técnica](#stack-técnica)
3. [Migração realizada](#migração-realizada)
4. [Design System](#design-system)
5. [Estrutura do projeto](#estrutura-do-projeto)
6. [Seções da página](#seções-da-página)
7. [Componentes principais](#componentes-principais)
8. [Funcionalidades em destaque](#funcionalidades-em-destaque)
9. [Acessibilidade](#acessibilidade)
10. [Performance](#performance)
11. [Responsividade](#responsividade)
12. [Como rodar](#como-rodar)
13. [Conteúdo editável](#conteúdo-editável)
14. [Legado](#legado)

---

## Visão geral

O projeto nasceu como uma página estática em HTML/CSS/JS e foi migrado para uma aplicação React moderna, preservando 100% do conteúdo original (serviços, equipe e canais de contato) e ganhando uma direção de arte profissional:

- **Essência**: clareza + inteligência + movimento + transformação + resultado
- **Narrativa visual**: nodes (`● ◉ ◎`) representam pontos; linhas representam conexões; o movimento representa evolução
- **Assinatura**: um círculo roxo que percorre a página inteira conforme o scroll, conectando as seções como as etapas de um processo

---

## Stack técnica

| Ferramenta | Versão | Uso |
|---|---|---|
| [React](https://react.dev) | 18.x | UI declarativa |
| [Vite](https://vitejs.dev) | 5.x | Build e dev server |
| [Swiper](https://swiperjs.com) | 11.x | Carrossel da equipe |
| CSS tradicional | — | Sem frameworks (sem Tailwind), tokens em variáveis CSS |

Sem dependências de animação externas — todas as animações são feitas com CSS transitions/keyframes, `requestAnimationFrame` e `IntersectionObserver`.

---

## Migração realizada

### Antes (pasta `SIXT/` — legado)
- `index.html` + `style.css` + `script.js`
- Seções: Header, Hero, Catálogo de serviços (7 itens), Equipe (6 integrantes), Social
- JS imperativo: reveals via IntersectionObserver, scroll spy, navegação suave, parallax no hero

### Depois (raiz do repositório)
- Aplicação React componentizada com Vite
- Todo o conteúdo editável vive em `src/data/content.js` — a copy segue a plataforma de marca oficial ("Entender antes de criar."): 4 categorias de serviço com preços, metodologia em 5 etapas, tom de voz consultivo e sem clichês
- Fotos da equipe baixadas do CDN temporário do Discord para `src/assets/team/` (as URLs assinadas expiravam)
- Correções aproveitadas na migração: typo `malito:` → `mailto:` nos links de e-mail

---

## Design System

Tokens centralizados em [`src/styles/variables.css`](src/styles/variables.css).

### Cores

```text
Primary
├── Black            #000000
├── Six Purple       #8A00FF
└── White            #FFFFFF

Secondary
├── Purple Dark      #5C00B8
├── Purple Bright    #A94DFF
└── Purple Soft      #D9B3FF

Neutrals
└── #080808 / #111111 / #1A1A1A / #292929 /
    #666666 / #B8B8B8 / #EAEAEA / #F7F7F7
```

### Tipografia

| Função | Fonte | Pesos |
|---|---|---|
| Headings | Space Grotesk | 500–700 (600 principal) |
| Body / UI | Montserrat | 400–700 |

Escalas responsivas via `clamp()`:
- H1: até 64px (desktop) → 28px (mobile)
- H2: até 36px → 20px
- H3: até 28px → 18px
- Body: 18/16/14px com line-heights proporcionais

### Espaçamento

Base 8px: `4 · 8 · 16 · 24 · 32 · 40 · 48 · 64 · 80 · 96`

### Ritmo de seções

Alternância dark/light para criar ritmo narrativo:

```text
HERO (dark) → SERVIÇOS (light) → MOVIMENTO (dark) → MANIFESTO (light) → EQUIPE (dark) → CONTATO (light) → FOOTER (black)
```

### Botões

- **Primary**: fundo `#8A00FF`, hover `#A94DFF`, active `#5C00B8`, raio 12px
- **Secondary**: transparente com borda roxa, hover com tint translúcido
- Tamanhos `--md` (52px) e `--sm` (40px); largura total em telas ≤380px

---

## Estrutura do projeto

```text
sixt-landing/
├── index.html                  # Entrada (fontes Google, favicon SVG)
├── package.json
├── vite.config.js
├── SIXT/                       # Projeto legado preservado
└── src/
    ├── main.jsx                # Bootstrap + ordem de estilos
    ├── App.jsx                 # Composição: Navbar → main → Footer
    ├── styles/
    │   ├── variables.css       # Tokens do Design System
    │   ├── globals.css         # Reset, layout, tipografia base
    │   └── animations.css      # Reveal + prefers-reduced-motion
    ├── data/
    │   └── content.js          # TODO o conteúdo editável
    ├── assets/team/            # Fotos dos integrantes
    ├── components/
    │   ├── Navbar/             # Fixa, scroll spy, menu mobile
    │   ├── Footer/
    │   ├── ScrollJourney/      # ★ Círculo roxo guiado por scroll
    │   ├── GrowthChart/        # ★ Gráfico interativo da hero
    │   ├── SectionHeader.jsx   # Label + título + descrição
    │   ├── Reveal.jsx          # Animação de entrada compartilhada
    │   ├── Node.jsx            # Sistema ● ◉ ◎ + DotLine
    │   ├── Button.css          # Variantes primary/secondary
    │   └── icons.jsx           # Ícones lineares SVG (stroke 1.5–2px)
    └── sections/
        ├── Hero/
        ├── Services/
        ├── Movement/
        ├── Manifesto/
        ├── Team/
        └── Contact/
```

---

## Seções da página

| # | Seção | ID | Tema | Conteúdo |
|---|---|---|---|---|
| — | Hero | `#inicio` | escuro | Tagline "Entender antes de criar.", gráfico de crescimento, CTAs |
| 01 | Serviços | `#servicos` | claro | Acordeão editorial com 4 categorias (Diagnóstico, Identidade Visual, Sites, Automações) e preços-tabela |
| 02 | Metodologia | `#movimento` | escuro | Timeline Entender → Diagnosticar → Definir → Construir → Evoluir |
| — | Manifesto | `#sobre` | claro | Composição tipográfica grande ("Criar mais não significa resolver mais.") + princípios Entender/Criar/Evoluir |
| 03 | Equipe | `#equipe` | escuro | Carrossel Swiper (3 por vez no desktop) |
| 04 | Contato | `#contato` | claro | CTA de e-mail + Instagram/GitHub/E-mail |

---

## Componentes principais

### Navbar
- Fixa no topo; ao scrollar ganha fundo sólido quase opaco (**sem `backdrop-filter`** — causava borrão/dark patch durante o scroll)
- Links com underline animado e **scroll spy** via `IntersectionObserver`
- CTA "[ Vamos conversar ]"
- **Menu mobile**: fullscreen, fora do fluxo (`position: absolute`) para nunca alterar a altura da barra, links grandes com nodes, fecha com Esc, trava o scroll do body

### ScrollJourney (assinatura do site)
- Círculo roxo que percorre toda a página vinculado ao progresso do scroll
- Trajetória em curvas Bézier com tangentes verticais, alternando esquerda/direita entre seções
- Linha desenhada progressivamente (`stroke-dashoffset`)
- **Smooth follow**: `requestAnimationFrame` + lerp (fator 0.11) — fluido sem parecer lento
- Marcadores nos waypoints que acendem quando o círculo passa
- Microinterações: círculo cresce perto de cada etapa e ganha estado final "impacto" no fim
- Atualiza apenas `transform`/`opacity`; respeita `prefers-reduced-motion` (linha estática completa)

### GrowthChart (hero)
- Painel analítico "CRESCIMENTO" com curva que conta a narrativa: ESTRATÉGIA → DESIGN → TECNOLOGIA → RESULTADO → IMPACTO
- Linha se desenhando na carga, área com gradiente sutil, nodes que populam em sequência
- **Interativo**: mouse/toque move uma linha de scan e destaca o ponto mais próximo com tooltip
- `touch-action: pan-y` para não travar o scroll no celular

### Carrossel da equipe (Swiper)
- 3 slides no desktop (>1024px), 2 no tablet (≥640px), 1 no mobile
- Loop habilitado, botões circulares com chevrons (desabilitam nos limites), teclado ← →, módulo A11y
- Paginação com bullets que alongam em roxo
- Cards com altura igualada e foto em grayscale que colore no hover

### Sistema de Nodes
- `Node`: variantes `dot` ●, `core` ◉, `ring` ◎, `outline`, com pulso opcional
- `DotLine`: dois pontos conectados por linha — usado na hero e rodapé
- Presente em todos os cantos do site de forma consistente

---

## Acessibilidade

- Skip link "Pular para o conteúdo"
- HTML semântico (`header`, `main`, `section`, `nav`, `article`, `footer`)
- `aria-label` em botões de ícone e navegações; `aria-modal` no menu mobile
- Foco visível (outline roxo claro com offset)
- Navegação por teclado: menu (Esc fecha), carrossel (setas)
- Contraste adequado nos dois temas
- `alt` descritivo nas fotos da equipe
- `@media (prefers-reduced-motion: reduce)`: desliga reveals, pulsações e o loop do círculo (mantém informação)
- `scroll-margin-top` nas seções para âncoras não caírem sob a navbar fixa

---

## Performance

- Apenas `transform`/`opacity` animados (nada de top/left/width/height)
- Um único listener de scroll passivo + um loop de rAF no site inteiro
- Observer de reveals compartilhado entre todos os componentes
- Imagens com `loading="lazy"` e `decoding="async"`
- Sem listeners pesados por elemento (padrão antigo substituído por observers)
- Bundle final: ~85KB gzip (JS) + ~8KB gzip (CSS)

---

## Responsividade

Breakpoints trabalhados: **380px · 640px · 720px · 900px · 1024px · 1099px · 1200px**

- Mobile: trajetória do círculo simplificada, elementos decorativos reduzidos, nodes importantes preservados
- Hero centralizada em qualquer tela; gráfico abaixo do texto sempre
- Menu dedicado no mobile (hambúrguer → overlay)
- Sem overflow horizontal (`overflow-x: clip` + dimensões contidas)
- Testado nas larguras-alvo: 320 / 375 / 390 / 430 (mobile) e 1280 / 1440 / 1920 (desktop)

---

## Como rodar

```bash
# Instalar dependências
npm install

# Ambiente de desenvolvimento
npm run dev

# Build de produção (pasta dist/)
npm run build

# Preview do build
npm run preview
```

---

## Conteúdo editável

Todo o texto do site vive em um único arquivo: [`src/data/content.js`](src/data/content.js)

```js
NAV_LINKS       // Links da navbar
SERVICES        // Os 7 serviços (número, ícone, título, descrição, destaque)
MOVEMENT_STEPS  // Etapas do processo (label + estado do node + texto)
TEAM            // Integrantes (nome, foto, bio, LinkedIn, GitHub)
SOCIALS         // Canais de contato (Instagram, GitHub, E-mail)
```

Para trocar a foto de alguém: substitua o arquivo em `src/assets/team/` mantendo o nome.

---