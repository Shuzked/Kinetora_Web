"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, Pause, RefreshCw, Timer, Shield } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import PremiumButton from '@/components/PremiumButton';

const Pricing = () => {
  const { lang } = useI18n();
  const isEs = lang === 'es';

  const copy = isEs ? {
    badge: 'Pricing',
    title: 'Claro, directo,',
    titleAccent: 'sin sorpresas.',
    sub: 'Un modelo de suscripción flexible diseñado para startups que necesitan velocidad y calidad. Sin permanencia. Sin costes ocultos. Pausa cuando quieras.',
    guarantees: [
      { Icon: Timer, text: 'Entrega en 48h por solicitud' },
      { Icon: RefreshCw, text: 'Revisiones ilimitadas incluidas' },
      { Icon: Pause, text: 'Pausa o cancela en cualquier momento' },
      { Icon: Shield, text: 'Precio fijo mensual sin sorpresas' },
    ],
    plans: [
      {
        name: 'Lanzamiento',
        price: '1.900',
        period: '/mes',
        highlight: false,
        badge: null,
        desc: 'Para startups en etapa temprana que necesitan moverse rápido con una base visual sólida.',
        includes: [
          '1 solicitud activa a la vez',
          'Entrega en 48h por tarea',
          'Diseño gráfico y branding',
          'Diseño UX/UI y web',
          'Revisiones ilimitadas',
          'Gestión por Telegram / Discord',
          'Pausa o cancela cuando quieras',
        ],
        excludes: [
          'Motion & Vídeo',
          'Estrategia de contenido',
          'Solicitudes en paralelo',
        ],
        cta: 'Empezar ahora',
      },
      {
        name: 'Escala',
        price: '3.500',
        period: '/mes',
        highlight: true,
        badge: '+ Popular',
        desc: 'Para startups en crecimiento que necesitan un equipo completo sin fricción.',
        includes: [
          '2 solicitudes en paralelo',
          'Entrega en 48h por tarea',
          'Diseño gráfico y branding',
          'Diseño UX/UI y web',
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
        desc: 'Equipo dedicado a tiempo completo. Para Series A/B o marcas con volumen de producción alto.',
        includes: [
          'Solicitudes ilimitadas en paralelo',
          'Dedicated senior team',
          'Todos los servicios incluidos',
          'Reunión de estrategia semanal',
          'Acceso al portal de cliente',
          'SLA de entrega personalizado',
          'Gestor de cuenta exclusivo',
        ],
        excludes: [],
        cta: 'Hablemos',
      },
    ],
    faqTitle: 'Preguntas frecuentes sobre los planes',
    faqs: [
      { q: '¿Puedo cambiar de plan?', a: 'Sí, puedes subir o bajar de plan en cualquier momento con 30 días de aviso.' },
      { q: '¿Qué significa "pausar"?', a: 'Si tienes un período más tranquilo, congelas la suscripción y los días restantes se conservan para cuando la reactives.' },
      { q: '¿Hay permanencia?', a: 'No. Cancelas con 30 días de aviso, sin penalizaciones.' },
      { q: '¿Cómo funciona la entrega en 48h?', a: 'Cada solicitud que inicies tiene una ventana de entrega de 48 horas hábiles desde que la aceptamos. Los proyectos complejos se dividen en hitos, cada uno con su propio ciclo de 48h.' },
    ],
  } : {
    badge: 'Pricing',
    title: 'Clear, direct,',
    titleAccent: 'no surprises.',
    sub: 'A flexible subscription model built for startups that need speed and quality. No lock-in. No hidden costs. Pause whenever you want.',
    guarantees: [
      { Icon: Timer, text: '48h delivery per request' },
      { Icon: RefreshCw, text: 'Unlimited revisions included' },
      { Icon: Pause, text: 'Pause or cancel anytime' },
      { Icon: Shield, text: 'Fixed monthly price, no surprises' },
    ],
    plans: [
      {
        name: 'Launch',
        price: '1,900',
        period: '/mo',
        highlight: false,
        badge: null,
        desc: 'For early-stage startups that need to move fast with a solid visual foundation.',
        includes: [
          '1 active request at a time',
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
    window.location.href = '/#contacto';
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#B454FF]/30">
      <SEO
        title={isEs ? 'Planes y Precios — Kinetora Studio' : 'Plans & Pricing — Kinetora Studio'}
        description={isEs
          ? 'Suscripción de diseño sin permanencia desde 1.900€/mes. Entrega en 48h, revisiones ilimitadas, pausa cuando quieras.'
          : 'Design subscription with no lock-in from €1,900/mo. 48h delivery, unlimited revisions, pause anytime.'}
        canonical={isEs ? 'https://kinetora.es/precios' : 'https://kinetora.tech/precios'}
      />
      <Navbar />

      <main className="pt-32 pb-24">
        {/* ── HEADER ── */}
        <section className="kin-container text-center mb-20 sm:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black tracking-[0.28em] uppercase text-[#F5F5F5]/80 mb-6">
              {copy.badge}
            </div>
            <h1 className="mb-6">
              {copy.title} <br />
              <span className="text-[#B454FF]">{copy.titleAccent}</span>
            </h1>
            <p className="text-[#F5F5F5]/70 max-w-2xl mx-auto text-lg leading-relaxed mb-12">
              {copy.sub}
            </p>

            {/* Guarantees row */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {copy.guarantees.map(({ Icon, text }, i) => (
                <div key={i} className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#F5F5F5]/60">
                  <Icon className="w-3.5 h-3.5 text-[#B454FF]" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── PRICING CARDS ── */}
        <section className="kin-container mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {copy.plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`relative rounded-[2rem] p-8 flex flex-col border transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-[#B454FF]/10 border-[#B454FF]/40 shadow-[0_0_60px_rgba(180,84,255,0.12)]'
                    : 'bg-white/[0.04] border-white/10 hover:border-white/20 hover:bg-white/[0.06]'
                }`}
              >
                {plan.badge && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest ${
                    plan.highlight ? 'bg-[#B454FF] text-white' : 'bg-white/10 text-white/70 border border-white/20'
                  }`}>
                    {plan.badge}
                  </div>
                )}

                <div className="mb-8">
                  <h2 className="text-sm font-black uppercase tracking-[0.28em] text-[#F5F5F5]/60 mb-3">{plan.name}</h2>
                  <div className="flex items-baseline gap-1 mb-3">
                    {plan.price !== 'Custom' && <span className="text-lg font-black text-[#B454FF]">€</span>}
                    <span className="text-5xl font-black text-[#F5F5F5] tracking-tighter">{plan.price}</span>
                    <span className="text-[#F5F5F5]/50 font-bold text-sm">{plan.period}</span>
                  </div>
                  <p className="text-[#F5F5F5]/60 text-sm leading-relaxed">{plan.desc}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.includes.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-[#F5F5F5]/80">
                      <Check className="w-4 h-4 text-[#B454FF] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                  {plan.excludes.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-[#F5F5F5]/35">
                      <X className="w-4 h-4 text-white/20 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                <PremiumButton
                  variant={plan.highlight ? 'primary' : 'glass'}
                  size="lg"
                  className="w-full"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={handleContact}
                >
                  {plan.cta}
                </PremiumButton>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="kin-container max-w-3xl mx-auto">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-10 text-center">
            {copy.faqTitle}
          </h2>
          <div className="space-y-4">
            {copy.faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="rounded-2xl bg-white/[0.04] border border-white/10 p-6"
              >
                <h3 className="font-black text-sm uppercase tracking-tight text-[#F5F5F5] mb-2">{faq.q}</h3>
                <p className="text-[#F5F5F5]/65 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
