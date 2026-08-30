'use client';

import React, { useState } from 'react';

const FAQS = [
  {
    q: 'How does booking with Maya (AI Receptionist) work?',
    a: 'Maya is our real-time voice receptionist. You simply speak to her on the phone or right here in your browser. Tell her your name, desired date, time, and service. She instantly checks our live appointment book and Google Sheets, and confirms your slot in seconds.'
  },
  {
    q: 'What are your clinic operating hours and location?',
    a: 'City Dental Clinic is located at 12 Main Boulevard (with free dedicated parking). We are open Monday through Saturday from 9:00 AM to 6:00 PM. We are closed on Sundays.'
  },
  {
    q: 'How much do routine visits cost?',
    a: 'Routine Dental Consultations & Examinations are $30. Professional Ultrasonic Teeth Cleaning & Polish is $50. Specialized treatments such as root canals, crowns, or teeth whitening are quoted transparently during your visit.'
  },
  {
    q: 'What should I do in case of acute dental emergencies?',
    a: 'If you have sudden severe toothache or a chipped tooth during business hours, call us or talk to Maya to grab an emergency slot. For severe trauma, heavy bleeding, or difficulty breathing, visit the nearest hospital emergency room immediately.'
  },
  {
    q: 'Can I reschedule or cancel my appointment?',
    a: 'Yes! Simply call Maya or visit our front desk at 12 Main Boulevard anytime before your appointment slot.'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faqs"
      style={{
        padding: '100px 24px',
        maxWidth: '900px',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span
          style={{
            fontSize: '0.82rem',
            fontWeight: 700,
            color: '#06B6D4',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            display: 'block',
            marginBottom: '12px'
          }}
        >
          Frequently Asked Questions
        </span>
        <h2
          style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.6rem)',
            color: '#FFFFFF',
            lineHeight: 1.2
          }}
        >
          Everything you need to know about visiting us.
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="glass-panel"
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.2s ease',
                border: isOpen ? '1px solid rgba(255, 101, 89, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                style={{
                  width: '100%',
                  padding: '22px 24px',
                  background: 'transparent',
                  border: 'none',
                  color: '#FFFFFF',
                  textAlign: 'left',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}
              >
                <span>{faq.q}</span>
                <span
                  style={{
                    fontSize: '1.4rem',
                    color: isOpen ? '#FF6559' : '#94A3B8',
                    transition: 'transform 0.2s ease',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)'
                  }}
                >
                  +
                </span>
              </button>

              {isOpen && (
                <div
                  style={{
                    padding: '0 24px 22px 24px',
                    color: '#94A3B8',
                    fontSize: '0.95rem',
                    lineHeight: 1.6
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
