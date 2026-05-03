import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from "@/i18n/I18nProvider";
import ClientOnly from "@/components/ClientOnly";
import RevealText from "@/components/ui/RevealText";
import { Search, Settings, Zap, BarChart3 } from "lucide-react";

const HowItWorks = () => {
  const { t } = useI18n();

  const steps = [
    {
      number: "01",
      title: t("howitworks.step1_t"),
      desc: t("howitworks.step1_d"),
      icon: Search,
    },
    {
      number: "02",
      title: t("howitworks.step2_t"),
      desc: t("howitworks.step2_d"),
      icon: Settings,
    },
    {
      number: "03",
      title: t("howitworks.step3_t"),
      desc: t("howitworks.step3_d"),
      icon: Zap,
    },
    {
      number: "04",
      title: t("howitworks.step4_t"),
      desc: t("howitworks.step4_d"),
      icon: BarChart3,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <ClientOnly>
      <section id="metodo" className="py-24 lg:py-32 bg-[#0D0D0D] relative overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 lg:mb-28">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80 mb-6">
              {t("howitworks.badge")}
            </div>
            <h2
              className="mb-6 tracking-tighter font-black text-white uppercase"
              style={{ fontSize: 'clamp(1.75rem, 5vw + 0.5rem, 3rem)' }}
            >
              <RevealText text={t("howitworks.titleA").toUpperCase()} className="block" />
              <RevealText 
                text={t("howitworks.titleB").toUpperCase()} 
                className="block text-[#B454FF]" 
                delay={0.2} 
              />
            </h2>
            <p className="mt-4 text-[#F5F5F5]/60 text-lg max-w-2xl mx-auto">
              {t("howitworks.sub")}
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="group relative bg-[#131313] border border-white/5 rounded-3xl p-8 hover:border-[#B454FF]/30 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 text-7xl font-black text-white/[0.02] group-hover:text-[#B454FF]/5 transition-colors duration-500">
                    {step.number}
                  </div>
                  
                  <div className="mb-8 relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 group-hover:bg-[#B454FF]/10 group-hover:border-[#B454FF]/20 transition-all duration-500">
                    <Icon className="w-6 h-6 text-[#F5F5F5] group-hover:text-[#B454FF] transition-colors duration-500" />
                  </div>

                  <h3 className="text-xl font-bold text-[#F5F5F5] mb-4 uppercase tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-[#F5F5F5]/50 text-sm leading-relaxed font-medium">
                    {step.desc}
                  </p>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#B454FF] to-transparent group-hover:w-full transition-all duration-700" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </ClientOnly>
  );
};

export default HowItWorks;
 HowItWorks;