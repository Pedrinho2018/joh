import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";

export function requireAdmin() {
  if (!isAdminAuthenticated()) {
    redirect("/admin");
  }
}
