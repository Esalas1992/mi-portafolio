import type { ReactNode } from "react";

/** Legacy shim: language is now driven by the URL (/es, /en). Kept so old imports don't break. */
export function LanguageProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
