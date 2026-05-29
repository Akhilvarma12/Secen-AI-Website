import { useRef, useEffect } from 'react';

export default function ParticleGrid({ density = 50, color = 'rgba(204,255,0,0.08)' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let animationId;
    let particles = [];

    // Parse base color to extract RGB values
    const parseColor = (c) => {
      const match = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) return { r: +match[1], g: +match[2], b: +match[3] };
      return { r: 204, g: 255, b: 0 };
    };

    const rgb = parseColor(color);

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      generateParticles(rect.width, rect.height);
    };

    const generateParticles = (w, h) => {
      particles = [];
      const spacing = density;
      const cols = Math.floor(w / spacing);
      const rows = Math.floor(h / spacing);
      const maxParticles = 200;

      // Calculate step to limit particles
      let totalPossible = cols * rows;
      let step = totalPossible > maxParticles ? Math.ceil(totalPossible / maxParticles) : 1;

      let count = 0;
      for (let col = 0; col <= cols; col++) {
        for (let row = 0; row <= rows; row++) {
          count++;
          if (count % step !== 0) continue;

          particles.push({
            x: col * spacing + spacing / 2,
            y: row * spacing + spacing / 2,
            baseOpacity: 0.03 + Math.random() * 0.09, // 0.03 — 0.12
            opacity: 0.03,
            speed: 0.3 + Math.random() * 0.7, // pulse speed variance
            phase: Math.random() * Math.PI * 2, // random start phase
            radius: 1,
          });
        }
      }
    };

    const draw = (time) => {
      const rect = canvas.parentElement.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const t = time * 0.001; // convert to seconds

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // Smooth sinusoidal pulse between 0.03 and 0.12
        const pulse = (Math.sin(t * p.speed + p.phase) + 1) / 2; // 0..1
        p.opacity = 0.03 + pulse * 0.09;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${p.opacity})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    animationId = requestAnimationFrame(draw);

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [density, color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
