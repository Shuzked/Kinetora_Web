"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Button } from "@/components/ui/button";
import { CreditCard, Check, Menu, X, Zap } from 'lucide-react';

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
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed inset-y-0 left-0 w-[280px] z-50 lg:hidden"
            >
              <DashboardSidebar />
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-6 right-[-50px] w-10 h-10 bg-[#111111] border border-[#2A2A2A] rounded-full flex items-center justify-center text-[#F5F5F5]"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <header className="flex items-center gap-4 mb-12">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 bg-[#111111] border border-[#2A2A2A] rounded-xl text-[#F5F5F5]"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-[#F5F5F5] tracking-tighter uppercase">Suscripción</h1>
            <p className="text-[#2A2A2A] font-bold text-[10px] md:text-xs uppercase tracking-widest mt-1">Gestiona tu plan y facturación</p>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Plan */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#111111] border border-[#B454FF]/30 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6">
                <div className="bg-[#B454FF] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Activo</div>
              </div>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-[#B454FF]/10 rounded-2xl flex items-center justify-center">
                  <Zap className="w-8 h-8 text-[#B454FF]" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-[#F5F5F5] uppercase tracking-tight">Full-Stack Creativo</h2>
                  <p className="text-[#2A2A2A] font-bold text-[10px] uppercase tracking-widest">Próximo cobro: 12 Nov 2024</p>
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

              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#B454FF] hover:bg-[#B454FF]/90 text-white rounded-full px-8 h-12 font-black text-xs tracking-widest">
                  MEJORAR PLAN
                </Button>
                <Button variant="outline" className="border-[#2A2A2A] text-[#2A2A2A] hover:text-red-500 hover:border-red-500/30 rounded-full px-8 h-12 font-bold text-xs tracking-widest">
                  PAUSAR SUSCRIPCIÓN
                </Button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-[#111111] border border-[#2A2A2A] rounded-[2.5rem] p-8 md:p-10">
              <h3 className="text-lg font-black text-[#F5F5F5] uppercase tracking-tight mb-6">Método de Pago</h3>
              <div className="flex items-center justify-between p-6 bg-[#0D0D0D] border border-[#2A2A2A] rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-[#2A2A2A] rounded flex items-center justify-center text-[8px] font-black text-[#F5F5F5]">VISA</div>
                  <div>
                    <div className="text-sm font-bold text-[#F5F5F5]">•••• •••• •••• 4242</div>
                    <div className="text-[10px] text-[#2A2A2A] font-bold uppercase tracking-widest">Expira 12/26</div>
                  </div>
                </div>
                <button className="text-[10px] font-bold text-[#B454FF] uppercase tracking-widest hover:underline">Editar</button>
              </div>
            </div>
          </div>

          {/* Invoices */}
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-[2.5rem] p-8 md:p-10">
            <h3 className="text-lg font-black text-[#F5F5F5] uppercase tracking-tight mb-8">Facturas Recientes</h3>
            <div className="space-y-6">
              {[
                { id: "INV-001", date: "12 Oct 2024", amount: "3.495€" },
                { id: "INV-002", date: "12 Sep 2024", amount: "3.495€" },
                { id: "INV-003", date: "12 Ago 2024", amount: "3.495€" },
              ].map((inv, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div>
                    <div className="text-sm font-bold text-[#F5F5F5] group-hover:text-[#B454FF] transition-colors">{inv.id}</div>
                    <div className="text-[10px] text-[#2A2A2A] font-bold uppercase tracking-widest">{inv.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-[#F5F5F5]">{inv.amount}</div>
                    <div className="text-[9px] text-green-500 font-bold uppercase tracking-widest">Pagado</div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-8 text-[10px] font-bold text-[#2A2A2A] hover:text-[#F5F5F5] uppercase tracking-widest">
              VER TODO EL HISTORIAL
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Billing;