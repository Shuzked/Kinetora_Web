"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo';
import { 
  LayoutDashboard, 
  PlusCircle, 
  FolderKanban, 
  CreditCard, 
  Settings, 
  LogOut,
  MessageSquare
} from 'lucide-react';

const DashboardSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: "Resumen", path: "/dashboard" },
    { icon: FolderKanban, label: "Proyectos", path: "/dashboard/projects" },
    { icon: MessageSquare, label: "Mensajes", path: "/dashboard/messages" },
    { icon: CreditCard, label: "Suscripción", path: "/dashboard/billing" },
  ];

  return (
    <aside className="w-64 bg-[#111111] border-r border-[#2A2A2A] flex flex-col h-screen sticky top-0">
      <div className="p-8">
        <Link to="/">
          <Logo className="h-6" />
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${
              location.pathname === item.path 
                ? 'bg-[#B454FF] text-white shadow-[0_0_20px_rgba(180,84,255,0.2)]' 
                : 'text-[#2A2A2A] hover:text-[#F5F5F5] hover:bg-[#0D0D0D] border border-transparent hover:border-white/10'
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-[#2A2A2A] space-y-2">
        <div className="p-4 rounded-xl bg-gradient-to-br from-[#2A2A2A]/40 to-[#0F0F0F]/60 border border-white/10">
          <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#F5F5F5]/70 mb-1">¿Necesitas ayuda?</div>
          <Link 
            to="/dashboard/messages"
            className="inline-flex items-center justify-center w-full h-10 rounded-lg bg-[#B454FF]/15 border border-[#B454FF]/30 text-[#F5F5F5] font-bold text-[11px] uppercase tracking-widest hover:bg-[#B454FF]/22 transition-colors"
          >
            Contactar Soporte →
          </Link>
        </div>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest text-[#2A2A2A] hover:text-[#F5F5F5] transition-colors">
          <Settings className="w-4 h-4" />
          Ajustes
        </button>
        <Link to="/login" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest text-red-900/50 hover:text-red-500 transition-colors">
          <LogOut className="w-4 h-4" />
          Salir
        </Link>
      </div>
    </aside>
  );
};

export default DashboardSidebar;