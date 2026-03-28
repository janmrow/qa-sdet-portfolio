# QA Engineer Portfolio

A brutally lightweight, static portfolio website for a QA Engineer / Test Engineer / SDET profile.

The project is intentionally small, framework-free, and contains **zero client-side JavaScript**. The goal is not to maximize features, but to communicate engineering judgment, quality thinking, and delivery discipline through both the site itself and the repository around it.

## Why this project exists

This repository is designed to signal a few things clearly:

- high signal-to-noise ratio in communication
- semantic HTML and readable, hand-written CSS
- absolute zero client-side JavaScript overhead
- lightweight quality tooling (ESLint, Prettier)
- practical smoke coverage with Playwright
- GitHub Pages-friendly delivery with minimal deployment complexity

## Stack

- HTML5
- CSS3 (Vanilla, CSS Variables)
- npm for local tooling
- Prettier & ESLint (for config and test files)
- Playwright
- GitHub Actions
- GitHub Pages

## Site structure

The portfolio is a single-column static site stripped down to the essentials:

- Hero (Introduction & Contact)
- Selected Projects (with inline tech stacks)
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
│   └── icons
│       └── favicon.svg
├── docs
│   └── adr
│       └── 0001-static-and-zero-js.md
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
├── eslint.config.cjs
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

Open `http://localhost:4173` in your browser.

## Quality checks

Run formatting, linting, and smoke tests:

```bash
npm run check
```

Run only Playwright smoke tests:

```bash
npm run test:e2e
```

## What the smoke tests cover

The Playwright suite keeps coverage intentionally lean. It checks:

- homepage load and title
- core sections visibility
- keyboard access to the skip link
- project link structure and external routing
- contact link formats (mailto, https)
- custom `404.html` presence and routing
- narrow mobile viewport sanity

## Deployment

The site is deployed through GitHub Actions to GitHub Pages.

Deployment flow:

1. push to `main`
2. GitHub Actions prepares a static Pages artifact
3. GitHub Pages serves the portfolio

No production build step is required.

## Design direction

The visual system is pragmatic and engineering-focused:

- single-column layout for high readability
- stark contrast with subtle borders
- monospace typography for technical accents and metadata
- no shadows, gradients, or decorative noise

## Notes on scope

This project deliberately does **not** include:

- React or any front-end framework
- client-side JavaScript
- CMS features
- backend contact form
- heavy animation
- design-system over-abstraction

The intent is proportion, clarity, and maintainability.
