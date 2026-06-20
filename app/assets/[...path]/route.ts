import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const assetRoots = {
  creation: path.join(/* turbopackIgnore: true */ process.cwd(), "lib", "creation"),
  grille: path.join(/* turbopackIgnore: true */ process.cwd(), "lib", "grille"),
  projet: path.join(/* turbopackIgnore: true */ process.cwd(), "lib", "projet")
} as const;

const contentTypes: Record<string, string> = {
  ".gif": "image/gif",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml"
};

function resolveAssetPath(pathSegments: string[]) {
  const [section, ...rest] = pathSegments;
  const relativePath = rest.join("/");

  switch (section) {
    case "creations":
      return path.join(assetRoots.creation, relativePath);
    case "evaluation":
      return path.join(assetRoots.grille, relativePath);
    case "projects":
      if (rest[0] === "carte") {
        return path.join(assetRoots.projet, "carte", rest.slice(1).join("/"));
      }

      if (rest[0] === "unity") {
        return path.join(assetRoots.projet, "jeux_video", rest.slice(1).join("/"));
      }

      return path.join(assetRoots.projet, relativePath);
    case "grille":
      return path.join(assetRoots.grille, relativePath);
    case "projet":
      return path.join(assetRoots.projet, relativePath);
    default:
      return null;
  }
}

function isSafePath(root: string, resolvedPath: string) {
  const relativeToRoot = path.relative(root, resolvedPath);
  return !relativeToRoot.startsWith("..") && !path.isAbsolute(relativeToRoot);
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path: pathSegments } = await params;

  if (!Array.isArray(pathSegments) || pathSegments.length === 0) {
    return NextResponse.json({ error: "Missing asset path" }, { status: 400 });
  }

  const resolvedPath = resolveAssetPath(pathSegments);
  if (!resolvedPath) {
    return NextResponse.json({ error: "Unsupported asset section" }, { status: 404 });
  }

  const section = pathSegments[0];
  const root =
    section === "creations"
      ? assetRoots.creation
      : section === "evaluation" || section === "grille"
        ? assetRoots.grille
        : assetRoots.projet;

  if (!isSafePath(root, resolvedPath)) {
    return NextResponse.json({ error: "Invalid asset path" }, { status: 400 });
  }

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
