"use client";

import React, { useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PortalLayout from "@/components/dashboard/PortalLayout";
import PremiumButton from "@/components/PremiumButton";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Image as ImageIcon,
  MessageSquare,
  Trash2,
  UploadCloud,
  Download,
  Calendar as CalendarIcon,
  FileText,
  Film,
  Figma,
  Archive,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";
import { deliverables as allDeliverables, type Deliverable } from "@/data/deliverables";
import { useRequests } from "@/hooks/use-requests";
import type { RequestStatus, Priority, Attachment, Comment, ActivityItem } from "@/providers/RequestsProvider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as DateCalendar } from "@/components/ui/calendar";

const prioColor: Record<Priority, string> = {
  alta: "text-red-300",
  media: "text-yellow-300",
  baja: "text-sky-300",
};

const iconFor = (t: ActivityItem["type"]) => {
  if (t === "done") return <CheckCircle2 className="w-4 h-4" />;
  if (t === "review") return <Clock3 className="w-4 h-4" />;
  if (t === "progress") return <Clock3 className="w-4 h-4" />;
  if (t === "note") return <MessageSquare className="w-4 h-4" />;
  if (t === "file") return <UploadCloud className="w-4 h-4" />;
  return <CheckCircle2 className="w-4 h-4" />;
};

const tintFor = (t: ActivityItem["type"]) => {
  if (t === "done") return "bg-green-500/15 text-green-300 border-green-500/20";
  if (t === "review") return "bg-blue-500/15 text-blue-300 border-blue-500/20";
  if (t === "progress") return "bg-[#B454FF]/15 text-[#D7B3FF] border-[#B454FF]/25";
  if (t === "note") return "bg-white/10 text-[#F5F5F5] border-white/20";
  if (t === "file") return "bg-white/10 text-[#F5F5F5] border-white/20";
  return "bg-white/10 text-[#F5F5F5] border-white/20";
};

const nowLabel = () => {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `Hoy, ${hh}:${mm}`;
};

const toISODate = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
};

const RequestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { getById, updateFields, addAttachments, removeAttachment, addComment, deleteComment, addActivity } = useRequests();
  const req = getById(id);
  const notFound = !req;

  const [title, setTitle] = useState(req?.title ?? "");
  const [status, setStatus] = useState<RequestStatus>(req?.status ?? "in-progress");
  const [priority, setPriority] = useState<Priority>(req?.priority ?? "media");
  const [dueDate, setDueDate] = useState<string>(req?.date ?? "");
  const [description, setDescription] = useState(req?.description ?? "");

  const myDeliverables: Deliverable[] = useMemo(
    () => (req ? allDeliverables.filter((d) => d.requestId === req.id) : []),
    [req]
  );

  if (notFound) {
    return (
      <PortalLayout>
        <div className="px-4 py-10">
          <button
            type="button"
            onClick={() => navigate("/dashboard/requests")}
            className="text-[#B454FF] hover:text-[#C07CFF] font-semibold"
          >
            Volver a Mis Requests
          </button>
          <div className="mt-4 text-[#F5F5F5] text-lg">Request no encontrada.</div>
        </div>
      </PortalLayout>
    );
  }

  const saveMeta = () => {
    updateFields(req!.id, { title, status, priority, date: dueDate });
    addActivity(req!.id, { type: "update", text: "Metadatos actualizados (título/estado/prioridad/fecha)", time: nowLabel() });
    showSuccess("Cambios guardados.");
  };

  const saveDescription = () => {
    updateFields(req!.id, { description });
    addActivity(req!.id, { type: "update", text: "Descripción actualizada", time: nowLabel() });
    showSuccess("Descripción actualizada.");
  };

  const onUploadClick = () => fileInputRef.current?.click();

  const onFilesSelected: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const newOnes: Attachment[] = Array.from(files).map((f, idx) => {
      const isImage = f.type.startsWith("image/");
      return {
        id: `local-${Date.now()}-${idx}`,
        name: f.name,
        url: URL.createObjectURL(f),
        kind: isImage ? "image" : "file",
      };
    });
    addAttachments(req!.id, newOnes);
    showSuccess("Adjuntos añadidos.");
    e.currentTarget.value = "";
  };

  const removeAtt = (attId: string) => {
    removeAttachment(req!.id, attId);
    showSuccess("Adjunto eliminado.");
  };

  const [note, setNote] = useState("");

  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    const text = note.trim();
    if (!text) return;
    const newComment: Comment = { id: `c-${Date.now()}`, author: "Yo", text, time: nowLabel() };
    addComment(req!.id, newComment);
    setNote("");
    showSuccess("Nota enviada.");
  };

  const deleteNote = (cid: string) => {
    deleteComment(req!.id, cid);
    showSuccess("Nota eliminada.");
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

            <div className="mt-3 flex flex-col md:flex-row md:items-center gap-4 md:flex-wrap">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-[#111111] border-white/10 rounded-xl h-12 px-4 text-[#F5F5F5] text-lg font-bold tracking-tight focus-visible:ring-2 focus-visible:ring-[#B454FF] min-w-0 w-full md:w-auto"
              />
              <div className="flex items-center gap-3 shrink-0 flex-wrap w-full md:w-auto">
                <Select value={status} onValueChange={(v) => setStatus(v as RequestStatus)}>
                  <SelectTrigger className="bg-[#111111] border-white/10 rounded-full h-10 pl-4 pr-12 w-full md:w-auto text-[#F5F5F5] tracking-wide focus:ring-0 focus-visible:ring-2 focus-visible:ring-[#B454FF]">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111111] border-white/10 text-[#F5F5F5]">
                    <SelectItem value="in-progress">En Progreso</SelectItem>
                    <SelectItem value="review">En Revisión</SelectItem>
                    <SelectItem value="completed">Completado</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                  <SelectTrigger className="bg-[#111111] border-white/10 rounded-full h-10 pl-4 pr-12 w-full md:w-auto text-[#F5F5F5] tracking-wide focus:ring-0 focus-visible:ring-2 focus-visible:ring-[#B454FF]">
                    <SelectValue placeholder="Prioridad" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111111] border-white/10 text-[#F5F5F5]">
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="baja">Baja</SelectItem>
                  </SelectContent>
                </Select>

                <div className="relative w-full md:w-auto">
                  <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="bg-[#111111] border-white/10 rounded-full h-10 pl-4 pr-11 text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-[#B454FF] w-full md:w-auto kin-no-native-picker"
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        aria-label="Abrir calendario"
                        className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] border border-white/10 hover:bg-white/[0.12] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
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
                          const iso = toISODate(d);
                          setDueDate(iso);
                        }}
                        initialFocus
                        className="rounded-xl"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <PremiumButton
                  variant="primary"
                  size="md"
                  className="rounded-full w-full md:w-auto"
                  onClick={saveMeta}
                >
                  Guardar cambios
                </PremiumButton>
              </div>
            </div>

            <div className="mt-1 text-[#F5F5F5]/55">
              ID {req!.id} · {req!.service} · <span className={prioColor[priority]}>Prioridad {priority}</span>
            </div>
          </div>
        </div>

        {/* Layout principal */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Descripción */}
            <section className="rounded-2xl bg-[#111111] border border-white/10 p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <div className="text-[#F5F5F5] font-bold">Descripción</div>
                <PremiumButton
                  variant="glass"
                  size="sm"
                  className="text-[#F5F5F5]"
                  onClick={saveDescription}
                >
                  Guardar
                </PremiumButton>
              </div>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe con detalle el alcance, objetivos, referencias, etc."
                className="mt-4 bg-[#0D0D0D] border-white/10 rounded-2xl min-h-[170px] text-[#F5F5F5] placeholder:text-[#F5F5F5]/35 focus-visible:ring-2 focus-visible:ring-[#B454FF]"
              />
            </section>

            {/* Entregables (Kinetora) */}
            <section className="rounded-2xl bg-[#111111] border border-white/10 p-6">
              <div className="text-[#F5F5F5] font-bold">Entregables</div>
              <p className="text-[#F5F5F5]/60 text-sm mt-1">Trabajo entregado por Kinetora para esta request.</p>

              {myDeliverables.length === 0 ? (
                <div className="mt-4 text-[#F5F5F5]/60 text-sm">Todavía no hay entregables.</div>
              ) : (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {myDeliverables.map((it) => (
                    <div
                      key={it.id}
                      className="rounded-xl overflow-hidden border border-white/10 bg-[#0D0D0D]"
                    >
                      <div className="aspect-video relative">
                        <img src={it.previewUrl} className="absolute inset-0 h-full w-full object-cover opacity-90" alt="" />
                        <div className="absolute inset-0 bg-black/25" />
                      </div>
                      <div className="p-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="h-8 w-8 rounded-lg bg-white/[0.03] border border-white/10 text-[#F5F5F5]/80 flex items-center justify-center">
                            {it.kind === "figma" ? <Figma className="w-4 h-4" /> : it.kind === "video" ? <Film className="w-4 h-4" /> : it.kind === "pdf" ? <FileText className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
                          </div>
                          <div className="min-w-0">
                            <div className="truncate text-[#F5F5F5]/85 text-sm">{it.name}</div>
                            <div className="text-[#F5F5F5]/45 text-xs">{it.category}</div>
                          </div>
                        </div>
                        <a
                          href={it.previewUrl}
                          download={it.name}
                          className="inline-flex h-8 px-3 items-center justify-center rounded-full bg-white/[0.03] border border-white/10 text-[#F5F5F5]/90 hover:bg-white/[0.06] transition-colors text-xs"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Descargar
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Tus adjuntos */}
            <section className="rounded-2xl bg-[#111111] border border-white/10 p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <div className="text-[#F5F5F5] font-bold">Tus adjuntos</div>
                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={onFilesSelected}
                    className="hidden"
                  />
                  <PremiumButton
                    type="button"
                    variant="primary"
                    size="sm"
                    className="rounded-full"
                    leftIcon={<UploadCloud className="w-4 h-4" />}
                    onClick={onUploadClick}
                  >
                    Añadir adjunto
                  </PremiumButton>
                </div>
              </div>

              {req!.attachments.length === 0 ? (
                <div className="mt-5 rounded-2xl border border-dashed border-white/15 bg-[#0D0D0D] p-8 text-center">
                  <div className="mx-auto h-12 w-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#F5F5F5]/80">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div className="mt-3 text-[#F5F5F5]/70 font-semibold">No hay archivos. Sube alguno para empezar.</div>
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {req!.attachments.map((att) => (
                    <div
                      key={att.id}
                      className="rounded-xl overflow-hidden border border-white/10 bg-[#0D0D0D] group"
                    >
                      <div className="aspect-video relative">
                        {att.kind === "image" ? (
                          <img src={att.url} className="absolute inset-0 h-full w-full object-cover opacity-90" alt="" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-14 w-14 rounded-2xl bg-white/[0.06] border border-white/15 flex items-center justify-center text-[#F5F5F5]/85">
                              <ImageIcon className="w-6 h-6" />
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/25" />
                      </div>
                      <div className="p-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="h-8 w-8 rounded-lg bg-white/[0.03] border border-white/10 text-[#F5F5F5]/80 flex items-center justify-center">
                            <ImageIcon className="w-4 h-4" />
                          </div>
                          <div className="truncate text-[#F5F5F5]/85 text-sm">{att.name}</div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={att.url}
                            download={att.name}
                            className="inline-flex h-8 px-3 items-center justify-center rounded-full bg-white/[0.03] border border-white/10 text-[#F5F5F5]/90 hover:bg-white/[0.06] transition-colors text-xs"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Descargar
                          </a>
                          <button
                            type="button"
                            onClick={() => removeAtt(att.id)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.03] border border-white/10 text-[#F5F5F5]/80 hover:bg-white/[0.06] transition-colors"
                            aria-label="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Notas */}
            <section id="notes" className="rounded-2xl bg-[#111111] border border-white/10 p-6 sm:p-7">
              <div className="text-[#F5F5F5] font-bold">Notas</div>
              <p className="text-[#F5F5F5]/60 text-sm mt-1">
                Deja comentarios, feedback o tareas para este request.
              </p>
              <Separator className="my-4 bg-white/10" />
              <form onSubmit={addNote} className="space-y-4">
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Escribe tu nota para el equipo..."
                  className="bg-[#0D0D0D] border-white/10 rounded-2xl min-h-[130px] text-[#F5F5F5] placeholder:text-[#F5F5F5]/35 focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                />
                <div className="flex items-center justify-end">
                  <PremiumButton type="submit" variant="primary" size="md" className="rounded-xl">
                    Enviar Nota
                  </PremiumButton>
                </div>
              </form>
              {req!.comments.length > 0 && (
                <div className="mt-6 space-y-4">
                  {req!.comments.map((c) => (
                    <div key={c.id} className="rounded-xl bg:white/[0.02] border border-white/10 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-[#B454FF] text:white flex items-center justify-center font-black text-[12px]">
                            {c.author === "Yo" ? "YO" : c.author.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </div>
                          <div>
                            <div className="text-[#F5F5F5] font-semibold">{c.author}</div>
                            <div className="text-[#F5F5F5]/55 text-xs">{c.time}</div>
                          </div>
                        </div>
                        {c.author === "Yo" && (
                          <button
                            type="button"
                            onClick={() => deleteNote(c.id)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.03] border border-white/10 text-[#F5F5F5]/80 hover:bg-white/[0.06] transition-colors"
                            aria-label="Eliminar nota"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div className="mt-3 text-[#F5F5F5]/85 leading-relaxed">{c.text}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Actividad */}
          <div className="rounded-2xl bg-[#111111] border border-white/10 p-6">
            <div className="text-[#F5F5F5] font-bold">Actividad</div>
            <div className="mt-4 space-y-3">
              {req!.activity.map((a, i) => (
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
              {req!.activity.length === 0 && (
                <div className="text-[#F5F5F5]/55 text-sm">Sin actividad todavía.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default RequestDetail;