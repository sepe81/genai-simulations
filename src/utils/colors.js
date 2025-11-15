/**
 * Lightens a hex color by a given percentage
 * @param {string} color - Hex color (e.g., '#FF0000')
 * @param {number} percent - Percentage to lighten (0-100)
 * @returns {string} RGB color string (e.g., 'rgb(255,50,50)')
 */
export function lightenColor(color, percent) {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return `rgb(${R},${G},${B})`;
}

/**
 * Darkens a hex color by a given percentage
 * @param {string} color - Hex color (e.g., '#FF0000')
 * @param {number} percent - Percentage to darken (0-100)
 * @returns {string} RGB color string (e.g., 'rgb(200,0,0)')
 */
export function darkenColor(color, percent) {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, (num >> 16) - amt);
    const G = Math.max(0, (num >> 8 & 0x00FF) - amt);
    const B = Math.max(0, (num & 0x0000FF) - amt);
    return `rgb(${R},${G},${B})`;
}
