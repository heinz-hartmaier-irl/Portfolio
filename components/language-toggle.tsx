"use client";

import { Languages } from "lucide-react";
import { localeCookieName, oppositeLocale, type Locale } from "@/lib/locale";
import { useLocale } from "@/lib/use-locale";

function setLocaleCookie(locale: Locale) {
  document.cookie = `${localeCookieName}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageToggle({ className = "" }: { className?: string }) {
  const locale = useLocale();

  const toggleLocale = () => {
    const next = oppositeLocale(locale);
    setLocaleCookie(next);
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={`focus-ring grid h-10 w-10 place-items-center rounded-md border border-line/30 bg-navy/80 text-text shadow-glow backdrop-blur-xl transition hover:text-gold ${className}`}
      aria-label={locale === "fr" ? "Switch to English" : "Passer en français"}
      title={locale === "fr" ? "EN" : "FR"}
    >
      <Languages size={18} />
    </button>
  );
}

