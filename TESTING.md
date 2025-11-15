# Testing Documentation

## Current Test Coverage

### Overview
This document provides a comprehensive analysis of the test coverage for the genai-simulations project and recommendations for improvement.

**Current Status:**
- ✅ Testing infrastructure set up (Vitest + jsdom)
- ✅ 71 unit tests passing
- ✅ Core utilities tested (colors, math, scoring)
- ❌ No integration tests
- ❌ No end-to-end tests
- ❌ Main HTML games not yet refactored for testing

### Test Statistics
- **Total Test Files:** 3
- **Total Tests:** 71 passing
- **Test Files:**
  - `src/utils/colors.test.js` - 20 tests
  - `src/utils/math.test.js` - 21 tests
  - `src/nerf-gun/scoring.test.js` - 30 tests

## What Is Currently Tested

### ✅ Color Utilities (`src/utils/colors.js`)
**Functions tested:**
- `lightenColor(color, percent)` - Lightens hex colors
- `darkenColor(color, percent)` - Darkens hex colors

**Test coverage includes:**
- Pure color transformations (red, green, blue)
- Mixed colors
- Edge cases (maximum/minimum RGB values)
- Boundary conditions
- Rounding behavior

### ✅ Math Utilities (`src/utils/math.js`)
**Functions tested:**
- `lerpAngle(from, to, t)` - Smooth angle interpolation
- `distance(x1, y1, x2, y2)` - Distance calculation

**Test coverage includes:**
- Basic interpolation
- Angle wrapping across 2π boundaries
- Shortest path calculations
- Negative angles
- Distance calculations in all quadrants
- Edge cases (zero distance, large coordinates)

### ✅ Scoring System (`src/nerf-gun/scoring.js`)
**Functions tested:**
- `calculateScoreFromDistance(distanceInViewBox)` - Score calculation
- `convertToViewBoxCoordinates(targetX, targetY, targetRect)` - Coordinate conversion
- `calculateScore(targetX, targetY, targetRect)` - Integration function

**Test coverage includes:**
- All 10 scoring rings (0-10 points)
- Boundary conditions between rings
- Coordinate transformations
- Scaling with different target sizes
- Edge cases (zero-width targets, very large/small targets)

## What Is NOT Tested (Areas for Improvement)

### 🔴 Critical Priority

#### 1. Balloon Pop Game Logic (`balloon_pop.html`)
**Currently untested:**
- ❌ `createBalloon(x, y)` - Balloon creation with physics
- ❌ `popBalloon(balloon)` - Balloon popping logic
- ❌ `Particle` class - Explosion particle system
- ❌ Collision detection between needle and balloons
- ❌ Shockwave physics affecting nearby balloons
- ❌ Timer functionality
- ❌ Game completion detection

**Recommended tests:**
```javascript
describe('Balloon Pop Game', () => {
  test('createBalloon creates balloon with correct properties');
  test('popBalloon removes balloon from world');
  test('popBalloon creates particle explosion');
  test('shockwave affects nearby balloons');
  test('timer starts on first balloon pop');
  test('game completes when all balloons popped');
});
```

#### 2. Nerf Gun Game Logic (`nerf_gun_demo.html`)
**Currently untested:**
- ❌ `switchMode()` - Target Practice ↔ Tower Destruction
- ❌ `switchGun()` - Gun model switching (3 guns)
- ❌ `fireGun()` - Main shooting logic
- ❌ `createDart()` - Visual dart animation
- ❌ `initTower()` - Tower physics setup
- ❌ `updateBlockCount()` - Tower block tracking
- ❌ `resetGame()` - Game state reset

**Recommended tests:**
```javascript
describe('Nerf Gun Game', () => {
  test('switchMode toggles between target and tower modes');
  test('switchGun cycles through 3 gun models');
  test('fireGun creates projectile with correct physics');
  test('tower initializes with correct block count');
  test('resetGame clears all state correctly');
});
```

#### 3. Physics Integration
**Currently untested:**
- ❌ Matter.js engine initialization
- ❌ Gravity calculations
- ❌ Collision detection accuracy
- ❌ Projectile trajectories
- ❌ Recoil physics
- ❌ Tower stability and collapse

**Recommended approach:**
Create integration tests that verify physics behavior without relying on visual output.

### 🟡 High Priority

#### 4. Audio Systems
**Currently untested:**
- ❌ `playPopSound(frequency)` - Balloon pop sounds
- ❌ `playBasicShootSound()` - Gun 1 sound
- ❌ `playAdvancedShootSound()` - Guns 2 & 3 sounds
- ❌ Audio context state management
- ❌ Sound frequency calculations

**Recommended tests:**
```javascript
describe('Audio System', () => {
  test('playPopSound creates oscillator with correct frequency');
  test('different guns produce different sound profiles');
  test('audio context resumes after user interaction');
});
```

#### 5. Animation Systems
**Currently untested:**
- ❌ Particle lifecycle (update, isDead)
- ❌ Dart flight animations
- ❌ Recoil spring physics
- ❌ Gun rotation animations
- ❌ Muzzle flash timing

#### 6. Input Handling
**Currently untested:**
- ❌ Mouse tracking and position updates
- ❌ Keyboard shortcuts (R for reset)
- ❌ Click detection
- ❌ Mouse movement to gun rotation conversion

