'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar({ onOpenVoice }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
          height: '70px',
          padding: '0 28px',
          display: 'flex',
          alignItems: 'center',
          background: scrolled || mobileOpen ? 'rgba(7, 7, 9, 0.92)' : 'rgba(7, 7, 9, 0.4)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: scrolled || mobileOpen ? '1px solid var(--border-hairline)' : '1px solid transparent',
          transition: 'background 0.25s ease, border-color 0.25s ease'
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            width: '100%',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Minimal Brand Logo */}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#FFFFFF',
                letterSpacing: '-0.02em'
              }}
            >
              City Dental
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.04em'
              }}
            >
              / CLINIC
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="desktop-links"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px'
            }}
          >
            <a
              href="#conversation"
              style={{
                color: 'var(--text-body)',
                textDecoration: 'none',
                fontSize: '0.88rem',
                fontWeight: 400,
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-body)')}
            >
              Voice Experience
            </a>
            <a
              href="#procedures"
              style={{
                color: 'var(--text-body)',
                textDecoration: 'none',
                fontSize: '0.88rem',
                fontWeight: 400,
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-body)')}
            >
              Procedures &amp; Rates
            </a>
            <a
              href="#faqs"
              style={{
                color: 'var(--text-body)',
                textDecoration: 'none',
                fontSize: '0.88rem',
                fontWeight: 400,
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-body)')}
            >
              FAQs
            </a>
            <Link
              href="/dashboard"
              style={{
                color: 'var(--text-body)',
                textDecoration: 'none',
                fontSize: '0.88rem',
                fontWeight: 400,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-body)')}
            >
              <span className="micro-dot" />
              Live Ledger
            </Link>
          </nav>

          {/* Right Action: Clean Matte CTA & Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenVoice();
              }}
              className="btn-matte"
              style={{
                padding: '9px 18px',
                fontSize: '0.86rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>Talk to Maya</span>
            </button>

            {/* Minimal Hamburger (Mobile only) */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-toggle-btn"
              aria-label="Toggle navigation menu"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'transparent',
                border: '1px solid var(--border-hairline)',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0
              }}
            >
              {mobileOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="7" x2="20" y2="7"/>
                  <line x1="4" y1="12" x2="20" y2="12"/>
                  <line x1="4" y1="17" x2="20" y2="17"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            right: 0,
            zIndex: 99,
            background: 'rgba(7, 7, 9, 0.98)',
            backdropFilter: 'blur(24px)',
            borderBottom: '1px solid var(--border-hairline)',
            padding: '24px 24px 32px 24px'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <a
              href="#conversation"
              onClick={() => setMobileOpen(false)}
              style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 500 }}
            >
              Voice Experience
            </a>
            <a
              href="#procedures"
              onClick={() => setMobileOpen(false)}
              style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 500 }}
            >
              Procedures &amp; Rates
            </a>
            <a
              href="#faqs"
              onClick={() => setMobileOpen(false)}
              style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 500 }}
            >
              FAQs
            </a>
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              style={{
                color: 'var(--accent-emerald)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                paddingTop: '6px'
              }}
            >
              <span className="micro-dot" />
              Live Ledger &rarr;
            </Link>
          </div>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-links {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </>
  );
}
