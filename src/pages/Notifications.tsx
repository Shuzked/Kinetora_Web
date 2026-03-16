"use client";

import React from "react";
import PortalLayout from "@/components/dashboard/PortalLayout";
import PremiumButton from "@/components/PremiumButton";
import { Bell, CheckCircle2, Clock3, MessageSquare, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "@/hooks/use-notifications";
import { useI18n } from "@/i18n/I18nProvider";

const Notifications = () => {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const { items, markAllRead, toggleRead, remove } = useNotifications();

  const ui =
    lang === "es"
      ? {
          title: "Notificaciones",
          sub: "Actualizaciones recientes de tus requests",
          markAll: "Marcar todo como leído",
          empty: "No tienes notificaciones por ahora.",
          view: "Ver Request",
          markUnread: "Marcar como no leído",
          markRead: "Marcar como leído",
          delete: "Eliminar",
        }
      : {
          title: "Notifications",
          sub: "Recent updates on your requests",
          markAll: "Mark all as read",
          empty: "You don't have notifications yet.",
          view: "View request",
          markUnread: "Mark as unread",
          markRead: "Mark as read",
          delete: "Delete",
        };

  const tintFor = (t: "done" | "review" | "message") => {
    if (t === "done") return "bg-green-500/15 text-green-300 border-green-500/20";
    if (t === "review") return "bg-blue-500/15 text-blue-300 border-blue-500/20";
    return "bg-[#B454FF]/15 text-[#D7B3FF] border-[#B454FF]/25";
  };
  const iconFor = (t: "done" | "review" | "message") => {
    if (t === "done") return <CheckCircle2 className="w-5 h-5" />;
    if (t === "review") return <Clock3 className="w-5 h-5" />;
    return <MessageSquare className="w-5 h-5" />;
  };

  return (
    <PortalLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#F5F5F5] tracking-tight">{ui.title}</h1>
            <p className="text-[#F5F5F5]/55 mt-1">{ui.sub}</p>
          </div>
          <PremiumButton
            variant="glass"
            size="md"
            className="text-[#F5F5F5]"
            onClick={markAllRead}
            leftIcon={<Bell className="w-4 h-4" />}
          >
            {ui.markAll}
          </PremiumButton>
        </div>

        <div className="mt-6 space-y-3">
          {items.length === 0 ? (
            <div className="rounded-2xl bg-[#111111] border border-white/10 p-6 text-[#F5F5F5]/70">
              {ui.empty}
            </div>
          ) : (
            items.map((n) => (
              <div
                key={n.id}
                className={
                  "flex items-center justify-between gap-4 rounded-2xl border px-4 py-4 transition-opacity " +
                  (n.read
                    ? "bg-white/[0.02] border-white/10 opacity-60 hover:opacity-100 focus-within:opacity-100"
                    : "bg-[#111111] border-white/10 opacity-100")
                }
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={"h-10 w-10 rounded-full border flex items-center justify-center shrink-0 " + tintFor(n.type)}>
                    {iconFor(n.type)}
                  </div>
                  <div className="min-w-0">
                    <div className={"font-semibold truncate " + (n.read ? "text-[#F5F5F5]/80" : "text-[#F5F5F5]")}>
                      {n.title}
                    </div>
                    <div className="text-[#F5F5F5]/45 text-sm mt-0.5">{n.time}</div>
                    <div className="mt-2 flex items-center gap-2">
                      {n.requestId && (
                        <button
                          type="button"
                          onClick={() => navigate(`/dashboard/requests/${n.requestId}`)}
                          className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-white/[0.03] border border-white/10 text-[#B454FF] hover:bg-white/[0.06] transition-colors text-xs"
                        >
                          {ui.view}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => toggleRead(n.id)}
                        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-white/[0.03] border border-white/10 text-[#F5F5F5]/85 hover:bg-white/[0.06] transition-colors text-xs"
                      >
                        {n.read ? ui.markUnread : ui.markRead}
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(n.id)}
                        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-white/[0.03] border border-white/10 text-[#F5F5F5]/85 hover:bg-white/[0.06] transition-colors text-xs"
                      >
                        <Trash2 className="w-4 h-4" />
                        {ui.delete}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </PortalLayout>
  );
};

export default Notifications;