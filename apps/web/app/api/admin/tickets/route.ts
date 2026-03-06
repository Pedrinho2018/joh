import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { jsonError } from "@/lib/server";
import { ERROR_MESSAGES } from "@/lib/constants";

export async function GET() {
  if (!isAdminAuthenticated()) return jsonError(ERROR_MESSAGES.UNAUTHORIZED, 401);
  const tickets = await prisma.ticket.findMany({ orderBy: { updatedAt: "desc" } });
  return Response.json(tickets);
}
