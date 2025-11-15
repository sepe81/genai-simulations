# GenAI Simulations

Interactive physics simulations and creative coding experiments built with Matter.js and modern web technologies.

## 🎈 Simulations

### Balloon Pop

**[balloon_pop.html](balloon_pop.html)**

Interactive balloon popping game with realistic physics and 3D-styled balloons. Control a syringe with your mouse to pop colorful floating balloons—each pop creates a shockwave that pushes nearby balloons.

**Features:**

- Realistic 3D balloon rendering with gradients and shine effects
- Physics-based shock waves that affect nearby balloons
- Dynamic sound effects (pitch varies by balloon size)
- Smooth syringe rotation following mouse movement
- Score tracking and auto-reset

**Tech:** Matter.js, Web Audio API, Canvas 2D

**How to run:** Simply open `balloon_pop.html` in your browser. No build process or dependencies needed!

---

### Nerf Gun Shooting Gallery

**[nerf_gun_demo.html](nerf_gun_demo.html)**

Interactive shooting gallery with two game modes: precision target shooting and physics-based tower destruction. Aim with your mouse (vertical movement controls angle) and fire foam darts at targets or knock down colorful block towers.

**Features:**

- Mouse-controlled aiming with smooth rotation (-20° to +40°)
- Two game modes: Target Practice and Tower Destruction
- Three different Nerf gun models to choose from
- Physics-based recoil that follows gun rotation
- Scoring system for target mode
- Matter.js powered tower physics with realistic block collapse
- Dynamic projectile behavior based on aim angle

**Tech:** Matter.js, SVG Graphics, Web Audio API, Canvas 2D

**How to run:** Simply open `nerf_gun_demo.html` in your browser. No build process or dependencies needed!

---

## 🚀 Getting Started

All simulations are self-contained HTML files. To run:

1. Clone this repository
2. Open any `.html` file in your web browser
3. That's it!

```bash
git clone https://github.com/sepe81/genai-simulations.git
cd genai-simulations
open balloon_pop.html
open nerf_gun_demo.html
# or just double-click the file
```

## 🛠️ Technologies

- **Matter.js** – 2D physics engine for realistic interactions
- **Canvas API** – Custom rendering for 3D effects
- **Web Audio API** – Dynamic sound generation

## 🧪 Testing

This project now includes a comprehensive testing infrastructure using Vitest. See [TESTING.md](TESTING.md) for detailed information about test coverage and areas for improvement.

### Running Tests

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests once (CI mode)
npm run test:run

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### Current Test Coverage

- ✅ **71 unit tests passing**
- ✅ Color utilities (lighten/darken colors)
- ✅ Math utilities (angle interpolation, distance)
- ✅ Nerf gun scoring system

### Areas for Improvement

- ❌ Balloon pop game logic
- ❌ Nerf gun game logic (mode switching, gun switching, etc.)
- ❌ Physics integration tests
- ❌ Audio system tests
- ❌ End-to-end tests

See [TESTING.md](TESTING.md) for a comprehensive analysis and recommendations.

## 📝 License

MIT

## 🤝 Contributing

Feel free to fork, experiment, and submit pull requests with new simulations or improvements!
