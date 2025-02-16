// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types for our database
export type User = {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export type UserIntegration = {
  id: string;
  user_id: string;
  provider: 'zoom' | 'gmail' | 'notion';
  access_token: string;
  refresh_token: string;
  token_expires_at: string;
  created_at: string;
  updated_at: string;
};

export type Task = {
  id: string;
  user_id: string;
  title: string;
  tool: string;
  transcript: Record<string, unknown>; 
  approve: boolean;
  created_at: string;
  updated_at: string;
};