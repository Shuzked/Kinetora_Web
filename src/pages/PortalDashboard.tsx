import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  MessageSquare, 
  Clock, 
  Play, 
  CheckCircle2, 
  Send,
  User,
  MoreVertical,
  LayoutDashboard,
  Settings,
  LogOut,
  CreditCard,
  Download,
  FileText,
  AlertTriangle,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

// Mock types
interface Comment {
  id: number;
  user: string;
  role: 'client' | 'admin';
  message: string;
  date: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pendiente' | 'sprint' | 'hecho';
  date: string;
  comments: Comment[];
}

interface Invoice {
    id: string;
    date: string;
    amount: string;
    status: 'paid' | 'pending';
    pdfUrl: string;
}

const PortalDashboard = () => {
  const { lang } = useI18n();
  const [activeTab, setActiveTab] = useState<'tasks' | 'billing'>('tasks');
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Rediseño de Landing Page",
      description: "Implementar la nueva guía de estilos en la sección Hero.",
      status: 'sprint',
      date: "2024-03-21",
      comments: [
        { id: 1, user: "Kinetora Admin", role: 'admin', message: "Hemos empezado con la animación del gradiente.", date: "10:30 AM" },
        { id: 2, user: "Cliente", role: 'client', message: "¡Genial! Me gusta cómo está quedando.", date: "11:15 AM" }
      ]
    },
    {
      id: 2,
      title: "Integración de API Pagos",
      description: "Configurar Stripe para el portal de clientes.",
      status: 'pendiente',
      date: "2024-03-20",
      comments: []
    },
    {
      id: 3,
      title: "Optimización SEO",
      description: "Corregir meta-etiquetas duplicadas en el blog.",
      status: 'hecho',
      date: "2024-03-19",
      comments: []
    }
  ]);

  const [invoices] = useState<Invoice[]>([
    { id: "INV-2024-001", date: "2024-03-01", amount: "1.499,00 €", status: 'paid', pdfUrl: "#" },
    { id: "INV-2024-002", date: "2024-02-01", amount: "1.499,00 €", status: 'paid', pdfUrl: "#" },
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newComment, setNewComment] = useState("");
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const subscriptionStartDate = new Date("2024-03-05");
  const today = new Date();
  const diffDays = Math.floor((today.getTime() - subscriptionStartDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysLeft = 31 - diffDays;
  const progressValue = Math.min(Math.max((diffDays / 31) * 100, 0), 100);

  const handleAddTask = () => {
    if (!newTask.title) return;
    const task: Task = {
      id: tasks.length + 1,
      title: newTask.title,
      description: newTask.description,
      status: 'pendiente',
      date: new Date().toISOString().split('T')[0],
      comments: []
    };
    setTasks([task, ...tasks]);
    setNewTask({ title: "", description: "" });
    setIsNewTaskModalOpen(false);
  };

  const handleAddComment = () => {
    if (!selectedTask || !newComment) return;
    const comment: Comment = {
      id: Date.now(),
      user: "Cliente",
      role: 'client',
      message: newComment,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setTasks(tasks.map(t => 
      t.id === selectedTask.id 
        ? { ...t, comments: [...t.comments, comment] } 
        : t
    ));
    setSelectedTask({ ...selectedTask, comments: [...selectedTask.comments, comment] });
    setNewComment("");
  };

  const statusIcons = {
    pendiente: <Clock className="w-4 h-4 text-amber-400" />,
    sprint: <Play className="w-4 h-4 text-[#B454FF]" />,
    hecho: <CheckCircle2 className="w-4 h-4 text-emerald-400" />
  };

  const statusLabels = {
    es: { pendiente: "Pendiente", sprint: "En Trabajo", hecho: "Completada" },
    en: { pendiente: "Pending", sprint: "In Progress", hecho: "Completed" }
  };

  return (
    <div className="min-h-screen text-[#F5F5F5] font-sans">
      {/* Sidebar / Nav Simple */}
      <nav className="fixed left-0 top-0 h-full w-20 md:w-64 bg-[#0D0D0D]/40 backdrop-blur-xl border-r border-white/10 z-50 flex flex-col items-center py-8">
        <div className="mb-12">
          <img src="/assets/logo.svg" alt="Kinetora" className="w-10 h-10" />
        </div>
        
        <div className="flex flex-col gap-8 flex-1 w-full px-4">
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab('tasks')}
            className={cn(
                "w-full px-4 justify-start gap-3 rounded-xl transition-all",
                activeTab === 'tasks' ? "bg-[#B454FF]/10 text-[#B454FF]" : "text-[#F5F5F5]/60 hover:bg-white/5"
            )}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="hidden md:inline font-bold uppercase tracking-widest text-[10px]">Mis Tareas</span>
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab('billing')}
            className={cn(
                "w-full px-4 justify-start gap-3 rounded-xl transition-all",
                activeTab === 'billing' ? "bg-[#B454FF]/10 text-[#B454FF]" : "text-[#F5F5F5]/60 hover:bg-white/5"
            )}
          >
            <CreditCard className="w-5 h-5" />
            <span className="hidden md:inline font-bold uppercase tracking-widest text-[10px]">Suscripción</span>
          </Button>
          <Button variant="ghost" className="w-full px-4 justify-start gap-3 text-[#F5F5F5]/40 hover:bg-white/5 rounded-xl">
            <Settings className="w-5 h-5" />
            <span className="hidden md:inline font-bold uppercase tracking-widest text-[10px]">Ajustes</span>
          </Button>
        </div>

        <Button variant="ghost" className="w-full px-4 justify-start gap-3 text-red-500/40 hover:bg-red-500/5 hover:text-red-500 rounded-xl mt-auto">
          <LogOut className="w-5 h-5" />
          <span className="hidden md:inline font-bold uppercase tracking-widest text-[10px]">Salir</span>
        </Button>
      </nav>

      <main className="pl-20 md:pl-64 pt-8 px-6 md:px-12 pb-20">
        <AnimatePresence mode="wait">
            {activeTab === 'tasks' ? (
                <motion.div
                    key="tasks-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter uppercase mb-1">
                        {lang === "es" ? "Mis Tareas" : "My Tasks"}
                        </h1>
                        <p className="text-[#F5F5F5]/50 text-xs font-bold uppercase tracking-widest">
                        {lang === "es" ? "Seguimiento en tiempo real de tu proyecto" : "Real-time tracking of your project"}
                        </p>
                    </div>

                    <Dialog open={isNewTaskModalOpen} onOpenChange={setIsNewTaskModalOpen}>
                        <DialogTrigger asChild>
                        <Button className="bg-[#B454FF] hover:bg-[#A74CFF] text-white rounded-xl px-6 h-12 font-bold shadow-[0_4px_15px_rgba(180,84,255,0.3)] transition-all active:scale-95 gap-2">
                            <Plus className="w-5 h-5" />
                            {lang === "es" ? "NUEVA TAREA" : "NEW TASK"}
                        </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#111111] border-white/10 text-[#F5F5F5] rounded-3xl overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B454FF] to-transparent" />
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black uppercase tracking-tight">
                            {lang === "es" ? "Nueva Petición" : "New Request"}
                            </DialogTitle>
                            <DialogDescription className="text-[#F5F5F5]/60">
                            {lang === "es" ? "Cuéntanos qué necesitas y lo pondremos en marcha." : "Tell us what you need and we'll get it started."}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-[#F5F5F5]/50">Título</label>
                            <Input 
                                placeholder="Ej. Añadir botón de contacto..." 
                                value={newTask.title}
                                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                                className="bg-white/5 border-white/10 rounded-xl h-12"
                            />
                            </div>
                            <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-[#F5F5F5]/50">Descripción</label>
                            <Textarea 
                                placeholder="Danos más detalles sobre este cambio..." 
                                className="bg-white/5 border-white/10 rounded-xl min-h-[120px]"
                                value={newTask.description}
                                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                            />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button 
                            onClick={handleAddTask}
                            className="w-full bg-[#B454FF] hover:bg-[#A74CFF] h-12 rounded-xl font-bold"
                            >
                            {lang === "es" ? "ENVIAR PETICIÓN" : "SEND REQUEST"}
                            </Button>
                        </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    </header>

                    {/* Status Board (Columns) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {(['pendiente', 'sprint', 'hecho'] as const).map((status) => (
                        <div key={status} className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`p-1.5 rounded-lg ${
                            status === 'pendiente' ? 'bg-amber-500/10 text-amber-500' : 
                            status === 'sprint' ? 'bg-[#B454FF]/10 text-[#B454FF]' : 
                            'bg-emerald-500/10 text-emerald-500'
                            }`}>
                            {statusIcons[status]}
                            </div>
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#F5F5F5]/60">
                            {statusLabels[lang === "es" ? "es" : "en"][status]}
                            </h2>
                            <Badge variant="outline" className="ml-auto border-white/10 text-xs text-[#F5F5F5]/40 h-5 px-1.5">
                            {tasks.filter(t => t.status === status).length}
                            </Badge>
                        </div>

                        <div className="space-y-4">
                            {tasks.filter(t => t.status === status).map((task) => (
                            <motion.div
                                key={task.id}
                                layoutId={`task-${task.id}`}
                                onClick={() => setSelectedTask(task)}
                                className="group cursor-pointer"
                            >
                                <Card className="bg-white/[0.03] border-white/10 hover:border-[#B454FF]/40 hover:bg-white/[0.06] transition-all duration-300 rounded-[1.5rem] overflow-hidden backdrop-blur-sm">
                                <CardHeader className="p-5 pb-3">
                                    <div className="flex justify-between items-start gap-2 mb-2">
                                    <CardTitle className="text-base font-bold text-[#F5F5F5] group-hover:text-white transition-colors">
                                        {task.title}
                                    </CardTitle>
                                    <MoreVertical className="w-4 h-4 text-white/20" />
                                    </div>
                                    <CardDescription className="text-sm text-[#F5F5F5]/60 line-clamp-2 leading-relaxed">
                                    {task.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter className="p-5 pt-0 flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                    <Avatar className="w-6 h-6 border-2 border-[#111] ring-1 ring-white/10">
                                        <AvatarImage src="/assets/testimonials/carlos-roldan.webp" />
                                        <AvatarFallback>C</AvatarFallback>
                                    </Avatar>
                                    <Avatar className="w-6 h-6 border-2 border-[#111] ring-1 ring-white/10">
                                        <AvatarImage src="/assets/logo.svg" />
                                        <AvatarFallback>K</AvatarFallback>
                                    </Avatar>
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] font-bold text-[#F5F5F5]/40 uppercase tracking-widest">
                                    <div className="flex items-center gap-1">
                                        <MessageSquare className="w-3 h-3" />
                                        {task.comments.length}
                                    </div>
                                    <span>{task.date}</span>
                                    </div>
                                </CardFooter>
                                </Card>
                            </motion.div>
                            ))}
                        </div>
                        </div>
                    ))}
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="billing-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    <header className="mb-12">
                        <h1 className="text-3xl font-black tracking-tighter uppercase mb-1">
                            Suscripción y Facturas
                        </h1>
                        <p className="text-[#F5F5F5]/50 text-xs font-bold uppercase tracking-widest">
                            Gestiona tu plan y pagos de Kinetora
                        </p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        {/* Status Card */}
                        <Card className="bg-white/[0.03] border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md">
                            <CardHeader className="p-8 pb-0">
                                <div className="flex items-center justify-between mb-4">
                                    <Badge className="bg-[#B454FF]/10 text-[#B454FF] border-none rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">
                                        Plan Business Pro
                                    </Badge>
                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Activo</span>
                                </div>
                                <CardTitle className="text-4xl font-black tracking-tighter uppercase mb-2">
                                    {daysLeft} días restantes
                                </CardTitle>
                                <CardDescription className="text-sm font-bold text-white/50 uppercase tracking-wider">
                                    Tu suscripción se renueva el {new Date(subscriptionStartDate.getTime() + 31 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="space-y-4">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-[#F5F5F5]/40">
                                        <span>Inicio: {subscriptionStartDate.toLocaleDateString()}</span>
                                        <span>Ciclo de 31 días</span>
                                    </div>
                                    <div className="relative h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progressValue}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className={cn(
                                                "h-full rounded-full transition-colors duration-500",
                                                daysLeft < 5 ? "bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]" : 
                                                daysLeft < 10 ? "bg-amber-500" : "bg-[#B454FF]"
                                            )}
                                        />
                                    </div>
                                    {daysLeft < 5 && (
                                        <div className="flex items-center gap-2 text-red-400 text-[10px] font-black uppercase tracking-widest animate-pulse">
                                            <AlertTriangle className="w-3 h-3" />
                                            Atención: Realiza el pago para evitar interrupciones
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Data Card */}
                        <Card className="bg-white/[0.04] border-[#B454FF]/30 rounded-[2.5rem] overflow-hidden relative shadow-[0_0_40px_rgba(180,84,255,0.1)]">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B454FF]/10 blur-3xl -mr-16 -mt-16" />
                            <CardHeader className="p-8">
                                <CardTitle className="text-xl font-black tracking-tighter uppercase mb-1">
                                    Datos de Renovación
                                </CardTitle>
                                <CardDescription className="text-sm text-white/60">
                                    Realiza tu transferencia bancaria para renovar el servicio.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 pt-0 space-y-6">
                                <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[10px] font-black text-[#B454FF] uppercase tracking-[0.2em] mb-2">IBAN de Destino</p>
                                            <p className="text-lg font-mono font-bold tracking-tight text-white select-all">ES43 0000 1111 22 3333444455</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-[#B454FF] uppercase tracking-[0.2em] mb-2">Concepto Requerido</p>
                                            <p className="text-lg font-bold text-white uppercase tracking-tight">KINETORA_PORTAL_CLIENTE</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 italic">
                                    <FileText className="w-3 h-3" />
                                    Tu factura se generará automáticamente tras recibir el pago.
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Invoice History */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-xl font-black tracking-tighter uppercase">Historial de Facturas</h2>
                            <div className="h-px flex-1 bg-white/5" />
                        </div>
                        
                        <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                            <Table>
                                <TableHeader className="bg-white/5">
                                    <TableRow className="border-white/5 hover:bg-transparent uppercase">
                                        <TableHead className="text-[10px] font-black tracking-widest text-white/40 h-12">Nº Factura</TableHead>
                                        <TableHead className="text-[10px] font-black tracking-widest text-white/40">Fecha</TableHead>
                                        <TableHead className="text-[10px] font-black tracking-widest text-white/40">Importe</TableHead>
                                        <TableHead className="text-[10px] font-black tracking-widest text-white/40">Estado</TableHead>
                                        <TableHead className="text-right text-[10px] font-black tracking-widest text-white/40">Acción</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {invoices.map((inv) => (
                                        <TableRow key={inv.id} className="border-white/5 hover:bg-white/[0.03] transition-colors">
                                            <TableCell className="font-bold text-white py-4">{inv.id}</TableCell>
                                            <TableCell className="text-white/60">{new Date(inv.date).toLocaleDateString()}</TableCell>
                                            <TableCell className="font-black text-white">{inv.amount}</TableCell>
                                            <TableCell>
                                                <Badge className={cn(
                                                    "bg-emerald-500/10 text-emerald-500 border-none rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-widest",
                                                    inv.status === 'pending' && "bg-amber-500/10 text-amber-500"
                                                )}>
                                                    {inv.status === 'paid' ? 'PAGADA' : 'PENDIENTE'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button size="sm" variant="ghost" className="h-8 group hover:bg-[#B454FF]/10 text-[#B454FF] gap-2 rounded-lg">
                                                    <Download className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">PDF</span>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </main>

      {/* Task Details & Chat Overlay */}
      <AnimatePresence>
        {selectedTask && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTask(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div 
              layoutId={`task-${selectedTask.id}`}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#0D0D0D] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              {/* Task Info Shell */}
              <div className="flex-1 p-8 md:p-10 overflow-y-auto border-r border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <Badge className={`${
                    selectedTask.status === 'pendiente' ? 'bg-amber-500/10 text-amber-500' : 
                    selectedTask.status === 'sprint' ? 'bg-[#B454FF]/10 text-[#B454FF]' : 
                    'bg-emerald-500/10 text-emerald-500'
                  } border-none rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest`}>
                    {statusLabels[lang === "es" ? "es" : "en"][selectedTask.status]}
                  </Badge>
                  <span className="text-[#F5F5F5]/40 text-xs font-bold uppercase tracking-widest">{selectedTask.date}</span>
                </div>

                <h2 className="text-3xl font-black text-[#F5F5F5] uppercase tracking-tighter mb-4 leading-none">
                  {selectedTask.title}
                </h2>
                <p className="text-[#F5F5F5]/70 text-lg leading-relaxed mb-8">
                  {selectedTask.description}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <p className="text-[10px] font-black text-[#F5F5F5]/40 uppercase tracking-[0.2em] mb-1">Encargado</p>
                    <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                            <AvatarImage src="/assets/logo.svg" />
                        </Avatar>
                        <span className="text-sm font-bold">Kinetora Agency</span>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <p className="text-[10px] font-black text-[#F5F5F5]/40 uppercase tracking-[0.2em] mb-1">Prioridad</p>
                    <span className="text-sm font-bold text-[#B454FF]">Alta</span>
                  </div>
                </div>
              </div>

              {/* Chat Feed */}
              <div className="w-full md:w-[350px] flex flex-col bg-white/[0.02]">
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-[0.25em] text-[#F5F5F5]">Comentarios</h3>
                  <Badge variant="outline" className="border-white/10 text-[10px]">{selectedTask.comments.length}</Badge>
                </div>

                <ScrollArea className="flex-1 p-6 h-[300px] md:h-auto">
                  <div className="space-y-6">
                    {selectedTask.comments.length > 0 ? (
                      selectedTask.comments.map((c) => (
                        <div key={c.id} className={`flex flex-col ${c.role === 'client' ? 'items-end' : 'items-start'}`}>
                          <div className="flex items-center gap-2 mb-2">
                             <Avatar className="w-5 h-5 border border-white/10">
                                <AvatarFallback className="text-[10px]">{c.user[0]}</AvatarFallback>
                             </Avatar>
                             <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{c.user}</span>
                          </div>
                          <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                            c.role === 'client' 
                              ? 'bg-[#B454FF] text-white rounded-tr-none' 
                              : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none'
                          }`}>
                            {c.message}
                          </div>
                          <span className="text-[9px] text-white/20 font-bold mt-1 uppercase">{c.date}</span>
                        </div>
                      ))
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center py-12">
                        <MessageSquare className="w-8 h-8 text-white/10 mb-2" />
                        <p className="text-xs font-bold text-white/30 uppercase tracking-widest">No hay comentarios aún</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <div className="p-6 mt-auto border-t border-white/10 bg-[#0D0D0D]/50">
                  <div className="relative">
                    <Input 
                      placeholder={lang === "es" ? "Escribe un mensaje..." : "Type a message..."}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                      className="bg-white/5 border-white/10 rounded-2xl pr-12 h-12 text-xs"
                    />
                    <Button 
                      size="icon"
                      onClick={handleAddComment}
                      className="absolute right-1 top-1 h-10 w-10 bg-[#B454FF] hover:bg-[#A74CFF] rounded-xl"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Close Button Mobile Header */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSelectedTask(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-white/40 hover:text-white"
              >
                <Plus className="w-6 h-6 rotate-45" />
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortalDashboard;
