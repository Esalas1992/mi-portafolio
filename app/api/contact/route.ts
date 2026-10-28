import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { getContactRatelimit, getClientIp } from "@/lib/rate-limit";

// FROM fijo de prueba Resend. Solo entrega al propietario de la cuenta Resend.
const FROM = "Portfolio <onboarding@resend.dev>";

async function verifyTurnstile(
  token: string,
  ip: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("[contact] missing TURNSTILE_SECRET_KEY");
    return false;
  }
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      },
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[contact] turnstile verify failed", err);
    return false;
  }
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", issues: parsed.error.issues.map((i) => i.message) },
      { status: 400 },
    );
  }
  const { name, email, message, website, turnstileToken } = parsed.data;

  // Honeypot: responder éxito falso sin llamar a Turnstile/Resend ni gastar cuota.
  if (website && website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const ip = getClientIp(req.headers);

  // Rate limit: 3/hora por IP (fail-open si Upstash no está configurado).
  try {
    const limiter = getContactRatelimit();
    if (limiter) {
      const { success, reset } = await limiter.limit(`contact:${ip}`);
      if (!success) {
        const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
        return NextResponse.json(
          { ok: false, error: "rate_limited" },
          { status: 429, headers: { "Retry-After": String(retryAfter) } },
        );
      }
    }
  } catch (err) {
    // Si Upstash falla, no bloquear: se registra y continúa.
    console.error("[contact] ratelimit error (fail-open)", err);
  }

  // Verificación humana con Turnstile (token de un solo uso, ~2 min de vida).
  const human = await verifyTurnstile(turnstileToken, ip);
  if (!human) {
    return NextResponse.json({ ok: false, error: "turnstile" }, { status: 400 });
  }

  // TO fijo leído de env (server-only, nunca del body).
  const to = process.env.CONTACT_TO_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  if (!to || !apiKey) {
    console.error("[contact] missing CONTACT_TO_EMAIL or RESEND_API_KEY");
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to,
      replyTo: email,
      subject: `Contacto portfolio: ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\nIP: ${ip}\n\n${message}`,
    });
    if (error) {
      console.error("[contact] resend error", error);
      return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
