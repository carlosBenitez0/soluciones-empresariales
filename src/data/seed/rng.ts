// Small deterministic random helpers so the demo seed is identical on every build and browser.

export type Rng = ReturnType<typeof createRng>;

/** mulberry32: tiny, fast, good-enough PRNG for fixture data (not for security). */
export const createRng = (seed: number) => {
  let a = seed >>> 0;
  const next = (): number => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const int = (min: number, max: number) => min + Math.floor(next() * (max - min + 1));
  const pick = <T>(items: readonly T[]): T => items[Math.floor(next() * items.length)];
  const chance = (probability: number) => next() < probability;

  /** Picks an index using relative weights, e.g. [60, 25, 15]. */
  const weightedIndex = (weights: readonly number[]) => {
    const total = weights.reduce((sum, w) => sum + w, 0);
    let roll = next() * total;
    for (let i = 0; i < weights.length; i++) {
      roll -= weights[i];
      if (roll < 0) return i;
    }
    return weights.length - 1;
  };

  const pickWeighted = <T>(items: readonly T[], weights: readonly number[]): T => items[weightedIndex(weights)];

  /** Returns `count` distinct items in random order. */
  const sample = <T>(items: readonly T[], count: number): T[] => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(next() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, Math.min(count, copy.length));
  };

  return { next, int, pick, chance, weightedIndex, pickWeighted, sample };
};

// Same alphabet as src/lib/codes.ts (no 0/O, 1/I/L)
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

export const seededCode = (rng: Rng, prefix: string, length = 6) =>
  `${prefix}-${Array.from({ length }, () => rng.pick(CODE_ALPHABET.split(''))).join('')}`;

const DAY_MS = 24 * 60 * 60 * 1000;

/** Fixed reference date for the seed ("today" in the demo data). */
export const SEED_REFERENCE_DATE = '2026-10-10';

export const addDays = (isoDate: string, days: number): string =>
  new Date(Date.parse(`${isoDate}T12:00:00Z`) + days * DAY_MS).toISOString().split('T')[0];

export const daysBetween = (fromIso: string, toIso: string): number =>
  Math.round((Date.parse(`${toIso}T12:00:00Z`) - Date.parse(`${fromIso}T12:00:00Z`)) / DAY_MS);

/** Lowercase ASCII slug: "María José" -> "maria.jose" (with the given separator). */
export const slugify = (value: string, separator = '.') =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, separator)
    .replace(new RegExp(`^\\${separator}|\\${separator}$`, 'g'), '');
