import type { Metadata } from "next";
import type { Lang } from "@/lib/i18n";
import { xDefaultLang } from "@/lib/i18n";
import esMessages from "@/messages/es.json";
import enMessages from "@/messages/en.json";

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.startsWith("http")
      ? process.env.NEXT_PUBLIC_SITE_URL
      : `https://${process.env.NEXT_PUBLIC_SITE_URL}`;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://esalasdev.vercel.app";
}

export const SITE_URL = getBaseUrl();
export const SITE_NAME = "esalasdev.vercel.app";

const seoCopy: Record<
  Lang,
  { title: string; description: string; keywords: string[]; locale: string }
> = {
  en: {
    title: "Eliezer Salas | Senior Software Architect — Microservices & AI",
    description:
      "Senior software architect with +10 years building microservices, cloud and conversational AI for banking and SaaS. Open to remote work worldwide.",
    keywords: [
      "senior software architect",
      "software architect",
      "ai architect",
      "cloud architect",
      "microservices architect",
      "remote software architect",
      "Spring Boot",
      "banking SaaS",
    ],
    locale: "en_US",
  },
  es: {
    title: "Eliezer Salas | Arquitecto de Software Senior, Microservicios e IA",
    description:
      "Arquitecto de software senior con +10 años creando microservicios, cloud e IA conversacional para banca y SaaS. Disponible para trabajo remoto global.",
    keywords: [
      "arquitecto de software senior",
      "arquitecto de software",
      "arquitecto de software remoto",
      "microservicios",
      "IA conversacional",
      "arquitecto cloud",
      "Spring Boot",
      "banca SaaS",
    ],
    locale: "es_PE",
  },
};

export function getLangMetadata(lang: Lang): Metadata {
  const c = seoCopy[lang];
  const other: Lang = lang === "es" ? "en" : "es";
  return {
    title: c.title,
    description: c.description,
    keywords: c.keywords,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        es: "/es",
        en: "/en",
        "x-default": `/${xDefaultLang}`,
      },
    },
    openGraph: {
      title: c.title,
      description: c.description,
      url: `/${lang}`,
      siteName: SITE_NAME,
      locale: c.locale,
      alternateLocale: [seoCopy[other].locale],
      type: "website",
      // og:image is owned by the app/[lang]/opengraph-image.tsx file convention
    },
    twitter: {
      card: "summary_large_image",
      title: c.title,
      description: c.description,
      images: [`/${lang}/opengraph-image`],
    },
    robots: { index: true, follow: true },
  };
}

export function getPersonJsonLd(lang: Lang) {
  const isEs = lang === "es";
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Eliezer Salas",
    url: `${SITE_URL}/${lang}`,
    image: `${SITE_URL}/${lang}/opengraph-image`,
    jobTitle: "Senior Software Architect",
    description: isEs
      ? "Senior Software Architect con +10 años diseñando microservicios, datos en tiempo real e IA conversacional para banca y SaaS en 5 países. Disponible para oportunidades remotas globales."
      : "Senior Software Architect with +10 years designing microservices, realtime data and conversational AI for banking and SaaS across 5 countries. Open to global remote opportunities.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lima",
      addressCountry: "PE",
    },
    homeLocation: { "@type": "Place", name: "Lima, Peru" },
    workLocation: { "@type": "Place", name: "Remote / Worldwide" },
    areaServed: "Worldwide",
    knowsLanguage: ["es", "en"],
    knowsAbout: [
      "Java",
      "Spring Boot",
      "Microservices",
      "Event-Driven Architecture",
      "REST APIs",
      "Azure",
      "AWS",
      "PostgreSQL",
      "Realtime Data Pipelines",
      "Conversational AI",
      "MCP",
    ],
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad de Carabobo" },
    worksFor: { "@type": "Organization", name: "NTT Data" },
    email: "esalas.facyt@gmail.com",
    sameAs: [
      "https://github.com/Esalas1992",
      "https://linkedin.com/in/esalasfacyt",
      "https://t.me/EliezerSG",
    ],
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: "Eliezer Salas",
    url: `${SITE_URL}/`,
    inLanguage: ["es", "en"],
    publisher: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Eliezer Salas" },
  };
}

const faqMessages = { es: esMessages, en: enMessages };
const stripIcuTags = (s: string) => s.replace(/<\/?[a-z]+>/g, "");

export function getFaqJsonLd(lang: Lang) {
  const { faq } = faqMessages[lang];
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: stripIcuTags(item.a) },
    })),
  };
}
