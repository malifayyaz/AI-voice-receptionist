'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ConversationDemoSection from '../components/ConversationDemoSection';
import ServicesSection from '../components/ServicesSection';
import ValuePropsSection from '../components/ValuePropsSection';
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
      {/* Minimalist Editorial Navigation */}
      <Navbar onOpenVoice={() => setIsVoiceOpen(true)} />

      {/* Centered Single-Column Full-Width Hero (Midday / Ramp inspired) */}
      <HeroSection onOpenVoice={() => setIsVoiceOpen(true)} />

      {/* Full-Width Editorial Conversation Transcript Demo */}
      <ConversationDemoSection onOpenVoice={() => setIsVoiceOpen(true)} />

      {/* Procedures & Transparent Rates Table */}
      <ServicesSection onOpenVoice={() => setIsVoiceOpen(true)} />

      {/* Clinical Standards / Core Pillars */}
      <ValuePropsSection />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Practice Footer */}
      <Footer onOpenVoice={() => setIsVoiceOpen(true)} />

      {/* Interactive Vapi Voice Web Widget */}
      <VapiVoiceWidget
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
      />
    </main>
  );
}
