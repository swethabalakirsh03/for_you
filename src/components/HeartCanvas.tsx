import { useEffect, useRef } from 'react';

interface HeartParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeSpeed: number;
  rotation: number;
  rotSpeed: number;
  color: string;
}

export const HeartCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Deep subtle red and soft rose pink tones matching the image
    const colors = [
      'rgba(255, 77, 109, 0.4)',
      'rgba(201, 24, 74, 0.35)',
      'rgba(139, 0, 0, 0.5)',
      'rgba(255, 143, 163, 0.3)',
      'rgba(255, 215, 0, 0.25)',
    ];

    const particles: HeartParticle[] = [];

    // Helper to draw soft ambient heart
    const drawSoftHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number,
      rotation: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.globalAlpha = opacity;
      context.fillStyle = color;
      context.shadowColor = color;
      context.shadowBlur = 8;

      context.beginPath();
      const topCurveHeight = size * 0.3;
      context.moveTo(0, topCurveHeight);
      context.bezierCurveTo(-size / 2, -topCurveHeight, -size, size / 3, 0, size);
      context.bezierCurveTo(size, size / 3, size / 2, -topCurveHeight, 0, topCurveHeight);
      context.closePath();
      context.fill();
      context.restore();
    };

    // Populate initial subtle background floating hearts
    const initParticles = () => {
      const count = 35;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 16 + 10,
          speedY: -(Math.random() * 0.4 + 0.15),
          speedX: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.35 + 0.1,
          fadeSpeed: 0,
          rotation: (Math.random() - 0.5) * 0.3,
          rotSpeed: (Math.random() - 0.5) * 0.005,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    initParticles();

    // Spawn mouse trail hearts
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.6) return;
      particles.push({
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 14 + 8,
        speedY: -(Math.random() * 0.8 + 0.3),
        speedX: (Math.random() - 0.5) * 0.6,
        opacity: 0.6,
        fadeSpeed: Math.random() * 0.01 + 0.008,
        rotation: (Math.random() - 0.5) * 0.4,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.fadeSpeed > 0) {
          p.opacity -= p.fadeSpeed;
        }

        if (p.fadeSpeed === 0 && p.y < -30) {
          p.y = height + 30;
          p.x = Math.random() * width;
        }

        if (p.opacity <= 0) {
          particles.splice(i, 1);
          continue;
        }

        drawSoftHeart(ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};
