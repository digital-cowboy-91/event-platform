"use server";

import getAuthedPermission from "@/app/_lib/auth/controller/getAuthedPermission.action";
import unires from "../../../unires/unires";
import readSingleProfile from "../../model/profiles/readSingleProfile";

const getCurrentProfile = async () =>
  unires(async (signalError) => {
    const auth = await getAuthedPermission();

    if (!auth.user?.id) return signalError({ message: "Unauthorized user" });

    const profile = await readSingleProfile(auth.user.id).then((res) => res[0]);

    return { profile };
  });

export default getCurrentProfile;
