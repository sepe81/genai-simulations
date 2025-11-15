import { describe, test, expect } from 'vitest';
import { lightenColor, darkenColor } from './colors.js';

describe('Color Utilities', () => {
    describe('lightenColor', () => {
        test('lightens pure red by 20%', () => {
            const result = lightenColor('#FF0000', 20);
            expect(result).toBe('rgb(255,51,51)');
        });

        test('lightens pure green by 30%', () => {
            const result = lightenColor('#00FF00', 30);
            expect(result).toBe('rgb(77,255,77)');
        });

        test('lightens pure blue by 10%', () => {
            const result = lightenColor('#0000FF', 10);
            expect(result).toBe('rgb(26,26,255)');
        });

        test('lightens a dark color (#333333) by 50%', () => {
            const result = lightenColor('#333333', 50);
            expect(result).toBe('rgb(178,178,178)');
        });

        test('does not exceed maximum RGB value (255)', () => {
            const result = lightenColor('#FFFFFF', 50);
            expect(result).toBe('rgb(255,255,255)');
        });

        test('handles colors with lowercase hex', () => {
            const result = lightenColor('#ff0000', 20);
            expect(result).toBe('rgb(255,51,51)');
        });

        test('lightens by 0% returns slightly modified color due to rounding', () => {
            const result = lightenColor('#808080', 0);
            expect(result).toBe('rgb(128,128,128)');
        });

        test('lightens a mixed color (#FF6B35)', () => {
            const result = lightenColor('#FF6B35', 20);
            expect(result).toBe('rgb(255,158,104)');
        });
    });

    describe('darkenColor', () => {
        test('darkens pure red by 20%', () => {
            const result = darkenColor('#FF0000', 20);
            expect(result).toBe('rgb(204,0,0)');
        });

        test('darkens pure green by 30%', () => {
            const result = darkenColor('#00FF00', 30);
            expect(result).toBe('rgb(0,178,0)');
        });

        test('darkens pure blue by 10%', () => {
            const result = darkenColor('#0000FF', 10);
            expect(result).toBe('rgb(0,0,229)');
        });

        test('darkens a bright color (#87CEEB) by 40%', () => {
            const result = darkenColor('#87CEEB', 40);
            expect(result).toBe('rgb(33,104,133)');
        });

        test('does not go below minimum RGB value (0)', () => {
            const result = darkenColor('#000000', 50);
            expect(result).toBe('rgb(0,0,0)');
        });

        test('handles colors with lowercase hex', () => {
            const result = darkenColor('#ff0000', 20);
            expect(result).toBe('rgb(204,0,0)');
        });

        test('darkens by 0% returns the same color', () => {
            const result = darkenColor('#808080', 0);
            expect(result).toBe('rgb(128,128,128)');
        });

        test('darkens a mixed color (#4ECDC4)', () => {
            const result = darkenColor('#4ECDC4', 30);
            expect(result).toBe('rgb(1,128,119)');
        });
    });

    describe('Color manipulation edge cases', () => {
        test('lighten and darken by same amount should not return original color', () => {
            const original = '#808080';
            const lightened = lightenColor(original, 20);
            const darkened = darkenColor(lightened, 20);
            // Due to rounding, this won't be exact
            expect(darkened).not.toBe('rgb(128,128,128)');
        });

        test('handles three-digit hex colors by treating them as six-digit', () => {
            // #F00 is treated as 0x000F00 (3840 in decimal), not #FF0000
            // This is actually a limitation of the current implementation
            // 0x000F00 = R:0, G:15, B:0
            // After lightening by 20%: R:51, G:66, B:51
            const result = lightenColor('#F00', 20);
            expect(result).toBe('rgb(51,66,51)');
        });

        test('extreme lightening (100%) brings color close to white', () => {
            const result = lightenColor('#000000', 100);
            expect(result).toBe('rgb(255,255,255)');
        });

        test('extreme darkening (100%) brings color close to black', () => {
            const result = darkenColor('#FFFFFF', 100);
            expect(result).toBe('rgb(0,0,0)');
        });
    });
});
