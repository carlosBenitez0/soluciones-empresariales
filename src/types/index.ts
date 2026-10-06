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

export type PipelineStage = 
  | 'Solicitud Recibida'
  | 'Contacto Telefónico'
  | 'Entrevista Inicial'
  | 'Pruebas Técnicas y Psicométricas'
  | 'Entrevista con Cliente'
  | 'Expediente Aprobado'
  | 'Contratación y Firma';

export interface CandidateApplication {
  id: string;
  trackingCode: string;
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

export type StaffingRequestStatus = 
  | 'Pendiente (1-2 días)' 
  | 'En Evaluación de Salario' 
  | 'Búsqueda de Candidatos' 
  | 'Candidatos Presentados' 
  | 'Completado';

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