### 🟢 Medium Priority

#### 7. Rendering
**Currently untested:**
- ❌ Custom balloon rendering (gradients, highlights)
- ❌ Particle rendering (confetti, sparkles, rubber)
- ❌ Gun SVG display
- ❌ Canvas rendering consistency

**Recommendation:** Use visual regression testing with Playwright or Puppeteer.

#### 8. State Management
**Currently untested:**
- ❌ Score tracking accuracy
- ❌ Game mode state transitions
- ❌ Timer state (start, stop, reset)
- ❌ Balloon count tracking

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests Once (CI mode)
```bash
npm run test:run
```

### Run Tests with UI
```bash
npm run test:ui
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

## Test Structure

Following **Approach 1: Co-located Tests**

```
genai-simulations/
├── src/
│   ├── utils/
│   │   ├── colors.js           ← Tested ✅
│   │   ├── colors.test.js
│   │   ├── math.js             ← Tested ✅
│   │   └── math.test.js
│   ├── balloon-pop/
│   │   ├── game.js             ← Not created yet
│   │   ├── game.test.js        ← Not created yet
│   │   ├── particles.js        ← Not created yet
│   │   └── particles.test.js   ← Not created yet
│   └── nerf-gun/
│       ├── scoring.js          ← Tested ✅
│       ├── scoring.test.js
│       ├── game.js             ← Not created yet
│       └── game.test.js        ← Not created yet
├── e2e/
│   └── README.md
├── balloon_pop.html            ← Original (not refactored)
├── nerf_gun_demo.html          ← Original (not refactored)
├── package.json
├── vitest.config.js
└── TESTING.md                  ← This file
```

## Next Steps

### Phase 1: Extract Core Game Logic (Recommended)
1. **Extract balloon pop game logic**
   - Create `src/balloon-pop/game.js`
   - Create `src/balloon-pop/particles.js`
   - Move pure functions from HTML to modules
   - Create corresponding test files

2. **Extract nerf gun game logic**
   - Create `src/nerf-gun/game.js`
   - Create `src/nerf-gun/physics.js`
   - Move pure functions from HTML to modules
   - Create corresponding test files

3. **Update HTML files to use extracted modules**
   - Import modules using `<script type="module">`
   - Keep only DOM manipulation in HTML

### Phase 2: Add Integration Tests
1. Test complete game workflows
2. Test physics engine integration
3. Test state management across components
4. Test audio system integration

### Phase 3: Add E2E Tests
1. Install Playwright or Puppeteer
2. Create visual regression tests
3. Test complete user workflows
4. Test cross-browser compatibility

### Phase 4: Set Up CI/CD
1. Add GitHub Actions workflow
2. Run tests on every commit
3. Generate coverage reports
4. Block merges if tests fail

## Coverage Goals

| Component | Current | Target |
|-----------|---------|--------|
| Utils (colors, math) | 100% | 100% ✅ |
| Scoring | 100% | 100% ✅ |
| Balloon Pop Game | 0% | 80% |
| Nerf Gun Game | 5% | 80% |
| Physics Integration | 0% | 60% |
| Audio System | 0% | 70% |
| Animation System | 0% | 60% |
| Input Handling | 0% | 70% |
| Overall | ~5% | 75% |

## Key Insights

### Strengths
- ✅ Pure utility functions are well-tested
- ✅ Scoring logic has comprehensive coverage
- ✅ Testing infrastructure is solid (Vitest + jsdom)
- ✅ Tests are fast (71 tests in ~23ms)

### Weaknesses
- ❌ Main game logic is embedded in HTML (hard to test)
- ❌ No integration tests
- ❌ No E2E tests
- ❌ Physics interactions are untested
- ❌ No CI/CD pipeline

### Opportunities
- 🎯 Refactor HTML games into testable modules
- 🎯 Add integration tests for game mechanics
- 🎯 Set up visual regression testing
- 🎯 Add test coverage reporting
- 🎯 Create CI/CD pipeline

### Risks
- ⚠️ Changes to scoring rings could break game balance (now mitigated with tests)
- ⚠️ Untested physics code could have bugs
- ⚠️ No tests for game completion logic
- ⚠️ Audio issues wouldn't be caught before deployment

## Quick Reference: Common Testing Patterns

### Testing Pure Functions
```javascript
import { describe, test, expect } from 'vitest';
import { myFunction } from './myModule.js';

describe('myFunction', () => {
  test('returns expected output for given input', () => {
    expect(myFunction(input)).toBe(expectedOutput);
  });
});
```

### Testing with Floating Point
```javascript
test('calculates accurate result', () => {
  expect(result).toBeCloseTo(expectedValue, 10);
});
```

### Testing DOM Interactions (when needed)
```javascript
import { beforeEach, afterEach } from 'vitest';

beforeEach(() => {
  document.body.innerHTML = '<div id="test"></div>';
});

afterEach(() => {
  document.body.innerHTML = '';
});
```

## Conclusion

The project now has a solid foundation for testing with 71 passing unit tests covering the core utility functions. The next priority should be refactoring the game logic from the HTML files into testable modules, followed by adding integration and E2E tests.

**Test coverage has improved from 0% to ~5%**, with the extracted utility functions at 100% coverage. The goal is to reach 75% overall coverage by refactoring and testing the main game logic.
