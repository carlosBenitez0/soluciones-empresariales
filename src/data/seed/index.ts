import type { Collections } from '../../store/supabaseSync';
import { generateSeed } from './generateSeed';

export { DEMO_ACCESS_CODE, SEED_SIZES } from './generateSeed';

/** Bump when the seed changes so browsers with older persisted data reload it. */
export const SEED_VERSION = 3;

/** Fresh copy of the deterministic demo dataset (safe to mutate). */
export const buildSeedState = (): Collections => generateSeed();
