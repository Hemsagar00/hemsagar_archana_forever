/* ===================================================
   SCRATCH.JS - HEMSAGAR ❤️ ARCHANA
   Tactile scratch reveal component using Pointer Events,
   throttled pixel ratio inspection, and smooth 60% auto-reveal
   =================================================== */

import { audioManager } from './audio.js';

export class ScratchCard {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { willReadFrequently: true });
    this.isDrawing = false;
    this.isRevealed = false;
    this.strokeCount = 0;
    this.lastCheckTime = 0;

    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);

    this.init();
  }

  init() {
    if (!this.canvas) return;

    this.setupCanvas();
    this.paintFoil();

    this.canvas.addEventListener('pointerdown', this.onPointerDown);
    this.canvas.addEventListener('pointermove', this.onPointerMove);
    this.canvas.addEventListener('pointerup', this.onPointerUp);
    this.canvas.addEventListener('pointercancel', this.onPointerUp);
  }

  setupCanvas() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.width = rect.width || 640;
    this.height = rect.height || 260;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(dpr, dpr);
    this.brushRadius = Math.max(22, this.width * 0.04);
  }

  paintFoil() {
    const grad = this.ctx.createLinearGradient(0, 0, this.width, this.height);
    grad.addColorStop(0, '#e2c069');
    grad.addColorStop(0.3, '#edd288');
    grad.addColorStop(0.7, '#a9873a');
    grad.addColorStop(1, '#d5ad4e');

    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Decorative foil text & Vrindavan motif
    this.ctx.save();
    this.ctx.font = '600 13px Inter, sans-serif';
    this.ctx.fillStyle = 'rgba(6, 20, 12, 0.75)';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.letterSpacing = '3px';
    this.ctx.fillText('✨ GENTLY SCRATCH TO REVEAL ✨', this.width / 2, this.height / 2);
    this.ctx.restore();
  }

  getPointerPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  onPointerDown(e) {
    if (this.isRevealed) return;
    this.isDrawing = true;
    this.canvas.setPointerCapture(e.pointerId);

    const pos = this.getPointerPos(e);
    this.scratch(pos.x, pos.y);
  }

  onPointerMove(e) {
    if (!this.isDrawing || this.isRevealed) return;

    const pos = this.getPointerPos(e);
    this.scratch(pos.x, pos.y);
    this.strokeCount++;

    // Throttled pixel ratio check every 30 strokes or 300ms
    const now = performance.now();
    if (this.strokeCount > 25 && now - this.lastCheckTime > 300) {
      this.lastCheckTime = now;
      this.strokeCount = 0;
      this.checkRevealedRatio();
    }
  }

  onPointerUp(e) {
    this.isDrawing = false;
    try {
      this.canvas.releasePointerCapture(e.pointerId);
    } catch (err) {}
    this.checkRevealedRatio();
  }

  scratch(x, y) {
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.brushRadius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  checkRevealedRatio() {
    if (this.isRevealed) return;

    // Sample a 40x40 downscaled grid to prevent costly full-res getImageData
    const sampleW = 40;
    const sampleH = 20;
    const imgData = this.ctx.getImageData(0, 0, sampleW, sampleH);
    const data = imgData.data;

    let transparentPixels = 0;
    const totalPixels = sampleW * sampleH;

    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 128) {
        transparentPixels++;
      }
    }

    const ratio = transparentPixels / totalPixels;

    // At ~60% scratched, smoothly fade the rest of the canvas
    if (ratio >= 0.55) {
      this.revealCompletely();
    }
  }

  revealCompletely() {
    this.isRevealed = true;
    this.canvas.classList.add('fade-out');
    audioManager.playChime();

    setTimeout(() => {
      this.canvas.style.display = 'none';
    }, 850);
  }
}
