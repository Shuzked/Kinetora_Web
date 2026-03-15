"use client";

import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  "VOLTA", "NEXUS", "AETHER", "ORBIT", "PRISM", "ZENITH",
  "VOLTA", "NEXUS", "AETHER", "ORBIT", "PRISM", "ZENITH"
];

const Brands = () => {
  return (
    <section className="py-12 bg-[#0D0D0D] border-y border-[#2A2A2A] overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <p className="text-center text-[10px] font-bold text-[#2A2A2A] uppercase tracking-[0.4em]">
          Marcas que confían en nuestra velocidad
        </p>
      </div>
      
      <div className="relative flex overflow-x-hidden">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex whitespace-nowrap gap-12 md:gap-24 items-center"
        >
          {brands.map((brand, i) => (
            <div 
              key={i}
              className="text-2xl md:text-4xl font-black tracking-tighter text-[#F5F5F5] opacity-20 hover:opacity-100 hover:text-[#B454FF] transition-all cursor-default"
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