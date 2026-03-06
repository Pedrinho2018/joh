import { clearAdminAuthCookie } from "@/lib/auth";

export async function POST(request: Request) {
  clearAdminAuthCookie();
  return Response.redirect(new URL("/admin", request.url), 302);
}
