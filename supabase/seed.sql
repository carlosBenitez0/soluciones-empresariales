-- ====================================================================
-- MIGRACION COMPLETA Y SEEDING DE DATOS PARA SUPABASE
-- ====================================================================

-- 1. TABLA: VACANCIES
CREATE TABLE IF NOT EXISTS public.vacancies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL DEFAULT 'Empresa Cliente Confidencial',
  category VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  work_mode VARCHAR(50) NOT NULL,
  salary_range VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  responsibilities TEXT[] DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  is_urgent BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  posted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TABLA: STAFFING_REQUESTS
CREATE TABLE IF NOT EXISTS public.staffing_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tracking_code VARCHAR(20) UNIQUE NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  request_type VARCHAR(50) NOT NULL DEFAULT 'Plaza Nueva',
  position_title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  number_of_positions INTEGER DEFAULT 1,
  salary_budget VARCHAR(100) NOT NULL,
  key_requirements TEXT NOT NULL,
  urgent BOOLEAN DEFAULT false,
  status VARCHAR(100) DEFAULT 'Pendiente (1-2 días)',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABLA: CANDIDATE_APPLICATIONS
CREATE TABLE IF NOT EXISTS public.candidate_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tracking_code VARCHAR(20) UNIQUE NOT NULL,
  vacancy_id UUID REFERENCES public.vacancies(id) ON DELETE CASCADE,
  vacancy_title VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  experience_years INTEGER DEFAULT 0,
  expected_salary NUMERIC(10, 2) NOT NULL,
  resume_notes TEXT,
  status VARCHAR(100) DEFAULT 'Solicitud Recibida',
  test_scores JSONB DEFAULT '{"technicalScore": 0, "psychometricScore": 0, "testNotes": ""}'::jsonb,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- HABILITAR POLITICAS RLS
ALTER TABLE public.vacancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staffing_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_applications ENABLE ROW LEVEL SECURITY;

-- POLITICAS DE ACCESO
DROP POLICY IF EXISTS "Permitir lectura publica vacantes" ON public.vacancies;
DROP POLICY IF EXISTS "Permitir insercion vacantes" ON public.vacancies;
DROP POLICY IF EXISTS "Permitir edicion vacantes" ON public.vacancies;
DROP POLICY IF EXISTS "Permitir borrado vacantes" ON public.vacancies;

CREATE POLICY "Permitir lectura publica vacantes" ON public.vacancies FOR SELECT USING (true);
CREATE POLICY "Permitir insercion vacantes" ON public.vacancies FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir edicion vacantes" ON public.vacancies FOR UPDATE USING (true);
CREATE POLICY "Permitir borrado vacantes" ON public.vacancies FOR DELETE USING (true);

DROP POLICY IF EXISTS "Permitir lectura publica solicitudes" ON public.staffing_requests;
DROP POLICY IF EXISTS "Permitir insercion solicitudes" ON public.staffing_requests;
DROP POLICY IF EXISTS "Permitir edicion solicitudes" ON public.staffing_requests;

CREATE POLICY "Permitir lectura publica solicitudes" ON public.staffing_requests FOR SELECT USING (true);
CREATE POLICY "Permitir insercion solicitudes" ON public.staffing_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir edicion solicitudes" ON public.staffing_requests FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Permitir lectura publica postulaciones" ON public.candidate_applications;
DROP POLICY IF EXISTS "Permitir insercion postulaciones" ON public.candidate_applications;
DROP POLICY IF EXISTS "Permitir edicion postulaciones" ON public.candidate_applications;

CREATE POLICY "Permitir lectura publica postulaciones" ON public.candidate_applications FOR SELECT USING (true);
CREATE POLICY "Permitir insercion postulaciones" ON public.candidate_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir edicion postulaciones" ON public.candidate_applications FOR UPDATE USING (true);

-- ====================================================================
-- DATOS INICIALES (POBLAR TABLAS)
-- ====================================================================

