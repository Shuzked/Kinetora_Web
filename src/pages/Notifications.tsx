"use client";

import React, { useMemo, useState } from "react";
import PortalLayout from "@/components/dashboard/PortalLayout";
import PremiumButton from "@/components/PremiumButton";
import { Bell, CheckCircle2, Clock3, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

type NType = "done" | "review" | "message";
type Notification = {
  id: string;
  title: string;
  time: string;
  read: boolean;
  type: NType;
  requestId?: string;
};

const tintFor = (t: NType) => {
  if (t === "done") return "bg-green-500/15 text-green-300 border-green-500/20";
  if (t === "review") return "bg-blue-500/15 text-blue-300 border-blue-500/20";
  return "bg-[#B454FF]/15 text-[#D7B3FF] border-[#B454FF]/25";
};

const iconFor = (t: NType) => {
  if (t === "done") return <CheckCircle2 className="w-5 h-5" />;
  if (t === "review") return <Clock3 className="w-5 h-5" />;
  return <MessageSquare className="w-5 h-5" />;
};

const Notifications = () => {
  const navigate = useNavigate();
  const initial: Notification[] = useMemo(
    () => [
      { id: "N-1", title: "Diseño de Landing Page completado", time: "hace 2h", read: false, type: "done", requestId: "REQ-001" },
      { id: "N-2", title: "Vídeo AD en revisión (v2)", time: "hace 5h", read: false, type: "review", requestId: "REQ-002" },
      { id: "N-3", title: "Nuevo mensaje del equipo en Pitch Deck", time: "ayer", read: true, type: "message", requestId: "REQ-003" },
    ],
    []
  );

  const [items, setItems] = useState<Notification[]>(initial);

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleRead = (id: string) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
  };

  return (
    <PortalLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#F5F5F5] tracking-tight">Notificaciones</h1>
            <p className="text-[#F5F5F5]/55 mt-1">Actualizaciones recientes de tus requests</p>
          </div>
          <PremiumButton variant="glass" size="md" className="text-[#F5F5F5]" onClick={markAllRead} leftIcon={<Bell className="w-4 h-4" />}>
            Marcar todo como leído
          </PremiumButton>
        </div>

        <div className="mt-6 space-y-3">
          {items.map((n) => (
            <div
              key={n.id}
              className={
                "flex items-center justify-between gap-4 rounded-2xl border px-4 py-4 " +
                (n.read ? "bg-white/[0.02] border-white/10" : "bg-[#111111] border-white/10")
              }
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={"h-10 w-10 rounded-full border flex items-center justify-center shrink-0 " + tintFor(n.type)}>
                  {iconFor(n.type)}
                </div>
                <div className="min-w-0">
                  <div className={"font-semibold truncate " + (n.read ? "text-[#F5F5F5]/80" : "text-[#F5F5F5]")}>{n.title}</div>
                  <div className="text-[#F5F5F5]/45 text-sm mt-0.5">{n.time}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {n.requestId ? (
                  <button
                    type="button"
                    onClick={() => navigate(`/dashboard/requests/${n.requestId}`)}
                    className="inline-flex h-9 items-center justify-center px-3 rounded-full bg-white/[0.03] border border-white/10 text-[#B454FF] hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                  >
                    Ver Request
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => toggleRead(n.id)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.03] border border-white/10 text-[#F5F5F5]/80 hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                  aria-label="Alternar leído"
                >
                  {n.read ? "✓" : "•"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
};

export default Notifications;