/* ===================================================
   GALLERY.JS - HEMSAGAR ❤️ ARCHANA
   Editorial photo story lightbox with focus trapping,
   keyboard navigation, swipe gestures, and View Transitions
   =================================================== */

import { LOVE_STORY } from './config.js';
import { runViewTransition } from './motion.js';

export class GalleryLightbox {
  constructor() {
    this.dialog = document.getElementById('photoLightbox');
    this.lightboxImg = document.getElementById('lightboxImg');
    this.lightboxCaption = document.getElementById('lightboxCaption');
    this.closeBtn = document.getElementById('lightboxClose');
    this.prevBtn = document.getElementById('lightboxPrev');
    this.nextBtn = document.getElementById('lightboxNext');
    this.backdrop = document.getElementById('lightboxBackdrop');

    this.currentIndex = 0;
    this.items = LOVE_STORY.gallery;
    this.triggerElement = null;

    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    if (!this.dialog) return;

    // Attach click triggers to gallery cards
    const triggers = document.querySelectorAll('[data-gallery-index]');
    triggers.forEach(el => {
      el.addEventListener('click', (e) => {
        const index = parseInt(el.getAttribute('data-gallery-index'), 10);
        this.open(index, el);
      });
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const index = parseInt(el.getAttribute('data-gallery-index'), 10);
          this.open(index, el);
        }
      });
    });

    // Close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Backdrop click
    if (this.backdrop) {
      this.backdrop.addEventListener('click', () => this.close());
    }

    // Prev / Next buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.prev();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.next();
      });
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (!this.dialog.open) return;

      if (e.key === 'Escape') {
        this.close();
      } else if (e.key === 'ArrowLeft') {
        this.prev();
      } else if (e.key === 'ArrowRight') {
        this.next();
      } else if (e.key === 'Tab') {
        this.trapFocus(e);
      }
    });

    // Mobile touch swipe gestures
    this.dialog.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.dialog.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });
  }

  open(index, triggerEl = null) {
    this.currentIndex = index;
    this.triggerElement = triggerEl;

    runViewTransition(() => {
      this.updateContent();
      if (typeof this.dialog.showModal === 'function') {
        this.dialog.showModal();
      } else {
        this.dialog.setAttribute('open', '');
      }
    });

    // Focus close button on open
    setTimeout(() => {
      if (this.closeBtn) this.closeBtn.focus();
    }, 50);
  }

  close() {
    runViewTransition(() => {
      if (typeof this.dialog.close === 'function') {
        this.dialog.close();
      } else {
        this.dialog.removeAttribute('open');
      }
    });

    // Restore focus to original trigger
    if (this.triggerElement) {
      this.triggerElement.focus();
    }
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.updateContent();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.updateContent();
  }

  updateContent() {
    const item = this.items[this.currentIndex];
    if (!item) return;

    this.lightboxImg.src = item.src;
    this.lightboxImg.alt = item.alt;
    this.lightboxCaption.textContent = item.caption;
  }

  handleSwipe() {
    const swipeDistance = this.touchEndX - this.touchStartX;
    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        this.prev();
      } else {
        this.next();
      }
    }
  }

  trapFocus(e) {
    const focusable = this.dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}
