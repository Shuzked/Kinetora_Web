"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5]">
      <Navbar />
      <main className="pt-[68px] md:pt-[88px]">
        <section className="kin-section relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#B454FF]/10 blur-[90px]" />
          <div className="kin-container">
            <div className="mx-auto w-full max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
                Política de privacidad
              </div>
              <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase">
                Protección de datos
              </h1>

              <div className="wp-post mt-6">
                <div className="wp-post__content">
                  <p>
                    En Kinetora tratamos la información de forma responsable y transparente.
                    Esta política explica qué datos recopilamos, para qué los usamos y tus derechos.
                  </p>

                  <h2>Responsable del tratamiento</h2>
                  <p><strong>Titular:</strong> Kinetora Studio — <strong>Email:</strong> hello@kinetora.tech</p>

                  <h2>Datos que recopilamos</h2>
                  <ul>
                    <li>Datos de contacto (nombre, email, empresa) enviados mediante formularios.</li>
                    <li>Información de navegación anónima para análisis de uso del sitio.</li>
                  </ul>

                  <h2>Finalidades</h2>
                  <ul>
                    <li>Atender consultas y prestar servicios solicitados.</li>
                    <li>Enviar comunicaciones informativas y promocionales con consentimiento.</li>
                    <li>Mejorar la experiencia y seguridad del sitio.</li>
                  </ul>

                  <h2>Legitimación</h2>
                  <p>Consentimiento del interesado y, en su caso, ejecución de un contrato o medidas precontractuales.</p>

                  <h2>Conservación</h2>
                  <p>Conservamos los datos mientras sean necesarios para la finalidad recogida o hasta que revoques el consentimiento.</p>

                  <h2>Destinatarios</h2>
                  <p>No cedemos datos a terceros salvo obligación legal o proveedores necesarios para la prestación del servicio (con acuerdos de tratamiento).</p>

                  <h2>Derechos</h2>
                  <ul>
                    <li>Acceso, rectificación, supresión, oposición y limitación del tratamiento.</li>
                    <li>Portabilidad de los datos cuando proceda.</li>
                    <li>Retirar el consentimiento en cualquier momento.</li>
                  </ul>
                  <p>Para ejercerlos, escribe a <a href="mailto:hello@kinetora.tech">hello@kinetora.tech</a>.</p>

                  <h2>Medidas de seguridad</h2>
                  <p>Aplicamos medidas técnicas y organizativas para proteger la confidencialidad e integridad de la información.</p>

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

export default PrivacyPolicy;