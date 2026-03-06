import { z } from "zod";

const phoneRegex = /^[0-9()+\-\s]{8,20}$/;

export const leadBaseSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório."),
  email: z.string().email("Email inválido."),
  phone: z.string().regex(phoneRegex, "Telefone inválido."),
});

export const contactSchema = leadBaseSchema.extend({
  subject: z.string().min(2, "Assunto é obrigatório."),
  message: z.string().min(5, "Mensagem muito curta."),
});

export const quoteSchema = leadBaseSchema.extend({
  subject: z.string().min(2, "Assunto é obrigatório."),
  message: z.string().optional().default(""),
  origin: z.string().optional(),
  productName: z.string().optional(),
});

export const catalogSchema = leadBaseSchema;

export const ticketSchema = leadBaseSchema.extend({
  subject: z.string().min(2, "Assunto é obrigatório."),
  message: z.string().min(5, "Mensagem muito curta."),
});

export function parseBody<T>(schema: z.ZodSchema<T>, body: unknown): T {
  return schema.parse(body);
}

export function normalizeFormStrings(entries: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(entries).map(([k, v]) => [k, typeof v === "string" ? v.trim() : v]),
  );
}

export function validateLeadLikeClient(payload: { name?: string; email?: string; phone?: string }) {
  const result = leadBaseSchema.safeParse({
    name: payload.name || "",
    email: payload.email || "",
    phone: payload.phone || "",
  });
  return result.success ? null : result.error.issues[0]?.message || "Dados inválidos.";
}
