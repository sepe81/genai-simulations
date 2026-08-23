# GenAI Simulations

Interactive physics simulations and creative coding experiments built with Matter.js and modern web technologies.

## 🎈 Simulations

### Balloon Pop

**[src/balloon-pop/index.html](src/balloon-pop/index.html)**

Interactive balloon popping game with realistic physics and 3D-styled balloons. Control a syringe with your mouse to pop colorful floating balloons—each pop creates a shockwave that pushes nearby balloons.

**Features:**

- Realistic 3D balloon rendering with gradients and shine effects
- Physics-based shock waves that affect nearby balloons
- Dynamic sound effects (pitch varies by balloon size)
- Smooth syringe rotation following mouse movement
- Score tracking and auto-reset

**Tech:** Matter.js, Web Audio API, Canvas 2D

**How to run:** Simply open `src/balloon-pop/index.html` in your browser. No build process or dependencies needed!

---

### Nerf Gun Shooting Gallery

**[src/nerf-gun/index.html](src/nerf-gun/index.html)**

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

**How to run:** Simply open `src/nerf-gun/index.html` in your browser. No build process or dependencies needed!

---

### Graffiti Spray

**[src/graffiti-spray/index.html](src/graffiti-spray/index.html)**

A small graffiti simulation: Spray can, color selection on the left, and realistically distributed paint particles on a light gray wall.

**Controls:**

- Hold Space: Spray
- Keys 1–9 or Click: Select color
- C: Clean wall

---

### Balloon Math (1×1 Learning)

**[src/math-games/balloon/index.html](src/math-games/balloon/index.html)**

Educational multiplication game where students pop balloons with the correct answers to multiplication problems. Balloons float upward with adjustable speed, and students can answer by clicking or typing on the keyboard.

**Features:**

- Progressive difficulty: Start with 1× table and advance to 10×
- Invisible keyboard input with auto-submit for correct answers
- Adjustable animation speed (+/- keys) for different learning paces
- Timeout mechanic: Balloons escaping = too slow (wrong answer)
- Randomized balloon positions for dynamic gameplay
- Visual particle explosions and sound effects
- Score tracking with correct/wrong answer statistics

**Tech:** Matter.js, Web Audio API, Canvas 2D

**Target audience:** Elementary school students learning multiplication tables (1×1)

**How to run:** Simply open `src/math-games/balloon/index.html` in your browser. No build process or dependencies needed!

---

### Rocket Math (1×1 Learning)

**[src/math-games/rocket/index.html](src/math-games/rocket/index.html)**

Space-themed multiplication practice where students shoot down rockets carrying multiplication problems. Answer by typing the solution or clicking answer buttons.

**Features:**

- Multi-digit keyboard input with auto-submit for correct answers
- Wrong answers can be corrected before submitting (Enter key)
- Progressive difficulty through multiplication tables 1-10
- Space theme with animated rockets flying across the screen
- Visual feedback with particle effects and sound
- Score tracking and level progression

**Tech:** Matter.js, Web Audio API, Canvas 2D

**Target audience:** Elementary school students learning multiplication tables (1×1)

**How to run:** Simply open `src/math-games/rocket/index.html` in your browser. No build process or dependencies needed!

---

### Monster Math (1×1 Learning)

**[src/math-games/monster/index.html](src/math-games/monster/index.html)**

Physics-based multiplication game where students drag falling fruits to feed hungry monsters. Each monster represents a multiplication problem, and students must match the correct answer fruit.

**Features:**

- Drag-and-drop gameplay with realistic physics
- Adjustable gravity (+/- keys) to control difficulty
- Visual speed indicator showing current gravity setting
- Progressive difficulty through multiplication tables 1-10
- Colorful monster designs and fruit objects
- Physics-based collision and scoring
- Sound effects for correct and incorrect answers

**Tech:** Matter.js, Web Audio API, Canvas 2D

**Target audience:** Elementary school students learning multiplication tables (1×1)

**How to run:** Simply open `src/math-games/monster/index.html` in your browser. No build process or dependencies needed!

---

### Cosine Similarity Visualization

**[src/cosine-similarity/index.html](src/cosine-similarity/index.html)**

Interactive visualization of cosine similarity between two vectors. Adjust the angle between vectors to see how it affects the similarity score in real-time.

**Features:**

