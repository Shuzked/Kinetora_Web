"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Brands from '@/components/Brands';
import Stats from '@/components/Stats';
import ValueProp from '@/components/ValueProp';
import HowItWorks from '@/components/HowItWorks';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import ParallaxSection from '@/components/ParallaxSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#B454FF]/30">
      <Navbar />
      <main>
        <Hero />
        <ParallaxSection intensity={10}>
          <Brands />
        </ParallaxSection>
        <ParallaxSection intensity={12}>
          <Stats />
        </ParallaxSection>
        <ParallaxSection intensity={18}>
          <ValueProp />
        </ParallaxSection>
        <ParallaxSection intensity={16}>
          <HowItWorks />
        </ParallaxSection>
        <ParallaxSection intensity={14}>
          <Services />
        </ParallaxSection>
        <ParallaxSection intensity={20}>
          <Portfolio />
        </ParallaxSection>
        <ParallaxSection intensity={16}>
          <Testimonials />
        </ParallaxSection>
        <ParallaxSection intensity={14}>
          <Pricing />
        </ParallaxSection>
        <ParallaxSection intensity={12}>
          <FAQ />
        </ParallaxSection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;