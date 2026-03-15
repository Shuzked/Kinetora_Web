"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import RequestCard from '@/components/dashboard/RequestCard';
import { Button } from "@/components/ui/button";
import { Plus, Zap, Layout, Users, Menu, X } from 'lucide-react';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex relative">
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
      
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 bg-[#111111] border border-[#2A2A2A] rounded-xl text-[#F5F5F5]"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-[#F5F5F5] tracking-tighter uppercase">Panel de Control</h1>
              <p className="text-[#2A2A2A] font-bold text-[10px] md:text-xs uppercase tracking-widest mt-1">TechFlow Team</p>
            </div>
          </div>
          <Button className="bg-[#B454FF] hover:bg-[#B454FF]/90 text-white rounded-full px-8 h-12 font-black text-xs tracking-widest shadow-[0_10px_30px_rgba(180,84,255,0.2)] w-full md:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            NUEVA SOLICITUD
          </Button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
          {[
            { label: "Solicitudes Activas", value: "2", icon: Zap, color: "text-[#B454FF]" },
            { label: "Entregas este mes", value: "14", icon: Layout, color: "text-blue-500" },
            { label: "Miembros equipo", value: "4", icon: Users, color: "text-green-500" },
          ].map((stat, i) => (
            <div key={i} className="bg-[#111111] border border-[#2A2A2A] p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-[9px] font-black text-[#2A2A2A] uppercase tracking-widest">Este mes</span>
              </div>
              <div className="text-2xl md:text-3xl font-black text-[#F5F5F5]">{stat.value}</div>
              <div className="text-[10px] font-bold text-[#2A2A2A] uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Active Requests */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-[#F5F5F5] tracking-tight uppercase">Solicitudes Recientes</h2>
            <button className="text-[10px] font-bold text-[#2A2A2A] hover:text-[#B454FF] uppercase tracking-widest transition-colors">Ver todas</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <RequestCard 
              title="Rediseño Landing Page SaaS" 
              status="in-progress" 
              date="12 Oct 2024" 
              type="UX/UI Design" 
            />
            <RequestCard 
              title="Motion Graphics para Ads" 
              status="pending" 
              date="14 Oct 2024" 
              type="Video" 
            />
            <RequestCard 
              title="Branding Kit - Nexus AI" 
              status="completed" 
              date="08 Oct 2024" 
              type="Branding" 
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;