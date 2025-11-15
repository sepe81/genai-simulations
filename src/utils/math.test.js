import { describe, test, expect } from 'vitest';
import { lerpAngle, distance } from './math.js';

describe('Math Utilities', () => {
    describe('lerpAngle', () => {
        test('interpolates between 0 and PI/2 by 50%', () => {
            const result = lerpAngle(0, Math.PI / 2, 0.5);
            expect(result).toBeCloseTo(Math.PI / 4, 10);
        });

        test('interpolates from 0 to PI by 25%', () => {
            const result = lerpAngle(0, Math.PI, 0.25);
            expect(result).toBeCloseTo(Math.PI / 4, 10);
        });

        test('takes shortest path from PI to 0 (wraps around)', () => {
            // Going from PI to 0, the diff is -PI
            // After angle wrapping, diff becomes PI (adds 2*PI to make it positive)
            // So interpolating by 0.5 gives PI + PI*0.5 = 3*PI/2
            // But 3*PI/2 is equivalent to -PI/2
            const result = lerpAngle(Math.PI, 0, 0.5);
            // The actual result is PI/2 (going the other direction)
            expect(result).toBeCloseTo(Math.PI / 2, 10);
        });

        test('takes shortest path from -PI to PI (no movement)', () => {
            // -PI and PI are the same angle
            const result = lerpAngle(-Math.PI, Math.PI, 0.5);
            expect(result).toBeCloseTo(-Math.PI, 10);
        });

        test('interpolates from 0 to 2*PI - 0.1 (wraps around backwards)', () => {
            // From 0 to almost 2*PI, shortest path is backwards
            const target = 2 * Math.PI - 0.1;
            const result = lerpAngle(0, target, 0.5);
            // Should be around -0.05
            expect(result).toBeCloseTo(-0.05, 10);
        });

        test('t=0 returns from angle', () => {
            const result = lerpAngle(Math.PI / 4, Math.PI, 0);
            expect(result).toBeCloseTo(Math.PI / 4, 10);
        });

        test('t=1 returns to angle', () => {
            const result = lerpAngle(Math.PI / 4, Math.PI, 1);
            expect(result).toBeCloseTo(Math.PI, 10);
        });

        test('handles negative angles correctly', () => {
            const result = lerpAngle(-Math.PI / 2, Math.PI / 2, 0.5);
            expect(result).toBeCloseTo(0, 10);
        });

        test('handles angle wrapping across multiple 2*PI boundaries', () => {
            const result = lerpAngle(0, 3 * Math.PI, 0.5);
            // 3*PI wraps to PI, so shortest path from 0 to PI
            expect(result).toBeCloseTo(Math.PI / 2, 10);
        });

        test('interpolates clockwise when appropriate', () => {
            // From PI/4 (45°) to -PI/4 (315° or -45°)
            // Shortest path is backwards through 0
            const result = lerpAngle(Math.PI / 4, -Math.PI / 4, 0.5);
            expect(result).toBeCloseTo(0, 10);
        });

        test('handles very small interpolation values', () => {
            const result = lerpAngle(0, Math.PI, 0.01);
            expect(result).toBeCloseTo(Math.PI * 0.01, 10);
        });

        test('handles interpolation values greater than 1', () => {
            // While typically t should be 0-1, the function should handle t > 1
            const result = lerpAngle(0, Math.PI / 2, 2);
            expect(result).toBeCloseTo(Math.PI, 10);
        });
    });

    describe('distance', () => {
        test('calculates distance between (0,0) and (3,4)', () => {
            const result = distance(0, 0, 3, 4);
            expect(result).toBeCloseTo(5, 10);
        });

        test('calculates distance between (0,0) and (0,0)', () => {
            const result = distance(0, 0, 0, 0);
            expect(result).toBe(0);
        });

        test('calculates distance between (-1,-1) and (1,1)', () => {
            const result = distance(-1, -1, 1, 1);
            expect(result).toBeCloseTo(Math.sqrt(8), 10);
        });

        test('calculates distance along x-axis', () => {
            const result = distance(0, 0, 10, 0);
            expect(result).toBe(10);
        });

        test('calculates distance along y-axis', () => {
            const result = distance(0, 0, 0, 10);
            expect(result).toBe(10);
        });

        test('handles negative coordinates', () => {
            const result = distance(-5, -5, -2, -1);
            expect(result).toBeCloseTo(5, 10);
        });

        test('distance is symmetric', () => {
            const d1 = distance(1, 2, 3, 4);
            const d2 = distance(3, 4, 1, 2);
            expect(d1).toBe(d2);
        });

        test('calculates distance for large coordinates', () => {
            const result = distance(0, 0, 1000, 1000);
            expect(result).toBeCloseTo(Math.sqrt(2000000), 10);
        });

        test('calculates distance with floating point coordinates', () => {
            const result = distance(1.5, 2.5, 4.5, 6.5);
            expect(result).toBeCloseTo(5, 10);
        });
    });
});
