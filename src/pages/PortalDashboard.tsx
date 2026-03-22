import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search,
  LayoutDashboard,
  Play,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  MoreVertical,
  Eye,
  Check,
  Trash2,
  X as CloseIcon,
  List,
  LayoutGrid
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
import TaskBoard, { type Task, type Status, type TaskPriority } from "@/components/portal/TaskList";
import TaskListView from "@/components/portal/TaskListView";
import TaskDrawer from "@/components/portal/TaskDrawer";
import NewRequestForm from "@/components/portal/NewRequestForm";
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { io, Socket } from "socket.io-client";

// Initial Configuration
const INITIAL_STATUSES: Status[] = [
  { id: 'OPEN', label: 'ABIERTO', color: '#FFFFFF', category: 'ACTIVE' },
  { id: 'IN_SPRINT', label: 'EN SPRINT', color: '#B454FF', category: 'ACTIVE' },
  { id: 'IN_REVIEW', label: 'EN REVISIÓN', color: '#F97316', category: 'ACTIVE' },
  { id: 'DONE', label: 'COMPLETADO', color: '#22C55E', category: 'DONE' },
];

const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    title: "Implementación de Diseño Mobile en Hero",
    description: "Ajustar los márgenes y el tamaño de fuente para dispositivos iOS y Android.",
    statusId: 'IN_SPRINT',
    priority: 'HIGH',
    deadline_requested: "2024-04-15",
    deadline_final: "2024-04-12",
    drive_links: "https://figma.com/file/...",
    created_at: "2024-03-21T10:30:00Z",
    subtasks: [{ id: '1', title: 'Ajustar padding', isDone: true }, { id: '2', title: 'Font sizes', isDone: false }]
  },
  {
    id: 2,
    title: "Corrección de Bug en Formulario de Contacto",
    description: "El validador de email no acepta dominios .tech.",
    statusId: 'OPEN',
    priority: 'URGENT',
    deadline_requested: "2024-03-25",
    created_at: "2024-03-21T11:45:00Z",
  },
];

const PortalDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [statuses, setStatuses] = useState<Status[]>(INITIAL_STATUSES);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]); // Status IDs to hide
  const [viewMode, setViewMode] = useState<'BOARD' | 'LIST'>('LIST');
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3001");

    socketRef.current.on("task-updated", ({ taskId, updates }) => {
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...updates } : t));
    });

    socketRef.current.on("board-task-updated", ({ taskId, updates }) => {
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...updates } : t));
    });

    socketRef.current.on("subtask-synced", ({ taskId, subtask, action }) => {
        setTasks(prev => prev.map(t => {
            if (t.id !== taskId) return t;
            let newSubtasks = [...(t.subtasks || [])];
            if (action === 'add') newSubtasks.push(subtask);
            else if (action === 'toggle') newSubtasks = newSubtasks.map(s => s.id === subtask.id ? subtask : s);
            else if (action === 'delete') newSubtasks = newSubtasks.filter(s => s.id !== subtask.id);
            return { ...t, subtasks: newSubtasks };
        }));
    });

    return () => {
        socketRef.current?.disconnect();
    };
  }, []);

  const selectedTasksCount = tasks.filter(t => t.selected).length;

  const handleUpdateTask = (taskId: number, updates: Partial<Task>, changeType?: string, oldValue?: any, newValue?: any) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...updates } : t));
    if (selectedTask?.id === taskId) {
        setSelectedTask(prev => prev ? { ...prev, ...updates } : null);
    }

    if (socketRef.current) {
        socketRef.current.emit("update-task", {
            taskId,
            updates,
            changeType,
            oldValue,
            newValue,
            userId: 1
        });
    }
  };

  const handleUpdateStatus = (statusId: string, updates: Partial<Status>) => {
    setStatuses(prev => prev.map(s => s.id === statusId ? { ...s, ...updates } : s));
  };

  const handleSelectTask = (taskId: number, isSelected: boolean) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, selected: isSelected } : t));
  };

  const handleBulkUpdateStatus = (newStatusId: string) => {
    const selectedIds = tasks.filter(t => t.selected).map(t => t.id);
    setTasks(prev => prev.map(t => t.selected ? { ...t, statusId: newStatusId, selected: false } : t));
    
    selectedIds.forEach(id => {
        if (socketRef.current) {
            socketRef.current.emit("update-task", {
                taskId: id,
                updates: { statusId: newStatusId },
                changeType: 'status',
                oldValue: tasks.find(t => t.id === id)?.statusId,
                newValue: newStatusId,
                userId: 1
            });
        }
    });

    toast.success(`${selectedTasksCount} tareas movidas a ${statuses.find(s => s.id === newStatusId)?.label}`);
  };

  const handleBulkDelete = () => {
    setTasks(prev => prev.filter(t => !t.selected));
    toast.success(`${selectedTasksCount} tareas eliminadas`);
  };

   const handleCreateTask = async (data: any) => {
    // If data is a string, it's a quick-add title
    const isQuickAdd = typeof data === 'string';
    const title = isQuickAdd ? data : data.title;
    
    const taskId = tasks.length + 1;
    const newTask: Task = {
        id: taskId,
        title: title || "Nueva Tarea",
        description: isQuickAdd ? "" : data.description,
        statusId: isQuickAdd ? (data as any).statusId || 'OPEN' : data.statusId || 'OPEN',
        priority: isQuickAdd ? 'MED' : data.priority,
        deadline_requested: isQuickAdd ? null : data.deadline_requested,
        drive_links: isQuickAdd ? "" : data.drive_links,
        created_at: new Date().toISOString(),
        subtasks: []
    };

    setTasks(prev => [newTask, ...prev]);
    if (!isQuickAdd) setIsNewTaskModalOpen(false);
    
    if (socketRef.current) {
        socketRef.current.emit("create-task", newTask);
    }

    toast.success("Petición creada con éxito");
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !activeFilters.includes(task.statusId)
  );

  return (
    <div className="relative pb-24">
      <div className="space-y-10">
        {/* Header Statistics */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
              { label: "Total Tareas", value: tasks.length, icon: LayoutDashboard, color: "text-[#B454FF]" },
              { label: "Activas", value: tasks.filter(t => statuses.find(s => s.id === t.statusId)?.category === 'ACTIVE').length, icon: Play, color: "text-[#B454FF]" },
              { label: "Hecho", value: tasks.filter(t => statuses.find(s => s.id === t.statusId)?.category === 'DONE').length, icon: CheckCircle2, color: "text-emerald-400" },
              { label: "Seleccionadas", value: selectedTasksCount, icon: Check, color: "text-blue-400" },
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
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto flex-1">
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

            <div className="flex items-center bg-white/5 p-1.5 rounded-2xl border border-white/10 ml-0 md:ml-auto">
                <button 
                  onClick={() => setViewMode('LIST')}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    viewMode === 'LIST' ? "bg-[#B454FF] text-white shadow-[0_0_20px_rgba(180,84,255,0.3)]" : "text-white/30 hover:text-white"
                  )}
                >
                  <List className="w-4 h-4" />
                  Lista
                </button>
                <button 
                  onClick={() => setViewMode('BOARD')}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    viewMode === 'BOARD' ? "bg-[#B454FF] text-white shadow-[0_0_20px_rgba(180,84,255,0.3)]" : "text-white/30 hover:text-white"
                  )}
                >
                  <LayoutGrid className="w-4 h-4" />
                  Tablero
                </button>
            </div>

            {/* Smart Filters */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-12 px-6 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/10 transition-all gap-2">
                        <MoreVertical className="w-4 h-4" />
                        Filtros
                        {activeFilters.length > 0 && (
                            <span className="w-4 h-4 rounded-full bg-[#B454FF] text-white text-[9px] flex items-center justify-center">
                                {activeFilters.length}
                            </span>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#141414] border-white/10 w-56">
                    <div className="p-2 border-b border-white/5 mb-1">
                        <span className="text-[9px] font-black text-white/20 uppercase tracking-widest pl-2">Ocultar Estados</span>
                    </div>
                    {statuses.map(s => (
                        <DropdownMenuItem 
                            key={s.id} 
                            onClick={(e) => {
                                e.preventDefault();
                                setActiveFilters(prev => 
                                    prev.includes(s.id) ? prev.filter(id => id !== s.id) : [...prev, s.id]
                                );
                            }}
                            className="flex items-center justify-between text-white"
                        >
                            <span className="text-xs font-bold">{s.label}</span>
                            {activeFilters.includes(s.id) ? (
                                <Eye className="w-3.5 h-3.5 text-red-400" />
                            ) : (
                                <Check className="w-3.5 h-3.5 text-[#B454FF]" />
                            )}
                        </DropdownMenuItem>
                    ))}
                    {activeFilters.length > 0 && (
                        <DropdownMenuItem 
                            onClick={() => setActiveFilters([])}
                            className="text-white/40 justify-center text-[10px] font-black uppercase mt-1 border-t border-white/5"
                        >
                            Limpiar Filtros
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
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
          </div>
        </header>

        {/* Task View Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === 'BOARD' ? (
              <TaskBoard 
                tasks={filteredTasks} 
                statuses={statuses}
                onTaskClick={(task) => setSelectedTask(task)} 
                onUpdateTask={handleUpdateTask}
                onUpdateStatus={handleUpdateStatus}
                onSelectTask={handleSelectTask}
                onCreateTask={(statusId) => {
                    setIsNewTaskModalOpen(true);
                }}
              />
            ) : (
              <TaskListView 
                tasks={filteredTasks}
                statuses={statuses}
                onTaskClick={(task) => setSelectedTask(task)}
                onUpdateTask={handleUpdateTask}
                onUpdateStatus={handleUpdateStatus}
                onSelectTask={handleSelectTask}
                onCreateTask={(statusId, title) => {
                    if (title) {
                        handleCreateTask({ title, statusId });
                    } else {
                        setIsNewTaskModalOpen(true);
                    }
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Task Drawer */}
        <TaskDrawer 
          task={selectedTask} 
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)} 
          onUpdate={handleUpdateTask}
          statuses={statuses}
        />
      </div>

      {/* Floating Bulk Actions Toolbar - ClickUp Style Precision */}
      <AnimatePresence>
        {selectedTasksCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: 100, opacity: 0, x: "-50%" }}
            className="fixed bottom-6 md:bottom-10 left-1/2 z-[200] flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-8 px-6 md:px-10 py-4 md:py-5 bg-[#111111]/90 border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-3xl ring-1 ring-white/5 w-[90vw] md:w-auto md:min-w-[600px] justify-between md:justify-start"
          >
            <div className="flex items-center gap-4 pr-8 border-r border-white/10">
                <div className="w-10 h-10 rounded-2xl bg-[#B454FF] flex items-center justify-center text-xs font-black shadow-[0_0_20px_rgba(180,84,255,0.4)] text-white">
                    {selectedTasksCount}
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-[#B454FF] uppercase tracking-[0.2em]">Seleccionadas</span>
                    <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Acciones Masivas</span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button 
                            variant="ghost" 
                            className="premium-apple-button premium-apple-button-ghost h-12 px-6 gap-2.5 text-[10px] font-black uppercase tracking-widest"
                        >
                            <Play className="w-4 h-4 text-[#B454FF]" />
                            Mover a...
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#141414] border-white/10 p-2 rounded-2xl min-w-[200px]">
                        {statuses.map(s => (
                            <DropdownMenuItem 
                                key={s.id} 
                                onClick={() => handleBulkUpdateStatus(s.id)} 
                                className="text-[11px] font-bold text-white/60 hover:text-white hover:bg-white/5 rounded-xl p-3 cursor-pointer gap-2"
                            >
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                                {s.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button 
                    variant="ghost" 
                    className="premium-apple-button premium-apple-button-ghost h-12 px-6 gap-2.5 text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    onClick={handleBulkDelete}
                >
                    <Trash2 className="w-4 h-4" />
                    Eliminar
                </Button>
            </div>

            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setTasks(tasks.map(t => ({ ...t, selected: false })))}
                className="ml-auto w-10 h-10 rounded-full hover:bg-white/5 text-white/20 hover:text-white transition-all premium-apple-button"
            >
                <CloseIcon className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortalDashboard;
