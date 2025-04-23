import { createServerClient as _createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import getEnvVars from "./getEnvVars";

const { SUPABASE_URL, SUPABASE_ANON_KEY } = getEnvVars();

const createServerClient = async () => {
  const cookieStore = await cookies();

  return _createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookieToSet) {
        try {
          cookieToSet.forEach(({ name, value, options }) => {
            cookieStore.set({ name, value, ...options });
          });
        } catch {}
      },
    },
  });
};

export default createServerClient;
