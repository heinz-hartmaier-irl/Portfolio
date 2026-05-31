import { PageShell } from "@/components/page-shell";
import { timeline } from "@/lib/content";

export const metadata = {
  title: "Expériences",
  description: "Stages, expériences et projets présentés sous forme de timeline."
};

export default function ExperiencePage() {
  return (
    <PageShell
      eyebrow="Expériences"
      title="Parcours professionnel et projets marquants."
      description="Une timeline pour présenter les stages, missions, responsabilités et résultats."
    >
      <div className="relative space-y-4 before:absolute before:left-4 before:top-2 before:h-full before:w-px before:bg-line/30">
        {timeline.map((item) => (
          <article key={`${item.date}-${item.title}`} className="relative pl-12">
            <span className="absolute left-0 top-2 grid h-8 w-8 place-items-center rounded-md bg-rose text-white">
              {item.date.slice(-2)}
            </span>
            <div className="glass-border rounded-lg p-5">
              <p className="text-sm font-medium text-orange">{item.type} · {item.date}</p>
              <h2 className="mt-2 text-2xl font-semibold text-text">{item.title}</h2>
              <p className="mt-3 leading-7 text-muted">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
