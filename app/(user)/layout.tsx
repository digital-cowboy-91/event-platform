import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import supabase from "../_lib/supabase/instance";

export default async function layout({ children }: PropsWithChildren) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return children;
}
