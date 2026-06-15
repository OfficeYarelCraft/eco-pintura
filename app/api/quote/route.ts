import { z } from "zod";

const quoteSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  projectType: z.enum(["interior", "exterior", "commercial", "other"]),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const data = quoteSchema.parse(body);

    // INTEGRATION POINT: Connect email service (Resend, SendGrid, etc.)
    // await sendQuoteEmail(data);

    console.info("[quote] New submission:", data);

    return Response.json({ success: true, message: "Quote received" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ success: false, errors: error.flatten() }, { status: 400 });
    }
    return Response.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
