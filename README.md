# QA Engineer Portfolio

[![CI](https://github.com/janmrow/qa-sdet-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/janmrow/qa-sdet-portfolio/actions/workflows/ci.yml)
[![Link Checker](https://github.com/janmrow/qa-sdet-portfolio/actions/workflows/link-checker.yml/badge.svg)](https://github.com/janmrow/qa-sdet-portfolio/actions/workflows/link-checker.yml)
[![Deploy to GitHub Pages](https://github.com/janmrow/qa-sdet-portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/janmrow/qa-sdet-portfolio/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A brutally lightweight, high-performance static portfolio designed with a **Zero-JS** philosophy.

This project serves as a live showcase of modern QA engineering practices. The goal is not to maximize features or over-engineer the frontend, but to communicate engineering judgment, quality thinking, and delivery discipline through the site itself and the repository that builds it.

> **Architecture Principle:** "Extreme simplicity is not a limitation; it is the intended architecture." — [ADR 0001: Keep the portfolio static and Zero-JS](docs/adr/0001-static-and-zero-js.md)

## 🏗 The SDET Approach: Quality as a Feature

For a Test Engineer, _how_ a project is tested is just as important as _what_ it looks like. This repository implements a robust, multi-layered quality gate strategy without adding unnecessary weight.

### Automated Testing (Playwright)

The E2E suite goes far beyond simple UI smoke tests. It explicitly validates:

- **Network & Console Integrity:** Fails on any hidden console errors or failed HTTP requests.
- **Accessibility (a11y):** Automated WCAG 2.1 AA compliance audits using `@axe-core/playwright`.
- **Security & SEO:** Strict Content-Security-Policy (CSP) enforcement, JSON-LD structured data validation, and Open Graph meta tags presence.
- **Resilience:** Keyboard navigation routing (skip-links), secure `rel` attributes on external links, and mobile viewport sanity (no horizontal overflow).

### Static Analysis & CI/CD

- **Linting Pipeline:** Enforces standardized configurations using `ESLint` (JS), `Stylelint` (CSS), `HTMLHint` (Semantic HTML), and `Prettier`.
- **Link Integrity:** A scheduled `Lychee` workflow actively monitors the codebase to prevent dead links and bit rot.
- **Optimized CI:** Containerized GitHub Actions using the official Microsoft Playwright image with concurrency control and automated artifact retention.

## 🛠 Tech Stack

| Category            | Technologies                                     |
| :------------------ | :----------------------------------------------- |
| **Core**            | Semantic HTML5, Vanilla CSS3 (Custom Properties) |
| **Testing**         | Playwright, axe-core                             |
| **Static Analysis** | ESLint, Stylelint, HTMLHint, Prettier            |
| **Infrastructure**  | GitHub Actions, GitHub Pages                     |
| **Tooling**         | Node.js v22, npm                                 |

## 🚀 Local Development

The project requires zero build steps for the frontend. All tooling is isolated to local quality checks.

**Prerequisites:** Node.js (v22+) and Python 3.

```bash
# 1. Clone and install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install chromium

# 3. Start the local static server
npm run serve
```

The site will be available at `http://localhost:4173`.

## 🧪 Running Quality Checks

You can run the entire pipeline or specific parts of the test suite locally:

```bash
# Run all quality gates (Formatting + Linting + E2E Tests)
npm run check

# Run only Playwright smoke tests
npm run test:e2e

# Run Playwright tests in headed mode (visible browser)
npm run test:e2e:headed
```

## 📦 Repository Structure

```text
.
├── .github/workflows/   # CI, Deploy, and Link Checker pipelines
├── assets/              # Static assets (Vanilla CSS, SVG icons)
├── docs/adr/            # Architecture Decision Records
├── tests/e2e/           # Playwright smoke tests & A11y audits
├── 404.html             # Custom error routing
├── index.html           # Main semantic entry point
├── playwright.config.js # E2E configuration & WebServer setup
└── package.json         # Tooling dependencies & NPM scripts
```

## 🚢 Deployment

The site is hosted on **GitHub Pages**.
To ensure controlled releases and prevent accidental deployments of breaking changes, the delivery is triggered manually via `workflow_dispatch` in the [Deploy workflow](.github/workflows/deploy.yml) only after the CI quality gates pass.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
