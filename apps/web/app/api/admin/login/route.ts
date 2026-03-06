import { setAdminAuthCookie } from "@/lib/auth";
import { jsonError } from "@/lib/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const password = String(body.password || "");
  const expected = process.env.ADMIN_PASSWORD || "demo123";
  if (password !== expected) return jsonError("Senha inválida.", 401);
  setAdminAuthCookie();
  return Response.json({ ok: true });
}
