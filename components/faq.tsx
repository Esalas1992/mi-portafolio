"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/reveal";
import { Accordion } from "@/components/interior/accordion";
import { goToHash } from "@/lib/scroll";

export function Faq() {
  const t = useTranslations("faq");

  // Helper para generar enlaces externos con estilos GEO consistentes
  const renderLink = (href: string) => (chunks: React.ReactNode) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline hover:opacity-80 transition-opacity"
    >
      {chunks}
    </a>
  );

  // Definimos la cantidad de items de la FAQ (puedes ajustar el array si agregas más)
  const itemsCount = 6;

  return (
    <section id="faq" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 md:py-24">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-sm uppercase tracking-[0.18em] text-cyan-700 dark:text-[#00d2ff]">
          &gt; {t("label")}
        </p>
      </Reveal>
      <Reveal delay={0.08} className="mx-auto mt-10 max-w-3xl">
        <Accordion
          type="single"
          defaultOpen={["0"]}
          maxPanelHeight={480}
          headingLevel={2}
          className="w-full"
          items={Array.from({ length: itemsCount }).map((_, i) => ({
            id: String(i),
            title: t(`items.${i}.q`),
            content: (
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t.rich(`items.${i}.a`, {
                  fowler: renderLink("https://martinfowler.com/microservices/"),
                  azure: renderLink("https://learn.microsoft.com/en-us/azure/well-architected/"),
                  springboot: renderLink("https://spring.io/projects/spring-boot"),
                  mcp: renderLink("https://modelcontextprotocol.io/"),
                  email: (chunks) => (
                    <a
                      href="mailto:esalas.facyt@gmail.com"
                      className="text-primary underline hover:opacity-80 transition-opacity"
                    >
                      {chunks}
                    </a>
                  ),
                  telegram: renderLink("https://t.me/EliezerSG"),
                  // enlace interno: lleva a la sección de contacto de la misma página
                  contact: (chunks) => (
                    <a
                      href="#contacto"
                      onClick={(e) => goToHash(e, "#contacto")}
                      className="text-primary underline hover:opacity-80 transition-opacity"
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </p>
            ),
          }))}
        />
      </Reveal>
    </section>
  );
}