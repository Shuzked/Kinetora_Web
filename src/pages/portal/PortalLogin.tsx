import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PortalLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock login
    setTimeout(() => {
      localStorage.setItem("kinetora_session", "mock_session_token");
      setLoading(false);
      navigate("/portal/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#B454FF]/10 rounded-full blur-[100px]" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#8A2BE2]/10 rounded-full blur-[100px]" />

      <Card className="w-full max-w-md bg-white/[0.03] border-white/10 backdrop-blur-xl rounded-[2.5rem] p-4 shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-[#B454FF]/10 rounded-2xl flex items-center justify-center border border-[#B454FF]/20">
            <img src="/assets/logo.svg" alt="Kinetora" className="w-8 h-8" width={32} height={32} loading="lazy" decoding="async" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-3xl font-black tracking-tighter uppercase text-white">Portal Kinetora</CardTitle>
            <CardDescription className="text-white/50 text-xs font-bold uppercase tracking-widest">Inicia sesión para gestionar tus proyectos</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Email</Label>
              <Input 
                type="email" 
                placeholder="ejemplo@empresa.com" 
                className="bg-white/5 border-white/10 rounded-xl h-12 focus:border-[#B454FF]/50 transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Contraseña</Label>
                <a href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B454FF] hover:text-[#D8B4FF] transition-colors">¿Olvidaste?</a>
              </div>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="bg-white/5 border-white/10 rounded-xl h-12 focus:border-[#B454FF]/50 transition-all"
                required
              />
            </div>
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#B454FF] hover:bg-[#A74CFF] text-white h-12 rounded-xl font-bold uppercase tracking-[0.1em] shadow-[0_4px_15px_rgba(180,84,255,0.3)] transition-all active:scale-95 flex gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  ACCEDER AL ÁREA PRIVADA
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortalLogin;
