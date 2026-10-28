"use client";

export function goToHash(e: React.MouseEvent, href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  e.preventDefault();
  const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: noMotion ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", window.location.pathname + window.location.search);
}
