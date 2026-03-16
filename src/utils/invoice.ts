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

const DEFAULT_TEMPLATE_URL = "/assets/invoices/invoice-template.pdf";

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
 * Rellena la plantilla PDF con los datos de la factura y fuerza la descarga.
 * Ajusta posiciones para encajar en la mayoría de plantillas tipo factura.
 */
export async function generateInvoicePdf(
  invoice: InvoiceData,
  templateUrl: string = DEFAULT_TEMPLATE_URL
) {
  // Cargar plantilla
  const templateBytes = await fetch(templateUrl).then(r => r.arrayBuffer());
  const pdfDoc = await PDFDocument.load(templateBytes);
  const page = pdfDoc.getPages()[0];
  const { width: pageW, height: pageH } = page.getSize();

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

  // Campo: Nº de factura y fecha (zona superior derecha)
  drawRight("FACTURA", rightX, pageH - 130, 14, true, textDark);
  drawRight(`Nº: ${invoice.id}`, rightX, pageH - 150, 11, false, textMid);
  drawRight(`Fecha: ${invoice.date}`, rightX, pageH - 168, 11, false, textMid);

  // Bloque Cliente (superior izquierda)
  const customerY = pageH - 190;
  draw("Cliente", M, customerY, 12, true, textDark);
  draw(invoice.customer.name, M, customerY - 18, 11, false, textMid);
  if (invoice.customer.email) draw(invoice.customer.email, M, customerY - 34, 11, false, textMid);
  if (invoice.customer.address) draw(invoice.customer.address, M, customerY - 50, 11, false, textMid);
  if (invoice.customer.cityCountry) draw(invoice.customer.cityCountry, M, customerY - 66, 11, false, textMid);

  // Tabla Concepto / Periodo / Importe (cuerpo)
  const headerY = pageH - 260;
  draw("Detalle", M, headerY, 12, true, textDark);

  // Cabecera de columnas
  const colConceptX = M;
  const colPeriodX = M + 320;
  const colAmountRightX = rightX;

  const tableHeaderY = headerY - 24;
  draw("Concepto", colConceptX, tableHeaderY, 11, true, textDark);
  draw("Periodo", colPeriodX, tableHeaderY, 11, true, textDark);
  drawRight("Importe", colAmountRightX, tableHeaderY, 11, true, textDark);

  // Fila única (simple y claro)
  const rowY = tableHeaderY - 22;
  const period = invoice.period || invoice.date;
  draw(invoice.plan, colConceptX, rowY, 11, false, textMid);
  draw(period, colPeriodX, rowY, 11, false, textMid);
  drawRight(invoice.amount, colAmountRightX, rowY, 11, true, textDark);

  // Total destacado (alineado a la derecha)
  const totalBoxY = rowY - 36;
  draw("TOTAL", colAmountRightX - 140, totalBoxY, 11, true, textDark);
  drawRight(invoice.amount, colAmountRightX, totalBoxY, 14, true, brand);

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