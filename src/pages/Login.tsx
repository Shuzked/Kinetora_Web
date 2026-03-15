"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Logo from '@/components/Logo';
import { Chrome, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[100%] md:w-[60%] h-[60%] bg-[#B454FF]/10 rounded-full blur-[80px] md:blur-[140px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[80%] md:w-[40%] h-[40%] bg-[#B454FF]/5 rounded-full blur-[60px] md:blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <Link to="/" className="mb-6 hover:opacity-80 transition-opacity">
            <Logo className="h-8 md:h-10" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-black text-[#F5F5F5] tracking-tighter uppercase">Bienvenido a Kinetora</h1>
          <p className="text-[#2A2A2A] font-bold text-[10px] md:text-xs uppercase tracking-widest mt-2">Tu sistema operativo creativo</p>
        </div>

        <div className="bg-[#111111] border border-[#2A2A2A] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-2xl">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#0D0D0D] border border-[#2A2A2A] rounded-full p-1 mb-6 md:mb-8">
              <TabsTrigger value="login" className="rounded-full data-[state=active]:bg-[#B454FF] data-[state=active]:text-white font-bold text-[10px] md:text-xs uppercase tracking-widest">Entrar</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-full data-[state=active]:bg-[#B454FF] data-[state=active]:text-white font-bold text-[10px] md:text-xs uppercase tracking-widest">Registro</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-[#2A2A2A] ml-1">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2A2A2A]" />
                    <Input id="email" type="email" placeholder="tu@email.com" className="bg-[#0D0D0D] border-[#2A2A2A] rounded-full pl-12 h-12 text-[#F5F5F5] focus:ring-[#B454FF]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pass" className="text-[10px] font-bold uppercase tracking-widest text-[#2A2A2A] ml-1">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2A2A2A]" />
                    <Input id="pass" type="password" placeholder="••••••••" className="bg-[#0D0D0D] border-[#2A2A2A] rounded-full pl-12 h-12 text-[#F5F5F5] focus:ring-[#B454FF]" />
                  </div>
                </div>
              </div>
              <Button className="w-full bg-[#B454FF] hover:bg-[#B454FF]/90 text-white rounded-full h-12 font-black text-xs tracking-widest shadow-[0_10px_30px_rgba(180,84,255,0.2)]">
                INICIAR SESIÓN
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-email" className="text-[10px] font-bold uppercase tracking-widest text-[#2A2A2A] ml-1">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2A2A2A]" />
                    <Input id="new-email" type="email" placeholder="tu@email.com" className="bg-[#0D0D0D] border-[#2A2A2A] rounded-full pl-12 h-12 text-[#F5F5F5] focus:ring-[#B454FF]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-pass" className="text-[10px] font-bold uppercase tracking-widest text-[#2A2A2A] ml-1">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2A2A2A]" />
                    <Input id="new-pass" type="password" placeholder="Mínimo 8 caracteres" className="bg-[#0D0D0D] border-[#2A2A2A] rounded-full pl-12 h-12 text-[#F5F5F5] focus:ring-[#B454FF]" />
                  </div>
                </div>
              </div>
              <Button className="w-full bg-[#B454FF] hover:bg-[#B454FF]/90 text-white rounded-full h-12 font-black text-xs tracking-widest shadow-[0_10px_30px_rgba(180,84,255,0.2)]">
                CREAR CUENTA
              </Button>
            </TabsContent>
          </Tabs>

          <div className="relative my-6 md:my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#2A2A2A]"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
              <span className="bg-[#111111] px-4 text-[#2A2A2A]">O continúa con</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            onClick={() => handleSocialLogin('google')}
            className="w-full border-[#2A2A2A] bg-transparent hover:bg-[#0D0D0D] text-[#F5F5F5] rounded-full h-12 font-bold text-xs tracking-widest flex items-center justify-center gap-3"
          >
            <Chrome className="w-4 h-4" />
            GOOGLE
          </Button>
        </div>

        <Link to="/" className="mt-8 flex items-center justify-center gap-2 text-[#2A2A2A] hover:text-[#B454FF] transition-colors text-[10px] font-bold uppercase tracking-widest">
          <ArrowLeft className="w-3 h-3" />
          Volver al inicio
        </Link>
      </motion.div>
    </div>
  );
};

export default Login;