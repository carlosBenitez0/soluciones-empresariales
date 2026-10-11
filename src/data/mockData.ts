import { CompetitorComparison } from '../types';
import { buildSeedState } from './seed';

// Initial demo data comes from the deterministic seed (src/data/seed).
const seed = buildSeedState();

export const INITIAL_VACANCIES = seed.vacancies;
export const INITIAL_CATEGORIES = seed.categories;
export const INITIAL_CLIENT_COMPANIES = seed.clientCompanies;
export const INITIAL_STAFFING_REQUESTS = seed.staffingRequests;
export const INITIAL_CANDIDATE_APPLICATIONS = seed.candidateApplications;

export const DEFAULT_CATEGORY_NAMES = INITIAL_CATEGORIES.filter((c) => c.isActive).map((c) => c.name);

export const COMPETITOR_COMPARISON: CompetitorComparison[] = [
  {
    attribute: 'Tiempo de respuesta a solicitud',
    vinculosEstrategicos: '3 días',
    latinTopJobs: '5 días',
    solucionesEmpresariales: '1 a 2 días (Garantizado)',
  },
  {
    attribute: 'Tiempo total de incorporación',
    vinculosEstrategicos: '~45 días (Mes y medio)',
    latinTopJobs: '~30 días (1 mes)',
    solucionesEmpresariales: '~24 días estimados',
  },
  {
    attribute: 'Disponibilidad para nuevos casos',
    vinculosEstrategicos: 'Media / Saturado',
    latinTopJobs: 'Media / Alta carga',
    solucionesEmpresariales: 'Alta prioridad y dedicación exclusiva',
  }
];
