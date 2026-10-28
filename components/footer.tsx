import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");
  return (
    <footer className="border-t border-zinc-200 dark:border-[rgba(255,255,255,0.08)]">
      <div className="mx-auto max-w-7xl px-4 py-8 text-center font-mono text-[12px] text-zinc-500 dark:text-[#6b7280]">
        <p>© 2026 Eliezer Salas. {t("rights")}</p>
      </div>
    </footer>
  );
}
