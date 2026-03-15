"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, AlertCircle, Zap } from 'lucide-react';

const ValueProp = () => {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-[#0D0D0D] relative">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-14 sm:mb-16 lg:mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-[#F5F5F5] mb-5 sm:mb-6 tracking-tighter uppercase">
            EL FIN DE LA <br />
            <span className="text-[#2A2A2A]">FRICCIÓN CREATIVA.</span>
          </h2>
          <p className="text-[#2A2A2A] font-bold uppercase tracking-widest text-xs">
            ¿Por qué las startups eligen Kinetora?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Tradicional */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -30 }}
            viewport={{ once: true }}
            className="bg-[#111111]/50 border border-[#2A2A2A] rounded-[3rem] p-8 sm:p-10 md:p-12 relative group grayscale hover:grayscale-0 transition-all duration-700"
          >
            <div className="flex items-center gap-3 mb-8 sm:mb-10">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-900/40" />
              </div>
              <h3 className="text-lg font-bold text-[#2A2A2A] uppercase tracking-widest">
                Agencias Tradicionales
              </h3>
            </div>

            <ul className="space-y-7 sm:space-y-8">
              {[
                { t: "Presupuestos sorpresa", d: "Costes que escalan sin previo aviso." },
                { t: "Burocracia paralizante", d: "Semanas perdidas en contratos y reuniones." },
                { t: "Entregas lentas", d: "Procesos de 2 a 4 semanas por tarea." },
                { t: "Falta de transparencia", d: "No sabes quién está trabajando en tu proyecto." },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <X className="w-5 h-5 text-red-900/20 mt-1 shrink-0" />
                  <div>
                    <div className="text-[#2A2A2A] font-bold text-sm uppercase tracking-tight mb-1">
                      {item.t}
                    </div>
                    <div className="text-[#2A2A2A]/40 text-xs font-medium">{item.d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Kinetora */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 30 }}
            viewport={{ once: true }}
            className="bg-gradient-to-b from-[#111111] to-[#0D0D0D] border border-[#B454FF]/30 rounded-[3rem] p-8 sm:p-10 md:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(180,84,255,0.05)]"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#B454FF]/10 rounded-full blur-[80px]" />

            <div className="flex items-center gap-3 mb-8 sm:mb-10 relative z-10">
              <div className="w-10 h-10 rounded-full bg-[#B454FF]/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#B454FF]" />
              </div>
              <h3 className="text-lg font-bold text-[#F5F5F5] uppercase tracking-widest">Kinetora OS</h3>
            </div>

            <ul className="space-y-7 sm:space-y-8 relative z-10">
              {[
                { t: "Cuota plana mensual", d: "Sin sorpresas. Un solo pago, todo incluido." },
                { t: "Colaboración asíncrona", d: "Cero reuniones. Todo fluye por tu tablero." },
                { t: "Entregas en 48h", d: "Velocidad real para startups que no esperan." },
                { t: "Socio de crecimiento", d: "Acceso directo a directores creativos senior." },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <Check className="w-5 h-5 text-[#B454FF] mt-1 shrink-0" />
                  <div>
                    <div className="text-[#F5F5F5] font-bold text-sm uppercase tracking-tight mb-1">
                      {item.t}
                    </div>
                    <div className="text-[#2A2A2A] text-xs font-medium">{item.d}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 sm:mt-12 pt-7 sm:pt-8 border-t border-[#2A2A2A]">
              <div className="text-[10px] font-black text-[#B454FF] uppercase tracking-[0.3em]">
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