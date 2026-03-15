"use client";

import React, { useMemo, useState } from "react";
import PortalLayout from "@/components/dashboard/PortalLayout";
import { Grid2X2, List, FileText, Film, Figma, Archive, ArrowRight, Download } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

type FileItem = {
  name: string;
  category: string;
  size: string;
  date: string;
  previewUrl: string;
  kind: "figma" | "video" | "pdf" | "zip";
  requestId: string;
};

const Files = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<"grid" | "list">("grid");

  const items: FileItem[] = useMemo(
    () => [
      {
        name: "Landing_Page_Final.fig",
        category: "Landing Page",
        size: "12.5 MB",
        date: "15 Ene 2025",
        previewUrl: "/assets/portfolio/elixir-token.webp",
        kind: "figma",
        requestId: "REQ-001",
      },
      {
        name: "Instagram_AD_v2.mp4",
        category: "Vídeo AD",
        size: "45.2 MB",
        date: "16 Ene 2025",
        previewUrl: "/assets/portfolio/cybertitans-clash.webp",
        kind: "video",
        requestId: "REQ-002",
      },
      {
        name: "Pitch_Deck_Inversores.pdf",
        category: "Pitch Deck",
        size: "8.7 MB",
        date: "17 Ene 2025",
        previewUrl: "/assets/portfolio/chronosworlds.webp",
        kind: "pdf",
        requestId: "REQ-003",
      },
      {
        name: "Logo_Kinetora_Pack.zip",
        category: "Branding",
        size: "25.1 MB",
        date: "10 Ene 2025",
        previewUrl: "/assets/portfolio/dunk-elixir.webp",
        kind: "zip",
        requestId: "REQ-004",
      },
      {
        name: "Web_Ecommerce_Assets.zip",
        category: "Desarrollo Web",
        size: "67.3 MB",
        date: "10 Ene 2025",
        previewUrl: "/assets/portfolio/elixir-token.webp",
        kind: "zip",
        requestId: "REQ-005",
      },
      {
        name: "Social_Media_Templates.fig",
        category: "Social Media",
        size: "18.9 MB",
        date: "12 Ene 2025",
        previewUrl: "/assets/portfolio/cybertitans-clash.webp",
        kind: "figma",
        requestId: "REQ-003",
      },
    ],
    []
  );

  const iconFor = (k: FileItem["kind"]) => {
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
          <h1 className="text-3xl font-black text-[#F5F5F5] tracking-tight">Archivos</h1>
          <p className="text-[#F5F5F5]/55 mt-1">Todos tus entregables en un solo lugar</p>
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
            aria-label="Vista grid"
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
            aria-label="Vista lista"
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className={"mt-8 grid gap-6 " + (view === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1")}>
        {items.map((it) => (
          <div
            key={it.name}
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
                <div className="min-w-0">
                  <div className="text-[#F5F5F5] font-semibold truncate">{it.name}</div>
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
                  Descargar
                </a>
                <button
                  type="button"
                  onClick={() => navigate(`/dashboard/requests/${it.requestId}`)}
                  className="inline-flex h-9 items-center justify-center px-3 rounded-full bg-[#B454FF] text-white font-semibold hover:bg-[#A74CFF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
                >
                  Ver Request
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