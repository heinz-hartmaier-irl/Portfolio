import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AnimatedBackground } from "@/components/animated-background";
import { SiteHeader } from "@/components/site-header";
import { AudioDock } from "@/components/audio-dock";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Portfolio développeur - Bento interactif",
    template: "%s | Portfolio développeur"
  },
  description:
    "Portfolio personnel interactif en Bento Grid pour présenter projets, compétences, expériences, formation, CV et contact.",
  keywords: [
    "portfolio",
    "developpeur",
    "Next.js",
    "TypeScript",
    "Bento Grid",
    "developpement web"
  ],
  openGraph: {
    title: "Portfolio développeur - Bento interactif",
    description:
      "Un hub immersif pour découvrir un profil, des projets et des compétences en développement informatique.",
    type: "website",
    locale: "fr_FR"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <AnimatedBackground />
        <SiteHeader />
        {children}
        <AudioDock />
      </body>
    </html>
  );
}
