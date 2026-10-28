"use client";
import { useEffect, useRef, ReactNode } from "react";

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let io: IntersectionObserver | null = null;
    import("gsap").then(({ gsap }) => {
      gsap.set(el, { opacity: 0, y: 24 });
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              gsap.to(el, { opacity: 1, y: 0, duration: 0.7, delay, ease: "expo.out" });
              io?.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );
      io.observe(el);
    });
    return () => io?.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
