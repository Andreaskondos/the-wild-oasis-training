import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://pbcpauyfnlzkbicsuhcj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBiY3BhdXlmbmx6a2JpY3N1aGNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ1NTQzNjEsImV4cCI6MjAyMDEzMDM2MX0.H_bbLWtOO4i3LaADJarpuq_FXETAsvc14PGsjmJxyKY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
