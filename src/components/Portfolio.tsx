"use client";

import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "Fintech SaaS",
    metric: "+40% retención",
    image: "https://images.unsplash.com/photo-1551288049-bbb652167014?auto=format&fit=crop&q=80&w=800",
    color: "blue"
  },
  {
    title: "HealthTech App",
    metric: "200.000€ levantados",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    color: "purple"
  },
  {
    title: "E-commerce Brand",
    metric: "x3 en ventas",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    color: "pink"
  }
];

const Portfolio = () => {
  return (
    <section id="casos" className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Diseño creado para convertir <br/> y levantar capital.
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-3xl bg-gray-900 border border-white/10"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <span className="text-blue-400 font-mono text-sm">{project.metric}</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    className="h-full bg-blue-500"
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