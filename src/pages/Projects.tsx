"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import RequestCard from '@/components/dashboard/RequestCard';
import { Button } from "@/components/ui/button";
import { Search, Filter, Menu, X, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";

const Projects = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');

  const projects = [
    { title: "Rediseño Landing Page SaaS", status: 'in-progress' as const, date: "12 Oct 2024", type: "UX/UI Design" },
    { title: "Motion Graphics para Ads", status: 'pending' as const, date: "14 Oct 2024", type: "Video" },
    { title: "Branding Kit - Nexus AI", status: 'completed' as const, date: "08 Oct 2024", type: "Branding" },
    { title: "App Mobile - HealthUp", status: 'completed' as const, date: "25 Sep 2024", type: "Mobile App" },
    { title: "Pitch Deck Inversores", status: 'completed' as const, date: "15 Sep 2024", type: "Pitch Deck" },
    { title: "Iconografía Custom", status: 'in-progress' as const, date: "18 Oct 2024", type: "Illustration" },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.status === filter);

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
      
      <main className="flex-1 overflow-y-auto py-6 md:py-12 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 bg-[#111111] border border-[#2A2A2A] rounded-xl text-[#F5F5F5]"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-[#F5F5F5] tracking-tighter uppercase">Mis Proyectos</h1>
              <p className="text-[#2A2A2A] font-bold text-[10px] md:text-xs uppercase tracking-widest mt-1">Gestiona tu cola de diseño</p>
            </div>
          </div>
          <Button className="bg-[#B454FF] hover:bg-[#B454FF]/90 text-white rounded-full px-8 h-12 font-black text-xs tracking-widest shadow-[0_10px_30px_rgba(180,84,255,0.2)] w-full md:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            NUEVA SOLICITUD
          </Button>
        </header>

        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2A2A2A]" />
            <Input 
              placeholder="Buscar proyectos..." 
              className="bg-[#111111] border-[#2A2A2A] rounded-xl pl-12 h-12 text-[#F5F5F5] focus:ring-[#B454FF]"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {(['all', 'pending', 'in-progress', 'completed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
                  filter === f 
                    ? 'bg-[#B454FF] border-[#B454FF] text-white' 
                    : 'bg-[#111111] border-[#2A2A2A] text-[#2A2A2A] hover:text-[#F5F5F5]'
                }`}
              >
                {f === 'all' ? 'Todos' : f === 'pending' ? 'En cola' : f === 'in-progress' ? 'Diseñando' : 'Completados'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <RequestCard {...project} />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Projects;