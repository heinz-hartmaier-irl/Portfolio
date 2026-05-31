import { Download } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { profile } from "@/lib/content";

export const metadata = {
  title: "CV",
  description: "Consultation et téléchargement du CV."
};

export default function CvPage() {
  return (
    <PageShell
      eyebrow="CV"
      title="CV consultable et téléchargeable."
      description="Place ton fichier PDF dans `public/cv.pdf` pour activer la consultation complète."
    >
      <SectionCard>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-text">Curriculum vitae</h2>
            <p className="mt-2 text-muted">
              Le bouton pointe vers le fichier attendu : <span className="text-gold">{profile.cvPath}</span>.
            </p>
          </div>
          <a
            href={profile.cvPath}
            download
            className="focus-ring inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2 font-medium text-ink"
          >
            <Download size={17} />
            Télécharger
          </a>
        </div>
        <div className="mt-6 min-h-[34rem] overflow-hidden rounded-lg border border-line/30 bg-navy/50">
          <iframe title="Aperçu du CV" src={profile.cvPath} className="h-[34rem] w-full" />
        </div>
      </SectionCard>
    </PageShell>
  );
}
