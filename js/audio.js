/* ===================================================
   AUDIO.JS - HEMSAGAR ❤️ ARCHANA
   Centralized Web Audio synthesizer for ambient Krishna flute,
   chimes, heartbeat resonance, and celebration harmonies
   =================================================== */

class AudioManager {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.ambientGain = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.fluteTimer = null;

    // Raag Bhupali Pentatonic Scale (Sa, Re, Ga, Pa, Dha in D)
    // Evokes devotion, peace, and sacred Indian classical tranquility
    this.scale = [293.66, 329.63, 369.99, 440.00, 493.88, 587.33, 659.25, 739.99];
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return false;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return true;
  }

  startAmbient() {
    if (!this.ensureContext()) return;
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.scheduleNextBansuriNote();
  }

  pauseAmbient() {
    this.isPlaying = false;
    if (this.fluteTimer) {
      clearTimeout(this.fluteTimer);
      this.fluteTimer = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.pauseAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }

  scheduleNextBansuriNote() {
    if (!this.isPlaying || !this.ctx) return;

    const delay = Math.random() * 2200 + 1600; // gentle breathing intervals
    this.fluteTimer = setTimeout(() => {
      if (!this.isPlaying) return;
      this.playFluteNote();
      this.scheduleNextBansuriNote();
    }, delay);
  }

  playFluteNote() {
    if (!this.ctx || this.ctx.state === 'suspended') return;

    const now = this.ctx.currentTime;
    const freq = this.scale[Math.floor(Math.random() * this.scale.length)];

    // Primary Flute Tone (Sine with mild triangle warmth)
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Subtle breath vibrato
    const vibrato = this.ctx.createOscillator();
    vibrato.frequency.setValueAtTime(5.2, now);
    const vibratoGain = this.ctx.createGain();
    vibratoGain.gain.setValueAtTime(2.5, now);
    vibrato.connect(osc.frequency);

    // Warm envelope
    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.12, now + 0.4); // soft attack
    env.gain.exponentialRampToValueAtTime(0.0001, now + 2.8); // lingering decay

    // Filter to soften any harsh high frequencies
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);

    osc.connect(filter);
    filter.connect(env);
    env.connect(this.ambientGain);

    vibrato.start(now);
    osc.start(now);

    vibrato.stop(now + 2.9);
    osc.stop(now + 2.9);

    // Clean disconnects
    setTimeout(() => {
      try {
        osc.disconnect();
        vibrato.disconnect();
        vibratoGain.disconnect();
        filter.disconnect();
        env.disconnect();
      } catch (e) {}
    }, 3100);
  }

  playChime() {
    if (!this.ensureContext()) return;
    const now = this.ctx.currentTime;

    [587.33, 880.00, 1174.66].forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.1);

      gain.gain.setValueAtTime(0, now + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.1, now + i * 0.1 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.1 + 2.4);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 2.5);

      setTimeout(() => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch (e) {}
      }, 2700);
    });
  }

  playConstellationNote(freq = 440) {
    if (!this.ensureContext()) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 1.3);

    setTimeout(() => {
      try {
        osc.disconnect();
        gain.disconnect();
      } catch (e) {}
    }, 1400);
  }

  playHeartbeat() {
    if (!this.ensureContext()) return;
    const now = this.ctx.currentTime;

    // Deep chest resonant pulse (48Hz -> 36Hz)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(52, now);
    osc.frequency.exponentialRampToValueAtTime(38, now + 0.22);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.26);

    setTimeout(() => {
      try {
        osc.disconnect();
        gain.disconnect();
      } catch (e) {}
    }, 300);
  }

  playCelebrationChord() {
    if (!this.ensureContext()) return;
    const now = this.ctx.currentTime;

    // Rich D Major Chord with shimmers: D4, F#4, A4, D5, F#5
    const chord = [293.66, 369.99, 440.00, 587.33, 739.99];

    chord.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.08 + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 4.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 4.8);

      setTimeout(() => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch (e) {}
      }, 5000);
    });
  }

  handleVisibilityChange(isHidden) {
    if (isHidden) {
      if (this.ctx && this.ctx.state === 'running') {
        this.ctx.suspend();
      }
    } else {
      if (this.isPlaying && this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }
  }
}

export const audioManager = new AudioManager();
