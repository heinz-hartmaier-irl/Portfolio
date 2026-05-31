import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { projects, skillGroups } from "@/lib/content";

export const metadata = {
  title: "Compétences",
  description: "Compétences techniques front-end, back-end, bases de données, outils et domaines."
};

export default function SkillsPage() {
  return (
    <PageShell
      eyebrow="Compétences"
      title="Une vue claire des technologies maîtrisées."
      description="Les compétences sont organisées par familles et reliées aux projets qui les utilisent."
    >
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
        <h2 className="text-2xl font-semibold text-text">Compétences reliées aux projets</h2>
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
