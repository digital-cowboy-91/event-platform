"use server";

import { redirect } from "next/navigation";
import createServerClient from "../../supabase/utils/createServerClient";

const getAuthedPermission = async (redirectWhenNotAuthed = false) => {
  const supabase = await createServerClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user?.id && redirectWhenNotAuthed) redirect("/login");

  return data.user
    ? {
        isAuthenticated: true as const,
        isPermitted: true,
        user: data.user,
      }
    : {
        isAuthenticated: false as const,
        isPermitted: false as const,
        user: null,
      };
};

export default getAuthedPermission;
