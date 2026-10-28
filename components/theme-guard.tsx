"use client";
import { useLayoutEffect } from "react";
import { useTheme } from "next-themes";

/**
 * Re-applies the `dark` class before first paint on every remount.
 *
 * Client-side navigation between /es and /en remounts <html> (React Host
 * Singletons wipe its attributes), and next-themes only re-applies the class
 * in a passive effect (after paint) -> visible flash. A layout effect runs
 * synchronously after DOM mutation but before paint, so the class is restored
 * with no flash, no full reload, and no scroll jump.
 */
export function ThemeRemountGuard() {
  const { resolvedTheme } = useTheme();

  useLayoutEffect(() => {
    let dark: boolean;
    if (resolvedTheme === "dark" || resolvedTheme === "light") {
      dark = resolvedTheme === "dark";
    } else {
      // Theme not resolved yet (first mount): seed exactly like next-themes does.
      const stored = localStorage.getItem("theme");
      dark = stored
        ? stored === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    root.style.colorScheme = dark ? "dark" : "light";
  }, [resolvedTheme]);

  return null;
}
