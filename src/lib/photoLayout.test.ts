import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SLOTS, fillSlots, poolsFor, shapeOf } from './photoLayout.ts';

const LANDSCAPE = 3 / 2;
const PORTRAIT = 2 / 3;

let seed = 1;
const notRandom = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);

test('photos are grouped by the shape they fit', () => {
  assert.equal(shapeOf(LANDSCAPE), 'landscape');
  assert.equal(shapeOf(PORTRAIT), 'portrait');
  assert.equal(shapeOf(1), 'square');
});

test('each slot only offers photos of its own shape', () => {
  const ratios = [LANDSCAPE, PORTRAIT, PORTRAIT, LANDSCAPE, PORTRAIT];
  const pools = poolsFor(ratios);
  SLOTS.forEach((slot, i) => {
    for (const photo of pools[i]) assert.equal(shapeOf(ratios[photo]), slot.shape);
  });
});

test('every slot gets a photo of the right shape, and no photo shows twice', () => {
  const ratios = [LANDSCAPE, LANDSCAPE, LANDSCAPE, PORTRAIT, PORTRAIT, PORTRAIT, PORTRAIT, PORTRAIT, PORTRAIT];
  for (let run = 0; run < 50; run++) {
    const picks = fillSlots(poolsFor(ratios), notRandom);
    assert.equal(picks.length, SLOTS.length);
    picks.forEach((photo, i) => {
      assert.notEqual(photo, null, `slot ${i} is empty`);
      assert.equal(shapeOf(ratios[photo!]), SLOTS[i].shape);
    });
    assert.equal(new Set(picks).size, picks.length, 'a photo was picked twice');
  }
});

test('different visits can show different photos', () => {
  const ratios = Array.from({ length: 12 }, (_, i) => (i % 3 === 0 ? LANDSCAPE : PORTRAIT));
  const seen = new Set<string>();
  for (let run = 0; run < 20; run++) seen.add(fillSlots(poolsFor(ratios), notRandom).join(','));
  assert.ok(seen.size > 1);
});

test('slots stay empty when there are not enough photos of their shape', () => {
  const picks = fillSlots(poolsFor([LANDSCAPE, PORTRAIT]), notRandom);
  assert.equal(picks.filter((p) => p !== null).length, 2);
});

test('slots stay inside the grid and never overlap within a row', () => {
  for (const slot of SLOTS) {
    assert.ok(slot.desktop[0] >= 1 && slot.desktop[1] <= 13, `desktop ${slot.desktop}`);
    assert.ok(slot.mobile[0] >= 1 && slot.mobile[1] <= 5, `mobile ${slot.mobile}`);
  }
  SLOTS.forEach((a, i) =>
    SLOTS.slice(i + 1).forEach((b) => {
      if (a.row !== b.row) return;
      const [left, right] = [a.desktop, b.desktop].sort((x, y) => x[0] - y[0]);
      assert.ok(left[1] < right[0], `row ${a.row}: ${left} and ${right} touch`);
    }),
  );
});
