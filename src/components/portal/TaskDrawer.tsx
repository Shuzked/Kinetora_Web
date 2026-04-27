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
  Smile,
  Type
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

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Left Panel: Content (70%) - Description Focus */}
                <div className="flex-1 overflow-y-auto bg-[#0A0A0A] custom-scrollbar scroll-smooth">
                    <div className="p-10 md:p-16 max-w-4xl mx-auto space-y-12 pb-32">
                        {/* Title Section */}
                        <div className="space-y-6">
                            <Input 
                                value={editedTask.title || ""}
                                onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                                onBlur={(e) => handleUpdateField('title', e.target.value, task.title, 'content')}
                                className="text-4xl md:text-5xl font-black bg-transparent border-none p-0 focus-visible:ring-0 text-white placeholder:text-white/[0.05] h-auto leading-[1.1] tracking-tight"
                                placeholder="Título de la petición"
                            />
                            
                            <div className="flex flex-wrap gap-3 items-center">
                                <div className="flex items-center gap-2 p-2 px-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/10 transition-all cursor-pointer group premium-apple-button">
                                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">FECHA TOPE</span>
                                        <span className="text-[10px] font-bold text-white/80 group-hover:text-white">
                                            {task.deadline_final ? new Date(task.deadline_final).toLocaleDateString('es-ES', { day: '2-digit', month: 'long' }) : 'Asignar fecha'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 p-2 px-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/10 transition-all cursor-pointer group premium-apple-button">
                                    <Flag className="w-3.5 h-3.5 text-blue-500" />
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">PRIORIDAD</span>
                                        <span className="text-[10px] font-bold text-white/80 group-hover:text-white capitalize">{task.priority.toLowerCase()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description with Advanced Slash Commands */}
                        <div className="space-y-6 relative group">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-4 bg-[#B454FF] rounded-full" />
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.15em]">Notas y Descripción</span>
                            </div>
                            
                            <div className="min-h-[400px] relative px-1">
                                <Textarea 
                                    ref={textareaRef}
                                    value={editedTask.description || ""}
                                    onChange={handleDescriptionChange}
                                    onBlur={(e) => handleUpdateField('description', e.target.value, task.description, 'content')}
                                    className="w-full h-full min-h-[400px] bg-transparent border-none p-0 focus-visible:ring-0 text-[15px] text-white/80 leading-[1.8] resize-none placeholder:text-white/10 font-medium"
                                    placeholder="Escribe '/' para insertar bloques... o describe el problema."
                                />

                                <AnimatePresence>
                                    {showSlashCommands && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                            className="absolute z-50 bg-[#161616] border border-white/10 rounded-2xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] p-2 w-72 backdrop-blur-3xl overflow-hidden"
                                            style={{ top: `${cursorPosition.top}px`, left: `${cursorPosition.left}px` }}
                                        >
                                            <div className="p-2 border-b border-white/5 mb-1 bg-white/[0.02]">
                                                <span className="text-[9px] font-black text-white/30 uppercase tracking-widest pl-1">BLOQUES DE CLICkUP</span>
                                            </div>
                                            <div className="space-y-1">
                                                {[
                                                    { icon: Type, label: "Texto", desc: "Escritura normal", shortcut: "T", color: "text-white/40" },
                                                    { icon: CheckCircle, label: "Checklist", desc: "Lista de tareas", shortcut: "C", color: "text-emerald-400" },
                                                    { icon: Hash, label: "Encabezado", desc: "Título grande", shortcut: "H", color: "text-[#B454FF]" },
                                                    { icon: Paperclip, label: "Adjuntos", desc: "Sube archivos", shortcut: "A", color: "text-blue-400" },
                                                    { icon: Zap, label: "Smart AI", desc: "Resumir con IA", shortcut: "S", color: "text-amber-400" },
                                                ].map((cmd, i) => (
                                                    <button 
                                                        key={i} 
                                                        className="flex items-center gap-3 w-full p-2.5 hover:bg-white/5 rounded-xl transition-all group/cmd relative"
                                                        onClick={() => setShowSlashCommands(false)}
                                                    >
                                                        <div className={cn("w-9 h-9 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0 group-hover/cmd:scale-110 transition-transform", cmd.color)}>
                                                            <cmd.icon className="w-4.5 h-4.5" />
                                                        </div>
                                                        <div className="flex flex-col items-start min-w-0">
                                                            <span className="text-xs font-bold text-white group-hover/cmd:text-[#B454FF] transition-colors">{cmd.label}</span>
                                                            <span className="text-[10px] text-white/30 truncate w-full">{cmd.desc}</span>
                                                        </div>
                                                        <span className="ml-auto text-[9px] font-black text-white/10 bg-white/5 px-1.5 py-0.5 rounded uppercase">{cmd.shortcut}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Interactive Subtasks and Requirements */}
                        <div className="space-y-6 pt-6 border-t border-white/[0.03]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-[#22C55E]/10 flex items-center justify-center border border-[#22C55E]/20">
                                        <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-black text-white uppercase tracking-widest">LISTA DE REQUERIMIENTOS</span>
                                        <span className="text-[9px] font-bold text-white/40">{task.subtasks?.length || 0} ITEMS EN CURSO</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black text-[#22C55E]">
                                            {task.subtasks?.length ? Math.round((task.subtasks.filter(s => s.isDone).length / task.subtasks.length) * 100) : 0}%
                                        </span>
                                    </div>
                                    <div className="w-40 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${task.subtasks?.length ? (task.subtasks.filter(s => s.isDone).length / task.subtasks.length) * 100 : 0}%` }}
                                            className="h-full bg-[#22C55E] shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all duration-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/[0.01] border border-white/[0.03] rounded-[2rem] p-6 space-y-1">
                                {task.subtasks?.map((sub) => (
                                    <motion.div 
                                        key={sub.id} 
                                        className="flex items-center gap-4 group p-3 hover:bg-white/[0.02] rounded-2xl transition-all cursor-pointer"
                                    >
                                        <button className="shrink-0 p-1 group-hover:scale-125 transition-transform">
                                            {sub.isDone ? (
                                                <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
                                            ) : (
                                                <Circle className="w-5 h-5 text-white/10 group-hover:text-white/30 transition-colors" />
                                            )}
                                        </button>
                                        <span className={cn(
                                            "text-[14px] font-medium transition-all flex-1",
                                            sub.isDone ? "text-white/20 line-through" : "text-white/70 group-hover:text-white"
                                        )}>
                                            {sub.title}
                                        </span>
                                        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-2 transition-opacity">
                                            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-xl hover:bg-red-500/10 text-white/10 hover:text-red-400 premium-apple-button">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}
                                
                                <div className="flex items-center gap-4 p-3 focus-within:bg-white/[0.02] rounded-2xl transition-all">
                                    <Plus className="w-5 h-5 text-white/10" />
                                    <Input 
                                        value={newSubtask}
                                        onChange={(e) => setNewSubtask(e.target.value)}
                                        placeholder="+ Añadir un requerimiento..."
                                        className="bg-transparent border-none p-0 focus-visible:ring-0 text-[14px] text-white/40 h-auto placeholder:text-white/5 font-medium"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Sidebar (30%) - Activity & Chat Combined Panel */}
                <div className="w-full lg:w-[480px] bg-[#0C0C0C] border-l border-white/5 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.2)]">
                    {/* Tabs Navigation - High Precision */}
                    <div className="flex p-4 gap-2 bg-[#0C0C0C] border-b border-white/[0.03]">
                        <button 
                            onClick={() => setActiveTab('COMMENTS')}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2.5 h-11 rounded-[14px] text-[10px] font-black uppercase tracking-[0.15em] transition-all premium-apple-button",
                                activeTab === 'COMMENTS' ? "bg-white/5 text-[#B454FF] border border-white/5" : "text-white/20 hover:text-white"
                            )}
                        >
                            <MessageSquare className="w-4 h-4" />
                            Feed de Chat
                        </button>
                        <button 
                            onClick={() => setActiveTab('ACTIVITY')}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2.5 h-11 rounded-[14px] text-[10px] font-black uppercase tracking-[0.15em] transition-all premium-apple-button",
                                activeTab === 'ACTIVITY' ? "bg-white/5 text-blue-400 border border-white/5" : "text-white/20 hover:text-white"
                            )}
                        >
                            <HistoryIcon className="w-4 h-4" />
                            Historial
                        </button>
                    </div>

                    <ScrollArea className="flex-1">
                        <div className="p-8 pb-32 space-y-10">
                            {activeTab === 'COMMENTS' ? (
                                <div className="space-y-10">
                                    {comments.length === 0 && (
                                        <div className="h-[300px] flex flex-col items-center justify-center text-center space-y-4 opacity-10">
                                            <Send className="w-16 h-16" />
                                            <p className="text-xs font-black uppercase tracking-widest">No hay actividad aún</p>
                                        </div>
                                    )}
                                    {comments.map((comment, i) => (
                                        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} key={i} className="flex gap-4 group/msg">
                                            <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#B454FF] to-[#8A2BE2] shrink-0 flex items-center justify-center text-white font-black text-xs shadow-xl ring-2 ring-white/5">
                                                {comment.sender[0]}
                                            </div>
                                            <div className="flex-1 space-y-2.5">
                                                <div className="flex items-center justify-between ml-1">
                                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{comment.sender}</span>
                                                    <span className="text-[9px] font-bold text-white/10">{new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                </div>
                                                <div className="p-4 p-5 bg-white/[0.03] border border-white/[0.05] rounded-[22px] rounded-tl-none text-[13px] text-white/80 leading-relaxed relative group hover:bg-white/[0.05] transition-all">
                                                    {comment.text}
                                                    <div className="absolute -right-2 top-2 opacity-0 group-hover/msg:opacity-100 transition-all hover:scale-110">
                                                        <Smile className="w-5 h-5 text-white/20 hover:text-[#B454FF] cursor-pointer drop-shadow-xl" />
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
                                        <div key={i} className="flex gap-4 group relative items-start">
                                            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0">
                                                <HistoryIcon className="w-4 h-4 text-white/20" />
                                            </div>
                                            <div className="space-y-1.5 pt-1">
                                                <p className="text-[13px] text-white/50 leading-tight">
                                                    <span className="text-white font-bold">Bot Kinetora</span> actualizó el estado a <span className="text-[#B454FF] font-black">IMPLEMENTACIÓN</span>
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[9px] font-black text-white/10 uppercase tracking-widest">Hoy a las 10:3{i} AM</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    {/* Enhanced Interaction Bar */}
                    <div className="p-6 bg-[#0E0E0E] border-t border-white/[0.05] shrink-0">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="w-9 h-9 rounded-xl text-white/20 hover:text-white hover:bg-white/5 transition-all">
                                    <AtSign className="w-4.5 h-4.5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="w-9 h-9 rounded-xl text-white/20 hover:text-white hover:bg-white/5 transition-all">
                                    <Smile className="w-4.5 h-4.5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="w-9 h-9 rounded-xl text-white/20 hover:text-white hover:bg-white/5 transition-all">
                                    <Paperclip className="w-4.5 h-4.5" />
                                </Button>
                                <div className="h-4 w-px bg-white/10 mx-2" />
                                <span className="text-[9px] font-black text-white/10 uppercase tracking-widest">Pulsa Enter para enviar</span>
                            </div>

                            <div className="relative group">
                                <Textarea 
                                    placeholder={activeTab === 'COMMENTS' ? "Explica algo o menciona al equipo..." : "Anotar en bitácora..."}
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendComment();
                                        }
                                    }}
                                    className="bg-white/[0.02] border border-white/[0.05] rounded-[24px] p-5 pr-14 min-h-[120px] focus:border-[#B454FF]/30 transition-all text-sm resize-none placeholder:text-white/10 leading-relaxed font-medium"
                                />
                                <Button 
                                    onClick={handleSendComment}
                                    className="absolute bottom-4 right-4 bg-[#B454FF] hover:bg-[#8A2BE2] text-white w-10 h-10 rounded-[14px] shadow-[0_10px_30px_rgba(180,84,255,0.4)] transition-all active:scale-90 premium-apple-button"
                                >
                                    <Send className="w-4.5 h-4.5" />
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
