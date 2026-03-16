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
import { useNotifications } from "@/hooks/use-notifications";
import { useI18n } from "@/i18n/I18nProvider";

type ServiceKey = "branding" | "uiux" | "web" | "motion" | "video" | "other";

type ServiceOption = {
  key: ServiceKey;
  label: string;
  icon: React.ReactNode;
};

const toISODate = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
};

const NewRequest = () => {
  const { lang } = useI18n();
  const navigate = useNavigate();

  const copy =
    lang === "es"
      ? {
          title: "Crear nuevo request",
          sub: "Describe tu proyecto y lo haremos realidad en 48h",
          serviceType: "Tipo de servicio",
          projectTitle: "Título del proyecto",
          projectTitlePh: "Ej: Rediseño de landing page para conversión",
          description: "Descripción detallada",
          descriptionPh:
            "Describe tu proyecto con el máximo detalle posible. Incluye objetivos, público objetivo, referencias, etc.",
          chars: "caracteres",
          priority: "Prioridad",
          priorityPh: "Selecciona prioridad",
          prioLow: "Baja",
          prioMed: "Media",
          prioHigh: "Alta",
          due: "Fecha límite (opcional)",
          openCalendar: "Abrir calendario",
          attachments: "Archivos adjuntos",
          drag: "Arrastra archivos aquí o haz clic para seleccionar",
          formats: "PDF, PNG, JPG, MP4 (máx. 50MB)",
          selectFiles: "Seleccionar archivos",
          submit: "Enviar request",
          draft: "Guardar borrador",
          draftToast: "Borrador guardado (demo).",
          createdToast: "¡Request creado! Abriendo el detalle…",
          notificationTitle: (t: string) => `Nuevo request creado: ${t}`,
          now: "ahora",
          services: {
            branding: "Branding & Identidad",
            uiux: "UX/UI Design",
            web: "Desarrollo web",
            motion: "Motion graphics",
            video: "Edición de vídeo",
            other: "Otro",
          },
        }
      : {
          title: "Create a new request",
          sub: "Describe your project and we'll deliver in 48h",
          serviceType: "Service type",
          projectTitle: "Project title",
          projectTitlePh: "e.g. Landing page redesign for conversion",
          description: "Detailed description",
          descriptionPh:
            "Describe your project with as much detail as possible. Include goals, audience, references, etc.",
          chars: "characters",
          priority: "Priority",
          priorityPh: "Select priority",
          prioLow: "Low",
          prioMed: "Medium",
          prioHigh: "High",
          due: "Due date (optional)",
          openCalendar: "Open calendar",
          attachments: "Attachments",
          drag: "Drag files here or click to select",
          formats: "PDF, PNG, JPG, MP4 (max 50MB)",
          selectFiles: "Select files",
          submit: "Submit request",
          draft: "Save draft",
          draftToast: "Draft saved (demo).",
          createdToast: "Request created! Opening details…",
          notificationTitle: (t: string) => `New request created: ${t}`,
          now: "now",
          services: {
            branding: "Brand identity",
            uiux: "UX/UI design",
            web: "Web development",
            motion: "Motion graphics",
            video: "Video editing",
            other: "Other",
          },
        };

  const services: ServiceOption[] = useMemo(
    () => [
      { key: "branding", label: copy.services.branding, icon: <Palette className="w-4 h-4" /> },
      { key: "uiux", label: copy.services.uiux, icon: <Briefcase className="w-4 h-4" /> },
      { key: "web", label: copy.services.web, icon: <Code2 className="w-4 h-4" /> },
      { key: "motion", label: copy.services.motion, icon: <Film className="w-4 h-4" /> },
      { key: "video", label: copy.services.video, icon: <Film className="w-4 h-4" /> },
      { key: "other", label: copy.services.other, icon: <MoreHorizontal className="w-4 h-4" /> },
    ],
    [copy]
  );

  const [service, setService] = useState<ServiceKey | null>("uiux");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("media");
  const [dueDate, setDueDate] = useState("");
  const { createRequest } = useRequests();
  const { add: addNotification } = useNotifications();

  const maxChars = 500;
  const charsLeft = maxChars - message.length;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const sel = services.find((s) => s.key === service);
    const serviceLabel = sel?.label ?? copy.services.other;

    const newId = createRequest({
      title: title.trim(),
      service: serviceLabel,
      status: "in-progress",
      date: dueDate || "",
      priority: priority as any,
      description: message.trim(),
    });

    addNotification({
      id: `N-${Date.now()}`,
      title: copy.notificationTitle(title.trim() || serviceLabel),
      time: copy.now,
      read: false,
      type: "message",
      requestId: newId,
    });

    showSuccess(copy.createdToast);
    navigate(`/dashboard/requests/${newId}`, { replace: true });
  };

  return (
    <PortalLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-black text-[#F5F5F5] tracking-tight">{copy.title}</h1>
          <p className="text-[#F5F5F5]/55 mt-1">{copy.sub}</p>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-6">
          <section className="rounded-2xl bg-[#111111] border border-white/10 p-6">
            <div className="text-[#F5F5F5] font-bold">{copy.serviceType}</div>
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
            <Label className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">{copy.projectTitle}</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={copy.projectTitlePh}
              className="mt-3 bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5] placeholder:text-[#F5F5F5]/35 focus-visible:ring-2 focus-visible:ring-[#B454FF]"
              required
            />
          </section>

          <section className="rounded-2xl bg-[#111111] border border-white/10 p-6">
            <Label className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">{copy.description}</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, maxChars))}
              placeholder={copy.descriptionPh}
              className="mt-3 bg-[#0D0D0D] border-white/10 rounded-2xl min-h-[170px] text-[#F5F5F5] placeholder:text-[#F5F5F5]/35 focus-visible:ring-2 focus-visible:ring-[#B454FF]"
              required
            />
            <div className="mt-2 text-sm text-[#F5F5F5]/45">
              {charsLeft}/{maxChars} {copy.chars}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="rounded-2xl bg-[#111111] border border-white/10 p-6">
              <Label className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">{copy.priority}</Label>
              <div className="mt-3">
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="bg-[#0D0D0D] border-white/10 rounded-xl h-12 pl-4 pr-12 text-[#F5F5F5] tracking-wider focus:ring-0 focus-visible:ring-2 focus-visible:ring-[#B454FF]">
                    <SelectValue placeholder={copy.priorityPh} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111111] border-white/10 text-[#F5F5F5]">
                    <SelectItem value="baja">{copy.prioLow}</SelectItem>
                    <SelectItem value="media">{copy.prioMed}</SelectItem>
                    <SelectItem value="alta">{copy.prioHigh}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </section>

            <section className="rounded-2xl bg-[#111111] border border-white/10 p-6">
              <Label className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">{copy.due}</Label>
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
                      aria-label={copy.openCalendar}
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
            <div className="text-[#F5F5F5] font-bold">{copy.attachments}</div>
            <div className="mt-4 rounded-2xl border border-dashed border-white/15 bg-[#0D0D0D] p-6 text-center">
              <div className="mx-auto h-12 w-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#F5F5F5]/80">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div className="mt-3 text-[#F5F5F5]/70 font-semibold">{copy.drag}</div>
              <div className="mt-1 text-sm text-[#F5F5F5]/45">{copy.formats}</div>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex h-10 items-center justify-center px-4 rounded-xl bg-white/[0.03] border border-white/10 text-[#F5F5F5]/85 hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                >
                  {copy.selectFiles}
                </button>
              </div>
            </div>
          </section>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <PremiumButton type="submit" variant="primary" size="md" className="rounded-xl w-full">
              {copy.submit}
            </PremiumButton>
            <PremiumButton
              type="button"
              variant="glass"
              size="md"
              className="rounded-xl w-full text-[#F5F5F5]"
              onClick={() => showSuccess(copy.draftToast)}
            >
              {copy.draft}
            </PremiumButton>
          </div>

          <input type="hidden" value={service ?? ""} readOnly />
        </form>
      </div>
    </PortalLayout>
  );
};

export default NewRequest;