# AGENTS.md

This file provides guidance to AI coding assistants when working with code in this repository.

## Project Overview

GenAI Simulations is a collection of interactive physics simulations and creative coding experiments built with Matter.js and modern web technologies.
Simulations run directly in the browser without a build step; `package.json` only holds dev tooling (linting, smoke tests).

## Architecture

- One folder per simulation under `src/`, opened via its `index.html`.
- Start with inline `<script>` and `<style>`; split into `script.js` and `style.css` (as in `src/tetris/`) once the file passes about 1,500 lines.
- Load external libraries (Matter.js, p5.js, fonts) from a CDN.

## Adding a Simulation

- Add a README entry under "Simulations" by copying an existing one.
- A math game also gets a card on `src/math-games/index.html`, including its game count in the texts.
- When important code only runs during play (rounds, scoring, effects), add a scripted interaction to `tests/smoke.spec.js`.

## Code Style & Conventions

- Write all code in English: identifiers, comments, commit messages and console output.
- Only user-facing UI text keeps the language of the simulation, for example the German labels, headings and button captions in an existing German simulation.
- Run `npm run check` (lint and smoke tests) before committing.

## Common Gotchas

1. **Composite Bodies**: Avoid for cursor-following objects – use single body with custom rendering instead
2. **Angle Wrapping**: Always use the shortest path interpolation for smooth rotation (handle 359° → 0° transitions)
3. **Event Loops**: Add completion flags to prevent infinite dialogs in `afterUpdate` events
4. **Collision Detection**: Bodies must have proper physics properties to collide (check density, mass)
5. **Canvas Context**: Always save/restore state when using transformations
6. **Force Application**: Forces are frame-based - consider engine timing for consistent physics
