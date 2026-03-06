import { LeadSource } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { notifyLead } from "@/lib/webhooks";
import { errorMessage, jsonError } from "@/lib/server";
import { normalizeFormStrings, parseBody, quoteSchema } from "@/lib/validators";
import { ERROR_MESSAGES } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const body = normalizeFormStrings(await request.json());
    const data = parseBody(quoteSchema, body);

    const message = [data.origin, data.productName, data.message].filter(Boolean).join(" | ");
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        source: LeadSource.QUOTE,
        message,
      },
    });

    await notifyLead({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      source: lead.source,
      message: lead.message,
      createdAt: lead.createdAt,
    });

    return Response.json({ ok: true, id: lead.id });
  } catch (error) {
    return jsonError(errorMessage(error, ERROR_MESSAGES.QUOTE_REGISTER_FAILED));
  }
}
