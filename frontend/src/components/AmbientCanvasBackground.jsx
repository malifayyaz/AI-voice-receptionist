'use client';

import React, { useEffect, useRef } from 'react';

/**
 * AmbientCanvasBackground:
 * Ultra-lightweight HTML5 Canvas fluid dark silk/smoke simulation.
 * Pure native Canvas 2D with smooth mathematical sine/cosine waves.
 * Zero external libraries, ~1KB footprint, GPU-accelerated.
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
      time += 0.003; // Ultra slow, meditative flow
      ctx.clearRect(0, 0, width, height);

      // Render 4 layered translucent dark silk waves
      const waveLayers = [
        { amplitude: 90, frequency: 0.0012, speed: 0.8, color: 'rgba(255, 255, 255, 0.018)', yOffset: height * 0.45 },
        { amplitude: 120, frequency: 0.0009, speed: 0.5, color: 'rgba(212, 103, 76, 0.025)', yOffset: height * 0.55 },
        { amplitude: 70, frequency: 0.0016, speed: 1.1, color: 'rgba(255, 255, 255, 0.014)', yOffset: height * 0.35 },
        { amplitude: 140, frequency: 0.0007, speed: 0.4, color: 'rgba(212, 103, 76, 0.018)', yOffset: height * 0.65 }
      ];

      for (let w = 0; w < waveLayers.length; w++) {
        const wave = waveLayers[w];
        ctx.beginPath();
        ctx.fillStyle = wave.color;

        ctx.moveTo(0, height);
        ctx.lineTo(0, wave.yOffset);

        for (let x = 0; x <= width; x += 15) {
          const y =
            wave.yOffset +
            Math.sin(x * wave.frequency + time * wave.speed + w) * wave.amplitude +
            Math.cos(x * wave.frequency * 0.6 - time * 0.4) * (wave.amplitude * 0.4);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
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
        opacity: 0.85
      }}
    />
  );
}
