import { z } from "zod";

export const PROJECT_TYPES = [
  "piso",
  "comunidad",
  "fachada",
  "comercio",
  "obra",
] as const;

/** Shared by the form (client) and /api/quote (server). Messages are i18n keys. */
export const quoteSchema = z.object({
  name: z.string().trim().min(2, "name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[+()\d\s-]{9,20}$/, "phone"),
  type: z.enum(PROJECT_TYPES, { error: "type" }),
  area: z.string().trim().max(120).optional().default(""),
  size: z.string().trim().max(40).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
  /** Honeypot: must stay empty. */
  company: z.string().max(0).optional().default(""),
});

export type QuoteInput = z.input<typeof quoteSchema>;
export type Quote = z.output<typeof quoteSchema>;
