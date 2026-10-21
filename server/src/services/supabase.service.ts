import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from '../config';

// Server-side privileged client using Service Role Key (for administrative and secure operations)
export const supabaseAdmin: SupabaseClient = createClient(
  config.supabase.url,
  config.supabase.serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Client-scoped factory for user tokens (respects RLS)
export const createUserClient = (accessToken: string): SupabaseClient => {
  return createClient(config.supabase.url, config.supabase.anonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// Check if Supabase credentials are configured
export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    config.supabase.url &&
    !config.supabase.url.includes('placeholder') &&
    !config.supabase.url.includes('example.supabase.co') &&
    config.supabase.serviceRoleKey &&
    !config.supabase.serviceRoleKey.includes('dummy') &&
    !config.supabase.serviceRoleKey.includes('placeholder')
  );
};
