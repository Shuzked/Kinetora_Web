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

// Helpers de texto
function measureWidth(text: string, font: any, size: number) {
  return font.widthOfTextAtSize(text, size);
}
function truncateToWidth(text: string, maxWidth: number, font: any, size: number) {
  if (measureWidth(text, font, size) <= maxWidth) return text;
  const ell = "…";
  const ellW = measureWidth(ell, font, size);
  let t = text;
  while (t.length && measureWidth(t, font, size) + ellW > maxWidth) {
    t = t.slice(0, -1);
  }
  return t + ell;
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

  // Paleta (void black + blanco + acento púrpura)
  const pageBg = rgb(0.05, 0.05, 0.05); // #0D0D0D aprox
  const textLight = rgb(1, 1, 1);
  const textDim = rgb(0.85, 0.85, 0.88);
  const brand = rgb(0.706, 0.329, 1.0); // #B454FF
  const stroke = rgb(0.22, 0.22, 0.24); // líneas sutiles
  const panel = rgb(0.08, 0.08, 0.09);  // panel contenedor del detalle

  // Márgenes y grid
  const M = 64;                   // margen exterior
  const innerGap = 14;            // separación vertical estándar
  const rightX = pageW - M;

  const drawRight = (text: string, x: number, y: number, size = 11, bold = false, color = textLight) => {
    const f = bold ? fontBold : fontRegular;
    const w = f.widthOfTextAtSize(text, size);
    page.drawText(text, { x: x - w, y, size, font: f, color });
  };

  const draw = (text: string, x: number, y: number, size = 11, bold = false, color = textLight) => {
    page.drawText(text, { x, y, size, font: bold ? fontBold : fontRegular, color });
  };

  const line = (x: number, y: number, w: number, h = 1) => {
    page.drawRectangle({ x, y, width: w, height: h, color: stroke });
  };

  // Fondo
  page.drawRectangle({ x: 0, y: 0, width: pageW, height: pageH, color: pageBg });

  // Cabecera con logo y meta
  const headerTopY = pageH - M + 8;
  // Logo
  let logoDrawn = false;
  try {
    const pngBytes = await svgToPngBytes("/Logotipo.svg", 120);
    const logoPng = await pdfDoc.embedPng(pngBytes);
    const logoW = 120;
    const scale = logoW / logoPng.width;
    const logoH = logoPng.height * scale;
    page.drawImage(logoPng, { x: M, y: headerTopY - logoH, width: logoW, height: logoH });
    logoDrawn = true;
  } catch {
    // Fallback: nombre si no hay logo
    draw("KINETORA", M, headerTopY - 16, 20, true, textLight);
  }

  // Meta de factura (alineada a derecha)
  const metaY1 = headerTopY - (logoDrawn ? 6 : 10);
  drawRight("FACTURA", rightX, metaY1, 14, true, textLight);
  drawRight(`Nº: ${invoice.id}`, rightX, metaY1 - 18, 11, false, textDim);
  drawRight(`Fecha: ${invoice.date}`, rightX, metaY1 - 34, 11, false, textDim);

  // Separador bajo cabecera
  line(M, metaY1 - 48, rightX - M);

  // Bloque Cliente
  let y = metaY1 - 48 - innerGap;
  draw("Cliente", M, y, 12, true, textLight);
  y -= innerGap;
  draw(invoice.customer.name, M, y, 11, false, textDim);
  if (invoice.customer.email) { y -= innerGap; draw(invoice.customer.email, M, y, 11, false, textDim); }
  if (invoice.customer.address) { y -= innerGap; draw(invoice.customer.address, M, y, 11, false, textDim); }
  if (invoice.customer.cityCountry) { y -= innerGap; draw(invoice.customer.cityCountry, M, y, 11, false, textDim); }

  // Espacio antes del detalle
  y -= innerGap * 1.5;

  // Panel contenedor del detalle (para aspecto premium y márgenes perfectos)
  const panelX = M;
  const panelW = rightX - M;
  const panelTop = y;
  const panelHeight = 150; // altura suficiente para 1-2 filas y total; ajustada para no solapar
  page.drawRectangle({
    x: panelX, y: panelTop - panelHeight,
    width: panelW, height: panelHeight,
    color: panel, borderColor: stroke, borderWidth: 1
  });

  // Título detalle
  const detailTitleY = panelTop - innerGap;
  draw("Detalle", panelX + 16, detailTitleY, 12, true, textLight);

  // Cabecera columnas
  const colConceptX = panelX + 16;
  const colPeriodX = panelX + Math.min(340, panelW * 0.55);
  const colAmountRightX = panelX + panelW - 16;

  const headerRowY = detailTitleY - innerGap - 2;
  draw("Concepto", colConceptX, headerRowY, 11, true, textLight);
  draw("Periodo", colPeriodX, headerRowY, 11, true, textLight);
  drawRight("Importe", colAmountRightX, headerRowY, 11, true, textLight);
  line(panelX + 12, headerRowY - 8, panelW - 24);

  // Fila (con truncado para evitar desbordes y respetar márgenes)
  const rowY = headerRowY - innerGap - 2;
  const conceptMaxW = (colPeriodX - 24) - colConceptX;
  const periodMaxW = (colAmountRightX - 24) - colPeriodX;
  const concept = truncateToWidth(invoice.plan, conceptMaxW, fontRegular, 11);
  const period = truncateToWidth(invoice.period || invoice.date, periodMaxW, fontRegular, 11);

  draw(concept, colConceptX, rowY, 11, false, textDim);
  draw(period, colPeriodX, rowY, 11, false, textDim);
  drawRight(invoice.amount, colAmountRightX, rowY, 11, true, textLight);

  // Línea bajo fila
  line(panelX + 12, rowY - 10, panelW - 24);

  // Total alineado a la derecha dentro del panel
  const totalY = rowY - innerGap - 2;
  draw("TOTAL", colAmountRightX - 140, totalY, 11, true, textLight);
  drawRight(invoice.amount, colAmountRightX, totalY, 16, true, brand);

  // Pie de página (siempre dentro de márgenes)
  const footY = M - 10;
  line(M, footY + 18, rightX - M);
  draw(
    "Gracias por tu confianza. Si tienes dudas sobre tu factura, escríbenos a hello@kinetora.com.",
    M, footY, 10, false, textDim
  );

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  downloadBlob(blob, `${invoice.id}.pdf`);
}