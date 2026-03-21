import React from "react";
import { 
  CreditCard, 
  ShieldCheck, 
  Calendar, 
  ArrowRight,
  Info,
  Copy,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import InvoiceTable from "./InvoiceTable";
import { motion } from "framer-motion";

// Mock data integration
const USER_SUBSCRIPTION = {
  plan: "Business Pro",
  price: "299,00€",
  startDate: "2024-03-22", // Simulado
  iban: "ESXX 0000 0000 0000 0000 0000",
  clientName: "John Doe / Kinetora Client"
};

const BillingView = () => {
    // Calcular fecha de renovación (31 días después)
    const renewalDate = new Date(USER_SUBSCRIPTION.startDate);
    renewalDate.setDate(renewalDate.getDate() + 31);

  return (
    <div className="space-y-12 pb-20">
      <header>
        <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Facturación y Pago</h2>
        <p className="text-white/40 text-sm font-bold uppercase tracking-widest mt-1">
            Gestiona tu plan, consulta facturas y configura tus pagos
        </p>
      </header>

      {/* Subscription Overview */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <Card className="bg-white/[0.02] border-white/5 rounded-[2.5rem] p-8 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8">
                <ShieldCheck className="w-12 h-12 text-[#B454FF]/20" />
            </div>
            <div className="space-y-6">
                <Badge className="bg-[#B454FF]/10 text-[#B454FF] border border-[#B454FF]/20 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                    Plan Activo
                </Badge>
                <div>
                    <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">{USER_SUBSCRIPTION.plan}</h3>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-2">Suscripción Mensual</p>
                </div>
                <div className="flex items-center gap-4 pt-4">
                    <div className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest">
                        <Calendar className="w-4 h-4 text-[#B454FF]" />
                        Renovación: {renewalDate.toLocaleDateString()}
                    </div>
                    <div className="h-4 w-px bg-white/10" />
                    <div className="text-[#B454FF] text-xs font-black uppercase tracking-widest">
                        {USER_SUBSCRIPTION.price} / mes
                    </div>
                </div>
            </div>
        </Card>

        {/* Payment Instructions Highlight Box */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative p-[2px] rounded-[2.5rem] bg-gradient-to-br from-[#B454FF] via-[#8A2BE2] to-transparent shadow-[0_0_30px_rgba(180,84,255,0.2)]"
        >
            <div className="bg-[#0D0D0D] rounded-[2.5rem] p-8 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Info className="w-5 h-5 text-[#B454FF]" />
                    </div>
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Instrucciones de Pago</h4>
                </div>

                <div className="space-y-4 flex-1">
                    <p className="text-white/70 text-sm leading-relaxed">
                        Para renovar tu suscripción de <span className="text-[#B454FF] font-black">{USER_SUBSCRIPTION.price}</span>, realiza una transferencia bancaria a:
                    </p>
                    
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-3">
                        <div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-white/20 block mb-1">IBAN de Destino</span>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-white font-mono">{USER_SUBSCRIPTION.iban}</span>
                                <Button size="icon" variant="ghost" className="h-6 w-6 text-white/20 hover:text-[#B454FF]">
                                    <Copy className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                        <div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-white/20 block mb-1">Concepto Obligatorio</span>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#B454FF] uppercase tracking-widest">{USER_SUBSCRIPTION.clientName}</span>
                                <Button size="icon" variant="ghost" className="h-6 w-6 text-white/20 hover:text-[#B454FF]">
                                    <Copy className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Actualización manual tras recibir el pago</span>
                </div>
            </div>
        </motion.div>
      </section>

      {/* Invoice History */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 flex items-center gap-3">
                <FileText className="w-4 h-4" /> Historial de Facturas
            </h3>
            <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white">
                Ver todo <ArrowRight className="w-3 h-3 ml-2" />
            </Button>
        </div>
        <InvoiceTable />
      </section>
    </div>
  );
};

export default BillingView;
