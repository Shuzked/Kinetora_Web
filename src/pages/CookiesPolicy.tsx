"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5]">
      <Navbar />
      <main className="pt-[68px] md:pt-[88px]">
        <section className="kin-section relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#B454FF]/10 blur-[90px]" />
          <div className="kin-container">
            <div className="mx-auto w-full max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
                Política de cookies
              </div>
              <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase">
                Uso de cookies
              </h1>

              <div className="wp-post mt-6">
                <div className="wp-post__content">
                  <p>
                    Este sitio utiliza cookies y tecnologías similares para mejorar la experiencia,
                    analizar el uso y personalizar contenido. Puedes configurar o desactivar las cookies en tu navegador.
                  </p>

                  <h2>¿Qué son las cookies?</h2>
                  <p>
                    Son pequeños archivos que se almacenan en tu dispositivo cuando navegas. Permiten recordar tus
                    preferencias y entender cómo interactúas con el sitio.
                  </p>

                  <h2>Tipos de cookies que usamos</h2>
                  <ul>
                    <li><strong>Técnicas:</strong> necesarias para el funcionamiento del sitio.</li>
                    <li><strong>De preferencias:</strong> recuerdan opciones como idioma.</li>
                    <li><strong>Analíticas:</strong> nos ayudan a medir y mejorar el rendimiento.</li>
                  </ul>

                  <h2>Gestión de cookies</h2>
                  <p>
                    Puedes permitir, bloquear o eliminar las cookies mediante la configuración de tu navegador.
                    Ten en cuenta que bloquear ciertas cookies puede afectar al funcionamiento del sitio.
                  </p>

                  <h2>Actualizaciones</h2>
                  <p>
                    Podemos actualizar esta política para reflejar cambios en las cookies empleadas o por motivos legales.
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

export default CookiesPolicy;