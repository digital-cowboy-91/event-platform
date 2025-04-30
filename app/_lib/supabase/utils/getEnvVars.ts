const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_PUBLIC_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_BUCKET;

function getEnvVars() {
  if (!SUPABASE_URL) {
    throw new Error("Missing ENV variable NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!SUPABASE_ANON_KEY) {
    throw new Error("Missing ENV variable NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  if (!SUPABASE_PUBLIC_BUCKET) {
    throw new Error("Missing ENV variable NEXT_PUBLIC_SUPABASE_PUBLIC_BUCKET");
  }

  return { SUPABASE_ANON_KEY, SUPABASE_URL, SUPABASE_PUBLIC_BUCKET };
}

export default getEnvVars;
