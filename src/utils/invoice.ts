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

// Datos del emisor (se usan en todas las facturas)
const ISSUER = {
  name: "Rafael Muñoz Valverde",
  cityCountry: "PRIEGO DE CÓRDOBA, CÓRDOBA, ESPAÑA",
  address: "HUERTO DE SAN FRANCISCO, 1, 14800",
  taxId: "ES-31026286E",
  email: "hello@kinetora.tech",
};

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
  const innerGap = 16;            // separación vertical estándar
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
    draw("Kinetora", M, pageH - 80, 20, true, textLight);
  }

  // Meta de factura (alineada a derecha)
  drawRight("Factura", rightX, pageH - 78, 14, true, textLight);
  drawRight(`Nº: ${invoice.id}`, rightX, pageH - 98, 11, false, textDim);
  drawRight(`Fecha: ${invoice.date}`, rightX, pageH - 114, 11, false, textDim);

  // Separador bajo cabecera
  line(M, pageH - 130, rightX - M);

  // Bloque Cliente (izquierda) y Emisor (derecha) en dos columnas
  const infoTopY = pageH - 130 - innerGap;
  // Columna izquierda: Cliente
  let yLeft = infoTopY;
  draw("Cliente", M, yLeft, 12, true, textLight);
  yLeft -= innerGap;
  draw(invoice.customer.name, M, yLeft, 11, false, textDim);
  if (invoice.customer.email) { yLeft -= innerGap; draw(invoice.customer.email, M, yLeft, 11, false, textDim); }
  if (invoice.customer.address) { yLeft -= innerGap; draw(invoice.customer.address, M, yLeft, 11, false, textDim); }
  if (invoice.customer.cityCountry) { yLeft -= innerGap; draw(invoice.customer.cityCountry, M, yLeft, 11, false, textDim); }
  // Columna derecha: Emisor
  let yRight = infoTopY;
  drawRight("Emisor", rightX, yRight, 12, true, textLight);
  yRight -= innerGap;
  drawRight(ISSUER.name, rightX, yRight, 11, false, textDim);
  yRight -= innerGap;
  drawRight(ISSUER.cityCountry, rightX, yRight, 11, false, textDim);
  yRight -= innerGap;
  drawRight(ISSUER.address, rightX, yRight, 11, false, textDim);
  yRight -= innerGap;
  drawRight(`NIF: ${ISSUER.taxId}`, rightX, yRight, 11, false, textDim);
  if (ISSUER.email) { yRight -= innerGap; drawRight(ISSUER.email, rightX, yRight, 11, false, textDim); }

  // Espacio antes del detalle: tomamos el menor Y de ambas columnas y añadimos margen
  let y = Math.min(yLeft, yRight) - innerGap * 1.5;

  // Panel contenedor del detalle (altura dinámica y columnas equilibradas)
  const panelX = M;
  const panelW = rightX - M;
  const panelTop = y;
  const P = 16; // padding interno del panel
  // Definir anchuras proporcionales de columnas
  const conceptW = Math.floor(panelW * 0.56) - P; // 56% aprox
  const periodW = Math.floor(panelW * 0.24) - P;  // 24% aprox
  // Amount usa el resto a la derecha
  const colConceptX = panelX + P;
  const colPeriodX = colConceptX + conceptW + P;
  const colAmountRightX = panelX + panelW - P;

  // Calcular posiciones internas sin dibujar aún
  const detailTitleY = panelTop - P;
  const headerRowY = detailTitleY - 20;
  const rowY = headerRowY - 22;
  const totalY = rowY - 28;
  let panelBottom = totalY - 28;
  // Respetar margen de pie y altura mínima del panel
  const minPanelBottom = panelTop - 120;
  if (panelBottom < minPanelBottom) panelBottom = minPanelBottom;
  const footSafeY = M + 64; // espacio de seguridad sobre el pie
  if (panelBottom < footSafeY) panelBottom = footSafeY;

  // Dibujar panel ahora que conocemos top/bottom
  page.drawRectangle({
    x: panelX,
    y: panelBottom,
    width: panelW,
    height: panelTop - panelBottom,
    color: panel,
    borderColor: stroke,
    borderWidth: 1
  });

  // Título detalle
  draw("Detalle", panelX + P, detailTitleY, 12, true, textLight);

  // Cabecera columnas
  draw("Concepto", colConceptX, headerRowY, 11, true, textLight);
  draw("Periodo", colPeriodX, headerRowY, 11, true, textLight);
  drawRight("Importe", colAmountRightX, headerRowY, 11, true, textLight);
  line(panelX + P, headerRowY - 8, panelW - P * 2);

  // Fila (con truncado para evitar desbordes y respetar márgenes)
  const conceptMaxW = conceptW;
  const periodMaxW = periodW;
  const concept = truncateToWidth(invoice.plan, conceptMaxW, fontRegular, 11);
  const period = truncateToWidth(invoice.period || invoice.date, periodMaxW, fontRegular, 11);

  draw(concept, colConceptX, rowY, 11, false, textDim);
  draw(period, colPeriodX, rowY, 11, false, textDim);
  drawRight(invoice.amount, colAmountRightX, rowY, 11, true, textLight);

  // Línea bajo fila
  line(panelX + P, rowY - 10, panelW - P * 2);

  // Total alineado a la derecha dentro del panel
  draw("Total", colAmountRightX - 140, totalY, 11, true, textLight);
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