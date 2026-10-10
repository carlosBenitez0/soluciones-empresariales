import { CandidateApplication, PipelineStage, StaffingRequest } from '../types';

export const PIPELINE_STEPS: PipelineStage[] = [
  'Solicitud Recibida',
  'Contacto Telefónico',
  'Entrevista Inicial',
  'Pruebas Técnicas y Psicométricas',
  'Entrevista con Cliente',
  'Expediente Aprobado',
  'Contratación y Firma',
];

/** What someone holding an application code may see. No contact data, salary or evaluation notes. */
export interface PublicApplicationTracking {
  kind: 'application';
  trackingCode: string;
  firstName: string;
  vacancyTitle: string;
  status: PipelineStage;
  appliedAt: string;
  availability?: string;
}

export interface PublicRequestTracking {
  kind: 'request';
  trackingCode: string;
  companyName: string;
  positionTitle: string;
  numberOfPositions: number;
  status: string;
  submittedAt: string;
}

export type PublicTracking = PublicApplicationTracking | PublicRequestTracking;

export const toPublicApplication = (app: CandidateApplication): PublicApplicationTracking => ({
  kind: 'application',
  trackingCode: app.trackingCode,
  firstName: app.fullName.trim().split(/\s+/)[0] ?? '',
  vacancyTitle: app.vacancyTitle,
  status: app.status,
  appliedAt: app.appliedAt,
  availability: app.availability,
});

export const toPublicRequest = (req: StaffingRequest): PublicRequestTracking => ({
  kind: 'request',
  trackingCode: req.trackingCode,
  companyName: req.companyName,
  positionTitle: req.positionTitle,
  numberOfPositions: req.numberOfPositions,
  status: req.status,
  submittedAt: req.submittedAt,
});

/** Finds a record by its exact tracking code (case-insensitive). */
export const findTracking = (
  code: string,
  applications: CandidateApplication[],
  requests: StaffingRequest[]
): PublicTracking | null => {
  const normalized = code.trim().toUpperCase();
  const app = applications.find((a) => a.trackingCode.toUpperCase() === normalized);
  if (app) return toPublicApplication(app);
  const req = requests.find((r) => r.trackingCode.toUpperCase() === normalized);
  if (req) return toPublicRequest(req);
  return null;
};
