'use client';

import React, { useState } from 'react';

const FAQS = [
  {
    q: 'How does booking with Maya work?',
    a: 'Maya is our real-time voice receptionist. You speak naturally over the phone or directly in your browser. She checks live doctor availability, verifies the slot, and records your booking instantly to our database and Google Sheets.'
  },
  {
    q: 'What are the clinic hours and address?',
    a: 'City Dental Clinic is located at 12 Main Boulevard with dedicated free parking. We are open Monday through Saturday from 9:00 AM to 6:00 PM (Closed Sundays). Maya is available 24/7 for appointments.'
  },
  {
    q: 'What are the standard consultation fees?',
    a: 'Routine Dental Consultations & Digital HD Scans are $30. Professional Ultrasonic Teeth Cleaning & Polish is $50. Specialist procedures such as endodontics or cosmetic veneers are quoted transparently during your visit.'
  },
  {
    q: 'What is the procedure for acute dental trauma or emergency pain?',
    a: 'For same-day toothache or chipped crowns, call Maya to grab an emergency priority slot. For severe facial trauma or acute breathing distress, proceed immediately to the nearest hospital emergency department.'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faqs"
      style={{
        padding: '100px 24px',
        maxWidth: '860px',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      <div style={{ marginBottom: '56px' }}>
        <span
          style={{
            fontSize: '0.76rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '12px'
          }}
        >
          CLINICAL INFORMATION
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            fontWeight: 400,
            color: '#FFFFFF',
            lineHeight: 1.15
          }}
        >
          Frequently Asked Questions
        </h2>
      </div>

      <div style={{ borderTop: '1px solid var(--border-hairline)' }}>
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              style={{
                borderBottom: '1px solid var(--border-hairline)',
                padding: '24px 0'
              }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  color: '#FFFFFF',
                  textAlign: 'left',
                  fontSize: '1.08rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  padding: 0
                }}
              >
                <span>{faq.q}</span>
                <span
                  style={{
                    fontSize: '1.2rem',
                    color: isOpen ? 'var(--accent-terracotta)' : 'var(--text-muted)',
                    transition: 'transform 0.15s ease',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)'
                  }}
                >
                  +
                </span>
              </button>

              {isOpen && (
                <div
                  style={{
                    marginTop: '16px',
                    color: 'var(--text-body)',
                    fontSize: '0.92rem',
                    lineHeight: 1.65,
                    maxWidth: '680px'
                  }}
                >
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
