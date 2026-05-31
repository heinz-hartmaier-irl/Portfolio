import { Github, Linkedin, Mail } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { profile } from "@/lib/content";

export const metadata = {
  title: "Contact",
  description: "Formulaire, email, GitHub et LinkedIn."
};

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Échanger autour d'un projet, stage ou entretien."
      description="Le formulaire est prêt côté interface. Il peut être connecté ensuite à Formspree, Resend, une route API Next.js ou un service équivalent."
    >
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionCard>
          <h2 className="text-2xl font-semibold text-text">Liens directs</h2>
          <div className="mt-5 space-y-3">
            <a href={`mailto:${profile.email}`} className="focus-ring flex items-center gap-3 rounded-md border border-line/30 bg-navy/60 p-3 text-muted hover:text-rose">
              <Mail size={18} />
              {profile.email}
            </a>
            <a href={profile.github} className="focus-ring flex items-center gap-3 rounded-md border border-line/30 bg-navy/60 p-3 text-muted hover:text-rose">
              <Github size={18} />
              GitHub
            </a>
            <a href={profile.linkedin} className="focus-ring flex items-center gap-3 rounded-md border border-line/30 bg-navy/60 p-3 text-muted hover:text-rose">
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </SectionCard>
        <SectionCard>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm text-muted">Nom</label>
              <input id="name" name="name" className="mt-2 w-full rounded-md border border-line/30 bg-navy/60 px-3 py-3 text-text outline-none focus:border-gold" />
            </div>
            <div>
              <label htmlFor="email" className="text-sm text-muted">Email</label>
              <input id="email" name="email" type="email" className="mt-2 w-full rounded-md border border-line/30 bg-navy/60 px-3 py-3 text-text outline-none focus:border-gold" />
            </div>
            <div>
              <label htmlFor="message" className="text-sm text-muted">Message</label>
              <textarea id="message" name="message" rows={6} className="mt-2 w-full rounded-md border border-line/30 bg-navy/60 px-3 py-3 text-text outline-none focus:border-gold" />
            </div>
            <button type="submit" className="focus-ring rounded-md bg-orange px-5 py-3 font-medium text-ink">
              Envoyer
            </button>
          </form>
        </SectionCard>
      </div>
    </PageShell>
  );
}
