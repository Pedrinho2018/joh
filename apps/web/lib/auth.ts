import { cookies } from "next/headers";
import { ADMIN_CONFIG } from "@/lib/constants";

const { COOKIE_NAME, SESSION_DURATION_HOURS } = ADMIN_CONFIG;

export function isAdminAuthenticated(): boolean {
  try {
    return cookies().get(COOKIE_NAME)?.value === "1";
  } catch {
    // cookies() pode falhar fora do contexto de request
    return false;
  }
}

export function setAdminAuthCookie(): void {
  cookies().set(COOKIE_NAME, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * SESSION_DURATION_HOURS,
  });
}

export function clearAdminAuthCookie(): void {
  cookies().set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
