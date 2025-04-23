import { type NextRequest } from "next/server";
import { updateSession } from "./app/_lib/auth/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/my/:path*", "/cms/:path*"],
};
