import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { buildCvPdf } from "@/lib/cv-pdf";
import { getServerLocale } from "@/lib/server-locale";

export const runtime = "nodejs";

async function loadPdf(locale: "fr" | "en") {
  const filePath = path.join(process.cwd(), "public", "cv.pdf");

  try {
    await access(filePath);
    return await readFile(filePath);
  } catch {
    return buildCvPdf(locale);
  }
}

export async function GET() {
  const locale = await getServerLocale();
  const file = await loadPdf(locale);

  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="cv-heinz-hartmaier.pdf"'
    }
  });
}
