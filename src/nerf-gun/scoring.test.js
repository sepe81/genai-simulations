import { describe, test, expect } from 'vitest';
import { calculateScoreFromDistance, convertToViewBoxCoordinates, calculateScore } from './scoring.js';

describe('Nerf Gun Scoring', () => {
    describe('calculateScoreFromDistance', () => {
        test('returns 10 for bullseye (distance <= 10)', () => {
            expect(calculateScoreFromDistance(0)).toBe(10);
            expect(calculateScoreFromDistance(5)).toBe(10);
            expect(calculateScoreFromDistance(10)).toBe(10);
        });

        test('returns 9 for distance <= 20', () => {
            expect(calculateScoreFromDistance(11)).toBe(9);
            expect(calculateScoreFromDistance(15)).toBe(9);
            expect(calculateScoreFromDistance(20)).toBe(9);
        });

        test('returns 8 for distance <= 30 (red ring)', () => {
            expect(calculateScoreFromDistance(21)).toBe(8);
            expect(calculateScoreFromDistance(25)).toBe(8);
            expect(calculateScoreFromDistance(30)).toBe(8);
        });

        test('returns 7 for distance <= 40', () => {
            expect(calculateScoreFromDistance(31)).toBe(7);
            expect(calculateScoreFromDistance(35)).toBe(7);
            expect(calculateScoreFromDistance(40)).toBe(7);
        });

        test('returns 6 for distance <= 50 (cyan ring)', () => {
            expect(calculateScoreFromDistance(41)).toBe(6);
            expect(calculateScoreFromDistance(45)).toBe(6);
            expect(calculateScoreFromDistance(50)).toBe(6);
        });

        test('returns 5 for distance <= 60', () => {
            expect(calculateScoreFromDistance(51)).toBe(5);
            expect(calculateScoreFromDistance(55)).toBe(5);
            expect(calculateScoreFromDistance(60)).toBe(5);
        });

        test('returns 4 for distance <= 70 (white ring)', () => {
            expect(calculateScoreFromDistance(61)).toBe(4);
            expect(calculateScoreFromDistance(65)).toBe(4);
            expect(calculateScoreFromDistance(70)).toBe(4);
        });

        test('returns 3 for distance <= 80', () => {
            expect(calculateScoreFromDistance(71)).toBe(3);
            expect(calculateScoreFromDistance(75)).toBe(3);
            expect(calculateScoreFromDistance(80)).toBe(3);
        });

        test('returns 2 for distance <= 90 (black ring)', () => {
            expect(calculateScoreFromDistance(81)).toBe(2);
            expect(calculateScoreFromDistance(85)).toBe(2);
            expect(calculateScoreFromDistance(90)).toBe(2);
        });

        test('returns 1 for distance <= 100', () => {
            expect(calculateScoreFromDistance(91)).toBe(1);
            expect(calculateScoreFromDistance(95)).toBe(1);
            expect(calculateScoreFromDistance(100)).toBe(1);
        });

        test('returns 1 for outermost ring (distance <= 120)', () => {
            expect(calculateScoreFromDistance(101)).toBe(1);
            expect(calculateScoreFromDistance(110)).toBe(1);
            expect(calculateScoreFromDistance(120)).toBe(1);
        });

        test('returns 0 for miss (distance > 120)', () => {
            expect(calculateScoreFromDistance(121)).toBe(0);
            expect(calculateScoreFromDistance(150)).toBe(0);
            expect(calculateScoreFromDistance(1000)).toBe(0);
        });

        test('handles boundary conditions precisely', () => {
            expect(calculateScoreFromDistance(10.0)).toBe(10);
            expect(calculateScoreFromDistance(10.1)).toBe(9);
            expect(calculateScoreFromDistance(20.0)).toBe(9);
            expect(calculateScoreFromDistance(20.1)).toBe(8);
        });

        test('handles decimal distances', () => {
            expect(calculateScoreFromDistance(9.5)).toBe(10);
            expect(calculateScoreFromDistance(10.5)).toBe(9);
            expect(calculateScoreFromDistance(119.9)).toBe(1);
            expect(calculateScoreFromDistance(120.1)).toBe(0);
        });
    });

    describe('convertToViewBoxCoordinates', () => {
        test('converts center hit correctly', () => {
            const targetRect = {
                left: 100,
                top: 100,
                width: 200,
                height: 200
            };

            // Hit at exact center (200, 200)
            const result = convertToViewBoxCoordinates(200, 200, targetRect);

            expect(result.centerX).toBe(200);
            expect(result.centerY).toBe(200);
            expect(result.distance).toBe(0);
            expect(result.distanceInViewBox).toBe(0);
        });

        test('converts off-center hit correctly', () => {
            const targetRect = {
                left: 100,
                top: 100,
                width: 200,
                height: 200
            };

            // Hit 10 pixels to the right of center in screen space
            // Scale: 200 / 250 = 0.8, so 10 screen pixels = 12.5 viewBox units
            const result = convertToViewBoxCoordinates(210, 200, targetRect);

            expect(result.centerX).toBe(200);
            expect(result.centerY).toBe(200);
            expect(result.distance).toBe(10);
            expect(result.distanceInViewBox).toBeCloseTo(12.5, 5);
        });

        test('handles different target sizes', () => {
            const targetRect = {
                left: 0,
                top: 0,
                width: 500,
                height: 500
            };

            // Hit 50 pixels from center
            // Scale: 500 / 250 = 2, so 50 screen pixels = 25 viewBox units
            const result = convertToViewBoxCoordinates(300, 250, targetRect);

            expect(result.centerX).toBe(250);
            expect(result.centerY).toBe(250);
            expect(result.distance).toBe(50);
            expect(result.distanceInViewBox).toBeCloseTo(25, 5);
        });

        test('handles diagonal hits (Pythagorean theorem)', () => {
            const targetRect = {
                left: 0,
                top: 0,
                width: 250,
                height: 250
            };

            // Hit at (128, 128), which is 3,3 from center (125, 125)
            // Distance should be sqrt(3^2 + 3^2) = sqrt(18) ≈ 4.24
            const result = convertToViewBoxCoordinates(128, 128, targetRect);

            expect(result.distance).toBeCloseTo(Math.sqrt(18), 5);
            // Scale is 1.0 (250/250)
            expect(result.distanceInViewBox).toBeCloseTo(Math.sqrt(18), 5);
        });

        test('handles custom viewBox width', () => {
            const targetRect = {
                left: 0,
                top: 0,
                width: 300,
                height: 300
            };

            // Using custom viewBox width of 300
            const result = convertToViewBoxCoordinates(180, 150, targetRect, 300);

            // Scale: 300 / 300 = 1.0
            expect(result.distanceInViewBox).toBeCloseTo(30, 5);
        });

        test('handles target positioned away from origin', () => {
            const targetRect = {
                left: 500,
                top: 300,
                width: 200,
                height: 200
            };

            // Center is at (600, 400), hit at (610, 400)
            const result = convertToViewBoxCoordinates(610, 400, targetRect);

            expect(result.centerX).toBe(600);
            expect(result.centerY).toBe(400);
            expect(result.distance).toBe(10);
            expect(result.distanceInViewBox).toBeCloseTo(12.5, 5);
        });
    });

    describe('calculateScore (integration)', () => {
        test('calculates bullseye score for center hit', () => {
            const targetRect = {
                left: 100,
                top: 100,
                width: 250,
                height: 250
            };

            // Hit at exact center
            const score = calculateScore(225, 225, targetRect);
            expect(score).toBe(10);
        });

        test('calculates score for ring 8 hit', () => {
            const targetRect = {
                left: 0,
                top: 0,
                width: 250,
                height: 250
            };

            // Center at (125, 125), hit at (150, 125)
            // Distance = 25, which should be ring 8
            const score = calculateScore(150, 125, targetRect);
            expect(score).toBe(8);
        });

        test('calculates score for miss', () => {
            const targetRect = {
                left: 0,
                top: 0,
                width: 250,
                height: 250
            };

            // Center at (125, 125), hit at (250, 125)
            // Distance = 125, which is a miss (> 120)
            const score = calculateScore(250, 125, targetRect);
            expect(score).toBe(0);
        });

        test('calculates score for outer ring hit', () => {
            const targetRect = {
                left: 0,
                top: 0,
                width: 250,
                height: 250
            };

            // Center at (125, 125), hit at (235, 125)
            // Distance = 110, which should be ring 1
            const score = calculateScore(235, 125, targetRect);
            expect(score).toBe(1);
        });

        test('handles scaled target correctly', () => {
            const targetRect = {
                left: 0,
                top: 0,
                width: 500,
                height: 500
            };

            // Center at (250, 250), hit at (270, 250)
            // Distance = 20 pixels, but in viewBox units = 10
            // Should be bullseye
            const score = calculateScore(270, 250, targetRect);
            expect(score).toBe(10);
        });

        test('handles boundary between rings accurately', () => {
            const targetRect = {
                left: 0,
                top: 0,
                width: 250,
                height: 250
            };

            // Just inside ring 9 boundary (distance = 20)
            const score1 = calculateScore(145, 125, targetRect);
            expect(score1).toBe(9);

            // Just outside ring 9 boundary (distance = 21)
            const score2 = calculateScore(146, 125, targetRect);
            expect(score2).toBe(8);
        });
    });

    describe('Edge Cases and Boundary Conditions', () => {
        test('handles zero-width target gracefully', () => {
            const targetRect = {
                left: 100,
                top: 100,
                width: 0,
                height: 0
            };

            // This will cause division by zero in scale calculation (0/250 = 0)
            // Then dividing distance by 0 gives Infinity or NaN
            const result = convertToViewBoxCoordinates(100, 100, targetRect);
            // With distance = 0 and scale = 0, we get 0/0 = NaN
            expect(result.distanceInViewBox).toBe(NaN);
        });

        test('handles very small target', () => {
            const targetRect = {
                left: 0,
                top: 0,
                width: 1,
                height: 1
            };

            // Very small target means small scale, large viewBox distances
            const result = convertToViewBoxCoordinates(0.5, 0.5, targetRect);
            expect(result.distanceInViewBox).toBe(0);
        });

        test('handles very large target', () => {
            const targetRect = {
                left: 0,
                top: 0,
                width: 10000,
                height: 10000
            };

            // Large target means large scale
            const score = calculateScore(5100, 5000, targetRect);
            // Distance in screen = 100, scale = 40, viewBox distance = 2.5
            expect(score).toBe(10);
        });

        test('handles negative screen coordinates', () => {
            const targetRect = {
                left: -100,
                top: -100,
                width: 200,
                height: 200
            };

            // Center at (0, 0), hit at (0, 0)
            const score = calculateScore(0, 0, targetRect);
            expect(score).toBe(10);
        });
    });
});
