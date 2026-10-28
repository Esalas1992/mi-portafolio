import { z } from "zod";

// Caracteres peligrosos para inyección HTML/JS en campos de texto libre.
const NO_CODE = /^[^<>{}]*$/;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "name_too_short")
    .max(80, "name_too_long")
    .regex(NO_CODE, "name_invalid_chars"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(254, "email_too_long")
    .email("email_invalid"),
  message: z
    .string()
    .trim()
    .min(10, "message_too_short")
    .max(500, "message_too_long")
    .regex(NO_CODE, "message_invalid_chars"),
  // Honeypot: debe llegar vacío. Se valida aparte para devolver 200 falso.
  website: z.string().max(200).optional().default(""),
  turnstileToken: z.string().min(1, "token_required"),
});

export type ContactInput = z.infer<typeof contactSchema>;
