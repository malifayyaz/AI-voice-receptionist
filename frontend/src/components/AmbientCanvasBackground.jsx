'use client';

import React, { useEffect, useRef } from 'react';

/**
 * AmbientCanvasBackground:
 * Luminous dark liquid-silk / smoke simulation.
 * Enhanced wave geometry with subtle gradient fills and illuminated crest lines.
 */
export default function AmbientCanvasBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 0.003; // Exact same slow, meditative cadence
      ctx.clearRect(0, 0, width, height);

      // 4 Layered liquid-silk waves with illuminated crests
      const waveLayers = [
        {
          amplitude: 85,
          frequency: 0.0013,
          speed: 0.8,
          strokeColor: 'rgba(255, 255, 255, 0.12)',
          gradientTop: 'rgba(255, 255, 255, 0.06)',
          gradientBottom: 'rgba(255, 255, 255, 0.005)',
          yOffset: height * 0.42
        },
        {
          amplitude: 110,
          frequency: 0.0009,
          speed: 0.5,
          strokeColor: 'rgba(212, 103, 76, 0.15)',
          gradientTop: 'rgba(212, 103, 76, 0.08)',
          gradientBottom: 'rgba(212, 103, 76, 0.01)',
          yOffset: height * 0.54
        },
        {
          amplitude: 70,
          frequency: 0.0016,
          speed: 1.0,
          strokeColor: 'rgba(255, 255, 255, 0.09)',
          gradientTop: 'rgba(255, 255, 255, 0.045)',
          gradientBottom: 'rgba(255, 255, 255, 0.002)',
          yOffset: height * 0.36
        },
        {
          amplitude: 130,
          frequency: 0.0007,
          speed: 0.4,
          strokeColor: 'rgba(212, 103, 76, 0.12)',
          gradientTop: 'rgba(212, 103, 76, 0.06)',
          gradientBottom: 'rgba(7, 7, 9, 0)',
          yOffset: height * 0.65
        }
      ];

      for (let w = 0; w < waveLayers.length; w++) {
        const wave = waveLayers[w];

        // Create vertical gradient for the wave body
        const grad = ctx.createLinearGradient(0, wave.yOffset - wave.amplitude, 0, height);
        grad.addColorStop(0, wave.gradientTop);
        grad.addColorStop(1, wave.gradientBottom);

        ctx.beginPath();
        ctx.fillStyle = grad;

        ctx.moveTo(0, height);
        ctx.lineTo(0, wave.yOffset);

        // Plot smooth sine wave path
        for (let x = 0; x <= width; x += 12) {
          const y =
            wave.yOffset +
            Math.sin(x * wave.frequency + time * wave.speed + w * 1.5) * wave.amplitude +
            Math.cos(x * wave.frequency * 0.5 - time * 0.35) * (wave.amplitude * 0.35);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();

        // Draw luminous crest line along the top of the wave
        ctx.beginPath();
        ctx.strokeStyle = wave.strokeColor;
        ctx.lineWidth = 1.2;
        ctx.moveTo(0, wave.yOffset);

        for (let x = 0; x <= width; x += 12) {
          const y =
            wave.yOffset +
            Math.sin(x * wave.frequency + time * wave.speed + w * 1.5) * wave.amplitude +
            Math.cos(x * wave.frequency * 0.5 - time * 0.35) * (wave.amplitude * 0.35);
          ctx.lineTo(x, y);
        }

        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 1
      }}
    />
  );
}
