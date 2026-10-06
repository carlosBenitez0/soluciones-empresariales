-- ====================================================================
-- ESQUEMA DE BASE DE DATOS SUPABASE PARA SOLUCIONES EMPRESAREALES
-- ====================================================================

-- 1. TABLA: VACANTES (Bolsa de Empleo)
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

-- 2. TABLA: SOLICITUDES DE PERSONAL (Empresas Clientes)
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
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  converted_to_vacancy_id UUID REFERENCES public.vacancies(id) ON DELETE SET NULL
);

-- 3. TABLA: POSTULACIONES DE CANDIDATOS
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

-- HABILITAR SEGURIDAD RLS (Row Level Security)
ALTER TABLE public.vacancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staffing_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_applications ENABLE ROW LEVEL SECURITY;

-- POLITICAS DE ACCESO PUBLICO Y ADMIN
CREATE POLICY "Permitir lectura publica vacantes" ON public.vacancies FOR SELECT USING (true);
CREATE POLICY "Permitir insercion vacantes" ON public.vacancies FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir edicion vacantes" ON public.vacancies FOR UPDATE USING (true);
CREATE POLICY "Permitir borrado vacantes" ON public.vacancies FOR DELETE USING (true);

CREATE POLICY "Permitir lectura publica solicitudes" ON public.staffing_requests FOR SELECT USING (true);
CREATE POLICY "Permitir insercion solicitudes" ON public.staffing_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir edicion solicitudes" ON public.staffing_requests FOR UPDATE USING (true);

CREATE POLICY "Permitir lectura publica postulaciones" ON public.candidate_applications FOR SELECT USING (true);
CREATE POLICY "Permitir insercion postulaciones" ON public.candidate_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir edicion postulaciones" ON public.candidate_applications FOR UPDATE USING (true);
