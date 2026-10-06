import { Vacancy, CompetitorComparison, StaffingRequest, CandidateApplication } from '../types';

export const INITIAL_VACANCIES: Vacancy[] = [
  {
    id: 'vac-1',
    title: 'Analista Contable y de Planillas',
    company: 'Empresa Cliente Confidencial',
    category: 'Finanzas y Contabilidad',
    location: 'Chalatenango Sur',
    workMode: 'Presencial',
    salaryRange: '$600 - $850 USD',
    description: 'Buscamos un Analista Contable para coordinar reportes financieros, registros de incidencias y asistencia en emisión de planillas regionales.',
    requirements: [
      'Licenciatura en Contaduría Pública o Administración de Empresas',
      'Mínimo 2 años de experiencia en conciliaciones bancarias y planillas',
      'Dominio avanzado de Excel y software contables'
    ],
    responsibilities: [
      'Elaboración de reportes de incidencias para nómina',
      'Revisión de pagos a personal externo y proveedores',
      'Soporte a auditorías financieras'
    ],
    benefits: [
      'Seguro colectivo hospitalario tras el primer año',
      'Aguinaldo acorde a ley y desempeño',
      'Oportunidad de desarrollo profesional continuo'
    ],
    postedAt: '2026-09-28',
    isUrgent: true,
  },
  {
    id: 'vac-2',
    title: 'Supervisora de Operaciones y Logística',
    company: 'Empresa Agro-Industrial Chalatenango',
    category: 'Operaciones y Logística',
    location: 'Chalatenango Sur / San Salvador',
    workMode: 'Híbrido',
    salaryRange: '$750 - $1,000 USD',
    description: 'Supervisión de rutas de distribución, gestión de inventarios y coordinación directa con equipos de producción.',
    requirements: [
      'Ingeniería Industrial o carrera afín',
      'Licencia de conducir vigente',
      'Habilidades comprobadas de liderazgo y resolución de problemas'
    ],
    responsibilities: [
      'Supervisar flotilla y distribución regional',
      'Control de calidad e indicadores KPI de despacho',
      'Coordinación con gerencia operativa'
    ],
    benefits: [
      'Prima vacacional garantizada',
      'Capacitaciones continuas en gestión operativa',
      'Vehículo institucional para gestiones'
    ],
    postedAt: '2026-10-01',
    isUrgent: false,
  },
  {
    id: 'vac-3',
    title: 'Ejecutivo de Ventas y Atención B2B',
    company: 'Distribuidora Comercial Salvadoreña',
    category: 'Ventas y Atención al Cliente',
    location: 'Chalatenango Sur',
    workMode: 'Presencial',
    salaryRange: '$500 USD + Comisiones sin techo',
    description: 'Apertura de clientes corporativos, seguimiento de carteras comerciales y negociación de contratos de suministros.',
    requirements: [
      'Experiencia comprobada en ventas B2B de al menos 1 año',
      'Excelente fluidez verbal y relaciones interpersonales',
      'Residencia en zona de Chalatenango o aledaños'
    ],
    responsibilities: [
      'Prospección de clientes empresariales',
      'Presentación de propuestas comerciales',
      'Cierre de acuerdos y fidelización'
    ],
    benefits: [
      'Comisiones competitivas',
      'Bono anual por metas',
      'Horarios flexibles según cumplimiento'
    ],
    postedAt: '2026-10-02',
    isUrgent: true,
  }
];

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
  },
  {
    attribute: 'Atención personalizada',
    vinculosEstrategicos: '3 / 5',
    latinTopJobs: '4 / 5',
    solucionesEmpresariales: '5 / 5 (Acompañamiento 1 a 1)',
  },
  {
    attribute: 'Flexibilidad en servicios',
    vinculosEstrategicos: '4 / 5',
    latinTopJobs: '5 / 5',
    solucionesEmpresariales: '5 / 5 (Staffing adaptado al cliente)',
  }
];

export const INITIAL_STAFFING_REQUESTS: StaffingRequest[] = [
  {
    id: 'req-101',
    companyName: 'Comercializadora El Norte S.A.',
    contactName: 'Carlos Rivera',
    email: 'crivera@elnorte.sv',
    phone: '+503 7890-1234',
    requestType: 'Plaza Nueva',
    positionTitle: 'Auxiliar de Bodega y Logística',
    category: 'Operaciones y Logística',
    numberOfPositions: 2,
    salaryBudget: '$450 - $550 USD por plaza',
    keyRequirements: 'Manejo de inventarios, disponibilidad para turnos rotativos, residencia en Chalatenango.',
    urgent: true,
    submittedAt: '2026-10-04',
    status: 'Pendiente (1-2 días)',
  }
];

export const INITIAL_CANDIDATE_APPLICATIONS: CandidateApplication[] = [
  {
    id: 'app-501',
    vacancyId: 'vac-1',
    vacancyTitle: 'Analista Contable y de Planillas',
    fullName: 'María Elena Guardado',
    email: 'mguardado@gmail.com',
    phone: '+503 7234-5678',
    location: 'Chalatenango Sur',
    experienceYears: 3,
    expectedSalary: 750,
    appliedAt: '2026-10-03',
    status: 'Pruebas Técnicas y Psicométricas',
    testScores: {
      technicalScore: 92,
      psychometricScore: 88,
      testNotes: 'Excelente dominio contable y alta compatibilidad con trabajo en equipo.',
    }
  }
];
