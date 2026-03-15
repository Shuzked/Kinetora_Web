"use client";

import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  "VOLTA",
  "NEXUS",
  "AETHER",
  "ORBIT",
  "PRISM",
  "ZENITH",
  "VOLTA",
  "NEXUS",
  "AETHER",
  "ORBIT",
  "PRISM",
  "ZENITH",
];

const Brands = () => {
  return (
    <section className="py-14 sm:py-16 bg-[#0D0D0D] border-y border-[#2A2A2A] overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[10px] font-bold text-[#2A2A2A] uppercase tracking-[0.4em] mb-8 sm:mb-10">
          Marcas que confían en nuestra velocidad
        </p>
      </div>

      <div className="relative overflow-hidden no-scrollbar">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[#0D0D0D] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[#0D0D0D] to-transparent z-10" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-10 sm:gap-12 md:gap-24 items-center will-change-transform"
        >
          {brands.map((brand, i) => (
            <div
              key={i}
              className="text-2xl md:text-4xl font-black tracking-tighter text-[#F5F5F5] opacity-20 hover:opacity-100 hover:text-[#B454FF] transition-all cursor-default select-none"
            >
              {brand}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Brands;