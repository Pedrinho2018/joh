import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { endOfDay, startOfDay, subDays } from "@/lib/dates";
import { jsonError } from "@/lib/server";

export async function GET() {
  if (!isAdminAuthenticated()) return jsonError("Não autorizado.", 401);
  const now = new Date();
  const [leadsToday, leadsWeek, ticketsOpen] = await Promise.all([
    prisma.lead.count({ where: { createdAt: { gte: startOfDay(now), lte: endOfDay(now) } } }),
    prisma.lead.count({ where: { createdAt: { gte: subDays(startOfDay(now), 6), lte: endOfDay(now) } } }),
    prisma.ticket.count({ where: { status: { in: ["OPEN", "IN_PROGRESS"] } } }),
  ]);
  return Response.json({ leadsToday, leadsWeek, ticketsOpen });
}
