"use server";

import getAuthedPermission from "@/app/_lib/auth/controller/getAuthedPermission.action";
import unires from "../../../unires/unires";

const readCurrentProfile = async () =>
  unires(async (signalError) => {
    const auth = await getAuthedPermission();

    console.log({ auth });

    if (!auth.user?.id) return signalError({ message: "Unauthorized user" });

    const profile = {};
    // const profile = await selectProfileById(auth.user.id).then((res) => res[0]);

    return { profile };
  });

export default readCurrentProfile;
