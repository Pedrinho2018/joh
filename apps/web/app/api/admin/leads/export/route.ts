import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { jsonError } from "@/lib/server";

function csvEscape(value: unknown) {
  const s = String(value ?? "");
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function GET() {
  if (!isAdminAuthenticated()) return jsonError("Não autorizado.", 401);
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  const header = ["id", "createdAt", "updatedAt", "name", "email", "phone", "source", "status", "message", "notes"];
  const lines = [header.join(",")];
  for (const lead of leads) {
    lines.push(
      [
        lead.id,
        lead.createdAt.toISOString(),
        lead.updatedAt.toISOString(),
        lead.name,
        lead.email,
        lead.phone,
        lead.source,
        lead.status,
        lead.message || "",
        lead.notes || "",
      ]
        .map(csvEscape)
        .join(","),
    );
  }
  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="jhonrob-leads.csv"',
    },
  });
}
