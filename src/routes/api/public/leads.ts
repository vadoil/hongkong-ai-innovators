import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const LeadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(120).optional().default(""),
  budget_range: z.string().trim().max(40).optional().default(""),
  message: z.string().trim().min(1).max(2000),
});

export const Route = createFileRoute("/api/public/leads")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }
        const parsed = LeadSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { error: "validation", issues: parsed.error.issues },
            { status: 400 },
          );
        }
        const lead = parsed.data;
        const record = {
          ...lead,
          ip:
            request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
            request.headers.get("x-real-ip") ||
            "",
          ua: request.headers.get("user-agent") || "",
          created_at: new Date().toISOString(),
        };

        // Try SQLite (VPS/Node). Fall back to JSONL append, then console.
        try {
          const { saveLead } = await import("../../../lib/leads.server");
          await saveLead(record);
        } catch (err) {
          console.error("[leads] persistence failed:", err);
        }

        return Response.json({ ok: true });
      },
    },
  },
});