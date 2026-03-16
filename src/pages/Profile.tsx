"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/dashboard/PortalLayout";
import PremiumButton from "@/components/PremiumButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { showSuccess } from "@/utils/toast";
import { useI18n } from "@/i18n/I18nProvider";

const Profile = () => {
  const { lang } = useI18n();
  const [name, setName] = useState("Juan Díaz");
  const [email, setEmail] = useState("juan@example.com");
  const [marketing, setMarketing] = useState(true);
  const [product, setProduct] = useState(true);
  const [security, setSecurity] = useState(true);

  const copy =
    lang === "es"
      ? {
          title: "Perfil",
          sub: "Gestiona tu información personal y preferencias",
          personal: "Información personal",
          name: "Nombre",
          email: "Email",
          avatar: "Avatar",
          changeAvatar: "Cambiar avatar",
          demo: "Subida simulada para demo.",
          notifications: "Notificaciones",
          product: "Actualizaciones de producto",
          productSub: "Novedades y mejoras del portal",
          marketing: "Marketing",
          marketingSub: "Promociones y ofertas",
          security: "Seguridad",
          securitySub: "Alertas de actividad y accesos",
          save: "Guardar cambios",
          toast: "Perfil actualizado correctamente.",
        }
      : {
          title: "Profile",
          sub: "Manage your personal info and preferences",
          personal: "Personal information",
          name: "Name",
          email: "Email",
          avatar: "Avatar",
          changeAvatar: "Change avatar",
          demo: "Upload simulated for demo.",
          notifications: "Notifications",
          product: "Product updates",
          productSub: "Portal news and improvements",
          marketing: "Marketing",
          marketingSub: "Promos and offers",
          security: "Security",
          securitySub: "Activity and sign-in alerts",
          save: "Save changes",
          toast: "Profile updated.",
        };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess(copy.toast);
  };

  return (
    <PortalLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black text-[#F5F5F5] tracking-tight">{copy.title}</h1>
        <p className="text-[#F5F5F5]/55 mt-1">{copy.sub}</p>

        <form onSubmit={save} className="mt-8 space-y-6">
          <section className="rounded-2xl bg-[#111111] border border-white/10 p-6">
            <h2 className="text-lg font-black text-[#F5F5F5]">{copy.personal}</h2>
            <div className="mt-4 grid grid-cols-1 gap-4">
              <div>
                <Label className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">{copy.name}</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-[#B454FF]" />
              </div>
              <div>
                <Label className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">{copy.email}</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-2 bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-[#B454FF]" />
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-[#111111] border border-white/10 p-6">
            <h2 className="text-lg font-black text-[#F5F5F5]">{copy.avatar}</h2>
            <div className="mt-4 flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-[#B454FF] text-white flex items-center justify-center font-black">JD</div>
              <button type="button" className="inline-flex h-10 items-center justify-center px-4 rounded-xl bg-white/[0.03] border border-white/10 text-[#F5F5F5]/85 hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]">
                {copy.changeAvatar}
              </button>
            </div>
            <p className="text-[#F5F5F5]/45 text-sm mt-2">{copy.demo}</p>
          </section>

          <section className="rounded-2xl bg-[#111111] border border-white/10 p-6">
            <h2 className="text-lg font-black text-[#F5F5F5]">{copy.notifications}</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[#F5F5F5] font-semibold">{copy.product}</div>
                  <div className="text-[#F5F5F5]/55 text-sm">{copy.productSub}</div>
                </div>
                <Switch checked={product} onCheckedChange={setProduct} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[#F5F5F5] font-semibold">{copy.marketing}</div>
                  <div className="text-[#F5F5F5]/55 text-sm">{copy.marketingSub}</div>
                </div>
                <Switch checked={marketing} onCheckedChange={setMarketing} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[#F5F5F5] font-semibold">{copy.security}</div>
                  <div className="text-[#F5F5F5]/55 text-sm">{copy.securitySub}</div>
                </div>
                <Switch checked={security} onCheckedChange={setSecurity} />
              </div>
            </div>
          </section>

          <PremiumButton type="submit" variant="primary" size="md" className="rounded-xl w-full">
            {copy.save}
          </PremiumButton>
        </form>
      </div>
    </PortalLayout>
  );
};

export default Profile;