import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { NextRequest } from "next/server";

const MUSIC_DIRECTORY = path.join(process.cwd(), "lib", "music");

function getSafeTrackPath(track: string) {
  const fileName = path.basename(decodeURIComponent(track));
  return path.join(MUSIC_DIRECTORY, fileName);
}

function getHeaders(contentLength: number, range?: string | null) {
  return {
    "Accept-Ranges": "bytes",
    "Content-Length": String(contentLength),
    "Content-Type": "audio/mpeg",
    ...(range ? { "Content-Range": range } : {})
  };
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ track: string }> }
) {
  const { track } = await context.params;
  const filePath = getSafeTrackPath(track);

  try {
    const fileStats = await stat(filePath);
    const range = request.headers.get("range");

    if (!range) {
      const stream = createReadStream(filePath);

      return new Response(Readable.toWeb(stream) as ReadableStream, {
        headers: getHeaders(fileStats.size)
      });
    }

    const [startPart, endPart] = range.replace(/bytes=/, "").split("-");
    const start = Number.parseInt(startPart, 10);
    const end = endPart ? Number.parseInt(endPart, 10) : fileStats.size - 1;

    if (Number.isNaN(start) || Number.isNaN(end) || start > end || end >= fileStats.size) {
      return new Response(null, {
        status: 416,
        headers: {
          "Content-Range": `bytes */${fileStats.size}`
        }
      });
    }

    const stream = createReadStream(filePath, { start, end });

    return new Response(Readable.toWeb(stream) as ReadableStream, {
      status: 206,
      headers: getHeaders(end - start + 1, `bytes ${start}-${end}/${fileStats.size}`)
    });
  } catch {
    return new Response("Track not found", { status: 404 });
  }
}
