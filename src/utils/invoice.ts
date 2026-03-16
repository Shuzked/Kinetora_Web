import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export type InvoiceData = {
  id: string;       // p.ej. INV-2025-01
  date: string;     // p.ej. 01 Ene 2025
  plan: string;     // concepto / motivo
  period?: string;  // si no se pasa, usa date
  amount: string;   // p.ej. 2.995€
  customer: {
    name: string;
    email?: string;
    address?: string;
    cityCountry?: string;
  };
};

// Descarga el PDF con un nombre amigable
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// Convierte un SVG a PNG (bytes) en el navegador para poder embeberlo en pdf-lib
async function svgToPngBytes(svgUrl: string, targetWidth = 120): Promise<Uint8Array> {
  const svgText = await fetch(svgUrl).then(r => r.text());
  const svgBlob = new Blob([svgText], { type: "image/svg+xml" });
  const svgUrlObj = URL.createObjectURL(svgBlob);
  try {
    const img = new Image();
    img.src = svgUrlObj;
    await new Promise<void>((res, rej) => {
      img.onload = () => res();
      img.onerror = () => rej(new Error("No se pudo cargar el SVG"));
    });
    const ratio = img.height ? img.width / img.height : 1;
    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = Math.max(1, Math.round(targetWidth / Math.max(ratio, 0.0001)));
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas no soportado");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const blob: Blob = await new Promise((resolve, reject) => {
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob falló"))), "image/png");
    });
    const arrayBuf = await blob.arrayBuffer();
    return new Uint8Array(arrayBuf);
  } finally {
    URL.revokeObjectURL(svgUrlObj);
  }
}

/**
 * Genera una factura simple e intuitiva (sin plantilla) y fuerza la descarga.
 */
export async function generateInvoicePdf(
  invoice: InvoiceData
) {
  // Crear PDF A4 en blanco
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 pts
  const pageW = 595.28;
  const pageH = 841.89;

  // Fuentes
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Paleta
  // Fondo negro (void black), textos claros, acento púrpura
  const pageBg = rgb(0.05, 0.05, 0.05); // ~#0D0D0D
  const textLight = rgb(1, 1, 1);
  const textDim = rgb(0.85, 0.85, 0.88);
  const brand = rgb(0.706, 0.329, 1.0); // #B454FF

  // Márgenes y helpers
  const M = 56;
  const rightX = pageW - M;
  const drawRight = (text: string, x: number, y: number, size = 11, bold = false, color = textLight) => {
    const f = bold ? fontBold : fontRegular;
    const w = f.widthOfTextAtSize(text, size);
    page.drawText(text, {
      x: x - w,
      y,
      size,
      font: f,
      color,
    });
  };

  const draw = (text: string, x: number, y: number, size = 11, bold = false, color = textLight) => {
    page.drawText(text, {
      x,
      y,
      size,
      font: bold ? fontBold : fontRegular,
      color,
    });
  };

  const line = (x: number, y: number, w: number, h = 1, color = rgb(0.22, 0.22, 0.24)) => {
    page.drawRectangle({ x, y, width: w, height: h, color });
  };

  // Fondo de toda la página
  page.drawRectangle({ x: 0, y: 0, width: pageW, height: pageH, color: pageBg });

  // Cabecera simple
  // Logotipo (SVG -> PNG)
  try {
    const pngBytes = await svgToPngBytes("/Logotipo.svg", 120);
    const logoPng = await pdfDoc.embedPng(pngBytes);
    const logoW = 120;
    const scale = logoW / logoPng.width;
    const logoH = logoPng.height * scale;
    page.drawImage(logoPng, { x: M, y: pageH - 84 - logoH + 28, width: logoW, height: logoH });
  } catch {
    // Fallback: si el SVG no carga, mostramos el nombre
    draw("KINETORA", M, pageH - 80, 20, true, textLight);
  }
  drawRight("FACTURA", rightX, pageH - 78, 14, true, textLight);
  drawRight(`Nº: ${invoice.id}`, rightX, pageH - 98, 11, false, textDim);
  drawRight(`Fecha: ${invoice.date}`, rightX, pageH - 114, 11, false, textDim);
  line(M, pageH - 126, rightX - M);

  // Bloque Cliente (superior izquierda)
  const customerY = pageH - 160;
  draw("Cliente", M, customerY, 12, true, textLight);
  draw(invoice.customer.name, M, customerY - 18, 11, false, textDim);
  if (invoice.customer.email) draw(invoice.customer.email, M, customerY - 34, 11, false, textDim);
  if (invoice.customer.address) draw(invoice.customer.address, M, customerY - 50, 11, false, textDim);
  if (invoice.customer.cityCountry) draw(invoice.customer.cityCountry, M, customerY - 66, 11, false, textDim);

  // Tabla Concepto / Periodo / Importe (cuerpo)
  const headerY = pageH - 230;
  draw("Detalle", M, headerY, 12, true, textLight);

  // Cabecera de columnas
  const colConceptX = M;
  const colPeriodX = M + 300;
  const colAmountRightX = rightX;

  const tableHeaderY = headerY - 24;
  draw("Concepto", colConceptX, tableHeaderY, 11, true, textLight);
  draw("Periodo", colPeriodX, tableHeaderY, 11, true, textLight);
  drawRight("Importe", colAmountRightX, tableHeaderY, 11, true, textLight);
  line(M, tableHeaderY - 8, rightX - M);

  // Fila única (simple y claro)
  const rowY = tableHeaderY - 22;
  const period = invoice.period || invoice.date;
  draw(invoice.plan, colConceptX, rowY, 11, false, textDim);
  draw(period, colPeriodX, rowY, 11, false, textDim);
  drawRight(invoice.amount, colAmountRightX, rowY, 11, true, textLight);
  line(M, rowY - 10, rightX - M);

  // Total destacado (alineado a la derecha)
  const totalY = rowY - 40;
  draw("TOTAL", colAmountRightX - 140, totalY, 11, true, textLight);
  drawRight(invoice.amount, colAmountRightX, totalY, 16, true, brand);

  // Pie de página
  const footY = 54;
  draw(
    "Gracias por tu confianza. Si tienes dudas sobre tu factura, escríbenos a hello@kinetora.com.",
    M,
    footY,
    10,
    false,
    textDim
  );

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  downloadBlob(blob, `${invoice.id}.pdf`);
}