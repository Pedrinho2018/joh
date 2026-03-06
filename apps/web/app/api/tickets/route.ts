export const runtime = "nodejs";

import fs from "node:fs/promises";
import path from "node:path";
import { TicketStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { notifyTicket } from "@/lib/webhooks";
import {
  ensureUploadsDir,
  errorMessage,
  getUploadsDir,
  isValidFileExtension,
  isValidFileSize,
  jsonError,
  nextProtocol,
  sanitizeFilename,
  ticketStatusLabel,
} from "@/lib/server";
import { normalizeFormStrings, parseBody, ticketSchema } from "@/lib/validators";
import { ERROR_MESSAGES } from "@/lib/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const protocol = searchParams.get("protocol");
  if (!protocol) return jsonError(ERROR_MESSAGES.PROTOCOL_REQUIRED);

  const ticket = await prisma.ticket.findUnique({ where: { protocol } });
  if (!ticket) return jsonError(ERROR_MESSAGES.PROTOCOL_NOT_FOUND, 404);

  return Response.json({
    protocol: ticket.protocol,
    status: ticketStatusLabel(ticket.status),
    updatedAt: ticket.updatedAt,
  });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const payload = normalizeFormStrings(Object.fromEntries(formData.entries()));
    const data = parseBody(ticketSchema, payload);

    await ensureUploadsDir();
    const files = formData.getAll("attachments").filter((item): item is File => item instanceof File && item.size > 0);
    const savedAttachments: string[] = [];

    for (const file of files) {
      // Validar extensão e tamanho
      if (!isValidFileExtension(file.name)) {
        return jsonError(`Extensão não permitida: ${file.name}`);
      }
      if (!isValidFileSize(file.size)) {
        return jsonError(`Arquivo muito grande: ${file.name}`);
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${sanitizeFilename(file.name)}`;
      const fullPath = path.join(getUploadsDir(), safeName);
      await fs.writeFile(fullPath, buffer);
      savedAttachments.push(`/uploads/tickets/${safeName}`);
    }

    const count = await prisma.ticket.count();
    const protocol = nextProtocol(count);

    const ticket = await prisma.ticket.create({
      data: {
        protocol,
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        status: TicketStatus.OPEN,
        attachments: savedAttachments,
      },
    });

    await notifyTicket({
      id: ticket.id,
      protocol: ticket.protocol,
      name: ticket.name,
      email: ticket.email,
      phone: ticket.phone,
      subject: ticket.subject,
      message: ticket.message,
      status: ticket.status,
      attachments: ticket.attachments,
      createdAt: ticket.createdAt,
    });

    return Response.json({ ok: true, protocol: ticket.protocol });
  } catch (error) {
    return jsonError(errorMessage(error, ERROR_MESSAGES.TICKET_CREATE_FAILED));
  }
}
