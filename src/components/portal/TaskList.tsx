import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  Play, 
  Eye, 
  CheckCircle2, 
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type TaskStatus = 'OPEN' | 'IN_SPRINT' | 'IN_REVIEW' | 'DONE';
export type TaskPriority = "LOW" | "MED" | "HIGH" | "URGENT";

export interface TaskHistoryEntry {
    id: number;
    taskId: number;
    changedBy: string;
    changeType: 'status' | 'deadline' | 'priority' | 'content' | 'general';
    oldValue: string;
    newValue: string;
    createdAt: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  deadline_requested?: string;
  deadline_final?: string;
  drive_links?: string;
  created_at: string;
  comment_count?: number;
  attachment_count?: number;
}

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

const statusColors: Record<TaskStatus, { label: string; bg: string; text: string; border: string; glow: string; icon: React.ElementType }> = {
  OPEN: { 
    label: "ABIERTO",
    bg: "bg-white/5", 
    text: "text-white/60", 
    border: "border-white/10",
    glow: "",
    icon: Clock
  },
  IN_SPRINT: { 
    label: "EN SPRINT",
    bg: "bg-[#B454FF]/10", 
    text: "text-[#B454FF]", 
    border: "border-[#B454FF]/30",
    glow: "shadow-[0_0_15px_rgba(180,84,255,0.3)]",
    icon: Play
  },
  IN_REVIEW: { 
    label: "EN REVISIÓN",
    bg: "bg-orange-500/10", 
    text: "text-orange-400", 
    border: "border-orange-500/30",
    glow: "shadow-[0_0_15px_rgba(249,115,22,0.2)]",
    icon: Eye
  },
  DONE: { 
    label: "COMPLETADO",
    bg: "bg-emerald-500/10", 
    text: "text-emerald-400", 
    border: "border-emerald-500/30",
    glow: "shadow-[0_0_15px_rgba(34,197,94,0.2)]",
    icon: CheckCircle2
  },
};

const TaskCard = ({ task, onClick }: { task: Task; onClick: () => void }) => {
  const statusInfo = statusColors[task.status];
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={cn(
        "group relative p-5 rounded-2xl border bg-[#0D0D0D] cursor-pointer transition-all duration-300",
        statusInfo.border,
        statusInfo.glow,
        "hover:border-[#B454FF]/40 hover:bg-[#111111]"
      )}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <h4 className="text-[13px] font-bold text-white group-hover:text-[#B454FF] transition-colors line-clamp-2 leading-snug">
          {task.title}
        </h4>
        <div className={cn(
            "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border shrink-0",
            statusInfo.bg,
            statusInfo.text,
            statusInfo.border
        )}>
            {statusInfo.label}
        </div>
      </div>

      <p className="text-[11px] text-white/40 line-clamp-2 mb-6 h-8 leading-relaxed">
        {task.description.replace(/<[^>]*>/g, '')}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
            <span className={cn(
                "px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border",
                task.priority === "URGENT" ? "bg-red-500/20 text-red-400 border-red-500/20" :
                task.priority === "HIGH" ? "bg-orange-500/20 text-orange-400 border-orange-500/20" :
                task.priority === "MED" ? "bg-blue-500/20 text-blue-400 border-blue-500/20" :
                "bg-white/5 text-white/30 border-white/5"
            )}>
                {task.priority}
            </span>
            {task.deadline_final && (
                <div className="flex items-center gap-1.5 text-white/30">
                    <Calendar className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">
                        {new Date(task.deadline_final).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                    </span>
                </div>
            )}
        </div>
        
        <div className="flex -space-x-1.5">
            {[1, 2].map(i => (
                <div key={i} className="w-5 h-5 rounded-full border border-[#0D0D0D] bg-[#1A1A1A] flex items-center justify-center ring-1 ring-white/5">
                    <span className="text-[7px] font-black text-white/40">K</span>
                </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskClick }) => {
  const statuses: TaskStatus[] = ['OPEN', 'IN_SPRINT', 'IN_REVIEW', 'DONE'];

  return (
    <div className="space-y-16">
      {statuses.map((status) => {
        const filteredTasks = tasks.filter((t) => t.status === status);
        const statusInfo = statusColors[status];
        
        return (
          <div key={status} className="space-y-6">
            {/* Status Header */}
            <div className="flex items-center gap-4 px-2">
              <div className={cn(
                "flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] border transition-all duration-500",
                statusInfo.bg, 
                statusInfo.text,
                statusInfo.border,
                statusInfo.glow
              )}>
                <statusInfo.icon className="w-3.5 h-3.5" />
                {statusInfo.label}
              </div>
              <span className="text-white/20 text-[10px] font-black tracking-widest bg-white/5 px-2 py-0.5 rounded-lg border border-white/5">
                {filteredTasks.length}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>

            {/* Task Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onClick={() => onTaskClick(task)}
                    />
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full py-12 px-6 rounded-2xl border border-dashed border-white/5 flex flex-col items-center justify-center opacity-40"
                  >
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                      Sin peticiones en este estado
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
