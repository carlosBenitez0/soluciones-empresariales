// Reference catalogs for the demo seed: realistic data for El Salvador.

export const FIRST_NAMES_F = [
  'María José', 'Ana Gabriela', 'Karla Patricia', 'Sofía Alejandra', 'Gabriela', 'Daniela', 'Fátima', 'Rocío',
  'Andrea Beatriz', 'Claudia', 'Wendy Carolina', 'Jennifer', 'Katherine', 'Marisol', 'Yesenia', 'Sandra Elizabeth',
  'Gloria', 'Paola', 'Ivania', 'Michelle', 'Raquel', 'Tatiana', 'Verónica', 'Lorena', 'Alejandra', 'Josselyn',
];

export const FIRST_NAMES_M = [
  'José Antonio', 'Carlos Ernesto', 'Luis Alberto', 'Juan Pablo', 'Mario', 'Kevin Alexander', 'Óscar', 'René',
  'Fernando', 'Douglas', 'William', 'Edwin', 'Rodrigo', 'Javier', 'Francisco', 'Salvador', 'Ricardo', 'Nelson',
  'Gerardo', 'Cristian', 'Diego', 'Héctor', 'Marvin', 'Bryan', 'Emerson', 'Rafael',
];

export const LAST_NAMES = [
  'Hernández', 'López', 'Martínez', 'Rivera', 'Flores', 'Ramírez', 'Mejía', 'Pérez', 'Guardado', 'Alvarado',
  'Romero', 'Aguilar', 'Rodríguez', 'García', 'Cruz', 'Orellana', 'Portillo', 'Menjívar', 'Escobar', 'Ayala',
  'Henríquez', 'Quintanilla', 'Serrano', 'Landaverde', 'Chávez', 'Bonilla', 'Molina', 'Castro', 'Rosales', 'Argueta',
  'Valle', 'Fuentes', 'Navarrete', 'Abrego', 'Cornejo', 'Deras', 'Galdámez', 'Vides',
];

