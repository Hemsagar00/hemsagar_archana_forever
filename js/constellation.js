/* ===================================================
   CONSTELLATION.JS - HEMSAGAR ❤️ ARCHANA
   Interactive 5-node star constellation with stateful activeNode tracking,
   ripple effect, line glow, and dedicated audio notes on change only
   =================================================== */

import { LOVE_STORY } from './config.js';
import { audioManager } from './audio.js';

export class ConstellationMap {
  constructor(container) {
    this.container = container;
    this.svg = container.querySelector('.constellation-svg');
    this.nodesContainer = container.querySelector('.constellation-sky');
    this.infoTitle = container.querySelector('.constellation-node-title');
    this.infoDesc = container.querySelector('.constellation-node-desc');

    this.nodes = LOVE_STORY.constellation.nodes;
    this.activeNodeId = null;
    this.nodeElements = new Map();
    this.lineElements = [];

    this.init();
  }

  init() {
    if (!this.container || !this.svg || !this.nodesContainer) return;

    this.renderLines();
    this.renderNodes();

    // Default select first node without playing audio on initial render
    if (this.nodes.length > 0) {
      this.selectNode(this.nodes[0].id, false);
    }
  }

  renderLines() {
    this.svg.innerHTML = '';
    this.lineElements = [];

    for (let i = 0; i < this.nodes.length - 1; i++) {
      const n1 = this.nodes[i];
      const n2 = this.nodes[i + 1];

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', `${n1.x}%`);
      line.setAttribute('y1', `${n1.y}%`);
      line.setAttribute('x2', `${n2.x}%`);
      line.setAttribute('y2', `${n2.y}%`);
      line.classList.add('constellation-line');
      line.dataset.from = n1.id;
      line.dataset.to = n2.id;

      this.svg.appendChild(line);
      this.lineElements.push(line);
    }
  }

  renderNodes() {
    this.nodes.forEach(node => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'constellation-node';
      btn.style.left = `${node.x}%`;
      btn.style.top = `${node.y}%`;
      btn.setAttribute('aria-label', `Constellation star: ${node.title}`);
      btn.dataset.id = node.id;

      btn.innerHTML = `
        <div class="node-halo"></div>
        <div class="node-dot"></div>
      `;

      // Hover / focus event (only triggers if activeNode changes)
      btn.addEventListener('mouseenter', () => this.selectNode(node.id, true));
      btn.addEventListener('focus', () => this.selectNode(node.id, true));
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.selectNode(node.id, true);
        this.spawnRipple(btn);
      });

      this.nodesContainer.appendChild(btn);
      this.nodeElements.set(node.id, btn);
    });
  }

  selectNode(id, playSound = true) {
    if (this.activeNodeId === id) return; // Prevent repeated triggers

    this.activeNodeId = id;
    const node = this.nodes.find(n => n.id === id);
    if (!node) return;

    // Update active classes on buttons
    this.nodeElements.forEach((btn, btnId) => {
      if (btnId === id) {
        btn.classList.add('active');
        btn.setAttribute('aria-current', 'true');
      } else {
        btn.classList.remove('active');
        btn.removeAttribute('aria-current');
      }
    });

    // Update lines glow
    this.lineElements.forEach(line => {
      if (line.dataset.from === id || line.dataset.to === id) {
        line.classList.add('active');
      } else {
        line.classList.remove('active');
      }
    });

    // Update info text
    if (this.infoTitle && this.infoDesc) {
      this.infoTitle.textContent = node.title;
      this.infoDesc.textContent = node.desc;
    }

    // Play soft single note only on node transition
    if (playSound) {
      audioManager.playConstellationNote(node.freq);
    }
  }

  spawnRipple(buttonEl) {
    const ripple = document.createElement('div');
    ripple.className = 'constellation-ripple';
    buttonEl.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 800);
  }
}
