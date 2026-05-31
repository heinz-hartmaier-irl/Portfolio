import { Download } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { siteContent } from "@/lib/site-content";
import { getServerLocale } from "@/lib/server-locale";

export default async function CvPage() {
  const locale = await getServerLocale();
  const content = siteContent[locale].pages.cv;
  const profile = siteContent[locale].profile;

  return (
    <PageShell eyebrow={content.eyebrow} title={content.heading} description={content.description}>
      <SectionCard>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-text">{content.titleCard}</h2>
            <p className="mt-2 text-muted">
              {content.body.replace("{path}", profile.cvPath)}
            </p>
          </div>
          <a
            href={profile.cvPath}
            download
            className="focus-ring inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2 font-medium text-ink"
          >
            <Download size={17} />
            {content.download}
          </a>
        </div>
        <div className="mt-6 min-h-[34rem] overflow-hidden rounded-lg border border-line/30 bg-navy/50">
          <iframe title={content.preview} src={profile.cvPath} className="h-[34rem] w-full" />
        </div>
      </SectionCard>
    </PageShell>
  );
}
