// Types for Soluciones Empresariales Staffing Platform

export type WorkMode = 'Presencial' | 'Híbrido' | 'Remoto';
// Las categorías se administran desde el panel (tabla `categories`), por eso es un string libre.
export type JobCategory = string;

export interface Category {
  id: string;
  name: string;
  isActive: boolean;
}
export type RequestType = 'Plaza Nueva' | 'Reemplazo';

export interface Vacancy {
  id: string;
  title: string;
  company: string;
  category: JobCategory;
  location: string;
  workMode: WorkMode;
  salaryRange: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  postedAt: string;
  isUrgent?: boolean;
  isActive?: boolean;
  /** Empresa cliente dueña de la plaza. `company` es el nombre que se muestra al público. */
  companyId?: string;
  isConfidential?: boolean;
}

export const CONFIDENTIAL_COMPANY_NAME = 'Empresa Cliente Confidencial';

export type ClientCompanyStatus = 'Pendiente' | 'Aprobada' | 'Inactiva';

export interface ClientCompany {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  status: ClientCompanyStatus;
  /** Código para entrar al portal de empresa. Se genera al aprobarla. */
  accessCode?: string;
  createdAt: string;
}

export type PipelineStage = 
  | 'Solicitud Recibida'
  | 'Contacto Telefónico'
  | 'Entrevista Inicial'
  | 'Pruebas Técnicas y Psicométricas'
  | 'Entrevista con Cliente'
  | 'Expediente Aprobado'
  | 'Contratación y Firma';

export const AVAILABILITY_OPTIONS = ['Inmediata', '15 días', '1 mes', 'Más de 1 mes'] as const;
export type Availability = (typeof AVAILABILITY_OPTIONS)[number];

export interface CandidateApplication {
  id: string;
  trackingCode: string;
  vacancyId?: string;
  vacancyTitle: string;
  fullName: string;
  email: string;
  phone: string;
  location?: string;
  experienceYears: number;
  expectedSalary: number;
  /** Disponibilidad para iniciar labores */
  availability?: Availability;
  resumeUrl?: string;
  resumeFileName?: string;
  coverLetter?: string;
  appliedAt: string;
  status: PipelineStage;
  testScores?: {
    technicalScore?: number;
    psychometricScore?: number;
    testNotes?: string;
  };
}

export type StaffingRequestStatus = 
  | 'Pendiente (1-2 días)' 
  | 'En Evaluación de Salario' 
  | 'En Revisión'
  | 'Búsqueda de Candidatos' 
  | 'Candidatos Presentados' 
  | 'Completada'
  | 'Completado'
  | 'Cancelada';

/** Statuses offered in the admin, in process order. ('Completado' is a legacy duplicate of 'Completada'.) */
export const STAFFING_REQUEST_STATUSES: StaffingRequestStatus[] = [
  'Pendiente (1-2 días)',
  'En Evaluación de Salario',
  'En Revisión',
  'Búsqueda de Candidatos',
  'Candidatos Presentados',
  'Completada',
  'Cancelada',
];

export interface StaffingRequest {
  id: string;
  trackingCode: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  requestType: RequestType;
  positionTitle: string;
  category: JobCategory;
  numberOfPositions: number;
  salaryBudget: string;
  keyRequirements: string;
  urgent: boolean;
  submittedAt: string;
  status: StaffingRequestStatus;
}

export interface CompetitorComparison {
  attribute: string;
  vinculosEstrategicos: string | number;
  latinTopJobs: string | number;
  solucionesEmpresariales: string | number;
}
