import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = -Math.random() * 0.8 - 0.2;
        this.size = Math.random() * 2 + 0.5;
        this.life = 1;
        this.decay = Math.random() * 0.003 + 0.001;
        // Alternate between red and gold
        this.color = Math.random() > 0.5 ? '#CC0000' : '#FFD700';
        this.alpha = Math.random() * 0.6 + 0.2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        if (this.life <= 0 || this.y < -10) this.reset();
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.life * this.alpha;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < 80; i++) {
      particles.push(new Particle());
    }

    // Lightning bolt sparks
    class Spark {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.segments = [];
        this.life = 1;
        this.decay = 0.05 + Math.random() * 0.05;
        this.generateSegments();
      }
      generateSegments() {
        let x = this.x, y = this.y;
        const len = Math.random() * 60 + 20;
        for (let i = 0; i < 6; i++) {
          const nx = x + (Math.random() - 0.5) * 30;
          const ny = y + (Math.random() * len / 6);
          this.segments.push({ x, y, nx, ny });
          x = nx; y = ny;
        }
      }
      update() {
        this.life -= this.decay;
        if (this.life <= 0) this.reset();
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.life * 0.4;
        ctx.strokeStyle = '#FFD700';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#FFD700';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        this.segments.forEach((s, i) => {
          if (i === 0) ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.nx, s.ny);
        });
        ctx.stroke();
        ctx.restore();
      }
    }

    const sparks = Array.from({ length: 5 }, () => new Spark());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      sparks.forEach(s => { s.update(); s.draw(); });
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default ParticleBackground;
