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
