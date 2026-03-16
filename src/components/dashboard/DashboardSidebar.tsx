"use client";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  ClipboardList,
  PlusCircle,
  Folder,
  CreditCard,
  Headphones,
  ArrowRight
} from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

const DashboardSidebar = () => {
  const { lang } = useI18n();
  const location = useLocation();

  const labels =
    lang === "es"
      ? {
          home: "Inicio",
          requests: "Mis Requests",
          newRequest: "Nuevo Request",
          files: "Archivos",
          billing: "Facturación",
          support: "Soporte",
          helpTitle: "¿Necesitas ayuda?",
          helpSub: "Te ayudamos al momento.",
          helpCta: "Contactar soporte",
        }
      : {
          home: "Home",
          requests: "My requests",
          newRequest: "New request",
          files: "Files",
          billing: "Billing",
          support: "Support",
          helpTitle: "Need help?",
          helpSub: "We'll help you right away.",
          helpCta: "Contact support",
        };

  const menuItems = [
    { icon: LayoutGrid, label: labels.home, path: "/dashboard" },
    { icon: ClipboardList, label: labels.requests, path: "/dashboard/requests" },
    { icon: PlusCircle, label: labels.newRequest, path: "/dashboard/new" },
    { icon: Folder, label: labels.files, path: "/dashboard/files" },
    { icon: CreditCard, label: labels.billing, path: "/dashboard/billing" },
    { icon: Headphones, label: labels.support, path: "/dashboard/support" },
  ];

  return (
    <aside className="w-72 bg-[#0B0B0B] border-r border-white/10 flex flex-col h-dvh">
      <div className="px-6 py-5 sm:py-6">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
        >
          <div className="h-10 w-10 rounded-xl bg-[#B454FF] text-white flex items-center justify-center font-black">
            K
          </div>
          <div className="text-[#F5F5F5] font-black tracking-tight">Kinetora</div>
        </Link>
      </div>

      <nav className="flex-1 px-3 sm:px-4 pb-4 space-y-1 min-w-0 overflow-y-auto">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={
                "group flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-semibold transition-colors border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] min-w-0 " +
                (active
                  ? "bg-[#B454FF]/18 border-[#B454FF]/28 text-[#F5F5F5] shadow-[0_10px_30px_rgba(180,84,255,0.12)]"
                  : "bg-transparent border-transparent text-[#F5F5F5]/70 hover:text-[#F5F5F5] hover:bg-white/[0.04] hover:border-white/10")
              }
            >
              <item.icon
                className={
                  "w-[18px] h-[18px] " +
                  (active ? "text-[#B454FF]" : "text-[#F5F5F5]/55 group-hover:text-[#F5F5F5]")
                }
              />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 sm:p-4 border-t border-white/10">
        <div className="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/10 p-4">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-10 -right-16 h-48 w-48 rounded-full bg-[#B454FF]/12 blur-[60px]"
          />
          <div className="relative">
            <div className="text-[#F5F5F5] font-bold">{labels.helpTitle}</div>
            <div className="text-[#F5F5F5]/55 text-sm mt-1">{labels.helpSub}</div>
            <Link
              to="/dashboard/support"
              className="mt-4 inline-flex items-center gap-2 text-[#B454FF] font-semibold hover:text-[#C07CFF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded"
            >
              {labels.helpCta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;