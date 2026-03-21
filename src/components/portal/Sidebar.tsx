import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  FileText, 
  CreditCard, 
  Settings, 
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { icon: LayoutDashboard, label: "Mis Peticiones", path: "/portal/dashboard" },
  { icon: FileText, label: "Mis Entregables", path: "/portal/entregables" },
  { icon: CreditCard, label: "Facturación", path: "/portal/billing" },
  { icon: Settings, label: "Ajustes", path: "/portal/settings" },
];

// Mock user data from DB context
const MOCK_USER = {
    name: "John Doe",
    plan: "Business Pro",
    subscription_start_date: "2024-03-22" // Debería venir de la DB/Auth
};

const Sidebar = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [daysRemaining, setDaysRemaining] = useState(31);

  useEffect(() => {
    const calculateProgress = () => {
        const start = new Date(MOCK_USER.subscription_start_date);
        const today = new Date();
        
        // Calcular diferencia en milisegundos y convertir a días
        const diffTime = today.getTime() - start.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        const cycleDays = 31;
        const currentDayInCycle = diffDays % cycleDays;
        const remaining = cycleDays - currentDayInCycle;
        
        const progressPercentage = (currentDayInCycle / cycleDays) * 100;
        
        setProgress(progressPercentage);
        setDaysRemaining(remaining);
    };

    calculateProgress();
    // Actualizar cada hora
    const interval = setInterval(calculateProgress, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0D0D0D]/40 backdrop-blur-2xl border-r border-white/5 flex flex-col py-10 px-6 z-50">
      {/* Brand & User */}
      <Link to="/portal/settings" className="flex flex-col items-center mb-12 group/avatar">
        <div className="relative mb-4">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#B454FF] to-[#8A2BE2] rounded-full blur opacity-20 group-hover/avatar:opacity-60 transition duration-500"></div>
          <Avatar className="w-20 h-20 border-2 border-white/10 ring-4 ring-black/40 relative transition-transform duration-500 group-hover/avatar:scale-105">
            <AvatarImage src="/assets/logo.svg" className="p-4" />
            <AvatarFallback className="bg-[#1A1A1A] text-white font-bold">JD</AvatarFallback>
          </Avatar>
        </div>
        <h3 className="text-white font-bold tracking-tight text-lg mb-0.5 group-hover/avatar:text-[#B454FF] transition-colors">{MOCK_USER.name}</h3>
        <p className="text-white/40 text-[10px] uppercase font-black tracking-widest">Plan {MOCK_USER.plan}</p>
      </Link>

      {/* Subscription Progress */}
      <div className="mb-12 px-2">
        <div className="flex justify-between items-end mb-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Suscripción</span>
            <span className={cn(
                "text-[10px] font-bold transition-colors",
                daysRemaining < 5 ? "text-red-400" : "text-[#B454FF]"
            )}>
                {daysRemaining} días restantes
            </span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className={cn(
                    "absolute inset-0 shadow-[0_0_15px_rgba(180,84,255,0.5)] transition-colors",
                    daysRemaining < 5 
                        ? "bg-gradient-to-r from-red-500 to-orange-400" 
                        : "bg-gradient-to-r from-[#B454FF] to-[#D8B4FF]"
                )}
            />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 h-12 rounded-xl transition-all duration-300 group",
                  isActive 
                    ? "bg-[#B454FF]/10 text-[#B454FF] border border-[#B454FF]/20" 
                    : "text-white/50 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-[#B454FF]" : "text-inherit"
                )} />
                <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                {isActive && (
                    <motion.div 
                        layoutId="active-indicator"
                        className="ml-auto w-1 h-4 bg-[#B454FF] rounded-full"
                    />
                )}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <Button 
        variant="ghost" 
        onClick={() => {
            localStorage.removeItem("kinetora_session");
            window.location.reload();
        }}
        className="mt-auto justify-start gap-3 h-12 rounded-xl text-red-500/40 hover:bg-red-500/5 hover:text-red-500 transition-colors group"
      >
        <LogOut className="w-5 h-5" />
        <span className="text-xs font-bold uppercase tracking-widest text-inherit">Cerrar Sesión</span>
      </Button>
    </aside>
  );
};

export default Sidebar;
