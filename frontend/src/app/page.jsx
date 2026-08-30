'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ValuePropsSection from '../components/ValuePropsSection';
import ServicesSection from '../components/ServicesSection';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';

// Load Vapi Web SDK Voice Widget dynamically on client-side only
const VapiVoiceWidget = dynamic(() => import('../components/VapiVoiceWidget'), {
  ssr: false
});

export default function HomePage() {
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-deep)' }}>
      {/* Navigation Header with Responsive Mobile Drawer */}
      <Navbar onOpenVoice={() => setIsVoiceOpen(true)} />

      {/* Hero Section with refined typographic hierarchy & single primary CTA */}
      <HeroSection onOpenVoice={() => setIsVoiceOpen(true)} />

      {/* 3 Core Value Props */}
      <ValuePropsSection />

      {/* Services & Transparent Pricing */}
      <ServicesSection onOpenVoice={() => setIsVoiceOpen(true)} />

      {/* Clinic FAQs Accordion */}
      <FaqSection />

      {/* Footer */}
      <Footer onOpenVoice={() => setIsVoiceOpen(true)} />

      {/* Interactive Vapi Voice Web Widget Modal */}
      <VapiVoiceWidget
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
      />
    </main>
  );
}
