"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SocialPrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5]">
      <Navbar />
      <main className="pt-[68px] md:pt-[88px]">
        <section className="kin-section relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#B454FF]/10 blur-[90px]" />
          <div className="kin-container">
            <div className="mx-auto w-full max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80">
                Privacidad y redes sociales
              </div>
              <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase">
                Política de privacidad y RRSS
              </h1>

              <div className="wp-post mt-6">
                <div className="wp-post__content">
                  <p>
                    Esta política explica el tratamiento de datos personales vinculados a nuestras comunicaciones y
                    presencia en redes sociales (por ejemplo, TikTok, X, Instagram, Facebook, YouTube, Discord).
                  </p>

                  <h2>Responsable</h2>
                  <p><strong>Kinetora Studio</strong> — <a href="mailto:hello@kinetora.tech">hello@kinetora.tech</a></p>

                  <h2>Finalidad del tratamiento</h2>
                  <ul>
                    <li>Gestionar interacciones (comentarios, mensajes directos, menciones).</li>
                    <li>Atender solicitudes de información y soporte.</li>
                    <li>Analizar el rendimiento de nuestras publicaciones.</li>
                  </ul>

                  <h2>Base jurídica</h2>
                  <p>Consentimiento del interesado y, cuando proceda, interés legítimo en mantener comunicaciones y comunidad.</p>

                  <h2>Destinatarios</h2>
                  <p>
                    Las propias plataformas de redes sociales actúan como corresponsables o encargados de tratamiento.
                    Te recomendamos revisar sus políticas de privacidad.
                  </p>

                  <h2>Derechos de los usuarios</h2>
                  <p>
                    Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición y demás previstos en la normativa
                    escribiendo a <a href="mailto:hello@kinetora.tech">hello@kinetora.tech</a>.
                  </p>

                  <h2>Contenido generado por el usuario</h2>
                  <p>
                    Cuando nos etiquetes o envíes contenido, nos autorizas a interactuar con el mismo y, en su caso,
                    a solicitar permisos adicionales si fuese necesaria su reutilización en canales propios.
                  </p>

                  <h2>Conservación de datos</h2>
                  <p>
                    Mantendremos la información durante el tiempo imprescindible para atender la interacción o mientras
                    siga disponible en la plataforma social, salvo solicitud de eliminación.
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

export default SocialPrivacyPolicy;