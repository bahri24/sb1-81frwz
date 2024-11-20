import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(
  SUPABASE_URL || '',
  SUPABASE_KEY || ''
);

export const isSupabaseConfigured = () => {
  return Boolean(
    SUPABASE_URL &&
    SUPABASE_KEY &&
    SUPABASE_URL !== 'https://your-project-id.supabase.co' &&
    SUPABASE_KEY !== 'your-anon-key'
  );
};