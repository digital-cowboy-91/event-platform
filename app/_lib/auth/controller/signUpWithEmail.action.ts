"use server";

import insertSingleProfile from "../../db/model/profiles/insertSingleProfile";
import { ProfileFormValidationSchema } from "../../db/schema/profile.schema";
import createServerClient from "../../supabase/utils/createServerClient";
import unires from "../../unires/unires";
import {
  SignUpWithEmail,
  SignUpWithEmailSchema,
} from "./signUpWithEmail.schema";

const signUpWithEmail = async (creds: SignUpWithEmail) =>
  unires(async (signalError) => {
    const supabase = await createServerClient();
    const _creds = SignUpWithEmailSchema.parse(creds);

    const auth = await supabase.auth.signUp(_creds);

    if (auth.error) {
      return signalError(auth.error);
    }

    if (!auth.data.user?.id) {
      return signalError({
        message: "Something went wrong, user was not created",
      });
    }

    await insertSingleProfile(
      auth.data.user?.id,
      ProfileFormValidationSchema.parse(_creds)
    );

    return {};
  });

export default signUpWithEmail;
