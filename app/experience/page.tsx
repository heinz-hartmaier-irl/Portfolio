import Image from "next/image";
import { Gamepad2, ScreenShare, CheckCircle2 } from "lucide-react";
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
    { src: "/assets/projects/carte/figma.png", alt: locale === "fr" ? "Maquette Figma de la carte interactive" : "Figma mockup of the interactive map" },
    { src: "/assets/projects/carte/carte_phone.png", alt: locale === "fr" ? "Carte interactive sur mobile" : "Interactive map on mobile" },
    { src: "/assets/projects/carte/hud.png", alt: locale === "fr" ? "Interface et filtres de la carte" : "Map interface and filters" }
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
                    {locale === "fr" ? "Stage développement" : "Development internship"}
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
                <p className="text-sm font-medium text-orange">
                  {locale === "fr" ? "Contexte" : "Context"}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {locale === "fr"
                    ? "Ce stage correspond à la carte interactive et à son intégration web. Il s'agit d'une expérience de terrain distincte du projet Unity."
                    : "This internship covers the interactive map and its web integration. It is a field experience separate from the Unity project."}
                </p>
              </div>

              <div className="glass-border rounded-lg p-4">
                <p className="text-sm font-medium text-orange">
                  {locale === "fr" ? "À retenir" : "Key points"}
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-rose" />
                    <span>{locale === "fr" ? "Carte interactive" : "Interactive map"}</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-rose" />
                    <span>{locale === "fr" ? "Filtres web" : "Web filters"}</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-rose" />
                    <span>{locale === "fr" ? "Exploration de données locales" : "Local data exploration"}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard className="overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                {locale === "fr" ? "Projet de cours" : "Course project"}
              </p>
              <h2 className="text-3xl font-semibold text-text sm:text-4xl">
                {locale === "fr" ? "Jeu Unity" : "Unity game"}
              </h2>
              <p className="max-w-2xl leading-7 text-muted">
                {locale === "fr"
                  ? "Ce projet Unity est un exercice de cours distinct du stage. Il sert à montrer la conception d'un jeu, la structure du prototype et la mise en place de l'interface."
                  : "This Unity project is a class assignment separate from the internship. It shows game design, prototype structure and interface setup."}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="glass-border rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-orange">
                  <Gamepad2 size={16} />
                  {locale === "fr" ? "Aperçu du jeu" : "Game preview"}
                </div>
                <div className="mt-4 overflow-hidden rounded-lg border border-line/25 bg-paper/55">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src="/assets/projects/unity/screenshot.png"
                      alt={locale === "fr" ? "Capture d'écran du jeu Unity" : "Unity game screenshot"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="border-t border-line/20 px-3 py-2 text-xs text-muted">
                    {locale === "fr"
                      ? "Projet de cours avec prototype jouable et interface intégrée."
                      : "Course project with a playable prototype and integrated UI."}
                  </p>
                </div>
              </div>

              <div className="glass-border rounded-lg p-4">
                <p className="text-sm font-medium text-orange">{locale === "fr" ? "Objectif" : "Goal"}</p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-gold" />
                    <span>{locale === "fr" ? "Montrer un prototype de jeu" : "Show a game prototype"}</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-gold" />
                    <span>{locale === "fr" ? "Présenter la logique du gameplay" : "Present gameplay logic"}</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-gold" />
                    <span>{locale === "fr" ? "Distinguer le projet du stage" : "Keep it separate from the internship"}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </PageShell>
  );
}
