import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Send, 
  Paperclip, 
  MessageSquare, 
  Clock, 
  User,
  Download,
  MoreVertical,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { type Task } from "./TaskList";

interface TaskDrawerProps {
  task: Task | null;
  onClose: () => void;
}

const TaskDrawer: React.FC<TaskDrawerProps> = ({ task, onClose }) => {
  const [comment, setComment] = useState("");

  if (!task) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-2xl h-screen bg-[#0D0D0D] border-l border-white/10 shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-white/10 text-[10px] text-white/40 uppercase tracking-widest">
              #{task.id}
            </Badge>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#B454FF]">
              <Clock className="w-3 h-3" />
              Creado el {new Date(task.created_at).toLocaleDateString()}
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white/5">
            <X className="w-5 h-5 text-white/40" />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-8 space-y-10">
            {/* Title & Description */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">
                {task.title}
              </h2>
              <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/5">
                <p className="text-white/70 leading-relaxed text-sm">
                  {task.description || "Sin descripción proporcionada."}
                </p>
              </div>
            </div>

            {/* Attachments Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Archivos Adjuntos</h3>
                    <Button variant="ghost" size="sm" className="text-[10px] font-bold text-[#B454FF] hover:bg-[#B454FF]/10 gap-2">
                        <Plus className="w-3 h-3" /> ADJUNTAR
                    </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 group hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-10 h-10 rounded-lg bg-[#B454FF]/10 flex items-center justify-center border border-[#B454FF]/20">
                                <FileIcon className="w-5 h-5 text-[#B454FF]" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-[11px] font-bold truncate text-white/80">manual_branding.pdf</p>
                                <p className="text-[9px] text-white/30 uppercase font-black tracking-widest">2.4 MB</p>
                            </div>
                        </div>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-white/20 hover:text-white">
                            <Download className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <Separator className="bg-white/5" />

            {/* Comment Feed */}
            <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" /> Actividad y Comentarios
                </h3>
                
                <div className="space-y-8">
                    {/* Mock Comment */}
                    <div className="flex gap-4">
                        <Avatar className="w-8 h-8 border border-white/10">
                            <AvatarImage src="/assets/logo.svg" />
                            <AvatarFallback>K</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-black uppercase tracking-widest text-[#B454FF]">Kinetora Admin</span>
                                <span className="text-[9px] text-white/20 font-bold uppercase tracking-widest">Hace 2 horas</span>
                            </div>
                            <p className="text-sm text-white/70 leading-relaxed pt-1">
                                Hola John, hemos revisado los archivos. El nuevo diseño estará listo para mañana en la tarde.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </ScrollArea>

        {/* Comment Input */}
        <div className="p-6 bg-white/[0.02] border-t border-white/5">
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#B454FF] to-[#8A2BE2] rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition duration-500"></div>
                <div className="relative flex items-center gap-2 bg-[#0D0D0D] border border-white/10 rounded-2xl p-2 pl-4">
                    <Input 
                        placeholder="Escribe un comentario o adjunta algo..." 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="bg-transparent border-none focus-visible:ring-0 text-sm h-10 px-0"
                    />
                    <div className="flex items-center gap-1">
                        <Button size="icon" variant="ghost" className="w-9 h-9 text-white/30 hover:text-white rounded-xl">
                            <Paperclip className="w-4 h-4" />
                        </Button>
                        <Button 
                            size="icon" 
                            className="w-9 h-9 bg-[#B454FF] hover:bg-[#A74CFF] text-white rounded-xl shadow-[0_4px_10px_rgba(180,84,255,0.3)]"
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

const FileIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
    </svg>
);

export default TaskDrawer;
