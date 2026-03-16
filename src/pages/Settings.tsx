"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/dashboard/PortalLayout";
import PremiumButton from "@/components/PremiumButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";
import { useI18n } from "@/i18n/I18nProvider";
import { FlagIcon } from "@/components/LanguageSwitcher";

const Settings = () => {
  const { lang, setLang, t } = useI18n();
  const [timezone, setTimezone] = useState("Europe/Madrid");
  const [current, setCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const copy =
    lang === "es"
      ? {
          title: "Configuración",
          sub: "Ajusta cómo funciona tu portal",
          general: "Preferencias generales",
          language: "Idioma",
          selectLang: "Selecciona idioma",
          tz: "Zona horaria",
          selectTz: "Selecciona zona horaria",
          save: "Guardar preferencias",
          security: "Seguridad",
          currentPass: "Contraseña actual",
          newPass: "Nueva contraseña",
          confirmPass: "Confirmar contraseña",
          updatePass: "Actualizar contraseña",
          toastSaved: "Preferencias guardadas.",
          toastPass: "Contraseña actualizada.",
        }
      : {
          title: "Settings",
          sub: "Customize how your portal works",
          general: "General preferences",
          language: "Language",
          selectLang: "Select language",
          tz: "Time zone",
          selectTz: "Select time zone",
          save: "Save preferences",
          security: "Security",
          currentPass: "Current password",
          newPass: "New password",
          confirmPass: "Confirm password",
          updatePass: "Update password",
          toastSaved: "Preferences saved.",
          toastPass: "Password updated.",
        };

  const saveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess(copy.toastSaved);
  };

  const changePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || password !== confirm) return;
    showSuccess(copy.toastPass);
    setCurrent("");
    setPassword("");
    setConfirm("");
  };

  return (
    <PortalLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black text-[#F5F5F5] tracking-tight">{copy.title}</h1>
        <p className="text-[#F5F5F5]/55 mt-1">{copy.sub}</p>

        <form onSubmit={saveGeneral} className="mt-8 space-y-6">
          <section className="rounded-2xl bg-[#111111] border border-white/10 p-6">
            <h2 className="text-lg font-black text-[#F5F5F5]">{copy.general}</h2>
            <div className="mt-4 grid grid-cols-1 gap-4">
              <div>
                <Label className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">{copy.language}</Label>
                <Select value={lang} onValueChange={(v) => setLang(v === "en" ? "en" : "es")}>
                  <SelectTrigger className="mt-2 bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5] focus:ring-0 focus-visible:ring-2 focus-visible:ring-[#B454FF]">
                    <SelectValue placeholder={copy.selectLang} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111111] border-white/10 text-[#F5F5F5]">
                    <SelectItem value="es">
                      <div className="flex items-center gap-2">
                        <FlagIcon lang="es" />
                        <span className="font-semibold">{t("lang.es")}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="en">
                      <div className="flex items-center gap-2">
                        <FlagIcon lang="en" />
                        <span className="font-semibold">{t("lang.en")}</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">{copy.tz}</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger className="mt-2 bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5] focus:ring-0 focus-visible:ring-2 focus-visible:ring-[#B454FF]">
                    <SelectValue placeholder={copy.selectTz} />
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
            {copy.save}
          </PremiumButton>
        </form>

        <form onSubmit={changePassword} className="mt-8 space-y-6">
          <section className="rounded-2xl bg-[#111111] border border-white/10 p-6">
            <h2 className="text-lg font-black text-[#F5F5F5]">{copy.security}</h2>
            <div className="mt-4 grid grid-cols-1 gap-4">
              <div>
                <Label className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">{copy.currentPass}</Label>
                <Input value={current} onChange={(e) => setCurrent(e.target.value)} type="password" className="mt-2 bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-[#B454FF]" />
              </div>
              <div>
                <Label className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">{copy.newPass}</Label>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-2 bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-[#B454FF]" />
              </div>
              <div>
                <Label className="text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]/60">{copy.confirmPass}</Label>
                <Input value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" className="mt-2 bg-[#0D0D0D] border-white/10 rounded-xl h-12 text-[#F5F5F5] focus-visible:ring-2 focus-visible:ring-[#B454FF]" />
              </div>
            </div>
          </section>

          <PremiumButton type="submit" variant="glass" size="md" className="rounded-xl w-full text-[#F5F5F5]">
            {copy.updatePass}
          </PremiumButton>
        </form>
      </div>
    </PortalLayout>
  );
};

export default Settings;