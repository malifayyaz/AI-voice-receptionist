'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [lastRefreshed, setLastRefreshed] = useState(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ai-voice-receptionist-0wtg.onrender.com';

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/bookings`, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
      setLastRefreshed(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
      setError(err.message || 'Unable to connect to booking backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter & search logic
  const filteredBookings = bookings.filter((item) => {
    const matchesSearch =
      (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.reason || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.date || '').toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedFilter === 'All') return matchesSearch;
    return matchesSearch && (item.reason || '').toLowerCase().includes(selectedFilter.toLowerCase());
  });

  // Calculate quick metrics
  const totalBookings = bookings.length;
  const todayStr = new Date().toISOString().split('T')[0];
  const todayBookingsCount = bookings.filter((b) => b.date === todayStr).length;

  // Most common reason
  const reasonCounts = bookings.reduce((acc, curr) => {
    const r = curr.reason || 'General';
    acc[r] = (acc[r] || 0) + 1;
    return acc;
  }, {});
  const topReason = Object.keys(reasonCounts).sort((a, b) => reasonCounts[b] - reasonCounts[a])[0] || 'Checkup';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', color: '#F8FAFC', paddingBottom: '80px' }}>
      {/* Top Header Bar */}
      <header
        style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(7, 11, 25, 0.9)',
          backdropFilter: 'blur(16px)',
          padding: '18px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              color: '#94A3B8',
              fontSize: '0.88rem',
              fontWeight: 600
            }}
          >
            &larr; Back to Clinic Site
          </Link>
          <span style={{ color: 'rgba(255, 255, 255, 0.15)' }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF' }}>
              City Dental Clinic
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                padding: '2px 8px',
                borderRadius: '6px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10B981',
                fontWeight: 700,
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}
            >
              LIVE APPOINTMENTS
            </span>
          </div>
        </div>

        {/* Refresh & Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {lastRefreshed && (
            <span style={{ fontSize: '0.78rem', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
              Updated {lastRefreshed}
            </span>
          )}
          <button
            onClick={fetchBookings}
            disabled={loading}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }}
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
              <path d="M16 21h5v-5"/>
            </svg>
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '40px auto 0 auto', padding: '0 24px' }}>
        {/* Page Title */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2.2rem', color: '#FFFFFF', fontWeight: 700, marginBottom: '6px' }}>
            Appointment Ledger
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>
            Real-time feed of patient bookings created via Maya (Voice AI) and synced directly to Google Sheets.
          </p>
        </div>

        {/* 4 Metric Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '36px'
          }}
        >
          {/* Card 1: Total Bookings */}
          <div className="glass-panel" style={{ padding: '22px 20px' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
              Total Confirmed Bookings
            </span>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-serif)' }}>
              {totalBookings}
            </div>
            <span style={{ fontSize: '0.8rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              &bull; Synced with Database
            </span>
          </div>

          {/* Card 2: Today's Bookings */}
          <div className="glass-panel" style={{ padding: '22px 20px' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
              Scheduled For Today
            </span>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#FF6559', fontFamily: 'var(--font-serif)' }}>
              {todayBookingsCount}
            </div>
            <span style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '4px', display: 'block' }}>
              {todayStr}
            </span>
          </div>

          {/* Card 3: Top Procedure */}
          <div className="glass-panel" style={{ padding: '22px 20px' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
              Top Requested Treatment
            </span>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#06B6D4', marginTop: '8px', lineHeight: 1.2 }}>
              {topReason}
            </div>
            <span style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '6px', display: 'block' }}>
              Based on live appointments
            </span>
          </div>

          {/* Card 4: Google Sheets Status */}
          <div className="glass-panel" style={{ padding: '22px 20px' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
              Google Sheets Sync
            </span>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#10B981', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }} />
              Active &amp; Connected
            </div>
            <span style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '6px', display: 'block' }}>
              Auto-sync enabled
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '24px'
          }}
        >
          {/* Search Input */}
          <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search by patient name, reason, or date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 18px 12px 40px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                fontSize: '0.92rem',
                outline: 'none'
              }}
            />
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#64748B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
            >
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" x2="16.65" y1="21" y2="16.65"/>
            </svg>
          </div>

          {/* Quick Filter Buttons */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['All', 'Checkup', 'Cleaning', 'Root Canal'].map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  background: selectedFilter === f ? '#FF6559' : 'rgba(255, 255, 255, 0.05)',
                  color: selectedFilter === f ? '#FFFFFF' : '#94A3B8',
                  borderColor: selectedFilter === f ? '#FF6559' : 'rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.2s'
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table Panel */}
        <div
          className="glass-panel"
          style={{
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          {loading && bookings.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: '#94A3B8' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '14px' }}>
                <span className="wave-bar" style={{ height: '16px' }} />
                <span className="wave-bar" style={{ height: '24px' }} />
                <span className="wave-bar" style={{ height: '14px' }} />
              </div>
              <p>Fetching live appointment ledger from server...</p>
            </div>
          ) : error ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: '#EF4444' }}>
              <p style={{ fontWeight: 600, marginBottom: '8px' }}>Failed to load appointments: {error}</p>
              <button
                onClick={fetchBookings}
                style={{
                  padding: '8px 18px',
                  borderRadius: '8px',
                  background: '#FF6559',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Retry Connection
              </button>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: '#94A3B8' }}>
              <p style={{ fontSize: '1.05rem', color: '#CBD5E1', marginBottom: '6px' }}>No bookings matching criteria</p>
              <p style={{ fontSize: '0.88rem' }}>Appointments booked with Maya will appear here instantly.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
                <thead>
                  <tr
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      color: '#64748B',
                      fontSize: '0.78rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em'
                    }}
                  >
                    <th style={{ padding: '16px 20px' }}>Patient Name</th>
                    <th style={{ padding: '16px 20px' }}>Appointment Date</th>
                    <th style={{ padding: '16px 20px' }}>Time Slot</th>
                    <th style={{ padding: '16px 20px' }}>Procedure / Reason</th>
                    <th style={{ padding: '16px 20px' }}>Booking ID</th>
                    <th style={{ padding: '16px 20px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((item, idx) => (
                    <tr
                      key={item.id || idx}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                        transition: 'background 0.15s'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      {/* Patient Name */}
                      <td style={{ padding: '18px 20px', fontWeight: 600, color: '#FFFFFF' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: 'rgba(255, 101, 89, 0.15)',
                              color: '#FF7D73',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.85rem',
                              fontWeight: 700
                            }}
                          >
                            {(item.name || 'P')[0].toUpperCase()}
                          </div>
                          <span>{item.name}</span>
                        </div>
                      </td>

                      {/* Date */}
                      <td style={{ padding: '18px 20px', color: '#E2E8F0' }}>
                        {item.date}
                      </td>

                      {/* Time */}
                      <td style={{ padding: '18px 20px', color: '#10B981', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                        {item.time}
                      </td>

                      {/* Reason */}
                      <td style={{ padding: '18px 20px' }}>
                        <span
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            background: (item.reason || '').toLowerCase().includes('root')
                              ? 'rgba(239, 68, 68, 0.15)'
                              : (item.reason || '').toLowerCase().includes('clean')
                              ? 'rgba(16, 185, 129, 0.15)'
                              : 'rgba(6, 182, 212, 0.15)',
                            color: (item.reason || '').toLowerCase().includes('root')
                              ? '#F87171'
                              : (item.reason || '').toLowerCase().includes('clean')
                              ? '#34D399'
                              : '#38BDF8',
                            fontSize: '0.82rem',
                            fontWeight: 600
                          }}
                        >
                          {item.reason || 'General Dental'}
                        </span>
                      </td>

                      {/* ID */}
                      <td style={{ padding: '18px 20px', color: '#64748B', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                        {item.id || 'N/A'}
                      </td>

                      {/* Status */}
                      <td style={{ padding: '18px 20px' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: '#10B981',
                            fontSize: '0.82rem',
                            fontWeight: 600
                          }}
                        >
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
                          Confirmed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
