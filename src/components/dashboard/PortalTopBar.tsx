"use client";

import React from "react";
import { Bell, ChevronDown, Check, Clock3, CheckCircle2, MessageSquare, Trash2, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/hooks/use-notifications";
import { useI18n } from "@/i18n/I18nProvider";

type PortalTopBarProps = {
  onOpenMobileMenu?: () => void;
  showMobileMenuButton?: boolean;
};

const PortalTopBar: React.FC<PortalTopBarProps> = ({
  onOpenMobileMenu,
  showMobileMenuButton,
}) => {
  const navigate = useNavigate();
  const { items, unreadCount, markAllRead, remove } = useNotifications();
  const { lang, setLang, t } = useI18n();

  const ui =
    lang === "es"
      ? {
          openMenu: "Abrir menú",
          markAll: "Marcar todo",
          empty: "Sin notificaciones.",
          viewRequest: "Ver Request",
          delete: "Eliminar",
          unread: "sin leer",
          viewAll: "Ver todas →",
          profile: "Perfil",
          settings: "Configuración",
          logout: "Salir",
        }
      : {
          openMenu: "Open menu",
          markAll: "Mark all",
          empty: "No notifications.",
          viewRequest: "View request",
          delete: "Delete",
          unread: "unread",
          viewAll: "View all →",
          profile: "Profile",
          settings: "Settings",
          logout: "Log out",
        };

  const tintFor = (tint: "done" | "review" | "message") => {
    if (tint === "done") return "bg-green-500/15 text-green-300 border-green-500/20";
    if (tint === "review") return "bg-blue-500/15 text-blue-300 border-blue-500/20";
    return "bg-[#B454FF]/15 text-[#D7B3FF] border-[#B454FF]/25";
  };
  const iconFor = (type: "done" | "review" | "message") => {
    if (type === "done") return <CheckCircle2 className="w-4 h-4" />;
    if (type === "review") return <Clock3 className="w-4 h-4" />;
    return <MessageSquare className="w-4 h-4" />;
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0D0D0D]/85 backdrop-blur-xl">
      <div className="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showMobileMenuButton ? (
            <button
              type="button"
              aria-label={ui.openMenu}
              onClick={onOpenMobileMenu}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#F5F5F5] hover:bg-white/10 hover:border-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
            >
              <span className="text-[13px] font-black">☰</span>
            </button>
          ) : null}
          <div className="text-[#F5F5F5] font-black tracking-tight">{t("portal.title")}</div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label={t("lang.switch")}
                className="hidden sm:inline-flex h-10 px-3 rounded-full bg-white/[0.03] border border-white/10 text-[#F5F5F5]/80 hover:text-[#F5F5F5] hover:bg-white/[0.06] transition-colors text-[11px] font-black tracking-[0.22em] uppercase"
              >
                {lang.toUpperCase()}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#111111] border-white/10 text-[#F5F5F5] rounded-2xl p-1 min-w-[160px]">
              <DropdownMenuItem onClick={() => setLang("es")} className="rounded-xl focus:bg-white/[0.06] cursor-pointer">
                {t("lang.es")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang("en")} className="rounded-xl focus:bg-white/[0.06] cursor-pointer">
                {t("lang.en")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label={t("portal.notifications")}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.03] border border-white/10 text-[#F5F5F5]/80 hover:text-[#F5F5F5] hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-[#B454FF] text-white text-[10px] font-bold flex items-center justify-center shadow-[0_0_12px_rgba(180,84,255,0.7)]">
                    {unreadCount}
                  </span>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#111111] border-white/10 text-[#F5F5F5] w-[86vw] max-w-[360px] p-0 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
                <DropdownMenuLabel className="p-0 text-[#F5F5F5]">{t("portal.notifications")}</DropdownMenuLabel>
                <button
                  type="button"
                  onClick={markAllRead}
                  className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#F5F5F5]/70 hover:text-[#F5F5F5]"
                >
                  <Check className="w-4 h-4" />
                  {ui.markAll}
                </button>
              </div>

              <div className="max-h-80 overflow-auto">
                {items.length === 0 ? (
                  <div className="p-4 text-[#F5F5F5]/60 text-sm">{ui.empty}</div>
                ) : (
                  items.map((n) => (
                    <div
                      key={n.id}
                      className={
                        "px-3 py-3 border-b border-white/10 last:border-0 transition-opacity " +
                        (n.read
                          ? "opacity-60 hover:opacity-100 focus-within:opacity-100"
                          : "opacity-100")
                      }
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={"h-8 w-8 rounded-full border flex items-center justify-center shrink-0 " + tintFor(n.type)}>
                            {iconFor(n.type)}
                          </div>
                          <div className="min-w-0">
                            <div className={"text-sm font-semibold break-words " + (n.read ? "text-[#F5F5F5]/85" : "text-[#F5F5F5]")}>
                              {n.title}
                            </div>
                            <div className="text-[11px] text-[#F5F5F5]/50 mt-0.5">{n.time}</div>
                            <div className="mt-2 flex items-center gap-2">
                              {n.requestId && (
                                <button
                                  type="button"
                                  onClick={() => navigate(`/dashboard/requests/${n.requestId}`)}
                                  className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-white/[0.03] border border-white/10 text-[#B454FF] hover:bg-white/[0.06] transition-colors text-xs"
                                >
                                  {ui.viewRequest}
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => remove(n.id)}
                                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-white/[0.03] border border-white/10 text-[#F5F5F5]/80 hover:bg-white/[0.06] transition-colors text-xs"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                {ui.delete}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <DropdownMenuSeparator className="bg-white/10" />
              <div className="flex items-center justify-between px-3 py-2">
                <div className="text-[11px] text-[#F5F5F5]/55">
                  {unreadCount} {ui.unread}
                </div>
                <Link
                  to="/dashboard/notifications"
                  className="text-[11px] font-extrabold uppercase tracking-widest text-[#F5F5F5]/80 hover:text-[#F5F5F5]"
                >
                  {ui.viewAll}
                </Link>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-3 rounded-full bg-white/[0.03] border border-white/10 px-3 py-2 hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                aria-label={ui.profile}
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
                <Link to="/dashboard/profile">{ui.profile}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-white/[0.06]">
                <Link to="/dashboard/settings">{ui.settings}</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem asChild className="text-red-300 focus:bg-white/[0.06]">
                <Link to="/login">{ui.logout}</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default PortalTopBar;