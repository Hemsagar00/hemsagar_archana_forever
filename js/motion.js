/* ===================================================
   MOTION.JS - HEMSAGAR ❤️ ARCHANA
   Centralized Motion Controller for Parallax, View Transitions,
   and IntersectionObserver scroll reveals
   =================================================== */

import { MOTION_PROFILE } from './config.js';

export function runViewTransition(callback) {
  if (
    document.startViewTransition &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    document.startViewTransition(callback);
  } else {
    callback();
  }
}

export class MotionController {
  constructor(options = {}) {
    this.audioManager = options.audioManager || null;
    this.particleSystem = options.particleSystem || null;
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isMobile = window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches;
    this.maxParallax = this.isMobile
      ? MOTION_PROFILE.mobile.parallax
      : MOTION_PROFILE.desktop.parallax;

    this.parallaxTargets = [];
    this.rafId = null;
    this.isPaused = false;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.loop = this.loop.bind(this);

    this.init();
  }

  init() {
    this.setupIntersectionObserver();

    // Desktop mouse parallax only if motion allowed
    if (!this.isReduced && !this.isMobile && this.maxParallax > 0) {
      this.parallaxTargets = document.querySelectorAll('[data-parallax]');
      window.addEventListener('mousemove', this.onMouseMove, { passive: true });
      this.rafId = requestAnimationFrame(this.loop);
    }
  }

  setupIntersectionObserver() {
    if (this.isReduced) {
      // Immediately reveal all items if user prefers reduced motion
      document.querySelectorAll(
        '.reveal-item, .letter-paragraph, .promise-phrase, .portrait-left, .portrait-right, .split-bridge'
      ).forEach(el => {
        el.classList.add('revealed');
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');

          // Special handling for the main promise paragraph
          if (entry.target.classList.contains('promise-main-paragraph')) {
            const letterSec = document.getElementById('letter');
            if (letterSec) letterSec.classList.add('promise-focused');

            // Stagger reveal each phrase
            const phrases = entry.target.querySelectorAll('.promise-phrase');
            phrases.forEach((phrase, idx) => {
              setTimeout(() => {
                phrase.classList.add('revealed');
              }, idx * 160);
            });

            // Slow down background particles gently
            if (this.particleSystem) {
              this.particleSystem.slowDown(3600);
            }
          }

          // Special handling for the second promise line (isolated vow)
          if (entry.target.classList.contains('promise-vow-container')) {
            const glow = entry.target.querySelector('.promise-vow-glow');
            if (glow) {
              glow.classList.add('active');
              setTimeout(() => {
                glow.classList.remove('active');
              }, 2800);
            }

            // Micro-interaction: ambient music slightly softer for 2-3s
            if (this.audioManager) {
              this.audioManager.softenAmbient(2800);
            }

            // Background particles slow down for 2-3s
            if (this.particleSystem) {
              this.particleSystem.slowDown(2800);
            }
          }

          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.15
    });

    const elementsToReveal = document.querySelectorAll(
      '.reveal-item, .letter-paragraph, .promise-main-paragraph, .promise-vow-container, .portrait-left, .portrait-right, .split-bridge, .timeline-item, .promise-card'
    );

    elementsToReveal.forEach(el => observer.observe(el));
  }

  onMouseMove(e) {
    const halfW = window.innerWidth / 2;
    const halfH = window.innerHeight / 2;
    this.mouse.targetX = (e.clientX - halfW) / halfW;
    this.mouse.targetY = (e.clientY - halfH) / halfH;
  }

  loop() {
    if (this.isPaused) return;

    // Smooth lerp
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

    if (this.parallaxTargets.length > 0) {
      this.parallaxTargets.forEach(el => {
        const factor = parseFloat(el.getAttribute('data-parallax') || 1);
        const moveX = this.mouse.x * this.maxParallax * factor;
        const moveY = this.mouse.y * this.maxParallax * factor;
        el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    }

    this.rafId = requestAnimationFrame(this.loop);
  }

  handleVisibilityChange(isHidden) {
    this.isPaused = isHidden;
    if (!isHidden && !this.isReduced && !this.isMobile) {
      this.rafId = requestAnimationFrame(this.loop);
    }
  }
}
