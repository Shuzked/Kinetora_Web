"use client";

import React from 'react';
import { motion } from 'framer-motion';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import RequestCard from '@/components/dashboard/RequestCard';
import { Button } from "@/components/ui/button";
import { Plus, Zap, Layout, Users } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#0D0D0D] flex">
      <DashboardSidebar />
      
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-[#F5F5F5] tracking-tighter uppercase">Panel de Control</h1>
            <p className="text-[#2A2A2A] font-bold text-xs uppercase tracking-widest mt-1">Bienvenido de nuevo, TechFlow Team</p>
          </div>
          <Button className="bg-[#B454FF] hover:bg-[#B454FF]/90 text-white rounded-full px-8 h-12 font-black text-xs tracking-widest shadow-[0_10px_30px_rgba(180,84,255,0.2)]">
            <Plus className="w-4 h-4 mr-2" />
            NUEVA SOLICITUD
          </Button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
              <div className="text-3xl font-black text-[#F5F5F5]">{stat.value}</div>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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