-- INSERCIÓN DE VACANTES INICIALES
INSERT INTO public.vacancies 
  (title, company, category, location, work_mode, salary_range, description, requirements, responsibilities, benefits, is_urgent, is_active)
VALUES
  (
    'Analista Contable y de Planillas',
    'Empresa Cliente Confidencial',
    'Finanzas y Contabilidad',
    'Chalatenango Sur',
    'Presencial',
    '$600 - $850 USD',
    'Buscamos un Analista Contable para coordinar reportes financieros, registros de incidencias y asistencia en emisión de planillas regionales.',
    ARRAY['Licenciatura en Contaduría Pública o Administración de Empresas', 'Mínimo 2 años de experiencia en conciliaciones bancarias y planillas', 'Dominio avanzado de Excel y software contables'],
    ARRAY['Elaboración de reportes de incidencias para nómina', 'Revisión de pagos a personal externo y proveedores', 'Soporte a auditorías financieras'],
    ARRAY['Seguro colectivo hospitalario tras el primer año', 'Aguinaldo acorde a ley y desempeño', 'Oportunidad de desarrollo profesional continuo'],
    true,
    true
  ),
  (
    'Supervisora de Operaciones y Logística',
    'Empresa Agro-Industrial Chalatenango',
    'Operaciones y Logística',
    'Chalatenango Sur / San Salvador',
    'Híbrido',
    '$750 - $1,000 USD',
    'Supervisión de rutas de distribución, gestión de inventarios y coordinación directa con equipos de producción.',
    ARRAY['Ingeniería Industrial o carrera afín', 'Licencia de conducir vigente', 'Habilidades comprobadas de liderazgo y resolución de problemas'],
    ARRAY['Supervisar flotilla y distribución regional', 'Control de calidad e indicadores KPI de despacho', 'Coordinación con gerencia operativa'],
    ARRAY['Prima vacacional garantizada', 'Capacitaciones continuas en gestión operativa', 'Vehículo institucional para gestiones'],
    false,
    true
  ),
  (
    'Ejecutivo de Ventas y Atención B2B',
    'Distribuidora Comercial Salvadoreña',
    'Ventas y Atención al Cliente',
    'Chalatenango Sur',
    'Presencial',
    '$500 USD + Comisiones sin techo',
    'Apertura de clientes corporativos, seguimiento de carteras comerciales y negociación de contratos de suministros.',
    ARRAY['Experiencia comprobada en ventas B2B de al menos 1 año', 'Excelente fluidez verbal y relaciones interpersonales', 'Residencia en zona de Chalatenango o aledaños'],
    ARRAY['Prospección de clientes empresariales', 'Presentación de propuestas comerciales', 'Cierre de acuerdos y fidelización'],
    ARRAY['Comisiones competitivas', 'Bono anual por metas', 'Horarios flexibles según cumplimiento'],
    true,
    true
  ),
  (
    'Desarrollador Web & Soporte IT Jr.',
    'Soluciones Digitales SV',
    'Tecnología',
    'San Salvador / Chalatenango',
    'Híbrido',
    '$700 - $950 USD',
    'Mantenimiento de portales web corporativos, soporte a infraestructura de red interna y desarrollo de landing pages.',
    ARRAY['Conocimientos en JavaScript, HTML/CSS, React o Next.js', 'Manejo básico de bases de datos relacionales SQL', 'Capacidad proactiva para resolución de incidencias técnicas'],
    ARRAY['Dar soporte técnico a estaciones de trabajo y red', 'Actualizar módulos y secciones de aplicaciones web', 'Documentar procesos y guías técnicas'],
    ARRAY['Modalidad laboral híbrida (2 días home office)', 'Certificaciones técnicas financiadas al 50%', 'Equipo de cómputo institucional'],
    false,
    true
  ),
  (
    'Asistente de Administración y Recepción',
    'Consorcio Agrícola del Norte',
    'Administración',
    'Chalatenango Sur',
    'Presencial',
    '$450 - $550 USD',
    'Gestión de correspondencia, atención presencial y telefónica a clientes, archivo de expedientes y soporte administrativo general.',
    ARRAY['Técnico en Administración, Secretaria Ejecutiva o carrera afín', 'Manejo intermedio de Office (Word, Excel, Outlook)', 'Excelente redacción y vocación de servicio'],
    ARRAY['Atención a clientes y proveedores en recepción', 'Control de agendas e itinerarios corporativos', 'Recepción y filtrado de correspondencia'],
    ARRAY['Prestaciones de ley completas desde el primer día', 'Ambiente laboral estable y colaborativo', 'Capacitación continua'],
    false,
    true
  ),
  (
    'Auxiliar de Bodega e Inventarios',
    'Comercializadora El Norte S.A.',
    'Operaciones y Logística',
    'Chalatenango Sur',
    'Presencial',
    '$425 - $500 USD',
    'Carga, descarga, ordenamiento y control de stock en bodega para distribución regional.',
    ARRAY['Bachillerato completo', 'Disponibilidad para turnos rotativos', 'Experiencia en toma de inventarios físicos'],
    ARRAY['Registro de ingresos y egresos de mercadería', 'Embalaje y preparación de pedidos para despacho', 'Mantenimiento del orden y limpieza de bodega'],
    ARRAY['Pago puntual quincenal', 'Uniformes e insumos de protección provistos', 'Seguro de accidentes'],
    true,
    true
  ),
  (
    'Especialista en Servicio al Cliente & Soporte',
    'Servicios Integrales El Salvador',
    'Ventas y Atención al Cliente',
    'El Salvador (Nacional)',
    'Remoto',
    '$550 - $700 USD',
    'Atención a consultas, resolución de reclamos y soporte omnicanal (vía llamada, correo y chat) para usuarios empresariales.',
    ARRAY['Mínimo 1 año en posiciones de servicio al cliente o call center', 'Conexión a internet estable de alta velocidad', 'Habilidades de escucha activa y empatía'],
    ARRAY['Atender tickets y consultas de clientes corporativos', 'Escalar incidencias técnicas según protocolo', 'Registrar notas detalladas en sistema CRM'],
    ARRAY['Trabajo 100% remoto desde casa', 'Bono por satisfacción de cliente (NPS)', 'Subsidio de conectividad a internet'],
    false,
    true
  );

