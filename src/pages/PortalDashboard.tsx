import React, { useState } from "react";
import { 
  Plus, 
  Search,
  LayoutDashboard,
  Play,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// New Components
import TaskList, { type Task, type TaskStatus, type TaskPriority, type TaskHistoryEntry } from "@/components/portal/TaskList";
import TaskDrawer from "@/components/portal/TaskDrawer";
import NewRequestForm from "@/components/portal/NewRequestForm";

// Mock Data
const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    title: "Implementación de Diseño Mobile en Hero",
    description: "Ajustar los márgenes y el tamaño de fuente para dispositivos iOS y Android.",
    status: 'IN_SPRINT',
    priority: 'HIGH',
    deadline_requested: "2024-04-15",
    deadline_final: "2024-04-12",
    drive_links: "https://figma.com/file/...",
    created_at: "2024-03-21T10:30:00Z",
  },
  {
    id: 2,
    title: "Corrección de Bug en Formulario de Contacto",
    description: "El validador de email no acepta dominios .tech.",
    status: 'OPEN',
    priority: 'URGENT',
    deadline_requested: "2024-03-25",
    created_at: "2024-03-21T11:45:00Z",
  },
  {
    id: 3,
    title: "Optimización de Imágenes (WebP)",
    description: "Convertir todos los assets del portfolio a formato WebP para mejorar velocidad.",
    status: 'IN_REVIEW',
    priority: 'MED',
    deadline_requested: "2024-03-30",
    deadline_final: "2024-03-28",
    created_at: "2024-03-20T09:15:00Z",
  },
];

const PortalDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleUpdateTask = (taskId: number, updates: Partial<Task>, historyEntry?: Omit<TaskHistoryEntry, 'id' | 'createdAt'>) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...updates } : t));
    
    if (selectedTask?.id === taskId) {
        setSelectedTask(prev => prev ? { ...prev, ...updates } : null);
    }
    
    console.log("Auditoría registrada:", historyEntry);
  };

  const handleCreateTask = async (data: { 
    title: string; 
    description: string; 
    priority: TaskPriority; 
    deadline_requested: string; 
    drive_links: string;
    files: File[] 
  }) => {
    const taskId = tasks.length + 1;
    const newTask: Task = {
        id: taskId,
        title: data.title,
        description: data.description,
        status: 'OPEN',
        priority: data.priority,
        deadline_requested: data.deadline_requested,
        drive_links: data.drive_links,
        created_at: new Date().toISOString(),
    };

    // Subida de archivos al servidor Node.js
    if (data.files.length > 0) {
        const formData = new FormData();
        data.files.forEach(file => formData.append("files", file));
        formData.append("userId", "1"); // En un entorno real, ID de la sesión
        formData.append("taskId", taskId.toString());

        try {
            const response = await fetch("http://localhost:3001/api/portal/upload", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                toast.success("Archivos subidos correctamente");
            } else {
                toast.error("Error al subir los archivos");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("No se pudo conectar con el servidor de archivos");
        }
    }

    setTasks(prev => [newTask, ...prev]);
    setIsNewTaskModalOpen(false);
    toast.success("Petición lanzada con éxito");
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* Header Statistics */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
            { label: "Total Tareas", value: tasks.length, icon: LayoutDashboard, color: "text-[#B454FF]" },
            { label: "En SPRINT", value: tasks.filter(t => t.status === 'IN_SPRINT').length, icon: Play, color: "text-[#B454FF]" },
            { label: "Pendiente Revisión", value: tasks.filter(t => t.status === 'IN_REVIEW').length, icon: AlertTriangle, color: "text-orange-400" },
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
            <DialogContent className="bg-[#0D0D0D] border-white/10 text-[#F5F5F5] p-8 rounded-[2.5rem] max-w-2xl overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#B454FF] via-[#8A2BE2] to-transparent" />
                <NewRequestForm 
                    onSubmit={handleCreateTask} 
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
      <TaskDrawer 
        task={selectedTask} 
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)} 
        onUpdate={handleUpdateTask}
      />
    </div>
  );
};

export default PortalDashboard;
