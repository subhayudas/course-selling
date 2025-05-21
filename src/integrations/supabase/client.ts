// This file uses environment variables for Supabase configuration
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Get environment variables
const SUPABASE_URL = import.meta.env.NEXT_PUBLIC_SUPABASE_URL || "https://wqmnjyhksmlawxxjjmnb.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxbW5qeWhrc21sYXd4eGpqbW5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3OTI5MTUsImV4cCI6MjA2MzM2ODkxNX0.xoR2e6b-OxvtegoBM8bi9mu_rDvGwDXc68S6UN688tE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);