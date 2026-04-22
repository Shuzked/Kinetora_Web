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
          { label: "Proyectos completados", value: 18, suffix: "+" },
          { label: "Capital levantado gracias a nuestros diseños", value: 14.2, suffix: "$M+", decimals: 1 },
          { label: "Ritmo de entrega", value: 48, suffix: "h" },
          { label: "Tase de retención B2B", value: 94, suffix: "%" },
        ]
      : [
          { label: "Completed projects", value: 18, suffix: "+" },
          { label: "Capital raised thanks to our designs", value: 14.2, suffix: "$M+", decimals: 1 },
          { label: "Delivery pace", value: 48, suffix: "h" },
          { label: "B2B Retention rate", value: 94, suffix: "%" },
        ];

  return (
    <section className="kin-section bg-transparent overflow-hidden">
      <div className="kin-container">
        <div className="relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
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
                    <CountUp end={stat.value} decimals={stat.decimals || 0} />
                    <span className="text-[#B454FF] text-xl md:text-3xl ml-1">{stat.suffix}</span>
                  </div>
                  <div className="absolute -inset-4 bg-[#B454FF]/0 group-hover:bg-[#B454FF]/10 rounded-full blur-2xl transition-all duration-700" />
                </div>
                <div className="text-[#F5F5F5]/60 group-hover:text-[#F5F5F5]/90 transition-colors text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] max-w-[180px] mx-auto leading-relaxed">
                  {stat.label}
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