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
import FloatingCTA from '@/components/FloatingCTA';
import Contact from '@/components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#B454FF]/30">
      <Navbar />
      <main>
        <Hero />
        <ParallaxSection intensity={10}>
          <section className="kin-section">
            <div className="kin-container">
              <Brands />
            </div>
          </section>
        </ParallaxSection>
        <ParallaxSection intensity={12}>
          <section className="kin-section">
            <div className="kin-container">
              <Stats />
            </div>
          </section>
        </ParallaxSection>
        <ParallaxSection intensity={18}>
          <section className="kin-section">
            <div className="kin-container">
              <ValueProp />
            </div>
          </section>
        </ParallaxSection>
        <ParallaxSection intensity={16}>
          <section className="kin-section">
            <div className="kin-container">
              <HowItWorks />
            </div>
          </section>
        </ParallaxSection>
        <ParallaxSection intensity={14}>
          <section className="kin-section">
            <div className="kin-container">
              <Services />
            </div>
          </section>
        </ParallaxSection>
        <ParallaxSection intensity={20}>
          <section className="kin-section">
            <div className="kin-container">
              <Portfolio />
            </div>
          </section>
        </ParallaxSection>
        <ParallaxSection intensity={16}>
          <section className="kin-section">
            <div className="kin-container">
              <Testimonials />
            </div>
          </section>
        </ParallaxSection>
        <ParallaxSection intensity={14}>
          <section className="kin-section">
            <div className="kin-container">
              <Pricing />
            </div>
          </section>
        </ParallaxSection>
        <ParallaxSection intensity={12}>
          <section className="kin-section">
            <div className="kin-container">
              <Contact />
            </div>
          </section>
        </ParallaxSection>
        <ParallaxSection intensity={12}>
          <section className="kin-section">
            <div className="kin-container">
              <FAQ />
            </div>
          </section>
        </ParallaxSection>
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Index;