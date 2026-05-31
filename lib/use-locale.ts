"use client";

import { useState } from "react";
import { localeCookieName, normalizeLocale, type Locale } from "@/lib/locale";

function readLocaleFromCookie() {
  if (typeof document === "undefined") return "fr";
  const match = document.cookie.match(new RegExp(`(?:^|; )${localeCookieName}=([^;]*)`));
  return normalizeLocale(match ? decodeURIComponent(match[1]) : null);
}

export function useLocale() {
  const [locale] = useState<Locale>(() => readLocaleFromCookie());

  return locale;
}
