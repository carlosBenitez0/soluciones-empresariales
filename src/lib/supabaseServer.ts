import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Server-only Supabase client. Prefers the service role key (bypasses RLS) so Route Handlers
// can read private data and return only what the caller is allowed to see.
// Never import this file from a Client Component.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serverKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isServerSupabaseConfigured = Boolean(
  supabaseUrl && serverKey && !supabaseUrl.includes('your-project-id')
);

export const getServerSupabase = (): SupabaseClient | null =>
  isServerSupabaseConfigured
    ? createClient(supabaseUrl, serverKey, { auth: { persistSession: false } })
    : null;
