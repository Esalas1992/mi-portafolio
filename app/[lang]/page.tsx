import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Stack } from "@/components/stack";
import { Experience } from "@/components/experience";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { isLang } from "@/lib/i18n";

export default async function LangHome({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  setRequestLocale(lang);

  return (
    <main>
      <Navbar lang={lang} />
      <Hero />
      <About />
      <Stack />
      <Experience />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
