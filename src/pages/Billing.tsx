"use client";

import React from "react";
import PortalLayout from "@/components/dashboard/PortalLayout";
import PremiumButton from "@/components/PremiumButton";
import { Check, CreditCard, Download } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { jsPDF } from "jspdf";

const Billing = () => {
  const generateInvoicePdf = (inv: { id: string; date: string; plan: string; amount: string }) => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const M = 56; // margen principal
    const rightX = pageW - M;
    const brand = { r: 180, g: 84, b: 255 }; // #B454FF
    const gray = (v: number) => ({ r: v, g: v, b: v });
    const drawRight = (text: string, x: number, y: number) => doc.text(text, x, y, { align: "right" as const });

    // CABECERA KINETORA
    doc.setFillColor(13, 13, 13);
    doc.rect(0, 0, pageW, 120, "F");
    // glow sutil morado
    doc.setFillColor(brand.r, brand.g, brand.b);
    doc.setGState(new (doc as any).GState({ opacity: 0.12 }));
    doc.circle(pageW - 120, 40, 90, "F");
    doc.setGState(new (doc as any).GState({ opacity: 1 }));
    // marca
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("KINETORA", M, 54);
    doc.setFontSize(11);
    doc.setTextColor(230, 230, 230);
    doc.text("hello@kinetora.com  •  kinetora.com", M, 74);
    // meta factura (derecha)
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    drawRight("FACTURA", rightX, 50);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(230, 230, 230);
    drawRight(`Nº: ${inv.id}`, rightX, 68);
    drawRight(`Fecha: ${inv.date}`, rightX, 84);

    // INFO CLIENTE / EMPRESA (dos columnas)
    let y = 150;
    doc.setFontSize(12);
    doc.setTextColor(30, 30, 30);
    doc.setFont("helvetica", "bold");
    doc.text("Emisor", M, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(70, 70, 70);
    doc.text("Kinetora Studio", M, y + 18);
    doc.text("CIF: B-00000000", M, y + 34);
    doc.text("España", M, y + 50);

    const col2X = M + 300;
    doc.setTextColor(30, 30, 30);
    doc.setFont("helvetica", "bold");
    doc.text("Cliente", col2X, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(70, 70, 70);
    doc.text("Juan Díaz", col2X, y + 18);
    doc.text("cliente@empresa.com", col2X, y + 34);
    doc.text("Madrid, España", col2X, y + 50);

    // SEPARADOR
    y += 86;
    doc.setDrawColor(230, 230, 230);
    doc.line(M, y, rightX, y);

    // TABLA DETALLE
    y += 24;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(12);
    doc.text("Detalle", M, y);
    y += 12;

    const tableY = y + 16;
    const tableW = pageW - 2 * M;
    const rowH = 28;
    const colConceptX = M;
    const colPeriodX = M + 360;
    const colAmountX = rightX;
    // header fondo claro y bordes
    doc.setFillColor(248, 248, 248);
    doc.setDrawColor(230, 230, 230);
    doc.rect(M, tableY, tableW, rowH, "FD");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(50, 50, 50);
    doc.text("Concepto", colConceptX + 10, tableY + 18);
    doc.text("Periodo", colPeriodX + 10, tableY + 18);
    drawRight("Importe", colAmountX - 10, tableY + 18);

    // fila única (el plan)
    const row1Y = tableY + rowH;
    doc.setDrawColor(235, 235, 235);
    doc.rect(M, row1Y, tableW, rowH, "S");
    doc.setFont("helvetica", "normal");
    doc.setTextColor(70, 70, 70);
    doc.text(inv.plan, colConceptX + 10, row1Y + 18);
    doc.text(inv.date, colPeriodX + 10, row1Y + 18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    drawRight(inv.amount, colAmountX - 10, row1Y + 18);

    // TOTAL BOX (alineado a la derecha, con acento)
    const totalBoxY = row1Y + rowH + 28;
    const totalBoxW = 260;
    const totalBoxX = rightX - totalBoxW;
    doc.setDrawColor(brand.r, brand.g, brand.b);
    doc.roundedRect(totalBoxX, totalBoxY, totalBoxW, 70, 10, 10, "S");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 30, 30);
    doc.text("TOTAL", totalBoxX + 16, totalBoxY + 28);
    doc.setTextColor(brand.r, brand.g, brand.b);
    doc.text(inv.amount, totalBoxX + 16, totalBoxY + 50);
    // línea guía visual a la izquierda
    doc.setDrawColor(235, 235, 235);
    doc.line(M, totalBoxY - 16, rightX, totalBoxY - 16);

    // NOTA / FOOTER
    const footY = pageH - 84;
    doc.setDrawColor(235, 235, 235);
    doc.line(M, footY, rightX, footY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const t1 = "Gracias por confiar en Kinetora. Esta factura ha sido generada automáticamente para tu archivo.";
    const t2 = "Si tienes dudas sobre el contenido o el importe, contáctanos en hello@kinetora.com.";
    doc.setTextColor(gray(110).r, gray(110).g, gray(110).b);
    doc.text(t1, M, footY + 22);
    doc.text(t2, M, footY + 38);

    doc.save(`${inv.id}.pdf`);
  };

  return (
    <PortalLayout>
      <div>
        <h1 className="text-3xl font-black text-[#F5F5F5] tracking-tight">Facturación</h1>
        <p className="text-[#F5F5F5]/55 mt-1">Gestiona tu suscripción y facturas</p>

        {/* Plan */}
        <div className="mt-8 rounded-2xl bg-[#111111] border border-white/10 overflow-hidden">
          <div className="p-6 sm:p-8 relative">
            <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#B454FF]/12 blur-[70px]" />
            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-2xl bg-[#B454FF]/15 border border-[#B454FF]/25 flex items-center justify-center text-[#B454FF]">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[#F5F5F5] font-black text-lg">Plan Full-Stack Creativo</div>
                    <div className="text-[#F5F5F5]/55 text-sm">Suscripción Mensual</div>
                  </div>
                </div>

                <div className="mt-5 flex items-end gap-2">
                  <div className="text-4xl font-black text-[#F5F5F5]">2.995€</div>
                  <div className="text-[#F5F5F5]/55 mb-1">/mes</div>
                </div>

                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-[#F5F5F5]/75">
                  {["Revisiones ilimitadas", "Entregas en 48h", "Todos los servicios"].map((f) => (
                    <div key={f} className="inline-flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-400" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <PremiumButton variant="glass" size="md" className="rounded-xl text-[#F5F5F5]">
                  Cambiar Plan
                </PremiumButton>
                <button
                  type="button"
                  className="text-red-300/80 hover:text-red-200 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded"
                >
                  Cancelar Suscripción
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Método de Pago */}
        <div className="mt-8 rounded-2xl bg-[#111111] border border-white/10 p-6 sm:p-8">
          <h2 className="text-xl font-black text-[#F5F5F5] tracking-tight">Método de Pago</h2>

          <div className="mt-5 rounded-2xl bg-[#0D0D0D] border border-white/10 p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="h-11 w-11 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center text-blue-300">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[#F5F5F5] font-semibold truncate">•••• •••• •••• 4242</div>
                <div className="text-[#F5F5F5]/55 text-sm">Expira 12/26</div>
              </div>
            </div>

            <button
              type="button"
              className="shrink-0 text-[#B454FF] font-semibold hover:text-[#C07CFF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded"
            >
              Actualizar
            </button>
          </div>
        </div>

        {/* Historial de facturas */}
        <div className="mt-8 rounded-2xl bg-[#111111] border border-white/10 overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-black text-[#F5F5F5] tracking-tight">Historial de Facturas</h2>
          </div>

          <div className="overflow-x-hidden">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow className="hover:bg-transparent border-white/10">
                  <TableHead className="text-[#F5F5F5]/55 font-semibold">Factura</TableHead>
                  <TableHead className="text-[#F5F5F5]/55 font-semibold">Fecha</TableHead>
                  <TableHead className="text-[#F5F5F5]/55 font-semibold hidden md:table-cell">Plan</TableHead>
                  <TableHead className="text-[#F5F5F5]/55 font-semibold">Monto</TableHead>
                  <TableHead className="text-[#F5F5F5]/55 font-semibold hidden sm:table-cell">Estado</TableHead>
                  <TableHead className="text-right text-[#F5F5F5]/55 font-semibold">
                    <span className="sr-only">Descargar</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { id: "INV-2025-01", date: "01 Ene 2025", plan: "Full-Stack Creativo", amount: "2.995€" },
                  { id: "INV-2024-12", date: "01 Dic 2024", plan: "Full-Stack Creativo", amount: "2.995€" },
                  { id: "INV-2024-11", date: "01 Nov 2024", plan: "Full-Stack Creativo", amount: "2.995€" },
                  { id: "INV-2024-10", date: "01 Oct 2024", plan: "Diseño Esencial", amount: "1.995€" },
                ].map((inv) => (
                  <TableRow key={inv.id} className="border-white/10 hover:bg-white/[0.03]">
                    <TableCell className="text-[#F5F5F5] font-semibold">{inv.id}</TableCell>
                    <TableCell className="text-[#F5F5F5]/70">{inv.date}</TableCell>
                    <TableCell className="text-[#F5F5F5]/70 hidden md:table-cell">{inv.plan}</TableCell>
                    <TableCell className="text-[#F5F5F5] font-semibold">{inv.amount}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <span className="inline-flex items-center h-7 px-3 rounded-full border text-xs font-semibold bg-green-500/15 text-green-300 border-green-500/20">
                        Pagado
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        type="button"
                        aria-label="Descargar"
                        onClick={() => generateInvoicePdf(inv)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.03] border border-white/10 text-[#B454FF] hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Próxima facturación */}
        <div className="mt-8 rounded-2xl bg-[#111111] border border-white/10 p-6 sm:p-8 flex items-end justify-between gap-6">
          <div>
            <div className="text-[#F5F5F5]/55">Próxima Facturación</div>
            <div className="text-[#F5F5F5] font-black text-2xl mt-1">01 Feb 2025</div>
          </div>
          <div className="text-right">
            <div className="text-[#F5F5F5]/55">Monto</div>
            <div className="text-[#F5F5F5] font-black text-2xl mt-1">2.995€</div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default Billing;