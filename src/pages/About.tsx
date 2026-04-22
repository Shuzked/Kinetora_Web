import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import Reveal from '@/components/Reveal';
import { Linkedin, Mail, ExternalLink } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

const TeamMember = ({ name, role, experience, image, linkedin }: any) => (
  <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-[#B454FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative z-10">
      <div className="w-20 h-20 rounded-full bg-white/10 mb-6 overflow-hidden border border-white/10 flex items-center justify-center">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 text-white/20 font-bold text-2xl">
            {name.charAt(0)}
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-bold uppercase tracking-tighter mb-1">{name}</h3>
      <p className="text-[#B454FF] font-bold text-sm uppercase tracking-widest mb-4">{role}</p>
      <p className="text-white/40 text-sm leading-relaxed mb-6 h-20">{experience}</p>
      
      {linkedin && (
        <a 
          href={linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm group/link"
        >
          <Linkedin size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">LinkedIn</span>
          <ExternalLink size={12} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
        </a>
      )}
    </div>
  </div>
);

const About = () => {
  const { lang } = useI18n();
  const isES = lang === 'es';

  const title = isES 
    ? "Sobre Nosotros | Ingeniería Visual para Startups | Kinetora"
    : "About Us | Visual Engineering for Startups | Kinetora";
  
  const description = isES
    ? "Conoce al equipo de élite detrás de Kinetora. Ingeniería visual sin intermediarios para startups que buscan escalar rápido."
    : "Meet the elite team behind Kinetora. Visual engineering without intermediaries for startups looking to scale fast.";

  const alternates = [
    { hrefLang: 'es', href: 'https://kinetora.es/sobre' },
    { hrefLang: 'en', href: 'https://kinetora.tech/about' }, // Assuming /about for EN
    { hrefLang: 'x-default', href: 'https://kinetora.tech/about' }
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#B454FF]/30">
      <SEO 
        title={title}
        description={description}
        alternates={isES ? alternates : alternates.map(a => ({ ...a, href: a.href.replace('/sobre', '/about') }))}
      />
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="kin-container">
          {/* Header */}
          <div className="max-w-4xl mb-24">
            <Reveal>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-12">
                {isES ? "Ingeniería visual" : "Visual engineering"} <br />
                <span className="text-white/20">{isES ? "sin intermediarios." : "without middlemen."}</span>
              </h1>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-medium">
                  {isES 
                    ? "Kinetora nace de la frustración con el modelo de agencia tradicional. Las startups que van a la velocidad de la luz no tienen tiempo para gestores de cuentas, briefs interminables ni presupuestos opacos."
                    : "Kinetora was born out of frustration with the traditional agency model. Fast-moving startups don't have time for account managers, endless briefs, or opaque budgets."
                  }
                </p>
                <p className="text-lg text-white/40 leading-relaxed">
                  {isES
                    ? "Somos un equipo de diseño e ingeniería de élite operando como tu brazo ejecutor in-house. Aportamos dirección de arte, UX/UI orientado a conversión y código limpio, trabajando codo a codo con founders para asegurar que el diseño sea una palanca real."
                    : "We are an elite design and engineering team operating as your in-house execution arm. We provide art direction, conversion-oriented UX/UI, and clean code, working side-by-side with founders to ensure design is a real leverage."
                  }
                </p>
              </div>
            </Reveal>
          </div>

          {/* Team Grid */}
          <div className="flex justify-center">
            <div className="max-w-sm w-full">
              <Reveal delay={0.4}>
                <TeamMember 
                  name="Rafael Muñoz" 
                  role="Founder & Visual Engineering Lead"
                  experience={isES 
                    ? "Liderando la estrategia de diseño e ingeniería visual de Kinetora. Especialista en crear interfaces de alto impacto que impulsan el crecimiento de startups tecnológicas."
                    : "Leading the design strategy and visual engineering at Kinetora. Specialist in creating high-impact interfaces that drive growth for tech startups."
                  }
                  linkedin="https://www.linkedin.com/in/shuzked/"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;

