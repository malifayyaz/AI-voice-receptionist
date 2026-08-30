'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function VapiVoiceWidget({ isOpen, onClose }) {
  const [callState, setCallState] = useState('idle'); // idle | connecting | active | error
  const [isMuted, setIsMuted] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [customPublicKey, setCustomPublicKey] = useState('');
  const [customAssistantId, setCustomAssistantId] = useState('');
  const [showConfig, setShowConfig] = useState(false);

  const vapiRef = useRef(null);

  // Load saved credentials from localStorage on mount (client-only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedKey = localStorage.getItem('vapi_public_key');
        const savedAssistant = localStorage.getItem('vapi_assistant_id');
        if (savedKey) setCustomPublicKey(savedKey);
        if (savedAssistant) setCustomAssistantId(savedAssistant);
      } catch (e) {}
    }
  }, []);

  const publicKey = customPublicKey || process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || '';
  const assistantId = customAssistantId || process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || '';

  // Initialize Vapi SDK dynamically in browser only
  useEffect(() => {
    let vapiInstance = null;

    if (typeof window !== 'undefined' && publicKey) {
      import('@vapi-ai/web')
        .then(({ default: Vapi }) => {
          try {
            vapiInstance = new Vapi(publicKey);
            vapiRef.current = vapiInstance;

            vapiInstance.on('call-start', () => {
              setCallState('active');
              setErrorMessage('');
            });

            vapiInstance.on('call-end', () => {
              setCallState('idle');
              setVolumeLevel(0);
            });

            vapiInstance.on('speech-start', () => {
              setVolumeLevel(0.8);
            });

            vapiInstance.on('speech-end', () => {
              setVolumeLevel(0.1);
            });

            vapiInstance.on('volume-level', (vol) => {
              setVolumeLevel(vol || 0);
            });

            vapiInstance.on('error', (err) => {
              console.error('Vapi Error:', err);
              setErrorMessage(err?.message || 'Connection issue with Vapi voice service.');
              setCallState('error');
            });
          } catch (err) {
            console.error('Failed to init Vapi client:', err);
          }
        })
        .catch((err) => {
          console.error('Failed to dynamically load @vapi-ai/web:', err);
        });
    }

    return () => {
      if (vapiInstance) {
        try {
          vapiInstance.stop();
        } catch (e) {}
      }
    };
  }, [publicKey]);

  const handleSaveCredentials = () => {
    if (typeof window !== 'undefined') {
      try {
        if (customPublicKey) localStorage.setItem('vapi_public_key', customPublicKey.trim());
        if (customAssistantId) localStorage.setItem('vapi_assistant_id', customAssistantId.trim());
      } catch (e) {}
    }
    setShowConfig(false);
  };

  const startCall = async () => {
    if (!publicKey || !assistantId) {
      setShowConfig(true);
      return;
    }

    try {
      setCallState('connecting');
      setErrorMessage('');

      if (!vapiRef.current && typeof window !== 'undefined') {
        const { default: Vapi } = await import('@vapi-ai/web');
        vapiRef.current = new Vapi(publicKey);
      }

      if (vapiRef.current) {
        await vapiRef.current.start(assistantId);
      }
    } catch (err) {
      console.error('Start call error:', err);
      setErrorMessage(err?.message || 'Failed to connect to voice assistant.');
      setCallState('error');
    }
  };

  const endCall = () => {
    if (vapiRef.current) {
      try {
        vapiRef.current.stop();
      } catch (e) {}
    }
    setCallState('idle');
    setVolumeLevel(0);
  };

  const toggleMute = () => {
    if (vapiRef.current) {
      const nextMute = !isMuted;
      vapiRef.current.setMuted(nextMute);
      setIsMuted(nextMute);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'rgba(5, 5, 7, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && callState !== 'active') {
          onClose();
        }
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '40px 32px 36px 32px',
          position: 'relative',
          background: '#0A0A0D',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 32px 64px -16px rgba(0, 0, 0, 0.85)'
        }}
      >
        {/* Subtle Close Button */}
        <button
          onClick={() => {
            if (callState === 'active') endCall();
            onClose();
          }}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'var(--text-muted)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          &times;
        </button>

        {/* Header with Understated Thin-Outline Icon */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              margin: '0 auto 20px auto',
              borderRadius: '50%',
              background: callState === 'active' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(212, 103, 76, 0.06)',
              border: `1px solid ${callState === 'active' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(212, 103, 76, 0.3)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: callState === 'active' ? 'var(--accent-emerald)' : 'var(--accent-terracotta)',
              transition: 'all 0.3s ease'
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" x2="12" y1="19" y2="22"/>
            </svg>
          </div>

          {/* Heading in Fraunces Serif (Same font as Hero H1) */}
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.65rem',
              color: '#FFFFFF',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              marginBottom: '6px'
            }}
          >
            Maya &bull; AI Receptionist
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            CITY DENTAL CLINIC &bull; LIVE VOICE
          </p>
        </div>

        {/* Minimal Unboxed Status / Audio Display */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          {callState === 'idle' && (
            <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.6, maxWidth: '340px', margin: '0 auto' }}>
              Speak naturally to check real-time availability, ask about fees, or schedule your visit.
            </p>
          )}

          {callState === 'connecting' && (
            <div style={{ padding: '8px 0' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--accent-terracotta)', fontWeight: 500 }}>
                Connecting to Maya...
              </p>
            </div>
          )}

          {callState === 'active' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', height: '32px', marginBottom: '10px' }}>
                {[12, 24, 36, 20, 30, 16, 26].map((h, i) => (
                  <span
                    key={i}
                    style={{
                      width: '3px',
                      height: `${Math.max(4, Math.min(32, h * (volumeLevel > 0.1 ? 1 : 0.35)))}px`,
                      background: 'var(--accent-emerald)',
                      borderRadius: '99px',
                      transition: 'height 0.1s ease'
                    }}
                  />
                ))}
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--accent-emerald)', fontWeight: 500 }}>
                Call in progress &bull; Speak clearly into your mic
              </p>
            </div>
          )}

          {callState === 'error' && (
            <div style={{ color: '#EF4444', fontSize: '0.85rem' }}>
              <p>{errorMessage || 'Connection issue'}</p>
            </div>
          )}
        </div>

        {/* Subtle Config Box (Only shown if keys missing) */}
        {showConfig && (
          <div
            style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-hairline)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '20px'
            }}
          >
            <p style={{ fontSize: '0.78rem', color: 'var(--text-body)', marginBottom: '8px' }}>
              Enter Vapi Credentials:
            </p>
            <input
              type="text"
              placeholder="Vapi Public Key"
              value={customPublicKey}
              onChange={(e) => setCustomPublicKey(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: '6px',
                background: 'var(--bg-deep)',
                border: '1px solid var(--border-hairline)',
                color: '#FFFFFF',
                fontSize: '0.8rem',
                marginBottom: '6px'
              }}
            />
            <input
              type="text"
              placeholder="Vapi Assistant ID"
              value={customAssistantId}
              onChange={(e) => setCustomAssistantId(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: '6px',
                background: 'var(--bg-deep)',
                border: '1px solid var(--border-hairline)',
                color: '#FFFFFF',
                fontSize: '0.8rem',
                marginBottom: '10px'
              }}
            />
            <button
              onClick={handleSaveCredentials}
              className="btn-matte"
              style={{ padding: '6px 14px', fontSize: '0.78rem' }}
            >
              Save
            </button>
          </div>
        )}

        {/* Actions (Matte terracotta CTA matching Hero button) */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          {callState !== 'active' ? (
            <button
              onClick={startCall}
              disabled={callState === 'connecting'}
              className="btn-matte"
              style={{
                width: '100%',
                padding: '13px 28px',
                fontSize: '0.94rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>{callState === 'connecting' ? 'Connecting...' : 'Start Voice Call'}</span>
            </button>
          ) : (
            <>
              <button
                onClick={toggleMute}
                style={{
                  padding: '12px 18px',
                  borderRadius: '99px',
                  background: isMuted ? 'rgba(239, 68, 68, 0.15)' : 'var(--bg-subtle)',
                  border: '1px solid var(--border-hairline)',
                  color: isMuted ? '#EF4444' : '#FFFFFF',
                  cursor: 'pointer',
                  fontSize: '0.88rem',
                  fontWeight: 500
                }}
              >
                {isMuted ? 'Unmute' : 'Mute'}
              </button>

              <button
                onClick={endCall}
                style={{
                  flex: 1,
                  padding: '12px 24px',
                  borderRadius: '99px',
                  background: '#DC2626',
                  border: 'none',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                <span>End Call</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
