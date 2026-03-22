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
            "Un modelo pensado para velocidad, claridad y consistencia visual — con kickoff claro, suscripción a medida y gestión profesional.",
          left: {
            title: "Agencias tradicionales",
            badge: "Fricción",
            items: [
              { t: "Briefs difusos", d: "Cambios constantes sin una alineación inicial clara." },
              { t: "Planes rígidos", d: "Poca flexibilidad y costes variables según avance." },
              { t: "Canales dispersos", d: "Conversaciones fragmentadas y poca trazabilidad." },
              { t: "Entregas lentas", d: "Ritmos de semanas y demasiadas rondas de revisión." },
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
              { t: "Kickoff claro", d: "Reunión inicial breve para alinear objetivo y presupuesto." },
              { t: "Suscripción a medida", d: "El plan se adapta a tu inversión y prioridades." },
              { t: "Comunicación profesional", d: "Email o chat y reuniones puntuales para decidir rápido." },
              { t: "Gestión en ClickUp (o tu tool)", d: "Tareas, prioridades y entregas 48h con revisiones limitadas." },
            ],
            metrics: [
              { k: "Ritmo", v: "48h" },
              { k: "Reuniones", v: "Puntuales" },
              { k: "Coste", v: "A medida" },
            ],
            tag: "Recomendado para Series A/B",
          },
        }
      : {
          pill: "Why startups choose Kinetora",
          titleTop: "The end of",
          titleAccent: "creative friction",
          sub:
            "A model built for speed, clarity and consistency — with a clear kickoff, tailored subscription and professional management.",
          left: {
            title: "Traditional agencies",
            badge: "Friction",
            items: [
              { t: "Vague briefs", d: "Constant changes with no clear upfront alignment." },
              { t: "Rigid plans", d: "Low flexibility and variable costs along the way." },
              { t: "Scattered channels", d: "Fragmented conversations and poor traceability." },
              { t: "Slow delivery", d: "Weeks of work and too many review rounds." },
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
              { t: "Clear kickoff", d: "Short initial meeting to align scope, goals and budget." },
              { t: "Tailored subscription", d: "The plan fits your budget and priorities." },
              { t: "Professional comms", d: "Email or chat, plus scheduled meetings when needed." },
              { t: "ClickUp (or your tool)", d: "Tasks, priorities and 48h turnarounds with limited revisions." },
            ],
            metrics: [
              { k: "Pace", v: "48h" },
              { k: "Meetings", v: "Focused" },
              { k: "Cost", v: "Tailored" },
            ],
            tag: "Recommended for Series A/B",
          },
        };

  return (
    <section className="kin-section relative">
      <div className="pointer-events-none absolute inset-x-0 inset-y-[-10%] z-0" aria-hidden="true">
        <div className="absolute left-1/2 top-[-14rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[#B454FF]/14 blur-[120px] md:h-[42rem] md:w-[42rem] md:blur-[160px]" />
        <div className="absolute left-[-10%] top-[18%] h-[22rem] w-[22rem] rounded-full bg-[#7C3AED]/10 blur-[110px] md:h-[30rem] md:w-[30rem] md:blur-[150px]" />
        <div className="absolute right-[-8%] bottom-[4%] h-[24rem] w-[24rem] rounded-full bg-[#5EEAD4]/7 blur-[120px] md:h-[34rem] md:w-[34rem] md:blur-[160px]" />
        <div className="absolute inset-x-0 top-0 h-48 md:h-64 bg-gradient-to-b from-[#0D0D0D] via-[#0D0D0D]/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 md:h-64 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/70 to-transparent" />
      </div>

      <div className="kin-container relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80 mb-6">
            {copy.pill}
          </div>
          <h2 className="mb-6 flex flex-col items-center">
            <span>{copy.titleTop}</span>
            <span className="text-[#B454FF]">{copy.titleAccent}</span>
          </h2>
          <p className="text-[#F5F5F5]/70 max-w-2xl mx-auto leading-relaxed underline-offset-4">
            {copy.sub}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          <MouseParallax intensity={9} rotate={4} className="will-change-transform">
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 16 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="h-full kin-card relative flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between gap-3 mb-9 sm:mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-red-500/10 border border-red-500/15 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-300/70" />
                  </div>
                  <h3 className="uppercase">
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
                    <div key={m.k} className="rounded-2xl bg-white/5 border border-white/10 p-3 sm:p-4 text-center">
                      <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.22em] font-black text-[#F5F5F5]/55 break-words whitespace-normal leading-tight">
                        {m.k}
                      </div>
                      <div className="mt-1 text-xs sm:text-sm font-extrabold text-[#F5F5F5] break-words whitespace-normal leading-snug">
                        {m.v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </MouseParallax>

          <MouseParallax intensity={10} rotate={5} className="will-change-transform">
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 16 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
              className="h-full kin-card border-[#B454FF]/30 bg-white/[0.05] relative overflow-hidden shadow-[0_18px_90px_rgba(180,84,255,0.10)] flex flex-col"
            >
              <div className="pointer-events-none absolute -top-28 -right-28 w-72 h-72 bg-[#B454FF]/18 rounded-full blur-[90px]" />

              <div className="flex items-center justify-between gap-3 mb-9 sm:mb-10 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#B454FF]/15 border border-[#B454FF]/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#B454FF]" />
                  </div>
                  <h3 className="uppercase">
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
                    <div key={m.k} className="rounded-2xl bg-white/5 border border-white/10 p-3 sm:p-4 text-center">
                      <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.22em] font-black text-[#F5F5F5]/55 break-words whitespace-normal leading-tight">
                        {m.k}
                      </div>
                      <div className="mt-1 text-xs sm:text-sm font-extrabold text-[#F5F5F5] break-words whitespace-normal leading-snug">
                        {m.v}
                      </div>
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
    </section>
  );
};

export default ValueProp;