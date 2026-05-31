import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { siteContent } from "@/lib/site-content";
import { getServerLocale } from "@/lib/server-locale";

export default async function SkillsPage() {
  const locale = await getServerLocale();
  const content = siteContent[locale].pages.skills;
  const skillGroups = siteContent[locale].skillGroups;
  const projects = siteContent[locale].projects;

  return (
    <PageShell eyebrow={content.eyebrow} title={content.heading} description={content.description}>
      <div className="grid gap-4 lg:grid-cols-2">
        {skillGroups.map((group) => (
          <SectionCard key={group.title}>
            <h2 className="text-2xl font-semibold text-text">{group.title}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span key={skill} className="rounded-md bg-navy/70 px-3 py-2 text-sm text-muted">
                  {skill}
                </span>
              ))}
            </div>
          </SectionCard>
        ))}
      </div>
      <SectionCard className="mt-4">
        <h2 className="text-2xl font-semibold text-text">{content.projectsTitle}</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {projects.map((project) => (
            <div key={project.slug} className="rounded-md border border-line/30 bg-navy/50 p-4">
              <h3 className="font-semibold text-gold">{project.title}</h3>
              <p className="mt-2 text-sm text-muted">{project.technologies.join(", ")}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </PageShell>
  );
}
