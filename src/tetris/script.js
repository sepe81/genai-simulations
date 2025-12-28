// Tetris Game
// A complete implementation with all standard features

// ============================================================================
// TETROMINO DEFINITIONS
// ============================================================================

const TETROMINOES = {
    I: {
        shape: [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        color: '#00f0f0'
    },
    O: {
        shape: [
            [1, 1],
            [1, 1]
        ],
        color: '#f0f000'
    },
    T: {
        shape: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        color: '#a000f0'
    },
    L: {
        shape: [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ],
        color: '#f0a000'
    },
    J: {
        shape: [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        color: '#0000f0'
    },
    S: {
        shape: [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ],
        color: '#00f000'
    },
    Z: {
        shape: [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ],
        color: '#f00000'
    }
};

const TETROMINO_TYPES = Object.keys(TETROMINOES);

// Wall kick data for SRS (Super Rotation System)
const WALL_KICKS = {
    normal: {
        '0->1': [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
        '1->0': [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
        '1->2': [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
        '2->1': [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
        '2->3': [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
        '3->2': [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
        '3->0': [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
        '0->3': [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]]
    },
    I: {
        '0->1': [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
        '1->0': [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
        '1->2': [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]],
        '2->1': [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
        '2->3': [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
        '3->2': [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
        '3->0': [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
        '0->3': [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]]
    }
};

// ============================================================================
// GAME CONSTANTS
// ============================================================================

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const PREVIEW_BLOCK_SIZE = 20;

const POINTS = {
    SINGLE: 100,
    DOUBLE: 300,
    TRIPLE: 500,
    TETRIS: 800,
    SOFT_DROP: 1,
    HARD_DROP: 2
};

const LINES_PER_LEVEL = 10;
const BASE_DROP_INTERVAL = 1000;
const MIN_DROP_INTERVAL = 50;

// ============================================================================
// TETROMINO CLASS
// ============================================================================

class Tetromino {
    constructor(type) {
        this.type = type;
        this.shape = TETROMINOES[type].shape.map(row => [...row]);
        this.color = TETROMINOES[type].color;
        this.x = Math.floor((COLS - this.shape[0].length) / 2);
        this.y = 0;
        this.rotation = 0;
    }

    rotate(clockwise = true) {
        const size = this.shape.length;
        const rotated = Array.from({ length: size }, () => new Array(size).fill(0));

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                if (clockwise) {
                    rotated[x][size - 1 - y] = this.shape[y][x];
                } else {
                    rotated[size - 1 - x][y] = this.shape[y][x];
                }
            }
        }

        return rotated;
    }

    getBlocks() {
        const blocks = [];
        for (let y = 0; y < this.shape.length; y++) {
            for (let x = 0; x < this.shape[y].length; x++) {
                if (this.shape[y][x]) {
                    blocks.push({ x: this.x + x, y: this.y + y });
                }
            }
        }
        return blocks;
    }
}

// ============================================================================
// GAME BOARD CLASS
// ============================================================================

class Board {
    constructor() {
        this.grid = this.createEmptyGrid();
    }

    createEmptyGrid() {
        return Array.from({ length: ROWS }, () => new Array(COLS).fill(null));
    }

    reset() {
        this.grid = this.createEmptyGrid();
    }

    isValidPosition(tetromino, offsetX = 0, offsetY = 0, newShape = null) {
        const shape = newShape || tetromino.shape;

        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    const newX = tetromino.x + x + offsetX;
                    const newY = tetromino.y + y + offsetY;

                    if (newX < 0 || newX >= COLS || newY >= ROWS) {
                        return false;
                    }

                    if (newY >= 0 && this.grid[newY][newX]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    lockTetromino(tetromino) {
        for (const block of tetromino.getBlocks()) {
            if (block.y >= 0) {
                this.grid[block.y][block.x] = tetromino.color;
            }
        }
    }

    clearLines() {
        const linesToClear = [];

        for (let y = ROWS - 1; y >= 0; y--) {
            if (this.grid[y].every(cell => cell !== null)) {
                linesToClear.push(y);
            }
        }

        for (const lineY of linesToClear) {
            this.grid.splice(lineY, 1);
            this.grid.unshift(new Array(COLS).fill(null));
        }

        return linesToClear.length;
    }

    getGhostPosition(tetromino) {
        let ghostY = tetromino.y;
        while (this.isValidPosition(tetromino, 0, ghostY - tetromino.y + 1)) {
            ghostY++;
        }
        return ghostY;
    }
}

// ============================================================================
// INPUT HANDLER CLASS
// ============================================================================

class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = {};
        this.setupListeners();
    }

    setupListeners() {
        globalThis.addEventListener('keydown', (e) => this.handleKeyDown(e));
        globalThis.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    handleKeyDown(e) {
        if (this.game.isGameOver) {
            return;
        }

        switch (e.code) {
            case 'ArrowLeft':
                e.preventDefault();
                this.game.movePiece(-1, 0);
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.game.movePiece(1, 0);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.game.softDrop();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.game.rotatePiece();
                break;
            case 'Space':
                e.preventDefault();
                this.game.hardDrop();
                break;
            case 'KeyC':
            case 'ShiftLeft':
            case 'ShiftRight':
                e.preventDefault();
                this.game.holdPiece();
                break;
            case 'KeyP':
                e.preventDefault();
                this.game.togglePause();
                break;
        }
    }

    handleKeyUp(e) {
        this.keys[e.code] = false;
    }
}

// ============================================================================
// RENDERER CLASS
// ============================================================================

class Renderer {
    constructor() {
        this.gameCanvas = document.getElementById('game-canvas');
        this.gameCtx = this.gameCanvas.getContext('2d');

        this.nextCanvas = document.getElementById('next-canvas');
        this.nextCtx = this.nextCanvas.getContext('2d');

        this.holdCanvas = document.getElementById('hold-canvas');
        this.holdCtx = this.holdCanvas.getContext('2d');

        this.scoreElement = document.getElementById('score');
        this.levelElement = document.getElementById('level');
        this.linesElement = document.getElementById('lines');

        this.overlay = document.getElementById('game-overlay');
        this.overlayTitle = document.getElementById('overlay-title');
        this.overlayMessage = document.getElementById('overlay-message');
        this.restartBtn = document.getElementById('restart-btn');
    }

    clear() {
        this.gameCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.gameCtx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    }

    drawBlock(ctx, x, y, color, size = BLOCK_SIZE, ghost = false) {
        const padding = 1;

        if (ghost) {
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.strokeRect(
                x * size + padding,
                y * size + padding,
                size - padding * 2,
                size - padding * 2
            );
        } else {
            // Main block
            ctx.fillStyle = color;
            ctx.fillRect(
                x * size + padding,
                y * size + padding,
                size - padding * 2,
                size - padding * 2
            );

            // Highlight
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.fillRect(
                x * size + padding,
                y * size + padding,
                size - padding * 2,
                4
            );

            // Shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(
                x * size + padding,
                y * size + size - padding - 4,
                size - padding * 2,
                4
            );
        }
    }

    drawBoard(board) {
        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                if (board.grid[y][x]) {
                    this.drawBlock(this.gameCtx, x, y, board.grid[y][x]);
                } else {
                    // Draw grid lines
                    this.gameCtx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
                    this.gameCtx.strokeRect(
                        x * BLOCK_SIZE,
                        y * BLOCK_SIZE,
                        BLOCK_SIZE,
                        BLOCK_SIZE
                    );
                }
            }
        }
    }

    drawTetromino(tetromino, ghost = false) {
        const blocks = tetromino.getBlocks();
        for (const block of blocks) {
            if (block.y >= 0) {
                this.drawBlock(this.gameCtx, block.x, block.y, tetromino.color, BLOCK_SIZE, ghost);
            }
        }
    }

    drawGhost(tetromino, ghostY) {
        for (let y = 0; y < tetromino.shape.length; y++) {
            for (let x = 0; x < tetromino.shape[y].length; x++) {
                if (tetromino.shape[y][x]) {
                    const blockY = ghostY + y;
                    if (blockY >= 0) {
                        this.drawBlock(
                            this.gameCtx,
                            tetromino.x + x,
                            blockY,
                            tetromino.color,
                            BLOCK_SIZE,
                            true
                        );
                    }
                }
            }
        }
    }

    drawPreview(ctx, tetromino, offsetY = 0) {
        if (!tetromino) return;

        const shape = TETROMINOES[tetromino.type || tetromino].shape;
        const color = TETROMINOES[tetromino.type || tetromino].color;

        const blockSize = PREVIEW_BLOCK_SIZE;
        const width = shape[0].length * blockSize;
        const startX = (ctx.canvas.width - width) / 2;
        const startY = offsetY + 10;

        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    const drawX = startX / blockSize + x;
                    const drawY = startY / blockSize + y;
                    this.drawBlock(ctx, drawX, drawY, color, blockSize);
                }
            }
        }
    }

    drawNextQueue(queue) {
        this.nextCtx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.nextCtx.fillRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);

        for (let i = 0; i < Math.min(queue.length, 4); i++) {
            this.drawPreview(this.nextCtx, queue[i], i * 80);
        }
    }

    drawHoldPiece(type, canHold) {
        this.holdCtx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.holdCtx.fillRect(0, 0, this.holdCanvas.width, this.holdCanvas.height);

        if (type) {
            if (!canHold) {
                this.holdCtx.globalAlpha = 0.3;
            }
            this.drawPreview(this.holdCtx, type, 0);
            this.holdCtx.globalAlpha = 1;
        }
    }

    updateStats(score, level, lines) {
        this.scoreElement.textContent = score.toLocaleString();
        this.levelElement.textContent = level;
        this.linesElement.textContent = lines;
    }

    showOverlay(title, message, showButton = false) {
        this.overlayTitle.textContent = title;
        this.overlayMessage.textContent = message;
        this.restartBtn.classList.toggle('hidden', !showButton);
        this.overlay.classList.remove('hidden');
    }

    hideOverlay() {
        this.overlay.classList.add('hidden');
    }

    render(game) {
        this.clear();
        this.drawBoard(game.board);

        if (game.currentPiece) {
            // Draw ghost piece
            const ghostY = game.board.getGhostPosition(game.currentPiece);
            if (ghostY !== game.currentPiece.y) {
                this.drawGhost(game.currentPiece, ghostY);
            }

            // Draw current piece
            this.drawTetromino(game.currentPiece);
        }

        this.drawNextQueue(game.nextQueue);
        this.drawHoldPiece(game.holdPieceType, game.canHold);
        this.updateStats(game.score, game.level, game.lines);
    }
}

// ============================================================================
// GAME CLASS
// ============================================================================

class Game {
    constructor() {
        this.board = new Board();
        this.renderer = new Renderer();
        this.inputHandler = new InputHandler(this);

        this.reset();
        this.setupRestartButton();
        this.start();
    }

    reset() {
        this.board.reset();
        this.bag = [];
        this.nextQueue = [];
        this.currentPiece = null;
        this.holdPieceType = null;
        this.canHold = true;

        this.score = 0;
        this.level = 1;
        this.lines = 0;

        this.dropInterval = BASE_DROP_INTERVAL;
        this.lastDropTime = 0;

        this.isPaused = false;
        this.isGameOver = false;

        // Fill next queue
        for (let i = 0; i < 4; i++) {
            this.nextQueue.push(this.getNextFromBag());
        }

        this.spawnPiece();
        this.renderer.hideOverlay();
    }

    setupRestartButton() {
        this.renderer.restartBtn.addEventListener('click', () => {
            this.reset();
            this.start();
        });
    }

    getNextFromBag() {
        if (this.bag.length === 0) {
            this.bag = [...TETROMINO_TYPES];
            // Fisher-Yates shuffle
            for (let i = this.bag.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.bag[i], this.bag[j]] = [this.bag[j], this.bag[i]];
            }
        }
        return this.bag.pop();
    }

    spawnPiece() {
        const type = this.nextQueue.shift();
        this.nextQueue.push(this.getNextFromBag());

        this.currentPiece = new Tetromino(type);
        this.canHold = true;

        // Check if spawn position is valid
        if (!this.board.isValidPosition(this.currentPiece)) {
            this.gameOver();
        }
    }

    movePiece(dx, dy) {
        if (!this.currentPiece || this.isPaused) return false;

        if (this.board.isValidPosition(this.currentPiece, dx, dy)) {
            this.currentPiece.x += dx;
            this.currentPiece.y += dy;
            return true;
        }
        return false;
    }

    rotatePiece(clockwise = true) {
        if (!this.currentPiece || this.isPaused) return;
        if (this.currentPiece.type === 'O') return; // O piece doesn't rotate

        const oldRotation = this.currentPiece.rotation;
        const newRotation = clockwise
            ? (oldRotation + 1) % 4
            : (oldRotation + 3) % 4;

        const rotatedShape = this.currentPiece.rotate(clockwise);

        // Get wall kick data
        const kickKey = `${oldRotation}->${newRotation}`;
        const kickData = this.currentPiece.type === 'I'
            ? WALL_KICKS.I[kickKey]
            : WALL_KICKS.normal[kickKey];

        // Try each wall kick offset
        for (const [dx, dy] of kickData) {
            if (this.board.isValidPosition(this.currentPiece, dx, dy, rotatedShape)) {
                this.currentPiece.shape = rotatedShape;
                this.currentPiece.x += dx;
                this.currentPiece.y += dy;
                this.currentPiece.rotation = newRotation;
                return;
            }
        }
    }

    softDrop() {
        if (this.movePiece(0, 1)) {
            this.score += POINTS.SOFT_DROP;
            this.lastDropTime = performance.now();
        }
    }

    hardDrop() {
        if (!this.currentPiece || this.isPaused) return;

        let dropDistance = 0;
        while (this.board.isValidPosition(this.currentPiece, 0, 1)) {
            this.currentPiece.y++;
            dropDistance++;
        }

        this.score += dropDistance * POINTS.HARD_DROP;
        this.lockPiece();
    }

    holdPiece() {
        if (!this.currentPiece || !this.canHold || this.isPaused) return;

        const currentType = this.currentPiece.type;

        if (this.holdPieceType) {
            this.currentPiece = new Tetromino(this.holdPieceType);
        } else {
            this.spawnPiece();
        }

        this.holdPieceType = currentType;
        this.canHold = false;
    }

    lockPiece() {
        this.board.lockTetromino(this.currentPiece);

        const clearedLines = this.board.clearLines();
        if (clearedLines > 0) {
            this.addLineScore(clearedLines);
        }

        this.spawnPiece();
    }

    addLineScore(count) {
        const linePoints = {
            1: POINTS.SINGLE,
            2: POINTS.DOUBLE,
            3: POINTS.TRIPLE,
            4: POINTS.TETRIS
        };

        this.score += (linePoints[count] || 0) * this.level;
        this.lines += count;

        // Level up
        const newLevel = Math.floor(this.lines / LINES_PER_LEVEL) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            this.updateDropInterval();
        }
    }

    updateDropInterval() {
        // Speed increases with level
        this.dropInterval = Math.max(
            MIN_DROP_INTERVAL,
            BASE_DROP_INTERVAL - (this.level - 1) * 75
        );
    }

    togglePause() {
        if (this.isGameOver) return;

        this.isPaused = !this.isPaused;

        if (this.isPaused) {
            this.renderer.showOverlay('PAUSED', 'Press P to resume');
        } else {
            this.renderer.hideOverlay();
            this.lastDropTime = performance.now();
        }
    }

    gameOver() {
        this.isGameOver = true;
        this.renderer.showOverlay('GAME OVER', `Final Score: ${this.score.toLocaleString()}`, true);
    }

    update(currentTime) {
        if (this.isPaused || this.isGameOver) return;

        // Auto drop
        if (currentTime - this.lastDropTime >= this.dropInterval) {
            if (!this.movePiece(0, 1)) {
                this.lockPiece();
            }
            this.lastDropTime = currentTime;
        }
    }

    start() {
        this.lastDropTime = performance.now();
        this.gameLoop();
    }

    gameLoop() {
        const currentTime = performance.now();

        this.update(currentTime);
        this.renderer.render(this);

        requestAnimationFrame(() => this.gameLoop());
    }
}

// ============================================================================
// INITIALIZE GAME
// ============================================================================

const game = new Game();
