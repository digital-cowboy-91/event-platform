"use server";

import createServerClient from "../../supabase/utils/createServerClient";

const getAuthedPermission = async () => {
  const supabase = await createServerClient();
  const { data } = await supabase.auth.getUser();

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
