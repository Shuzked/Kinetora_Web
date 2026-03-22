import React, { useState, useEffect, useRef } from "react";
import { 
  X, 
  Clock, 
  Calendar, 
  MessageSquare, 
  Paperclip, 
  MoreVertical,
  ExternalLink,
  Save,
  History,
  AlertCircle,
  Send,
  CheckCircle2,
  Circle,
  Plus,
  User,
  Flag
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { Task, TaskPriority, Status, Subtask } from "./TaskList";
import { io, Socket } from "socket.io-client";

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
  const [isEditing, setIsEditing] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [newSubtask, setNewSubtask] = useState("");
  const socketRef = useRef<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && task) {
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
      setIsEditing(false);
    }
  }, [task]);

  if (!task) return null;

  const currentStatus = statuses.find(s => s.id === task.statusId);

  const handleSendComment = () => {
    if (!newComment.trim() || !socketRef.current) return;
    const data: Comment & { userId?: number } = {
        taskId: task.id,
        text: newComment,
        sender: "Cliente",
        timestamp: new Date().toISOString(),
        userId: 1 // TODO: Get from auth
    };
    socketRef.current.emit("send-comment", data);
    setNewComment("");
  };

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

  const handleAddSubtask = () => {
      if (!newSubtask.trim()) return;
      const subtask: Subtask = {
          id: Math.random().toString(36).substr(2, 9),
          title: newSubtask,
          isDone: false
      };
      const updatedSubtasks = [...(task.subtasks || []), subtask];
      onUpdate(task.id, { subtasks: updatedSubtasks });
      
      if (socketRef.current) {
          socketRef.current.emit("update-subtask", {
              taskId: task.id,
              subtask,
              action: 'add'
          });
      }
      setNewSubtask("");
  };

  const toggleSubtask = (subId: string) => {
      const subtask = task.subtasks?.find(s => s.id === subId);
      if (!subtask) return;

      const updatedSubtask = { ...subtask, isDone: !subtask.isDone };
      const updatedSubtasks = task.subtasks?.map(s => 
          s.id === subId ? updatedSubtask : s
      );
      
      onUpdate(task.id, { subtasks: updatedSubtasks });

      if (socketRef.current) {
          socketRef.current.emit("update-subtask", {
              taskId: task.id,
              subtask: updatedSubtask,
              action: 'toggle'
          });
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
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-screen w-full max-w-[85vw] md:max-w-6xl bg-[#0D0D0D] border-l border-white/5 z-[101] shadow-2xl flex flex-col"
          >
            {/* Header / Toolbar */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#0F0F0F] rounded-tl-3xl">
              <div className="flex items-center gap-6">
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white/5">
                  <X className="w-5 h-5 text-white/40" />
                </Button>
                
                <div className="flex items-center gap-3 pr-6 border-r border-white/5">
                    <div 
                        className="px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                        style={{ 
                            backgroundColor: `${currentStatus?.color}15`, 
                            color: currentStatus?.color,
                            borderColor: `${currentStatus?.color}30`
                        }}
                    >
                        {currentStatus?.label}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group">
                        <User className="w-4 h-4 text-white/20 group-hover:text-[#B454FF]" />
                        <span className="text-[10px] font-black text-white/40 group-hover:text-white uppercase tracking-widest">Responsable</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group">
                        <Calendar className="w-4 h-4 text-white/20 group-hover:text-[#B454FF]" />
                        <span className="text-[10px] font-black text-white/40 group-hover:text-white uppercase tracking-widest">Vence</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group">
                        <Flag className="w-4 h-4 text-white/20 group-hover:text-[#B454FF]" />
                        <span className="text-[10px] font-black text-white/40 group-hover:text-white uppercase tracking-widest">Prioridad</span>
                    </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5 text-white/20">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Split Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Column: Details */}
                <ScrollArea className="flex-1 border-r border-white/5">
                    <div className="p-10 space-y-12">
                        <div className="space-y-4">
                            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">PETICIÓN #{task.id}</span>
                            <div className="relative group">
                                <Input 
                                    value={editedTask.title || ""}
                                    onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                                    onBlur={(e) => handleUpdateField('title', e.target.value, task.title, 'content')}
                                    className="text-3xl font-black bg-transparent border-none p-0 focus-visible:ring-0 text-white placeholder:text-white/10 h-auto"
                                    placeholder="Sin título"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-[#B454FF] uppercase tracking-widest">Descripción</span>
                                <div className="h-px flex-1 bg-white/5" />
                            </div>
                            <Textarea 
                                value={editedTask.description || ""}
                                onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
                                onBlur={(e) => handleUpdateField('description', e.target.value, task.description, 'content')}
                                className="min-h-[200px] bg-transparent border-none p-0 focus-visible:ring-0 text-sm text-white/60 leading-relaxed resize-none"
                                placeholder="Añade una descripción detallada..."
                            />
                        </div>

                        {/* Checklists */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black text-[#B454FF] uppercase tracking-widest">Checklist</span>
                                    <span className="text-[9px] font-bold text-white/20 bg-white/5 px-2 py-0.5 rounded-md">
                                        {task.subtasks?.filter(s => s.isDone).length || 0}/{task.subtasks?.length || 0}
                                    </span>
                                </div>
                                <div className="h-px flex-1 bg-white/5 mx-4" />
                            </div>

                            <div className="space-y-2">
                                {task.subtasks?.map((sub) => (
                                    <div key={sub.id} className="flex items-center gap-3 group px-2 py-1.5 hover:bg-white/[0.02] rounded-lg transition-all">
                                        <button onClick={() => toggleSubtask(sub.id)}>
                                            {sub.isDone ? (
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                            ) : (
                                                <Circle className="w-4 h-4 text-white/10 group-hover:text-white/30" />
                                            )}
                                        </button>
                                        <span className={cn(
                                            "text-xs font-medium transition-all",
                                            sub.isDone ? "text-white/30 line-through" : "text-white/70"
                                        )}>
                                            {sub.title}
                                        </span>
                                    </div>
                                ))}
                                
                                <div className="flex items-center gap-3 px-2 pt-2">
                                    <Plus className="w-4 h-4 text-white/10" />
                                    <Input 
                                        value={newSubtask}
                                        onChange={(e) => setNewSubtask(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddSubtask()}
                                        placeholder="Añadir subtarea..."
                                        className="bg-transparent border-none p-0 focus-visible:ring-0 text-xs text-white/40 h-auto"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Custom Fields / Info */}
                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                            <div className="space-y-2">
                                <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Assets Drive/Figma</span>
                                <div className="flex items-center gap-2">
                                    <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                                    <span className="text-xs text-white/60 font-bold truncate underline decoration-white/10 underline-offset-4 cursor-pointer hover:text-white">
                                        {task.drive_links || "Sin enlaces adjuntos"}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Fecha Lanzamiento</span>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                                    <span className="text-xs text-white/60 font-bold">
                                        {task.deadline_final ? new Date(task.deadline_final).toLocaleDateString() : "Priorizando..."}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                {/* Right Column: Activity / Chat */}
                <div className="w-[400px] bg-[#0B0B0B] flex flex-col">
                    <div className="p-6 border-b border-white/5 bg-[#0D0D0D]">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-[#B454FF]" />
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Actividad y Chat</span>
                        </div>
                    </div>

                    <ScrollArea className="flex-1 p-6">
                        <div className="space-y-8">
                            {/* System History Item Example */}
                            <div className="flex gap-4 opacity-50">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                    <History className="w-3.5 h-3.5 text-white/40" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[11px] text-white/60 leading-snug">
                                        <span className="text-white font-bold">Kinetora Tech</span> cambió el estado a <span className="text-[#B454FF]">EN SPRINT</span>
                                    </p>
                                    <span className="text-[9px] font-bold text-white/20 uppercase">Ayer 18:45</span>
                                </div>
                            </div>

                            {comments.map((comment, index) => (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={index}
                                    className="flex gap-4"
                                >
                                    <div className="w-8 h-8 rounded-full bg-[#B454FF] flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(180,84,255,0.3)]">
                                        <span className="text-[10px] font-black text-white">{comment.sender[0]}</span>
                                    </div>
                                    <div className="space-y-1 flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{comment.sender}</span>
                                            <span className="text-[9px] font-bold text-white/20">{new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <div className="p-3 bg-white/[0.03] rounded-2xl rounded-tl-none border border-white/5 text-xs text-white/80 leading-relaxed">
                                            {comment.text}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            <div ref={scrollRef} />
                        </div>
                    </ScrollArea>

                    <div className="p-6 bg-[#0D0D0D] border-t border-white/5">
                        <div className="relative group">
                            <Textarea 
                                placeholder="Escribir comentario..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendComment();
                                    }
                                }}
                                className="bg-[#141414] border-white/5 rounded-2xl p-4 pr-12 min-h-[80px] focus:border-[#B454FF]/30 transition-all text-xs resize-none"
                            />
                            <Button 
                                onClick={handleSendComment}
                                size="icon"
                                className="absolute bottom-3 right-3 bg-[#B454FF] hover:bg-[#A342FF] text-white w-8 h-8 rounded-xl shadow-lg transition-all active:scale-90"
                            >
                                <Send className="w-3.5 h-3.5" />
                            </Button>
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
