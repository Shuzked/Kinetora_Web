import React from "react";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  Clock, 
  Play, 
  Eye, 
  CheckCircle2, 
  Paperclip, 
  MessageSquare,
  MoreHorizontal
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type TaskStatus = 'OPEN' | 'IN_SPRINT' | 'IN_REVIEW' | 'DONE';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  created_at: string;
  comment_count: number;
  attachment_count: number;
}

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

const statusConfig = {
  OPEN: { label: "ABIERTO", color: "text-white/40", bgColor: "bg-white/5", icon: Clock },
  IN_SPRINT: { label: "EN SPRINT", color: "text-[#B454FF]", bgColor: "bg-[#B454FF]/10", icon: Play },
  IN_REVIEW: { label: "EN REVISIÓN", color: "text-amber-400", bgColor: "bg-amber-400/10", icon: Eye },
  DONE: { label: "COMPLETADO", color: "text-emerald-400", bgColor: "bg-emerald-400/10", icon: CheckCircle2 },
};

const priorityColors = {
  LOW: "bg-blue-500/20 text-blue-400",
  MEDIUM: "bg-emerald-500/20 text-emerald-400",
  HIGH: "bg-amber-500/20 text-amber-400",
  URGENT: "bg-red-500/20 text-red-400",
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskClick }) => {
  const statuses: TaskStatus[] = ['OPEN', 'IN_SPRINT', 'IN_REVIEW', 'DONE'];

  return (
    <div className="space-y-12">
      {statuses.map((status) => {
        const filteredTasks = tasks.filter((t) => t.status === status);
        const config = statusConfig[status];
        
        return (
          <div key={status} className="space-y-4">
            {/* Status Header */}
            <div className="flex items-center gap-3 px-2">
              <div className={cn("flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black tracking-widest", config.bgColor, config.color)}>
                <config.icon className="w-3 h-3" />
                {config.label}
              </div>
              <span className="text-white/20 text-xs font-bold">{filteredTasks.length}</span>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            {/* Task Items */}
            <div className="space-y-px rounded-2xl overflow-hidden border border-white/5 bg-white/[0.01]">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    layoutId={`task-row-${task.id}`}
                    onClick={() => onTaskClick(task)}
                    className="group flex items-center gap-4 px-6 py-4 hover:bg-white/[0.04] transition-colors cursor-pointer border-b border-white/5 last:border-none"
                  >
                    <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-[#B454FF] transition-colors" />
                    
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white/90 group-hover:text-white transition-colors tracking-tight">
                        {task.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-6">
                      {/* Priority */}
                      <Badge className={cn("border-none text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider", priorityColors[task.priority])}>
                        {task.priority}
                      </Badge>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-white/20 text-[10px] font-bold">
                        {task.attachment_count > 0 && (
                          <div className="flex items-center gap-1">
                            <Paperclip className="w-3 h-3" />
                            {task.attachment_count}
                          </div>
                        )}
                        {task.comment_count > 0 && (
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {task.comment_count}
                          </div>
                        )}
                        <span className="uppercase tracking-widest">{new Date(task.created_at).toLocaleDateString()}</span>
                      </div>

                      <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-white/40 transition-colors" />
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="px-6 py-8 text-center text-white/20 text-xs font-bold uppercase tracking-widest italic">
                  No hay tareas en este estado
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
