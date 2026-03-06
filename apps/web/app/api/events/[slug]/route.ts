import { prisma } from "@/lib/prisma";
import { jsonError } from "@/lib/server";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const event = await prisma.event.findUnique({ where: { slug: params.slug } });
  if (!event) return jsonError("Evento não encontrado.", 404);
  return Response.json(event);
}
