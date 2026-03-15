"use client";

import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "Fintech SaaS",
    metric: "+40% retención",
    image:
      "https://images.unsplash.com/photo-1551288049-bbb652167014?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "HealthTech App",
    metric: "200.000€ levantados",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "E-commerce Brand",
    metric: "x3 en ventas",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
];

const Portfolio = () => {
  return (
    <section id="casos" className="py-20 sm:py-24 lg:py-32 bg-[#0D0D0D]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#F5F5F5] mb-4 tracking-tighter">
            DISEÑO CREADO PARA CONVERTIR.
          </h2>
          <p className="text-[#2A2A2A] font-bold uppercase tracking-widest text-xs">Casos de éxito reales.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-[2rem] bg-[#111111] border border-[#2A2A2A]"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-black text-[#F5F5F5] uppercase tracking-tight">{project.title}</h3>
                  <span className="text-[#B454FF] font-black text-xs uppercase tracking-widest">{project.metric}</span>
                </div>
                <div className="h-1 w-full bg-[#2A2A2A] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-[#B454FF]"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;