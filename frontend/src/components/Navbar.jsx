'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar({ onOpenVoice }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 15;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '76px',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        background: scrolled ? 'rgba(7, 11, 25, 0.92)' : 'rgba(7, 11, 25, 0.5)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
        transition: 'background 0.2s ease, border-color 0.2s ease'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #FF6559 0%, #0D152D 100%)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(255, 101, 89, 0.25)',
              flexShrink: 0
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C7.5 2 4 4.5 4 8c0 2.5 1 5 1.5 8 .5 3 2 6 3.5 6s2.5-3 3-5c.5 2 1.5 5 3 5s3-3 3.5-6c.5-3 1.5-5.5 1.5-8 0-3.5-3.5-6-8-6z"/>
            </svg>
          </div>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                display: 'block',
                lineHeight: 1.2
              }}
            >
              City Dental Clinic
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                color: '#94A3B8',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 600,
                display: 'block'
              }}
            >
              12 Main Boulevard
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px'
          }}
        >
          <a
            href="#services"
            style={{
              color: '#94A3B8',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}
          >
            Services &amp; Pricing
          </a>
          <a
            href="#experience"
            style={{
              color: '#94A3B8',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}
          >
            Why Us
          </a>
          <a
            href="#faqs"
            style={{
              color: '#94A3B8',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}
          >
            FAQs
          </a>
          <Link
            href="/dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#10B981',
              textDecoration: 'none',
              fontSize: '0.88rem',
              fontWeight: 600,
              background: 'rgba(16, 185, 129, 0.1)',
              padding: '6px 14px',
              borderRadius: '99px',
              border: '1px solid rgba(16, 185, 129, 0.25)'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#10B981'
              }}
            />
            Live Bookings
          </Link>
        </nav>

        {/* CTA Button */}
        <div>
          <button
            onClick={onOpenVoice}
            className="btn-pulse-glow"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '99px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 600
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" x2="12" y1="19" y2="22"/>
            </svg>
            Talk to Maya
          </button>
        </div>
      </div>
    </header>
  );
}
