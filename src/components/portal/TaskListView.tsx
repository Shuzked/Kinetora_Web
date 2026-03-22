import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  ChevronRight, 
  MoreHorizontal, 
  Plus, 
  Flag,
  Calendar,
  User as UserIcon,
  MessageSquare,
  Paperclip,
  GripVertical,
  Type,
  Eye,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Task, Status, TaskPriority } from "./TaskList";

interface TaskListViewProps {
  tasks: Task[];
  statuses: Status[];
  onTaskClick: (task: Task) => void;
  onUpdateTask: (taskId: number, updates: Partial<Task>, changeType?: string, oldValue?: any, newValue?: any) => void;
  onUpdateStatus: (statusId: string, updates: Partial<Status>) => void;
  onCreateTask: (statusId: string) => void;
  onSelectTask: (taskId: number, selected: boolean) => void;
}

const PriorityFlag = ({ priority }: { priority: TaskPriority }) => {
    const colors = {
        URGENT: "text-red-500",
        HIGH: "text-orange-500",
        MED: "text-blue-400",
        LOW: "text-white/20"
    };
    return <Flag className={cn("w-3.5 h-3.5", colors[priority])} />;
};

const TaskListView: React.FC<TaskListViewProps> = ({
  tasks,
  statuses,
  onTaskClick,
  onUpdateTask,
  onUpdateStatus,
  onCreateTask,
  onSelectTask
}) => {
  const [editingTitleId, setEditingTitleId] = useState<number | null>(null);
  const [isAddingInStatus, setIsAddingInStatus] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");

  const handleQuickAdd = (statusId: string) => {
    if (!newTitle.trim()) {
        setIsAddingInStatus(null);
        return;
    }
    // In a real app, onCreateTask might take the title. 
    // For now, we reuse the existing pattern and rely on the fact that onCreateTask opens a modal or adds a placeholder.
    // To be more 'ClickUp', we'll just emit the creation with the title.
    onCreateTask(statusId);
    setNewTitle("");
    setIsAddingInStatus(null);
  };

  return (
    <div className="space-y-6 pb-20 select-none">
      {statuses.map((status) => {
        const groupTasks = tasks.filter(t => t.statusId === status.id);
        
        return (
          <div key={status.id} className="group/section">
            {/* Status Header - Precision Height: 32px */}
            <div className="flex items-center gap-2 h-8 px-2 group/header cursor-pointer mb-1" 
                 onClick={() => onUpdateStatus(status.id, { isCollapsed: !status.isCollapsed })}>
              <div 
                className={cn(
                    "w-5 h-5 flex items-center justify-center rounded transition-transform duration-200",
                    status.isCollapsed ? "-rotate-90" : "rotate-0"
                )}
              >
                <ChevronDown className="w-3.5 h-3.5 text-white/40" />
              </div>
              
              <div 
                className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.15em] flex items-center gap-2"
                style={{ backgroundColor: `${status.color}15`, color: status.color }}
              >
                {status.label}
                <span className="opacity-40 font-bold">{groupTasks.length}</span>
              </div>

              <div className="opacity-0 group-hover/header:opacity-100 transition-opacity ml-2">
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button onClick={(e) => e.stopPropagation()} className="p-1 hover:bg-white/5 rounded">
                            <MoreHorizontal className="w-3 h-3 text-white/20" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#141414] border-white/10 text-white">
                        <DropdownMenuItem onClick={() => {
                            const n = prompt("Nuevo nombre:", status.label);
                            if (n) onUpdateStatus(status.id, { label: n });
                        }}>Renombrar</DropdownMenuItem>
                    </DropdownMenuContent>
                 </DropdownMenu>
              </div>
            </div>

            {/* Grid Definition - Precision Column Widths */}
            {!status.isCollapsed && (
              <div className="border border-white/5 rounded-xl overflow-hidden bg-white/[0.01]">
                {/* Headers - Fixed Height: 32px */}
                <div className="grid grid-cols-[30px_1fr_repeat(3,110px)] gap-0 px-0 h-8 items-center border-b border-white/5 text-[9px] font-black text-white/10 uppercase tracking-widest bg-white/[0.02]">
                    <div className="flex justify-center border-r border-white/5 h-full items-center"><CheckCircle2 className="w-3 h-3" /></div>
                    <div className="px-4 border-r border-white/5 h-full flex items-center">Nombre de la Petición</div>
                    <div className="text-center border-r border-white/5 h-full flex items-center justify-center hidden lg:flex">Asignados</div>
                    <div className="text-center border-r border-white/5 h-full flex items-center justify-center">Vencimiento</div>
                    <div className="text-center h-full flex items-center justify-center">Prioridad</div>
                </div>

                <AnimatePresence mode="popLayout">
                  {groupTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={cn(
                        "grid grid-cols-[30px_1fr_repeat(3,110px)] gap-0 items-center border-b border-white/5 group/row transition-all duration-150 h-[38px]",
                        "hover:bg-white/[0.03] bg-transparent",
                        task.selected && "bg-[#B454FF]/5"
                      )}
                    >
                      {/* Control Area - 30px width */}
                      <div className="flex items-center justify-center h-full border-r border-white/5 relative group-hover/row:bg-white/5 transition-colors">
                        <GripVertical className="absolute left-0.5 w-3 h-3 text-white/0 group-hover/row:text-white/10 cursor-grab active:cursor-grabbing" />
                        <input 
                            type="checkbox" 
                            checked={task.selected || false} 
                            onChange={(e) => onSelectTask(task.id, e.target.checked)}
                            className="w-3.5 h-3.5 rounded-sm border-white/10 bg-white/5 accent-[#B454FF] cursor-pointer"
                        />
                      </div>

                      {/* Title & Interaction */}
                      <div className="px-4 flex items-center gap-3 h-full border-r border-white/5 min-w-0">
                        {editingTitleId === task.id ? (
                            <Input 
                                autoFocus
                                value={task.title}
                                className="h-full bg-transparent border-none text-[12px] font-medium text-white focus-visible:ring-0 p-0"
                                onBlur={() => setEditingTitleId(null)}
                                onChange={(e) => onUpdateTask(task.id, { title: e.target.value }, 'content', task.title, e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && setEditingTitleId(null)}
                            />
                        ) : (
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                <span 
                                    className="text-[12px] font-medium text-white/80 group-hover/row:text-white cursor-text truncate flex-1"
                                    onClick={() => setEditingTitleId(task.id)}
                                >
                                    {task.title}
                                </span>
                                <button 
                                    onClick={() => onTaskClick(task)}
                                    className="opacity-0 group-hover/row:opacity-100 p-1 hover:bg-[#B454FF]/20 rounded transition-all shrink-0"
                                >
                                    <Eye className="w-3 h-3 text-[#B454FF]" />
                                </button>
                            </div>
                        )}
                        
                        <div className="flex items-center gap-2 shrink-0 opacity-20 group-hover/row:opacity-60 transition-opacity">
                             {task.subtasks && task.subtasks.length > 0 && (
                                <div className="flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 bg-white/10 rounded">
                                    <span className={task.subtasks.every(s => s.isDone) ? "text-emerald-400" : "text-[#B454FF]"}>
                                        {task.subtasks.filter(s => s.isDone).length}/{task.subtasks.length}
                                    </span>
                                </div>
                             )}
                             <MessageSquare className="w-3 h-3" />
                        </div>
                      </div>

                      {/* Asignados - Desktop Only */}
                      <div className="flex justify-center h-full border-r border-white/5 items-center hidden lg:flex">
                           <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                                <UserIcon className="w-3 h-3 text-white/20" />
                           </div>
                      </div>

                      {/* Vencimiento */}
                      <div className="flex justify-center h-full border-r border-white/5 items-center">
                           {task.deadline_final ? (
                               <div className={cn(
                                   "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer transition-colors",
                                   new Date(task.deadline_final) < new Date() ? "bg-red-500/10 text-red-400" : "text-white/30 hover:bg-white/5"
                               )}>
                                   <Calendar className="w-3 h-3" />
                                   {new Date(task.deadline_final).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                               </div>
                           ) : (
                               <button className="opacity-0 group-hover/row:opacity-100 p-1 rounded hover:bg-white/5">
                                   <Calendar className="w-3 h-3 text-white/10" />
                               </button>
                           )}
                      </div>

                      {/* Prioridad */}
                      <div className="flex justify-center h-full items-center">
                           <DropdownMenu>
                               <DropdownMenuTrigger asChild>
                                   <button className="p-1.5 hover:bg-white/5 rounded transition-colors group-hover/row:scale-110">
                                       <PriorityFlag priority={task.priority} />
                                   </button>
                               </DropdownMenuTrigger>
                               <DropdownMenuContent className="bg-[#141414] border-white/10">
                                   {(["URGENT", "HIGH", "MED", "LOW"] as TaskPriority[]).map(p => (
                                       <DropdownMenuItem key={p} onClick={() => onUpdateTask(task.id, { priority: p }, 'priority', task.priority, p)}>
                                           <div className="flex items-center gap-2">
                                               <PriorityFlag priority={p} />
                                               <span className="text-[10px] font-bold capitalize">{p.toLowerCase()}</span>
                                           </div>
                                       </DropdownMenuItem>
                                   ))}
                               </DropdownMenuContent>
                           </DropdownMenu>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Inline Quick Add Row - Precision Height: 38px */}
                <div className="grid grid-cols-[30px_1fr] gap-0 items-center h-[38px] group/addrow">
                    <div className="h-full flex items-center justify-center border-r border-white/5 bg-black/20">
                        <Plus className="w-3 h-3 text-white/10 group-hover/addrow:text-[#B454FF] transition-colors" />
                    </div>
                    <div className="px-4 h-full flex items-center">
                        {isAddingInStatus === status.id ? (
                            <Input 
                                autoFocus
                                value={newTitle}
                                placeholder="Escribe el nombre de la tarea..."
                                className="h-full bg-transparent border-none text-[12px] font-medium text-white focus-visible:ring-0 p-0 placeholder:text-white/10"
                                onBlur={() => handleQuickAdd(status.id)}
                                onChange={(e) => setNewTitle(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleQuickAdd(status.id);
                                    else if (e.key === 'Escape') {
                                        setIsAddingInStatus(null);
                                        setNewTitle("");
                                    }
                                }}
                            />
                        ) : (
                            <button 
                                onClick={() => setIsAddingInStatus(status.id)}
                                className="text-[11px] font-medium text-white/10 hover:text-white/30 transition-colors w-full text-left"
                            >
                                + Nueva Tarea
                            </button>
                        )}
                    </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TaskListView;
