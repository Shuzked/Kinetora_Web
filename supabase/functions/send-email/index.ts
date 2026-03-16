import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type Payload =
  | { type: "contact"; name: string; email: string; company?: string; budget?: string; message: string }
  | { type: "newsletter"; email: string; consent?: boolean };

function htmlEscape(s: string) {
  return s.replace(/[&<>"']/g, (m) => ({ "&":"&","<":"<",">":">",'"':"&quot;","'":"&#39;" }[m] || m));
}

function renderHtml(payload: Payload) {
  if (payload.type === "contact") {
    const rows = [
      ["Name", payload.name],
      ["Email", payload.email],
      ["Company", payload.company || "-"],
      ["Budget", payload.budget || "-"],
      ["Message", payload.message],
    ];
    return `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#0d0d0d">
        <h2 style="margin:0 0 12px 0">New contact message</h2>
        <p style="margin:0 0 16px 0">A new message was sent from the website.</p>
        <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;border:1px solid #e5e7eb">
          ${rows.map(([k,v]) => `
            <tr>
              <td style="background:#f9fafb;border:1px solid #e5e7eb;font-weight:700">${htmlEscape(k)}</td>
              <td style="border:1px solid #e5e7eb">${htmlEscape(String(v))}</td>
            </tr>
          `).join("")}
        </table>
      </div>
    `;
  }
  // newsletter
  return `
    <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#0d0d0d">
      <h2 style="margin:0 0 12px 0">New newsletter subscription</h2>
      <p style="margin:0 0 12px 0">Email: <strong>${htmlEscape(payload.email)}</strong></p>
      <p style="margin:0">Consent: ${payload.consent ? "Yes" : "No / Unspecified"}</p>
    </div>
  `;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json() as Payload;
    console.log("[send-email] Received payload", { type: (body as any)?.type });

    if (!body || (body.type !== "contact" && body.type !== "newsletter")) {
      console.error("[send-email] Invalid payload type");
      return new Response(JSON.stringify({ error: "Invalid payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Basic field checks
    if (body.type === "contact") {
      const ok = !!body.name && !!body.email && !!body.message;
      if (!ok) {
        console.error("[send-email] Missing required fields for contact");
        return new Response(JSON.stringify({ error: "Missing fields" }), {
          status: 422,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    } else {
      if (!body.email) {
        console.error("[send-email] Missing email for newsletter");
        return new Response(JSON.stringify({ error: "Missing email" }), {
          status: 422,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const html = renderHtml(body);
    const subject =
      body.type === "contact"
        ? "New contact message — kinetora.tech"
        : "New newsletter subscription — kinetora.tech";

    // Try RESEND first (if configured)
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (RESEND_API_KEY) {
      const from = Deno.env.get("RESEND_FROM") || "onboarding@resend.dev";
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: ["hello@kinetora.tech"],
          subject,
          html,
        }),
      });
      if (!r.ok) {
        const errText = await r.text();
        console.error("[send-email] Resend error", { status: r.status, errText });
        return new Response(JSON.stringify({ error: "Email send failed" }), {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      console.log("[send-email] Email sent via Resend");
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fallback to Brevo (free plan) if configured
    const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
    if (BREVO_API_KEY) {
      const fromEmail = Deno.env.get("BREVO_FROM") || "hello@kinetora.tech";
      const fromName = Deno.env.get("BREVO_FROM_NAME") || "Kinetora Studio";
      const r = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": BREVO_API_KEY,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          sender: { email: fromEmail, name: fromName },
          to: [{ email: "hello@kinetora.tech", name: "Kinetora Studio" }],
          subject,
          htmlContent: html,
        }),
      });
      if (!r.ok) {
        const errText = await r.text();
        console.error("[send-email] Brevo error", { status: r.status, errText });
        return new Response(JSON.stringify({ error: "Email send failed" }), {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      console.log("[send-email] Email sent via Brevo");
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.error("[send-email] No provider configured (set RESEND_API_KEY or BREVO_API_KEY)");
    return new Response(JSON.stringify({ error: "Server not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("[send-email] Unhandled error", { e: String(e) });
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});