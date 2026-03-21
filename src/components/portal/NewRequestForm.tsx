import React, { useState, useRef } from "react";
import { 
  X, 
  Paperclip, 
  Send, 
  Calendar,
  Layers,
  FileText,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TaskPriority } from "./TaskList";

interface NewRequestFormProps {
  onSubmit: (data: { 
    title: string; 
    description: string; 
    priority: TaskPriority; 
    deadline_requested: string;
    drive_links: string;
    files: File[] 
  }) => void;
  onCancel: () => void;
}

const NewRequestForm: React.FC<NewRequestFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("MED");
  const [deadlineRequested, setDeadlineRequested] = useState("");
  const [driveLinks, setDriveLinks] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    onSubmit({ 
        title, 
        description, 
        priority, 
        deadline_requested: deadlineRequested,
        drive_links: driveLinks,
        files 
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-1">
        <div className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
                <label htmlFor="title" className="text-[10px] font-black text-[#B454FF] uppercase tracking-widest ml-1">Título de la Petición</label>
                <Input 
                    id="title"
                    placeholder="Ej: Rediseño de la sección Hero..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-white/[0.03] border-white/5 text-white placeholder:text-white/10 h-14 rounded-2xl focus:border-[#B454FF]/40 transition-all font-bold text-lg"
                    required
                />
            </div>

            {/* Description */}
            <div className="space-y-2">
                <label htmlFor="description" className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Descripción Detallada</label>
                <Textarea 
                    id="description"
                    placeholder="Describe lo que necesitas con el mayor detalle posible..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    className="bg-white/[0.03] border-white/5 text-white/80 placeholder:text-white/10 rounded-2xl focus:border-[#B454FF]/40 transition-all leading-relaxed"
                    required
                />
            </div>

            {/* Metadata Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <Layers className="w-3 h-3 text-amber-400" />
                        Prioridad Inicial
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                        {(['LOW', 'MED', 'HIGH', 'URGENT'] as TaskPriority[]).map((p) => (
                            <button
                                key={p}
                                type="button"
                                onClick={() => setPriority(p)}
                                className={cn(
                                    "py-2 rounded-xl text-[9px] font-black border transition-all",
                                    priority === p 
                                        ? "bg-[#B454FF]/20 border-[#B454FF]/40 text-[#B454FF] shadow-[0_0_15px_rgba(180,84,255,0.2)]" 
                                        : "bg-white/[0.02] border-white/5 text-white/20 hover:border-white/20"
                                )}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="deadline" className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-[#B454FF]" />
                        Plazo Solicitado (Opcional)
                    </label>
                    <Input 
                        id="deadline"
                        type="date"
                        value={deadlineRequested}
                        onChange={(e) => setDeadlineRequested(e.target.value)}
                        className="bg-white/[0.03] border-white/5 text-white h-11 rounded-xl focus:border-[#B454FF]/40 transition-all font-bold"
                    />
                </div>
            </div>

            {/* External Links */}
            <div className="space-y-2">
                <label htmlFor="drive_links" className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <ExternalLink className="w-3 h-3 text-emerald-400" />
                    Enlaces Externos (Figma, Drive, etc.)
                </label>
                <Input 
                    id="drive_links"
                    placeholder="Pega aquí los enlaces relevantes..."
                    value={driveLinks}
                    onChange={(e) => setDriveLinks(e.target.value)}
                    className="bg-white/[0.03] border-white/5 text-white/60 h-12 rounded-xl focus:border-[#B454FF]/40 transition-all text-xs"
                />
            </div>

            {/* Uploads */}
            <div className="space-y-2">
                <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Paperclip className="w-3 h-3 text-blue-400" />
                    Adjuntar Archivos
                </label>
                <div className="relative group cursor-pointer">
                    <input 
                        type="file" 
                        multiple 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer z-20"
                    />
                    <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 transition-all group-hover:bg-white/[0.02] group-hover:border-[#B454FF]/30 flex flex-col items-center justify-center text-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Paperclip className="w-4 h-4 text-white/30" />
                        </div>
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Clica o arrastra archivos aquí</p>
                    </div>
                </div>
            </div>

            {/* Selected Files List */}
            <AnimatePresence>
                {files.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex flex-wrap gap-2 pt-2"
                    >
                        {files.map((file, i) => (
                            <Badge key={i} variant="secondary" className="bg-[#B454FF]/10 text-[#B454FF] border border-[#B454FF]/20 px-3 py-1.5 rounded-lg flex gap-2 items-center group relative overflow-hidden">
                                <FileText className="w-3 h-3" />
                                <span className="text-[10px] font-bold truncate max-w-[150px]">{file.name}</span>
                                <button 
                                    type="button"
                                    onClick={() => removeFile(i)}
                                    className="hover:text-red-400 p-0.5 transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </Badge>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        <div className="flex gap-4 pt-4">
            <Button 
                type="button" 
                variant="ghost" 
                onClick={onCancel}
                className="flex-1 h-14 rounded-2xl text-white/40 hover:text-white hover:bg-white/5 font-black text-[10px] uppercase tracking-[0.2em]"
            >
                Cancelar
            </Button>
            <Button 
                type="submit"
                className="flex-[2] h-14 rounded-2xl bg-[#B454FF] hover:bg-[#A342FF] text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(180,84,255,0.3)] gap-3 group"
            >
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Lanzar Petición
            </Button>
        </div>
    </form>
  );
};

export default NewRequestForm;
