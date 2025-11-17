# AGENTS.md

This file provides guidance to AI coding assistants when working with code in this repository.

## Project Overview

GenAI Simulations is a collection of interactive physics simulations and creative coding experiments built with Matter.js and modern web technologies. All simulations are self-contained single HTML files with no build process or dependencies required.

## Architecture

Each simulation is a complete, standalone HTML file that includes:

- All JavaScript code embedded in `<script>` tags
- CSS styling in `<style>` tags
- CDN imports for external libraries (Matter.js, p5.js, etc.)

This architecture means:

- No package.json or build tools needed
- No compilation or bundling step
- Works directly in browser by opening the HTML file
- Easy to share and deploy (just copy the HTML file)

## Development Workflow

- Edit the HTML file directly
- Refresh browser to see changes
- Use browser DevTools console for debugging
- No build or compile step needed

## Code Style & Conventions

- Prefer `globalThis` over `window`.
- Use `for…of` instead of `.forEach(…)`.
- Prefer `Math.hypot(…)` over `Math.sqrt(…)`.
- Remove unused variables.

## Common Gotchas

1. **Composite Bodies**: Avoid for cursor-following objects – use single body with custom rendering instead
2. **Angle Wrapping**: Always use the shortest path interpolation for smooth rotation (handle 359° → 0° transitions)
3. **Event Loops**: Add completion flags to prevent infinite dialogs in `afterUpdate` events
4. **Collision Detection**: Bodies must have proper physics properties to collide (check density, mass)
5. **Canvas Context**: Always save/restore state when using transformations
6. **Force Application**: Forces are frame-based - consider engine timing for consistent physics
