"use client";
import { useRef } from "react";
import { DownloadSimpleIcon, GraduationCapIcon, TranslateIcon, SealCheckIcon } from "@phosphor-icons/react";
import { Reveal } from "@/components/reveal";
import { useTranslations } from "next-intl";
import { Pill, PillGroup } from "@/components/pills";
import { gsap, useGSAP } from "@/lib/gsap";

type Job = {
  period: string;
  role: string;
  co: string;
  place: string;
  desc: string;
  bullets: string[];
  stack: string[];
  highlights: { v: string; d: string }[];
};
type LangLevel = { l: string; v: string };

export function Experience() {
  const t = useTranslations("exp");
  const jobs = t.raw("jobs") as Job[];
  const langsList = t.raw("aside.langs") as LangLevel[];
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = root.current?.querySelector<HTMLElement>(".exp-timeline");
        const line = root.current?.querySelector<HTMLElement>(".exp-line");

        // Línea vertical que se dibuja conforme avanza el scroll.
        if (timeline && line) {
          gsap.from(line, {
            scaleY: 0,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: timeline,
              start: "top 80%",
              end: "bottom 80%",
              scrub: true,
            },
          });
        }

        // Cada tarjeta aparece por separado al entrar en pantalla.
        gsap.utils.toArray<HTMLElement>(".exp-card", root.current).forEach((card) => {
          gsap.from(card, {
            y: 60,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              once: true,
            },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="experiencia" className="mx-auto max-w-7xl scroll-mt-16 px-4 py-16 md:py-24">
      <Reveal className="text-center">
        <p className="font-mono text-sm uppercase tracking-[0.18em] text-cyan-700 dark:text-[#00d2ff]">&gt; {t("label")}</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">{t("title")}</h2>
        <p className="mx-auto mt-3 max-w-[65ch] text-lg text-zinc-600 dark:text-[#9ca3af]">{t("sub")}</p>
      </Reveal>
      <Reveal className="mt-8 flex justify-end">
        <div className="flex w-full flex-col gap-3 rounded border border-zinc-200 bg-white p-4 sm:w-auto sm:flex-row sm:items-center sm:gap-8 sm:p-5 dark:border-[rgba(255,255,255,0.08)] dark:bg-[#121218]">
          <div className="flex flex-col px-1">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-500 dark:text-[#6b7280]">{t("cv.file")}</span>
            <span className="mt-1 font-mono text-[11px] font-semibold tracking-[0.06em] text-emerald-700 dark:text-[#10b981]">{t("cv.meta")}</span>
          </div>
          {/* Drop your CV files at public/cv-eliezer-salas-es.pdf and public/cv-eliezer-salas-en.pdf. */}
          <a download href={t("cv.href")} className="inline-flex items-center gap-2 rounded bg-[#00d2ff] px-5 py-2 font-mono text-[13px] font-semibold text-[#071014] transition hover:brightness-110 active:scale-[0.98]">
            <DownloadSimpleIcon size={16} weight="bold" />
            {t("cv.cta")}
          </a>
        </div>
      </Reveal>
      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
      <div className="exp-timeline relative lg:col-span-8">
        <div className="exp-line absolute bottom-8 left-2 top-4 w-0.5 bg-gradient-to-b from-[#00d2ff] via-[#00d2ff]/40 to-transparent sm:left-4" aria-hidden="true" />
        {jobs.map((j, i) => (
          <div key={j.role + j.period} className="relative mb-10 pl-10 last:mb-0 sm:pl-14">
            <div className="absolute left-2 top-1.5 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-[rgba(0,210,255,0.45)] bg-[#071014] sm:left-4 dark:bg-[#071014]" aria-hidden="true">
              {i === 0 && <span className="absolute h-3 w-3 animate-ping rounded-full bg-[#00d2ff] opacity-60" />}
              <span className="h-2.5 w-2.5 rounded-full bg-[#00d2ff]" />
            </div>
            <div className="exp-card">
              <article className="rounded border border-zinc-200 bg-white p-6 transition duration-200 hover:border-[rgba(0,210,255,0.4)] sm:p-8 dark:border-[rgba(255,255,255,0.08)] dark:bg-[#121218]">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-cyan-700 dark:bg-[#2a292d] dark:text-[#00d2ff]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00d2ff]" />
                    {j.period}
                  </span>
                  <span className="font-mono text-xs text-zinc-500 dark:text-[#6b7280]">{j.place}</span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight">{j.role}</h3>
                <p className="mt-1 text-sm text-cyan-700 dark:text-[#00d2ff]">{j.co}</p>
                {j.desc !== "" && (
                  <p className="mt-4 max-w-[65ch] text-sm leading-[22px] text-zinc-600 dark:text-[#9ca3af]">{j.desc}</p>
                )}
                {j.bullets.length > 0 && (
                  <ul className="mt-3 flex max-w-[65ch] flex-col gap-2">
                    {j.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-sm leading-[22px] text-zinc-600 dark:text-[#9ca3af]">
                        <span className="text-[#00d2ff]">&gt;</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {j.highlights.length > 0 && (
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {j.highlights.map((h) => (
                      <div key={h.v} className="rounded border border-zinc-200 bg-zinc-100 p-4 dark:border-[rgba(255,255,255,0.08)] dark:bg-[#1b1b1f]">
                        <p className="text-lg font-semibold text-cyan-700 dark:text-[#00d2ff]">{h.v}</p>
                        <p className="mt-1 text-sm leading-[22px] text-zinc-600 dark:text-[#9ca3af]">{h.d}</p>
                      </div>
                    ))}
                  </div>
                )}
                <PillGroup className="mt-6 items-center gap-2 pt-1">
                  {j.stack.map((s) => (
                    <Pill key={s}>{s}</Pill>
                  ))}
                </PillGroup>
              </article>
            </div>
          </div>
        ))}
      </div>
      <aside className="flex flex-col gap-6 lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
        <Reveal>
          <div className="flex flex-col gap-4 rounded border border-zinc-200 bg-white p-6 transition duration-200 hover:border-[rgba(0,210,255,0.4)] dark:border-[rgba(255,255,255,0.08)] dark:bg-[#121218]">
            <p className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-cyan-700 dark:text-[#00d2ff]">
              <GraduationCapIcon size={15} weight="duotone" />
              {t("aside.eduTitle")}
            </p>
            <div className="flex items-start gap-3">
              <div className="rounded bg-zinc-100 p-1.5 text-cyan-700 dark:bg-[#353438] dark:text-[#00d2ff]">
                <GraduationCapIcon size={16} weight="duotone" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[13px] font-medium text-zinc-900 dark:text-[#f3f4f6]">{t("aside.edu")}</span>
                <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-zinc-500 dark:text-[#6b7280]">{t("aside.school")}</span>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.04}>
          <div className="flex flex-col gap-4 rounded border border-zinc-200 bg-white p-6 transition duration-200 hover:border-[rgba(0,210,255,0.4)] dark:border-[rgba(255,255,255,0.08)] dark:bg-[#121218]">
            <p className="flex items-center justify-between gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-cyan-700 dark:text-[#00d2ff]">
              <span className="flex items-center gap-2">
                <SealCheckIcon size={15} weight="duotone" />
                {t("aside.certTitle")}
              </span>
              <span className="rounded-full border border-[rgba(0,210,255,0.35)] px-2.5 py-0.5 font-mono text-[10px] tracking-[0.08em]">{t("aside.certNote")}</span>
            </p>
            <div className="flex flex-col gap-4" aria-hidden="true">
              {[0, 1].map((r) => (
                <div key={r} className="flex items-start gap-3">
                  <div className="skeleton h-8 w-8 shrink-0 rounded" />
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="skeleton h-3 w-3/4 rounded-sm" />
                    <div className="skeleton h-2.5 w-1/2 rounded-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="flex flex-col gap-4 rounded border border-zinc-200 bg-white p-6 transition duration-200 hover:border-[rgba(0,210,255,0.4)] dark:border-[rgba(255,255,255,0.08)] dark:bg-[#121218]">
            <p className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-cyan-700 dark:text-[#00d2ff]">
              <TranslateIcon size={15} weight="duotone" />
              {t("aside.langTitle")}
            </p>
            <div className="flex flex-col gap-3">
              {langsList.map((l) => (
                <div key={l.l} className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[13px] font-medium text-zinc-900 dark:text-[#f3f4f6]">{l.l}</span>
                  <Pill>{l.v}</Pill>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </aside>
      </div>
    </section>
  );
}
