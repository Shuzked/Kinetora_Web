import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Search,
  Filter,
  MoreVertical,
  FileCode,
  Video,
  Layout,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Deliverable {
  name: string;
  url: string;
  type: string;
  size?: string;
  date?: string;
}

const Deliverables = () => {
  const [deliverables, setDeliverables] = useState<Deliverable[]>([
    { name: "Brand_Strategy_V1.pdf", url: "#", type: "PDF", size: "2.4 MB", date: "21 MAR 2024" },
    { name: "Social_Media_Assets_Final.zip", url: "#", type: "ZIP", size: "45.0 MB", date: "20 MAR 2024" },
    { name: "Kinetora_UI_Prototype", url: "#", type: "FIGMA", size: "Link", date: "18 MAR 2024" },
    { name: "Explainervideo_Concept.mp4", url: "#", type: "MP4", size: "125 MB", date: "15 MAR 2024" },
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="w-5 h-5 text-red-400" />;
      case 'MP4': return <Video className="w-5 h-5 text-blue-400" />;
      case 'FIGMA': return <Layout className="w-5 h-5 text-[#B454FF]" />;
      default: return <FileCode className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            📂 Mis Entregables
          </h1>
          <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.3em] mt-1">Archivos finales y recursos de tu proyecto</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <Input 
                    placeholder="Buscar archivos..." 
                    className="bg-white/5 border-white/10 rounded-xl pl-10 h-11 text-xs focus:border-[#B454FF]/30 transition-all font-bold"
                />
            </div>
            <Button variant="ghost" size="icon" className="rounded-xl bg-white/5 border border-white/5 text-white/40">
                <Filter className="w-4 h-4" />
            </Button>
        </div>
      </header>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
            { label: "Documentos", count: 12, icon: FileText, color: "text-red-400" },
            { label: "Multimedia", count: 8, icon: Video, color: "text-blue-400" },
            { label: "Estrategias", count: 4, icon: Layout, color: "text-[#B454FF]" },
            { label: "Uso de Espacio", count: "1.2 GB", icon: Clock, color: "text-emerald-400" },
        ].map((stat, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-4 group hover:bg-white/[0.04] transition-all">
                <div className={cn("w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5", stat.color)}>
                    <stat.icon className="w-5 h-5" />
                </div>
                <div>
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest block">{stat.label}</span>
                    <span className="text-lg font-black text-white tracking-tight">{stat.count}</span>
                </div>
            </div>
        ))}
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {deliverables.map((file, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-[#0D0D0D] border border-white/5 rounded-2xl p-5 hover:border-[#B454FF]/30 transition-all hover:bg-[#111111]"
          >
            <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                    {getIcon(file.type)}
                </div>
                <Button variant="ghost" size="icon" className="rounded-full text-white/20 hover:text-white/60">
                    <MoreVertical className="w-4 h-4" />
                </Button>
            </div>

            <div className="space-y-1">
                <h3 className="text-[13px] font-bold text-white group-hover:text-[#B454FF] transition-colors truncate">
                    {file.name}
                </h3>
                <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">{file.type}</span>
                    <div className="w-1 h-1 rounded-full bg-white/10" />
                    <span className="text-[9px] font-bold text-white/20">{file.size}</span>
                </div>
            </div>

            <div className="flex items-center gap-2 mt-6">
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex-1 bg-white/[0.02] border border-white/5 rounded-xl h-9 text-[10px] font-black uppercase tracking-widest text-white/40 hover:bg-[#B454FF]/10 hover:text-[#B454FF] hover:border-[#B454FF]/30 gap-2"
                >
                    <Download className="w-3 h-3" />
                    Descargar
                </Button>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-xl border border-white/5 h-9 w-9 bg-white/[0.01] text-white/20 hover:text-white hover:bg-white/5"
                >
                    <ExternalLink className="w-3 h-3" />
                </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State / Upload Info */}
      <div className="p-8 border-2 border-dashed border-white/5 rounded-[2.5rem] bg-white/[0.01] flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5">
            <FileText className="w-5 h-5 text-white/20" />
        </div>
        <div>
            <p className="text-sm font-bold text-white/40">¿Buscas algo específico?</p>
            <p className="text-[10px] font-black text-white/10 uppercase tracking-widest mt-1">
                Todos los archivos se sincronizan automáticamente con tu carpeta protegida en Hostinger.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Deliverables;
