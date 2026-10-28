"use client";

import { useRef, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type MagneticEffectProps = {
  children: ReactNode;
  /** Fracción del desplazamiento del cursor que sigue el hijo (0 a 1). */
  strength?: number;
  /** Desplazamiento máximo en píxeles. */
  max?: number;
  className?: string;
};

/**
 * Envuelve cualquier hijo (botón, icono, tarjeta) y lo desplaza levemente
 * hacia el cursor. Al salir, vuelve a su posición con un ease elástico.
 */
export function MagneticEffect({ children, strength = 0.3, max = 15, className = "" }: MagneticEffectProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: wrapper });

  const onMouseMove = contextSafe((e: ReactMouseEvent<HTMLDivElement>) => {
    const box = wrapper.current;
    const el = inner.current;
    if (!box || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = box.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    const clamp = gsap.utils.clamp(-max, max);

    gsap.to(el, {
      x: clamp(relX * strength),
      y: clamp(relY * strength),
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    });
  });

  const onMouseLeave = contextSafe(() => {
    const el = inner.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.35)",
      overwrite: "auto",
    });
  });

  return (
    <div ref={wrapper} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className={className}>
      <div ref={inner} className="inline-block will-change-transform">
        {children}
      </div>
    </div>
  );
}
