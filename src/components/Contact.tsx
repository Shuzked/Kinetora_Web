"use client";

import React, { useEffect } from "react";

const Contact = () => {
  // Inserta el script de Calendly una sola vez
  useEffect(() => {
    const src = "https://assets.calendly.com/assets/external/widget.js";
    const already = Array.from(document.scripts).some((s) => s.src === src);
    if (!already) {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section
      id="contacto"
      className="py-20 sm:py-24 lg:py-32 bg-[#0D0D0D] relative overflow-hidden"
    >
      {/* ambient glow y fades para evitar cortes */}
      <div className="pointer-events-none absolute -top-32 -left-28 h-96 w-96 rounded-full bg-[#B454FF]/10 blur-[110px] z-0" />
      <div className="pointer-events-none absolute -bottom-36 -right-28 h-[26rem] w-[26rem] rounded-full bg-[#B454FF]/6 blur-[120px] z-0" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(to_bottom,#0D0D0D,transparent)] z-[1]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_top,#0D0D0D,transparent)] z-[1]" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
            Contacto
          </div>
          <h2 className="mt-5 text-3xl md:text-5xl font-black text-[#F5F5F5] tracking-tighter uppercase">
            Agenda tu primera <span className="text-[#B454FF]">reunión</span>
          </h2>
          <p className="mt-3 text-[#F5F5F5]/70 text-sm sm:text-base leading-relaxed">
            Elige el día y la hora para resolver dudas o pedir un presupuesto personalizado.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-3 sm:p-4">
          {/* Calendly inline widget */}
          <div
            className="calendly-inline-widget rounded-[1.5rem] overflow-hidden"
            data-url="https://calendly.com/hello-kinetora/30min?primary_color=b454ff"
            style={{ minWidth: "320px", height: "720px" }}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;