import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://zcyzcxinohycrtkpynlm.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjeXpjeGlub2h5Y3J0a3B5bmxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3NDgxODksImV4cCI6MjA3OTMyNDE4OX0.R1vhXkbj0HvgSoGQl28gvsLTZ0oPQ24_jDQI812nMOY';

// In production, use the Edge Function URL to avoid CORS issues
const isProduction = process.env.NODE_ENV === 'production';
const finalUrl = isProduction ? `${supabaseUrl}/functions/v1/cors-proxy/rest/v1` : `${supabaseUrl}/rest/v1`;

export default createClient(finalUrl, supabaseAnonKey);
