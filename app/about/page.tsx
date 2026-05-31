import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { siteContent } from "@/lib/site-content";
import { getServerLocale } from "@/lib/server-locale";

export default async function AboutPage() {
  const locale = await getServerLocale();
  const content = siteContent[locale].pages.about;
  const profile = siteContent[locale].profile;

  return (
    <PageShell eyebrow={content.eyebrow} title={content.heading} description={content.description}>
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionCard>
          <h2 className="text-2xl font-semibold text-text">{content.sectionOneTitle}</h2>
          <p className="mt-4 leading-7 text-muted">
            {content.sectionOneText.replace("{name}", profile.name)}
          </p>
        </SectionCard>
        <SectionCard>
          <h2 className="text-2xl font-semibold text-text">{content.sectionTwoTitle}</h2>
          <p className="mt-4 leading-7 text-muted">{content.sectionTwoText}</p>
        </SectionCard>
        <SectionCard className="lg:col-span-2">
          <h2 className="text-2xl font-semibold text-text">{content.sectionThreeTitle}</h2>
          <p className="mt-4 leading-7 text-muted">
            {content.sectionThreeText}
          </p>
        </SectionCard>
      </div>
    </PageShell>
  );
}
