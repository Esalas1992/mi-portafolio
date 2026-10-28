"use client";
import { CodeIcon, DatabaseIcon, CloudIcon, DesktopIcon, WrenchIcon, FlowArrowIcon } from "@phosphor-icons/react";
import { Reveal } from "@/components/reveal";
import { useTranslations } from "next-intl";
import { Pill, PillGroup } from "@/components/pills";

const groupIcons = [CodeIcon, DatabaseIcon, CloudIcon, DesktopIcon, WrenchIcon, FlowArrowIcon];

export function Stack() {
  const t = useTranslations("stack");
  const groups = t.raw("groups") as { name: string; items: string[] }[];
  return (
    <section id="stack" className="scroll-mt-16 border-y border-zinc-200 bg-zinc-200/50 dark:border-[rgba(255,255,255,0.08)] dark:bg-[#0a1a21]">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <Reveal className="text-center">
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-cyan-700 dark:text-[#00d2ff]">&gt; {t("label")}</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">{t("title")}</h2>
          <p className="mx-auto mt-3 max-w-[65ch] text-lg text-zinc-600 dark:text-[#9ca3af]">{t("sub")}</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {groups.map((g, i) => {
            const Icon = groupIcons[i % groupIcons.length];
            return (
              <Reveal key={g.name} delay={(i % 3) * 0.06}>
                <div className="flex aspect-[4/3] flex-col justify-center rounded border border-zinc-200 bg-white p-4 transition duration-200 hover:border-[rgba(0,210,255,0.4)] md:p-6 dark:border-[rgba(255,255,255,0.08)] dark:bg-[#121218]">
                  <div className="flex items-center gap-2.5">
                    <Icon size={24} weight="duotone" className="shrink-0 text-[#00d2ff]" />
                    <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.06em] text-zinc-500 dark:text-[#859399]">{g.name}</h3>
                  </div>
                  <PillGroup className="mt-4 gap-1.5 md:gap-2">
                    {g.items.map((s) => (
                      <Pill key={s}>{s}</Pill>
                    ))}
                  </PillGroup>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
