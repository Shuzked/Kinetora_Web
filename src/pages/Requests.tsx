"use client";

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PortalLayout from "@/components/dashboard/PortalLayout";
import PremiumButton from "@/components/PremiumButton";
import { Eye, Plus, Flag } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type RequestStatus = "completed" | "in-progress" | "review";

type RequestRow = {
  id: string;
  title: string;
  service: string;
  status: RequestStatus;
  date: string;
  priority: "alta" | "media" | "baja";
};

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

const priorityPill: Record<RequestRow["priority"], { label: string; className: string }> = {
  alta: { label: "Alta", className: "text-red-300" },
  media: { label: "Media", className: "text-yellow-300" },
  baja: { label: "Baja", className: "text-sky-300" },
};

const Requests = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | RequestStatus>("all");

  const rows: RequestRow[] = useMemo(
    () => [
      {
        id: "REQ-001",
        title: "Diseño de Landing Page",
        service: "UX/UI Design",
        status: "completed",
        date: "15 Ene 2025",
        priority: "alta",
      },
      {
        id: "REQ-002",
        title: "Vídeo AD para Instagram",
        service: "Motion Graphics",
        status: "review",
        date: "16 Ene 2025",
        priority: "media",
      },
      {
        id: "REQ-003",
        title: "Pitch Deck para Inversores",
        service: "Branding",
        status: "in-progress",
        date: "17 Ene 2025",
        priority: "alta",
      },
      {
        id: "REQ-004",
        title: "Rediseño de Logo",
        service: "Branding",
        status: "in-progress",
        date: "18 Ene 2025",
        priority: "baja",
      },
      {
        id: "REQ-005",
        title: "Desarrollo Web E-commerce",
        service: "Desarrollo Web",
        status: "completed",
        date: "10 Ene 2025",
        priority: "media",
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    if (filter === "all") return rows;
    return rows.filter((r) => r.status === filter);
  }, [rows, filter]);

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
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-white/10">
                <TableHead className="text-[#F5F5F5]/55 font-semibold">ID</TableHead>
                <TableHead className="text-[#F5F5F5]/55 font-semibold">Título</TableHead>
                <TableHead className="text-[#F5F5F5]/55 font-semibold">Servicio</TableHead>
                <TableHead className="text-[#F5F5F5]/55 font-semibold">Estado</TableHead>
                <TableHead className="text-[#F5F5F5]/55 font-semibold">Fecha</TableHead>
                <TableHead className="text-[#F5F5F5]/55 font-semibold">Prioridad</TableHead>
                <TableHead className="text-right text-[#F5F5F5]/55 font-semibold">Acciones</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.map((r) => {
                const status = statusPill[r.status];
                const prio = priorityPill[r.priority];
                return (
                  <TableRow key={r.id} className="border-white/10 hover:bg-white/[0.03]">
                    <TableCell className="text-[#F5F5F5]/70 font-semibold">{r.id}</TableCell>
                    <TableCell className="text-[#F5F5F5] font-semibold">
                      <button
                        type="button"
                        onClick={() => navigate(`/dashboard/requests/${r.id}`)}
                        className="hover:text-[#B454FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded"
                      >
                        {r.title}
                      </button>
                    </TableCell>
                    <TableCell className="text-[#F5F5F5]/70">{r.service}</TableCell>
                    <TableCell>
                      <span className={"inline-flex items-center h-7 px-3 rounded-full border text-xs font-semibold " + status.className}>
                        {status.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-[#F5F5F5]/70">{r.date}</TableCell>
                    <TableCell>
                      <span className={"inline-flex items-center gap-2 text-sm font-semibold " + prio.className}>
                        <Flag className="w-4 h-4" />
                        {prio.label}
                      </span>
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
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </PortalLayout>
  );
};

export default Requests;