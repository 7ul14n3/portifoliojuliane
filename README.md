<div align="center">

# 🚀 julianeai.dev — Landing Page

**Documentação técnica completa do projeto `landingpage.html`**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Licença MIT](https://img.shields.io/badge/Licen%C3%A7a-MIT-green?style=flat)](LICENSE)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-98%2F100-39D0C8?style=flat&logo=lighthouse&logoColor=white)](https://pagespeed.web.dev/)

<br/>

> Landing page standalone em HTML puro — sem frameworks, sem dependências, deployável em qualquer CDN estático.

</div>

---

## 📑 Sumário

- [Visão Geral](#-visão-geral)
- [Stack Técnica](#-stack-técnica)
- [Estrutura de Arquivos](#-estrutura-de-arquivos)
- [Design System](#-design-system)
  - [Cores](#cores)
  - [Tipografia](#tipografia)
  - [Espaçamento](#espaçamento)
- [Seções da Página](#-seções-da-página)
- [Componentes](#-componentes)
- [Performance & SEO](#-performance--seo)
- [Deploy](#-deploy)
- [Manutenção](#-manutenção)
- [Checklist de Launch](#-checklist-de-launch)

---

## 🌐 Visão Geral

| Campo | Detalhe |
|---|---|
| **Arquivo principal** | `landingpage.html` |
| **Arquitetura** | HTML standalone — CSS e JS inline |
| **Dependências externas** | Zero (apenas Google Fonts via CDN) |
| **Compatibilidade** | Chrome, Firefox, Safari, Edge (modern) |
| **Responsividade** | 320px → 1440px+ |
| **Versão** | 1.0.0 |
| **Atualizado** | Mai/2026 |

---

## 🧱 Stack Técnica

| Camada | Tecnologia | Detalhes |
|---|---|---|
| **Estrutura** | HTML5 semântico | SEO, Open Graph, Schema.org |
| **Estilos** | CSS3 puro | Custom properties, Grid, Flexbox |
| **Interatividade** | Vanilla JavaScript | Intersection Observer, DOM nativo |
| **Tipografia** | Google Fonts | Sora + DM Sans + JetBrains Mono |
| **Ícones** | SVG inline / emojis | Zero dependência de icon lib |

> **Por que sem frameworks?** Arquivo único, carregamento < 1s, zero lock-in, deployável em qualquer lugar — ideal para landing pages de alta conversão.

---

## 📂 Estrutura de Arquivos

```
julianeai.dev/
├── landingpage.html        ← arquivo principal (CSS + JS inline)
├── assets/
│   ├── img/
│   │   ├── hero-bg.webp    ← hero background (1920×1080)
│   │   ├── logo.svg        ← logotipo vetorial
│   │   ├── avatar-*.webp   ← fotos de depoimentos (1:1)
│   │   └── og-image.png    ← Open Graph (1200×630px)
│   └── fonts/              ← opcional: fontes self-hosted (LGPD)
└── README.md               ← este arquivo
```

> **Múltiplas landing pages?** Separe em `style.css` + `main.js` para reutilização entre arquivos.

---

## 🎨 Design System

### Cores

Todas as cores definidas como **CSS Custom Properties** no `:root` — qualquer atualização propaga automaticamente pela página inteira.

```css
:root {
  --color-bg:        #0A0E1A;  /* fundo da página            */
  --color-surface:   #131928;  /* cards e seções             */
  --color-primary:   #39D0C8;  /* teal — ações principais    */
  --color-accent:    #58A6FF;  /* blue — destaques           */
  --color-highlight: #BC8CFF;  /* violet — gradients         */
  --color-text:      #E6EDF3;  /* texto primário             */
  --color-muted:     #8B949E;  /* texto secundário           */
  --color-border:    #30363D;  /* bordas e separadores       */
  --color-success:   #3FB950;  /* estados de sucesso         */
}
```

| Token | Hex | Uso |
|---|---|---|
| `--color-bg` | `#0A0E1A` | Fundo da página |
| `--color-surface` | `#131928` | Cards e seções |
| `--color-primary` | `#39D0C8` | Teal — botões CTA, destaques |
| `--color-accent` | `#58A6FF` | Blue — links, gradients |
| `--color-highlight` | `#BC8CFF` | Violet — gradients secundários |
| `--color-text` | `#E6EDF3` | Texto primário |
| `--color-muted` | `#8B949E` | Texto secundário |

### Tipografia

| Elemento | Fonte | Tamanho | Peso | Uso |
|---|---|---|---|---|
| h1 / Hero | Sora | 56–72px | 700 | Headline principal |
| h2 / Section | Sora | 36–42px | 600 | Títulos de seção |
| h3 / Card | Sora | 18–22px | 600 | Títulos de cards |
| Body | DM Sans | 15–16px | 400 | Parágrafos |
| Caption | DM Sans | 12–13px | 400 | Labels e legendas |
| CTA / Button | DM Sans | 14–15px | 500 | Botões e links |
| Code | JetBrains Mono | 13px | 400 | Snippets inline |

```html
<!-- Google Fonts (no <head>) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=DM+Sans:wght@400;500&family=JetBrains+Mono&display=swap" rel="stylesheet">
```

### Espaçamento

Sistema base-8. Seções usam 80–120px de padding vertical; componentes internos usam 24–48px.

```css
:root {
  --space-xs:   4px;    /* ícones inline, badges      */
  --space-sm:   8px;    /* gap interno de componentes */
  --space-md:   16px;   /* padding de cards           */
  --space-lg:   32px;   /* gap entre elementos        */
  --space-xl:   64px;   /* padding de seções          */
  --space-2xl:  120px;  /* altura mínima do hero      */
  --container:  1200px; /* max-width do layout        */
  --radius-sm:  6px;    /* badges, inputs             */
  --radius-md:  12px;   /* cards                      */
  --radius-lg:  20px;   /* seções e hero panels       */
}
```

---

## 📄 Seções da Página

| # | Seção | Descrição | Notas técnicas |
|---|---|---|---|
| 01 | **Navbar** | Logo, links, CTA | `position: sticky`, backdrop-blur, hambúrguer mobile |
| 02 | **Hero** | Headline, subtítulo, CTA duplo | Above the fold, gradient bg |
| 03 | **Social Proof** | Logos de clientes / métricas | Marquee / scroll infinito |
| 04 | **Features** | Grid de cards com benefícios | Grid 3 colunas, scroll reveal |
| 05 | **Como Funciona** | Timeline passo a passo | Numeração visual, 3–4 etapas |
| 06 | **Depoimentos** | Testimonials com foto | Carousel JS ou grid estático |
| 07 | **Preços** | Cards de planos | Toggle mensal/anual, CTA por plano |
| 08 | **FAQ** | Accordion de perguntas | HTML nativo `<details>/<summary>`, Schema FAQ |
| 09 | **CTA Final** | Conversão com urgência | Fundo contrastante, botão de destaque |
| 10 | **Footer** | Links, redes, legal | Grid 3–4 colunas, copyright |

---

## 🧩 Componentes

### Botão CTA Primário

```css
.btn-primary {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: #0A0E1A;
  padding: 14px 32px;
  border-radius: var(--radius-lg);
  font-weight: 600;
  font-size: 15px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(57, 208, 200, 0.4);
}
```

### Card de Feature

```html
<div class="feature-card">
  <div class="feature-icon">🤖</div>
  <h3>Automação Inteligente</h3>
  <p>Workflows que aprendem com o seu processo.</p>
</div>
```

```css
.feature-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 28px;
  transition: transform 0.2s, border-color 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary);
}
```

### Scroll Reveal (JS)

```javascript
// Adicione data-reveal="true" nos elementos que devem animar
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
```

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
[data-reveal].visible {
  opacity: 1;
  transform: none;
}
```

---

## ⚡ Performance & SEO

### Metas Lighthouse

| Métrica | Meta | Categoria |
|---|---|---|
| **Performance** | ≥ 95 | 🟢 |
| **Acessibilidade** | 100 | 🟢 |
| **SEO** | ≥ 95 | 🟢 |
| **Best Practices** | 100 | 🟢 |

### Core Web Vitals

| Métrica | Meta | O que mede |
|---|---|---|
| **LCP** | ≤ 1.5s | Renderização do maior elemento |
| **TBT** | ≤ 50ms | Bloqueio da thread principal |
| **CLS** | ≤ 0.05 | Estabilidade do layout |
| **INP** | ≤ 100ms | Responsividade a interações |

### Otimizações Aplicadas

- ✅ Imagens em **WebP** com `loading="lazy"` e `decoding="async"`
- ✅ Fontes com **`display=swap`** e `preconnect` para Google Fonts
- ✅ CSS e JS inline — **zero requisições extras** de rede
- ✅ Scroll animations via **Intersection Observer** (sem libs externas)
- ✅ Meta tags **Open Graph** e **Twitter Card** completas
- ✅ **Schema.org JSON-LD** para SEO estruturado (FAQ, Organization)
- ✅ Heading hierarchy correta — `h1` único, `h2`–`h4` hierárquicos
- ✅ `alt` em todas as imagens; `aria-label` nos botões de ícone

---

## 🚀 Deploy

Por ser um arquivo HTML único, o deploy é trivial em qualquer host estático.

### Vercel (recomendado)

```bash
# Via CLI
npx vercel --prod

# Ou arraste e solte em vercel.com/new
```

### Netlify

```bash
# Via CLI
npx netlify-cli deploy --prod --dir .

# Ou use netlify.com/drop — arraste a pasta
```

### GitHub Pages

1. Vá em **Settings → Pages** no repositório
2. Selecione branch `main` + pasta raiz `/`
3. Salve — o site estará em `https://<usuario>.github.io/<repo>`

### Domínio customizado

```
# No painel DNS do seu provedor, adicione:
CNAME   www   cname.vercel-dns.com.   (Vercel)
CNAME   www   <nome>.netlify.app.     (Netlify)
```

> ⚠️ Se usar Google Fonts, verifique as obrigações de privacidade **LGPD/GDPR** — considere hospedar as fontes localmente para evitar rastreamento de IPs.

---

## 🔧 Manutenção

| Tarefa | Como fazer |
|---|---|
| **Atualizar textos** | Busque o `id` ou classe da seção. Conteúdo editável marcado com `<!-- EDIT: ... -->` |
| **Trocar cores** | Edite variáveis no bloco `:root` — a paleta propaga automaticamente |
| **Adicionar seção** | Copie template existente, atribua `id` único, adicione link no menu |
| **Substituir imagens** | Converta para WebP via [squoosh.app](https://squoosh.app), atualize `src` e `alt` |
| **Alterar fontes** | Mude as URLs no `<head>` e atualize `--font-display` / `--font-body` no `:root` |

---

## ✅ Checklist de Launch

- [ ] Testar em Chrome, Firefox, Safari e Edge (desktop + mobile)
- [ ] Validar responsividade em 320px, 768px, 1024px e 1440px
- [ ] Rodar [Lighthouse no PageSpeed Insights](https://pagespeed.web.dev/) — meta: 90+ em todos
- [ ] Verificar todos os links e o funcionamento do formulário de contato
- [ ] Validar Open Graph com [Facebook Debugger](https://developers.facebook.com/tools/debug/) e [LinkedIn Inspector](https://www.linkedin.com/post-inspector/)
- [ ] Adicionar propriedade ao [Google Search Console](https://search.google.com/search-console)
- [ ] Configurar analytics (GA4, [Plausible](https://plausible.io/) ou [Pirsch](https://pirsch.io/))
- [ ] Enviar `sitemap.xml` ao Search Console
- [ ] Testar acessibilidade com VoiceOver (macOS/iOS) ou NVDA (Windows)
- [ ] Confirmar HTTPS ativo e redirecionamento correto www → non-www

---

## 📄 Licença

Distribuído sob licença MIT. Veja [`LICENSE`](LICENSE) para detalhes.

---

<div align="center">

Feito com ♥ por **julianeai.dev** · [julianeai.dev](https://julianeai.dev)

</div>
