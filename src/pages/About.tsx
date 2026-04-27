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
  const { t } = useI18n();

  const title = t("about.pill") + " | " + t("about.title") + " " + t("about.titleAccent") + " | Kinetora";
  const description = t("about.story_body").substring(0, 160);

  const alternates = [
    { hrefLang: 'es', href: 'https://kinetora.es/sobre' },
    { hrefLang: 'en', href: 'https://kinetora.tech/sobre' },
    { hrefLang: 'x-default', href: 'https://kinetora.tech/sobre' }
  ];

  const methodology = [
    { title: t("about.pillar1_t"), desc: t("about.pillar1_d") },
    { title: t("about.pillar2_t"), desc: t("about.pillar2_d") },
    { title: t("about.pillar3_t"), desc: t("about.pillar3_d") },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#B454FF]/30">
      <SEO 
        title={title}
        description={description}
        alternates={alternates}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Rafael Muñoz",
          "jobTitle": "Founder & Visual Engineering Lead",
          "url": "https://kinetora.es/sobre",
          "sameAs": [
            "https://www.linkedin.com/in/shuzked/",
            "https://www.instagram.com/kinetora_studio"
          ],
          "worksFor": {
            "@type": "Organization",
            "name": "Kinetora"
          }
        }}
      />
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="kin-container">
          {/* ── HERO ── */}
          <div className="max-w-4xl mb-24 lg:mb-32">
            <Reveal>
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80 mb-8">
                {t("about.pill")}
              </div>
              <h1
                className="font-black uppercase tracking-tighter leading-[0.9] mb-12"
                style={{ fontSize: 'clamp(2.5rem, 10vw + 1rem, 7rem)' }}
              >
                {t("about.title")} <br />
                <span className="text-[#B454FF]">{t("about.titleAccent")}</span>
              </h1>
            </Reveal>
          </div>

          {/* ── NARRATIVE ── */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 mb-24 lg:mb-32">
            <div className="lg:col-span-7">
              <Reveal delay={0.2}>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 border-b border-white/10 pb-4">
                  {t("about.story_title")}
                </h2>
                <div className="space-y-6 text-lg md:text-xl text-white/70 leading-relaxed font-medium">
                  {t("about.story_body").split('\n\n').map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.4} className="mt-20">
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 border-b border-white/10 pb-4">
                  {t("about.mission_title")}
                </h2>
                <div className="text-lg md:text-xl text-white/70 leading-relaxed font-medium">
                  <p>{t("about.mission_body")}</p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <Reveal delay={0.6}>
                <div className="top-32 p-6 md:p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 lg:sticky">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#B454FF] mb-10">
                    {t("about.pillars_title")}
                  </h3>
                  <div className="space-y-12">
                    {methodology.map((m, i) => (
                      <div key={i} className="group">
                        <div className="text-sm font-black uppercase tracking-widest text-white mb-3 flex items-center gap-3">
                          <span className="w-6 h-px bg-[#B454FF]" />
                          {m.title}
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed pl-9">
                          {m.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* ── FOUNDER ── */}
          <div className="pt-24 border-t border-white/5">
            <Reveal delay={0.8}>
              <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                <div className="w-48 h-48 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-white/10">
                  <img 
                    src="/assets/team/rafa-founder.webp" 
                    alt="Rafael Muñoz" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Rafael+Muñoz&background=B454FF&color=fff&size=512';
                    }}
                  />
                </div>
                <div className="max-w-2xl text-center md:text-left">
                  <h3 className="text-4xl font-black uppercase tracking-tighter mb-2">Rafael Muñoz</h3>
                  <p className="text-[#B454FF] font-black text-xs uppercase tracking-[0.4em] mb-8">Founder & Visual Engineering Lead</p>
                  <p className="text-white/60 text-lg leading-relaxed mb-10">
                    {t("about.founder_bio")}
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <a 
                      href="https://www.linkedin.com/in/shuzked/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 min-h-[48px] px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-[#B454FF]/20 hover:border-[#B454FF]/40 transition-all duration-500 font-black text-xs uppercase tracking-widest"
                    >
                      <Linkedin size={18} />
                      LinkedIn
                    </a>
                    <a 
                      href="mailto:rafa@kinetora.tech" 
                      className="inline-flex items-center gap-3 min-h-[48px] px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-500 font-black text-xs uppercase tracking-widest"
                    >
                      <Mail size={18} />
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;

