"use client";
import { startTransition } from 'react';
import { SunIcon, MoonIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { goToHash } from "@/lib/scroll";
import type { Lang } from "@/lib/i18n";

function LangSwitch({ lang, label }: { lang: Lang; label: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const opts: Lang[] = ['es', 'en'];

  const targetFor = (o: Lang) => {
    if (!pathname) return `/${o}`;
    const parts = pathname.split('/');
    if (parts[1] === 'es' || parts[1] === 'en') {
      parts[1] = o;
      return parts.join('/') || `/${o}`;
    }
    return `/${o}`;
  };

  const handleLanguageClick = (e: React.MouseEvent<HTMLAnchorElement>, targetLang: Lang) => {
    if (lang === targetLang) return;

    e.preventDefault();
    
    startTransition(() => {
      router.replace(targetFor(targetLang), { scroll: false });
    });
    
  };

  return (
    <div role="group" aria-label={label} className="flex rounded border border-zinc-300 p-0.5 dark:border-[rgba(255,255,255,0.12)]">
      {opts.map((o) => (
        <Link
          key={o}
          href={targetFor(o)}
          onClick={(e) => handleLanguageClick(e, o)}
          aria-current={lang === o ? 'true' : undefined}
          className={`rounded-[3px] px-2.5 py-1 font-mono text-xs transition active:scale-[0.98] ${
            lang === o
              ? 'bg-[#00d2ff] font-bold text-[#050508]'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-[#6b7280] dark:hover:text-[#f3f4f6]'
          }`}
        >
          {o.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

function ThemeToggle({ label, duotone }: { label: string; duotone?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";
  return (
    <button
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="cursor-pointer rounded border border-zinc-300 p-2 dark:border-[rgba(255,255,255,0.12)]"
      aria-label={label}
    >
      {dark ? (
        <SunIcon size={16} weight={duotone ? "duotone" : "regular"} />
      ) : (
        <MoonIcon size={16} weight={duotone ? "duotone" : "regular"} />
      )}
    </button>
  );
}

export function Navbar({ lang }: { lang: Lang }) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const links = [
    { href: "#sobre", id: "sobre", label: t("about") },
    { href: "#stack", id: "stack", label: t("stack") },
    { href: "#experiencia", id: "experiencia", label: t("exp") },
  ];

  useEffect(() => {
    // Ids sin link en el nav: al entrar en ellos se limpia el activo.
    const clearIds = ["top", "contacto"];
    const els = [...links.map((l) => l.id), ...clearIds]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          if (clearIds.includes(e.target.id)) setActive("");
          else setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/85 backdrop-blur dark:border-[rgba(255,255,255,0.08)] dark:bg-[#071014]/85">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4" aria-label={t("main")}>
        <a href="#top" onClick={(e) => goToHash(e, "#top")} className="flex items-center gap-2.5" aria-label="esalas.dev inicio">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" className="h-8 w-8" aria-hidden="true">
            <rect width="100" height="100" rx="20" fill="#0c0d14" />
            <rect x="1.5" y="1.5" width="97" height="97" rx="18.5" stroke="#1e293b" strokeWidth="3" />
            <path d="M28 35L42 50L28 65" stroke="#00d2ff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="50" y1="65" x2="72" y2="65" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
            <circle cx="70" cy="35" r="4" fill="#00d2ff" />
          </svg>
          <span className="text-sm font-bold tracking-tight">&lt;esalas.dev/&gt;</span>
        </a>
        <div className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => goToHash(e, l.href)}
              aria-current={active === l.id ? "true" : undefined}
              className={`text-sm transition ${
                active === l.id
                  ? "text-cyan-700 dark:text-[#00d2ff]"
                  : "text-zinc-600 hover:text-zinc-950 dark:text-[#9ca3af] dark:hover:text-[#00d2ff]"
              }`}
            >
              <span className={`mr-1 ${active === l.id ? "text-[#00d2ff]" : "text-[#00d2ff]/40"}`}>&gt;</span>
              {l.label}
            </a>
          ))}
          <LangSwitch lang={lang} label={t("langLabel")} />
          <ThemeToggle label={t("theme")} duotone />
          <a href="#contacto" onClick={(e) => goToHash(e, "#contacto")} className="rounded bg-[#00d2ff] px-4 py-2 text-sm font-semibold text-[#071014] transition hover:brightness-110 active:scale-[0.98]">
            {t("contact")}
          </a>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <LangSwitch lang={lang} label={t("langLabel")} />
          <ThemeToggle label={t("theme")} />
          <button onClick={() => setOpen(!open)} className="cursor-pointer p-2" aria-label={t("menu")}>
            {open ? <XIcon size={22} /> : <ListIcon size={22} />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-zinc-200 px-4 py-4 lg:hidden dark:border-[rgba(255,255,255,0.08)]">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  goToHash(e, l.href);
                  setOpen(false);
                }}
                className={`text-sm ${active === l.id ? "text-cyan-700 dark:text-[#00d2ff]" : ""}`}
              >
                <span className={`mr-1 ${active === l.id ? "text-[#00d2ff]" : "text-[#00d2ff]/40"}`}>&gt;</span>
                {l.label}
              </a>
            ))}
            <a href="#contacto" onClick={(e) => {
              goToHash(e, "#contacto");
              setOpen(false);
            }} className="rounded bg-[#00d2ff] px-4 py-2 text-center text-sm font-semibold text-[#071014]">
              {t("contact")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