-- INSERCIÓN DE SOLICITUD DE EMPRESA INICIAL
INSERT INTO public.staffing_requests
  (tracking_code, company_name, contact_name, email, phone, request_type, position_title, category, number_of_positions, salary_budget, key_requirements, urgent, status)
VALUES
  (
    'REQ-8810',
    'Comercializadora El Norte S.A.',
    'Carlos Rivera',
    'crivera@elnorte.sv',
    '+503 7890-1234',
    'Plaza Nueva',
    'Auxiliar de Bodega y Logística',
    'Operaciones y Logística',
    2,
    '$450 - $550 USD por plaza',
    'Manejo de inventarios, disponibilidad para turnos rotativos, residencia en Chalatenango.',
    true,
    'Pendiente (1-2 días)'
  );

-- INSERCIÓN DE POSTULANTE INICIAL
INSERT INTO public.candidate_applications
  (tracking_code, vacancy_title, full_name, email, phone, experience_years, expected_salary, status, test_scores)
VALUES
  (
    'APP-5011',
    'Analista Contable y de Planillas',
    'María Elena Guardado',
    'mguardado@gmail.com',
    '+503 7234-5678',
    3,
    750.00,
    'Pruebas Técnicas y Psicométricas',
    '{"technicalScore": 92, "psychometricScore": 88, "testNotes": "Excelente dominio contable y alta compatibilidad con trabajo en equipo."}'::jsonb
  );
