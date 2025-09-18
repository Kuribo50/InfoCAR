// src/app/api/news/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";


const updateNewsSchema = z.object({
  titulo: z.string().optional(),
  bajada: z.string().optional(),
  contenidoHtml: z.string().optional(),
  portadaUrl: z.string().optional(),
  estadoId: z.string().optional(),
  tipoNoticiaId: z.string().optional(),
  prioridadId: z.string().optional(),
  publicadoEn: z.string().optional(),
});


export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
const { id } = await params;
const item = await prisma.noticia.findUnique({ where: { id } });
if (!item) return NextResponse.json({ error: "Not Found" }, { status: 404 });
return NextResponse.json(item);
}


export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const validatedData = updateNewsSchema.parse(body);

    const updatedItem = await prisma.noticia.update({
      where: { id },
      data: {
        ...validatedData,
        publicadoEn: validatedData.publicadoEn ? new Date(validatedData.publicadoEn) : undefined,
      },
    });
    return NextResponse.json(updatedItem);
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}


export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
const { id } = await params;
await prisma.noticia.delete({ where: { id } });
return NextResponse.json({ message: "Deleted successfully" });
}