"use client";

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PortalLayout from "@/components/dashboard/PortalLayout";
import PremiumButton from "@/components/PremiumButton";
import { Eye, Plus, Flag, Calendar } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { showSuccess } from "@/utils/toast";
import { useRequests } from "@/hooks/use-requests";
import type { RequestStatus, Priority } from "@/providers/RequestsProvider";

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
          <Table className="min-w-full table-fixed md:table-auto">
            <TableHeader>
              <TableRow className="hover:bg-transparent border-white/10">
                <TableHead className="text-[#F5F5F5]/55 font-semibold hidden md:table-cell w-20">ID</TableHead>
                <TableHead className="text-[#F5F5F5]/55 font-semibold">Título</TableHead>
                <TableHead className="text-[#F5F5F5]/55 font-semibold hidden lg:table-cell">Servicio</TableHead>
                <TableHead className="text-[#F5F5F5]/55 font-semibold">Estado</TableHead>
                <TableHead className="text-[#F5F5F5]/55 font-semibold">Fecha límite</TableHead>
                <TableHead className="text-[#F5F5F5]/55 font-semibold">Prioridad</TableHead>
                <TableHead className="text-right text-[#F5F5F5]/55 font-semibold">Acciones</TableHead>
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
                      className="hover:text-[#B454FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded block truncate"
                    >
                      {r.title}
                    </button>
                  </TableCell>
                  <TableCell className="text-[#F5F5F5]/70 hidden lg:table-cell truncate">{r.service}</TableCell>
                  <TableCell className="w-1/5 sm:w-auto">
                    <Select value={r.status} onValueChange={(v: RequestStatus) => onChangeStatus(r.id, v)}>
                      <SelectTrigger className="h-10 px-4 w-full md:w-auto rounded-full bg-white/[0.03] border-white/10 text-[#F5F5F5] focus:ring-0 focus-visible:ring-2 focus-visible:ring-[#B454FF]">
                        <SelectValue placeholder="Estado" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111111] border-white/10 text-[#F5F5F5]">
                        {statusOptions.map((s) => (
                          <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="w-1/5 sm:w-auto">
                    <div className="relative w-full md:w-auto">
                      <Input
                        name={r.id}
                        type="date"
                        value={r.date}
                        onChange={onChangeDate}
                        className="h-10 w-full md:w-auto rounded-full bg-white/[0.03] border-white/10 text-[#F5F5F5] pl-10 pr-4 focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                      />
                      <Calendar className="w-4 h-4 text-white absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </TableCell>
                  <TableCell className="w-1/5 sm:w-auto">
                    <Select value={r.priority} onValueChange={(v: Priority) => onChangePriority(r.id, v)}>
                      <SelectTrigger className="h-10 px-4 w-full md:w-auto rounded-full bg-white/[0.03] border-white/10 text-[#F5F5F5] focus:ring-0 focus-visible:ring-2 focus-visible:ring-[#B454FF]">
                        <SelectValue placeholder="Prioridad" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111111] border-white/10 text-[#F5F5F5]">
                        {priorityOptions.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
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
                      aria-label="Ver"
                      onClick={() => navigate(`/dashboard/requests/${r.id}`)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.03] border border-white/10 text-[#B454FF] hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                    >
                      <Eye className="w-4 h-4" />
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