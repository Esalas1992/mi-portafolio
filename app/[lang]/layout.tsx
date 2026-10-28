import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { notFound } from "next/navigation";
import { JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { langs, isLang } from "@/lib/i18n";
import { getLangMetadata, getPersonJsonLd, getWebSiteJsonLd, getFaqJsonLd } from "@/lib/seo";
import { ThemeRemountGuard } from "@/components/theme-guard";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export async function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return getLangMetadata(lang);
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  setRequestLocale(lang);
  const messages = await getMessages();
  const jsonLd = [getPersonJsonLd(lang), getWebSiteJsonLd(), getFaqJsonLd(lang)];

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${mono.variable} font-mono bg-zinc-100 text-zinc-900 dark:bg-[#071014] dark:text-[#f3f4f6] antialiased grain`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ThemeRemountGuard />
          <NextIntlClientProvider locale={lang} messages={messages}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
