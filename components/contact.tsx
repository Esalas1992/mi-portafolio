"use client";
import { useRef, useState } from "react";
import { PaperPlaneTiltIcon, EnvelopeSimpleIcon, TelegramLogoIcon, MapPinIcon } from "@phosphor-icons/react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/reveal";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const t = useTranslations("contact");
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [website, setWebsite] = useState(""); // honeypot
  const [token, setToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string; msg?: string; token?: string }>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const resetTurnstile = () => {
    setToken(null);
    turnstileRef.current?.reset();
  };

  const validate = () => {
    const e: typeof errors = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const msg = form.msg.trim();
    if (name.length < 2 || name.length > 80 || /[<>{}]/.test(name)) e.name = t("errName");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) e.email = t("errEmail");
    if (msg.length < 10 || msg.length > 500 || /[<>{}]/.test(msg)) e.msg = t("errMsgLong");
    if (!token) e.token = t("errToken");
    return e;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setServerError(null);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      // Sin token (expirado / no resuelto): forzar re-evaluación.
      if (!token) resetTurnstile();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.msg.trim(),
          website,
          turnstileToken: token,
        }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (res.ok && data?.ok) {
        setStatus("sent");
        return;
      }
      // Token de un solo uso: siempre resetear tras un intento (éxito o fallo).
      resetTurnstile();
      setStatus("error");
      if (res.status === 429) setServerError(t("errRateLimit"));
      else if (data?.error === "turnstile" || data?.error === "validation") setServerError(t("errTokenRetry"));
      else setServerError(t("errServer"));
    } catch {
      resetTurnstile();
      setStatus("error");
      setServerError(t("errServer"));
    }
  };

  const inputCls = (bad?: string) =>
    `rounded border bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-[#00d2ff] focus:outline-none dark:bg-[#0d0d12] dark:text-[#f3f4f6] dark:placeholder:text-[#6b7280] ${
      bad ? "border-red-500 dark:border-red-400" : "border-zinc-300 dark:border-[rgba(255,255,255,0.1)]"
    }`;

  return (
    <section id="contacto" className="scroll-mt-16 border-t border-zinc-200 dark:border-[rgba(255,255,255,0.08)]">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <Reveal className="text-center">
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-cyan-700 dark:text-[#00d2ff]">&gt; {t("label")}</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">{t("title")}</h2>
          <p className="mx-auto mt-3 max-w-[65ch] text-lg text-zinc-600 dark:text-[#9ca3af]">{t("sub")}</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          <Reveal>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <span className="rounded bg-zinc-100 p-2 text-cyan-700 dark:bg-[#1b1b1f] dark:text-[#00d2ff]">
                  <EnvelopeSimpleIcon size={18} weight="duotone" />
                </span>
                <span className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-zinc-500 dark:text-[#6b7280]">{t("emailLabel")}</span>
                  <a href="mailto:esalas.facyt@gmail.com" className="mt-1 text-sm font-medium hover:text-[#00d2ff]">
                    esalas.facyt@gmail.com
                  </a>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="rounded bg-zinc-100 p-2 text-cyan-700 dark:bg-[#1b1b1f] dark:text-[#00d2ff]">
                  <TelegramLogoIcon size={18} weight="duotone" />
                </span>
                <span className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-zinc-500 dark:text-[#6b7280]">{t("telegramLabel")}</span>
                  <a href="https://t.me/EliezerSG" target="_blank" rel="noreferrer" className="mt-1 text-sm font-medium hover:text-[#00d2ff]">
                    {t("telegramUser")}
                  </a>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="rounded bg-zinc-100 p-2 text-cyan-700 dark:bg-[#1b1b1f] dark:text-[#00d2ff]">
                  <MapPinIcon size={18} weight="duotone" />
                </span>
                <span className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-zinc-500 dark:text-[#6b7280]">{t("locationLabel")}</span>
                  <span className="mt-1 text-sm font-medium">{t("location")}</span>
                </span>
              </div>
              <p className="flex items-center gap-2 text-sm text-zinc-600 dark:text-[#9ca3af]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-[#10b981] opacity-60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]" />
                </span>
                {t("availability")}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="mailto:esalas.facyt@gmail.com" className="inline-flex items-center gap-2 py-2.5 text-sm font-semibold text-cyan-700 transition hover:text-[#00d2ff] dark:text-[#00d2ff]">
                  <EnvelopeSimpleIcon size={16} weight="bold" />
                  {t("emailBtn")}
                </a>
                <a href="https://t.me/EliezerSG" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded border border-zinc-300 px-5 py-2.5 text-sm font-medium transition hover:border-[#00d2ff] hover:text-[#00d2ff] active:scale-[0.98] dark:border-[rgba(255,255,255,0.12)] dark:text-[#f3f4f6]">
                  <TelegramLogoIcon size={16} />
                  {t("telegramBtn")}
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            {status === "sent" ? (
              <p role="status" className="rounded border border-[rgba(16,185,129,0.4)] bg-[rgba(16,185,129,0.07)] p-6 text-sm">
                {t("sent")}
              </p>
            ) : (
              <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    {t("name")}
                  </label>
                  <input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t("namePh")}
                    aria-invalid={errors.name ? "true" : undefined}
                    aria-describedby={errors.name ? "err-name" : undefined}
                    className={inputCls(errors.name)}
                  />
                  {errors.name && (
                    <p id="err-name" role="alert" className="text-xs text-red-600 dark:text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {t("email")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={t("emailPh")}
                    aria-invalid={errors.email ? "true" : undefined}
                    aria-describedby={errors.email ? "err-email" : undefined}
                    className={inputCls(errors.email)}
                  />
                  {errors.email && (
                    <p id="err-email" role="alert" className="text-xs text-red-600 dark:text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="msg" className="text-sm font-medium">
                    {t("msg")}
                  </label>
                  <textarea
                    id="msg"
                    rows={4}
                    maxLength={500}
                    value={form.msg}
                    onChange={(e) => setForm({ ...form, msg: e.target.value })}
                    placeholder={t("msgPh")}
                    aria-invalid={errors.msg ? "true" : undefined}
                    aria-describedby={errors.msg ? "err-msg" : undefined}
                    className={inputCls(errors.msg)}
                  />
                  {errors.msg && (
                    <p id="err-msg" role="alert" className="text-xs text-red-600 dark:text-red-400">
                      {errors.msg}
                    </p>
                  )}
                </div>
                {/* Honeypot: oculto por CSS, los humanos no lo ven ni lo llenan. */}
                <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden opacity-0" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    autoComplete="off"
                    tabIndex={-1}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
                {siteKey ? (
                  <div>
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={siteKey}
                      onSuccess={(tok) => {
                        setToken(tok);
                        setErrors((prev) => ({ ...prev, token: undefined }));
                      }}
                      onExpire={() => setToken(null)}
                      onError={() => setToken(null)}
                    />
                    {errors.token && (
                      <p role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {errors.token}
                      </p>
                    )}
                  </div>
                ) : null}
                {serverError && (
                  <p role="alert" className="rounded border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400">
                    {serverError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending" || !token}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded bg-[#00d2ff] px-5 py-2.5 text-sm font-semibold text-[#071014] transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "sending" ? t("sending") : t("send")} <PaperPlaneTiltIcon size={16} />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
