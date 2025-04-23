"use server";

import createServerClient from "../../supabase/utils/createServerClient";
import unires from "../../unires/unires";
import {
  SignUpWithEmail,
  SignUpWithEmailSchema,
} from "./signUpWithEmail.schema";

const signUpWithEmail = async (creds: SignUpWithEmail) =>
  unires(async (signalError) => {
    const supabase = await createServerClient();
    const parsedCreds = SignUpWithEmailSchema.parse(creds);

    const { error } = await supabase.auth.signUp(parsedCreds);

    if (error) {
      return signalError();
    }

    return {};
  });

export default signUpWithEmail;
