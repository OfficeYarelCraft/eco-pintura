import { quoteSchema, type Quote } from "@/lib/quote-schema";
import { site } from "@/lib/site";

const MAX_FILES = 6;
const MAX_FILE_BYTES = 8 * 1024 * 1024;
const MAX_TOTAL_BYTES = 30 * 1024 * 1024; // Resend allows 40 MB per email; keep headroom.

const TYPE_LABEL: Record<Quote["type"], string> = {
  piso: "Piso",
  comunidad: "Comunidad",
  fachada: "Fachada",
  comercio: "Comercio",
  obra: "Obra grande",
};

/**
 * Quote requests from the contact form (multipart/form-data).
 * Delivered by email through Resend when RESEND_API_KEY is set:
 *   RESEND_API_KEY     — required to send
 *   QUOTE_FROM_EMAIL   — verified sender, e.g. "Eco Pintura <web@ecopintura.es>"
 *   QUOTE_TO_EMAIL     — inbox, defaults to hola@ecopintura.es
 * Without a key (local dev) the request is validated and logged only.
 */
export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse({
    name: form.get("name") ?? "",
    phone: form.get("phone") ?? "",
    type: form.get("type") ?? "",
    area: form.get("area") ?? "",
    size: form.get("size") ?? "",
    message: form.get("message") ?? "",
    company: form.get("company") ?? "",
  });

  if (!parsed.success) {
    // Honeypot hits get a quiet 200 so bots learn nothing.
    if ((form.get("company") ?? "") !== "") return Response.json({ ok: true });
    return Response.json(
      { ok: false, errors: parsed.error.issues.map((i) => i.path.join(".")) },
      { status: 422 },
    );
  }

  const photos = form
    .getAll("photos")
    .filter((f): f is File => f instanceof File && f.size > 0)
    .slice(0, MAX_FILES);
  const total = photos.reduce((a, f) => a + f.size, 0);
  if (
    total > MAX_TOTAL_BYTES ||
    photos.some((f) => f.size > MAX_FILE_BYTES || !f.type.startsWith("image/"))
  ) {
    return Response.json({ ok: false, error: "photos" }, { status: 413 });
  }

  const data = parsed.data;
  const locale = String(form.get("locale") ?? "es");

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info("[quote] RESEND_API_KEY not set — logged only", {
      type: data.type,
      area: data.area,
      photos: photos.length,
      locale,
    });
    return Response.json({ ok: true });
  }

  try {
    const attachments = await Promise.all(
      photos.map(async (f) => ({
        filename: f.name || "foto.jpg",
        content: Buffer.from(await f.arrayBuffer()).toString("base64"),
      })),
    );
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.QUOTE_FROM_EMAIL ?? `Eco Pintura <${site.email}>`,
        to: [process.env.QUOTE_TO_EMAIL ?? site.email],
        subject: `Presupuesto · ${TYPE_LABEL[data.type]} · ${data.name}`,
        text: emailText(data, locale, photos.length),
        html: emailHtml(data, locale, photos.length),
        attachments,
      }),
    });
    if (!res.ok) throw new Error(`resend ${res.status}`);
  } catch (err) {
    console.error("[quote] delivery failed", err);
    return Response.json({ ok: false, error: "delivery" }, { status: 502 });
  }

  return Response.json({ ok: true });
}

function rows(d: Quote, locale: string, photos: number): [string, string][] {
  return [
    ["Nombre", d.name],
    ["Teléfono", d.phone],
    ["Qué hay que pintar", TYPE_LABEL[d.type]],
    ["Barrio o municipio", d.area || "—"],
    ["Metros aproximados", d.size || "—"],
    ["Mensaje", d.message || "—"],
    ["Fotos", photos ? `${photos} adjunta(s)` : "—"],
    ["Idioma de la web", locale.toUpperCase()],
  ];
}

function emailText(d: Quote, locale: string, photos: number) {
  return `Nueva solicitud de presupuesto desde la web\n\n${rows(
    d,
    locale,
    photos,
  )
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n")}\n`;
}

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );

function emailHtml(d: Quote, locale: string, photos: number) {
  const tr = rows(d, locale, photos)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#5a5a54;font:13px/1.4 Arial,sans-serif;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:8px 0;color:#151513;font:15px/1.5 Arial,sans-serif;white-space:pre-wrap">${esc(v)}</td></tr>`,
    )
    .join("");
  return `<div style="background:#eeeee8;padding:24px"><div style="background:#fff;padding:24px;max-width:560px"><p style="margin:0 0 4px;font:700 12px Arial,sans-serif;letter-spacing:.04em;color:#ee5524">ECO PINTURA</p><h1 style="margin:0 0 16px;font:700 22px/1.2 Arial,sans-serif;color:#151513">Nueva solicitud de presupuesto</h1><table style="border-collapse:collapse">${tr}</table><p style="margin:20px 0 0"><a href="tel:${esc(d.phone.replace(/[^+\d]/g, ""))}" style="background:#ee5524;color:#151513;padding:12px 18px;font:700 14px Arial,sans-serif;text-decoration:none;display:inline-block">Llamar a ${esc(d.name)}</a></p></div></div>`;
}
