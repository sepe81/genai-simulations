/**
 * Calculate the score based on distance from target center in viewBox coordinates
 * @param {number} distanceInViewBox - Distance from center in viewBox units
 * @returns {number} Score (0-10)
 */
export function calculateScoreFromDistance(distanceInViewBox) {
    // Score based on rings (from center outward):
    // Ring 10: r <= 10 (innermost yellow)
    // Ring 9: r <= 20
    // Ring 8: r <= 30 (red)
    // Ring 7: r <= 40
    // Ring 6: r <= 50 (cyan)
    // Ring 5: r <= 60
    // Ring 4: r <= 70 (white)
    // Ring 3: r <= 80
    // Ring 2: r <= 90 (black)
    // Ring 1: r <= 100
    // Outside: r > 120 (0 points)

    if (distanceInViewBox <= 10) return 10;
    if (distanceInViewBox <= 20) return 9;
    if (distanceInViewBox <= 30) return 8;
    if (distanceInViewBox <= 40) return 7;
    if (distanceInViewBox <= 50) return 6;
    if (distanceInViewBox <= 60) return 5;
    if (distanceInViewBox <= 70) return 4;
    if (distanceInViewBox <= 80) return 3;
    if (distanceInViewBox <= 90) return 2;
    if (distanceInViewBox <= 100) return 1;
    if (distanceInViewBox <= 120) return 1; // Outermost white ring
    return 0; // Miss
}

/**
 * Convert screen coordinates to viewBox coordinates
 * @param {number} targetX - X coordinate in screen space
 * @param {number} targetY - Y coordinate in screen space
 * @param {DOMRect} targetRect - Bounding rectangle of the target element
 * @param {number} viewBoxWidth - Width of the SVG viewBox (default 250)
 * @returns {object} Object with centerX, centerY, and distance in viewBox units
 */
export function convertToViewBoxCoordinates(targetX, targetY, targetRect, viewBoxWidth = 250) {
    // Target center in screen coordinates
    const centerX = targetRect.left + targetRect.width / 2;
    const centerY = targetRect.top + targetRect.height / 2;

    // Calculate distance from center in pixels
    const dx = targetX - centerX;
    const dy = targetY - centerY;
    const distance = Math.hypot(dx, dy);

    // Convert to target radius units (target viewBox is 250x250, center at 125,125)
    // Physical target radius is 120px in viewBox coordinates
    const scale = targetRect.width / viewBoxWidth; // Scale factor from viewBox to screen
    const distanceInViewBox = distance / scale;

    return {
        centerX,
        centerY,
        distance,
        distanceInViewBox
    };
}

/**
 * Calculate score based on target hit coordinates
 * This is the main scoring function that combines coordinate conversion and scoring
 * @param {number} targetX - X coordinate in screen space
 * @param {number} targetY - Y coordinate in screen space
 * @param {DOMRect} targetRect - Bounding rectangle of the target element
 * @returns {number} Score (0-10)
 */
export function calculateScore(targetX, targetY, targetRect) {
    const { distanceInViewBox } = convertToViewBoxCoordinates(targetX, targetY, targetRect);
    return calculateScoreFromDistance(distanceInViewBox);
}
