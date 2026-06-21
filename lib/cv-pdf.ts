import { siteContent } from "@/lib/site-content";
import type { Locale } from "@/lib/locale";

type PdfLine = {
  text: string;
  size?: number;
  gapAfter?: number;
};

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const LEFT_MARGIN = 48;
const TOP_START = 780;

function stripAccents(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function escapePdfText(text: string) {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrapText(text: string, maxLength = 84) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) {
    return [""];
  }

  const words = cleaned.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxLength && current) {
      lines.push(current);
      current = word;
      continue;
    }

    current = candidate;
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function pushWrapped(lines: PdfLine[], text: string, size = 11, gapAfter = 0) {
  const normalized = stripAccents(text);
  const wrapped = wrapText(normalized);

  wrapped.forEach((line, index) => {
    lines.push({
      text: line,
      size,
      gapAfter: index === wrapped.length - 1 ? gapAfter : 0
    });
  });
}

function buildContentLines(locale: Locale) {
  const content = siteContent[locale];
  const profile = content.profile;
  const pages = content.pages;
  const lines: PdfLine[] = [];

  lines.push({ text: profile.name, size: 22, gapAfter: 8 });
  pushWrapped(lines, profile.role, 13);
  pushWrapped(lines, profile.baseline, 11, 12);
  pushWrapped(lines, `Email: ${profile.email}`, 10);
  pushWrapped(lines, `GitHub: ${profile.github}`, 10);
  pushWrapped(lines, `LinkedIn: ${profile.linkedin}`, 10, 14);

  pushWrapped(lines, pages.about.sectionOneTitle, 15, 4);
  pushWrapped(lines, pages.about.sectionOneText.replace("{name}", profile.name), 11, 8);

  pushWrapped(lines, pages.about.sectionTwoTitle, 15, 4);
  pushWrapped(lines, pages.about.sectionTwoText, 11, 8);

  pushWrapped(lines, pages.education.title, 15, 4);
  pushWrapped(lines, pages.education.firstTitle, 11, 2);
  pushWrapped(lines, pages.education.firstText, 11, 4);
  pushWrapped(lines, pages.education.secondText, 11, 8);

  pushWrapped(lines, pages.experience.title, 15, 4);
  pushWrapped(lines, pages.experience.internshipHeading, 11, 2);
  pushWrapped(lines, pages.experience.internshipDescription, 11, 8);

  pushWrapped(lines, pages.skills.title, 15, 4);
  pushWrapped(lines, pages.skills.heading, 11, 8);

  return lines;
}

function buildContentStream(locale: Locale) {
  const lines = buildContentLines(locale);
  const content: string[] = ["BT"];
  let cursorY = TOP_START;

  for (const line of lines) {
    const fontSize = line.size ?? 11;
    content.push(`/F1 ${fontSize} Tf`);
    content.push(`1 0 0 1 ${LEFT_MARGIN} ${cursorY} Tm`);
    content.push(`(${escapePdfText(line.text)}) Tj`);
    cursorY -= fontSize + 5 + (line.gapAfter ?? 0);
  }

  content.push("ET");
  return content.join("\n");
}

function buildPdfBytes(locale: Locale) {
  const stream = buildContentStream(locale);
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${Buffer.byteLength(stream, "ascii")} >>\nstream\n${stream}\nendstream`
  ];

  const parts: string[] = ["%PDF-1.4\n"];
  const offsets: number[] = [];

  for (let index = 0; index < objects.length; index += 1) {
    offsets.push(Buffer.byteLength(parts.join(""), "ascii"));
    parts.push(`${index + 1} 0 obj\n${objects[index]}\nendobj\n`);
  }

  const xrefOffset = Buffer.byteLength(parts.join(""), "ascii");

  parts.push(`xref\n0 ${objects.length + 1}\n`);
  parts.push("0000000000 65535 f \n");
  parts.push(
    offsets.map((offset) => `${String(offset).padStart(10, "0")} 00000 n `).join("\n") + "\n"
  );
  parts.push("trailer\n");
  parts.push(`<< /Size ${objects.length + 1} /Root 1 0 R >>\n`);
  parts.push("startxref\n");
  parts.push(`${xrefOffset}\n`);
  parts.push("%%EOF\n");

  return new TextEncoder().encode(parts.join(""));
}

export function buildCvPdf(locale: Locale) {
  return buildPdfBytes(locale);
}
