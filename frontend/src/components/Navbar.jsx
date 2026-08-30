'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar({ onOpenVoice }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 15;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: '74px',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          background: scrolled || mobileMenuOpen ? 'rgba(5, 8, 20, 0.94)' : 'rgba(5, 8, 20, 0.65)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: scrolled || mobileMenuOpen ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
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
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: 'inherit',
              flexShrink: 0
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #D9654B 0%, #0E162E 100%)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(217, 101, 75, 0.2)',
                flexShrink: 0
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C7.5 2 4 4.5 4 8c0 2.5 1 5 1.5 8 .5 3 2 6 3.5 6s2.5-3 3-5c.5 2 1.5 5 3 5s3-3 3.5-6c.5-3 1.5-5.5 1.5-8 0-3.5-3.5-6-8-6z"/>
              </svg>
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.05rem, 3.5vw, 1.2rem)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  display: 'block',
                  lineHeight: 1.15
                }}
              >
                City Dental Clinic
              </span>
              <span
                style={{
                  fontSize: '0.68rem',
                  color: '#94A3B8',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  display: 'block'
                }}
              >
                12 Main Boulevard
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (Hidden below 768px via media query inline check) */}
          <nav
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '26px'
            }}
          >
            <a
              href="#services"
              style={{
                color: '#94A3B8',
                textDecoration: 'none',
                fontSize: '0.88rem',
                fontWeight: 500,
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}
            >
              Services &amp; Rates
            </a>
            <a
              href="#experience"
              style={{
                color: '#94A3B8',
                textDecoration: 'none',
                fontSize: '0.88rem',
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
                fontSize: '0.88rem',
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
                fontSize: '0.85rem',
                fontWeight: 600,
                background: 'rgba(16, 185, 129, 0.1)',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(16, 185, 129, 0.25)'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
              Live Bookings
            </Link>
          </nav>

          {/* Right Area: Primary CTA & Mobile Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVoice();
              }}
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '9px 18px',
                borderRadius: '10px',
                fontSize: '0.86rem',
                fontWeight: 600,
                whiteSpace: 'nowrap'
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" x2="12" y1="19" y2="22"/>
              </svg>
              <span>Talk to Maya</span>
            </button>

            {/* Hamburger Button (Mobile only) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger-btn"
              aria-label="Toggle navigation menu"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0
              }}
            >
              {mobileMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="7" x2="20" y2="7"/>
                  <line x1="4" y1="12" x2="20" y2="12"/>
                  <line x1="4" y1="17" x2="20" y2="17"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Down Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-enter"
          style={{
            position: 'fixed',
            top: '74px',
            left: 0,
            right: 0,
            zIndex: 99,
            background: 'rgba(7, 11, 25, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '24px 20px 30px 20px',
            boxShadow: '0 20px 30px rgba(0,0,0,0.6)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#F8FAFC',
                textDecoration: 'none',
                fontSize: '1.05rem',
                fontWeight: 600,
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              Services &amp; Pricing
            </a>
            <a
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#F8FAFC',
                textDecoration: 'none',
                fontSize: '1.05rem',
                fontWeight: 600,
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              Why Choose City Dental
            </a>
            <a
              href="#faqs"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#F8FAFC',
                textDecoration: 'none',
                fontSize: '1.05rem',
                fontWeight: 600,
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              Frequently Asked Questions
            </a>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#10B981',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                padding: '10px 14px',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                width: 'fit-content'
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
              Live Booking Ledger &rarr;
            </Link>

            {/* Quick Mobile Info */}
            <div style={{ marginTop: '10px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.82rem', color: '#94A3B8' }}>
              <p><strong style={{ color: '#FFFFFF' }}>Hours:</strong> Mon–Sat 9:00 AM – 6:00 PM</p>
              <p style={{ marginTop: '4px' }}><strong style={{ color: '#FFFFFF' }}>Address:</strong> 12 Main Boulevard (Free Parking)</p>
            </div>
          </div>
        </div>
      )}

      {/* Responsive CSS for Mobile Hamburger visibility */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-hamburger-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </>
  );
}
