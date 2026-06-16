import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "cv.pdf");
  const file = await readFile(filePath);

  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="cv-heinz-hartmaier.pdf"'
    }
  });
}
