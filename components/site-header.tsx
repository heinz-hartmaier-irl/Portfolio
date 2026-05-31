"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Menu, X } from "lucide-react";
import { useState } from "react";
import { navigation, profile } from "@/lib/content";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname === "/") return null;

  return (
    <header className="sticky top-0 z-40 border-b border-line/30 bg-ink/[0.78] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-md">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-gold text-ink">
            <Home size={19} />
          </span>
          <span>
            <span className="block text-sm font-semibold text-text">{profile.name}</span>
            <span className="block text-xs text-muted">{profile.role}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`focus-ring rounded-md px-3 py-2 text-sm transition ${
                  active ? "bg-rose/10 text-rose" : "text-muted hover:bg-navy hover:text-text"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <ThemeToggle />
        </div>
        <button
          type="button"
          className="focus-ring grid h-10 w-10 place-items-center rounded-md border border-line/30 text-text lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {open ? (
        <nav className="border-t border-line/30 px-4 py-3 lg:hidden" aria-label="Navigation mobile">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2">
            <ThemeToggle className="col-span-2 justify-self-start" />
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring flex items-center gap-2 rounded-md border border-line/30 bg-navy/80 px-3 py-3 text-sm text-muted"
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
