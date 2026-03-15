"use client";

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PortalLayout from "@/components/dashboard/PortalLayout";
import PremiumButton from "@/components/PremiumButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";
import { Briefcase, Palette, Film, Code2, MoreHorizontal, UploadCloud, Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as DateCalendar } from "@/components/ui/calendar";
import { useRequests } from "@/hooks/use-requests";

type ServiceKey = "branding" | "uiux" | "web" | "motion" | "video" | "other";

type ServiceOption = {
  key: ServiceKey;
  label: string;
  icon: React.ReactNode;
};

// Helper to normalize a Date to YYYY-MM-DD (avoids TZ issues)
const toISODate = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
};

const NewRequest = () => {
  const navigate = useNavigate();
  const services: ServiceOption[] = useMemo(
    () => [
      { key: "branding", label: "Branding & Identidad", icon: <Palette className="w-4 h-4" /> },
      { key: "uiux", label: "UX/UI Design", icon: <Briefcase className="w-4 h-4" /> },
      { key: "web", label: "Desarrollo Web", icon: <Code2 className="w-4 h-4" /> },
      { key: "motion", label: "Motion Graphics", icon: <Film className="w-4 h-4" /> },
      { key: "video", label: "Edición de Video", icon: <Film className="w-4 h-4" /> },
      { key: "other", label: "Otro", icon: <MoreHorizontal className="w-4 h-4" /> },
    ],
    []
  );

  const [service, setService] = useState<ServiceKey | null>("uiux");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("media");
  const [dueDate, setDueDate] = useState("");
  const { createRequest } = useRequests();

  const maxChars = 500;
  const charsLeft = maxChars - message.length;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const sel = services.find((s) => s.key === service);
    const serviceLabel = sel?.label ?? "Otro";
    const newId = createRequest({
      title: title.trim(),
      service: serviceLabel,
      status: "in-progress",
      date: dueDate || "",
      priority: priority as any,
      description: message.trim(),
    });
    showSuccess("¡Request creado! Abriendo el detalle…");
    navigate(`/dashboard/requests/${newId}`, { replace: true });
  };

  return (
    <PortalLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-black text-[#F5F5F5] tracking-tight">Crear Nuevo Request</h1>
          <p className="text-[#F5F5F5]/55 mt-1">Describe tu proyecto y lo haremos realidad en 48h</p>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-6">
          <section className="rounded-2xl bg-[#111111] border border-white/10 p-6">
            <div className="text-[#F5F5F5] font-bold">Tipo de Servicio</div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {services.map((s) => {
                const active = service === s.key;
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setService(s.key)}
                    className={
                      "flex items-center justify-between gap-3 rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] " +
                      (active
                        ? "bg-[#B454FF]/14 border-[#B454FF]/30 text-[#F5F5F5]"
                        : "bg-white/[0.02] border-white/10 text-[#F5F5F5]/75 hover:text-[#F5F5F5] hover:bg-white/[0.04]")
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={
                          "h-9 w-9 rounded-lg flex items-center justify-center border " +
                          (active
                            ? "bg-[#B454FF]/15 border-[#B454FF]/30 text-[#B454FF]"
                            : "bg-white/[0.03] border-white/10 text-[#F5F5F5]/70")
                        }
                      >
                        {s.icon}
                      </div>
                      <div className="font-semibold">{s.label}</div>
                    </div>
                    <span
                      aria-hidden
                      className={
                        "h-2.5 w-2.5 rounded-full " +
                        (active ? "bg-[#B454FF]" : "bg-white/15")
                      }
                    />
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl bg-[#111111] border border-white/10 p-6">
            <Label className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">Título del Proyecto</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Rediseño de landing page para conversión"
              className="mt-3 bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5] placeholder:text-[#F5F5F5]/35 focus-visible:ring-2 focus-visible:ring-[#B454FF]"
              required
            />
          </section>

          <section className="rounded-2xl bg-[#111111] border border-white/10 p-6">
            <Label className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">Descripción Detallada</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, maxChars))}
              placeholder="Describe tu proyecto con el máximo detalle posible. Incluye objetivos, público objetivo, referencias, etc."
              className="mt-3 bg-[#0D0D0D] border-white/10 rounded-2xl min-h-[170px] text-[#F5F5F5] placeholder:text-[#F5F5F5]/35 focus-visible:ring-2 focus-visible:ring-[#B454FF]"
              required
            />
            <div className="mt-2 text-sm text-[#F5F5F5]/45">{charsLeft}/{maxChars} caracteres</div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="rounded-2xl bg-[#111111] border border-white/10 p-6">
              <Label className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">Prioridad</Label>
              <div className="mt-3">
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="bg-[#0D0D0D] border-white/10 rounded-xl h-12 pl-4 pr-12 text-[#F5F5F5] tracking-wider focus:ring-0 focus-visible:ring-2 focus-visible:ring-[#B454FF]">
                    <SelectValue placeholder="Selecciona prioridad" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111111] border-white/10 text-[#F5F5F5]">
                    <SelectItem value="baja">Baja</SelectItem>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </section>

            <section className="rounded-2xl bg-[#111111] border border-white/10 p-6">
              <Label className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">Fecha Límite (Opcional)</Label>
              <div className="mt-3 relative w-full sm:w-[260px]">
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="bg-[#0D0D0D] border-white/10 rounded-xl h-12 pl-4 pr-12 text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-[#B454FF] kin-no-native-picker w-full"
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      aria-label="Abrir calendario"
                      className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] border border-white/10 hover:bg-white/[0.12] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                    >
                      <CalendarIcon className="w-4 h-4 text-white" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="end"
                    className="p-0 bg-[#111111] border-white/10 text-[#F5F5F5] rounded-xl shadow-xl"
                  >
                    <DateCalendar
                      mode="single"
                      selected={dueDate ? new Date(dueDate + "T00:00:00") : undefined}
                      onSelect={(d) => {
                        if (!d) return;
                        setDueDate(toISODate(d));
                      }}
                      initialFocus
                      className="rounded-xl"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </section>
          </div>

          <section className="rounded-2xl bg-[#111111] border border-white/10 p-6">
            <div className="text-[#F5F5F5] font-bold">Archivos Adjuntos</div>
            <div className="mt-4 rounded-2xl border border-dashed border-white/15 bg-[#0D0D0D] p-6 text-center">
              <div className="mx-auto h-12 w-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#F5F5F5]/80">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div className="mt-3 text-[#F5F5F5]/70 font-semibold">Arrastra archivos aquí o haz clic para seleccionar</div>
              <div className="mt-1 text-sm text-[#F5F5F5]/45">PDF, PNG, JPG, MP4 (máx. 50MB)</div>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex h-10 items-center justify-center px-4 rounded-xl bg-white/[0.03] border border-white/10 text-[#F5F5F5]/85 hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                >
                  Seleccionar Archivos
                </button>
              </div>
            </div>
          </section>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <PremiumButton type="submit" variant="primary" size="md" className="rounded-xl w-full">
              Enviar Request
            </PremiumButton>
            <PremiumButton
              type="button"
              variant="glass"
              size="md"
              className="rounded-xl w-full text-[#F5F5F5]"
              onClick={() => showSuccess("Borrador guardado (demo).")}
            >
              Guardar Borrador
            </PremiumButton>
          </div>

          <input type="hidden" value={service ?? ""} readOnly />
        </form>
      </div>
    </PortalLayout>
  );
};

export default NewRequest;