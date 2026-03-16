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
  const textDark = rgb(0.12, 0.12, 0.12);
  const textMid = rgb(0.35, 0.35, 0.35);
  const brand = rgb(0.706, 0.329, 1.0); // #B454FF

  // Márgenes y helpers
  const M = 56;
  const rightX = pageW - M;
  const drawRight = (text: string, x: number, y: number, size = 11, bold = false, color = textMid) => {
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

  const draw = (text: string, x: number, y: number, size = 11, bold = false, color = textMid) => {
    page.drawText(text, {
      x,
      y,
      size,
      font: bold ? fontBold : fontRegular,
      color,
    });
  };

  const line = (x: number, y: number, w: number, h = 1, color = rgb(0.9, 0.9, 0.9)) => {
    page.drawRectangle({ x, y, width: w, height: h, color });
  };

  // Cabecera simple
  draw("KINETORA", M, pageH - 80, 20, true, textDark);
  drawRight("FACTURA", rightX, pageH - 78, 14, true, textDark);
  drawRight(`Nº: ${invoice.id}`, rightX, pageH - 98, 11, false, textMid);
  drawRight(`Fecha: ${invoice.date}`, rightX, pageH - 114, 11, false, textMid);
  line(M, pageH - 126, rightX - M);

  // Bloque Cliente (superior izquierda)
  const customerY = pageH - 160;
  draw("Cliente", M, customerY, 12, true, textDark);
  draw(invoice.customer.name, M, customerY - 18, 11, false, textMid);
  if (invoice.customer.email) draw(invoice.customer.email, M, customerY - 34, 11, false, textMid);
  if (invoice.customer.address) draw(invoice.customer.address, M, customerY - 50, 11, false, textMid);
  if (invoice.customer.cityCountry) draw(invoice.customer.cityCountry, M, customerY - 66, 11, false, textMid);

  // Tabla Concepto / Periodo / Importe (cuerpo)
  const headerY = pageH - 230;
  draw("Detalle", M, headerY, 12, true, textDark);

  // Cabecera de columnas
  const colConceptX = M;
  const colPeriodX = M + 300;
  const colAmountRightX = rightX;

  const tableHeaderY = headerY - 24;
  draw("Concepto", colConceptX, tableHeaderY, 11, true, textDark);
  draw("Periodo", colPeriodX, tableHeaderY, 11, true, textDark);
  drawRight("Importe", colAmountRightX, tableHeaderY, 11, true, textDark);
  line(M, tableHeaderY - 8, rightX - M);

  // Fila única (simple y claro)
  const rowY = tableHeaderY - 22;
  const period = invoice.period || invoice.date;
  draw(invoice.plan, colConceptX, rowY, 11, false, textMid);
  draw(period, colPeriodX, rowY, 11, false, textMid);
  drawRight(invoice.amount, colAmountRightX, rowY, 11, true, textDark);
  line(M, rowY - 10, rightX - M);

  // Total destacado (alineado a la derecha)
  const totalY = rowY - 40;
  draw("TOTAL", colAmountRightX - 140, totalY, 11, true, textDark);
  drawRight(invoice.amount, colAmountRightX, totalY, 16, true, brand);

  // Pie de página
  const footY = 54;
  draw(
    "Gracias por tu confianza. Si tienes dudas sobre tu factura, escríbenos a hello@kinetora.com.",
    M,
    footY,
    10,
    false,
    textMid
  );

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  downloadBlob(blob, `${invoice.id}.pdf`);
}