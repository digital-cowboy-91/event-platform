"use server";

import { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import createServerClient from "../../supabase/utils/createServerClient";

const getAuthedPermission = async (
  redirectWhenNotAuthed = false,
  ctx?: SupabaseClient
) => {
  const supabase = ctx ?? (await createServerClient());
  const { data } = await supabase.auth.getUser();

  if (!data.user?.id && redirectWhenNotAuthed) redirect("/login");

  return data.user
    ? {
        isAuthenticated: true as const,
        isAdmin: data.user?.app_metadata?.role === "admin",
        user: data.user,
      }
    : {
        isAuthenticated: false as const,
        isAdmin: false as const,
        user: null,
      };
};

export default getAuthedPermission;
