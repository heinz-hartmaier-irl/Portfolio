import { CreationsGallery } from "./creations-gallery";
import { creationItems, pickCreations } from "@/lib/creations";
import { getServerLocale } from "@/lib/server-locale";

export const metadata = {
  title: "Créations",
  description: "Galerie bento de créations graphiques, audio-visuelles et projets publiés sur les réseaux."
};

export default async function CreationsPage() {
  const locale = await getServerLocale();
  const featuredCreations = pickCreations(creationItems, 4);

  return <CreationsGallery locale={locale} creations={creationItems} featuredCreations={featuredCreations} />;
}
