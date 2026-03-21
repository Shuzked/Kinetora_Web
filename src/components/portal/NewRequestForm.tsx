import React, { useState } from "react";
import { 
  Paperclip, 
  Send, 
  X, 
  Flag, 
  AlertCircle,
  FileText,
  MousePointer2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface NewRequestFormProps {
  onSubmit: (data: { title: string; description: string; priority: string; category: string; files: File[] }) => void;
  onCancel: () => void;
}

const NewRequestForm: React.FC<NewRequestFormProps> = ({ onSubmit, onCancel }) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="space-y-8 py-4">
      <header>
        <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Nueva Petición</h2>
        <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">
            Describe tu requerimiento y adjunta los archivos necesarios
        </p>
      </header>

      <form className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Título de la Tarea</label>
          <Input 
            placeholder="Ej. Rediseñar el encabezado del blog..." 
            className="bg-white/5 border-white/10 rounded-xl h-12 focus:border-[#B454FF]/50"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Prioridad</label>
                <Select defaultValue="MEDIUM">
                    <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12 focus:ring-[#B454FF]/50 text-white/80">
                        <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#111111] border-white/10 text-white">
                        <SelectItem value="LOW" className="focus:bg-[#B454FF]/10 focus:text-white">Baja</SelectItem>
                        <SelectItem value="MEDIUM" className="focus:bg-[#B454FF]/10 focus:text-white">Media</SelectItem>
                        <SelectItem value="HIGH" className="focus:bg-[#B454FF]/10 focus:text-white">Alta</SelectItem>
                        <SelectItem value="URGENT" className="focus:bg-[#B454FF]/10 focus:text-[#B454FF] font-black uppercase text-[10px] tracking-widest">Urgente 🔥</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Categoría</label>
                <Select defaultValue="design">
                    <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12 focus:ring-[#B454FF]/50 text-white/80">
                        <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#111111] border-white/10 text-white">
                        <SelectItem value="design" className="focus:bg-[#B454FF]/10">Diseño UI/UX</SelectItem>
                        <SelectItem value="dev" className="focus:bg-[#B454FF]/10">Desarrollo Web</SelectItem>
                        <SelectItem value="copy" className="focus:bg-[#B454FF]/10">Copywriting</SelectItem>
                        <SelectItem value="seo" className="focus:bg-[#B454FF]/10">SEO / Marketing</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Descripción Detallada</label>
          <Textarea 
            placeholder="Danos todos los detalles posibles..." 
            className="bg-white/5 border-white/10 rounded-xl min-h-[150px] focus:border-[#B454FF]/50 text-sm py-4"
          />
        </div>

        {/* Dropzone Area */}
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Archivos Adjuntos</label>
            <div className="relative group overflow-hidden">
                <input 
                    type="file" 
                    multiple 
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                />
                <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 transition-all group-hover:bg-white/[0.02] group-hover:border-[#B454FF]/30 flex flex-col items-center justify-center text-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Paperclip className="w-5 h-5 text-white/30" />
                    </div>
                    <div>
                        <p className="text-white/80 text-sm font-bold tracking-tight">Clica o arrastra tus archivos aquí</p>
                        <p className="text-white/20 text-[10px] font-black uppercase tracking-widest mt-1">PDF, JPG, PNG, MP4 (Max 50MB)</p>
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
                            <Badge key={i} variant="secondary" className="bg-[#B454FF]/10 text-[#B454FF] border border-[#B454FF]/20 px-3 py-1.5 rounded-lg flex gap-2 items-center">
                                <FileText className="w-3 h-3" />
                                <span className="text-[10px] font-bold">{file.name}</span>
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
                className="flex-1 h-12 rounded-xl text-white/40 font-bold uppercase tracking-widest hover:bg-white/5 hover:text-white"
            >
                CANCELAR
            </Button>
            <Button 
                type="button" 
                className="flex-[2] bg-[#B454FF] hover:bg-[#A74CFF] text-white h-12 rounded-xl font-black uppercase tracking-[0.2em] shadow-[0_4px_15px_rgba(180,84,255,0.4)] gap-3"
            >
                <Send className="w-4 h-4" />
                ENVIAR PETICIÓN
            </Button>
        </div>
      </form>
    </div>
  );
};

export default NewRequestForm;
