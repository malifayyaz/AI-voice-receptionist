'use client';

import React, { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';

export default function VapiVoiceWidget({ isOpen, onClose }) {
  const [callState, setCallState] = useState('idle'); // idle | connecting | active | error
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [customPublicKey, setCustomPublicKey] = useState('');
  const [customAssistantId, setCustomAssistantId] = useState('');
  const [showConfig, setShowConfig] = useState(false);

  const vapiRef = useRef(null);

  const publicKey = customPublicKey || process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || '';
  const assistantId = customAssistantId || process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || '';

  // Initialize Vapi SDK
  useEffect(() => {
    if (publicKey) {
      try {
        const vapi = new Vapi(publicKey);
        vapiRef.current = vapi;

        vapi.on('call-start', () => {
          setCallState('active');
          setErrorMessage('');
        });

        vapi.on('call-end', () => {
          setCallState('idle');
          setVolumeLevel(0);
        });

        vapi.on('speech-start', () => {
          setVolumeLevel(0.8);
        });

        vapi.on('speech-end', () => {
          setVolumeLevel(0.1);
        });

        vapi.on('volume-level', (vol) => {
          setVolumeLevel(vol || 0);
        });

        vapi.on('message', (msg) => {
          if (msg.type === 'transcript') {
            setTranscript((prev) => [
              ...prev.slice(-6),
              { role: msg.role, text: msg.transcript }
            ]);
          }
        });

        vapi.on('error', (err) => {
          console.error('Vapi Error:', err);
          setErrorMessage(err?.message || 'Connection issue with Vapi voice service.');
          setCallState('error');
        });

        return () => {
          vapi.stop();
        };
      } catch (err) {
        console.error('Failed to init Vapi client:', err);
      }
    }
  }, [publicKey]);

  const startCall = async () => {
    if (!publicKey || !assistantId) {
      setShowConfig(true);
      return;
    }

    try {
      setCallState('connecting');
      setErrorMessage('');
      setTranscript([]);

      if (!vapiRef.current) {
        vapiRef.current = new Vapi(publicKey);
      }

      await vapiRef.current.start(assistantId);
    } catch (err) {
      console.error('Start call error:', err);
      setErrorMessage(err?.message || 'Failed to connect to voice assistant.');
      setCallState('error');
    }
  };

  const endCall = () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
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
        background: 'rgba(5, 8, 20, 0.82)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && callState !== 'active') {
          onClose();
        }
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '36px 28px',
          position: 'relative',
          background: '#0D152D',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.8)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            if (callState === 'active') endCall();
            onClose();
          }}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#94A3B8',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.1rem'
          }}
        >
          &times;
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 16px auto',
              borderRadius: '50%',
              background: callState === 'active' 
                ? 'linear-gradient(135deg, #10B981, #06B6D4)' 
                : 'linear-gradient(135deg, #FF6559, #F59E0B)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: callState === 'active'
                ? '0 0 30px rgba(16, 185, 129, 0.5)'
                : '0 0 25px rgba(255, 101, 89, 0.4)',
              transition: 'all 0.3s ease'
            }}
          >
            {/* Mic / Voice Waves */}
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" x2="12" y1="19" y2="22"/>
            </svg>
          </div>

          <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', fontWeight: 700, marginBottom: '4px' }}>
            Maya &bull; AI Receptionist
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#94A3B8' }}>
            City Dental Clinic &bull; Live Voice Booking
          </p>
        </div>

        {/* Live Audio Visualizer / Status */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '20px',
            textAlign: 'center',
            marginBottom: '28px'
          }}
        >
          {callState === 'idle' && (
            <div>
              <p style={{ fontSize: '0.92rem', color: '#CBD5E1', marginBottom: '8px' }}>
                Ready to speak with you. Ask about availability, procedures, or book your visit.
              </p>
              <span style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 600 }}>
                &bull; Online &bull; Direct Browser Audio
              </span>
            </div>
          )}

          {callState === 'connecting' && (
            <div style={{ padding: '10px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginBottom: '12px' }}>
                <span className="wave-bar" style={{ height: '18px' }} />
                <span className="wave-bar" style={{ height: '26px' }} />
                <span className="wave-bar" style={{ height: '14px' }} />
                <span className="wave-bar" style={{ height: '22px' }} />
                <span className="wave-bar" style={{ height: '10px' }} />
              </div>
              <p style={{ fontSize: '0.92rem', color: '#FF7D73', fontWeight: 600 }}>
                Connecting to Maya...
              </p>
            </div>
          )}

          {callState === 'active' && (
            <div>
              {/* Dynamic waveform based on audio activity */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', height: '36px', marginBottom: '12px' }}>
                {[14, 28, 40, 24, 34, 18, 30].map((h, i) => (
                  <span
                    key={i}
                    style={{
                      width: '4px',
                      height: `${Math.max(6, Math.min(36, h * (volumeLevel > 0.1 ? 1 : 0.3)))}px`,
                      background: '#10B981',
                      borderRadius: '99px',
                      transition: 'height 0.1s ease'
                    }}
                  />
                ))}
              </div>
              <p style={{ fontSize: '0.92rem', color: '#10B981', fontWeight: 700 }}>
                Call in progress &bull; Speak clearly into your mic
              </p>
            </div>
          )}

          {callState === 'error' && (
            <div style={{ color: '#EF4444', fontSize: '0.88rem' }}>
              <p style={{ fontWeight: 600, marginBottom: '6px' }}>{errorMessage || 'Connection Error'}</p>
              <button
                onClick={() => setShowConfig(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#FF6559',
                  textDecoration: 'underline',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                Configure Vapi Keys
              </button>
            </div>
          )}
        </div>

        {/* Configuration Modal (if keys missing) */}
        {showConfig && (
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '20px'
            }}
          >
            <p style={{ fontSize: '0.8rem', color: '#CBD5E1', marginBottom: '10px', fontWeight: 600 }}>
              Enter your Vapi credentials (found in Vapi dashboard):
            </p>
            <input
              type="text"
              placeholder="Vapi Public Key (e.g. 255cdadf-...)"
              value={customPublicKey}
              onChange={(e) => setCustomPublicKey(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '8px',
                background: '#070B19',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                fontSize: '0.82rem',
                marginBottom: '8px'
              }}
            />
            <input
              type="text"
              placeholder="Vapi Assistant ID (e.g. 17e9...)"
              value={customAssistantId}
              onChange={(e) => setCustomAssistantId(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '8px',
                background: '#070B19',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                fontSize: '0.82rem',
                marginBottom: '10px'
              }}
            />
            <button
              onClick={() => setShowConfig(false)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                background: '#10B981',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Save Credentials
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {callState !== 'active' ? (
            <button
              onClick={startCall}
              disabled={callState === 'connecting'}
              className="btn-pulse-glow"
              style={{
                flex: 1,
                padding: '16px',
                borderRadius: '14px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              {callState === 'connecting' ? 'Connecting...' : 'Start Voice Call'}
            </button>
          ) : (
            <>
              <button
                onClick={toggleMute}
                style={{
                  padding: '14px 18px',
                  borderRadius: '14px',
                  background: isMuted ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: isMuted ? '#EF4444' : '#FFFFFF',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {isMuted ? 'Unmute' : 'Mute'}
              </button>

              <button
                onClick={endCall}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '14px',
                  background: '#EF4444',
                  border: 'none',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" x2="6" y1="6" y2="18"/>
                  <line x1="6" x2="18" y1="6" y2="18"/>
                </svg>
                End Call
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
