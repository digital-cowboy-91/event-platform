"use server";

import getAuthedPermission from "@/app/_lib/auth/controller/getAuthedPermission.action";
import getEnvVars from "@/app/_lib/supabase/utils/getEnvVars";
import unires from "@/app/_lib/unires/unires";
import { createClient } from "@supabase/supabase-js";

const deleteCurrentProfile = async () =>
  unires(async (signalError) => {
    const auth = await getAuthedPermission();

    if (!auth.user?.id) return signalError({ message: "Unauthorized user" });

    const supabase = createClient(
      getEnvVars().SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY!
    );
    const user = await supabase.auth.admin.deleteUser(auth.user.id);

    if (user.error) return signalError(user.error);

    return {};
  });

export default deleteCurrentProfile;
