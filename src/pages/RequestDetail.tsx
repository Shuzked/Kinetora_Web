"use client";

import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PortalLayout from "@/components/dashboard/PortalLayout";
import PremiumButton from "@/components/PremiumButton";
import { ArrowLeft, CheckCircle2, Clock3, Flag, Image as ImageIcon, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess } from "@/utils/toast";

type RequestStatus = "completed" | "in-progress" | "review";

const statusPill: Record<RequestStatus, { label: string; className: string }> = {
  completed: {
    label: "Completado",
    className: "bg-green-500/15 text-green-300 border-green-500/20",
  },
  review: {
    label: "En Revisión",
    className: "bg-blue-500/15 text-blue-300 border-blue-500/20",
  },
  "in-progress": {
    label: "En Progreso",
    className: "bg-[#B454FF]/18 text-[#D7B3FF] border-[#B454FF]/25",
  },
};

const RequestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState("");

  // Datos demo adaptados a lo que ya usamos en la tabla
  const data = useMemo(() => {
    const items = [
      {
        id: "REQ-001",
        title: "Diseño de Landing Page",
        service: "UX/UI Design",
        status: "completed" as RequestStatus,
        date: "15 Ene 2025",
        priority: "alta" as "alta" | "media" | "baja",
        description:
          "Rediseño completo de la landing orientado a conversión. Enfoque en hero más directo, beneficios claros y prueba social. Favor revisar también la versión móvil.",
        attachments: [
          { name: "wireframe-home.png", url: "/assets/portfolio/elixir-token.webp" },
          { name: "hero-variant-b.png", url: "/assets/portfolio/cybertitans-clash.webp" },
        ],
        activity: [
          { type: "done", text: "Landing Page completada", time: "Hoy, 10:20" },
          { type: "review", text: "Primera entrega enviada", time: "Ayer, 17:05" },
          { type: "progress", text: "Bocetos iniciales listos", time: "Ayer, 12:30" },
        ] as { type: "done" | "review" | "progress"; text: string; time: string }[],
      },
      {
        id: "REQ-002",
        title: "Vídeo AD para Instagram",
        service: "Motion Graphics",
        status: "review" as RequestStatus,
        date: "16 Ene 2025",
        priority: "media" as "alta" | "media" | "baja",
        description:
          "Animación 15s formato vertical. Referencia de ritmo: anuncios de marketplaces tech. Entrega en 1080x1920, H.264.",
        attachments: [{ name: "ad-storyboard.png", url: "/assets/portfolio/chronosworlds.webp" }],
        activity: [
          { type: "review", text: "Versión v2 en revisión", time: "Hoy, 09:50" },
          { type: "progress", text: "Storyboard validado", time: "Ayer, 16:12" },
        ],
      },
      {
        id: "REQ-003",
        title: "Pitch Deck para Inversores",
        service: "Branding",
        status: "in-progress" as RequestStatus,
        date: "17 Ene 2025",
        priority: "alta" as "alta" | "media" | "baja",
        description:
          "Deck de 12-14 diapositivas para ronda Seed. Mantener consistencia con marca Kinetora. Énfasis en tracción y hoja de ruta.",
        attachments: [],
        activity: [{ type: "progress", text: "Plantilla base creada", time: "Hoy, 08:15" }],
      },
    ];
    return items.find((r) => r.id === id) ?? items[0];
  }, [id]);

  const prioColor =
    data.priority === "alta"
      ? "text-red-300"
      : data.priority === "media"
      ? "text-yellow-300"
      : "text-sky-300";

  const iconFor = (t: "done" | "review" | "progress") => {
    if (t === "done") return <CheckCircle2 className="w-4 h-4" />;
    if (t === "review") return <Clock3 className="w-4 h-4" />;
    return <Clock3 className="w-4 h-4" />;
  };

  const tintFor = (t: "done" | "review" | "progress") => {
    if (t === "done") return "bg-green-500/15 text-green-300 border-green-500/20";
    if (t === "review") return "bg-blue-500/15 text-blue-300 border-blue-500/20";
    return "bg-[#B454FF]/15 text-[#D7B3FF] border-[#B454FF]/25";
    };

  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    showSuccess("Nota enviada al equipo (demo).");
    setNote("");
  };

  return (
    <PortalLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <button
              type="button"
              onClick={() => navigate("/dashboard/requests")}
              className="inline-flex items-center gap-2 text-[#F5F5F5]/70 hover:text-[#F5F5F5] text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a Mis Requests
            </button>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-black text-[#F5F5F5] tracking-tight truncate">
                {data.title}
              </h1>
              <span
                className={
                  "inline-flex items-center h-8 px-3 rounded-full border text-xs font-semibold " +
                  statusPill[data.status].className
                }
              >
                {statusPill[data.status].label}
              </span>
            </div>
            <div className="mt-1 text-[#F5F5F5]/55">ID {data.id}</div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-2">
            <PremiumButton
              variant="glass"
              size="md"
              className="rounded-xl text-[#F5F5F5]"
              leftIcon={<MessageSquare className="w-4 h-4" />}
              onClick={() => {
                const el = document.getElementById("notes");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Añadir Nota
            </PremiumButton>
            <PremiumButton
              variant="primary"
              size="md"
              className="rounded-xl"
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
              onClick={() => showSuccess("Marcado como completado (demo).")}
            >
              Marcar como completado
            </PremiumButton>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-[#111111] border border-white/10 p-5">
            <div className="text-[#F5F5F5]/60 text-sm">Servicio</div>
            <div className="text-[#F5F5F5] font-semibold mt-1">{data.service}</div>
          </div>
          <div className="rounded-2xl bg-[#111111] border border-white/10 p-5">
            <div className="text-[#F5F5F5]/60 text-sm">Prioridad</div>
            <div className={"flex items-center gap-2 mt-1 text-[#F5F5F5] font-semibold " + prioColor}>
              <Flag className="w-4 h-4" />
              {data.priority[0].toUpperCase() + data.priority.slice(1)}
            </div>
          </div>
          <div className="rounded-2xl bg-[#111111] border border-white/10 p-5">
            <div className="text-[#F5F5F5]/60 text-sm">Fecha</div>
            <div className="text-[#F5F5F5] font-semibold mt-1">{data.date}</div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 rounded-2xl bg-[#111111] border border-white/10 p-6">
          <div className="text-[#F5F5F5] font-bold">Descripción</div>
          <p className="text-[#F5F5F5]/75 leading-relaxed mt-2">{data.description}</p>
        </div>

        {/* Timeline + Attachments */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl bg-[#111111] border border-white/10 p-6">
            <div className="text-[#F5F5F5] font-bold">Actividad</div>
            <div className="mt-4 space-y-3">
              {data.activity.map((a, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 rounded-xl bg-white/[0.02] border border-white/10 px-4 py-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={"h-9 w-9 rounded-full border flex items-center justify-center shrink-0 " + tintFor(a.type)}>
                      {iconFor(a.type)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[#F5F5F5] font-semibold truncate">{a.text}</div>
                      <div className="text-[#F5F5F5]/45 text-sm mt-0.5">{a.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[#111111] border border-white/10 p-6">
            <div className="text-[#F5F5F5] font-bold">Adjuntos</div>
            {data.attachments.length === 0 ? (
              <div className="mt-4 text-[#F5F5F5]/55 text-sm">Sin archivos adjuntos.</div>
            ) : (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.attachments.map((att) => (
                  <div
                    key={att.name}
                    className="rounded-xl overflow-hidden border border-white/10 bg-[#0D0D0D] group"
                  >
                    <div className="aspect-video relative">
                      <img src={att.url} className="absolute inset-0 h-full w-full object-cover opacity-90" alt="" />
                      <div className="absolute inset-0 bg-black/25" />
                    </div>
                    <div className="p-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="h-8 w-8 rounded-lg bg-white/[0.03] border border-white/10 text-[#F5F5F5]/80 flex items-center justify-center">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                        <div className="truncate text-[#F5F5F5]/85 text-sm">{att.name}</div>
                      </div>
                      <button
                        type="button"
                        className="shrink-0 inline-flex h-8 px-3 items-center justify-center rounded-full bg-white/[0.03] border border-white/10 text-[#F5F5F5]/80 hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                      >
                        Ver
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        <div id="notes" className="mt-6 rounded-2xl bg-[#111111] border border-white/10 p-6">
          <div className="text-[#F5F5F5] font-bold">Notas</div>
          <p className="text-[#F5F5F5]/60 text-sm mt-1">
            Comparte feedback o solicitudes para este request.
          </p>
          <Separator className="my-4 bg-white/10" />
          <form onSubmit={addNote} className="space-y-3">
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Escribe tu nota para el equipo..."
              className="bg-[#0D0D0D] border-white/10 rounded-2xl min-h-[120px] text-[#F5F5F5] placeholder:text-[#F5F5F5]/35 focus-visible:ring-2 focus-visible:ring-[#B454FF]"
            />
            <div className="flex items-center justify-end">
              <PremiumButton type="submit" variant="primary" size="md" className="rounded-xl">
                Enviar Nota
              </PremiumButton>
            </div>
          </form>
        </div>
      </div>
    </PortalLayout>
  );
};

export default RequestDetail;