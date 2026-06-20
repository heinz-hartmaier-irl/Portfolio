import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const creationRoot = path.join(process.cwd(), "lib", "creation");

const contentTypes: Record<string, string> = {
  ".gif": "image/gif",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".webp": "image/webp"
};

function isSafeRelativePath(relativePath: string) {
  const resolvedPath = path.resolve(creationRoot, relativePath);
  const relativeToRoot = path.relative(creationRoot, resolvedPath);

  return !relativeToRoot.startsWith("..") && !path.isAbsolute(relativeToRoot);
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path: pathSegments } = await params;
  const relativePath = Array.isArray(pathSegments) ? pathSegments.join("/") : "";

  if (!relativePath) {
    return NextResponse.json({ error: "Missing asset path" }, { status: 400 });
  }

  if (!isSafeRelativePath(relativePath)) {
    return NextResponse.json({ error: "Invalid asset path" }, { status: 400 });
  }

  const resolvedPath = path.resolve(creationRoot, relativePath);

  try {
    const file = await readFile(resolvedPath);
    const ext = path.extname(resolvedPath).toLowerCase();

    return new NextResponse(file, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": contentTypes[ext] ?? "application/octet-stream"
      }
    });
  } catch {
    return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  }
}
