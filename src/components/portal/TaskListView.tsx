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
  onCreateTask: (statusId: string, title?: string) => void;
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
    // Pass the title to onCreateTask for inline creation
    onCreateTask(statusId, newTitle);
    setNewTitle("");
    setIsAddingInStatus(null);
  };

  return (
    <div className="space-y-6 pb-20 select-none animate-in fade-in duration-500">
      {statuses.map((status) => {
        const groupTasks = tasks.filter(t => t.statusId === status.id);
        
        return (
          <div key={status.id} className="group/section mb-4">
            {/* Status Header - Precision Height: 32px as per ClickUp */}
            <div 
              className="flex items-center gap-2 h-8 px-1 group/header cursor-pointer group-hover/section:translate-x-0.5 transition-transform duration-200"
              onClick={() => onUpdateStatus(status.id, { isCollapsed: !status.isCollapsed })}
            >
              <div 
                className={cn(
                    "w-5 h-5 flex items-center justify-center rounded transition-all duration-200 hover:bg-white/5",
                    status.isCollapsed ? "-rotate-90" : "rotate-0 text-[#B454FF]"
                )}
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
              
              <div 
                className="px-2.5 py-0.5 rounded-[4px] text-[10px] font-black uppercase tracking-[0.1em] flex items-center gap-1.5 transition-all"
                style={{ backgroundColor: status.color, color: '#FFFFFF' }}
              >
                {status.label}
                <span className="opacity-60 text-[9px] font-bold">{groupTasks.length}</span>
              </div>

              {/* Interaction Details: The "..." on hover as requested */}
              <div className="opacity-0 group-hover/header:opacity-100 transition-opacity ml-1 flex items-center gap-1">
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button 
                            onClick={(e) => e.stopPropagation()} 
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                        >
                            <MoreHorizontal className="w-3 h-3 text-white/40" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#1A1A1A] border-white/10 text-white min-w-[140px] shadow-2xl">
                        <DropdownMenuItem 
                            className="text-[11px] font-bold py-2 focus:bg-[#B454FF]/20"
                            onClick={() => {
                                const n = prompt("Nuevo nombre del estado:", status.label);
                                if (n) onUpdateStatus(status.id, { label: n });
                            }}
                        >
                            Renombrar
                        </DropdownMenuItem>
                        <div className="h-px bg-white/5 mx-1 my-1" />
                        <div className="px-2 py-1.5">
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest pl-1">Color</span>
                            <div className="flex gap-1.5 mt-2 flex-wrap">
                                {['#B454FF', '#F97316', '#22C55E', '#FFFFFF', '#EF4444'].map(c => (
                                    <button 
                                        key={c}
                                        onClick={() => onUpdateStatus(status.id, { color: c })}
                                        className={cn(
                                            "w-4 h-4 rounded-full border border-white/10 group/color transition-transform hover:scale-125",
                                            status.color === c && "ring-2 ring-white/40 ring-offset-1 ring-offset-black"
                                        )}
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                            </div>
                        </div>
                    </DropdownMenuContent>
                 </DropdownMenu>
              </div>
            </div>

            {!status.isCollapsed && (
              <div className="ml-1 border-l-2 border-white/[0.03] transition-all duration-300">
                {/* Headers Grid - Exact widths and fonts */}
                <div className="grid grid-cols-[34px_1fr_100px_110px_90px] gap-0 px-0 h-8 items-center border-b border-white/[0.05] text-[10px] font-bold text-white/20 uppercase tracking-tighter bg-transparent">
                    <div className="flex justify-center h-full items-center"><CheckCircle2 className="w-3.5 h-3.5" /></div>
                    <div className="px-3 h-full flex items-center">Nombre de la Petición</div>
                    <div className="text-center h-full flex items-center justify-center hidden sm:flex">Vencimiento</div>
                    <div className="text-center h-full flex items-center justify-center hidden lg:flex">Asignados</div>
                    <div className="text-center h-full flex items-center justify-center">Prioridad</div>
                </div>

                <AnimatePresence mode="popLayout">
                  {groupTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "grid grid-cols-[34px_1fr_100px_110px_90px] gap-0 items-center border-b border-white/[0.03] group/row transition-all duration-150 h-[38px]",
                        "hover:bg-[#B454FF]/[0.02] bg-transparent",
                        task.selected && "bg-[#B454FF]/[0.05] border-l-2 border-l-[#B454FF]"
                      )}
                    >
                      {/* Checkbox Area */}
                      <div className="flex items-center justify-center h-full relative group-hover/row:bg-white/[0.03] transition-colors">
                        <GripVertical className="absolute left-0 w-3 h-3 text-white/0 group-hover/row:text-white/10 cursor-grab active:cursor-grabbing" />
                        <input 
                            type="checkbox" 
                            checked={task.selected || false} 
                            onChange={(e) => onSelectTask(task.id, e.target.checked)}
                            className="w-3.5 h-3.5 rounded-[3px] border-white/20 bg-transparent accent-[#B454FF] cursor-pointer"
                        />
                      </div>

                      {/* Title Cell */}
                      <div className="px-3 flex items-center gap-2.5 h-full min-w-0">
                        {editingTitleId === task.id ? (
                            <Input 
                                autoFocus
                                value={task.title}
                                className="h-full bg-transparent border-none text-[12px] font-medium text-white focus-visible:ring-0 p-0 shadow-none"
                                onBlur={() => setEditingTitleId(null)}
                                onChange={(e) => onUpdateTask(task.id, { title: e.target.value })}
                                onKeyDown={(e) => e.key === 'Enter' && setEditingTitleId(null)}
                            />
                        ) : (
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                <span 
                                    className="text-[12px] font-medium text-[#F5F5F5]/85 group-hover/row:text-white cursor-text truncate flex-1 tracking-tight"
                                    onClick={() => setEditingTitleId(task.id)}
                                >
                                    {task.title}
                                </span>
                                <button 
                                    onClick={() => onTaskClick(task)}
                                    className="opacity-0 group-hover/row:opacity-100 p-1 hover:bg-[#B454FF]/10 rounded-md transition-all shrink-0"
                                >
                                    <Eye className="w-3 h-3 text-[#B454FF]" />
                                </button>
                            </div>
                        )}
                        
                        <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover/row:opacity-40 transition-opacity">
                             {task.subtasks && task.subtasks.length > 0 && (
                                <div className="flex items-center gap-1 text-[9px] font-black px-1.5 py-0.5 bg-white/5 rounded">
                                    <span className={task.subtasks.every(s => s.isDone) ? "text-emerald-400" : "text-[#B454FF]/80"}>
                                        {task.subtasks.filter(s => s.isDone).length}/{task.subtasks.length}
                                    </span>
                                </div>
                             )}
                        </div>
                      </div>

                      {/* Deadline - Hidden on mobile */}
                      <div className="flex justify-center h-full items-center hidden sm:flex">
                           {task.deadline_final ? (
                               <div className={cn(
                                   "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded transition-colors",
                                   new Date(task.deadline_final) < new Date() ? "text-red-400" : "text-white/30"
                               )}>
                                   {new Date(task.deadline_final).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                               </div>
                           ) : (
                               <button className="opacity-0 group-hover/row:opacity-60 p-1.5 rounded hover:bg-white/5">
                                   <Calendar className="w-3 h-3 text-white/20" />
                               </button>
                           )}
                      </div>

                      {/* Assignees - Desktop Only */}
                      <div className="flex justify-center h-full items-center hidden lg:flex">
                           <div className="flex -space-x-1.5">
                               {[1].map(a => (
                                   <div key={a} className="w-5 h-5 rounded-full border border-black bg-[#1A1A1A] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer ring-1 ring-white/5">
                                        <UserIcon className="w-2.5 h-2.5 text-white/30" />
                                   </div>
                               ))}
                               <button className="w-5 h-5 rounded-full border border-dashed border-white/10 flex items-center justify-center opacity-0 group-hover/row:opacity-100 hover:bg-white/5 transition-all">
                                   <Plus className="w-2.5 h-2.5 text-white/20" />
                               </button>
                           </div>
                      </div>

                      {/* Priority */}
                      <div className="flex justify-center h-full items-center">
                           <DropdownMenu>
                               <DropdownMenuTrigger asChild>
                                   <button className="p-1 px-3 hover:bg-white/5 rounded transition-all opacity-80 hover:opacity-100">
                                       <PriorityFlag priority={task.priority} />
                                   </button>
                               </DropdownMenuTrigger>
                               <DropdownMenuContent className="bg-[#1A1A1A] border-white/10 text-white min-w-[120px]">
                                   {(["URGENT", "HIGH", "MED", "LOW"] as TaskPriority[]).map(p => (
                                       <DropdownMenuItem 
                                          key={p} 
                                          onClick={() => onUpdateTask(task.id, { priority: p })}
                                          className="gap-2 py-2"
                                       >
                                           <PriorityFlag priority={p} />
                                           <span className="text-[10px] font-bold capitalize">{p.toLowerCase()}</span>
                                       </DropdownMenuItem>
                                   ))}
                               </DropdownMenuContent>
                           </DropdownMenu>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Inline Quick Add Row - Precision Design */}
                <div className="flex items-center h-[38px] group/addrow border-b border-white/[0.03]">
                    <div className="w-[34px] h-full flex items-center justify-center">
                        <Plus className="w-3.5 h-3.5 text-white/10 group-hover/addrow:text-[#B454FF] transition-all" />
                    </div>
                    <div className="px-3 h-full flex-1 flex items-center">
                        {isAddingInStatus === status.id ? (
                            <Input 
                                autoFocus
                                value={newTitle}
                                placeholder="Escribe el nombre de la tarea y pulsa Enter..."
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
                                className="text-[12px] font-medium text-white/[0.08] hover:text-white/30 transition-colors w-full text-left"
                            >
                                Nueva Petición
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
