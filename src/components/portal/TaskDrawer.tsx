import React, { useState, useEffect } from "react";
import { 
  X, 
  Clock, 
  Calendar, 
  MessageSquare, 
  Paperclip, 
  MoreVertical,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Save,
  History,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { Task, TaskPriority, TaskStatus, TaskHistoryEntry } from "./TaskList";

interface TaskDrawerProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (taskId: number, updates: Partial<Task>, historyEntry?: Omit<TaskHistoryEntry, 'id' | 'createdAt'>) => void;
}

const TaskDrawer: React.FC<TaskDrawerProps> = ({ task, isOpen, onClose, onUpdate }) => {
  const [editedTask, setEditedTask] = useState<Partial<Task>>({});
  const [activeTab, setActiveTab] = useState<'details' | 'comments' | 'history'>('details');
  const [isEditing, setIsEditing] = useState(false);

  // Initialize editing state
  useEffect(() => {
    if (task) {
      setEditedTask({
        title: task.title,
        description: task.description,
        priority: task.priority,
        deadline_requested: task.deadline_requested,
        drive_links: task.drive_links,
      });
      setIsEditing(false);
    }
  }, [task]);

  if (!task) return null;

  const handleSave = () => {
    const changes: Partial<Task> = {};
    const historyEntries: Omit<TaskHistoryEntry, 'id' | 'createdAt'>[] = [];

    // Detect changes and build history
    if (editedTask.title !== task.title) {
        changes.title = editedTask.title;
        historyEntries.push({ taskId: task.id, changedBy: "Cliente", changeType: "content", oldValue: task.title, newValue: editedTask.title! });
    }
    if (editedTask.description !== task.description) {
        changes.description = editedTask.description;
        historyEntries.push({ taskId: task.id, changedBy: "Cliente", changeType: "content", oldValue: "Descripción editada", newValue: "Nueva descripción guardada" });
    }
    if (editedTask.priority !== task.priority) {
        changes.priority = editedTask.priority as TaskPriority;
        historyEntries.push({ taskId: task.id, changedBy: "Cliente", changeType: "priority", oldValue: task.priority, newValue: editedTask.priority! });
    }
    if (editedTask.deadline_requested !== task.deadline_requested) {
        changes.deadline_requested = editedTask.deadline_requested;
        historyEntries.push({ taskId: task.id, changedBy: "Cliente", changeType: "deadline", oldValue: task.deadline_requested || "N/A", newValue: editedTask.deadline_requested! });
    }
    if (editedTask.drive_links !== task.drive_links) {
        changes.drive_links = editedTask.drive_links;
        historyEntries.push({ taskId: task.id, changedBy: "Cliente", changeType: "general", oldValue: "Links actualizados", newValue: editedTask.drive_links! });
    }

    if (Object.keys(changes).length > 0) {
        // En un escenario real enviaríamos estos cambios a la DB
        onUpdate(task.id, changes, historyEntries[0]); // Por simplicidad pasamos el primer cambio o podrías pasar el array
        setIsEditing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-screen w-full max-w-2xl bg-[#0D0D0D] border-l border-white/5 z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#111111]/50 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white/5">
                  <X className="w-5 h-5 text-white/40" />
                </Button>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">PETICIÓN #{task.id}</span>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                        "w-2 h-2 rounded-full",
                        task.status === "DONE" ? "bg-emerald-400" : task.status === "IN_SPRINT" ? "bg-[#B454FF]" : "bg-white/20"
                    )} />
                    <span className="text-xs font-bold text-white/60 tracking-tight">{task.status}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isEditing ? (
                    <Button 
                        size="sm" 
                        onClick={handleSave}
                        className="bg-[#B454FF] hover:bg-[#A342FF] text-white font-black text-[10px] uppercase tracking-widest px-4 h-9 rounded-xl shadow-[0_0_20px_rgba(180,84,255,0.3)] gap-2"
                    >
                        <Save className="w-4 h-4" />
                        Guardar Cambios
                    </Button>
                ) : (
                    <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        className="text-white/40 hover:text-white hover:bg-white/5 font-black text-[10px] uppercase tracking-widest gap-2"
                    >
                        Configurar
                    </Button>
                )}
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5 text-white/20">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/5 px-6 pt-2 bg-[#111111]/30">
                {[
                    { id: 'details', label: 'Detalles' },
                    { id: 'comments', label: 'Conversación' },
                    { id: 'history', label: 'Auditoría' }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                            "px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all relative",
                            activeTab === tab.id ? "text-[#B454FF]" : "text-white/30 hover:text-white/60"
                        )}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div layoutId="tab-underline" className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#B454FF]" />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <ScrollArea className="flex-1">
              <div className="p-8 space-y-10">
                {activeTab === 'details' && (
                  <>
                    {/* Title & Description */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#B454FF] uppercase tracking-widest ml-1">Título de la Petición</label>
                            {isEditing ? (
                                <Input 
                                    value={editedTask.title} 
                                    onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                                    className="bg-[#1A1A1A] border-white/5 text-white font-bold h-12 rounded-xl focus:border-[#B454FF]/50 transition-all"
                                />
                            ) : (
                                <h2 className="text-2xl font-black text-white tracking-tight leading-tight">{task.title}</h2>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Descripción y Objetivos</label>
                            {isEditing ? (
                                <Textarea 
                                    value={editedTask.description}
                                    onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
                                    rows={8}
                                    className="bg-[#1A1A1A] border-white/5 text-white/80 leading-relaxed rounded-xl focus:border-[#B454FF]/50 transition-all"
                                />
                            ) : (
                                <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/5 text-sm text-white/60 leading-relaxed font-medium">
                                    {task.description}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/5 space-y-3">
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] block">Prioridad</span>
                            {isEditing ? (
                                <select 
                                    className="w-full bg-[#1A1A1A] border-white/5 rounded-lg text-xs font-bold text-white p-2"
                                    value={editedTask.priority}
                                    onChange={(e) => setEditedTask({...editedTask, priority: e.target.value as TaskPriority})}
                                >
                                    <option value="LOW">LOW</option>
                                    <option value="MED">MED</option>
                                    <option value="HIGH">HIGH</option>
                                    <option value="URGENT">URGENT</option>
                                </select>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <div className={cn(
                                        "w-2 h-2 rounded-full",
                                        task.priority === "URGENT" ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "bg-blue-400"
                                    )} />
                                    <span className="text-xs font-bold text-white">{task.priority}</span>
                                </div>
                            )}
                        </div>

                        <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/5 space-y-3">
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] block">Deadline Kinetora (Final)</span>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-emerald-400" />
                                <span className={cn(
                                    "text-xs font-bold",
                                    task.deadline_final ? "text-white" : "text-white/20 italic"
                                )}>
                                    {task.deadline_final ? new Date(task.deadline_final).toLocaleDateString() : "Pendiente de consenso"}
                                </span>
                            </div>
                        </div>

                        <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/5 space-y-3">
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] block">Plazo Solicitado</span>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-[#B454FF]" />
                                {isEditing ? (
                                    <Input 
                                        type="date"
                                        value={editedTask.deadline_requested}
                                        onChange={(e) => setEditedTask({...editedTask, deadline_requested: e.target.value})}
                                        className="bg-[#1A1A1A] border-white/5 text-[10px] h-8 rounded-lg"
                                    />
                                ) : (
                                    <span className="text-xs font-bold text-white">
                                        {task.deadline_requested ? new Date(task.deadline_requested).toLocaleDateString() : "No especificado"}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/5 space-y-3">
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] block">Assets Externos</span>
                            <div className="flex items-center gap-2 overflow-hidden">
                                <ExternalLink className="w-4 h-4 text-blue-400 shrink-0" />
                                {isEditing ? (
                                    <Input 
                                        placeholder="Drive / Figma links"
                                        value={editedTask.drive_links}
                                        onChange={(e) => setEditedTask({...editedTask, drive_links: e.target.value})}
                                        className="bg-[#1A1A1A] border-white/5 text-[10px] h-8 rounded-lg"
                                    />
                                ) : (
                                    <span className="text-xs font-bold text-white/40 truncate italic">
                                        {task.drive_links || "Sin enlaces"}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                  </>
                )}

                {activeTab === 'comments' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-400">
                        <div className="flex items-center gap-3 p-4 bg-orange-500/5 rounded-2xl border border-orange-500/10">
                            <AlertCircle className="w-5 h-5 text-orange-400" />
                            <p className="text-[11px] font-bold text-orange-400/80 uppercase tracking-widest leading-relaxed">
                                Utiliza este chat para solicitar cambios o consensuar plazos con el equipo de Kinetora.
                            </p>
                        </div>
                        
                        {/* Fake Comment Feed */}
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-[#B454FF] flex items-center justify-center shrink-0">
                                    <span className="text-[10px] font-black text-white">K</span>
                                </div>
                                <div className="bg-white/[0.03] p-4 rounded-2xl rounded-tl-none border border-white/5 max-w-[85%]">
                                    <p className="text-xs text-white/80 leading-relaxed font-medium">
                                        Hola John, estamos revisando la estructura y el plazo solicitado parece correcto. Confirmaremos en breve.
                                    </p>
                                    <span className="text-[9px] font-bold text-white/20 mt-2 block">Kinetora Tech • 14:20</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative pt-10">
                            <Textarea 
                                placeholder="Escribe un mensaje..."
                                className="bg-[#1A1A1A] border-white/10 rounded-2xl p-6 min-h-[120px] focus:border-[#B454FF]/30 transition-all text-sm"
                            />
                            <Button className="absolute bottom-4 right-4 bg-white hover:bg-white/90 text-black font-black text-[10px] uppercase tracking-widest px-6 rounded-xl">
                                Enviar
                            </Button>
                        </div>
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-400">
                        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-z-10 before:h-full before:w-0.5 before:bg-white/5">
                            {[1, 2].map((i) => (
                                <div key={i} className="relative flex gap-6 px-1">
                                    <div className="mt-1 w-10 h-10 rounded-full bg-[#0D0D0D] border-2 border-white/10 flex items-center justify-center shrink-0 z-10 group-hover:border-[#B454FF]/40 transition-colors">
                                        <History className="w-4 h-4 text-white/20" />
                                    </div>
                                    <div className="flex-1 pb-8 group">
                                        <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/5 space-y-3 transition-colors hover:border-white/10">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] font-black text-[#B454FF] uppercase tracking-widest">Cambio de Estado</span>
                                                <span className="text-[9px] font-bold text-white/20">21 MAR, 23:30</span>
                                            </div>
                                            <p className="text-xs text-white/60 font-medium">
                                                <span className="text-white">Cliente</span> cambió el estado de <span className="line-through opacity-40">OPEN</span> a <span className="text-[#B454FF]">IN SPRINT</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
              </div>
            </ScrollArea>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TaskDrawer;
