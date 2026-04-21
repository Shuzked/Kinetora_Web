import { jsx, jsxs } from "react/jsx-runtime";
import { CheckCircle2, Download, ShieldCheck, Calendar, Info, Copy, FileText, ArrowRight } from "lucide-react";
import { d as cn, B as Button } from "./entry-server.CjgQBIYg.js";
import { C as Card } from "./card.C13ADgjf.js";
import { B as Badge } from "./badge.Cmkz0-c0.js";
import * as React from "react";
import { motion } from "framer-motion";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "stream";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "next-themes";
import "sonner";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "react-router-dom";
import "@radix-ui/react-slot";
import "@radix-ui/react-dialog";
import "@radix-ui/react-dropdown-menu";
import "lenis";
import "react-dom";
const Table = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
) }));
Table.displayName = "Table";
const TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tfoot",
  {
    ref,
    className: cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tr",
  {
    ref,
    className: cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "th",
  {
    ref,
    className: cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "td",
  {
    ref,
    className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";
const MOCK_INVOICES = [
  { id: "INV-2024-001", date: "2024-03-01", amount: "$299.00", status: "PAID", pdf: "factura_marzo.pdf" },
  { id: "INV-2024-002", date: "2024-02-01", amount: "$299.00", status: "PAID", pdf: "factura_febrero.pdf" },
  { id: "INV-2024-003", date: "2024-01-01", amount: "$299.00", status: "PAID", pdf: "factura_enero.pdf" }
];
const InvoiceTable = () => {
  return /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden", children: /* @__PURE__ */ jsxs(Table, { children: [
    /* @__PURE__ */ jsx(TableHeader, { className: "bg-white/[0.02]", children: /* @__PURE__ */ jsxs(TableRow, { className: "hover:bg-transparent border-white/5", children: [
      /* @__PURE__ */ jsx(TableHead, { className: "text-[10px] font-black uppercase tracking-widest text-white/40 h-12", children: "Nº Factura" }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-[10px] font-black uppercase tracking-widest text-white/40 h-12", children: "Fecha" }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-[10px] font-black uppercase tracking-widest text-white/40 h-12", children: "Importe" }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-[10px] font-black uppercase tracking-widest text-white/40 h-12", children: "Estado" }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-[10px] font-black uppercase tracking-widest text-white/40 h-12 text-right", children: "PDF" })
    ] }) }),
    /* @__PURE__ */ jsx(TableBody, { children: MOCK_INVOICES.map((invoice) => /* @__PURE__ */ jsxs(TableRow, { className: "hover:bg-white/[0.03] border-white/5 transition-colors group", children: [
      /* @__PURE__ */ jsx(TableCell, { className: "font-bold text-white/90 text-sm", children: invoice.id }),
      /* @__PURE__ */ jsx(TableCell, { className: "text-white/40 text-xs font-bold uppercase tracking-widest", children: new Date(invoice.date).toLocaleDateString() }),
      /* @__PURE__ */ jsx(TableCell, { className: "text-white/80 font-black text-sm", children: invoice.amount }),
      /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs(Badge, { className: "bg-emerald-500/10 text-emerald-400 border-none text-[9px] font-black uppercase px-2 py-0.5", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3 h-3 mr-1" }),
        " PAGADA"
      ] }) }),
      /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", className: "h-8 gap-2 text-[10px] font-black uppercase tracking-widest text-[#B454FF] hover:bg-[#B454FF]/10", children: [
        /* @__PURE__ */ jsx(Download, { className: "w-3 h-3" }),
        " Descargar"
      ] }) })
    ] }, invoice.id)) })
  ] }) });
};
const USER_SUBSCRIPTION = {
  plan: "Business Pro",
  price: "$299.00",
  startDate: "2024-03-22",
  // Simulado
  iban: "ESXX 0000 0000 0000 0000 0000",
  clientName: "John Doe / Kinetora Client"
};
const BillingView = () => {
  const renewalDate = new Date(USER_SUBSCRIPTION.startDate);
  renewalDate.setDate(renewalDate.getDate() + 31);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-12 pb-20", children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-black uppercase tracking-tighter text-white", children: "Facturación y Pago" }),
      /* @__PURE__ */ jsx("p", { className: "text-white/40 text-sm font-bold uppercase tracking-widest mt-1", children: "Gestiona tu plan, consulta facturas y configura tus pagos" })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 mt-10", children: [
      /* @__PURE__ */ jsxs(Card, { className: "bg-white/[0.02] border-white/5 rounded-[2.5rem] p-8 backdrop-blur-md relative overflow-hidden group", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-8", children: /* @__PURE__ */ jsx(ShieldCheck, { className: "w-12 h-12 text-[#B454FF]/20" }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx(Badge, { className: "bg-[#B454FF]/10 text-[#B454FF] border border-[#B454FF]/20 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full", children: "Plan Activo" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-4xl font-black text-white uppercase tracking-tighter leading-none", children: USER_SUBSCRIPTION.plan }),
            /* @__PURE__ */ jsx("p", { className: "text-white/40 text-xs font-bold uppercase tracking-widest mt-2", children: "Suscripción Mensual" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 pt-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-[#B454FF]" }),
              "Renovación: ",
              renewalDate.toLocaleDateString()
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-4 w-px bg-white/10" }),
            /* @__PURE__ */ jsxs("div", { className: "text-[#B454FF] text-xs font-black uppercase tracking-widest", children: [
              USER_SUBSCRIPTION.price,
              " / mes"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          className: "relative p-[2px] rounded-[2.5rem] bg-gradient-to-br from-[#B454FF] via-[#8A2BE2] to-transparent shadow-[0_0_30px_rgba(180,84,255,0.2)]",
          children: /* @__PURE__ */ jsxs("div", { className: "bg-[#0D0D0D] rounded-[2.5rem] p-8 h-full flex flex-col", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center", children: /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-[#B454FF]" }) }),
              /* @__PURE__ */ jsx("h4", { className: "text-xs font-black uppercase tracking-[0.2em] text-white", children: "Instrucciones de Pago" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4 flex-1", children: [
              /* @__PURE__ */ jsxs("p", { className: "text-white/70 text-sm leading-relaxed", children: [
                "Para renovar tu suscripción de ",
                /* @__PURE__ */ jsx("span", { className: "text-[#B454FF] font-black", children: USER_SUBSCRIPTION.price }),
                ", realiza una transferencia bancaria a:"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-2xl p-4 border border-white/5 space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black uppercase tracking-widest text-white/20 block mb-1", children: "IBAN de Destino" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-white font-mono", children: USER_SUBSCRIPTION.iban }),
                    /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", className: "h-6 w-6 text-white/20 hover:text-[#B454FF]", children: /* @__PURE__ */ jsx(Copy, { className: "w-3 h-3" }) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black uppercase tracking-widest text-white/20 block mb-1", children: "Concepto Obligatorio" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-[#B454FF] uppercase tracking-widest", children: USER_SUBSCRIPTION.clientName }),
                    /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", className: "h-6 w-6 text-white/20 hover:text-[#B454FF]", children: /* @__PURE__ */ jsx(Copy, { className: "w-3 h-3" }) })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 pt-4 border-t border-white/5 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-amber-400 animate-pulse" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-white/40 uppercase tracking-widest", children: "Actualización manual tras recibir el pago" })
            ] })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-xs font-black uppercase tracking-[0.3em] text-white/30 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4" }),
          " Historial de Facturas"
        ] }),
        /* @__PURE__ */ jsxs(Button, { variant: "ghost", className: "text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white", children: [
          "Ver todo ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3 ml-2" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(InvoiceTable, {})
    ] })
  ] });
};
export {
  BillingView as default
};
