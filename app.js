import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Configuración básica
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Resolución de la carpeta estática (Vite build)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "dist");

// Servir los archivos estáticos del frontend
app.use(express.static(distPath));

// Render del HTML del email
function renderHtml(payload) {
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

// Endpoint API: debe declararse antes del catch-all
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
      pass: process.env.EMAIL_PASSWORD, // NO exponer contraseña
    },
  });

  const subject = "Nuevo mensaje de contacto — kinetora.tech";
  const html = renderHtml({ name, email, company, budget, message });

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

// Health check opcional
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

// Catch-all SPA: después de las rutas de API
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Passenger/Hostinger: puerto dinámico
app.listen(process.env.PORT || 3000, () => {
  console.log(`[app] Server running on port ${process.env.PORT || 3000}`);
});