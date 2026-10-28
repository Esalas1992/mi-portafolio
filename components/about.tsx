import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/reveal";
import { Interests } from "@/components/interests";

export async function About() {
  const t = await getTranslations("about");
  return (
    <section id="sobre" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-4">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded border border-zinc-300 bg-zinc-200 dark:border-[rgba(255,255,255,0.08)] dark:bg-[#0d0d12]">
            <Image src="/foto.webp" alt={t("photoAlt")} fill loading="eager" sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
            <div className="absolute inset-3 rounded-sm border border-[rgba(0,210,255,0.25)]" aria-hidden="true" />
            <div className="absolute bottom-4 left-4 rounded-full border border-[rgba(0,210,255,0.35)] bg-[#071014]/80 px-3 py-1 font-mono text-[10px] tracking-[0.08em] text-[#00d2ff]">
              {t("photoPlace")}
            </div>
          </div>
        </Reveal>
        <div className="md:col-span-7 md:col-start-6">
          <Reveal>
            <p className="font-mono text-sm uppercase tracking-[0.18em] text-cyan-700 dark:text-[#00d2ff]">&gt; {t("label")}</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">{t("title")}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-[65ch] text-lg leading-[26px] text-zinc-600 dark:text-[#9ca3af]">{t("p1")}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 max-w-[65ch] text-lg leading-[26px] text-zinc-600 dark:text-[#9ca3af]">{t("p2")}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 max-w-[65ch] text-lg leading-[26px] text-zinc-600 dark:text-[#9ca3af]">{t("p3")}</p>
          </Reveal>
        </div>
      </div>
      <Interests />
    </section>
  );
}
