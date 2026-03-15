"use client";

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PortalLayout from "@/components/dashboard/PortalLayout";
import PremiumButton from "@/components/PremiumButton";
import { Plus, Flag, Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as DateCalendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { showSuccess } from "@/utils/toast";
import { useRequests } from "@/hooks/use-requests";
import type { RequestStatus, Priority } from "@/providers/RequestsProvider";

// Utilidad simple para formatear fecha a YYYY-MM-DD sin problemas de zona horaria
const toISODate = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
};

const statusOptions: { value: RequestStatus; label: string }[] = [
  { value: "in-progress", label: "En Progreso" },
  { value: "review", label: "En Revisión" },
  { value: "completed", label: "Completado" },
];

const priorityOptions: { value: Priority; label: string }[] = [
  { value: "alta", label: "Alta" },
  { value: "media", label: "Media" },
  { value: "baja", label: "Baja" },
];

const prioColor: Record<Priority, string> = {
  alta: "text-red-300",
  media: "text-yellow-300",
  baja: "text-sky-300",
};

const statusColor: Record<RequestStatus, string> = {
  "in-progress": "text-sky-300",
  review: "text-amber-300",
  completed: "text-green-300",
};

const Requests = () => {
  const navigate = useNavigate();
  const { items, updateFields, addActivity } = useRequests();
  const [filter, setFilter] = useState<"all" | RequestStatus>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((r) => r.status === filter);
  }, [items, filter]);

  const onChangeStatus = (id: string, value: RequestStatus) => {
    updateFields(id, { status: value });
    addActivity(id, { type: "update", text: "Estado actualizado", time: new Date().toLocaleString() });
    showSuccess("Estado actualizado.");
  };

  const onChangePriority = (id: string, value: Priority) => {
    updateFields(id, { priority: value });
    addActivity(id, { type: "update", text: "Prioridad actualizada", time: new Date().toLocaleString() });
    showSuccess("Prioridad actualizada.");
  };

  const onChangeDate: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name: id, value } = e.target;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return;
    updateFields(id, { date: value });
    addActivity(id, { type: "update", text: "Fecha límite actualizada", time: new Date().toLocaleString() });
    showSuccess("Fecha actualizada.");
  };

  return (
    <PortalLayout>
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#F5F5F5] tracking-tight">Mis Requests</h1>
          <p className="text-[#F5F5F5]/55 mt-1">Gestiona todas tus solicitudes creativas</p>
        </div>

        <PremiumButton
          variant="primary"
          size="md"
          className="rounded-xl w-full sm:w-auto"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => navigate("/dashboard/new")}
        >
          Nuevo Request
        </PremiumButton>
      </div>

      <div className="mt-6 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {(
          [
            { key: "all", label: "Todos" },
            { key: "in-progress", label: "En Progreso" },
            { key: "review", label: "En Revisión" },
            { key: "completed", label: "Completados" },
          ] as const
        ).map((t) => {
          const active = filter === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setFilter(t.key)}
              className={
                "h-10 px-4 rounded-lg border text-sm font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] " +
                (active
                  ? "bg-[#B454FF] border-[#B454FF] text-white"
                  : "bg-white/[0.03] border-white/10 text-[#F5F5F5]/70 hover:text-[#F5F5F5] hover:bg-white/[0.06]")
              }
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl bg-[#111111] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-full table-auto">
            <TableHeader>
              <TableRow className="hover:bg-transparent border-white/10">
                <TableHead className="text-[#F5F5F5]/55 font-semibold hidden md:table-cell w-20">ID</TableHead>
                <TableHead className="text-[#F5F5F5]/55 font-semibold min-w-[14rem]">Título</TableHead>
                <TableHead className="text-[#F5F5F5]/55 font-semibold hidden lg:table-cell">Servicio</TableHead>
                <TableHead className="text-[#F5F5F5]/55 font-semibold whitespace-nowrap">Estado</TableHead>
                <TableHead className="text-[#F5F5F5]/55 font-semibold whitespace-nowrap">Fecha límite</TableHead>
                <TableHead className="text-[#F5F5F5]/55 font-semibold whitespace-nowrap">Prioridad</TableHead>
                <TableHead className="text-right text-[#F5F5F5]/55 font-semibold">
                  <span className="sr-only">Ver Request</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id} className="border-white/10 hover:bg-white/[0.03] align-middle">
                  <TableCell className="text-[#F5F5F5]/70 font-semibold hidden md:table-cell">{r.id}</TableCell>
                  <TableCell className="text-[#F5F5F5] font-semibold min-w-0">
                    <button
                      type="button"
                      onClick={() => navigate(`/dashboard/requests/${r.id}`)}
                      className="hover:text-[#B454FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded block truncate max-w-[60vw] sm:max-w-none"
                    >
                      {r.title}
                    </button>
                  </TableCell>
                  <TableCell className="text-[#F5F5F5]/70 hidden lg:table-cell truncate">{r.service}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Select value={r.status} onValueChange={(v: RequestStatus) => onChangeStatus(r.id, v)}>
                      <SelectTrigger className="relative h-10 pl-3 pr-9 w-[14ch] inline-flex items-center rounded-full bg-white/[0.03] border-white/10 text-[#F5F5F5] focus:ring-0 focus-visible:ring-2 focus-visible:ring-[#B454FF] [&>svg]:absolute [&>svg]:right-2 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
                        <SelectValue placeholder="Estado" className="truncate" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0F0F0F] border-white/10 text-[#F5F5F5] rounded-xl shadow-2xl min-w-[12rem]">
                        {statusOptions.map((s) => (
                          <SelectItem
                            key={s.value}
                            value={s.value}
                            className="rounded-lg pl-3 pr-3 py-2.5 data-[state=checked]:bg-white/[0.06] data-[highlighted]:bg-white/[0.04] [&>span.absolute]:hidden"
                          >
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="inline-flex items-center rounded-full bg-white/[0.03] border border-white/10 focus-within:ring-2 focus-within:ring-[#B454FF]">
                      <Input
                        name={r.id}
                        type="date"
                        value={r.date}
                        onChange={onChangeDate}
                        className="h-10 w-[11ch] bg-transparent border-0 text-[#F5F5F5] pl-3 pr-2 focus-visible:ring-0 focus-visible:outline-none kin-no-native-picker"
                      />
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            aria-label="Abrir calendario"
                            className="mx-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] border border-white/10 hover:bg-white/[0.12] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                          >
                            <CalendarIcon className="w-4 h-4 text-white" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent
                          align="end"
                          className="p-2.5 w-auto bg-[#0F0F0F] border-white/10 text-[#F5F5F5] rounded-xl shadow-2xl"
                        >
                          <DateCalendar
                            mode="single"
                            selected={r.date ? new Date(r.date + 'T00:00:00') : undefined}
                            onSelect={(d) => {
                              if (!d) return;
                              const iso = toISODate(d);
                              updateFields(r.id, { date: iso });
                              addActivity(r.id, { type: 'update', text: 'Fecha límite actualizada', time: new Date().toLocaleString() });
                              showSuccess('Fecha actualizada.');
                            }}
                            initialFocus
                            className="p-2 rounded-xl"
                            classNames={{
                              month_caption: "relative flex items-center justify-center px-8",
                              caption_label: "absolute left-1/2 -translate-x-1/2 text-sm font-medium",
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Select value={r.priority} onValueChange={(v: Priority) => onChangePriority(r.id, v)}>
                      <SelectTrigger
                        className="relative h-10 w-10 p-0 inline-flex items-center justify-center rounded-full bg-white/[0.03] border-white/10 text-[#F5F5F5] focus:ring-0 focus-visible:ring-2 focus-visible:ring-[#B454FF] [&>svg:last-child]:hidden"
                        aria-label="Cambiar prioridad"
                        title={priorityOptions.find((o) => o.value === r.priority)?.label}
                      >
                        <Flag className={"w-4 h-4 " + prioColor[r.priority]} />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0F0F0F] border-white/10 text-[#F5F5F5] rounded-xl shadow-2xl min-w-[12rem]">
                        {priorityOptions.map((p) => (
                          <SelectItem
                            key={p.value}
                            value={p.value}
                            className="rounded-lg pl-3 pr-3 py-2.5 data-[state=checked]:bg-white/[0.06] data-[highlighted]:bg-white/[0.04] [&>span.absolute]:hidden"
                          >
                            <span className={"inline-flex items-center gap-2 " + prioColor[p.value]}>
                              <Flag className="w-4 h-4" />
                              {p.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      type="button"
                      onClick={() => navigate(`/dashboard/requests/${r.id}`)}
                      className="inline-flex h-9 items-center justify-center rounded-full bg-white/[0.03] border border-white/10 px-4 text-sm font-semibold text-[#F5F5F5] hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] whitespace-nowrap"
                    >
                      Ver Request
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </PortalLayout>
  );
};

export default Requests;