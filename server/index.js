import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Resolve dist path for static serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "..", "dist");

// Static assets and SPA index
app.use(express.static(distPath));

function renderHtml(payload) {
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
        <p style="margin:0 0 16px 0">A new message was sent from kinetora.tech.</p>
        <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;border:1px solid #e5e7eb">
          ${rows
            .map(
              ([k, v]) => `
            <tr>
              <td style="background:#f9fafb;border:1px solid #e5e7eb;font-weight:700">${String(k)}</td>
              <td style="border:1px solid #e5e7eb">${String(v)}</td>
            </tr>`
            )
            .join("")}
        </table>
      </div>
    `;
  }
  // newsletter
  return `
    <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#0d0d0d">
      <h2 style="margin:0 0 12px 0">New newsletter subscription</h2>
      <p style="margin:0 0 12px 0"><strong>${payload.email}</strong></p>
      <p style="margin:0">Consent: ${payload.consent ? "Yes" : "No / Unspecified"}</p>
    </div>
  `;
}

// Generic transporter (kept for /api/send-email compatibility)
function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP credentials missing. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true para 465, false para 587/25
    auth: { user, pass },
  });
}

// Hostinger SMTP: contacto
app.post("/api/contacto", async (req, res) => {
  const { name, email, company, budget, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(422).json({ error: "Missing required fields" });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: "hello@kinetora.tech",
      pass: process.env.EMAIL_PASSWORD, // no exponer contraseña
    },
  });

  const subject = "Nuevo mensaje de contacto — kinetora.tech";
  const html = renderHtml({ type: "contact", name, email, company, budget, message });

  try {
    const info = await transporter.sendMail({
      from: "hello@kinetora.tech",
      to: "hello@kinetora.tech",
      replyTo: email,
      subject,
      html,
    });
    return res.status(200).json({ ok: true, id: info.messageId });
  } catch (e) {
    console.error("[/api/contacto] Error:", e?.message || e);
    return res.status(500).json({ error: "Email send failed" });
  }
});

// Compat: newsletter/contact genérico
app.post("/api/send-email", async (req, res) => {
  const body = req.body || {};
  if (body.type !== "contact" && body.type !== "newsletter") {
    return res.status(400).json({ error: "Invalid payload type" });
  }

  if (body.type === "contact") {
    const ok = body.name && body.email && body.message;
    if (!ok) {
      return res.status(422).json({ error: "Missing required fields" });
    }
  } else if (!body.email) {
    return res.status(422).json({ error: "Missing email" });
  }

  try {
    const transporter = createTransporter();
    const html = renderHtml(body);
    const subject =
      body.type === "contact"
        ? "New contact message — kinetora.tech"
        : "New newsletter subscription — kinetora.tech";

    const from = process.env.SMTP_FROM || "no-reply@kinetora.tech";
    const to = "hello@kinetora.tech";

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });

    return res.status(200).json({ ok: true, id: info.messageId });
  } catch (e) {
    console.error("[/api/send-email] Error:", e?.message || e);
    return res.status(500).json({ error: "Email send failed" });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

// SPA fallback: enviar index.html para rutas no-API
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`[server] App listening on port ${PORT}`);
});