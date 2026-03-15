"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import PortalLayout from "@/components/dashboard/PortalLayout";
import PremiumButton from "@/components/PremiumButton";
import { ArrowRight, CalendarClock, CheckCircle2, Clock3, Plus, Sparkles, Wand2 } from "lucide-react";
import { useRequests } from "@/hooks/use-requests";

const Dashboard = () => {
  const navigate = useNavigate();
  const { items } = useRequests();
  const findByTitle = (needle: string) =>
    items.find((r) => r.title.toLowerCase().includes(needle.toLowerCase()))?.id;

  const activities = [
    {
      title: "Diseño de Landing Page completado",
      time: "2 horas atrás",
      type: "done" as const,
      requestId: findByTitle("Landing Page"),
    },
    {
      title: "Vídeo AD en revisión",
      time: "5 horas atrás",
      type: "review" as const,
      requestId: findByTitle("Vídeo AD"),
    },
    {
      title: "Nuevo request: Pitch Deck",
      time: "1 día atrás",
      type: "progress" as const,
      requestId: findByTitle("Pitch Deck"),
    },
  ];

  const typeToIcon = {
    done: <CheckCircle2 className="w-5 h-5" />,
    review: <Clock3 className="w-5 h-5" />,
    progress: <Clock3 className="w-5 h-5" />,
  } as const;

  const typeToTint = {
    done: "bg-green-500/15 text-green-300 border-green-500/20",
    review: "bg-blue-500/15 text-blue-300 border-blue-500/20",
    progress: "bg-[#B454FF]/15 text-[#D7B3FF] border-[#B454FF]/25",
  } as const;

  const goTo = (requestId?: string) => {
    if (requestId) navigate(`/dashboard/requests/${requestId}`);
    else navigate("/dashboard/requests");
  };

  return (
    <PortalLayout>
      <div>
        <h1 className="text-3xl font-black text-[#F5F5F5] tracking-tight">Bienvenido de nuevo, Juan 👋</h1>
        <p className="text-[#F5F5F5]/55 mt-1">Aquí está el resumen de tu actividad creativa</p>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              label: "Requests Activos",
              value: "3",
              icon: <Wand2 className="w-5 h-5" />,
              tint: "text-[#B454FF] bg-[#B454FF]/15 border-[#B454FF]/25",
            },
            {
              label: "Entregas Pendientes",
              value: "2",
              icon: <CalendarClock className="w-5 h-5" />,
              tint: "text-blue-300 bg-blue-500/15 border-blue-500/20",
            },
            {
              label: "Revisiones Disponibles",
              value: "Ilimitadas",
              icon: <Sparkles className="w-5 h-5" />,
              tint: "text-green-300 bg-green-500/15 border-green-500/20",
            }
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-[#111111] border border-white/10 p-6">
              <div className={"h-11 w-11 rounded-2xl border flex items-center justify-center " + s.tint}>
                {s.icon}
              </div>
              <div className="mt-4 text-[#F5F5F5]/60">{s.label}</div>
              <div className="mt-2 text-3xl font-black text-[#F5F5F5]">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Activity */}
        <div className="mt-8 rounded-2xl bg-[#111111] border border-white/10 p-3 sm:p-4">
          <div className="px-3 pt-2 pb-3">
            <h2 className="text-xl font-black text-[#F5F5F5] tracking-tight">Actividad Reciente</h2>
          </div>

          <div className="space-y-2">
            {activities.map((a) => (
              <button
                key={a.title}
                type="button"
                onClick={() => goTo(a.requestId)}
                className="w-full flex items-center justify-between gap-4 rounded-xl bg-white/[0.02] border border-white/10 px-4 py-4 hover:bg-white/[0.04] transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={"h-10 w-10 rounded-full border flex items-center justify-center shrink-0 " + typeToTint[a.type]}>
                    {typeToIcon[a.type]}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[#F5F5F5] font-semibold truncate">{a.title}</div>
                    <div className="text-[#F5F5F5]/45 text-sm mt-0.5">{a.time}</div>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Ver request"
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(a.requestId);
                  }}
                  className="shrink-0 h-10 w-10 rounded-full bg-white/[0.03] border border-white/10 text-[#F5F5F5]/75 flex items-center justify-center hover:bg-white/[0.06] transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </button>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="relative overflow-hidden rounded-2xl bg-[#111111] border border-white/10 p-6">
            <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#B454FF]/12 blur-[70px]" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-[#B454FF]/15 border border-[#B454FF]/25 flex items-center justify-center text-[#B454FF]">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[#F5F5F5] font-black text-lg">Crear Nuevo Request</div>
                  <div className="text-[#F5F5F5]/55 text-sm mt-0.5">Describe tu próximo proyecto creativo</div>
                </div>
              </div>

              <div className="mt-5">
                <PremiumButton
                  variant="primary"
                  size="md"
                  className="rounded-xl"
                  onClick={() => navigate("/dashboard/new")}
                >
                  Empezar Ahora
                </PremiumButton>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-[#111111] border border-white/10 p-6">
            <div aria-hidden className="pointer-events-none absolute -top-24 -right-28 h-72 w-72 rounded-full bg-blue-500/10 blur-[80px]" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center text-blue-300">
                  <Clock3 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[#F5F5F5] font-black text-lg">¿Necesitas Ayuda?</div>
                  <div className="text-[#F5F5F5]/55 text-sm mt-0.5">Nuestro equipo está listo para asistirte</div>
                </div>
              </div>

              <div className="mt-5">
                <PremiumButton
                  variant="glass"
                  size="md"
                  className="rounded-xl text-[#F5F5F5]"
                  onClick={() => navigate("/dashboard/support")}
                >
                  Contactar Soporte
                </PremiumButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default Dashboard;