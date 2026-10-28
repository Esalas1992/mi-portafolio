"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/reveal";

type Book = { title: string; author: string; cover: string };
type Game = { name: string; cover: string };

const AUTOPLAY_MS = 4500;

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col gap-4 rounded border border-zinc-200 bg-white p-6 transition duration-200 hover:border-[rgba(0,210,255,0.4)] dark:border-[rgba(255,255,255,0.08)] dark:bg-[#121218]">
      {children}
    </div>
  );
}

function CarouselCard({
  title,
  prevLabel,
  nextLabel,
  slides,
  viewportLabel,
}: {
  title: string;
  prevLabel: string;
  nextLabel: string;
  slides: { key: string; label: string; content: React.ReactNode }[];
  viewportLabel: string;
}) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;
  const showNav = total > 1;

  useEffect(() => {
    if (!showNav || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIdx((v) => (v + 1) % total), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [showNav, paused, total]);

  return (
    <CardShell>
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-sm uppercase tracking-[0.18em] text-cyan-700 dark:text-[#00d2ff]">
          {title}
        </p>
        {showNav && (
          <div className="flex shrink-0 gap-1.5" aria-label={viewportLabel}>
            <button
              type="button"
              onClick={() => setIdx((v) => (v - 1 + total) % total)}
              aria-label={prevLabel}
              className="cursor-pointer rounded-full border border-zinc-300 p-1.5 text-zinc-500 transition hover:border-[#00d2ff] hover:text-[#00d2ff] dark:border-[rgba(255,255,255,0.12)] dark:text-[#9ca3af]"
            >
              <CaretLeftIcon size={14} />
            </button>
            <button
              type="button"
              onClick={() => setIdx((v) => (v + 1) % total)}
              aria-label={nextLabel}
              className="cursor-pointer rounded-full border border-zinc-300 p-1.5 text-zinc-500 transition hover:border-[#00d2ff] hover:text-[#00d2ff] dark:border-[rgba(255,255,255,0.12)] dark:text-[#9ca3af]"
            >
              <CaretRightIcon size={14} />
            </button>
          </div>
        )}
      </div>
      <div
        role="region"
        aria-roledescription="carrusel"
        aria-label={viewportLabel}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative min-h-[168px] flex-1 overflow-hidden"
      >
        {slides.map((s, n) => (
          <div
            key={s.key}
            aria-hidden={n === idx ? undefined : "true"}
            className={`absolute inset-0 transition-opacity duration-300 ${
              n === idx ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {s.content}
          </div>
        ))}
      </div>
      {showNav && (
        <div className="flex justify-center gap-1.5" role="tablist" aria-label={viewportLabel}>
          {slides.map((s, n) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={n === idx}
              aria-label={s.label}
              onClick={() => setIdx(n)}
              className={`h-1.5 cursor-pointer rounded-full transition-colors ${
                n === idx ? "w-4 bg-[#00d2ff]" : "w-1.5 bg-zinc-300 hover:bg-zinc-400 dark:bg-[#353438]"
              }`}
            />
          ))}
        </div>
      )}
    </CardShell>
  );
}

function ReadingCard() {
  const t = useTranslations("about.interests");
  const books = t.raw("books") as Book[];
  return (
    <CarouselCard
      title={t("readingTitle")}
      prevLabel={t("prev")}
      nextLabel={t("next")}
      viewportLabel={t("readingTitle")}
      slides={books.map((b) => ({
        key: b.title,
        label: b.title,
        content: (
          <div className="flex items-center gap-4">
            <div className="relative aspect-[2/3] w-28 shrink-0 overflow-hidden rounded border border-zinc-200 dark:border-[rgba(255,255,255,0.08)]">
              <Image src={b.cover} alt={b.title} fill sizes="80px" className="object-cover" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold italic tracking-tight">{b.title}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-zinc-500 dark:text-[#6b7280]">
                — {b.author}
              </p>
            </div>
          </div>
        ),
      }))}
    />
  );
}

function GamingCard() {
  const t = useTranslations("about.interests");
  const games = t.raw("games") as Game[];
  return (
    <CarouselCard
      title={t("gamingTitle")}
      prevLabel={t("prev")}
      nextLabel={t("next")}
      viewportLabel={t("gamingTitle")}
      slides={games.map((g) => ({
        key: g.name,
        label: g.name,
        content: (
          <div className="flex items-center gap-4">
            <div className="relative aspect-[2/3] w-28 shrink-0 overflow-hidden rounded border border-zinc-200 bg-zinc-100 dark:border-[rgba(255,255,255,0.08)] dark:bg-[#1b1b1f]">
              <Image src={g.cover} alt={g.name} fill sizes="112px" className="object-contain" />
            </div>
            <p className="text-xl font-semibold italic tracking-tight">{g.name}</p>
          </div>
        ),
      }))}
    />
  );
}

function ListeningCard() {
  const t = useTranslations("about.interests");
  return (
    <CardShell>
      <p className="font-mono text-sm uppercase tracking-[0.18em] text-cyan-700 dark:text-[#00d2ff]">
        {t("listeningTitle")}
      </p>
      <iframe
        title={t("spotifyTitle")}
        src={t("spotifySrc")}
        width="100%"
        height="152"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        className="w-full rounded-xl border-0"
      />
    </CardShell>
  );
}

export function Interests() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
      <Reveal>
        <ReadingCard />
      </Reveal>
      <Reveal delay={0.06}>
        <GamingCard />
      </Reveal>
      <Reveal delay={0.12}>
        <ListeningCard />
      </Reveal>
    </div>
  );
}
