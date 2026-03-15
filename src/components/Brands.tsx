"use client";

import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  "VOLTA", "NEXUS", "AETHER", "ORBIT", "PRISM", "ZENITH"
];

const Brands = () => {
  return (
    <section className="py-12 bg-black border-y border-white/5">
      <div className="container mx-auto px-4">
        <p className="text-center text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mb-10">
          Marcas que confían en nuestra velocidad
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40">
          {brands.map((brand, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="text-xl md:text-2xl font-black tracking-tighter text-white hover:opacity-100 transition-opacity cursor-default"
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