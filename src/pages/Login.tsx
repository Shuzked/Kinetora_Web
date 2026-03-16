"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PremiumButton from '@/components/PremiumButton';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Logo from '@/components/Logo';
import { Chrome, Mail, Lock, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from "@/i18n/I18nProvider";

const Login = () => {
  const { lang } = useI18n();
  const [isLoading, setIsLoading] = useState(false);

  const copy =
    lang === "es"
      ? {
          title: "Accede a tu portal",
          sub: "Bienvenido de nuevo a Kinetora.",
          tabLogin: "Entrar",
          tabSignup: "Registro",
          continueGoogle: "Continuar con Google",
          orEmail: "o continúa con email",
          email: "Email",
          pass: "Contraseña",
          passPh: "••••••••",
          emailPh: "tu@email.com",
          forgot: "¿Olvidaste tu contraseña?",
          ctaLogin: "Iniciar sesión",
          ctaSignup: "Crear cuenta",
          minChars: "Mínimo 8 caracteres",
          ssl: "Cifrado SSL",
          safe: "Datos seguros",
          instant: "Acceso inmediato",
          back: "Volver al inicio",
          legalA: "Al continuar, aceptas nuestra",
          privacy: "Política de Privacidad",
          legalB: "y los",
          terms: "Términos de Uso",
        }
      : {
          title: "Access your portal",
          sub: "Welcome back to Kinetora.",
          tabLogin: "Log in",
          tabSignup: "Sign up",
          continueGoogle: "Continue with Google",
          orEmail: "or continue with email",
          email: "Email",
          pass: "Password",
          passPh: "••••••••",
          emailPh: "you@company.com",
          forgot: "Forgot your password?",
          ctaLogin: "Log in",
          ctaSignup: "Create account",
          minChars: "Minimum 8 characters",
          ssl: "SSL encryption",
          safe: "Secure data",
          instant: "Instant access",
          back: "Back to home",
          legalA: "By continuing, you agree to our",
          privacy: "Privacy Policy",
          legalB: "and",
          terms: "Terms of Use",
        };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute -top-32 -left-40 w-[90vw] max-w-[900px] h-[60vh] rounded-full bg-[#B454FF]/12 blur-[120px]"
        animate={{ scale: [1, 1.05, 1], opacity: [0.12, 0.16, 0.12] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-40 -right-40 w-[70vw] max-w-[720px] h-[50vh] rounded-full bg-[#B454FF]/8 blur-[140px]"
        animate={{ y: [0, -12, 0], opacity: [0.08, 0.12, 0.08] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10 mx-auto px-4 sm:px-6"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <Link to="/" className="mb-6 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded-full">
            <Logo className="h-8 md:h-10" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-black text-[#F5F5F5] tracking-tighter uppercase">{copy.title}</h1>
          <p className="text-[#F5F5F5]/70 text-sm mt-1">{copy.sub}</p>
        </div>

        <div className="bg-[#111111] border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-2xl">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#0D0D0D] border border-white/10 rounded-full p-1 mb-6 md:mb-8">
              <TabsTrigger value="login" className="rounded-full data-[state=active]:bg-[#B454FF] data-[state=active]:text-white font-bold text-[10px] md:text-xs uppercase tracking-widest">
                {copy.tabLogin}
              </TabsTrigger>
              <TabsTrigger value="signup" className="rounded-full data-[state=active]:bg-[#B454FF] data-[state=active]:text-white font-bold text-[10px] md:text-xs uppercase tracking-widest">
                {copy.tabSignup}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-6">
              <PremiumButton
                type="button"
                onClick={() => handleSocialLogin('google')}
                variant="white"
                size="md"
                isLoading={isLoading}
                className="w-full tracking-[0.04em] font-semibold"
                leftIcon={<Chrome className="w-4 h-4" />}
              >
                {copy.continueGoogle}
              </PremiumButton>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                  <span className="bg-[#111111] px-4 text-[#F5F5F5]/50">{copy.orEmail}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-[#F5F5F5]/60 ml-1">
                    {copy.email}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5F5F5]/50" />
                    <Input id="email" type="email" placeholder={copy.emailPh} className="bg-[#0D0D0D] border-white/15 rounded-full pl-12 h-12 text-[#F5F5F5] placeholder:text-[#F5F5F5]/40 focus-visible:ring-2 focus-visible:ring-[#B454FF]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pass" className="text-[10px] font-bold uppercase tracking-widest text-[#F5F5F5]/60 ml-1">
                    {copy.pass}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5F5F5]/50" />
                    <Input id="pass" type="password" placeholder={copy.passPh} className="bg-[#0D0D0D] border-white/15 rounded-full pl-12 h-12 text-[#F5F5F5] placeholder:text-[#F5F5F5]/40 focus-visible:ring-2 focus-visible:ring-[#B454FF]" />
                  </div>
                  <div className="text-right">
                    <button className="text-[#F5F5F5]/60 hover:text-[#B454FF] text-[11px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded">
                      {copy.forgot}
                    </button>
                  </div>
                </div>
              </div>
              <PremiumButton variant="primary" size="md" className="w-full" isLoading={isLoading} onClick={() => setIsLoading(true)}>
                {copy.ctaLogin.toUpperCase()}
              </PremiumButton>
            </TabsContent>

            <TabsContent value="signup" className="space-y-6">
              <PremiumButton
                type="button"
                onClick={() => handleSocialLogin('google')}
                variant="white"
                size="md"
                isLoading={isLoading}
                className="w-full tracking-[0.04em] font-semibold"
                leftIcon={<Chrome className="w-4 h-4" />}
              >
                {copy.continueGoogle}
              </PremiumButton>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                  <span className="bg-[#111111] px-4 text-[#F5F5F5]/50">{copy.orEmail}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-email" className="text-[10px] font-bold uppercase tracking-widest text-[#F5F5F5]/60 ml-1">
                    {copy.email}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5F5F5]/50" />
                    <Input id="new-email" type="email" placeholder={copy.emailPh} className="bg-[#0D0D0D] border-white/15 rounded-full pl-12 h-12 text-[#F5F5F5] placeholder:text-[#F5F5F5]/40 focus-visible:ring-2 focus-visible:ring-[#B454FF]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-pass" className="text-[10px] font-bold uppercase tracking-widest text-[#F5F5F5]/60 ml-1">
                    {copy.pass}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5F5F5]/50" />
                    <Input id="new-pass" type="password" placeholder={copy.minChars} className="bg-[#0D0D0D] border-white/15 rounded-full pl-12 h-12 text-[#F5F5F5] placeholder:text-[#F5F5F5]/40 focus-visible:ring-2 focus-visible:ring-[#B454FF]" />
                  </div>
                </div>
              </div>
              <PremiumButton variant="primary" size="md" className="w-full" isLoading={isLoading} onClick={() => setIsLoading(true)}>
                {copy.ctaSignup.toUpperCase()}
              </PremiumButton>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex flex-nowrap items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-widest text-[#F5F5F5]/60 overflow-x-auto no-scrollbar">
            <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <Lock className="w-3.5 h-3.5 text-[#B454FF]" />
              {copy.ssl}
            </div>
            <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B454FF]" />
              {copy.safe}
            </div>
            <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <Zap className="w-3.5 h-3.5 text-[#B454FF]" />
              {copy.instant}
            </div>
          </div>
        </div>

        <Link
          to="/"
          className="mt-8 flex items-center justify-center gap-2 text-[#F5F5F5]/60 hover:text-[#B454FF] transition-colors text-[10px] font-bold uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded-full"
        >
          <ArrowLeft className="w-3 h-3" />
          {copy.back}
        </Link>

        <p className="mt-3 text-center text-[11px] text-[#F5F5F5]/55">
          {copy.legalA}{" "}
          <a href="#privacy" className="underline hover:text-[#B454FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded">{copy.privacy}</a>{" "}
          {copy.legalB}{" "}
          <a href="#terms" className="underline hover:text-[#B454FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF] rounded">{copy.terms}</a>.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;