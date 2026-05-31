"use client";

import { motion } from "framer-motion";

type SectionCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionCard({ children, className = "" }: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`glass-border rounded-lg p-5 shadow-glow ${className}`}
    >
      {children}
    </motion.div>
  );
}
