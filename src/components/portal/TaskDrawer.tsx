import React, { useState, useEffect, useRef } from "react";
import { 
  X, 
  Clock, 
  Calendar, 
  MessageSquare, 
  Paperclip, 
  MoreVertical,
  ExternalLink,
  History as HistoryIcon,
  Send,
  CheckCircle2,
  Circle,
  Plus,
  User as UserIcon,
  Flag,
  Share2,
  Trash2,
  Layout,
  AtSign,
  Mail,
  Zap,
  CheckCircle,
  Hash,
  Smile
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { Task, Status, Subtask, TaskPriority } from "./TaskList";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

interface Comment {
    taskId: number;
    text: string;
    sender: string;
    timestamp: string;
}

interface TaskDrawerProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (taskId: number, updates: Partial<Task>) => void;
  statuses: Status[];
}

const TaskDrawer: React.FC<TaskDrawerProps> = ({ task, isOpen, onClose, onUpdate, statuses }) => {
  const [editedTask, setEditedTask] = useState<Partial<Task>>({});
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [newSubtask, setNewSubtask] = useState("");
  const [activeTab, setActiveTab] = useState<'ACTIVITY' | 'COMMENTS'>('COMMENTS');
  const [showSlashCommands, setShowSlashCommands] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
  const socketRef = useRef<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && task) {
       // Mock history for simulation
       setComments([]); // Clear on open
       socketRef.current = io("http://localhost:3001");
       socketRef.current.emit("join-task", task.id);
       socketRef.current.on("new-comment", (comment: Comment) => {
         setComments(prev => [...prev, comment]);
       });
       return () => {
         socketRef.current?.disconnect();
       };
    }
  }, [isOpen, task?.id]);

  useEffect(() => {
    if (task) {
      setEditedTask({ ...task });
    }
  }, [task]);

  if (!task) return null;

  const currentStatus = statuses.find(s => s.id === task.statusId);

  const handleUpdateField = (field: keyof Task, newValue: any, oldValue: any, changeType: string) => {
    if (newValue === oldValue) return;
    const updates = { [field]: newValue };
    onUpdate(task.id, updates);
    if (socketRef.current) {
        socketRef.current.emit("update-task", {
            taskId: task.id,
            updates,
            changeType,
            oldValue,
            newValue,
            userId: 1
        });
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setEditedTask({ ...editedTask, description: value });
      
      const lastChar = value[e.target.selectionStart - 1];
      if (lastChar === '/') {
          setShowSlashCommands(true);
          // Simple positioning hack
          setCursorPosition({ top: 200, left: 100 }); 
      } else {
          setShowSlashCommands(false);
      }
  };

  const handleSendComment = () => {
    if (!newComment.trim() || !socketRef.current) return;
    const data: Comment & { userId?: number } = {
        taskId: task.id,
        text: newComment,
        sender: "Cliente",
        timestamp: new Date().toISOString(),
        userId: 1
    };
    socketRef.current.emit("send-comment", data);
    setNewComment("");
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
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-screen w-full max-w-[90vw] md:max-w-[1200px] bg-[#0A0A0A] border-l border-white/5 z-[101] shadow-3xl flex flex-col overflow-hidden rounded-l-[2rem]"
          >
            {/* Split View Header */}
            <header className="h-16 flex items-center justify-between px-6 bg-[#0E0E0E] border-b border-white/5 shrink-0">
               <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white/10">
                    <X className="w-5 h-5 text-white/40" />
                  </Button>
                  
                  <div className="flex items-center gap-2 pr-6 border-r border-white/5">
                      <Layout className="w-4 h-4 text-[#B454FF]" />
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Petición #{task.id}</span>
                  </div>

                  <div className="flex items-center gap-2">
                       <div 
                        className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border"
                        style={{ 
                            backgroundColor: `${currentStatus?.color}15`, 
                            color: currentStatus?.color,
                            borderColor: `${currentStatus?.color}30`
                        }}
                       >
                           {currentStatus?.label}
                       </div>
                       <Button variant="ghost" size="sm" className="h-8 rounded-lg text-white/40 hover:text-white text-[10px] font-bold p-2 gap-2">
                            <UserIcon className="w-3.5 h-3.5" />
                            Sin asignar
                       </Button>
                  </div>
               </div>

               <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white/5">
                        <Share2 className="w-4 h-4 text-white/20" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white/5">
                        <Trash2 className="w-4 h-4 text-white/20" />
                    </Button>
                    <div className="w-px h-6 bg-white/5 mx-1" />
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white/5">
                        <MoreVertical className="w-4 h-4 text-white/20" />
                    </Button>
               </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel: Content (70%) */}
                <div className="flex-1 overflow-y-auto bg-[#0A0A0A] custom-scrollbar">
                    <div className="p-12 max-w-4xl mx-auto space-y-12">
                        {/* Title Section */}
                        <div className="space-y-6">
                            <Input 
                                value={editedTask.title || ""}
                                onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                                onBlur={(e) => handleUpdateField('title', e.target.value, task.title, 'content')}
                                className="text-4xl font-black bg-transparent border-none p-0 focus-visible:ring-0 text-white placeholder:text-white/10 h-auto leading-tight"
                                placeholder="Título de la petición"
                            />
                            
                            <div className="flex flex-wrap gap-4 items-center">
                                <div className="flex items-center gap-2 p-2 px-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-all cursor-pointer group">
                                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">VENCIMIENTO</span>
                                        <span className="text-[10px] font-bold text-white/80 group-hover:text-white">
                                            {task.deadline_final ? new Date(task.deadline_final).toLocaleDateString() : 'Añadir fecha'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 p-2 px-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-all cursor-pointer group">
                                    <Flag className="w-3.5 h-3.5 text-blue-400" />
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">PRIORIDAD</span>
                                        <span className="text-[10px] font-bold text-white/80 group-hover:text-white capitalize">{task.priority.toLowerCase()}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 p-2 px-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-all cursor-pointer group">
                                    <Paperclip className="w-3.5 h-3.5 text-emerald-400" />
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">ADJUNTOS</span>
                                        <span className="text-[10px] font-bold text-white/80 group-hover:text-white">0 archivos</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description with / Commands */}
                        <div className="space-y-4 relative">
                            <div className="flex items-center gap-2">
                                <Type className="w-4 h-4 text-[#B454FF]" />
                                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Descripción Detallada</span>
                                <div className="h-px flex-1 bg-white/5" />
                            </div>
                            
                            <div className="min-h-[300px] group">
                                <Textarea 
                                    ref={textareaRef}
                                    value={editedTask.description || ""}
                                    onChange={handleDescriptionChange}
                                    onBlur={(e) => handleUpdateField('description', e.target.value, task.description, 'content')}
                                    className="w-full h-full bg-transparent border-none p-0 focus-visible:ring-0 text-base text-white/70 leading-relaxed resize-none placeholder:text-white/5"
                                    placeholder="Escribe '/' para insertar bloques mágicos o describe tu petición aquí..."
                                />

                                <AnimatePresence>
                                    {showSlashCommands && (
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="absolute z-50 bg-[#141414] border border-white/10 rounded-2xl shadow-2xl p-2 w-64 translate-y-2"
                                        >
                                            <div className="p-2 border-b border-white/5 mb-2">
                                                <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">BLOQUES DE CONTENIDO</span>
                                            </div>
                                            {[
                                                { icon: Hash, label: "Título 1", desc: "Encabezado grande", color: "text-[#B454FF]" },
                                                { icon: CheckCircle, label: "Lista tareas", desc: "Checklist interactivo", color: "text-emerald-400" },
                                                { icon: Zap, label: "Banner AI", desc: "Resumen con IA", color: "text-blue-400" },
                                                { icon: Layout, label: "Tabla", desc: "Organiza datos", color: "text-orange-400" },
                                            ].map((cmd, i) => (
                                                <button key={i} className="flex items-center gap-3 w-full p-2 hover:bg-white/5 rounded-xl transition-all group/cmd">
                                                    <div className={cn("w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center", cmd.color)}>
                                                        <cmd.icon className="w-4 h-4" />
                                                    </div>
                                                    <div className="flex flex-col items-start">
                                                        <span className="text-xs font-bold text-white">{cmd.label}</span>
                                                        <span className="text-[10px] text-white/30">{cmd.desc}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Advanced Subtasks Section */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Subtareas y Requerimientos</span>
                                        <span className="text-[9px] font-bold text-white/20">{task.subtasks?.length || 0} ITEMS EN TOTAL</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black text-[#B454FF]">{Math.round(((task.subtasks?.filter(s => s.isDone).length || 0) / (task.subtasks?.length || 1)) * 100)}%</span>
                                    <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${((task.subtasks?.filter(s => s.isDone).length || 0) / (task.subtasks?.length || 1)) * 100}%` }}
                                            className="h-full bg-gradient-to-r from-[#B454FF] to-emerald-400"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/[0.02] border border-white/5 rounded-[1.5rem] p-4 space-y-2">
                                {task.subtasks?.map((sub) => (
                                    <motion.div key={sub.id} className="flex items-center gap-4 group p-2 hover:bg-white/[0.03] rounded-xl transition-all">
                                        <button className="shrink-0 p-1">
                                            {sub.isDone ? (
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                            ) : (
                                                <Circle className="w-4 h-4 text-white/10 group-hover:text-white/40 transition-colors" />
                                            )}
                                        </button>
                                        <span className={cn(
                                            "text-[13px] font-medium transition-all flex-1",
                                            sub.isDone ? "text-white/20 line-through" : "text-white/70"
                                        )}>
                                            {sub.title}
                                        </span>
                                        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-2 transition-opacity">
                                            <Button variant="ghost" size="icon" className="w-7 h-7 rounded-lg hover:bg-red-500/10 text-white/10 hover:text-red-400">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}
                                
                                <div className="flex items-center gap-4 p-2 focus-within:bg-white/[0.03] rounded-xl transition-all">
                                    <Plus className="w-4 h-4 text-white/10" />
                                    <Input 
                                        value={newSubtask}
                                        onChange={(e) => setNewSubtask(e.target.value)}
                                        placeholder="Añadir un requerimiento o subtarea..."
                                        className="bg-transparent border-none p-0 focus-visible:ring-0 text-[13px] text-white/40 h-auto placeholder:text-white/5"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Sidebar (30%) */}
                <div className="w-[450px] bg-[#0E0E0E] border-l border-white/5 flex flex-col">
                    {/* Tabs Navigation */}
                    <div className="flex p-3 gap-2 bg-[#0C0C0C] border-b border-white/5">
                        <button 
                            onClick={() => setActiveTab('COMMENTS')}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                activeTab === 'COMMENTS' ? "bg-white/5 text-[#B454FF]" : "text-white/20 hover:text-white"
                            )}
                        >
                            <MessageSquare className="w-3.5 h-3.5" />
                            Chat
                        </button>
                        <button 
                            onClick={() => setActiveTab('ACTIVITY')}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                activeTab === 'ACTIVITY' ? "bg-white/5 text-blue-400" : "text-white/20 hover:text-white"
                            )}
                        >
                            <HistoryIcon className="w-3.5 h-3.5" />
                            Auditoría
                        </button>
                    </div>

                    <ScrollArea className="flex-1">
                        <div className="p-8 pb-32 space-y-10">
                            {activeTab === 'COMMENTS' ? (
                                <div className="space-y-8">
                                    {comments.length === 0 && (
                                        <div className="h-[200px] flex flex-col items-center justify-center text-center space-y-4 opacity-20">
                                            <Smile className="w-12 h-12" />
                                            <p className="text-xs font-bold">No hay comentarios aún.<br/>¡Sé el primero en saludar!</p>
                                        </div>
                                    )}
                                    {comments.map((comment, i) => (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={i} className="flex gap-4">
                                            <div className="w-9 h-9 rounded-[0.85rem] bg-gradient-to-br from-[#B454FF] to-blue-500 shrink-0 flex items-center justify-center text-white font-black text-xs shadow-lg">
                                                {comment.sender[0]}
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{comment.sender}</span>
                                                    <span className="text-[9px] font-bold text-white/20">{new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                </div>
                                                <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl rounded-tl-none text-xs text-white/80 leading-relaxed group relative">
                                                    {comment.text}
                                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Smile className="w-3.5 h-3.5 text-white/20 hover:text-[#B454FF] cursor-pointer" />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                    <div ref={scrollRef} />
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {[1,2,3].map(i => (
                                        <div key={i} className="flex gap-4 group">
                                            <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                                                <HistoryIcon className="w-3.5 h-3.5 text-white/20" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[11px] text-white/40 leading-snug">
                                                    <span className="text-white/80 font-bold">Sistema</span> cambió el estado a <span className="text-[#B454FF] font-black">PRODUCCIÓN</span>
                                                </p>
                                                <span className="text-[9px] font-black text-white/10 uppercase">Hace 2 horas</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    {/* Interaction Bar */}
                    <div className="p-6 bg-[#0E0E0E] border-t border-white/5 shrink-0">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-white/20 hover:text-white hover:bg-white/5">
                                    <AtSign className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-white/20 hover:text-white hover:bg-white/5">
                                    <Mail className="w-4 h-4" />
                                </Button>
                                <div className="h-4 w-px bg-white/5 mx-1" />
                                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-white/20 hover:text-white hover:bg-white/5">
                                    <Smile className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="relative group">
                                <Textarea 
                                    placeholder={activeTab === 'COMMENTS' ? "Escribe @ para mencionar..." : "Busca en el historial..."}
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendComment();
                                        }
                                    }}
                                    className="bg-[#141414] border-white/5 rounded-2xl p-4 pr-12 min-h-[100px] focus:border-[#B454FF]/40 transition-all text-sm resize-none placeholder:text-white/5"
                                />
                                <Button 
                                    onClick={handleSendComment}
                                    className="absolute bottom-3 right-3 bg-[#B454FF] hover:bg-[#9E38FF] text-white w-9 h-9 rounded-xl shadow-[0_0_15px_rgba(180,84,255,0.4)] transition-all active:scale-95"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TaskDrawer;
