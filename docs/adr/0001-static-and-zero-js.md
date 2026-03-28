# ADR 0001: Keep the portfolio static and Zero-JS

## Status

Accepted

## Context

The project is a small personal portfolio intended for GitHub Pages.

The main delivery goals are:

- low complexity
- zero maintenance burden
- instant load times
- public repository clarity
- strong engineering signal without stack inflation

A front-end framework or build-heavy setup would add ceremony without solving an actual project problem. Furthermore, dynamic UI elements (like scroll-spies or complex mobile menus) distract from the core content, which is primarily text-based and informational.

## Decision

The portfolio will be implemented as a purely static site using:

- semantic HTML
- hand-written CSS
- zero client-side JavaScript
- lightweight local tooling only (for tests and formatting)

## Consequences

### Positive

- absolute minimum repository complexity
- perfectly predictable performance
- zero client-side security attack surface
- GitHub Pages-friendly deployment with no build step
- strong signal of pragmatic engineering judgment

### Negative

- less abstraction for reusable UI patterns
- manual discipline required for CSS and HTML structure
- no dynamic interactivity (which is deemed acceptable for a document-style portfolio)

## Rationale

For this project, extreme simplicity is not a limitation. It is the intended architecture. By relying solely on browser-native HTML and CSS behavior, we ensure maximum longevity and resilience of the code.
