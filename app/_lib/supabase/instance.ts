import { createClient } from "@supabase/supabase-js";
import getEnvVars from "./utils/getEnvVars";

const { SUPABASE_URL, SUPABASE_ANON_KEY } = getEnvVars();

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
