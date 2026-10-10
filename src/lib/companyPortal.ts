import { Availability, CandidateApplication, ClientCompany, PipelineStage, Vacancy } from '../types';
import { PIPELINE_STEPS } from './tracking';

/**
 * Privacy rule of the intermediary model: a client company only sees how many people applied
 * and which stage each one is in. Personal data is revealed only once a candidate is hired.
 */
export const REVEAL_STAGE: PipelineStage = 'Contratación y Firma';

export interface HiredCandidate {
  fullName: string;
  email: string;
  phone: string;
  availability?: Availability;
}

export interface PortalApplicant {
  /** Anonymous label, e.g. "Postulante #3". Stable per vacancy (ordered by application date). */
  label: string;
  status: PipelineStage;
  appliedAt: string;
  hired?: HiredCandidate;
}

export interface PortalVacancy {
  id: string;
  title: string;
  isActive: boolean;
  postedAt: string;
  totalApplicants: number;
  byStage: Record<PipelineStage, number>;
  applicants: PortalApplicant[];
}

export interface CompanyPortalView {
  companyName: string;
  vacancies: PortalVacancy[];
}

const emptyStageCounts = (): Record<PipelineStage, number> =>
  Object.fromEntries(PIPELINE_STEPS.map((stage) => [stage, 0])) as Record<PipelineStage, number>;

export const buildCompanyPortalView = (
  company: Pick<ClientCompany, 'id' | 'name'>,
  vacancies: Vacancy[],
  applications: CandidateApplication[]
): CompanyPortalView => ({
  companyName: company.name,
  vacancies: vacancies
    .filter((v) => v.companyId === company.id)
    .map((vacancy) => {
      const vacancyApps = applications
        .filter((a) => a.vacancyId === vacancy.id)
        .sort((a, b) => a.appliedAt.localeCompare(b.appliedAt));

      const byStage = emptyStageCounts();
      vacancyApps.forEach((a) => {
        if (a.status in byStage) byStage[a.status] += 1;
      });

      return {
        id: vacancy.id,
        title: vacancy.title,
        isActive: vacancy.isActive !== false,
        postedAt: vacancy.postedAt,
        totalApplicants: vacancyApps.length,
        byStage,
        // Built field by field on purpose: never spread the application into the response
        applicants: vacancyApps.map((a, idx) => ({
          label: `Postulante #${idx + 1}`,
          status: a.status,
          appliedAt: a.appliedAt,
          ...(a.status === REVEAL_STAGE
            ? { hired: { fullName: a.fullName, email: a.email, phone: a.phone, availability: a.availability } }
            : {}),
        })),
      };
    }),
});
