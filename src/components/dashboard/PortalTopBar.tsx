"use client";

import React from "react";
import { Bell, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

type PortalTopBarProps = {
  onOpenMobileMenu?: () => void;
  showMobileMenuButton?: boolean;
};

const PortalTopBar: React.FC<PortalTopBarProps> = ({
  onOpenMobileMenu,
  showMobileMenuButton,
}) => {
  const unreadCount = 3;

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0D0D0D]/85 backdrop-blur-xl">
      <div className="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showMobileMenuButton ? (
            <button
              type="button"
              aria-label="Abrir menú"
              onClick={onOpenMobileMenu}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#F5F5F5] hover:bg-white/10 hover:border-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
            >
              <span className="text-[13px] font-black">☰</span>
            </button>
          ) : null}

          <div>
            <div className="text-[#F5F5F5] font-black tracking-tight">Portal del Cliente</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/notifications"
            aria-label="Notificaciones"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.03] border border-white/10 text-[#F5F5F5]/80 hover:text-[#F5F5F5] hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-[#B454FF] text-white text-[10px] font-bold flex items-center justify-center shadow-[0_0_12px_rgba(180,84,255,0.7)]">
                {unreadCount}
              </span>
            )}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-3 rounded-full bg-white/[0.03] border border-white/10 px-3 py-2 hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                aria-label="Perfil"
              >
                <div className="h-9 w-9 rounded-full bg-[#B454FF] text-white flex items-center justify-center font-black text-[12px]">
                  JD
                </div>
                <div className="hidden sm:block text-left leading-tight">
                  <div className="text-[#F5F5F5] text-sm font-bold">Juan Díaz</div>
                  <div className="text-[#F5F5F5]/55 text-[11px] font-semibold">Plan Full-Stack</div>
                </div>
                <ChevronDown className="hidden sm:block w-4 h-4 text-[#F5F5F5]/60" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#111111] border-white/10 text-[#F5F5F5]">
              <DropdownMenuItem asChild className="focus:bg-white/[0.06]">
                <Link to="/dashboard/profile">Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-white/[0.06]">
                <Link to="/dashboard/settings">Configuración</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem asChild className="text-red-300 focus:bg-white/[0.06]">
                <Link to="/login">Salir</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default PortalTopBar;