"use server";

import getAuthedPermission from "@/app/_lib/auth/controller/getAuthedPermission.action";
import unires from "../../../unires/unires";
import updateSingleProfile from "../../model/profiles/updateSingleProfile";
import { ProfileInsertRecord } from "../../schema/profile.schema";

const patchCurrentProfile = async (record: ProfileInsertRecord) =>
  unires(async (signalError) => {
    const auth = await getAuthedPermission();

    if (!auth.user?.id) return signalError({ message: "Unauthorized user" });

    const profile = await updateSingleProfile(auth.user.id, record).then(
      (res) => res[0]
    );

    return { profile };
  });

export default patchCurrentProfile;
