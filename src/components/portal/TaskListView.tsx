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
  Paperclip
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

  return (
    <div className="space-y-8 pb-20">
      {statuses.map((status) => {
        const groupTasks = tasks.filter(t => t.statusId === status.id);
        
        return (
          <div key={status.id} className="group/section">
            {/* Status Header */}
            <div className="flex items-center gap-2 mb-2 group/header cursor-pointer" 
                 onClick={() => onUpdateStatus(status.id, { isCollapsed: !status.isCollapsed })}>
              <div 
                className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/5 transition-colors"
              >
                {status.isCollapsed ? (
                    <ChevronRight className="w-3.5 h-3.5 text-white/20" />
                ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-white/20" />
                )}
              </div>
              
              <div 
                className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                style={{ backgroundColor: `${status.color}15`, color: status.color }}
              >
                {status.label}
                <span className="opacity-40">{groupTasks.length}</span>
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

            {/* Tasks List */}
            {!status.isCollapsed && (
              <div className="ml-7 border-l border-white/5 pl-2 space-y-px">
                {/* Column Headers (Visible on hover of section or always?) */}
                <div className="grid grid-cols-[1fr_repeat(3,100px)] gap-4 px-4 py-2 text-[9px] font-black text-white/10 uppercase tracking-widest">
                    <div>Nombre de la Petición</div>
                    <div className="text-center">Asignados</div>
                    <div className="text-center">Vencimiento</div>
                    <div className="text-center">Prioridad</div>
                </div>

                <AnimatePresence mode="popLayout">
                  {groupTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className={cn(
                        "grid grid-cols-[1fr_repeat(3,100px)] gap-4 px-4 py-2.5 rounded-lg items-center group/row transition-all duration-200",
                        "hover:bg-white/[0.03] border border-transparent hover:border-white/5",
                        task.selected && "bg-[#B454FF]/5 border-[#B454FF]/20"
                      )}
                    >
                      {/* Left: Check + Title */}
                      <div className="flex items-center gap-3">
                        <input 
                            type="checkbox" 
                            checked={task.selected || false} 
                            onChange={(e) => onSelectTask(task.id, e.target.checked)}
                            className="w-3.5 h-3.5 rounded border-white/10 bg-white/5 checked:bg-[#B454FF]"
                        />
                        
                        {editingTitleId === task.id ? (
                            <Input 
                                autoFocus
                                value={task.title}
                                className="h-7 py-0 bg-transparent border-none text-[12px] font-bold text-white focus-visible:ring-0 p-0"
                                onBlur={() => setEditingTitleId(null)}
                                onChange={(e) => onUpdateTask(task.id, { title: e.target.value }, 'content', task.title, e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && setEditingTitleId(null)}
                            />
                        ) : (
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                <span 
                                    className="text-[12px] font-bold text-white/80 group-hover/row:text-white cursor-text truncate"
                                    onClick={() => setEditingTitleId(task.id)}
                                >
                                    {task.title}
                                </span>
                                <button 
                                    onClick={() => onTaskClick(task)}
                                    className="opacity-0 group-hover/row:opacity-100 p-1 hover:bg-white/10 rounded transition-all"
                                >
                                    <ChevronRight className="w-3 h-3 text-[#B454FF]" />
                                </button>
                            </div>
                        )}

                        {/* Badges for comments/attachments */}
                        <div className="flex items-center gap-2 ml-auto shrink-0 opacity-40">
                             {task.subtasks && task.subtasks.length > 0 && (
                                <div className="flex items-center gap-1 text-[9px] font-black">
                                    <span className="text-[#B454FF]">{task.subtasks.filter(s => s.isDone).length}</span>
                                    <span>/</span>
                                    <span>{task.subtasks.length}</span>
                                </div>
                             )}
                        </div>
                      </div>

                      {/* Asignados */}
                      <div className="flex justify-center -space-x-2">
                           <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                <UserIcon className="w-3 h-3 text-white/20" />
                           </div>
                      </div>

                      {/* Vencimiento */}
                      <div className="flex justify-center">
                           {task.deadline_final ? (
                               <div className="flex items-center gap-1 text-[10px] font-bold text-white/40">
                                   <Calendar className="w-3 h-3" />
                                   {new Date(task.deadline_final).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                               </div>
                           ) : (
                               <div className="w-4 h-px bg-white/5" />
                           )}
                      </div>

                      {/* Prioridad */}
                      <div className="flex justify-center">
                           <DropdownMenu>
                               <DropdownMenuTrigger asChild>
                                   <button className="p-1 hover:bg-white/5 rounded transition-colors">
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

                {/* Quick Add Row */}
                <button 
                  onClick={() => onCreateTask(status.id)}
                  className="w-full h-9 flex items-center gap-2 px-4 text-white/20 hover:text-[#B454FF]/60 hover:bg-white/[0.02] transition-all group/add rounded-lg"
                >
                  <Plus className="w-3.5 h-3.5 group-hover/add:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Añadir Tarea</span>
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TaskListView;
