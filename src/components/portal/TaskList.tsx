import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  Play, 
  Eye, 
  CheckCircle2, 
  Calendar,
  MoreHorizontal,
  Plus,
  ChevronDown,
  ChevronRight,
  GripVertical
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type StatusCategory = 'ACTIVE' | 'DONE' | 'CLOSED';
export type TaskPriority = "LOW" | "MED" | "HIGH" | "URGENT";

export interface Status {
    id: string;
    label: string;
    color: string;
    category: StatusCategory;
    isCollapsed?: boolean;
}

export interface Subtask {
    id: string;
    title: string;
    isDone: boolean;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  statusId: string;
  priority: TaskPriority;
  deadline_requested?: string;
  deadline_final?: string;
  drive_links?: string;
  created_at: string;
  comment_count?: number;
  attachment_count?: number;
  subtasks?: Subtask[];
  selected?: boolean;
}

interface TaskBoardProps {
  tasks: Task[];
  statuses: Status[];
  onTaskClick: (task: Task) => void;
  onUpdateTask: (taskId: number, updates: Partial<Task>, changeType?: string, oldValue?: any, newValue?: any) => void;
  onUpdateStatus: (statusId: string, updates: Partial<Status>) => void;
  onCreateTask: (statusId: string) => void;
  onSelectTask: (taskId: number, selected: boolean) => void;
}

const statusIcons: Record<string, any> = {
    'OPEN': Clock,
    'IN_SPRINT': Play,
    'IN_REVIEW': Eye,
    'DONE': CheckCircle2,
    'DEFAULT': Clock
};

