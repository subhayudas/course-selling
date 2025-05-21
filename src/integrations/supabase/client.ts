// This file uses environment variables for Supabase configuration
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Get environment variables
const SUPABASE_URL = import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if environment variables are defined
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    "Warning: Supabase URL and Anon Key are not defined in environment variables. " +
    "Using fallback values. This may cause issues with API requests."
  );
}

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

// Use environment variables or fallback to the values from .env file
// This ensures the app doesn't crash if environment variables are not set in production
export const supabase = createClient<Database>(
  SUPABASE_URL || "https://wqmnjyhksmlawxxjjmnb.supabase.co",
  SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxbW5qeWhrc21sYXd4eGpqbW5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3OTI5MTUsImV4cCI6MjA2MzM2ODkxNX0.xoR2e6b-OxvtegoBM8bi9mu_rDvGwDXc68S6UN688tE"
);