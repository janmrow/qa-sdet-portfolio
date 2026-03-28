# ADR 0001: Keep the portfolio static and framework-free

## Status

Accepted

## Context

The project is a small personal portfolio intended for GitHub Pages.

The main delivery goals are:

- low complexity
- easy maintenance
- fast load
- public repository clarity
- good engineering signal without stack inflation

A front-end framework or build-heavy setup would add ceremony without solving an actual project problem.

## Decision

The portfolio will be implemented as a static site using:

- semantic HTML
- hand-written CSS
- minimal vanilla JavaScript
- lightweight local tooling only

JavaScript is allowed only as progressive enhancement. The site must remain fully usable without it.

## Consequences

### Positive

- simpler repository
- easier manual editing
- lower maintenance cost
- GitHub Pages-friendly deployment
- stronger signal of judgment and proportion

### Negative

- less abstraction for reusable UI patterns
- no framework ecosystem conveniences
- manual discipline required for CSS and content structure

## Rationale

For this project, simplicity is not a limitation. It is the intended architecture.
