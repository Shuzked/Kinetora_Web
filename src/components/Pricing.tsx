"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, Clock, Calendar, RefreshCw } from 'lucide-react';
import PremiumButton from '@/components/PremiumButton';
import { useI18n } from "@/i18n/I18nProvider";
import MouseParallax from "@/components/MouseParallax";
import RevealText from "@/components/ui/RevealText";
import ScrollParallax from "@/components/ui/ScrollParallax";

const Pricing = () => {
  const { lang } = useI18n();
  const isEs = lang === "es";

  const copy = isEs ? {
    badge: "SUSCRIPCIÓN DE DISEÑO",
    title: "Planes que escalan",
    titleAccent: "con tu negocio",
    sub: "Sustituye tu agencia lenta o tus costosos procesos de contratación por una suscripción mensual fija.",
    guarantees: [
      { Icon: Clock, text: "ENTREGA EN 48H" },
      { Icon: Calendar, text: "PAUSA CUANDO QUIERAS" },
      { Icon: RefreshCw, text: "REVISIONES ILIMITADAS" },
    ],
    plans: [
      {
        name: 'Essential',
        price: '1.900',
        period: '/mes',
        highlight: false,
        desc: 'Para startups que necesitan diseño recurrente de alta calidad sin complicaciones.',
        includes: [
          'Un diseño a la vez',
          'Entrega en 48h por tarea',
          'Diseño gráfico y branding',
          'UX/UI y diseño web',
          'Revisiones ilimitadas',
          'Gestión por Telegram / Discord',
          'Pausa o cancela cuando quieras',
        ],
        excludes: [
          'Motion & Vídeo',
          'Estrategia de contenido',
          'Peticiones en paralelo',
        ],
        cta: 'Empezar ahora',
      },
      {
        name: 'Scale',
        price: '3.500',
        period: '/mes',
        highlight: true,
        badge: 'Más Popular',
        desc: 'Para startups en crecimiento que necesitan un equipo completo sin fricciones.',
        includes: [
          '2 peticiones en paralelo',
          'Entrega en 48h por tarea',
          'Diseño gráfico y branding',
          'UX/UI y diseño web',
          'Motion graphics y vídeo',
          'Estrategia de contenido',
          'Revisiones ilimitadas',
          'Gestión por Telegram / Discord',
          'Pausa o cancela cuando quieras',
        ],
        excludes: [],
        cta: 'Empezar ahora',
      },
      {
        name: 'Full Studio',
        price: 'Custom',
        period: '',
        highlight: false,
        badge: 'Enterprise',
        desc: 'Equipo dedicado a tiempo completo. Para Series A/B o marcas con alto volumen.',
        includes: [
          'Peticiones en paralelo ilimitadas',
          'Equipo senior dedicado',
          'Todos los servicios incluidos',
          'Reunión de estrategia semanal',
          'Acceso a portal de cliente',
          'SLA de entrega personalizado',
          'Account manager dedicado',
        ],
        excludes: [],
        cta: 'Hablemos',
      },
    ],
    faqTitle: 'Preguntas frecuentes sobre los planes',
    faqs: [
      { q: '¿Puedo cambiar de plan?', a: 'Sí, puedes subir o bajar de nivel en cualquier momento avisando con 30 días de antelación.' },
      { q: '¿Qué significa "pausar"?', a: 'Si tienes un periodo con menos trabajo, congelas la suscripción y los días restantes se guardan para cuando decidas reactivarla.' },
      { q: '¿Hay permanencia?', a: 'No. Cancela cuando quieras con 30 días de antelación, sin penalizaciones.' },
      { q: '¿Cómo funciona la entrega en 48h?', a: 'Cada solicitud que inicias tiene un plazo de entrega de 48 horas laborables desde que la aceptamos. Los proyectos complejos se dividen en hitos de 48h cada uno.' },
    ],
  } : {
    badge: "DESIGN SUBSCRIPTION",
    title: "Plans that scale",
    titleAccent: "with your business",
    sub: "Replace your slow agency or expensive hiring processes with a fixed monthly subscription.",
    guarantees: [
      { Icon: Clock, text: "48H DELIVERY" },
      { Icon: Calendar, text: "PAUSE ANYTIME" },
      { Icon: RefreshCw, text: "UNLIMITED REVISIONS" },
    ],
    plans: [
      {
        name: 'Essential',
        price: '1,900',
        period: '/mo',
        highlight: false,
        desc: 'For startups that need high-quality recurring design without the hassle.',
        includes: [
          'One design at a time',
          '48h delivery per task',
          'Graphic design & branding',
          'UX/UI & web design',
          'Unlimited revisions',
          'Telegram / Discord management',
          'Pause or cancel anytime',
        ],
        excludes: [
          'Motion & Video',
          'Content strategy',
          'Parallel requests',
        ],
        cta: 'Get started',
      },
      {
        name: 'Scale',
        price: '3,500',
        period: '/mo',
        highlight: true,
        badge: 'Most Popular',
        desc: 'For growing startups that need a full team without the friction.',
        includes: [
          '2 parallel requests',
          '48h delivery per task',
          'Graphic design & branding',
          'UX/UI & web design',
          'Motion graphics & video',
          'Content strategy',
          'Unlimited revisions',
          'Telegram / Discord management',
          'Pause or cancel anytime',
        ],
        excludes: [],
        cta: 'Get started',
      },
      {
        name: 'Full Studio',
        price: 'Custom',
        period: '',
        highlight: false,
        badge: 'Enterprise',
        desc: 'Dedicated full-time team. For Series A/B or brands with high production volume.',
        includes: [
          'Unlimited parallel requests',
          'Dedicated senior team',
          'All services included',
          'Weekly strategy meeting',
          'Client portal access',
          'Custom delivery SLA',
          'Dedicated account manager',
        ],
        excludes: [],
        cta: "Let's talk",
      },
    ],
    faqTitle: 'Frequently asked questions about our plans',
    faqs: [
      { q: 'Can I change plans?', a: 'Yes, you can upgrade or downgrade at any time with 30 days notice.' },
      { q: 'What does "pausing" mean?', a: "If you have a quieter period, you freeze the subscription and the remaining days are saved for when you reactivate it." },
      { q: 'Is there a minimum commitment?', a: 'No. Cancel with 30 days notice, no penalties.' },
      { q: 'How does 48h delivery work?', a: 'Each request you start has a 48 business-hour delivery window from when we accept it. Complex projects are broken into milestones, each with its own 48h cycle.' },
    ],
  };

  const handleContact = () => {
    const el = document.getElementById("contacto");
    if (el) {
      const nav = document.querySelector("nav") as HTMLElement | null;
      const offset = (nav?.offsetHeight || 0) + 16;
      const rect = el.getBoundingClientRect();
      const y = rect.top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section id="precios" className="kin-section bg-[#0D0D0D] scroll-mt-24 md:scroll-mt-28 relative overflow-hidden">
      <ScrollParallax speed={0.08} invert={true} className="absolute top-1/2 -right-32">
        <div className="pointer-events-none h-80 w-80 rounded-full bg-[#B454FF]/5 blur-[120px]" />
      </ScrollParallax>
      
      <div className="kin-container">
        {/* ── HEADER ── */}
        <div className="text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80 mb-6">
              {copy.badge}
            </div>
            <h2 className="mb-6">
              <RevealText text={copy.title.toUpperCase()} /> <br />
              <RevealText text={copy.titleAccent.toUpperCase()} className="text-[#B454FF]" delay={0.15} />
            </h2>
            <p className="text-[#F5F5F5]/70 max-w-2xl mx-auto text-lg leading-relaxed mb-12">
              {copy.sub}
            </p>

            {/* Guarantees row */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
              {copy.guarantees.map(({ Icon, text }, i) => (
                <div key={i} className="inline-flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#F5F5F5]/60 transition-colors hover:text-[#B454FF]">
                  <Icon className="w-3.5 h-3.5 text-[#B454FF]" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── PRICING CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-24">
          {copy.plans.map((plan, i) => (
            <MouseParallax key={i} intensity={9} rotate={3} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`relative rounded-[2.5rem] p-8 sm:p-10 h-full flex flex-col border transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-[#B454FF]/10 border-[#B454FF]/40 shadow-[0_0_80px_rgba(180,84,255,0.08)]'
                    : 'bg-white/[0.04] border-white/10 hover:border-white/20 hover:bg-white/[0.06]'
                }`}
              >
                {plan.badge && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full px-5 py-1.5 text-[10px] font-black uppercase tracking-widest ${
                    plan.highlight ? 'bg-[#B454FF] text-white' : 'bg-white/10 text-white/70 border border-white/20'
                  }`}>
                    {plan.badge}
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-sm font-black uppercase tracking-[0.28em] text-[#F5F5F5]/60 mb-4">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    {plan.price !== 'Custom' && (
                      <span className="text-2xl font-black text-[#B454FF] leading-none">{isEs ? '' : '$'}</span>
                    )}
                    <span className="text-6xl font-black text-[#F5F5F5] tracking-tighter leading-none">{plan.price}</span>
                    {plan.price !== 'Custom' && (
                      <span className="text-2xl font-black text-[#B454FF] leading-none ml-1">{isEs ? '€' : ''}</span>
                    )}
                    <span className="text-[#F5F5F5]/50 font-bold text-sm ml-1">{plan.period}</span>
                  </div>
                  <p className="text-[#F5F5F5]/60 text-sm leading-relaxed font-medium">{plan.desc}</p>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {plan.includes.map((item, j) => (
                    <li key={j} className="flex items-start gap-3.5 text-sm text-[#F5F5F5]/90">
                      <Check className="w-4 h-4 text-[#B454FF] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                  {plan.excludes.map((item, j) => (
                    <li key={j} className="flex items-start gap-3.5 text-sm text-[#F5F5F5]/30">
                      <X className="w-4 h-4 text-white/20 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                <PremiumButton
                  variant={plan.highlight ? 'primary' : 'glass'}
                  size="lg"
                  className="w-full rounded-full"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={handleContact}
                >
                  {plan.cta}
                </PremiumButton>
              </motion.div>
            </MouseParallax>
          ))}
        </div>

        {/* ── FAQ ── */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-black uppercase tracking-widest mb-10 text-center opacity-80">
            {copy.faqTitle}
          </h3>
          <div className="grid gap-4">
            {copy.faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="rounded-2xl bg-white/[0.03] border border-white/5 p-6 hover:bg-white/[0.05] transition-colors"
              >
                <div className="font-black text-xs uppercase tracking-widest text-[#B454FF] mb-2">{faq.q}</div>
                <p className="text-[#F5F5F5]/65 text-sm leading-relaxed font-medium">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;