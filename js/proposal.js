/* ===================================================
   PROPOSAL.JS - HEMSAGAR ❤️ ARCHANA
   Heartbeat sensor with pointer capture, live wedding countdown,
   proposal finale climax, and warm hug interaction
   =================================================== */

import { LOVE_STORY } from './config.js';
import { audioManager } from './audio.js';
import { runViewTransition } from './motion.js';

export class HeartbeatSensor {
  constructor(btn, progressBar, revealCard) {
    this.btn = btn;
    this.progressBar = progressBar;
    this.revealCard = revealCard;

    this.holdTimer = null;
    this.pulseInterval = null;
    this.holdStartTime = 0;
    this.isCompleted = false;

    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);

    this.init();
  }

  init() {
    if (!this.btn) return;

    this.btn.addEventListener('pointerdown', this.onPointerDown);
    this.btn.addEventListener('pointerup', this.onPointerUp);
    this.btn.addEventListener('pointercancel', this.onPointerUp);
  }

  onPointerDown(e) {
    if (this.isCompleted) return;

    try {
      this.btn.setPointerCapture(e.pointerId);
    } catch (err) {}

    this.btn.classList.add('holding');
    this.holdStartTime = performance.now();
    audioManager.playHeartbeat();

    // Pulse sounds at regular intervals
    this.pulseInterval = setInterval(() => {
      audioManager.playHeartbeat();
    }, 900);

    // Progress bar animation
    const targetDuration = 2500; // 2.5s
    const updateProgress = () => {
      if (!this.btn.classList.contains('holding') || this.isCompleted) return;

      const elapsed = performance.now() - this.holdStartTime;
      const pct = Math.min(100, (elapsed / targetDuration) * 100);
      if (this.progressBar) this.progressBar.style.width = `${pct}%`;

      if (elapsed >= targetDuration) {
        this.complete();
      } else {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);
  }

  onPointerUp(e) {
    if (this.isCompleted) return;

    this.btn.classList.remove('holding');
    clearInterval(this.pulseInterval);
    if (this.progressBar) this.progressBar.style.width = '0%';

    try {
      this.btn.releasePointerCapture(e.pointerId);
    } catch (err) {}
  }

  complete() {
    this.isCompleted = true;
    this.btn.classList.remove('holding');
    clearInterval(this.pulseInterval);
    audioManager.playChime();

    if (this.revealCard) {
      this.revealCard.classList.add('revealed');
    }
  }
}

export function initCountdown(container) {
  if (!container) return;

  const dateStr = LOVE_STORY.weddingDate;
  const statusContainer = container.querySelector('.date-status-wrap');
  const countdownGrid = container.querySelector('.countdown-grid');

  if (!dateStr) {
    // Date not yet fixed: Show elegant written status
    if (statusContainer) {
      statusContainer.innerHTML = `
        <h3 class="date-status-main">Our date is still being written.</h3>
        <p class="date-status-sub">But my decision already is.</p>
      `;
    }
    if (countdownGrid) {
      countdownGrid.style.display = 'none';
    }
    return;
  }

  // Date is fixed: Show live countdown updating once per second
  const targetTime = new Date(dateStr).getTime();
  const daysEl = container.querySelector('[data-days]');
  const hoursEl = container.querySelector('[data-hours]');
  const minsEl = container.querySelector('[data-minutes]');
  const secsEl = container.querySelector('[data-seconds]');

  const update = () => {
    const now = Date.now();
    const diff = Math.max(0, targetTime - now);

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(m).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(s).padStart(2, '0');
  };

  update();
  setInterval(update, 1000); // 1 update per second, low power
}

export class ProposalExperience {
  constructor(options) {
    this.yesBtn = options.yesBtn;
    this.hugBtn = options.hugBtn;
    this.responseBox = options.responseBox;
    this.particleSystem = options.particleSystem;
    this.darkenOverlay = options.darkenOverlay;
    this.lightBloom = options.lightBloom;
    this.isCelebrated = false;

    this.init();
  }

  init() {
    if (this.yesBtn) {
      this.yesBtn.addEventListener('click', () => this.handleYes());
    }

    if (this.hugBtn) {
      this.hugBtn.addEventListener('click', () => this.handleHug());
    }
  }

  handleHug() {
    runViewTransition(() => {
      if (this.responseBox) {
        this.responseBox.innerHTML = `
          <div class="hug-card">
            <div class="hug-deal">${LOVE_STORY.proposal.hugDeal}</div>
            <div class="hug-sub">${LOVE_STORY.proposal.hugSub}</div>
          </div>
        `;
      }
    });

    audioManager.playChime();
  }

  handleYes() {
    if (this.isCelebrated) return;
    this.isCelebrated = true;

    // 1. Darken background ~300ms
    if (this.darkenOverlay) this.darkenOverlay.classList.add('active');

    setTimeout(() => {
      // 2 & 3. Gold light bloom expands
      if (this.lightBloom) this.lightBloom.classList.add('bloom');

      // 4. Play divine celebration chord
      audioManager.playCelebrationChord();

      // 5. Trigger rose petal & gold particle shower
      if (this.particleSystem) {
        this.particleSystem.triggerCelebration();
      }

      // 6. Reveal celebratory banner and couple names
      runViewTransition(() => {
        if (this.responseBox) {
          this.responseBox.innerHTML = `
            <div class="celebration-banner">
              <div class="celebration-names">${LOVE_STORY.groom} ❤️ ${LOVE_STORY.bride}</div>
              <div class="celebration-title">${LOVE_STORY.proposal.celebrationTitle}</div>
              <div class="celebration-blessing">${LOVE_STORY.proposal.blessing}</div>
            </div>
          `;
        }

        // Hide hug button and style Yes
        if (this.hugBtn) this.hugBtn.style.display = 'none';
        if (this.yesBtn) {
          this.yesBtn.innerHTML = `Eternally Yours ❤️`;
          this.yesBtn.disabled = true;
        }
      });

      // Smooth scroll to Final Keepsake after 3.2s
      setTimeout(() => {
        if (this.darkenOverlay) this.darkenOverlay.classList.remove('active');
        const keepsakeEl = document.getElementById('keepsake');
        if (keepsakeEl) {
          keepsakeEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 3400);
    }, 320);
  }
}
