export type Shape = 'landscape' | 'square' | 'portrait';

/** Grid lines: [first column, last column exclusive], as used by `grid-column`. */
export type Columns = [number, number];

export interface Slot {
  shape: Shape;
  /** Desktop grid row (1-based). On mobile the slots simply stack. */
  row: number;
  desktop: Columns;
  mobile: Columns;
  /** `sizes` for the slot's image, so the browser downloads the width the slot shows. */
  sizes: string;
}

const LANDSCAPE_SIZES = '(max-width: 760px) 100vw, 58vw';
const PORTRAIT_SIZES = '(max-width: 760px) 75vw, 33vw';

// The wall is fixed; only which photo fills each slot changes per visit.
// Two landscape slots to four portrait ones matches the 1:2 mix of the archive.
export const SLOTS: Slot[] = [
  { shape: 'landscape', row: 1, desktop: [1, 8], mobile: [1, 5], sizes: LANDSCAPE_SIZES },
  { shape: 'portrait', row: 1, desktop: [9, 13], mobile: [2, 5], sizes: PORTRAIT_SIZES },
  { shape: 'portrait', row: 2, desktop: [1, 5], mobile: [1, 4], sizes: PORTRAIT_SIZES },
  { shape: 'landscape', row: 2, desktop: [6, 13], mobile: [1, 5], sizes: LANDSCAPE_SIZES },
  { shape: 'portrait', row: 3, desktop: [3, 7], mobile: [2, 5], sizes: PORTRAIT_SIZES },
  { shape: 'portrait', row: 3, desktop: [8, 12], mobile: [1, 4], sizes: PORTRAIT_SIZES },
];

export function shapeOf(ratio: number): Shape {
  if (ratio >= 1.2) return 'landscape';
  if (ratio > 0.85) return 'square';
  return 'portrait';
}

/** For each slot, the indexes of the photos (by width / height ratio) that fit it. Computed once at build time. */
export function poolsFor(ratios: number[]): number[][] {
  return SLOTS.map((slot) => ratios.flatMap((ratio, index) => (shapeOf(ratio) === slot.shape ? [index] : [])));
}

/** Picks one photo per slot from its pool, never the same photo twice. Slots with nothing left stay null. */
export function fillSlots(pools: number[][], random: () => number = Math.random): Array<number | null> {
  const used = new Set<number>();
  return pools.map((pool) => {
    const available = pool.filter((photo) => !used.has(photo));
    if (available.length === 0) return null;
    const photo = available[Math.floor(random() * available.length)];
    used.add(photo);
    return photo;
  });
}
