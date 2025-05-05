"use server";

import createServerClient from "../../supabase/utils/createServerClient";
import unires from "../../unires/unires";

const signOut = async () =>
  unires(async (signalError) => {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      return signalError({ message: error.message });
    }

    return {};
  });

export default signOut;