export const EMAIL_DOMAINS = ['gmail.com', 'gmail.com', 'gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];

export const MUNICIPALITIES = [
  'Chalatenango Sur', 'Chalatenango Centro', 'Nueva Concepción', 'La Palma', 'Dulce Nombre de María',
  'San Salvador Centro', 'San Salvador Norte', 'Soyapango', 'Mejicanos', 'Apopa', 'Ilopango', 'Ciudad Delgado',
  'Santa Tecla', 'Antiguo Cuscatlán', 'Colón', 'Zaragoza', 'Santa Ana Centro', 'Metapán', 'Chalchuapa',
  'San Miguel Centro', 'Usulután', 'Sonsonate', 'Acajutla', 'Ahuachapán', 'Cojutepeque', 'Zacatecoluca',
  'San Vicente', 'Sensuntepeque', 'Aguilares', 'Quezaltepeque',
];

/** Companies created for the seed, besides the ones in legacy.ts. `demo` gets the fixed access code EMP-DEMO26. */
export const SEED_COMPANIES: { name: string; domain: string; sector: string; city: string; demo?: boolean }[] = [
  { name: 'Industrias del Valle Lempa S.A. de C.V.', domain: 'vallelempa.com.sv', sector: 'Agroindustria', city: 'Chalatenango Sur', demo: true },
  { name: 'Empresa Agro-Industrial Chalatenango', domain: 'agrochalate.com.sv', sector: 'Agroindustria', city: 'Chalatenango Sur' },
  { name: 'Distribuidora Comercial Salvadoreña', domain: 'dicosal.com.sv', sector: 'Comercio', city: 'San Salvador Centro' },
  { name: 'Soluciones Digitales SV', domain: 'solucionesdigitales.sv', sector: 'Tecnología', city: 'Antiguo Cuscatlán' },
  { name: 'Consorcio Agrícola del Norte', domain: 'agricoladelnorte.com.sv', sector: 'Agricultura', city: 'Nueva Concepción' },
  { name: 'Comercializadora El Norte S.A.', domain: 'elnorte.sv', sector: 'Comercio', city: 'Chalatenango Centro' },
  { name: 'Servicios Integrales El Salvador', domain: 'serviciosintegrales.com.sv', sector: 'Servicios', city: 'San Salvador Norte' },
  { name: 'Clínicas Médicas Santa Lucía S.A. de C.V.', domain: 'clinicassantalucia.com.sv', sector: 'Salud', city: 'Santa Tecla' },
  { name: 'Textiles Cuscatlán S.A. de C.V.', domain: 'textilescuscatlan.com', sector: 'Manufactura', city: 'Soyapango' },
  { name: 'Ferretería y Materiales El Constructor', domain: 'elconstructor.com.sv', sector: 'Comercio', city: 'San Miguel Centro' },
  { name: 'Grupo Logístico Pacífico', domain: 'glpacifico.com', sector: 'Logística', city: 'Acajutla' },
  { name: 'Panificadora La Espiga Dorada', domain: 'espigadorada.com.sv', sector: 'Alimentos', city: 'Santa Ana Centro' },
  { name: 'Seguridad Integral Centroamericana', domain: 'sicsa.com.sv', sector: 'Seguridad', city: 'Ilopango' },
  { name: 'Cooperativa Financiera Los Pinares', domain: 'coopinares.com.sv', sector: 'Finanzas', city: 'Chalatenango Sur' },
  { name: 'Hotel y Centro de Eventos Montaña Verde', domain: 'montanaverde.com.sv', sector: 'Turismo', city: 'La Palma' },
];

export const CONTACT_TITLES_F = ['Licda.', 'Inga.', 'Sra.'];
export const CONTACT_TITLES_M = ['Lic.', 'Ing.', 'Sr.'];

export interface JobTemplate {
  title: string;
  salary: [number, number];
  summary: string;
  requirements: string[];
  responsibilities: string[];
}

export const CATEGORY_DEFS: { name: string; isActive: boolean }[] = [
  { name: 'Administración', isActive: true },
  { name: 'Finanzas y Contabilidad', isActive: true },
  { name: 'Operaciones y Logística', isActive: true },
  { name: 'Ventas y Atención al Cliente', isActive: true },
  { name: 'Tecnología', isActive: true },
  { name: 'Recursos Humanos', isActive: true },
  { name: 'Salud y Enfermería', isActive: true },
  { name: 'Producción y Manufactura', isActive: true },
  { name: 'Seguridad y Vigilancia', isActive: true },
  // Inactive on purpose, to demo the category toggle (no vacancies use it)
  { name: 'Educación y Capacitación', isActive: false },
];

export const JOB_TEMPLATES: Record<string, JobTemplate[]> = {
  Administración: [
    {
      title: 'Asistente Administrativo',
      salary: [450, 600],
      summary: 'Apoyo en gestión documental, archivo, agenda gerencial y control de caja chica.',
      requirements: ['Técnico o estudiante de Administración de Empresas', 'Manejo de paquete Office', 'Excelente redacción y ortografía'],
      responsibilities: ['Control de correspondencia y archivo', 'Elaboración de cotizaciones y órdenes de compra', 'Atención a proveedores'],
    },
    {
      title: 'Recepcionista Bilingüe',
      salary: [500, 650],
      summary: 'Primera línea de atención a visitantes y clientes, con manejo de central telefónica.',
      requirements: ['Inglés intermedio-avanzado', 'Bachillerato completo', 'Excelente presentación personal'],
      responsibilities: ['Recepción de visitantes y llamadas', 'Gestión de salas de reuniones', 'Registro de entradas y salidas'],
    },
    {
      title: 'Coordinador Administrativo',
      salary: [800, 1100],
      summary: 'Coordinación de compras, servicios generales y control presupuestario del área administrativa.',
      requirements: ['Licenciatura en Administración de Empresas', '3 años de experiencia en puestos similares', 'Manejo de presupuestos'],
      responsibilities: ['Supervisar al personal de servicios generales', 'Control de inventario de oficina', 'Reportes mensuales a gerencia'],
    },
    {
      title: 'Auxiliar de Archivo y Digitalización',
      salary: [400, 500],
      summary: 'Digitalización y ordenamiento de expedientes físicos y electrónicos.',
      requirements: ['Bachillerato completo', 'Orden y atención al detalle', 'Conocimientos básicos de computación'],
      responsibilities: ['Escaneo e indexación de documentos', 'Depuración de archivo histórico', 'Préstamo controlado de expedientes'],
    },
  ],
  'Finanzas y Contabilidad': [
    {
      title: 'Auxiliar Contable',
      salary: [500, 650],
      summary: 'Registro de operaciones contables, conciliaciones y apoyo en cierres mensuales.',
      requirements: ['Estudiante de Contaduría Pública (4.º año en adelante)', 'Conocimiento de IVA y renta', 'Excel intermedio'],
      responsibilities: ['Registro de partidas contables', 'Conciliaciones bancarias', 'Archivo de documentación fiscal'],
    },
    {
      title: 'Contador General',
      salary: [900, 1300],
      summary: 'Responsable de estados financieros, declaraciones tributarias y relación con auditoría externa.',
      requirements: ['Licenciatura en Contaduría Pública', 'Autorización vigente del CVPCPA (deseable)', '4 años de experiencia como contador'],
      responsibilities: ['Elaboración de estados financieros', 'Declaraciones de IVA, pago a cuenta y renta', 'Atención a auditorías'],
    },
    {
      title: 'Analista de Créditos y Cobros',
      salary: [600, 800],
      summary: 'Análisis de solicitudes de crédito y gestión de cartera vencida.',
      requirements: ['Licenciatura en Administración o Finanzas', 'Experiencia en gestión de cobros', 'Habilidad de negociación'],
      responsibilities: ['Evaluación de capacidad de pago', 'Gestión telefónica de cobros', 'Reportes de antigüedad de saldos'],
    },
    {
      title: 'Cajero/a de Agencia',
      salary: [450, 550],
      summary: 'Atención en ventanilla de operaciones de depósito, retiro y pago de servicios.',
      requirements: ['Bachillerato completo', 'Experiencia en manejo de efectivo', 'Disponibilidad de horario sábado'],
      responsibilities: ['Operaciones de caja', 'Arqueos diarios', 'Atención al cliente en ventanilla'],
    },
  ],
  'Operaciones y Logística': [
    {
      title: 'Motorista Repartidor',
      salary: [450, 600],
      summary: 'Distribución de producto en ruta asignada con entrega a clientes mayoristas.',
      requirements: ['Licencia de conducir liviana o pesada vigente', 'Conocimiento de rutas a nivel nacional', 'Solvencia de la PNC'],
      responsibilities: ['Carga y entrega de mercadería', 'Cobro y liquidación de ruta', 'Mantenimiento básico del vehículo'],
    },
    {
      title: 'Coordinador de Logística',
      salary: [850, 1150],
      summary: 'Planificación de rutas, despacho y control de costos de transporte.',
      requirements: ['Ingeniería Industrial o carrera afín', '3 años en logística o distribución', 'Manejo de ERP'],
      responsibilities: ['Programación de despachos', 'Negociación con transportistas', 'Indicadores de entrega a tiempo'],
    },
    {
      title: 'Montacarguista',
      salary: [450, 550],
      summary: 'Operación de montacargas en centro de distribución con turnos rotativos.',
      requirements: ['Certificación de operación de montacargas', 'Experiencia mínima de 1 año', 'Disponibilidad de turnos'],
      responsibilities: ['Carga y descarga de contenedores', 'Ubicación de producto en racks', 'Revisión diaria del equipo'],
    },
    {
      title: 'Encargado de Compras',
      salary: [700, 950],
      summary: 'Gestión de proveedores, cotizaciones y abastecimiento oportuno de insumos.',
      requirements: ['Licenciatura en Administración o Ingeniería', 'Experiencia en compras locales e importaciones', 'Negociación'],
      responsibilities: ['Evaluación de proveedores', 'Órdenes de compra', 'Seguimiento a importaciones'],
    },
  ],
  'Ventas y Atención al Cliente': [
    {
      title: 'Asesor de Ventas de Piso',
      salary: [400, 550],
      summary: 'Atención y asesoría a clientes en sala de ventas con comisiones atractivas.',
      requirements: ['Bachillerato completo', 'Experiencia en ventas al detalle', 'Actitud de servicio'],
      responsibilities: ['Atender y asesorar clientes', 'Exhibición de producto', 'Cumplimiento de metas mensuales'],
    },
    {
      title: 'Agente de Call Center Bilingüe',
      salary: [600, 800],
      summary: 'Atención telefónica a clientes de Estados Unidos para cuenta de servicios.',
      requirements: ['Inglés avanzado (B2 o superior)', 'Disponibilidad de horario rotativo', 'Mecanografía de 35 ppm'],
      responsibilities: ['Atender llamadas entrantes', 'Registrar casos en CRM', 'Cumplir métricas de calidad'],
    },
    {
      title: 'Vendedor de Ruta',
      salary: [450, 650],
      summary: 'Visita a tiendas y mayoristas para toma de pedidos y apertura de nuevos clientes.',
      requirements: ['Experiencia en ventas de consumo masivo', 'Motocicleta propia (deseable)', 'Licencia vigente'],
      responsibilities: ['Toma de pedidos en ruta', 'Apertura de clientes nuevos', 'Gestión de cobros'],
    },
    {
      title: 'Supervisor de Ventas',
      salary: [850, 1200],
      summary: 'Liderazgo de un equipo de vendedores y seguimiento de cuota regional.',
      requirements: ['Licenciatura en Mercadeo o Administración', '2 años supervisando equipos comerciales', 'Licencia de conducir'],
      responsibilities: ['Acompañamiento en ruta', 'Análisis de ventas por zona', 'Capacitación del equipo'],
    },
  ],
  Tecnología: [
    {
      title: 'Técnico de Soporte IT',
      salary: [500, 700],
      summary: 'Soporte a usuarios, mantenimiento de equipos y redes de oficina.',
      requirements: ['Técnico en Ingeniería de Sistemas o afín', 'Conocimiento de redes LAN', 'Windows y Office 365'],
      responsibilities: ['Atención de tickets de soporte', 'Mantenimiento preventivo de equipos', 'Inventario de hardware'],
    },
    {
      title: 'Desarrollador Full Stack',
      salary: [1100, 1600],
      summary: 'Desarrollo de aplicaciones web internas y portales para clientes.',
      requirements: ['Ingeniería en Sistemas o experiencia comprobable', 'React/Next.js y Node.js', 'SQL y control de versiones con Git'],
      responsibilities: ['Desarrollo de nuevas funcionalidades', 'Revisión de código', 'Mantenimiento de bases de datos'],
    },
    {
      title: 'Analista de Datos',
      salary: [900, 1300],
      summary: 'Construcción de reportes e indicadores para la toma de decisiones.',
      requirements: ['Ingeniería en Sistemas, Estadística o afín', 'SQL y Power BI', 'Excel avanzado'],
      responsibilities: ['Modelado de datos', 'Dashboards de gestión', 'Automatización de reportes'],
    },
  ],
  'Recursos Humanos': [
    {
      title: 'Asistente de Recursos Humanos',
      salary: [500, 650],
      summary: 'Apoyo en planilla, expedientes de personal y trámites ante ISSS y AFP.',
      requirements: ['Estudiante de Psicología o Administración', 'Conocimiento del Código de Trabajo', 'Manejo de planillas'],
      responsibilities: ['Actualización de expedientes', 'Trámites de ISSS y AFP', 'Control de asistencia'],
    },
    {
      title: 'Reclutador/a de Personal',
      salary: [650, 850],
      summary: 'Reclutamiento masivo y selección de personal operativo y administrativo.',
      requirements: ['Licenciatura en Psicología', 'Experiencia en entrevistas por competencias', 'Aplicación de pruebas psicométricas'],
      responsibilities: ['Publicación de vacantes', 'Entrevistas y pruebas', 'Informes de candidatos'],
    },
    {
      title: 'Encargado de Planillas',
      salary: [700, 900],
      summary: 'Cálculo de planilla quincenal, horas extra, vacaciones e indemnizaciones.',
      requirements: ['Licenciatura en Contaduría o Administración', '2 años elaborando planillas', 'Conocimiento de legislación laboral'],
      responsibilities: ['Cálculo de planilla', 'Declaraciones F-910 y planilla única', 'Atención de consultas de empleados'],
    },
  ],
  'Salud y Enfermería': [
    {
      title: 'Enfermero/a Graduado/a',
      salary: [650, 900],
      summary: 'Atención de pacientes en clínica privada con turnos rotativos.',
      requirements: ['Licenciatura o Tecnólogo en Enfermería', 'Inscripción vigente en la JVPE', 'Disponibilidad de turnos'],
      responsibilities: ['Atención y monitoreo de pacientes', 'Administración de medicamentos', 'Registro en expediente clínico'],
    },
    {
      title: 'Auxiliar de Farmacia',
      salary: [420, 520],
      summary: 'Despacho de medicamentos y control de inventario en farmacia de clínica.',
      requirements: ['Bachillerato completo', 'Experiencia en farmacia', 'Conocimiento básico de medicamentos'],
      responsibilities: ['Despacho de recetas', 'Control de vencimientos', 'Recepción de pedidos'],
    },
    {
      title: 'Médico General',
      salary: [1200, 1700],
      summary: 'Consulta general y atención de emergencias leves en clínica empresarial.',
      requirements: ['Doctorado en Medicina', 'JVPM vigente', '2 años de experiencia en consulta'],
      responsibilities: ['Consulta médica general', 'Exámenes preocupacionales', 'Campañas de salud ocupacional'],
    },
  ],
  'Producción y Manufactura': [
    {
      title: 'Operario/a de Producción',
      salary: [380, 450],
      summary: 'Operación de línea de producción en planta con turnos rotativos.',
      requirements: ['Noveno grado o bachillerato', 'Disponibilidad de turnos', 'Trabajo en equipo'],
      responsibilities: ['Operar maquinaria asignada', 'Cumplir metas de producción', 'Aplicar normas de seguridad'],
    },
    {
      title: 'Supervisor/a de Producción',
      salary: [800, 1100],
      summary: 'Supervisión de turno, control de calidad y cumplimiento de plan de producción.',
      requirements: ['Ingeniería Industrial', '2 años supervisando personal operativo', 'Conocimiento de 5S y Lean'],
      responsibilities: ['Asignación de personal por línea', 'Control de mermas', 'Reportes de eficiencia'],
    },
    {
      title: 'Técnico de Mantenimiento Industrial',
      salary: [600, 850],
      summary: 'Mantenimiento preventivo y correctivo de maquinaria industrial.',
      requirements: ['Técnico en Mecánica o Electricidad Industrial', 'Lectura de planos', 'Soldadura (deseable)'],
      responsibilities: ['Mantenimiento preventivo programado', 'Atención de fallas', 'Registro de órdenes de trabajo'],
    },
  ],
  'Seguridad y Vigilancia': [
    {
      title: 'Agente de Seguridad',
      salary: [400, 480],
      summary: 'Vigilancia de instalaciones con turnos de 24x24.',
      requirements: ['Licencia de uso de arma vigente', 'Curso de la ANSP para agentes privados', 'Solvencia de la PNC'],
      responsibilities: ['Control de accesos', 'Rondas de vigilancia', 'Bitácora de novedades'],
    },
    {
      title: 'Supervisor de Seguridad',
      salary: [650, 850],
      summary: 'Supervisión de puestos de vigilancia y coordinación de agentes.',
      requirements: ['Experiencia supervisando personal de seguridad', 'Licencia de conducir', 'Manejo de protocolos de emergencia'],
      responsibilities: ['Visitas a puestos', 'Programación de turnos', 'Informes de incidentes'],
    },
  ],
};

export const BENEFITS_POOL = [
  'Prestaciones de ley (ISSS, AFP, aguinaldo y vacaciones)',
  'Seguro médico hospitalario',
  'Seguro de vida colectivo',
  'Bonificación por desempeño trimestral',
  'Comisiones sobre ventas',
  'Transporte o subsidio de transporte',
  'Alimentación subsidiada en comedor',
  'Uniformes y equipo de protección',
  'Capacitación continua',
  'Horario de lunes a viernes',
  'Teléfono y plan de datos corporativo',
  'Día libre en tu cumpleaños',
];

export const TEST_NOTES = [
  'Buen dominio técnico; reforzar manejo de Excel avanzado.',
  'Perfil con alta orientación al servicio y buena comunicación.',
  'Resultados sobresalientes en razonamiento lógico.',
  'Muestra liderazgo y buena tolerancia a la presión.',
  'Requiere inducción en procesos internos, actitud muy positiva.',
  'Excelente compatibilidad con la cultura del cliente.',
  'Respuestas consistentes; experiencia comprobable en el área.',
];

export const REQUEST_REQUIREMENTS = [
  'Experiencia mínima de 1 año en puesto similar y residencia cercana a la planta.',
  'Disponibilidad inmediata, preferiblemente con licencia de conducir.',
  'Manejo de Excel intermedio y buena redacción.',
  'Disponibilidad de turnos rotativos y fines de semana.',
  'Inglés intermedio y experiencia en atención al cliente.',
  'Título universitario y experiencia liderando equipos.',
  'Conocimiento del Código de Trabajo y cálculo de planillas.',
];
