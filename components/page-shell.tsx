"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export function PageShell({ eyebrow, title, description, children }: PageShellProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14"
    >
      <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }}>
        <Link
          href="/"
          className="focus-ring mb-8 inline-flex items-center gap-2 rounded-md text-sm text-muted transition hover:text-rose"
        >
          <ArrowLeft size={16} />
          Retour au bento
        </Link>
      </motion.div>
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14, duration: 0.42 }}
        className="mb-10 max-w-3xl"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold">{eyebrow}</p>
        <h1 className="text-4xl font-semibold text-text sm:text-5xl">{title}</h1>
        <p className="mt-5 text-base leading-7 text-muted sm:text-lg">{description}</p>
      </motion.section>
      <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
        {children}
      </motion.div>
    </motion.main>
  );
}
