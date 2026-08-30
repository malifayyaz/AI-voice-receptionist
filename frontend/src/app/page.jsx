'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ValuePropsSection from '../components/ValuePropsSection';
import ServicesSection from '../components/ServicesSection';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';

// Load Vapi Web SDK Voice Widget dynamically on client-side only (prevents SSR build errors)
const VapiVoiceWidget = dynamic(() => import('../components/VapiVoiceWidget'), {
  ssr: false
});

export default function HomePage() {
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-deep)' }}>
      {/* Navigation Header */}
      <Navbar onOpenVoice={() => setIsVoiceOpen(true)} />

      {/* Hero Section */}
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

      {/* Floating Bottom-Right Voice Button */}
      {!isVoiceOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 90
          }}
        >
          <button
            onClick={() => setIsVoiceOpen(true)}
            className="btn-pulse-glow"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 24px',
              borderRadius: '99px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: 700,
              boxShadow: '0 12px 30px -4px rgba(255, 101, 89, 0.5)'
            }}
          >
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#FFFFFF',
                boxShadow: '0 0 8px #FFFFFF'
              }}
            />
            Talk to Maya
          </button>
        </div>
      )}
    </main>
  );
}
