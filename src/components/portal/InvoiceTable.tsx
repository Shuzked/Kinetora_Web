import React from "react";
import { 
  Download, 
  FileText, 
  ExternalLink,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const MOCK_INVOICES = [
  { id: "INV-2024-001", date: "2024-03-01", amount: "299.00€", status: "PAID", pdf: "factura_marzo.pdf" },
  { id: "INV-2024-002", date: "2024-02-01", amount: "299.00€", status: "PAID", pdf: "factura_febrero.pdf" },
  { id: "INV-2024-003", date: "2024-01-01", amount: "299.00€", status: "PAID", pdf: "factura_enero.pdf" },
];

const InvoiceTable = () => {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden">
      <Table>
        <TableHeader className="bg-white/[0.02]">
          <TableRow className="hover:bg-transparent border-white/5">
            <TableHead className="text-[10px] font-black uppercase tracking-widest text-white/40 h-12">Nº Factura</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest text-white/40 h-12">Fecha</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest text-white/40 h-12">Importe</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest text-white/40 h-12">Estado</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest text-white/40 h-12 text-right">PDF</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {MOCK_INVOICES.map((invoice) => (
            <TableRow key={invoice.id} className="hover:bg-white/[0.03] border-white/5 transition-colors group">
              <TableCell className="font-bold text-white/90 text-sm">
                {invoice.id}
              </TableCell>
              <TableCell className="text-white/40 text-xs font-bold uppercase tracking-widest">
                {new Date(invoice.date).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-white/80 font-black text-sm">
                {invoice.amount}
              </TableCell>
              <TableCell>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-none text-[9px] font-black uppercase px-2 py-0.5">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> PAGADA
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="h-8 gap-2 text-[10px] font-black uppercase tracking-widest text-[#B454FF] hover:bg-[#B454FF]/10">
                  <Download className="w-3 h-3" /> Descargar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvoiceTable;
