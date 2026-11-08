import { globSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { expect, test } from '@playwright/test';

const root = path.resolve(import.meta.dirname, '..');
const pages = globSync('src/**/index.html', { cwd: root }).sort();

// Scripted play for simulations whose risky code only runs during gameplay.
// Key: page path relative to the repo root.
const interactions = {
    'src/math-games/dragon/index.html': playDragonRounds,
};

function collectErrors(page) {
    const errors = [];
    page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
    page.on('console', (message) => {
        if (message.type() === 'error') {
            errors.push(`console.error: ${message.text()}`);
        }
    });
    return errors;
}

// Generic input that reaches the mouse and keyboard handlers of any simulation.
async function poke(page) {
    const { width, height } = page.viewportSize();
    await page.mouse.move(width * 0.3, height * 0.5);
    await page.mouse.move(width * 0.7, height * 0.4, { steps: 8 });
    await page.mouse.click(width * 0.5, height * 0.5);
    for (const key of ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'Space']) {
        await page.keyboard.press(key);
    }
    await page.waitForTimeout(500);
}

for (const file of pages) {
    test(file, async ({ page }) => {
        const errors = collectErrors(page);
        await page.goto(pathToFileURL(path.join(root, file)).href);
        await page.waitForTimeout(1000);
        await poke(page);
        await interactions[file]?.(page);
        expect(errors).toEqual([]);
    });
}

// Advances the page's fake clock until the predicate holds in the page.
async function advanceUntil(page, predicate, maxMs = 20_000) {
    for (let elapsed = 0; elapsed < maxMs; elapsed += 100) {
        if (await page.evaluate(predicate)) {
            return;
        }
        await page.clock.runFor(100);
    }
    throw new Error(`Timed out waiting for: ${predicate}`);
}

function dragonProfile(style) {
    return {
        muted: true,
        active: 'smoke',
        profiles: [{
            id: 'smoke', name: 'Smoke', style, petName: 'Funki', hatched: true, gems: 0,
            looks: { dragon: 'green', magic: 'midnight' }, stars: {}, facts: {}, stickers: {}, totalCorrect: 0, bestCombo: 0,
        }],
    };
}

// Plays a shortened round of 3 questions per style to the result screen:
// one wrong answer (hint, retry queue), then correct answers.
async function playDragonRounds(page) {
    await page.clock.install();
    for (const style of ['dragon', 'magic']) {
        await page.evaluate((save) => localStorage.setItem('einmaleins-abenteuer-v2', JSON.stringify(save)), dragonProfile(style));
        await page.reload();
        await page.clock.runFor(500);
        await page.getByRole('button', { name: /1er-Reihe/ }).first().click();
        await page.evaluate(() => {
            round.queue.splice(3);
            round.total = round.queue.length;
            round.hp = round.queue.length;
        });

        let answeredWrong = false;
        for (;;) {
            await advanceUntil(page, () => screen === 'result' || (round && !round.locked && round.current));
            if (await page.evaluate(() => screen === 'result')) {
                break;
            }
            const answer = await page.evaluate(() => round.current.answer);
            await page.keyboard.type(String(answeredWrong ? answer : answer + 1));
            await page.keyboard.press('Enter');
            answeredWrong = true;
            await page.clock.runFor(100);
        }
        await expect(page.locator('#resultCard')).toContainText('Aufgaben');
    }
}
