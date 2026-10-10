-- ====================================================================
-- MIGRACION V2 (para bases ya creadas con schema.sql / seed.sql)
-- Ejecutar completo en el SQL Editor de Supabase. Es idempotente.
-- ====================================================================

-- 1. CATEGORIAS LABORALES
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir lectura publica categorias" ON public.categories;
DROP POLICY IF EXISTS "Permitir insercion categorias" ON public.categories;
DROP POLICY IF EXISTS "Permitir edicion categorias" ON public.categories;
DROP POLICY IF EXISTS "Permitir borrado categorias" ON public.categories;
CREATE POLICY "Permitir lectura publica categorias" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Permitir insercion categorias" ON public.categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir edicion categorias" ON public.categories FOR UPDATE USING (true);
CREATE POLICY "Permitir borrado categorias" ON public.categories FOR DELETE USING (true);

INSERT INTO public.categories (name) VALUES
  ('Administración'),
  ('Finanzas y Contabilidad'),
  ('Operaciones y Logística'),
  ('Ventas y Atención al Cliente'),
  ('Tecnología'),
  ('Recursos Humanos')
ON CONFLICT (name) DO NOTHING;

-- 2. TABLA: EMPRESAS CLIENTES (registro publico + aprobacion del admin)
CREATE TABLE IF NOT EXISTS public.client_companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Pendiente',
  access_code VARCHAR(20) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.vacancies ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES public.client_companies(id) ON DELETE SET NULL;
ALTER TABLE public.client_companies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir lectura empresas" ON public.client_companies;
DROP POLICY IF EXISTS "Permitir registro empresas" ON public.client_companies;
DROP POLICY IF EXISTS "Permitir edicion empresas" ON public.client_companies;
DROP POLICY IF EXISTS "Permitir borrado empresas" ON public.client_companies;
CREATE POLICY "Permitir lectura empresas" ON public.client_companies FOR SELECT USING (true);
CREATE POLICY "Permitir registro empresas" ON public.client_companies FOR INSERT WITH CHECK (status = 'Pendiente' AND access_code IS NULL);
CREATE POLICY "Permitir edicion empresas" ON public.client_companies FOR UPDATE USING (true);
CREATE POLICY "Permitir borrado empresas" ON public.client_companies FOR DELETE USING (true);

-- 3. DISPONIBILIDAD DEL POSTULANTE
ALTER TABLE public.candidate_applications ADD COLUMN IF NOT EXISTS availability VARCHAR(50);
