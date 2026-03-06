import { prisma } from "@/lib/prisma";

export async function GET() {
  const events = await prisma.event.findMany({ orderBy: { date: "desc" } });
  return Response.json(events);
}
