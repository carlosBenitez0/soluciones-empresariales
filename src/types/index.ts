// Types for Soluciones Empresariales Staffing Platform

export type WorkMode = 'Presencial' | 'Híbrido' | 'Remoto';
export type JobCategory = 'Administración' | 'Finanzas y Contabilidad' | 'Operaciones y Logística' | 'Tecnología' | 'Ventas y Atención al Cliente' | 'Recursos Humanos';
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
}

export interface CandidateApplication {
  id: string;
  vacancyId: string;
  vacancyTitle: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  experienceYears: number;
  expectedSalary: number;
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

export type PipelineStage = 
  | 'Solicitud Recibida'
  | 'Contacto Telefónico'
  | 'Entrevista Inicial'
  | 'Pruebas Técnicas y Psicométricas'
  | 'Entrevista con Cliente'
  | 'Expediente Aprobado'
  | 'Contratación y Firma';

export interface StaffingRequest {
  id: string;
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
  status: 'Pendiente (1-2 días)' | 'En Evaluación' | 'Candidatos Presentados' | 'Completado';
}

export interface CompetitorComparison {
  attribute: string;
  vinculosEstrategicos: string | number;
  latinTopJobs: string | number;
  solucionesEmpresariales: string | number;
}
