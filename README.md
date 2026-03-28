# QA Engineer Portfolio

A lightweight, static portfolio website for a QA Engineer / Test Engineer / SDET profile.

The project is intentionally small and framework-free. The goal is not to maximize features, but to communicate engineering judgment, quality thinking, and delivery discipline through both the site itself and the repository around it.

## Why this project exists

This repository is designed to signal a few things clearly:

- calm, modern visual execution
- semantic HTML and readable hand-written CSS
- minimal JavaScript used only for progressive enhancement
- lightweight quality tooling
- practical smoke coverage with Playwright
- GitHub Pages-friendly delivery with minimal deployment complexity

## Stack

- HTML5
- CSS3
- Vanilla JavaScript
- npm for local tooling
- Prettier
- ESLint
- Playwright
- GitHub Actions
- GitHub Pages

## Site sections

The portfolio is a one-page static site with these sections:

- Hero
- About
- Projects
- Skills
- Approach
- Contact
- Footer

The repository also includes:

- custom `404.html`
- SVG favicon
- CI workflow
- GitHub Pages deployment workflow
- one lightweight ADR

## Repository structure

```text
.
├── 404.html
├── assets
│   ├── css
│   │   └── styles.css
│   ├── icons
│   │   └── favicon.svg
│   └── js
│       └── main.js
├── docs
│   └── adr
│       └── 0001-static-and-framework-free.md
├── tests
│   └── e2e
│       └── home.spec.js
├── .github
│   └── workflows
│       ├── ci.yml
│       └── deploy.yml
├── .editorconfig
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```

## Local development

Install dependencies:

```bash
npm install
npx playwright install chromium
```

Run a local static server:

```bash
npm run serve
```

Open:

```text
http://localhost:4173
```

## Quality checks

Run formatting, linting, and smoke tests:

```bash
npm run check
```

Run only Playwright smoke tests:

```bash
npm run test:e2e
```

Run Playwright in headed mode:

```bash
npm run test:e2e:headed
```

## What the smoke tests cover

The Playwright suite keeps coverage intentionally lean. It checks:

- homepage load
- document title
- core sections presence
- hero rendering
- keyboard access to the skip link
- navigation anchor behavior
- project link structure
- contact links
- custom `404.html`
- narrow mobile viewport sanity

## Deployment

The site is deployed through GitHub Actions to GitHub Pages.

Deployment flow:

1. push to `main`
2. GitHub Actions prepares a static Pages artifact
3. GitHub Pages serves the portfolio

No production build step is required.

## Content placeholders

This repository currently includes intentional placeholder values for:

- email address
- GitHub profile handle
- LinkedIn profile handle
- project repository links

These should be replaced before the final public publishing pass.

## Design direction

The visual system is intentionally restrained:

- neutral palette
- typography-led hierarchy
- spacing-led polish
- subtle borders
- minimal shadow use
- no framework styling
- no decorative noise

## Notes on scope

This project deliberately does **not** include:

- React or any front-end framework
- CMS features
- blog functionality
- backend contact form
- heavy animation
- design-system over-abstraction
- visual regression tooling
- test theater

The intent is proportion, clarity, and maintainability.

## License

This project is provided as a portfolio example. Add a license if you want to publish reuse terms explicitly.
