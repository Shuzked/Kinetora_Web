"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import RequestCard from '@/components/dashboard/RequestCard';
import NewRequestModal from '@/components/dashboard/NewRequestModal';
import PremiumButton from '@/components/PremiumButton';
import { Plus, Zap, Layout, Users, Menu, X, CheckCircle2, Clock, PlayCircle, HelpCircle } from 'lucide-react';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex relative overflow-hidden">
      {/* Glows sutiles de fondo */}
      <motion.div
        aria-hidden
        className="absolute -top-40 -left-40 w-[90vw] max-w-[900px] h-[60vh] rounded-full bg-[#B454FF]/10 blur-[120px]"
        animate={{ opacity: [0.08, 0.12, 0.08], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-40 -right-40 w-[70vw] max-w-[720px] h-[50vh] rounded-full bg-[#B454FF]/6 blur-[140px]"
        animate={{ y: [0, -12, 0], opacity: [0.06, 0.1, 0.06] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
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
      
      <main className="flex-1 overflow-y-auto py-6 md:py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="flex flex-col gap-4 mb-10">
          <div className="flex items-center gap-4 w-full">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 bg-[#111111] border border-[#2A2A2A] rounded-xl text-[#F5F5F5]"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-[#F5F5F5] tracking-tighter uppercase">Bienvenido de nuevo, Juan 👋</h1>
              <p className="text-[#F5F5F5]/60 text-sm mt-1">Aquí está el resumen de tu actividad creativa</p>
            </div>
          </div>
          <div>
            <PremiumButton 
              onClick={() => setIsModalOpen(true)}
              variant="primary"
              size="md"
              className="w-full md:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              NUEVO REQUEST
            </PremiumButton>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10">
          {[
            { label: "Solicitudes Activas", value: "2", icon: Zap, color: "text-[#B454FF]" },
            { label: "Entregas este mes", value: "14", icon: Layout, color: "text-blue-500" },
            { label: "Miembros equipo", value: "4", icon: Users, color: "text-green-500" },
          ].map((stat, i) => (
            <div key={i} className="bg-[#111111] border border-white/10 p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-[9px] font-black text-[#F5F5F5]/50 uppercase tracking-widest">Este mes</span>
              </div>
              <div className="text-2xl md:text-3xl font-black text-[#F5F5F5]">{stat.value}</div>
              <div className="text-[10px] font-bold text-[#F5F5F5]/55 uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Actividad Reciente */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-[#F5F5F5] tracking-tight uppercase mb-4">Actividad Reciente</h2>
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-2">
            {[
              { icon: CheckCircle2, text: "Diseño de Landing Page completado", time: "2 horas atrás", tint: "text-green-400" },
              { icon: PlayCircle, text: "Vídeo AD en revisión", time: "5 horas atrás", tint: "text-[#B454FF]" },
              { icon: Clock, text: "Nuevo request: Pitch Deck", time: "1 día atrás", tint: "text-yellow-400" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 sm:p-4 rounded-xl hover:bg-white/[0.04] transition-colors">
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${item.tint}`} />
                  <div>
                    <div className="text-[#F5F5F5] font-semibold">{item.text}</div>
                    <div className="text-[11px] text-[#F5F5F5]/55 uppercase tracking-widest">{item.time}</div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-[#F5F5F5]/70 flex items-center justify-center">→</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 rounded-[2rem] p-6 border border-[#B454FF]/30 bg-gradient-to-br from-[#B454FF]/15 via-[#0D0D0D] to-[#0D0D0D]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#B454FF]/20 border border-[#B454FF]/35 flex items-center justify-center">
                <Plus className="w-4 h-4 text-[#B454FF]" />
              </div>
              <div className="text-[#F5F5F5] text-lg font-bold">Crear Nuevo Request</div>
            </div>
            <p className="text-[#F5F5F5]/70 max-w-xl">Describe tu próximo proyecto creativo</p>
            <div className="mt-5">
              <PremiumButton variant="primary" size="md" onClick={() => setIsModalOpen(true)}>
                Empezar Ahora
              </PremiumButton>
            </div>
          </div>
          <div className="rounded-[2rem] p-6 border border-white/10 bg-white/[0.04]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-[#F5F5F5]" />
              </div>
              <div className="text-[#F5F5F5] text-lg font-bold">¿Necesitas Ayuda?</div>
            </div>
            <p className="text-[#F5F5F5]/70">Nuestro equipo está listo para asistirte</p>
            <div className="mt-5">
              <PremiumButton variant="glass" size="md" className="text-[#F5F5F5]" onClick={() => window.location.assign('/dashboard/messages')}>
                Contactar Soporte
              </PremiumButton>
            </div>
          </div>
        </div>

        {/* Solicitudes recientes (tarjetas) */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-[#F5F5F5] tracking-tight uppercase">Solicitudes Recientes</h2>
            <button className="text-[11px] font-bold text-[#F5F5F5]/60 hover:text-[#B454FF] uppercase tracking-widest transition-colors">Ver todas</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <RequestCard title="Rediseño Landing Page SaaS" status="in-progress" date="12 Oct 2024" type="UX/UI Design" />
            <RequestCard title="Motion Graphics para Ads" status="pending" date="14 Oct 2024" type="Video" />
            <RequestCard title="Branding Kit - Nexus AI" status="completed" date="08 Oct 2024" type="Branding" />
          </div>
        </section>

        <NewRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </main>
    </div>
  );
};

export default Dashboard;