"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/dashboard/PortalLayout";
import PremiumButton from "@/components/PremiumButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { showSuccess } from "@/utils/toast";

const Profile = () => {
  const [name, setName] = useState("Juan Díaz");
  const [email, setEmail] = useState("juan@example.com");
  const [marketing, setMarketing] = useState(true);
  const [product, setProduct] = useState(true);
  const [security, setSecurity] = useState(true);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Perfil actualizado correctamente.");
  };

  return (
    <PortalLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black text-[#F5F5F5] tracking-tight">Perfil</h1>
        <p className="text-[#F5F5F5]/55 mt-1">Gestiona tu información personal y preferencias</p>

        <form onSubmit={save} className="mt-8 space-y-6">
          <section className="rounded-2xl bg-[#111111] border border-white/10 p-6">
            <h2 className="text-lg font-black text-[#F5F5F5]">Información Personal</h2>
            <div className="mt-4 grid grid-cols-1 gap-4">
              <div>
                <Label className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">Nombre</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-[#B454FF]" />
              </div>
              <div>
                <Label className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-2 bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-[#B454FF]" />
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-[#111111] border border-white/10 p-6">
            <h2 className="text-lg font-black text-[#F5F5F5]">Avatar</h2>
            <div className="mt-4 flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-[#B454FF] text-white flex items-center justify-center font-black">JD</div>
              <button type="button" className="inline-flex h-10 items-center justify-center px-4 rounded-xl bg-white/[0.03] border border-white/10 text-[#F5F5F5]/85 hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]">
                Cambiar Avatar
              </button>
            </div>
            <p className="text-[#F5F5F5]/45 text-sm mt-2">Subida simulada para demo.</p>
          </section>

          <section className="rounded-2xl bg-[#111111] border border-white/10 p-6">
            <h2 className="text-lg font-black text-[#F5F5F5]">Notificaciones</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[#F5F5F5] font-semibold">Actualizaciones de Producto</div>
                  <div className="text-[#F5F5F5]/55 text-sm">Novedades y mejoras del portal</div>
                </div>
                <Switch checked={product} onCheckedChange={setProduct} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[#F5F5F5] font-semibold">Marketing</div>
                  <div className="text-[#F5F5F5]/55 text-sm">Promociones y ofertas</div>
                </div>
                <Switch checked={marketing} onCheckedChange={setMarketing} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[#F5F5F5] font-semibold">Seguridad</div>
                  <div className="text-[#F5F5F5]/55 text-sm">Alertas de actividad y accesos</div>
                </div>
                <Switch checked={security} onCheckedChange={setSecurity} />
              </div>
            </div>
          </section>

          <PremiumButton type="submit" variant="primary" size="md" className="rounded-xl w-full">
            Guardar Cambios
          </PremiumButton>
        </form>
      </div>
    </PortalLayout>
  );
};

export default Profile;