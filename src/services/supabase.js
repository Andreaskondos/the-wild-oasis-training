import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://cksgzlvsxdhqlusibfrs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrc2d6bHZzeGRocWx1c2liZnJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxOTI3NzUsImV4cCI6MjA0NTc2ODc3NX0.dcSgUVIqzHiu3xDLAGrfxbqSJLXquyxuL63drkqS8mU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
