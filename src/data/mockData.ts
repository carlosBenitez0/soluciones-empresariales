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
  },
  {
    id: 'vac-4',
    title: 'Desarrollador Web & Soporte IT Jr.',
    company: 'Soluciones Digitales SV',
    category: 'Tecnología',
    location: 'San Salvador / Chalatenango',
    workMode: 'Híbrido',
    salaryRange: '$700 - $950 USD',
    description: 'Mantenimiento de portales web corporativos, soporte a infraestructura de red interna y desarrollo de landing pages.',
    requirements: [
      'Conocimientos en JavaScript, HTML/CSS, React o Next.js',
      'Manejo básico de bases de datos relacionales SQL',
      'Capacidad proactiva para resolución de incidencias técnicas'
    ],
    responsibilities: [
      'Dar soporte técnico a estaciones de trabajo y red',
      'Actualizar módulos y secciones de aplicaciones web',
      'Documentar procesos y guías técnicas'
    ],
    benefits: [
      'Modalidad laboral híbrida (2 días home office)',
      'Certificaciones técnicas financiadas al 50%',
      'Equipo de cómputo institucional'
    ],
    postedAt: '2026-10-03',
    isUrgent: false,
  },
  {
    id: 'vac-5',
    title: 'Asistente de Administración y Recepción',
    company: 'Consorcio Agrícola del Norte',
    category: 'Administración',
    location: 'Chalatenango Sur',
    workMode: 'Presencial',
    salaryRange: '$450 - $550 USD',
    description: 'Gestión de correspondencia, atención presencial y telefónica a clientes, archivo de expedientes y soporte administrativo general.',
    requirements: [
      'Técnico en Administración, Secretaria Ejecutiva o carrera afín',
      'Manejo intermedio de Office (Word, Excel, Outlook)',
      'Excelente redacción y vocación de servicio'
    ],
    responsibilities: [
      'Atención a clientes y proveedores en recepción',
      'Control de agendas e itinerarios corporativos',
      'Recepción y filtrado de correspondencia'
    ],
    benefits: [
      'Prestaciones de ley completas desde el primer día',
      'Ambiente laboral estable y colaborativo',
      'Capacitación continua'
    ],
    postedAt: '2026-10-04',
    isUrgent: false,
  },
  {
    id: 'vac-6',
    title: 'Auxiliar de Bodega e Inventarios',
    company: 'Comercializadora El Norte S.A.',
    category: 'Operaciones y Logística',
    location: 'Chalatenango Sur',
    workMode: 'Presencial',
    salaryRange: '$425 - $500 USD',
    description: 'Carga, descarga, ordenamiento y control de stock en bodega para distribución regional.',
    requirements: [
      'Bachillerato completo',
      'Disponibilidad para turnos rotativos',
      'Experiencia en toma de inventarios físicos'
    ],
    responsibilities: [
      'Registro de ingresos y egresos de mercadería',
      'Embalaje y preparación de pedidos para despacho',
      'Mantenimiento del orden y limpieza de bodega'
    ],
    benefits: [
      'Pago puntual quincenal',
      'Uniformes e insumos de protección provistos',
      'Seguro de accidentes'
    ],
    postedAt: '2026-10-05',
    isUrgent: true,
  },
  {
    id: 'vac-7',
    title: 'Especialista en Servicio al Cliente & Soporte',
    company: 'Servicios Integrales El Salvador',
    category: 'Ventas y Atención al Cliente',
    location: 'El Salvador (Nacional)',
    workMode: 'Remoto',
    salaryRange: '$550 - $700 USD',
    description: 'Atención a consultas, resolución de reclamos y soporte omnicanal (vía llamada, correo y chat) para usuarios empresariales.',
    requirements: [
      'Mínimo 1 año en posiciones de servicio al cliente o call center',
      'Conexión a internet estable de alta velocidad',
      'Habilidades de escucha activa y empatía'
    ],
    responsibilities: [
      'Atender tickets y consultas de clientes corporativos',
      'Escalar incidencias técnicas según protocolo',
      'Registrar notas detalladas en sistema CRM'
    ],
    benefits: [
      'Trabajo 100% remoto desde casa',
      'Bono por satisfacción de cliente (NPS)',
      'Subsidio de conectividad a internet'
    ],
    postedAt: '2026-10-05',
    isUrgent: false,
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
    trackingCode: 'REQ-8810',
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
    trackingCode: 'APP-5011',
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
