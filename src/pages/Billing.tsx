"use client";

import React, { useMemo } from "react";
import PortalLayout from "@/components/dashboard/PortalLayout";
import PremiumButton from "@/components/PremiumButton";
import { Check, CreditCard, Download } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { generateInvoicePdf } from "@/utils/invoice";
import { useI18n } from "@/i18n/I18nProvider";

const Billing = () => {
  const { lang } = useI18n();

  const copy =
    lang === "es"
      ? {
          title: "Facturación",
          sub: "Gestiona tu suscripción y facturas",
          planName: "Plan Full-Stack Creativo",
          planCycle: "Suscripción Mensual",
          perMonth: "/mes",
          features: ["Revisiones ilimitadas", "Entregas en 48h", "Todos los servicios"],
          changePlan: "Cambiar plan",
          cancel: "Cancelar suscripción",
          paymentMethod: "Método de pago",
          expires: "Expira 12/26",
          update: "Actualizar",
          invoiceHistory: "Historial de facturas",
          thInvoice: "Factura",
          thDate: "Fecha",
          thPlan: "Plan",
          thAmount: "Monto",
          thStatus: "Estado",
          paid: "Pagado",
          download: "Descargar",
          nextBilling: "Próxima facturación",
          amount: "Monto",
          nextDate: "01 Feb 2025",
        }
      : {
          title: "Billing",
          sub: "Manage your subscription and invoices",
          planName: "Creative Full‑Stack plan",
          planCycle: "Monthly subscription",
          perMonth: "/mo",
          features: ["Unlimited revisions", "48h delivery", "All services included"],
          changePlan: "Change plan",
          cancel: "Cancel subscription",
          paymentMethod: "Payment method",
          expires: "Expires 12/26",
          update: "Update",
          invoiceHistory: "Invoice history",
          thInvoice: "Invoice",
          thDate: "Date",
          thPlan: "Plan",
          thAmount: "Amount",
          thStatus: "Status",
          paid: "Paid",
          download: "Download",
          nextBilling: "Next billing",
          amount: "Amount",
          nextDate: "Feb 01, 2025",
        };

  // Datos de cliente (demo). En producción, tomar de Perfil/empresa del usuario.
  const customer = useMemo(
    () => ({ name: "Juan Díaz", email: "cliente@empresa.com", address: "Madrid", cityCountry: "España" }),
    []
  );

  const invoices = useMemo(
    () =>
      lang === "es"
        ? [
            { id: "INV-2025-01", date: "01 Ene 2025", plan: "Full-Stack Creativo", amount: "2.995€" },
            { id: "INV-2024-12", date: "01 Dic 2024", plan: "Full-Stack Creativo", amount: "2.995€" },
            { id: "INV-2024-11", date: "01 Nov 2024", plan: "Full-Stack Creativo", amount: "2.995€" },
            { id: "INV-2024-10", date: "01 Oct 2024", plan: "Diseño Esencial", amount: "1.995€" },
          ]
        : [
            { id: "INV-2025-01", date: "Jan 01, 2025", plan: "Creative Full‑Stack", amount: "€2,995" },
            { id: "INV-2024-12", date: "Dec 01, 2024", plan: "Creative Full‑Stack", amount: "€2,995" },
            { id: "INV-2024-11", date: "Nov 01, 2024", plan: "Creative Full‑Stack", amount: "€2,995" },
            { id: "INV-2024-10", date: "Oct 01, 2024", plan: "Essential design", amount: "€1,995" },
          ],
    [lang]
  );

  return (
    <PortalLayout>
      <div>
        <h1 className="text-3xl font-black text-[#F5F5F5] tracking-tight">{copy.title}</h1>
        <p className="text-[#F5F5F5]/55 mt-1">{copy.sub}</p>

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
                    <div className="text-[#F5F5F5] font-black text-lg">{copy.planName}</div>
                    <div className="text-[#F5F5F5]/55 text-sm">{copy.planCycle}</div>
                  </div>
                </div>

                <div className="mt-5 flex items-end gap-2">
                  <div className="text-4xl font-black text-[#F5F5F5]">2.995€</div>
                  <div className="text-[#F5F5F5]/55 mb-1">{copy.perMonth}</div>
                </div>

                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-[#F5F5F5]/75">
                  {copy.features.map((f) => (
                    <div key={f} className="inline-flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-400" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <PremiumButton variant="glass" size="md" className="rounded-xl text-[#F5F5F5]">
                  {copy.changePlan}
                </PremiumButton>
                <button
                  type="button"
                  className="text-red-300/80 hover:text-red-200 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded"
                >
                  {copy.cancel}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Método de Pago */}
        <div className="mt-8 rounded-2xl bg-[#111111] border border-white/10 p-6 sm:p-8">
          <h2 className="text-xl font-black text-[#F5F5F5] tracking-tight">{copy.paymentMethod}</h2>

          <div className="mt-5 rounded-2xl bg-[#0D0D0D] border border-white/10 p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="h-11 w-11 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center text-blue-300">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[#F5F5F5] font-semibold truncate">•••• •••• •••• 4242</div>
                <div className="text-[#F5F5F5]/55 text-sm">{copy.expires}</div>
              </div>
            </div>

            <button
              type="button"
              className="shrink-0 text-[#B454FF] font-semibold hover:text-[#C07CFF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded"
            >
              {copy.update}
            </button>
          </div>
        </div>

        {/* Historial de facturas */}
        <div className="mt-8 rounded-2xl bg-[#111111] border border-white/10 overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-black text-[#F5F5F5] tracking-tight">{copy.invoiceHistory}</h2>
          </div>

          <div className="overflow-x-hidden">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow className="hover:bg-transparent border-white/10">
                  <TableHead className="text-[#F5F5F5]/55 font-semibold">{copy.thInvoice}</TableHead>
                  <TableHead className="text-[#F5F5F5]/55 font-semibold">{copy.thDate}</TableHead>
                  <TableHead className="text-[#F5F5F5]/55 font-semibold hidden md:table-cell">{copy.thPlan}</TableHead>
                  <TableHead className="text-[#F5F5F5]/55 font-semibold">{copy.thAmount}</TableHead>
                  <TableHead className="text-[#F5F5F5]/55 font-semibold hidden sm:table-cell">{copy.thStatus}</TableHead>
                  <TableHead className="text-right text-[#F5F5F5]/55 font-semibold">
                    <span className="sr-only">{copy.download}</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((inv) => (
                  <TableRow key={inv.id} className="border-white/10 hover:bg-white/[0.03]">
                    <TableCell className="text-[#F5F5F5] font-semibold">{inv.id}</TableCell>
                    <TableCell className="text-[#F5F5F5]/70">{inv.date}</TableCell>
                    <TableCell className="text-[#F5F5F5]/70 hidden md:table-cell">{inv.plan}</TableCell>
                    <TableCell className="text-[#F5F5F5] font-semibold">{inv.amount}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <span className="inline-flex items-center h-7 px-3 rounded-full border text-xs font-semibold bg-green-500/15 text-green-300 border-green-500/20">
                        {copy.paid}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        type="button"
                        aria-label={copy.download}
                        onClick={() =>
                          generateInvoicePdf({
                            id: inv.id,
                            date: inv.date,
                            plan: inv.plan,
                            period: inv.date,
                            amount: inv.amount,
                            customer,
                          })
                        }
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
            <div className="text-[#F5F5F5]/55">{copy.nextBilling}</div>
            <div className="text-[#F5F5F5] font-black text-2xl mt-1">{copy.nextDate}</div>
          </div>
          <div className="text-right">
            <div className="text-[#F5F5F5]/55">{copy.amount}</div>
            <div className="text-[#F5F5F5] font-black text-2xl mt-1">2.995€</div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default Billing;
