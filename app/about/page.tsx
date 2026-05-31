import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { profile } from "@/lib/content";

export const metadata = {
  title: "À propos",
  description: "Présentation personnelle, parcours et objectifs professionnels."
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="Présentation"
      title="Un profil orienté interfaces utiles et développement moderne."
      description="Cette page sert de base éditable pour présenter le parcours, les méthodes de travail et les objectifs professionnels."
    >
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionCard>
          <h2 className="text-2xl font-semibold text-text">Qui suis-je ?</h2>
          <p className="mt-4 leading-7 text-muted">
            Je suis {profile.name}, développeur informatique avec un intérêt marqué pour les
            interfaces web, les expériences interactives et les applications maintenables. Mon
            objectif est de transformer des besoins concrets en outils clairs, rapides et agréables
            à utiliser.
          </p>
        </SectionCard>
        <SectionCard>
          <h2 className="text-2xl font-semibold text-text">Objectifs</h2>
          <p className="mt-4 leading-7 text-muted">
            Consolider mes compétences en développement web moderne, rejoindre des projets
            exigeants et continuer à progresser sur l&apos;architecture, la performance, l&apos;accessibilité
            et la qualité des interfaces.
          </p>
        </SectionCard>
        <SectionCard className="lg:col-span-2">
          <h2 className="text-2xl font-semibold text-text">Parcours</h2>
          <p className="mt-4 leading-7 text-muted">
            Le portfolio est structuré pour être utilisé pendant des candidatures ou entretiens :
            projets détaillés, difficultés rencontrées, technologies utilisées, résultats obtenus et
            liens vers les réalisations. Les textes peuvent être personnalisés dans
            <span className="text-gold"> lib/content.ts</span>.
          </p>
        </SectionCard>
      </div>
    </PageShell>
  );
}
