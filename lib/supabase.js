import { createClient } from "@supabase/supabase-js";

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if environment variables are available
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or API key is missing. Please check your environment variables.");
}

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);