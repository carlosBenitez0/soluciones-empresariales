import type { Collections } from '../../store/supabaseSync';
import {
  INITIAL_VACANCIES,
  INITIAL_STAFFING_REQUESTS,
  INITIAL_CANDIDATE_APPLICATIONS,
  INITIAL_CATEGORIES,
} from '../mockData';

/** Bump when the seed changes so browsers with older persisted data reload it. */
export const SEED_VERSION = 1;

export const buildSeedState = (): Collections => ({
  vacancies: INITIAL_VACANCIES,
  staffingRequests: INITIAL_STAFFING_REQUESTS,
  candidateApplications: INITIAL_CANDIDATE_APPLICATIONS,
  categories: INITIAL_CATEGORIES,
  clientCompanies: [],
});
