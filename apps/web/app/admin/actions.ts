"use server";

import { LeadStatus, ProductType, TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { slugify } from "@/lib/utils";

function asString(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function parseJsonInput(raw: string, fallback: unknown) {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export async function upsertCategoryAction(formData: FormData) {
  requireAdmin();
  const id = Number(formData.get("id") || 0);
  const name = asString(formData, "name");
  const type = asString(formData, "type") as ProductType;
  const description = asString(formData, "description");
  const slug = asString(formData, "slug") || slugify(name);

  if (!name || !type) return;
  if (id) {
    await prisma.productCategory.update({ where: { id }, data: { name, slug, type, description } });
  } else {
    await prisma.productCategory.create({ data: { name, slug, type, description } });
  }
  revalidatePath("/admin/categories");
  revalidatePath("/");
  revalidatePath("/equipamentos");
  revalidatePath("/pecas-acessorios");
}

export async function deleteCategoryAction(formData: FormData) {
  requireAdmin();
  const id = Number(formData.get("id"));
  if (!id) return;
  await prisma.productCategory.delete({ where: { id } }).catch(() => {});
  revalidatePath("/admin/categories");
}

export async function upsertProductAction(formData: FormData) {
  requireAdmin();
  const id = Number(formData.get("id") || 0);
  const name = asString(formData, "name");
  const type = asString(formData, "type") as ProductType;
  const categoryId = Number(formData.get("categoryId") || 0);
  const slug = asString(formData, "slug") || slugify(name);
  const shortDesc = asString(formData, "shortDesc");
  const longDesc = asString(formData, "longDesc");
  const specsText = asString(formData, "specs");
  const imagesText = asString(formData, "images");
  const specs = parseJsonInput(specsText, {
    capacidade: "Placeholder",
    dimensoes: "Placeholder",
    potencia: "Placeholder",
  });
  const images = parseJsonInput(imagesText, ["/images/placeholders/product-1.svg"]);

  if (!name || !type || !categoryId) return;
  const data = { name, slug, type, categoryId, shortDesc, longDesc, specs, images };
  if (id) {
    await prisma.product.update({ where: { id }, data });
  } else {
    await prisma.product.create({ data });
  }
  revalidatePath("/admin/products");
  revalidatePath("/equipamentos");
  revalidatePath("/pecas-acessorios");
}

export async function deleteProductAction(formData: FormData) {
  requireAdmin();
  const id = Number(formData.get("id"));
  if (!id) return;
  await prisma.product.delete({ where: { id } }).catch(() => {});
  revalidatePath("/admin/products");
}

export async function upsertEventAction(formData: FormData) {
  requireAdmin();
  const id = Number(formData.get("id") || 0);
  const title = asString(formData, "title");
  const slug = asString(formData, "slug") || slugify(title);
  const date = asString(formData, "date");
  const location = asString(formData, "location");
  const content = asString(formData, "content");
  const coverImage = asString(formData, "coverImage") || "/images/placeholders/event-1.svg";
  if (!title || !date || !location) return;
  const data = { title, slug, date: new Date(date), location, content, coverImage };
  if (id) {
    await prisma.event.update({ where: { id }, data });
  } else {
    await prisma.event.create({ data });
  }
  revalidatePath("/admin/events");
  revalidatePath("/eventos");
}

export async function deleteEventAction(formData: FormData) {
  requireAdmin();
  const id = Number(formData.get("id"));
  if (!id) return;
  await prisma.event.delete({ where: { id } }).catch(() => {});
  revalidatePath("/admin/events");
}

export async function updateTicketStatusAction(formData: FormData) {
  requireAdmin();
  const id = Number(formData.get("id"));
  const status = asString(formData, "status") as TicketStatus;
  if (!id || !status) return;
  await prisma.ticket.update({ where: { id }, data: { status } });
  revalidatePath("/admin/tickets");
}

export async function updateLeadCrmAction(formData: FormData) {
  requireAdmin();
  const id = Number(formData.get("id"));
  const status = asString(formData, "status") as LeadStatus;
  const notes = asString(formData, "notes");
  if (!id || !status) return;
  await prisma.lead.update({
    where: { id },
    data: { status, notes: notes || null },
  });
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}
