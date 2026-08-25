# DEVLOG

## 2026-08-25 — Passada de responsividade

### Problema
Hero quebrava em 980px enquanto todas as outras seções usam 900px (layout misto entre 901–980px); bullets do carrossel com área de toque de 8px; micro-breakpoints espalhados (460px vs 480px); texto do eixo do gráfico vira ruído em celulares (~5px renderizado).

### Decisão
Um único breakpoint estrutural (900px) e um de compactação (480px). Área de toque expandida sem mudar o visual. Nada de reestruturar grids que já funcionam.

### Alteração
- Hero: `max-width: 980px` → `900px` (o SVG lateral é fluido e comporta a coluna até 901px).
- Dots da equipe: `::before` com `inset: -10px` (toque ~28px, visual continua 8px).
- Pillars: breakpoint 460px → 480px.
- GrowthChart: baseline escondida abaixo de 480px.

### Motivo
Consistência de breakpoints elimina estados visuais híbridos; alvos de toque são requisito WCAG 2.5.8, não refinamento.

### Arquivos
- `src/sections/Hero/Hero.css`, `src/sections/Pillars/Pillars.css`
- `src/sections/Team/Team.css`
- `src/components/GrowthChart/GrowthChart.css`

---

## 2026-08-25 — Auditoria de design system, tokens e SEO

### Problema
Roxos hardcoded fora dos tokens (8 ocorrências), textos muted sobre preto com contraste ~3.7:1 (falha WCAG AA), escala tipográfica furada (17 tamanhos mágicos recorrentes), pílulas com radius fora do sistema, head sem Open Graph.

### Decisão
Consolidar tudo em tokens existentes ou criar o mínimo justificável (`--text-on-dark-faint`, `--fs-small/caption/overline`, `--z-nav/--z-skip`). Não reestruturar arquitetura — adequada ao porte.

### Alteração
- `index.html`: title com proposta de valor, og:title/description/type, theme-color; removido peso 500 não-usado do Space Grotesk.
- `variables.css`: novos tokens de texto acessível, tipografia auxiliar e z-index globais.
- GrowthChart/ServiceVisual/Node/Hero: rgba(138,0,255) → tokens `purple-line*`/`tint-*`; sombras custom → escala `glow`.
- Footer/Hero/Movement/GrowthChart: cor de texto `neutral-500` → `text-on-dark-faint` (#8c8c8c, ~6.2:1).
- Radius `100px`/`50px` → `var(--radius-btn)`.

### Motivo
Uma única fonte de verdade para cor de marca, tipo e camadas reduz deriva visual e custo de manutenção; contraste é requisito, não preferência.

### Impacto
Zero mudança de identidade visual perceptível (deltas sub-pixel em glows/halos); legibilidade e SEO melhores.

### Arquivos
- `index.html`
- `src/styles/variables.css`, `src/styles/globals.css`
- `src/components/{GrowthChart,ServiceVisual,Node,Footer,Navbar}/*.css`
- `src/sections/{Hero,Movement}/*.css`

---

## 2026-08-25 — Botões unificados no design system

### Problema
Três controles fugiam do `.btn` (toggle do menu, chips sociais do Contact, ícones sociais do Team), cada um com raio/easing/efeito próprios.

### Decisão
O padrão mais recorrente (`.btn`, hover lift -2px + tint/glow, reset no active, easing `--ease-out`) virou a referência única. Button.jsx virou polimórfico com forwardRef (`<a>` quando tem href, `<button>` senão).

### Alteração
- Variante `.btn--icon` (quadrado 40/44px) para controles só-ícone.
- Navbar toggle migrou para `<Button variant="icon">`.
- Chips de Contact: pílula → raio do sistema, hover/active idênticos ao secondary.
- Ícones de Team: círculo 38px/spring → padrão icon-button.
- `--radius-btn` atualizado para `999px` (pílula), alinhando todos os botões à navbar flutuante.

### Motivo
Um componente com variantes elimina divergência futura; estados focus/disabled compartilhados garantem acessibilidade uniforme.

### Arquivos
- `src/components/Button/Button.{jsx,css}`
- `src/components/Navbar/Navbar.{jsx,css}`
- `src/sections/Contact/Contact.css`, `src/sections/Team/Team.css`

---

## 2026-08-25 — Navbar flutuante + menu mobile animado

### Problema
Navbar colada no topo e quadrada; menu mobile abria com fundo duplo (pílula translúcida sobre overlay) e links que sumiam num snap ao fechar; ícone de hamburger estático.

### Decisão
Pílula flutuante com blur; quando o menu abre, a pílula some (`nav--open`) deixando só logo+close sobre o overlay preto liso (sem blob de gradiente). Animações por transições com stagger (não keyframes) para a saída reverter suave. Hambúrguer custom de 2 linhas que morfa em X via `aria-expanded`.

### Alteração
- `.nav` ganhou offset do topo e padding lateral (gutter); centralização segue `margin-inline: auto` do container.
- Menu: entrada deslizando + cascata de links + CTA por último (`--i` inline).
- Hero centralizada em tablet/mobile; link "Início" nos NAV_LINKS.

### Motivo
Transições reversíveis eliminam código de saída; estado visual derivado de ARIA mantém CSS e acessibilidade sincronizados.

### Arquivos
- `src/components/Navbar/Navbar.{jsx,css}`
- `src/data/content.js`, `src/styles/globals.css`

---

## 2026-08-25 — Carrossel de equipe (Swiper) + refinamentos de seção

### Problema
Grid de 3 vira empilhamento longo em mobile; cards desktop esticados (foto 3/4); manifesto com princípios soltos; título de hero genérico.

### Decisão
Swiper condicional via `matchMedia` abaixo de 900px (desktop mantém grid). Controles do carrossel reusam `<Button variant="icon">` e dots com glow do sistema. Manifesto ganhou grade de cards com descrições. Hero: "SOMOS 6." citando os fundadores.

### Alteração
- `Team.jsx/css`: Swiper (1.06 slide mobile c/ peek, 2 no tablet), setas/dots no design system, foto desktop 1/1, override dos SVGs forçados pelo Swiper 14.
- `Manifesto.jsx/css` + `content.js`: princípios como cards (número, título uppercase, descrição).
- `Movement.css`: disco com zona reservada (`padding-bottom: 22%`) separando número e nó proporcionalmente.

### Motivo
Reusar os componentes do sistema nos novos padrões evita criar "segundo estilo"; matchMedia renderiza só um layout por vez (menos DOM que dual-render).

### Arquivos
- `src/sections/Team/Team.{jsx,css}`
- `src/sections/Manifesto/Manifesto.{jsx,css}`, `src/data/content.js`
- `src/sections/Movement/Movement.css`

---

## Backlog (Nice to Have)

- [ ] Comprimir fotos da equipe (jardel.jpg 230KB → WebP ~80KB)
- [ ] Módulo `a11y` do Swiper para anúncios de slide
- [ ] `og:image` quando houver asset de preview
