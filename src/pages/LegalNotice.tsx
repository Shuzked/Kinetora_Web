"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LegalNotice = () => {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5]">
      <Navbar />
      <main className="pt-[68px] md:pt-[88px]">
        <section className="kin-section relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#B454FF]/10 blur-[90px]" />
          <div className="kin-container">
            <div className="mx-auto w-full max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
                Aviso Legal
              </div>
              <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase">
                Información general
              </h1>

              <div className="wp-post mt-6">
                <div className="wp-post__content">
                  <p>
                    En cumplimiento con el deber de información recogido en la normativa vigente,
                    se facilitan a continuación los datos de identificación del titular del sitio web.
                  </p>
                  <ul>
                    <li><strong>Titular:</strong> Kinetora Studio</li>
                    <li><strong>Correo electrónico:</strong> hello@kinetora.tech</li>
                    <li><strong>Sitio web:</strong> https://kinetora.tech</li>
                  </ul>

                  <h2>Condiciones de uso</h2>
                  <p>
                    El acceso y/o uso de este sitio web atribuye la condición de usuario y supone la aceptación
                    de las condiciones aquí reflejadas. El usuario se compromete a hacer un uso adecuado de los
                    contenidos y servicios que Kinetora ofrece a través del sitio.
                  </p>

                  <h2>Propiedad intelectual e industrial</h2>
                  <p>
                    Todos los contenidos (textos, imágenes, diseños, logotipos, vídeos, etc.) son propiedad de
                    Kinetora o de sus legítimos titulares. Queda prohibida su reproducción, distribución o
                    transformación sin autorización expresa.
                  </p>

                  <h2>Responsabilidad</h2>
                  <p>
                    Kinetora no se hace responsable de los daños o perjuicios derivados del uso de la información
                    del sitio ni de enlaces a contenidos de terceros.
                  </p>

                  <h2>Enlaces</h2>
                  <p>
                    Este sitio puede contener enlaces a páginas de terceros. Kinetora no asume responsabilidad por
                    el contenido, información o servicios que pudieran aparecer en dichos sitios.
                  </p>

                  <h2>Legislación aplicable</h2>
                  <p>
                    Estas condiciones se rigen por la legislación aplicable y cualquier controversia se someterá a
                    los tribunales competentes según la normativa vigente.
                  </p>

                  <p className="text-[#F5F5F5]/60 text-sm mt-6">
                    Última actualización: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LegalNotice;