- Interactive vector manipulation
- Real-time calculation of Dot Product and Cosine Similarity
- Visual representation of similarity on a -1 to 1 scale
- Angle visualization

**Tech:** p5.js, Canvas 2D

**How to run:** Simply open `src/cosine-similarity/index.html` in your browser.

---

### High Voltage Battery Box

**[src/battery-box/index.html](src/battery-box/index.html)**

A high-voltage physics sandbox featuring a draggable battery that arcs electricity to nearby objects. Includes interactive elements like stackable Iron Golems, Endermen, and fireworks.

**Controls:**
- **Drag & Drop:** Move the battery box
- **S:** Spawn Entity (Iron Golem or Enderman)
- **F:** Launch Firework Rocket
- **W:** Toggle Brick Wall Background
- **O:** Toggle Electric Arcs On/Off
- **R:** Reset Simulation

**Features:**
- Dynamic lightning generation using recursive displacement
- Particle effects for sparks and fireworks
- "Soft ceiling" mechanic to keep objects in bounds
- Physics-based Iron Golems and Endermen with high stability for stacking
- Industrial dark mode with optional brick wall aesthetic

**Tech:** Matter.js, Canvas 2D

**How to run:** Open `src/battery-box/index.html` in your browser.

---

### Tetris

**[src/tetris/index.html](src/tetris/index.html)**

Classic Tetris game with modern features. Complete implementation with all 7 tetrominoes, SRS rotation system, ghost piece preview, hold piece, and level progression.

**Controls:**
- **← →:** Move piece
- **↑:** Rotate
- **↓:** Soft drop
- **Space:** Hard drop
- **C:** Hold piece
- **P:** Pause

**Features:**
- Standard 10×20 grid with all 7 tetrominoes (I, O, T, L, J, S, Z)
- Super Rotation System (SRS) with wall kicks
- Ghost piece showing landing position
- Hold piece functionality
- Next queue (4 pieces preview)
- Line clearing with scoring (single/double/triple/Tetris)
- Level progression with increasing speed
- 7-bag randomizer for fair piece distribution

**Tech:** Vanilla JavaScript, Canvas 2D

**How to run:** Open `src/tetris/index.html` in your browser.

---

### Fish Quiz

**[src/fish-quiz/index.html](src/fish-quiz/index.html)**

Learning quiz on native freshwater fish, built on the teaching board "Kennst du unsere heimischen Fische?" of Anglerverband Leipzig e. V.
The scan of the board sits next to the page as a single JPEG, attribution and all, and every species crops its own oval out of it via CSS, so a new species needs no new image file.
The quiz interface and the species descriptions are in German, since the German species names are what the quiz trains.

**Features:**

- Two quiz modes: picture to name and name to picture
- Look-alikes are preferred as wrong answers (Plötze/Rotfeder, Blei/Güster, Barsch/Zander)
- Adaptive question picking: poorly known species come up more often
- Hit rate per species is kept in localStorage
- Gallery mode with picture, alternative names and identifying feature
- Round length of 5, 10, 20 questions or endless; keyboard control (1-4, Enter)

**Adding a species:** Append an entry to the `FISH` array at the top of the script, either with `sprite` plus `crop: cell(row, column)` for the existing board, or with `image: "..."` for a picture of its own.
Additional boards can be registered in `SPRITES`.

**Tech:** Vanilla JavaScript, CSS sprite cropping, Web Audio API, localStorage

**How to run:** Open `src/fish-quiz/index.html` in your browser.

---

## 🚀 Getting Started

All simulations are self-contained HTML files. To run:

1. Clone this repository
2. Open any `.html` file in your web browser
3. That's it!

```bash
git clone https://github.com/sepe81/genai-simulations.git
cd genai-simulations
open src/balloon-pop/index.html
open src/battery-box/index.html
open src/cosine-similarity/index.html
open src/fish-quiz/index.html
open src/graffiti-spray/index.html
open src/math-games/balloon/index.html
open src/math-games/monster/index.html
open src/math-games/rocket/index.html
open src/nerf-gun/index.html
open src/tetris/index.html
# or just double-click any file
```

## 🛠️ Technologies

- **Matter.js** – 2D physics engine for realistic interactions
- **Canvas API** – Custom rendering for 3D effects
- **Web Audio API** – Dynamic sound generation

## 📝 License

MIT

## 🤝 Contributing

Feel free to fork, experiment, and submit pull requests with new simulations or improvements!