const TaskCard = ({ 
    task, 
    statusColor, 
    statuses,
    onClick, 
    onSelect,
    onMove
}: { 
    task: Task; 
    statusColor: string; 
    statuses: Status[];
    onClick: () => void; 
    onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onMove: (taskId: number, newStatusId: string, oldStatusId: string) => void;
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={cn(
        "group relative p-4 rounded-xl border border-white/5 bg-[#141414] cursor-pointer transition-all duration-300",
        "hover:border-white/20 hover:bg-[#1A1A1A]",
        task.selected && "border-[#B454FF]/50 bg-[#B454FF]/5 ring-1 ring-[#B454FF]/20"
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3 mb-3">
        <input 
            type="checkbox" 
            checked={task.selected || false} 
            onChange={onSelect}
            onClick={(e) => e.stopPropagation()}
            className="mt-1 w-3.5 h-3.5 rounded border-white/10 bg-white/5 checked:bg-[#B454FF] cursor-pointer"
        />
        <h4 className="text-[12px] font-bold text-white group-hover:text-[#B454FF] transition-colors line-clamp-2 leading-snug flex-1">
          {task.title}
        </h4>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
            <div className={cn(
                "w-1.5 h-1.5 rounded-full",
                task.priority === "URGENT" ? "bg-red-500" :
                task.priority === "HIGH" ? "bg-orange-500" :
                task.priority === "MED" ? "bg-blue-400" : "bg-white/20"
            )} />
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button 
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 hover:bg-white/5 rounded-md transition-colors"
                    >
                        <MoreHorizontal className="w-3 h-3 text-white/20 group-hover:text-white/40" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#141414] border-white/10">
                    <div className="p-2 border-b border-white/5 mb-1">
                        <span className="text-[8px] font-black text-white/20 uppercase tracking-widest pl-1">Mover a...</span>
                    </div>
                    {statuses.filter(s => s.id !== task.statusId).map(s => (
                        <DropdownMenuItem 
                            key={s.id} 
                            onClick={(e) => {
                                e.stopPropagation();
                                onMove(task.id, s.id, task.statusId);
                            }}
                            className="text-[10px] font-bold text-white/60 hover:text-[#B454FF]"
                        >
                            {s.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            {task.deadline_final && (
                <span className="text-[9px] font-bold text-white/30 uppercase tracking-tighter ml-1">
                    {new Date(task.deadline_final).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                </span>
            )}
        </div>
        
        {task.subtasks && task.subtasks.length > 0 && (
            <div className="text-[9px] font-black text-white/20">
                {task.subtasks.filter(s => s.isDone).length}/{task.subtasks.length}
            </div>
        )}
      </div>
    </motion.div>
  );
};

const TaskBoard: React.FC<TaskBoardProps> = ({ 
    tasks, 
    statuses, 
    onTaskClick, 
    onUpdateTask, 
    onUpdateStatus,
    onCreateTask,
    onSelectTask
}) => {
  return (
    <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar min-h-[70vh] items-start">
      {statuses.map((status) => {
        const filteredTasks = tasks.filter((t) => t.statusId === status.id);
        const Icon = statusIcons[status.id] || statusIcons.DEFAULT;
        
        return (
          <div 
            key={status.id} 
            className={cn(
                "flex-shrink-0 transition-all duration-500",
                status.isCollapsed ? "w-12" : "w-80"
            )}
          >
            {/* Status Header */}
            <div className="mb-4 flex items-center justify-between group">
                <div 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => onUpdateStatus(status.id, { isCollapsed: !status.isCollapsed })}
                >
                    {status.isCollapsed ? (
                        <div className="flex flex-col items-center gap-4 py-4">
                            <ChevronRight className="w-4 h-4 text-white/20" />
                            <div className="h-px w-4 bg-white/10" />
                            <span 
                                className="text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap rotate-90 origin-left ml-4"
                                style={{ color: status.color }}
                            >
                                {status.label}
                            </span>
                        </div>
                    ) : (
                        <>
                            <ChevronDown className="w-4 h-4 text-white/20" />
                            <div 
                                className="text-[11px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg border flex items-center gap-2"
                                style={{ 
                                    backgroundColor: `${status.color}15`, 
                                    color: status.color,
                                    borderColor: `${status.color}30`
                                }}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                {status.label}
                            </div>
                            <span className="text-[10px] font-bold text-white/20">{filteredTasks.length}</span>
                        </>
                    )}
                </div>

                {!status.isCollapsed && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg hover:bg-white/5">
                                    <MoreHorizontal className="w-4 h-4 text-white/20" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-[#141414] border-white/10 text-white">
                                <DropdownMenuItem onClick={() => {
                                    const newName = prompt("Nuevo nombre:", status.label);
                                    if (newName) onUpdateStatus(status.id, { label: newName });
                                }}>
                                    Renombrar
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onUpdateStatus(status.id, { isCollapsed: true })}>
                                    Contraer
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}
            </div>

            {/* Task Column */}
            {!status.isCollapsed && (
                <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                        {filteredTasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                statusColor={status.color}
                                statuses={statuses}
                                onClick={() => onTaskClick(task)}
                                onSelect={(e) => onSelectTask(task.id, e.target.checked)}
                                onMove={(taskId, newStatusId, oldStatusId) => {
                                    onUpdateTask(taskId, { statusId: newStatusId }, 'status', oldStatusId, newStatusId);
                                }}
                            />
                        ))}
                    </AnimatePresence>

                    {/* Quick Add Button */}
                    <button 
                        onClick={() => onCreateTask(status.id)}
                        className="w-full py-3 rounded-xl border border-dashed border-white/5 text-white/10 hover:text-[#B454FF]/60 hover:border-[#B454FF]/20 hover:bg-[#B454FF]/5 transition-all flex items-center justify-center gap-2 group"
                    >
                        <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Nueva Tarea</span>
                    </button>
                </div>
            )}
          </div>
        );
      })}

      {/* Add New Status Column */}
      <div className="flex-shrink-0 w-80">
          <button className="w-full h-12 rounded-xl border border-dashed border-white/5 text-white/20 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all flex items-center justify-center gap-2 group">
              <Plus className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Añadir Estado</span>
          </button>
      </div>
    </div>
  );
};

export default TaskBoard;
