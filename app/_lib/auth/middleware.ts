import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import getEnvVars from "../supabase/utils/getEnvVars";

const { SUPABASE_URL, SUPABASE_ANON_KEY } = getEnvVars();

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdmin = user?.app_metadata?.role === "admin";
  const isAuthenticated = !!user;

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/login") && isAuthenticated) {
    if (isAdmin) {
      const url = request.nextUrl.clone();
      url.pathname = "/cms/events";
      return NextResponse.redirect(url);
    }

    const url = request.nextUrl.clone();
    url.pathname = "/my/profile";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/cms") && !isAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/my") && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
