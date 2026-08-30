'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer({ onOpenVoice }) {
  return (
    <footer
      style={{
        background: 'var(--bg-deep)',
        borderTop: '1px solid var(--border-hairline)',
        paddingTop: '80px',
        paddingBottom: '48px',
        color: 'var(--text-muted)'
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 24px'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '48px',
            marginBottom: '60px'
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  display: 'block'
                }}
              >
                City Dental Clinic
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                12 Main Boulevard &bull; Est. 2026
              </span>
            </div>
            <p style={{ fontSize: '0.86rem', lineHeight: 1.6, color: 'var(--text-body)', marginBottom: '18px' }}>
              Bespoke clinical dentistry paired with real-time 24/7 voice scheduling.
            </p>
            <button
              onClick={onOpenVoice}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-terracotta)',
                fontSize: '0.85rem',
                fontWeight: 500,
                cursor: 'pointer',
                padding: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>Speak with Maya</span>
              <span>&rarr;</span>
            </button>
          </div>

          {/* Navigation */}
          <div>
            <span
              style={{
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-pure)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'block',
                marginBottom: '16px'
              }}
            >
              Navigation
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem' }}>
              <li><a href="#conversation" style={{ color: 'var(--text-body)', textDecoration: 'none' }}>Voice Experience</a></li>
              <li><a href="#procedures" style={{ color: 'var(--text-body)', textDecoration: 'none' }}>Procedures &amp; Rates</a></li>
              <li><a href="#experience" style={{ color: 'var(--text-body)', textDecoration: 'none' }}>Clinical Standards</a></li>
              <li><a href="#faqs" style={{ color: 'var(--text-body)', textDecoration: 'none' }}>FAQs</a></li>
              <li><Link href="/dashboard" style={{ color: 'var(--accent-emerald)', textDecoration: 'none' }}>Live Booking Ledger &rarr;</Link></li>
            </ul>
          </div>

          {/* Practice Info */}
          <div>
            <span
              style={{
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-pure)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'block',
                marginBottom: '16px'
              }}
            >
              Practice Details
            </span>
            <div style={{ fontSize: '0.86rem', lineHeight: 1.7, color: 'var(--text-body)' }}>
              <p><strong style={{ color: '#FFFFFF' }}>Address:</strong> 12 Main Boulevard</p>
              <p><strong style={{ color: '#FFFFFF' }}>Hours:</strong> Mon–Sat: 9:00 AM – 6:00 PM</p>
              <p><strong style={{ color: '#FFFFFF' }}>Sunday:</strong> Closed</p>
              <p><strong style={{ color: '#FFFFFF' }}>Reception:</strong> 24/7 via Maya AI</p>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid var(--border-hairline)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            fontSize: '0.78rem'
          }}
        >
          <p>&copy; {new Date().getFullYear()} City Dental Clinic. All rights reserved.</p>
          <p style={{ color: 'var(--text-muted)' }}>
            Emergency notice: For severe facial trauma or respiratory distress, please contact emergency services immediately.
          </p>
        </div>
      </div>
    </footer>
  );
}
