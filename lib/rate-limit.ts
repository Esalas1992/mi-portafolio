import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let _limiter: Ratelimit | null | undefined;

// 3 intentos por hora por IP (ventana deslizante).
// Lazy: evita conectar durante el build y permite fail-open si faltan env vars.
export function getContactRatelimit(): Ratelimit | null {
  if (_limiter !== undefined) return _limiter;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    _limiter = null;
    return null;
  }
  _limiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(3, "1 h"),
    analytics: true,
    prefix: "contact",
  });
  return _limiter;
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}
