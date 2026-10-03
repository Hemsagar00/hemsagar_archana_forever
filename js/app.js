/* ===================================================
   APP.JS - HEMSAGAR ❤️ ARCHANA
   Main application bootstrapper, lifecycle coordinator,
   lazy component initializations, and audio handling
   =================================================== */

import { LOVE_STORY } from './config.js';
import { audioManager } from './audio.js';
import { ParticleSystem } from './particles.js';
import { MotionController, runViewTransition } from './motion.js';
import { GalleryLightbox } from './gallery.js';
import { ConstellationMap } from './constellation.js';
import { ScratchCard } from './scratch.js';
import { HeartbeatSensor, initCountdown, ProposalExperience } from './proposal.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Canvas Particles
  const bgCanvas = document.getElementById('bgCanvas');
  let particleSystem = null;
  if (bgCanvas) {
    particleSystem = new ParticleSystem(bgCanvas);
  }

  // 2. Initialize Central Motion Controller (IntersectionObserver & Parallax)
  const motionController = new MotionController();

  // 3. Audio Toggle Button
  const audioToggle = document.getElementById('audioToggle');
  if (audioToggle) {
    audioToggle.addEventListener('click', () => {
      const isNowPlaying = audioManager.toggle();
      audioToggle.setAttribute('aria-pressed', isNowPlaying ? 'true' : 'false');
      audioToggle.setAttribute(
        'aria-label',
        isNowPlaying ? 'Pause romantic background music' : 'Play romantic background music'
      );
    });
  }

  // 4. Section 0: Minimal Monogram Loader
  const appLoader = document.getElementById('appLoader');
  const dismissLoader = () => {
    if (appLoader) {
      appLoader.classList.add('loaded');
      setTimeout(() => appLoader.remove(), 750);
    }
  };

  // Check if critical hero image is loaded
  const heroImg = document.getElementById('heroAvatar');
  if (heroImg && !heroImg.complete) {
    heroImg.addEventListener('load', dismissLoader);
    heroImg.addEventListener('error', dismissLoader);
    setTimeout(dismissLoader, 1800); // Safety fallback
  } else {
    setTimeout(dismissLoader, 400);
  }

  // 5. Section 1: Cinematic Entrance Screen
  const entranceScreen = document.getElementById('entranceScreen');
  const enterBtn = document.getElementById('enterBtn');

  if (enterBtn && entranceScreen) {
    enterBtn.addEventListener('click', () => {
      // User gesture initializes audio cleanly
      audioManager.playChime();
      audioManager.startAmbient();
      if (audioToggle) {
        audioToggle.setAttribute('aria-pressed', 'true');
        audioToggle.setAttribute('aria-label', 'Pause romantic background music');
      }

      runViewTransition(() => {
        entranceScreen.classList.add('dismissed');
      });

      setTimeout(() => {
        entranceScreen.style.display = 'none';
      }, 1000);
    });
  }

  // 6. Lazy-load Components when approaching viewport
  const setupLazyComponent = (selector, initFn) => {
    const el = document.querySelector(selector);
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          initFn(el);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px 0px' });

    observer.observe(el);
  };

  // Constellation Map
  setupLazyComponent('.constellation-wrapper', (container) => {
    new ConstellationMap(container);
  });

  // Scratch Reveal Card
  setupLazyComponent('#scratchCanvas', (canvas) => {
    new ScratchCard(canvas);
  });

  // Heartbeat Sensor
  setupLazyComponent('#heartbeatBtn', (btn) => {
    const bar = document.getElementById('heartbeatProgress');
    const reveal = document.getElementById('heartbeatReveal');
    new HeartbeatSensor(btn, bar, reveal);
  });

  // Gallery & Lightbox
  setupLazyComponent('.editorial-gallery', () => {
    new GalleryLightbox();
  });

  // Wedding Date Countdown
  setupLazyComponent('#weddingDateSection', (section) => {
    initCountdown(section);
  });

  // Proposal Climax Experience
  const yesBtn = document.getElementById('yesBtn');
  const hugBtn = document.getElementById('hugBtn');
  const responseBox = document.getElementById('proposalResponse');
  const darkenOverlay = document.getElementById('climaxDarken');
  const lightBloom = document.getElementById('climaxBloom');

  if (yesBtn && hugBtn) {
    new ProposalExperience({
      yesBtn,
      hugBtn,
      responseBox,
      particleSystem,
      darkenOverlay,
      lightBloom
    });
  }

  // 7. Page Visibility Listener (Pause animations & audio when tab hidden)
  document.addEventListener('visibilitychange', () => {
    const isHidden = document.hidden;
    audioManager.handleVisibilityChange(isHidden);
    if (particleSystem) particleSystem.handleVisibilityChange(isHidden);
    motionController.handleVisibilityChange(isHidden);
  });
});
