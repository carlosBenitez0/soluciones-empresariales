import { describe, it, expect } from 'vitest';
import { buildCompanyPortalView } from '../lib/companyPortal';
import { CandidateApplication, PipelineStage, Vacancy } from '../types';
import { INITIAL_VACANCIES } from '../data/mockData';

const company = { id: 'emp-1', name: 'Industrias del Norte' };

const vacancy: Vacancy = { ...INITIAL_VACANCIES[0], id: 'vac-a', companyId: 'emp-1' };
const otherCompanyVacancy: Vacancy = { ...INITIAL_VACANCIES[1], id: 'vac-b', companyId: 'emp-2' };

const app = (id: string, status: PipelineStage, appliedAt: string, vacancyId = 'vac-a'): CandidateApplication => ({
  id,
  trackingCode: `APP-${id}`,
  vacancyId,
  vacancyTitle: vacancy.title,
  fullName: `Persona ${id}`,
  email: `persona${id}@correo.sv`,
  phone: `+503 7000-000${id}`,
  experienceYears: 3,
  expectedSalary: 800,
  appliedAt,
  status,
  availability: 'Inmediata',
  testScores: { technicalScore: 90, psychometricScore: 80, testNotes: 'Nota interna' },
});

describe('buildCompanyPortalView', () => {
  const applications = [
    app('1', 'Entrevista Inicial', '2026-10-02'),
    app('2', 'Contratación y Firma', '2026-10-01'),
    app('3', 'Solicitud Recibida', '2026-10-03'),
    app('4', 'Entrevista Inicial', '2026-10-01', 'vac-b'),
  ];

  it('only includes the vacancies of the company with counts per stage', () => {
    const view = buildCompanyPortalView(company, [vacancy, otherCompanyVacancy], applications);

    expect(view.vacancies).toHaveLength(1);
    expect(view.vacancies[0].totalApplicants).toBe(3);
    expect(view.vacancies[0].byStage['Entrevista Inicial']).toBe(1);
    expect(view.vacancies[0].byStage['Contratación y Firma']).toBe(1);
  });

  it('does not expose personal data of candidates that are not hired', () => {
    const view = buildCompanyPortalView(company, [vacancy], applications);
    const notHired = view.vacancies[0].applicants.filter((a) => !a.hired);
    const serialized = JSON.stringify(notHired);

    expect(notHired).toHaveLength(2);
    ['Persona 1', 'Persona 3', 'persona1@correo.sv', '7000-0001', 'APP-1', '800', 'Nota interna'].forEach((secret) =>
      expect(serialized).not.toContain(secret)
    );
  });

  it('reveals contact data only for hired candidates', () => {
    const view = buildCompanyPortalView(company, [vacancy], applications);
    const hired = view.vacancies[0].applicants.find((a) => a.status === 'Contratación y Firma');

    expect(hired?.label).toBe('Postulante #1');
    expect(hired?.hired).toEqual({
      fullName: 'Persona 2',
      email: 'persona2@correo.sv',
      phone: '+503 7000-0002',
      availability: 'Inmediata',
    });
  });
});
