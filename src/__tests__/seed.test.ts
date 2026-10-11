import { describe, it, expect } from 'vitest';
import { buildSeedState, DEMO_ACCESS_CODE } from '../data/seed';
import { PIPELINE_STEPS } from '../lib/tracking';
import { ACCESS_CODE_PATTERN, TRACKING_CODE_PATTERN } from '../lib/codes';
import { buildCompanyPortalView } from '../lib/companyPortal';
import { CONFIDENTIAL_COMPANY_NAME } from '../types';

const seed = buildSeedState();

const unique = <T>(items: T[]) => new Set(items).size === items.length;

describe('demo seed', () => {
  it('is deterministic', () => {
    expect(buildSeedState()).toEqual(seed);
  });

  it('has the agreed volume', () => {
    expect(seed.categories).toHaveLength(10);
    expect(seed.clientCompanies).toHaveLength(15);
    expect(seed.vacancies).toHaveLength(45);
    expect(seed.candidateApplications).toHaveLength(250);
    expect(seed.staffingRequests).toHaveLength(30);
  });

  it('keeps the hand-written records used in docs and tests', () => {
    expect(seed.vacancies.map((v) => v.id)).toEqual(expect.arrayContaining(['vac-1', 'vac-2', 'vac-7']));
    expect(seed.candidateApplications.find((a) => a.trackingCode === 'APP-5011')?.fullName).toBe('María Elena Guardado');
    expect(seed.staffingRequests.some((r) => r.trackingCode === 'REQ-8810')).toBe(true);
  });

  it('has unique ids and codes with valid formats', () => {
    for (const collection of Object.values(seed)) {
      expect(unique(collection.map((item: { id: string }) => item.id))).toBe(true);
    }
    const appCodes = seed.candidateApplications.map((a) => a.trackingCode);
    const reqCodes = seed.staffingRequests.map((r) => r.trackingCode);
    expect(unique([...appCodes, ...reqCodes])).toBe(true);
    [...appCodes, ...reqCodes].forEach((code) => expect(code).toMatch(TRACKING_CODE_PATTERN));

    const accessCodes = seed.clientCompanies.flatMap((c) => (c.accessCode ? [c.accessCode] : []));
    expect(unique(accessCodes)).toBe(true);
    accessCodes.forEach((code) => expect(code).toMatch(ACCESS_CODE_PATTERN));
    expect(unique(seed.candidateApplications.map((a) => a.email))).toBe(true);
  });

  it('keeps referential integrity', () => {
    const vacancyById = new Map(seed.vacancies.map((v) => [v.id, v]));
    const companyIds = new Set(seed.clientCompanies.map((c) => c.id));
    const categoryNames = new Set(seed.categories.map((c) => c.name));

    seed.vacancies.forEach((v) => {
      expect(v.companyId && companyIds.has(v.companyId)).toBe(true);
      expect(categoryNames.has(v.category)).toBe(true);
      expect(v.isConfidential).toBe(v.company === CONFIDENTIAL_COMPANY_NAME);
    });

    seed.candidateApplications.forEach((a) => {
      const vacancy = vacancyById.get(a.vacancyId!);
      expect(vacancy).toBeDefined();
      expect(a.vacancyTitle).toBe(vacancy!.title);
      expect(a.appliedAt >= vacancy!.postedAt).toBe(true);
      expect(PIPELINE_STEPS).toContain(a.status);
    });
  });

  it('follows the business rules of the pipeline', () => {
    const stageIdx = (status: string) => PIPELINE_STEPS.indexOf(status as (typeof PIPELINE_STEPS)[number]);
    seed.candidateApplications.forEach((a) => {
      // Evaluation results only exist from the testing stage on
      if (stageIdx(a.status) < 3 && a.trackingCode !== 'APP-5011') expect(a.testScores).toBeUndefined();
    });

    const counts = PIPELINE_STEPS.map((s) => seed.candidateApplications.filter((a) => a.status === s).length);
    expect(counts[0]).toBeGreaterThan(counts[6]); // funnel shape
    expect(counts[6]).toBeGreaterThan(0); // someone was hired
  });

  it('companies: pending ones have no access code, deactivated ones have no open vacancies', () => {
    const pending = seed.clientCompanies.filter((c) => c.status === 'Pendiente');
    const inactive = seed.clientCompanies.filter((c) => c.status === 'Inactiva');
    expect(pending).toHaveLength(2);
    pending.forEach((c) => expect(c.accessCode).toBeUndefined());
    inactive.forEach((c) =>
      seed.vacancies.filter((v) => v.companyId === c.id).forEach((v) => expect(v.isActive).toBe(false))
    );
    expect(seed.categories.filter((c) => !c.isActive).every((c) => !seed.vacancies.some((v) => v.category === c.name))).toBe(
      true
    );
  });

  it('the demo company can be used in the portal right away', () => {
    const demo = seed.clientCompanies.find((c) => c.accessCode === DEMO_ACCESS_CODE);
    expect(demo?.status).toBe('Aprobada');

    const view = buildCompanyPortalView(demo!, seed.vacancies, seed.candidateApplications);
    expect(view.vacancies.length).toBeGreaterThanOrEqual(5);
    expect(view.vacancies.reduce((sum, v) => sum + v.totalApplicants, 0)).toBeGreaterThan(10);
    expect(view.vacancies.some((v) => v.applicants.some((a) => a.hired))).toBe(true);
  });
});
