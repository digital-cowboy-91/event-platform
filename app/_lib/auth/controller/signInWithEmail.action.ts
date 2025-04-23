"use server";

import createServerClient from "../../supabase/utils/createServerClient";
import unires from "../../unires/unires";
import {
  SignInWithEmail,
  SignInWithEmailSchema,
} from "./signInWithEmail.schema";

const signInWithEmail = async (creds: SignInWithEmail) =>
  unires(async (signalError) => {
    const supabase = await createServerClient();
    const parsedCreds = SignInWithEmailSchema.parse(creds);

    const { error } = await supabase.auth.signInWithPassword(parsedCreds);

    if (error) {
      return signalError();
    }

    return {};
  });

export default signInWithEmail;
