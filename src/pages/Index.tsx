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

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />
      <main>
        <Hero />
        <Brands />
        <Stats />
        <ValueProp />
        <HowItWorks />
        <Services />
        <Portfolio />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;