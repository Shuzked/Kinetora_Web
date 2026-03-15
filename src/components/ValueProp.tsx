"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, AlertCircle, Zap } from 'lucide-react';

const ValueProp = () => {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-[#0D0D0D] relative overflow-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-28 -left-24 h-72 w-72 rounded-full bg-[#B454FF]/10 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-[#5EEAD4]/6 blur-[90px]" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-14 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
            Por qué las startups eligen Kinetora
          </div>
          <h2 className="mt-5 text-4xl md:text-6xl font-black text-[#F5F5F5] mb-4 tracking-tighter uppercase">
            El fin de la <br className="hidden sm:block" />
            <span className="text-[#B454FF]">fricción creativa</span>
          </h2>
          <p className="text-[#F5F5F5]/70 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Un modelo pensado para velocidad, claridad y consistencia visual — sin la complejidad de una agencia tradicional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {/* Tradicional */}
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 16 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 sm:p-10 md:p-12 relative"
          >
            <div className="flex items-center justify-between gap-3 mb-9 sm:mb-10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-red-500/10 border border-red-500/15 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-300/70" />
                </div>
                <h3 className="text-sm sm:text-base font-black text-[#F5F5F5] uppercase tracking-[0.22em]">
                  Agencias tradicionales
                </h3>
              </div>
              <span className="hidden sm:inline-flex rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[11px] font-extrabold tracking-widest uppercase text-[#F5F5F5]/60">
                Fricción
              </span>
            </div>

            <ul className="space-y-6 sm:space-y-7">
              {[
                { t: 'Presupuestos sorpresa', d: 'Costes que escalan sin previo aviso.' },
                { t: 'Burocracia paralizante', d: 'Semanas perdidas en contratos y reuniones.' },
                { t: 'Entregas lentas', d: 'Procesos de 2 a 4 semanas por tarea.' },
                { t: 'Poca visibilidad', d: 'No siempre sabes quién está ejecutando cada pieza.' },
              ].map((item, i) => (
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
                {[{ k: 'Ritmo', v: 'Lento' }, { k: 'Reuniones', v: 'Muchas' }, { k: 'Coste', v: 'Variable' }].map(
                  (m) => (
                    <div key={m.k} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                      <div className="text-[11px] uppercase tracking-[0.22em] font-black text-[#F5F5F5]/55">
                        {m.k}
                      </div>
                      <div className="mt-1 text-sm font-extrabold text-[#F5F5F5]">{m.v}</div>
                    </div>
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* Kinetora */}
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 16 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
            className="rounded-[2.5rem] border border-[#B454FF]/30 bg-white/[0.05] p-8 sm:p-10 md:p-12 relative overflow-hidden shadow-[0_18px_90px_rgba(180,84,255,0.10)]"
          >
            <div className="pointer-events-none absolute -top-28 -right-28 w-72 h-72 bg-[#B454FF]/18 rounded-full blur-[90px]" />

            <div className="flex items-center justify-between gap-3 mb-9 sm:mb-10 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#B454FF]/15 border border-[#B454FF]/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#B454FF]" />
                </div>
                <h3 className="text-sm sm:text-base font-black text-[#F5F5F5] uppercase tracking-[0.22em]">
                  Kinetora OS
                </h3>
              </div>
              <span className="inline-flex rounded-full bg-[#B454FF]/10 border border-[#B454FF]/25 px-3 py-1 text-[11px] font-extrabold tracking-widest uppercase text-[#B454FF]">
                Premium
              </span>
            </div>

            <ul className="space-y-6 sm:space-y-7 relative z-10">
              {[
                { t: 'Cuota plana mensual', d: 'Sin sorpresas: un solo pago, todo incluido.' },
                { t: 'Colaboración asíncrona', d: 'Cero reuniones. Todo fluye por tu tablero.' },
                { t: 'Entregas en 48h', d: 'Velocidad real para equipos que no esperan.' },
                { t: 'Dirección senior', d: 'Acceso directo a criterio creativo con experiencia.' },
              ].map((item, i) => (
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
                {[{ k: 'Ritmo', v: '48h' }, { k: 'Reuniones', v: '0' }, { k: 'Coste', v: 'Fijo' }].map((m) => (
                  <div key={m.k} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <div className="text-[11px] uppercase tracking-[0.22em] font-black text-[#F5F5F5]/55">
                      {m.k}
                    </div>
                    <div className="mt-1 text-sm font-extrabold text-[#F5F5F5]">{m.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 inline-flex items-center rounded-full bg-[#B454FF]/10 border border-[#B454FF]/25 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#B454FF]">
                Recomendado para Series A/B
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValueProp;