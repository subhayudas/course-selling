// This file uses environment variables for Supabase configuration
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Get environment variables
const SUPABASE_URL = import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if environment variables are defined
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error(
    "Error: Supabase URL and Anon Key must be defined in environment variables. " +
    "Please create a .env file with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
  );
}

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(
  SUPABASE_URL as string,
  SUPABASE_ANON_KEY as string
);