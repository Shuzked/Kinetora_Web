"use client";

import React from 'react';
import { motion } from 'framer-motion';
import CountUp from '@/components/CountUp';
import { useI18n } from "@/i18n/I18nProvider";

const Stats = () => {
  const { lang } = useI18n();

  const stats =
    lang === "es"
      ? [
          { label: "Proyectos completados", value: 450, suffix: "+" },
          { label: "Capital levantado por nuestros clientes", sublabel: "gracias a nuestros diseños", value: 12, suffix: "$M+" },
          { label: "Tiempo de entrega", value: 48, suffix: "h" },
          { label: "Tasa de éxito", value: 99, suffix: "%" },
        ]
      : [
          { label: "Projects delivered", value: 450, suffix: "+" },
          { label: "Capital raised by our clients", sublabel: "thanks to our design", value: 12, suffix: "$M+" },
          { label: "Delivery time", value: 48, suffix: "h" },
          { label: "Success rate", value: 99, suffix: "%" },
        ];

  return (
    <section className="kin-section bg-transparent overflow-hidden">
      <div className="kin-container">
        <div className="relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="text-center group"
              >
                <div className="relative inline-block mb-3 sm:mb-4">
                  <div className="text-4xl md:text-6xl font-black text-[#F5F5F5] tracking-tighter flex items-baseline justify-center">
                    <CountUp end={stat.value} />
                    <span className="text-[#B454FF] text-xl md:text-3xl ml-1">{stat.suffix}</span>
                  </div>
                  <div className="absolute -inset-4 bg-[#B454FF]/0 group-hover:bg-[#B454FF]/5 rounded-full blur-xl transition-all duration-500" />
                </div>
                <div className="text-[#F5F5F5]/65 group-hover:text-[#B454FF]/80 transition-colors text-[10px] font-bold uppercase tracking-[0.3em] max-w-[160px] mx-auto leading-relaxed">
                  {stat.label}
                  {'sublabel' in stat && stat.sublabel && (
                    <div className="mt-1 text-[9px] text-[#B454FF]/60 normal-case tracking-[0.15em] font-semibold">
                      {stat.sublabel}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;