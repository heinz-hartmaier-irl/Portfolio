import Image from "next/image";
import { CheckCircle2, Gamepad2, ScreenShare } from "lucide-react";
import { EvaluationGridDock } from "@/components/evaluation-grid-dock";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { siteContent } from "@/lib/site-content";
import { getServerLocale } from "@/lib/server-locale";

export default async function ExperiencePage() {
  const locale = await getServerLocale();
  const content = siteContent[locale].pages.experience;
  const timeline = siteContent[locale].timeline;
  const highlights = content.internshipHighlights ?? [];
  const mapScreenshots = [
    { src: "/assets/projects/carte/figma.png", alt: "Maquette Figma de la carte interactive" },
    { src: "/assets/projects/carte/carte_phone.png", alt: "Carte interactive sur mobile" },
    { src: "/assets/projects/carte/hud.png", alt: "Interface et filtres de la carte" }
  ];
  const evaluationItems = [
    { title: "Carte - Comprendre", src: "/assets/evaluation/comprendre.png" },
    { title: "Carte - Concevoir", src: "/assets/evaluation/concevoir.png" },
    { title: "Carte - Developper", src: "/assets/evaluation/developper.png" },
    { title: "Unity - Exprimer", src: "/assets/evaluation/exprimer.png" },
    { title: "Unity - Entreprendre", src: "/assets/evaluation/entreprendre.png" }
  ];

  return (
    <PageShell eyebrow={content.eyebrow} title={content.heading} description={content.description}>
      <div className="space-y-10">
        <div className="relative space-y-4 before:absolute before:left-4 before:top-2 before:h-full before:w-px before:bg-line/30">
          {timeline.map((item) => (
            <article key={`${item.date}-${item.title}`} className="relative pl-12">
              <span className="absolute left-0 top-2 grid h-8 w-8 place-items-center rounded-md bg-rose text-white">
                {item.date.slice(-2)}
              </span>
              <div className="glass-border rounded-lg p-5">
                <p className="text-sm font-medium text-orange">
                  {item.type} - {item.date}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-text">{item.title}</h2>
                <p className="mt-3 leading-7 text-muted">{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        <SectionCard className="overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                  {content.internshipEyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-text sm:text-4xl">
                  {content.internshipHeading}
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-muted">{content.internshipDescription}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="glass-border rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-orange">
                    <ScreenShare size={16} />
                    Captures du stage
                  </div>
                  <div className="mt-4 grid gap-3">
                    {mapScreenshots.map((item) => (
                      <div key={item.src} className="overflow-hidden rounded-lg border border-line/25 bg-paper/55">
                        <div className="relative aspect-[16/10]">
                          <Image src={item.src} alt={item.alt} fill className="object-cover" />
                        </div>
                        <p className="border-t border-line/20 px-3 py-2 text-xs text-muted">{item.alt}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-border rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-orange">
                    <CheckCircle2 size={16} />
                    {content.internshipHighlightsTitle}
                  </div>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
                    {highlights.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-gold" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="glass-border rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-orange">
                  <Gamepad2 size={16} />
                  Jeu Unity
                </div>
                <div className="mt-4 overflow-hidden rounded-lg border border-line/25 bg-paper/55">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src="/assets/projects/unity/screenshot.png"
                      alt="Capture d'ecran du jeu Unity"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="border-t border-line/20 px-3 py-2 text-sm leading-6 text-muted">
                    Prototype de jeu video realise avec Unity et C#, presente dans le meme esprit que le stage developpement.
                  </p>
                </div>
              </div>

              <div className="glass-border rounded-lg p-4">
                <p className="text-sm font-medium text-orange">{content.evaluationTitle}</p>
                <p className="mt-3 text-sm leading-6 text-muted">{content.evaluationDescription}</p>
                <div className="mt-4 flex items-center gap-3 rounded-lg border border-line/25 bg-navy/55 p-4">
                  <span className="grid h-11 w-11 place-items-center rounded-md bg-rose/15 text-rose">
                    <CheckCircle2 size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text">Grilles disponibles</p>
                    <p className="text-sm leading-6 text-muted">
                      Le bouton flottant ouvre les grilles associees a la carte et au jeu Unity, avec zoom et plein ecran.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

        <EvaluationGridDock
          title={content.evaluationTitle}
          subtitle={content.evaluationDescription}
          triggerLabel={content.evaluationTrigger}
          emptyState={content.evaluationEmptyState}
          mediaItems={evaluationItems}
        />
      </div>
    </PageShell>
  );
}
