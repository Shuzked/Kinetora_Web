"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo';
import {
  LayoutDashboard,
  FolderKanban,
  CreditCard,
  Settings,
  LogOut,
  MessageSquare,
  ArrowRight
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
    <aside className="w-64 bg-[#111111] border-r border-white/10 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <Link
          to="/"
          className="inline-flex items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
        >
          <Logo className="h-6" />
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={
                "flex items-center gap-3 px-4 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] " +
                (active
                  ? "bg-[#B454FF]/16 border-[#B454FF]/35 text-[#F5F5F5] shadow-[0_0_22px_rgba(180,84,255,0.16)]"
                  : "bg-transparent border-transparent text-[#F5F5F5]/70 hover:text-[#F5F5F5] hover:bg-white/[0.04] hover:border-white/10")
              }
            >
              <item.icon className={"w-4 h-4 " + (active ? "text-[#B454FF]" : "text-[#F5F5F5]/70")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-2">
        <div className="relative overflow-hidden p-4 rounded-2xl bg-white/[0.03] border border-white/10">
          <div aria-hidden className="pointer-events-none absolute -top-10 -right-12 h-44 w-44 rounded-full bg-[#B454FF]/10 blur-[50px]" />
          <div className="relative">
            <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#F5F5F5]/70 mb-2">¿Necesitas ayuda?</div>
            <Link
              to="/dashboard/messages"
              className="inline-flex items-center justify-center w-full h-10 rounded-full bg-[#B454FF]/15 border border-[#B454FF]/30 text-[#F5F5F5] font-bold text-[11px] uppercase tracking-widest hover:bg-[#B454FF]/22 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
            >
              Contactar Soporte
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/70 hover:text-[#F5F5F5] hover:bg-white/[0.04] border border-transparent hover:border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]">
          <Settings className="w-4 h-4" />
          Ajustes
        </button>

        <Link
          to="/login"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-red-400/70 hover:text-red-300 hover:bg-white/[0.03] border border-transparent hover:border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
        >
          <LogOut className="w-4 h-4" />
          Salir
        </Link>
      </div>
    </aside>
  );
};

export default DashboardSidebar;