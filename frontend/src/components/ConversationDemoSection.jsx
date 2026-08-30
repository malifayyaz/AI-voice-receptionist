'use client';

import React from 'react';

const DIALOGUE = [
  {
    speaker: 'Maya',
    role: 'AI Receptionist',
    time: '10:14 AM',
    text: 'Good morning! Thank you for calling City Dental Clinic. This is Maya. How can I help you today?'
  },
  {
    speaker: 'Patient',
    role: 'Caller',
    time: '10:14 AM',
    text: 'Hi Maya, I have a persistent toothache and would like to schedule an examination for this Thursday morning.'
  },
  {
    speaker: 'Maya',
    role: 'AI Receptionist',
    time: '10:14 AM',
    text: 'I am sorry to hear you are experiencing discomfort. Thursday at 10:30 AM is open with Dr. Harris. Shall I reserve that time for your examination?'
  },
  {
    speaker: 'Patient',
    role: 'Caller',
    time: '10:15 AM',
    text: 'Yes please, 10:30 AM works perfectly. My name is Julian Vance.'
  },
  {
    speaker: 'Maya',
    role: 'AI Receptionist',
    time: '10:15 AM',
    text: 'You are all set, Julian. Your appointment is confirmed for Thursday at 10:30 AM at 12 Main Boulevard. We look forward to seeing you.'
  }
];

export default function ConversationDemoSection({ onOpenVoice }) {
  return (
    <section
      id="conversation"
      style={{
        padding: '120px 24px',
        maxWidth: '860px',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: '64px', textAlign: 'center' }}>
        <span
          style={{
            fontSize: '0.76rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '14px'
          }}
        >
          LIVE TRANSCRIPT ARCHITECTURE
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            fontWeight: 400,
            color: '#FFFFFF',
            lineHeight: 1.15,
            marginBottom: '16px'
          }}
        >
          Natural dialogue. Zero delays.
        </h2>
        <p style={{ color: 'var(--text-body)', fontSize: '1.02rem', maxWidth: '520px', margin: '0 auto' }}>
          Hear how Maya understands natural conversational nuances, checks live doctor availability, and synchronizes the clinic ledger.
        </p>
      </div>

      {/* Full-Width Editorial Transcript Thread (Vast whitespace, no boxed border card) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '36px',
          borderLeft: '1px solid var(--border-hairline)',
          paddingLeft: '32px',
          marginLeft: '12px'
        }}
      >
        {DIALOGUE.map((item, idx) => {
          const isMaya = item.speaker === 'Maya';
          return (
            <div key={idx} style={{ position: 'relative' }}>
              {/* Timeline marker */}
              <div
                style={{
                  position: 'absolute',
                  left: '-37px',
                  top: '4px',
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  background: isMaya ? 'var(--accent-terracotta)' : '#333742',
                  border: '2px solid var(--bg-deep)'
                }}
              />

              {/* Speaker Metadata */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: isMaya ? '#FFFFFF' : '#CBD5E1'
                  }}
                >
                  {item.speaker}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {item.role} &bull; {item.time}
                </span>
              </div>

              {/* Utterance Text */}
              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.6,
                  color: isMaya ? '#F4F4F6' : 'var(--text-body)',
                  fontWeight: isMaya ? 400 : 300,
                  maxWidth: '720px'
                }}
              >
                &ldquo;{item.text}&rdquo;
              </p>
            </div>
          );
        })}
      </div>

      {/* Minimal Action Footer */}
      <div
        style={{
          marginTop: '64px',
          paddingTop: '32px',
          borderTop: '1px solid var(--border-hairline)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
          <span className="micro-dot" />
          <span>Average turn-taking latency: &lt; 350ms</span>
        </div>

        <button
          onClick={onOpenVoice}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--accent-terracotta)',
            fontSize: '0.88rem',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: 0
          }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
        >
          <span>Try this conversation live</span>
          <span>&rarr;</span>
        </button>
      </div>
    </section>
  );
}
