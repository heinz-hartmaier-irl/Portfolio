import { PageShell } from "@/components/page-shell";
import { siteContent } from "@/lib/site-content";
import { getServerLocale } from "@/lib/server-locale";

export default async function ExperiencePage() {
  const locale = await getServerLocale();
  const content = siteContent[locale].pages.experience;
  const timeline = siteContent[locale].timeline;

  return (
    <PageShell eyebrow={content.eyebrow} title={content.heading} description={content.description}>
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
