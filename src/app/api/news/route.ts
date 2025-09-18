// src/app/api/news/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const createNewsSchema = z.object({
  titulo: z.string().min(1),
  slug: z.string().min(1),
  bajada: z.string().optional(),
  contenidoHtml: z.string().min(1),
  portadaUrl: z.string().optional(),
  estadoId: z.string(),
  tipoNoticiaId: z.string().optional(),
  prioridadId: z.string().optional(),
  autorRut: z.string(),
});

export async function GET() {
  const items = await prisma.noticia.findMany({
    orderBy: { creadoEn: 'desc' },
  });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const body = await req.json();
  const validatedData = createNewsSchema.parse(body);
  const newItem = await prisma.noticia.create({
    data: validatedData,
  });
  return NextResponse.json(newItem, { status: 201 });
}