/* ===================================================
   PARTICLES.JS - HEMSAGAR ❤️ ARCHANA
   Centralized, pooled particle system for ambient gold dust,
   sage motes, and Level 4 celebration petals
   =================================================== */

import { MOTION_PROFILE } from './config.js';

export class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.isRunning = false;
    this.rafId = null;
    this.isCelebration = false;
    this.celebrationDecayTimer = null;
    this.speedFactor = 1.0;
    this.slowTimer = null;

    this.isMobile = window.innerWidth <= 768;
    this.maxAmbient = this.isMobile
      ? MOTION_PROFILE.mobile.particles
      : MOTION_PROFILE.desktop.particles;

    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.resize = this.resize.bind(this);
    this.loop = this.loop.bind(this);

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', this.resize, { passive: true });

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.spawnAmbientPool();
    this.start();
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.canvas.width = width * this.dpr;
    this.canvas.height = height * this.dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.ctx.scale(this.dpr, this.dpr);
    this.width = width;
    this.height = height;
    this.isMobile = width <= 768;
  }

  spawnAmbientPool() {
    this.particles = [];
    for (let i = 0; i < this.maxAmbient; i++) {
      this.particles.push(this.createAmbientParticle());
    }
  }

  createAmbientParticle() {
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      radius: Math.random() * 2.2 + 0.8,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.4 + 0.15), // gentle upward float
      alpha: Math.random() * 0.6 + 0.2,
      baseAlpha: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      color: Math.random() > 0.4 ? 'rgba(226, 192, 105, ' : 'rgba(157, 212, 183, ' // gold or sage
    };
  }

  createCelebrationParticle() {
    const isPetal = Math.random() > 0.45;
    return {
      x: Math.random() * this.width,
      y: Math.random() * -100, // spawn above screen
      radius: isPetal ? Math.random() * 6 + 4 : Math.random() * 3 + 1.5,
      vx: (Math.random() - 0.5) * 2.5,
      vy: Math.random() * 2.5 + 1.8,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.08,
      alpha: 1,
      isPetal,
      // Rose petal crimson/gold or peacock teal/temple gold
      color: isPetal
        ? (Math.random() > 0.5 ? 'rgba(226, 85, 110, ' : 'rgba(240, 190, 100, ')
        : 'rgba(247, 230, 184, '
    };
  }

  triggerCelebration() {
    this.isCelebration = true;
    const celebrationCount = this.isMobile ? 60 : 130;

    for (let i = 0; i < celebrationCount; i++) {
      this.particles.push(this.createCelebrationParticle());
    }

    if (this.celebrationDecayTimer) clearTimeout(this.celebrationDecayTimer);
    this.celebrationDecayTimer = setTimeout(() => {
      this.isCelebration = false;
    }, 6000);
  }

  slowDown(durationMs = 2800) {
    this.speedFactor = 0.25;
    if (this.slowTimer) clearTimeout(this.slowTimer);
    this.slowTimer = setTimeout(() => {
      this.speedFactor = 1.0;
    }, durationMs);
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.rafId = requestAnimationFrame(this.loop);
    }
  }

  stop() {
    if (this.isRunning) {
      this.isRunning = false;
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
    }
  }

  loop(timestamp) {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.x += p.vx * this.speedFactor;
      p.y += p.vy * this.speedFactor;

      if (p.isPetal) {
        p.rotation += p.vRot;
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);
        this.ctx.beginPath();
        this.ctx.fillStyle = `${p.color}${p.alpha})`;
        this.ctx.ellipse(0, 0, p.radius, p.radius * 0.55, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();

        // Remove if fallen below screen
        if (p.y > this.height + 50) {
          if (this.isCelebration) {
            p.y = -20;
            p.x = Math.random() * this.width;
          } else {
            this.particles.splice(i, 1);
          }
        }
      } else {
        // Ambient dust / motes
        p.alpha = p.baseAlpha + Math.sin(timestamp * p.pulseSpeed) * 0.2;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `${p.color}${Math.max(0, Math.min(1, p.alpha))})`;
        this.ctx.fill();

        // Wrap around borders
        if (p.y < -10) p.y = this.height + 10;
        if (p.x < -10) p.x = this.width + 10;
        if (p.x > this.width + 10) p.x = -10;
      }
    }

    this.rafId = requestAnimationFrame(this.loop);
  }

  handleVisibilityChange(isHidden) {
    if (isHidden) {
      this.stop();
    } else {
      this.start();
    }
  }
}
