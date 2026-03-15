"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/dashboard/PortalLayout";
import PremiumButton from "@/components/PremiumButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";

const Settings = () => {
  const [language, setLanguage] = useState("es");
  const [timezone, setTimezone] = useState("Europe/Madrid");
  const [current, setCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const saveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Preferencias guardadas.");
  };

  const changePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || password !== confirm) return;
    showSuccess("Contraseña actualizada.");
    setCurrent("");
    setPassword("");
    setConfirm("");
  };

  return (
    <PortalLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black text-[#F5F5F5] tracking-tight">Configuración</h1>
        <p className="text-[#F5F5F5]/55 mt-1">Ajusta cómo funciona tu portal</p>

        <form onSubmit={saveGeneral} className="mt-8 space-y-6">
          <section className="rounded-2xl bg-[#111111] border border-white/10 p-6">
            <h2 className="text-lg font-black text-[#F5F5F5]">Preferencias Generales</h2>
            <div className="mt-4 grid grid-cols-1 gap-4">
              <div>
                <Label className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">Idioma</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="mt-2 bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5] focus:ring-0 focus-visible:ring-2 focus-visible:ring-[#B454FF]">
                    <SelectValue placeholder="Selecciona idioma" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111111] border-white/10 text-[#F5F5F5]">
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">Zona horaria</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger className="mt-2 bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5] focus:ring-0 focus-visible:ring-2 focus-visible:ring-[#B454FF]">
                    <SelectValue placeholder="Selecciona zona horaria" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111111] border-white/10 text-[#F5F5F5]">
                    <SelectItem value="Europe/Madrid">Europe/Madrid</SelectItem>
                    <SelectItem value="America/Mexico_City">America/Mexico_City</SelectItem>
                    <SelectItem value="America/Bogota">America/Bogota</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <PremiumButton type="submit" variant="primary" size="md" className="rounded-xl w-full">
            Guardar Preferencias
          </PremiumButton>
        </form>

        <form onSubmit={changePassword} className="mt-8 space-y-6">
          <section className="rounded-2xl bg-[#111111] border border-white/10 p-6">
            <h2 className="text-lg font-black text-[#F5F5F5]">Seguridad</h2>
            <div className="mt-4 grid grid-cols-1 gap-4">
              <div>
                <Label className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">Contraseña Actual</Label>
                <Input value={current} onChange={(e) => setCurrent(e.target.value)} type="password" className="mt-2 bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-[#B454FF]" />
              </div>
              <div>
                <Label className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">Nueva Contraseña</Label>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-2 bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-[#B454FF]" />
              </div>
              <div>
                <Label className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">Confirmar Contraseña</Label>
                <Input value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" className="mt-2 bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-[#B454FF]" />
              </div>
            </div>
          </section>

          <PremiumButton type="submit" variant="glass" size="md" className="rounded-xl w-full text-[#F5F5F5]">
            Actualizar Contraseña
          </PremiumButton>
        </form>
      </div>
    </PortalLayout>
  );
};

export default Settings;