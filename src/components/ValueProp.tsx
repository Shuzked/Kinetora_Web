"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, AlertCircle, Zap } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";
import MouseParallax from "@/components/MouseParallax";

const ValueProp = () => {
  const { lang } = useI18n();

  const copy =
    lang === "es"
      ? {
          pill: "Por qué las startups eligen Kinetora",
          titleTop: "El fin de la",
          titleAccent: "fricción creativa",
          sub:
            "Un modelo pensado para velocidad, claridad y consistencia visual — sin la complejidad de una agencia tradicional.",
          left: {
            title: "Agencias tradicionales",
            badge: "Fricción",
            items: [
              { t: "Presupuestos sorpresa", d: "Costes que escalan sin previo aviso." },
              { t: "Burocracia paralizante", d: "Semanas perdidas en contratos y reuniones." },
              { t: "Entregas lentas", d: "Procesos de 2 a 4 semanas por tarea." },
              { t: "Poca visibilidad", d: "No siempre sabes quién está ejecutando cada pieza." },
            ],
            metrics: [
              { k: "Ritmo", v: "Lento" },
              { k: "Reuniones", v: "Muchas" },
              { k: "Coste", v: "Variable" },
            ],
          },
          right: {
            title: "Kinetora OS",
            badge: "Premium",
            items: [
              { t: "Cuota plana mensual", d: "Sin sorpresas: un solo pago, todo incluido." },
              { t: "Colaboración asíncrona", d: "Cero reuniones. Todo fluye por tu tablero." },
              { t: "Entregas en 48h", d: "Velocidad real para equipos que no esperan." },
              { t: "Dirección senior", d: "Acceso directo a criterio creativo con experiencia." },
            ],
            metrics: [
              { k: "Ritmo", v: "48h" },
              { k: "Reuniones", v: "0" },
              { k: "Coste", v: "Fijo" },
            ],
            tag: "Recomendado para Series A/B",
          },
        }
      : {
          pill: "Why startups choose Kinetora",
          titleTop: "The end of",
          titleAccent: "creative friction",
          sub:
            "A model built for speed, clarity and visual consistency — without the complexity of a traditional agency.",
          left: {
            title: "Traditional agencies",
            badge: "Friction",
            items: [
              { t: "Surprise budgets", d: "Costs that scale without warning." },
              { t: "Paralyzing bureaucracy", d: "Weeks lost in contracts and meetings." },
              { t: "Slow delivery", d: "2–4 week processes per task." },
              { t: "Low visibility", d: "You don't always know who's executing each piece." },
            ],
            metrics: [
              { k: "Pace", v: "Slow" },
              { k: "Meetings", v: "Many" },
              { k: "Cost", v: "Variable" },
            ],
          },
          right: {
            title: "Kinetora OS",
            badge: "Premium",
            items: [
              { t: "Flat monthly fee", d: "No surprises: one payment, all included." },
              { t: "Async collaboration", d: "Zero meetings. Everything flows through your board." },
              { t: "48h deliveries", d: "Real speed for teams that can't wait." },
              { t: "Senior direction", d: "Direct access to experienced creative judgment." },
            ],
            metrics: [
              { k: "Pace", v: "48h" },
              { k: "Meetings", v: "0" },
              { k: "Cost", v: "Fixed" },
            ],
            tag: "Recommended for Series A/B",
          },
        };

  return (
    <section className="kin-section relative overflow-hidden">
      <div className="kin-container">
        {/* ambient glow (soft, no hard cuts) */}
        <div className="pointer-events-none absolute -top-32 -left-28 h-96 w-96 rounded-full bg-[#B454FF]/10 blur-[110px] z-0" />
        <div className="pointer-events-none absolute -bottom-36 -right-28 h-[26rem] w-[26rem] rounded-full bg-[#5EEAD4]/5 blur-[120px] z-0" />
        
        {/* edge fades to blend with adjacent sections (long, subtle) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 z-[1] bg-[linear-gradient(to_bottom,#0D0D0D_0%,rgba(13,13,13,0.6)_25%,rgba(13,13,13,0.2)_55%,transparent_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 z-[1] bg-[linear-gradient(to_top,#0D0D0D_0%,rgba(13,13,13,0.6)_25%,rgba(13,13,13,0.2)_55%,transparent_100%)]" />
        
        {/* content */}
        <div className="relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-14 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
              {copy.pill}
            </div>
            <h2 className="mt-5 text-4xl md:text-6xl font-black text-[#F5F5F5] mb-4 tracking-tighter uppercase">
              {copy.titleTop} <br className="hidden sm:block" />
              <span className="text-[#B454FF]">{copy.titleAccent}</span>
            </h2>
            <p className="text-[#F5F5F5]/70 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              {copy.sub}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-stretch">
            {/* Tradicional */}
            <MouseParallax intensity={9} rotate={4} className="will-change-transform">
              <motion.div
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 16 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="h-full rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 sm:p-10 md:p-12 relative flex flex-col"
              >
                <div className="flex items-center justify-between gap-3 mb-9 sm:mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-red-500/10 border border-red-500/15 flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-red-300/70" />
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-[#F5F5F5] uppercase tracking-[0.22em]">
                      {copy.left.title}
                    </h3>
                  </div>
                  <span className="hidden sm:inline-flex rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[11px] font-extrabold tracking-widest uppercase text-[#F5F5F5]/60">
                    {copy.left.badge}
                  </span>
                </div>

                <ul className="space-y-6 sm:space-y-7">
                  {copy.left.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10">
                        <X className="w-4 h-4 text-red-300/70" />
                      </span>
                      <div>
                        <div className="text-[#F5F5F5] font-extrabold text-sm uppercase tracking-tight">
                          {item.t}
                        </div>
                        <div className="text-[#F5F5F5]/60 text-sm leading-snug mt-1">{item.d}</div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 pt-7 border-t border-white/10">
                  <div className="grid grid-cols-3 gap-3">
                    {copy.left.metrics.map((m) => (
                      <div key={m.k} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                        <div className="text-[11px] uppercase tracking-[0.22em] font-black text-[#F5F5F5]/55">
                          {m.k}
                        </div>
                        <div className="mt-1 text-sm font-extrabold text-[#F5F5F5]">{m.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </MouseParallax>

            {/* Kinetora */}
            <MouseParallax intensity={10} rotate={5} className="will-change-transform">
              <motion.div
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 16 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
                className="h-full rounded-[2.5rem] border border-[#B454FF]/30 bg-white/[0.05] p-8 sm:p-10 md:p-12 relative overflow-hidden shadow-[0_18px_90px_rgba(180,84,255,0.10)] flex flex-col"
              >
                <div className="pointer-events-none absolute -top-28 -right-28 w-72 h-72 bg-[#B454FF]/18 rounded-full blur-[90px]" />

                <div className="flex items-center justify-between gap-3 mb-9 sm:mb-10 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#B454FF]/15 border border-[#B454FF]/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-[#B454FF]" />
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-[#F5F5F5] uppercase tracking-[0.22em]">
                      {copy.right.title}
                    </h3>
                  </div>
                  <span className="inline-flex rounded-full bg-[#B454FF]/10 border border-[#B454FF]/25 px-3 py-1 text-[11px] font-extrabold tracking-widest uppercase text-[#B454FF]">
                    {copy.right.badge}
                  </span>
                </div>

                <ul className="space-y-6 sm:space-y-7 relative z-10">
                  {copy.right.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#B454FF]/10 border border-[#B454FF]/20">
                        <Check className="w-4 h-4 text-[#B454FF]" />
                      </span>
                      <div>
                        <div className="text-[#F5F5F5] font-extrabold text-sm uppercase tracking-tight">
                          {item.t}
                        </div>
                        <div className="text-[#F5F5F5]/65 text-sm leading-snug mt-1">{item.d}</div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 pt-7 border-t border-white/10 relative z-10">
                  <div className="grid grid-cols-3 gap-3">
                    {copy.right.metrics.map((m) => (
                      <div key={m.k} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                        <div className="text-[11px] uppercase tracking-[0.22em] font-black text-[#F5F5F5]/55">
                          {m.k}
                        </div>
                        <div className="mt-1 text-sm font-extrabold text-[#F5F5F5]">{m.v}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 inline-flex items-center rounded-full bg-[#B454FF]/10 border border-[#B454FF]/25 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#B454FF]">
                    {copy.right.tag}
                  </div>
                </div>
              </motion.div>
            </MouseParallax>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProp;