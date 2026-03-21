import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  MessageSquare, 
  Clock, 
  Play, 
  CheckCircle2, 
  Send,
  LayoutDashboard,
  Settings,
  LogOut,
  CreditCard,
  Download,
  AlertTriangle,
  Search,
  Filter,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

// New Components
import TaskList, { type Task, type TaskStatus } from "@/components/portal/TaskList";
import TaskDrawer from "@/components/portal/TaskDrawer";
import NewRequestForm from "@/components/portal/NewRequestForm";

// Mock Data
const MOCK_TASKS: Task[] = [
  {
    id: 1,
    title: "Implementación de Diseño Mobile en Hero",
    description: "Ajustar los márgenes y el tamaño de fuente para dispositivos iOS y Android.",
    status: 'IN_SPRINT',
    priority: 'HIGH',
    created_at: "2024-03-21T10:30:00Z",
    comment_count: 3,
    attachment_count: 2
  },
  {
    id: 2,
    title: "Corrección de Bug en Formulario de Contacto",
    description: "El validador de email no acepta dominios .tech.",
    status: 'OPEN',
    priority: 'URGENT',
    created_at: "2024-03-21T11:45:00Z",
    comment_count: 0,
    attachment_count: 1
  },
  {
    id: 3,
    title: "Optimización de Imágenes (WebP)",
    description: "Convertir todos los assets del portfolio a formato WebP para mejorar velocidad.",
    status: 'IN_REVIEW',
    priority: 'MEDIUM',
    created_at: "2024-03-20T09:15:00Z",
    comment_count: 5,
    attachment_count: 0
  },
  {
    id: 4,
    title: "Integración de Google Analytics 4",
    description: "Configurar eventos personalizados para el seguimiento de clics en botones.",
    status: 'DONE',
    priority: 'LOW',
    created_at: "2024-03-19T14:20:00Z",
    comment_count: 2,
    attachment_count: 1
  }
];

const PortalDashboard = () => {
  const { lang } = useI18n();
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* Header Statistics Overlay */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
            { label: "Total Tareas", value: tasks.length, icon: LayoutDashboard, color: "text-[#B454FF]" },
            { label: "En SPRINT", value: tasks.filter(t => t.status === 'IN_SPRINT').length, icon: Play, color: "text-[#B454FF]" },
            { label: "Pendiente Revisión", value: tasks.filter(t => t.status === 'IN_REVIEW').length, icon: AlertTriangle, color: "text-amber-400" },
            { label: "Completado", value: tasks.filter(t => t.status === 'DONE').length, icon: CheckCircle2, color: "text-emerald-400" },
        ].map((stat, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 backdrop-blur-sm group hover:bg-white/[0.04] transition-all">
                <div className="flex justify-between items-start mb-2">
                    <stat.icon className={cn("w-5 h-5", stat.color)} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/20">{stat.label}</span>
                </div>
                <div className="text-3xl font-black text-white">{stat.value}</div>
            </div>
        ))}
      </section>

      {/* Main Actions Bar */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-white/20 group-focus-within:text-[#B454FF] transition-colors" />
            </div>
            <Input 
                placeholder="Buscar peticiones..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border-white/10 rounded-2xl pl-11 h-12 focus:border-[#B454FF]/30 transition-all font-bold text-sm"
            />
        </div>

        <Dialog open={isNewTaskModalOpen} onOpenChange={setIsNewTaskModalOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#B454FF] hover:bg-[#A74CFF] text-white rounded-2xl px-8 h-12 font-black uppercase tracking-[0.2em] shadow-[0_4px_20px_rgba(180,84,255,0.4)] transition-all active:scale-95 gap-3 w-full md:w-auto">
                    <Plus className="w-5 h-5" />
                    NUEVA PETICIÓN
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0D0D0D] border-white/10 text-[#F5F5F5] rounded-[2.5rem] max-w-2xl overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#B454FF] via-[#8A2BE2] to-transparent" />
                <NewRequestForm 
                    onSubmit={() => setIsNewTaskModalOpen(false)} 
                    onCancel={() => setIsNewTaskModalOpen(false)} 
                />
            </DialogContent>
        </Dialog>
      </header>

      {/* Task List Section */}
      <TaskList 
        tasks={filteredTasks} 
        onTaskClick={(task) => setSelectedTask(task)} 
      />

      {/* Interactive Side Drawer */}
      <AnimatePresence>
        {selectedTask && (
            <TaskDrawer 
                task={selectedTask} 
                onClose={() => setSelectedTask(null)} 
            />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortalDashboard;
