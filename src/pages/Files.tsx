"use client";

import React, { useMemo, useState } from "react";
import PortalLayout from "@/components/dashboard/PortalLayout";
import { Grid2X2, List, FileText, Film, Figma, Archive, ArrowRight, Download } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { deliverables, type Deliverable } from "@/data/deliverables";
import { useI18n } from "@/i18n/I18nProvider";

const Files = () => {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const [view, setView] = useState<"grid" | "list">("grid");

  const ui =
    lang === "es"
      ? {
          title: "Archivos",
          sub: "Trabajo entregado por Kinetora (entregables por request)",
          grid: "Vista grid",
          list: "Vista lista",
          download: "Descargar",
          viewRequest: "Ver Request",
        }
      : {
          title: "Files",
          sub: "Work delivered by Kinetora (deliverables per request)",
          grid: "Grid view",
          list: "List view",
          download: "Download",
          viewRequest: "View request",
        };

  const items: Deliverable[] = useMemo(() => deliverables, []);

  const iconFor = (k: Deliverable["kind"]) => {
    switch (k) {
      case "figma":
        return <Figma className="w-4 h-4" />;
      case "video":
        return <Film className="w-4 h-4" />;
      case "pdf":
        return <FileText className="w-4 h-4" />;
      default:
        return <Archive className="w-4 h-4" />;
    }
  };

  return (
    <PortalLayout>
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#F5F5F5] tracking-tight">{ui.title}</h1>
          <p className="text-[#F5F5F5]/55 mt-1">{ui.sub}</p>
        </div>

        <div className="inline-flex rounded-xl bg-white/[0.03] border border-white/10 p-1">
          <button
            type="button"
            onClick={() => setView("grid")}
            className={
              "h-10 w-11 rounded-lg flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] " +
              (view === "grid"
                ? "bg-[#B454FF] text-white"
                : "text-[#F5F5F5]/70 hover:text-[#F5F5F5] hover:bg-white/[0.06]")
            }
            aria-label={ui.grid}
          >
            <Grid2X2 className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            className={
              "h-10 w-11 rounded-lg flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] " +
              (view === "list"
                ? "bg-[#B454FF] text-white"
                : "text-[#F5F5F5]/70 hover:text-[#F5F5F5] hover:bg-white/[0.06]")
            }
            aria-label={ui.list}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className={"mt-8 grid gap-6 " + (view === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1")}>
        {items.map((it) => (
          <div
            key={it.id}
            className="rounded-2xl bg-[#111111] border border-white/10 overflow-hidden hover:border-[#B454FF]/25 transition-colors"
          >
            <div className="aspect-[16/9] bg-[#0D0D0D] relative">
              <img
                src={it.previewUrl}
                alt=""
                className="h-full w-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute top-3 left-3">
                <Link
                  to={`/dashboard/requests/${it.requestId}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#B454FF]/16 border border-[#B454FF]/30 text-[#D7B3FF] text-[11px] font-extrabold tracking-widest uppercase hover:bg-[#B454FF]/22 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                >
                  {it.requestId}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 max-w-full">
                  <div className="text-[#F5F5F5] font-semibold truncate" title={it.name}>{it.name}</div>
                  <div className="text-[#F5F5F5]/55 text-sm mt-0.5">{it.category}</div>
                </div>
                <div className="shrink-0 h-9 w-9 rounded-xl bg-white/[0.03] border border-white/10 text-[#F5F5F5]/80 flex items-center justify-center">
                  {iconFor(it.kind)}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-[#F5F5F5]/45">
                <div>{it.size}</div>
                <div>{it.date}</div>
              </div>

              <div className="mt-4 flex items-center justify-end gap-2">
                <a
                  href={it.previewUrl}
                  download={it.name}
                  className="inline-flex h-9 items-center justify-center px-3 rounded-full bg-white/[0.03] border border-white/10 text-[#F5F5F5]/85 hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {ui.download}
                </a>
                <button
                  type="button"
                  onClick={() => navigate(`/dashboard/requests/${it.requestId}`)}
                  className="inline-flex h-9 items-center justify-center px-3 rounded-full bg-[#B454FF] text-white font-semibold hover:bg-[#A74CFF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                >
                  {ui.viewRequest}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PortalLayout>
  );
};

export default Files;