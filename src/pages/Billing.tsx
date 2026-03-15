"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PremiumButton from '@/components/PremiumButton';
import { Check, Menu, X, Zap } from 'lucide-react';

const Billing = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex relative">
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "tween", duration: 0.22 }}
              className="fixed inset-y-0 left-0 w-[300px] max-w-[85vw] z-50 lg:hidden"
            >
              <DashboardSidebar />
              <button
                aria-label="Cerrar menú"
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#F5F5F5] hover:bg-white/10 hover:border-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 overflow-y-auto py-6 md:py-12 px-4 sm:px-6 lg:px-8">
        <header className="flex items-start sm:items-center gap-4 mb-12">
          <button
            aria-label="Abrir menú"
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#F5F5F5] hover:bg-white/10 hover:border-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-[#F5F5F5] tracking-tighter uppercase">Suscripción</h1>
            <p className="text-[#F5F5F5]/60 font-semibold text-[10px] md:text-xs uppercase tracking-widest mt-1">Gestiona tu plan y facturación</p>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Plan */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#111111] border border-[#B454FF]/30 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden">
              <div aria-hidden className="pointer-events-none absolute -top-24 -right-28 h-72 w-72 rounded-full bg-[#B454FF]/10 blur-[70px]" />

              <div className="absolute top-0 right-0 p-6">
                <div className="bg-[#B454FF] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Activo</div>
              </div>

              <div className="relative">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-[#B454FF]/10 rounded-2xl flex items-center justify-center border border-[#B454FF]/20">
                    <Zap className="w-8 h-8 text-[#B454FF]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-[#F5F5F5] uppercase tracking-tight">Full-Stack Creativo</h2>
                    <p className="text-[#F5F5F5]/60 font-semibold text-[10px] uppercase tracking-widest">Próximo cobro: 12 Nov 2024</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-10">
                  {[
                    "Dos diseños a la vez",
                    "Revisiones ilimitadas",
                    "Entregas en 48h",
                    "Soporte prioritario 24/7"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-[#F5F5F5] text-sm font-medium">
                      <Check className="w-4 h-4 text-[#B454FF]" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <PremiumButton variant="primary" size="md" className="w-full sm:w-auto">MEJORAR PLAN</PremiumButton>
                  <PremiumButton variant="glass" size="md" className="w-full sm:w-auto text-[#F5F5F5]">PAUSAR SUSCRIPCIÓN</PremiumButton>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-[#111111] border border-white/10 rounded-[2.5rem] p-8 md:p-10">
              <h3 className="text-lg font-black text-[#F5F5F5] uppercase tracking-tight mb-6">Método de Pago</h3>
              <div className="flex items-center justify-between gap-4 p-5 sm:p-6 bg-[#0D0D0D] border border-white/10 rounded-2xl">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-8 bg-white/10 border border-white/10 rounded flex items-center justify-center text-[8px] font-black text-[#F5F5F5]">VISA</div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-[#F5F5F5] truncate">•••• •••• •••• 4242</div>
                    <div className="text-[10px] text-[#F5F5F5]/60 font-bold uppercase tracking-widest">Expira 12/26</div>
                  </div>
                </div>
                <button
                  type="button"
                  className="shrink-0 inline-flex h-10 items-center justify-center px-4 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-bold text-[#F5F5F5]/80 uppercase tracking-widest hover:bg-white/[0.06] hover:text-[#F5F5F5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                >
                  Editar
                </button>
              </div>
            </div>
          </div>

          {/* Invoices */}
          <div className="bg-[#111111] border border-white/10 rounded-[2.5rem] p-8 md:p-10">
            <h3 className="text-lg font-black text-[#F5F5F5] uppercase tracking-tight mb-8">Facturas Recientes</h3>
            <div className="space-y-6">
              {[
                { id: "INV-001", date: "12 Oct 2024", amount: "3.495€" },
                { id: "INV-002", date: "12 Sep 2024", amount: "3.495€" },
                { id: "INV-003", date: "12 Ago 2024", amount: "3.495€" },
              ].map((inv, i) => (
                <button
                  key={i}
                  type="button"
                  className="w-full flex items-center justify-between text-left group rounded-2xl p-3 -mx-3 hover:bg-white/[0.03] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                >
                  <div>
                    <div className="text-sm font-bold text-[#F5F5F5] group-hover:text-[#B454FF] transition-colors">{inv.id}</div>
                    <div className="text-[10px] text-[#F5F5F5]/60 font-bold uppercase tracking-widest">{inv.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-[#F5F5F5]">{inv.amount}</div>
                    <div className="text-[9px] text-green-400 font-bold uppercase tracking-widest">Pagado</div>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-8">
              <PremiumButton variant="glass" size="sm" className="w-full">VER TODO EL HISTORIAL</PremiumButton>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Billing;