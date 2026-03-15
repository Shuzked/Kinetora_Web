"use client";

import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  "VOLTA", "NEXUS", "AETHER", "ORBIT", "PRISM", "ZENITH"
];

const Brands = () => {
  return (
    <section className="py-12 bg-[#0D0D0D] border-y border-[#2A2A2A]">
      <div className="container mx-auto px-4">
        <p className="text-center text-[10px] font-bold text-[#2A2A2A] uppercase tracking-[0.4em] mb-10">
          Marcas que confían en nuestra velocidad
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40">
          {brands.map((brand, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="text-xl md:text-2xl font-black tracking-tighter text-[#F5F5F5] hover:text-[#B454FF] hover:opacity-100 transition-all cursor-default"
            >
              {brand}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;