import type { Metadata } from "next";
import "./globals.css";
import { AnimatedBackground } from "@/components/animated-background";
import { SiteHeader } from "@/components/site-header";
import { AudioDock } from "@/components/audio-dock";
import { siteContent } from "@/lib/site-content";
import { getServerLocale } from "@/lib/server-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const home = siteContent[locale].pages.home;

  return {
    title: {
      default: home.title,
      template: `%s | ${home.title}`
    },
    description: home.description,
    keywords: ["portfolio", "developer", "Next.js", "TypeScript", "Bento Grid", "web development"],
    openGraph: {
      title: home.title,
      description: home.description,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US"
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <AnimatedBackground />
        <SiteHeader />
        {children}
        <AudioDock />
      </body>
    </html>
  );
}
