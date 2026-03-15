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
                : 'text-[#2A2A2A] hover:text-[#F5F5F5] hover:bg-[#0D0D0D]'
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-[#2A2A2A] space-y-2">
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