import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";

export const metadata = {
  title: "Formation",
  description: "Diplômes, formations, apprentissages et certifications."
};

export default function EducationPage() {
  return (
    <PageShell
      eyebrow="Formation"
      title="Diplômes, apprentissages et progression."
      description="Une page dédiée au parcours scolaire, aux modules techniques et aux certifications."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard>
          <p className="text-sm font-medium text-orange">2024 - 2026</p>
          <h2 className="mt-2 text-2xl font-semibold text-text">Formation développement informatique</h2>
          <p className="mt-4 leading-7 text-muted">
            Développement web, algorithmique, bases de données, gestion de projet, Git et mise en
            production d&apos;applications.
          </p>
        </SectionCard>
        <SectionCard>
          <p className="text-sm font-medium text-orange">Modules clés</p>
          <h2 className="mt-2 text-2xl font-semibold text-text">Compétences travaillées</h2>
          <p className="mt-4 leading-7 text-muted">
            Interfaces responsive, API, SQL, sécurité de base, accessibilité, documentation et
            présentation de projet.
          </p>
        </SectionCard>
      </div>
    </PageShell>
  );
}
