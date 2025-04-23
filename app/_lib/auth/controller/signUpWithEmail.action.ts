"use server";

import createServerClient from "../../supabase/utils/createServerClient";
import {
  SignUpWithEmail,
  SignUpWithEmailSchema,
} from "./signUpWithEmail.schema";

async function signUpWithEmail(creds: SignUpWithEmail) {
  const supabase = await createServerClient();
  const parsedCreds = SignUpWithEmailSchema.parse(creds);

  console.log("signUnWithEmail", { creds, parsedCreds });

  return await supabase.auth.signUp(parsedCreds);
}

export default signUpWithEmail;
