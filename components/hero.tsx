"use client";
import { ArrowRightIcon, ArrowUpRightIcon, DatabaseIcon, CodeIcon, GitBranchIcon, CloudIcon, RobotIcon, GithubLogoIcon, LinkedinLogoIcon, EnvelopeSimpleIcon, MouseMiddleClickIcon } from "@phosphor-icons/react";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { goToHash } from "@/lib/scroll";
import { gsap, useGSAP } from "@/lib/gsap";
import { MagneticEffect } from "@/components/magnetic-effect";

function Chip({ className = "", delay = "0s", rotate = "0deg", children }: { className?: string; delay?: string; rotate?: string; children: React.ReactNode }) {
  return (
    <div className={`hud-chip-item absolute ${className}`}>
      <div className="hud-chip-anim">
        <div className="float-soft" style={{ animationDelay: delay }}>
          <div
            className="flex items-center gap-1.5 rounded border border-[rgba(255,255,255,0.08)] bg-[#121218]/95 px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-[#9ca3af] shadow-lg shadow-black/40 backdrop-blur-sm sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[11px] [&_svg]:h-[18px] [&_svg]:w-[18px] sm:[&_svg]:h-6 sm:[&_svg]:w-6"
            style={{ transform: `rotate(${rotate})` }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Nodos del tracker en coordenadas del viewBox (400x400) → se posicionan en % */
const stages = [
  { n: "01", label: "SPECIFY", x: 272, y: 96 },
  { n: "02", label: "PLAN", x: 272, y: 304 },
  { n: "03", label: "TASK", x: 128, y: 304 },
  { n: "04", label: "IMPLEMENT", x: 128, y: 96 },
];

/* Un nodo se "lockea" 1.9 s y cede el turno al siguiente (ciclo de 7.6 s) */
const LOCK_STEP = 1.9;

/* Marcas de radar. Se redondean porque Math.sin puede diferir 1 ulp entre
   el render del server y el del cliente, y eso rompe la hidratación. */
const round3 = (n: number) => Math.round(n * 1000) / 1000;
const PANEL_TICKS = Array.from({ length: 48 }, (_, i) => {
  const a = (i * Math.PI * 2) / 48;
  const major = i % 12 === 0;
  return {
    major,
    x1: round3(200 + Math.cos(a) * 170),
    y1: round3(200 + Math.sin(a) * 170),
    x2: round3(200 + Math.cos(a) * (major ? 181 : 175)),
    y2: round3(200 + Math.sin(a) * (major ? 181 : 175)),
  };
});

function StageNode({ stage, index }: { stage: (typeof stages)[number]; index: number }) {
  return (
    <div
      className="hud-node absolute flex flex-col items-center gap-1 bg-zinc-100 px-3 py-1.5 dark:bg-[#071014]"
      style={
        {
          left: `${stage.x / 4}%`,
          top: `${stage.y / 4}%`,
          "--lock-delay": `${index * LOCK_STEP}s`,
        } as React.CSSProperties
      }
    >
      <span className="hud-corner left-0 top-0 border-l border-t" />
      <span className="hud-corner right-0 top-0 border-r border-t" />
      <span className="hud-corner bottom-0 left-0 border-b border-l" />
      <span className="hud-corner bottom-0 right-0 border-b border-r" />
      <span className="hud-tag font-mono text-[10px] tracking-[0.2em] text-zinc-600 dark:text-[#9ca3af]">
        <span className="text-[#00d2ff]">{stage.n}</span> {stage.label}
      </span>
      <span className="hud-meta font-mono text-[8px] tracking-[0.14em] text-[#00d2ff]">
        x:{stage.x} y:{stage.y}
      </span>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="hud-panel relative mx-auto aspect-square w-full max-w-[520px]" aria-hidden="true">
      {/* MEJORA 4: Resplandor ambiental suave centrado en el HUD */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(0,210,255,0.16)_0%,transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(0,210,255,0.22)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      {/* MEJORA 1 - CAPA 1: Fondo SVG, radar y esquinas del panel */}
      <div className="hud-layer-bg absolute inset-0 h-full w-full will-change-transform">
        <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-[rgba(14,116,144,0.45)] dark:border-[rgba(0,210,255,0.35)]" />
        <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-[rgba(14,116,144,0.45)] dark:border-[rgba(0,210,255,0.35)]" />
        <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-[rgba(14,116,144,0.45)] dark:border-[rgba(0,210,255,0.35)]" />
        <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-[rgba(14,116,144,0.45)] dark:border-[rgba(0,210,255,0.35)]" />

        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
          <line x1="200" y1="10" x2="200" y2="390" strokeWidth="1" className="hud-l1" />
          <line x1="10" y1="200" x2="390" y2="200" strokeWidth="1" className="hud-l1" />

          {/* marcas de radar */}
          {PANEL_TICKS.map((t, i) => (
            <line
              key={`tick-${i}`}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              strokeWidth={t.major ? 1.2 : 0.8}
              className={t.major ? "hud-l2" : "hud-l1"}
            />
          ))}

          <circle cx="200" cy="200" r="170" fill="none" strokeWidth="1" className="hud-l2" />
          <circle cx="200" cy="200" r="70" fill="none" strokeWidth="1.5" className="hud-l3" />

          {/* circuito: pasa exactamente por los 4 stages (todos a r=126.5) */}
          <circle cx="200" cy="200" r="126.5" fill="none" strokeWidth="1" className="hud-l2 hud-loop" />

          <line x1="200" y1="200" x2="200" y2="130" strokeWidth="1" className="hud-l3" />
          <line x1="200" y1="200" x2="320" y2="200" strokeWidth="1" className="hud-l3" />
          <line x1="200" y1="200" x2="200" y2="270" strokeWidth="1" className="hud-l3" />
          <line x1="200" y1="200" x2="130" y2="200" strokeWidth="1" className="hud-l3" />
          <circle cx="200" cy="130" r="4" fill="#00d2ff" className="pulse-dot" />
          <circle cx="320" cy="200" r="4" fill="#10b981" className="pulse-dot" />
          <circle cx="200" cy="270" r="4" fill="#00d2ff" className="pulse-dot" />
          <circle cx="130" cy="200" r="4" fill="#38bdf8" className="pulse-dot" />
          <circle cx="285" cy="115" r="2.5" fill="#00d2ff" opacity="0.45" />
          <circle cx="115" cy="285" r="2.5" fill="#00d2ff" opacity="0.45" />
          <circle cx="200" cy="200" r="3" fill="#00d2ff" />

          {/* scanline */}
          <line x1="16" y1="0" x2="384" y2="0" stroke="#00d2ff" strokeWidth="1" className="hud-scan" />
        </svg>
      </div>

      {/* MEJORA 1 - CAPA 2: Nodos de etapas intermedios */}
      <div className="hud-layer-nodes pointer-events-none absolute inset-0 will-change-transform">
        {stages.map((s, i) => (
          <StageNode key={s.n} stage={s} index={i} />
        ))}
      </div>

      {/* MEJORA 1 - CAPA 3: Chips flotantes al frente con parallax opuesto */}
      <div className="hud-layer-chips pointer-events-none absolute inset-0 will-change-transform">
        <Chip className="hidden lg:block left-0 top-4 sm:left-2 sm:top-6" delay="0s" rotate="-1deg">
          <DatabaseIcon size={24} weight="duotone" className="text-[#00d2ff]" /> DB SYNC
        </Chip>
        <Chip className="hidden lg:block right-0 top-12 sm:right-2 sm:top-16" delay="-1.2s" rotate="1deg">
          <CodeIcon size={24} weight="duotone" className="text-[#00d2ff]" /> API 200
        </Chip>
        <Chip className="left-1/2 top-0 -translate-x-1/2" delay="-2.4s" rotate="0.3deg">
          <RobotIcon size={24} weight="duotone" className="text-[#00d2ff]" /> AI AGENTS
        </Chip>
        <Chip className="hidden lg:block bottom-12 left-2 sm:bottom-16 sm:left-4" delay="-3.1s" rotate="1deg">
          <GitBranchIcon size={24} weight="duotone" className="text-[#10b981]" /> MAIN
        </Chip>
        <Chip className="hidden lg:block bottom-4 right-2 sm:bottom-6 sm:right-4" delay="-4s" rotate="-1deg">
          <CloudIcon size={24} weight="duotone" className="text-[#38bdf8]" /> DEPLOY
        </Chip>
      </div>
    </div>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const root = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ─────────────────────────────────────────────────────────────
        // MEJORA 2: Secuencia de entrada coreografiada (GSAP Timeline)
        // ─────────────────────────────────────────────────────────────
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".hero-status", { autoAlpha: 0, y: -12, duration: 0.5 })
          .from(".hero-eyebrow", { autoAlpha: 0, x: -25, duration: 0.6 }, "-=0.25")
          .from(".hero-title-line", { yPercent: 120, duration: 0.85, stagger: 0.12, ease: "power4.out" }, "-=0.35")
          .from(".hero-accent-bar", { scaleX: 0, transformOrigin: "left center", duration: 0.65, ease: "power2.out" }, "-=0.4")
          .from(".hero-desc", { autoAlpha: 0, y: 18, duration: 0.6 }, "-=0.35")
          .from(".hero-cta-group", { autoAlpha: 0, y: 15, duration: 0.5 }, "-=0.3")
          .from(".hero-socials", { autoAlpha: 0, y: 15, duration: 0.5 }, "-=0.3")
          // Boot sequence del HUD
          .from(".hud-panel", { autoAlpha: 0, scale: 0.92, duration: 0.85, ease: "power2.out" }, "-=0.85")
          .from(".hud-layer-bg", { autoAlpha: 0, scale: 0.88, transformOrigin: "center center", duration: 0.8, ease: "back.out(1.3)" }, "-=0.7")
          .from(".hud-node", { autoAlpha: 0, y: 12, stagger: 0.08, ease: "power2.out" }, "-=0.5")
          .from(".hud-chip-anim", { autoAlpha: 0, scale: 0, stagger: 0.08, ease: "back.out(1.7)" }, "-=0.45");

        // Ocultar el indicador de scroll suavemente al hacer scroll
        gsap.to(".hero-scroll-indicator", {
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "25% top",
            scrub: true,
          },
          opacity: 0,
          ease: "none",
        });

        // ─────────────────────────────────────────────────────────────
        // MEJORA 3: Parallax de salida hacia las tarjetas (ScrollTrigger)
        // ─────────────────────────────────────────────────────────────
        gsap.to(".hero-main-content", {
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
          yPercent: 14,
          opacity: 0.2,
          scale: 0.97,
          ease: "none",
        });

        // ─────────────────────────────────────────────────────────────
        // MEJORA 1 & 4: Parallax 3D interactivo con el mouse + Spotlight
        // ─────────────────────────────────────────────────────────────
        const xToBg = gsap.quickTo(".hud-layer-bg", "x", { duration: 0.8, ease: "power3.out" });
        const yToBg = gsap.quickTo(".hud-layer-bg", "y", { duration: 0.8, ease: "power3.out" });

        const xToNodes = gsap.quickTo(".hud-layer-nodes", "x", { duration: 0.65, ease: "power3.out" });
        const yToNodes = gsap.quickTo(".hud-layer-nodes", "y", { duration: 0.65, ease: "power3.out" });

        const xToChips = gsap.quickTo(".hud-layer-chips", "x", { duration: 0.5, ease: "power2.out" });
        const yToChips = gsap.quickTo(".hud-layer-chips", "y", { duration: 0.5, ease: "power2.out" });

        const xToSpotlight = spotlightRef.current
          ? gsap.quickTo(spotlightRef.current, "x", { duration: 0.7, ease: "power2.out" })
          : null;
        const yToSpotlight = spotlightRef.current
          ? gsap.quickTo(spotlightRef.current, "y", { duration: 0.7, ease: "power2.out" })
          : null;

        const onMouseMove = (e: MouseEvent) => {
          const heroEl = root.current;
          if (!heroEl) return;
          const rect = heroEl.getBoundingClientRect();

          // Normalizado de -1 a 1 respecto al Hero
          const xNorm = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          const yNorm = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

          // Capa trasera (radar SVG): movimiento sutil
          xToBg(xNorm * 10);
          yToBg(yNorm * 10);

          // Capa media (nodos de stages): movimiento medio
          xToNodes(xNorm * 20);
          yToNodes(yNorm * 20);

          // Capa frontal (chips): movimiento reactivo opuesto para profundidad 3D
          xToChips(-xNorm * 28);
          yToChips(-yNorm * 28);

          // Spotlight reactivo a las coordenadas locales del puntero
          if (xToSpotlight && yToSpotlight) {
            xToSpotlight(e.clientX - rect.left);
            yToSpotlight(e.clientY - rect.top);
          }
        };

        const onMouseLeave = () => {
          xToBg(0);
          yToBg(0);
          xToNodes(0);
          yToNodes(0);
          xToChips(0);
          yToChips(0);
        };

        window.addEventListener("mousemove", onMouseMove);
        root.current?.addEventListener("mouseleave", onMouseLeave);

        return () => {
          window.removeEventListener("mousemove", onMouseMove);
          root.current?.removeEventListener("mouseleave", onMouseLeave);
        };
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="top"
      className="hero-viewport relative mx-auto flex max-w-7xl flex-col justify-center scroll-mt-20 overflow-hidden px-4 pb-20 pt-10"
    >
      {/* MEJORA 4: Spotlight reactivo que sigue suavemente el cursor */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute left-0 top-0 will-change-transform"
        style={{ transform: "translate(-999px, -999px)" }}
        aria-hidden="true"
      >
        <div className="h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,210,255,0.13)_0%,transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(0,210,255,0.2)_0%,transparent_70%)]" />
      </div>

      <div className="hero-main-content grid grid-cols-1 items-center gap-10 md:grid-cols-2 will-change-transform">
        <div className="flex flex-col justify-center">
          {/* Status: dot verde pulsante + texto (sin pill) */}
          <div className="hero-status mb-6 sm:mb-8 inline-flex items-center gap-2 font-mono text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="tracking-wide">{t("available")}</span>
          </div>

          <p className="hero-eyebrow font-mono text-base uppercase tracking-[0.18em] text-cyan-700 sm:text-lg md:text-xl dark:text-[#00d2ff]">
            {t("eyebrow")}
          </p>

          {/* MEJORA 2: Texto con máscara editorial (overflow-hidden) */}
          <h1 className="mt-4 text-4xl font-bold leading-[44px] tracking-[-0.03em] sm:text-5xl md:text-[56px] md:leading-[64px] md:tracking-[-0.04em] lg:text-7xl">
            <span className="block overflow-hidden py-0.5">
              <span className="hero-title-line inline-block will-change-transform">{t("nameA")}</span>
            </span>
            <span className="block overflow-hidden py-0.5">
              <span className="hero-title-line inline-block ml-8 sm:ml-12 will-change-transform">{t("nameB")}</span>
            </span>
            <span className="sr-only"> — Senior Software Architect</span>
          </h1>

          <div className="hero-accent-bar mt-4 h-1 w-24 rounded-sm bg-[#00d2ff] will-change-transform" aria-hidden="true" />

          <p className="hero-desc mt-5 max-w-[65ch] text-base leading-[26px] text-zinc-600 sm:text-lg md:text-xl dark:text-[#9ca3af]">
            {t("descA")}
            <span className="font-semibold text-cyan-700 dark:text-[#00d2ff]">{t("descEmph")}</span>
            {t("descB")}
          </p>

          <div className="hero-cta-group mt-8 flex flex-wrap gap-3">
            <MagneticEffect className="inline-flex" strength={0.25} max={15}>
              <a
                href="#experiencia"
                onClick={(e) => goToHash(e, "#experiencia")}
                className="inline-flex items-center gap-2 rounded bg-[#00d2ff] px-5 py-2.5 text-sm font-semibold text-[#071014] transition hover:brightness-110 active:scale-[0.98]"
              >
                <span className="opacity-70">&gt;</span> {t("cta1")} <ArrowRightIcon size={16} />
              </a>
            </MagneticEffect>
            <MagneticEffect className="inline-flex" strength={0.25} max={15}>
              <a
                href="#contacto"
                onClick={(e) => goToHash(e, "#contacto")}
                className="inline-flex items-center gap-2 rounded border border-zinc-300 px-5 py-2.5 text-sm font-medium transition hover:border-[#00d2ff] hover:text-[#00d2ff] active:scale-[0.98] dark:border-[rgba(255,255,255,0.12)] dark:text-[#f3f4f6]"
              >
                {t("cta2")} <ArrowUpRightIcon size={16} />
              </a>
            </MagneticEffect>
          </div>

          <div className="hero-socials mt-6 flex items-center gap-6" aria-label="Social">
            {[
              { href: "https://github.com/Esalas1992", label: "GitHub", Icon: GithubLogoIcon },
              { href: "https://linkedin.com/in/esalasfacyt", label: "LinkedIn", Icon: LinkedinLogoIcon },
              { href: "mailto:esalas.facyt@gmail.com", label: "Email", Icon: EnvelopeSimpleIcon },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="text-zinc-500 transition hover:text-[#00d2ff] dark:text-[#9ca3af]"
              >
                <Icon size={24} weight="duotone" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <HeroVisual />
        </div>
      </div>

      {/* Indicador de scroll centrado abajo (MouseMiddleClickIcon no clickable con movimiento vertical) */}
      <div
        className="hero-scroll-indicator pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 text-zinc-400 dark:text-zinc-500"
        aria-hidden="true"
      >
        <div className="mouse-float">
          <MouseMiddleClickIcon size={28} weight="duotone" />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-70">Scroll</span>
      </div>
    </section>
  );
}

