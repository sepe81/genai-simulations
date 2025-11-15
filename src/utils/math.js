/**
 * Performs smooth angle interpolation, taking the shortest path
 * @param {number} from - Starting angle in radians
 * @param {number} to - Target angle in radians
 * @param {number} t - Interpolation factor (0-1)
 * @returns {number} Interpolated angle in radians
 */
export function lerpAngle(from, to, t) {
    let diff = to - from;
    // Handle angle wrapping (shortest path)
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    return from + diff * t;
}

/**
 * Calculate distance between two points
 * @param {number} x1 - X coordinate of first point
 * @param {number} y1 - Y coordinate of first point
 * @param {number} x2 - X coordinate of second point
 * @param {number} y2 - Y coordinate of second point
 * @returns {number} Distance between the points
 */
export function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.hypot(dx, dy);
}
