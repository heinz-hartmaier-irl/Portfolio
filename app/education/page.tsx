import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { siteContent } from "@/lib/site-content";
import { getServerLocale } from "@/lib/server-locale";

export default async function EducationPage() {
  const locale = await getServerLocale();
  const content = siteContent[locale].pages.education;

  return (
    <PageShell eyebrow={content.eyebrow} title={content.heading} description={content.description}>
      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard>
          <p className="text-sm font-medium text-orange">2024 - 2026</p>
          <h2 className="mt-2 text-2xl font-semibold text-text">{content.firstTitle}</h2>
          <p className="mt-4 leading-7 text-muted">{content.firstText}</p>
        </SectionCard>
        <SectionCard>
          <p className="text-sm font-medium text-orange">{content.moduleTitle}</p>
          <h2 className="mt-2 text-2xl font-semibold text-text">{content.skillsTitle}</h2>
          <p className="mt-4 leading-7 text-muted">{content.secondText}</p>
        </SectionCard>
      </div>
    </PageShell>
  );
}
