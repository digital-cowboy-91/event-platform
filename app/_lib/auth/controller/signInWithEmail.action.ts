"use server";

import createServerClient from "../../supabase/utils/createServerClient";
import {
  SignInWithEmail,
  SignInWithEmailSchema,
} from "./signInWithEmail.schema";

async function signInWithEmail(creds: SignInWithEmail) {
  const supabase = await createServerClient();
  const parsedCreds = SignInWithEmailSchema.parse(creds);

  console.log("signInWithEmail", { creds, parsedCreds });

  return await supabase.auth.signInWithPassword(parsedCreds);
}

export default signInWithEmail;
