import { BRANCHES, NODES, ORIGIN } from './tree-data.js';

/**
 * Constellation skill tree, Canvas 2D with pan and zoom.
 *
 * Layout is polar and deterministic: branch angle + tier radius. Hand-laid
 * rather than force-simulated, because a skill tree should look the same
 * every visit. People navigate it by remembering where things are.
 */
export function initTree() {
  const canvas = document.getElementById('tree-canvas');
  const stage = document.getElementById('stage');
  const panel = document.getElementById('node-panel');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;

  const TIER_R = [0, 150, 268, 380, 500];   // radius per tier
  // Seven branches sit 51.43° apart; a 42° sector leaves a clear gap between
  // adjacent branches so the eye can still separate them at low zoom.
  const SECTOR = 42;

  let w = 0, h = 0, dpr = 1;
  let view = { x: 0, y: 0, k: 1 };          // pan offset + zoom
  let nodes = [], edges = [];
  let hovered = null, selected = null;
  let drag = null, moved = false;
  let pinch = null;
  let t = 0;

  // ── Layout ────────────────────────────────────────────────────
  function layout() {
    nodes = [];
    edges = [];

    const origin = {
      id: 0, kind: 'origin', state: 'allocated', branch: null,
      x: 0, y: 0, r: 30,
      label: ORIGIN.label, blurb: ORIGIN.blurb, meta: ORIGIN.meta
    };
    nodes.push(origin);

    const rad = (d) => (d * Math.PI) / 180;

    NODES.forEach((n, i) => {
      const b = BRANCHES[n.branch];
      if (!b) return;
      const angle = rad(b.angle + n.off * (SECTOR / 2));
      const radius = TIER_R[n.tier] ?? TIER_R[TIER_R.length - 1];
      nodes.push({
        id: i + 1,
        ...n,
        rgb: b.rgb,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        r: n.kind === 'keystone' ? 17 : n.kind === 'notable' ? 11 : 6.5,
        pulse: Math.random() * Math.PI * 2
      });
    });

    // Link each node to the nearest node one tier in, within its branch.
    // This produces organic branching without hand-specifying every edge.
    nodes.forEach((n) => {
      if (n.kind === 'origin') return;
      const inner = nodes.filter(m =>
        m.kind === 'origin' ? n.tier === 1 : (m.branch === n.branch && m.tier === n.tier - 1)
      );
      if (!inner.length) return;
      let best = inner[0], bestD = Infinity;
      inner.forEach((m) => {
        const d = Math.hypot(m.x - n.x, m.y - n.y);
        if (d < bestD) { best = m; bestD = d; }
      });
      edges.push({ a: best.id, b: n.id });
    });

    const allocated = nodes.filter(n => n.state === 'allocated').length;
    setText('[data-hud="points"]', `${allocated} / ${nodes.length} ALLOCATED`);
    setText('[data-hud="branches"]', `${Object.keys(BRANCHES).length} BRANCHES`);
  }

  // ── Coordinate transforms ─────────────────────────────────────
  const toScreen = (x, y) => ({ x: (x + view.x) * view.k + w / 2, y: (y + view.y) * view.k + h / 2 });
  const toWorld  = (x, y) => ({ x: (x - w / 2) / view.k - view.x, y: (y - h / 2) / view.k - view.y });

  function fitToView() {
    const maxR = TIER_R[TIER_R.length - 1] + 70;
    view.k = Math.min(w, h) / (maxR * 2);
    view.k = Math.max(0.22, Math.min(view.k, 1.1));

    // On wide screens the intro copy occupies the left third, so bias the
    // tree to the right rather than letting the TEACH and OFFLINE branches
    // sit behind the text.
    view.x = w >= 1100 ? -(w * 0.13) / view.k : 0;
    view.y = 0;
  }

  // ── Rendering ─────────────────────────────────────────────────
  const byId = (id) => nodes[id];

  function related(n) {
    if (!n) return null;
    const set = new Set([n.id]);
    edges.forEach(e => {
      if (e.a === n.id) set.add(e.b);
      if (e.b === n.id) set.add(e.a);
    });
    return set;
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const focus = related(selected || hovered);

    // Branch sector labels, drawn out past the last tier
    Object.values(BRANCHES).forEach((b) => {
      const a = (b.angle * Math.PI) / 180;
      const p = toScreen(Math.cos(a) * (TIER_R[4] + 62), Math.sin(a) * (TIER_R[4] + 62));
      ctx.font = `700 ${Math.max(9, 11 * view.k)}px "JetBrains Mono", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = `rgba(${b.rgb}, ${focus ? 0.22 : 0.5})`;
      ctx.letterSpacing = '0.18em';
      ctx.fillText(b.label, p.x, p.y);
      ctx.letterSpacing = '0px';
    });

    // Edges
    edges.forEach(({ a, b }) => {
      const na = byId(a), nb = byId(b);
      const lit = focus ? (focus.has(a) && focus.has(b)) : false;
      const live = nb.state === 'allocated';
      let alpha = live ? 0.34 : 0.1;
      if (focus) alpha = lit ? 0.9 : 0.04;

      const pa = toScreen(na.x, na.y), pb = toScreen(nb.x, nb.y);
      ctx.strokeStyle = `rgba(${nb.rgb || '0, 229, 255'}, ${alpha})`;
      ctx.lineWidth = (lit ? 2 : live ? 1.3 : 1) * Math.max(0.6, view.k);
      ctx.setLineDash(nb.state === 'locked' ? [4 * view.k, 5 * view.k] : []);
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Nodes
    nodes.forEach((n) => {
      const p = toScreen(n.x, n.y);
      const rgb = n.rgb || '230, 237, 245';
      const r = n.r * view.k;
      const dim = focus && !focus.has(n.id);
      const active = n === selected || n === hovered;

      // Progress nodes breathe
      const beat = n.state === 'progress' && !reduceMotion
        ? 0.55 + Math.sin(t * 2.2 + n.pulse) * 0.45
        : 1;

      if (active || (n.state === 'progress' && !dim)) {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4.5);
        g.addColorStop(0, `rgba(${rgb}, ${active ? 0.32 : 0.16 * beat})`);
        g.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 4.5, 0, Math.PI * 2);
        ctx.fill();
      }

      const op = dim ? 0.16 : 1;
      ctx.lineWidth = Math.max(1, 1.6 * view.k);

      if (n.kind === 'keystone') {
        // Diamond
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - r); ctx.lineTo(p.x + r, p.y);
        ctx.lineTo(p.x, p.y + r); ctx.lineTo(p.x - r, p.y);
        ctx.closePath();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      }

      if (n.state === 'allocated' || n.kind === 'origin') {
        ctx.fillStyle = n.kind === 'minor' ? `rgba(${rgb}, ${0.92 * op})` : `rgba(8, 10, 18, 0.95)`;
        ctx.fill();
        if (n.kind !== 'minor') { ctx.strokeStyle = `rgba(${rgb}, ${op})`; ctx.stroke(); }
      } else if (n.state === 'progress') {
        ctx.fillStyle = `rgba(8, 10, 18, 0.9)`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${rgb}, ${(0.35 + 0.65 * beat) * op})`;
        ctx.stroke();
      } else {
        ctx.fillStyle = `rgba(8, 10, 18, 0.85)`;
        ctx.fill();
        ctx.setLineDash([3 * view.k, 3 * view.k]);
        ctx.strokeStyle = `rgba(${rgb}, ${0.3 * op})`;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      if (n.kind === 'origin') {
        ctx.fillStyle = `rgba(230, 237, 245, ${op})`;
        ctx.font = `700 ${Math.max(8, 11 * view.k)}px "JetBrains Mono", monospace`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('AVR', p.x, p.y + 0.5);
      }

      // Labels: keystones and notables always; minors only when zoomed in
      const show = n.kind === 'keystone' || n.kind === 'notable' ||
                   (view.k > 0.55 && (!focus || focus.has(n.id)));
      if (show && n.kind !== 'origin') {
        const size = n.kind === 'keystone' ? 11.5 : n.kind === 'notable' ? 10.5 : 9.5;
        ctx.font = `${n.kind === 'minor' ? 500 : 700} ${Math.max(8.5, size * Math.max(0.85, view.k))}px ${n.kind === 'minor' ? '"Space Grotesk", sans-serif' : '"JetBrains Mono", monospace'}`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        ctx.fillStyle = n.kind === 'minor'
          ? `rgba(190, 205, 222, ${(dim ? 0.12 : 0.66)})`
          : `rgba(${rgb}, ${dim ? 0.2 : 0.95})`;
        ctx.fillText(n.label, p.x, p.y + r + 7);
      }
    });
  }

  // ── Loop ──────────────────────────────────────────────────────
  let frameId = null, onScreen = true;
  function tick() {
    frameId = requestAnimationFrame(tick);
    t += 0.016;
    draw();
  }
  const start = () => { if (frameId === null && !reduceMotion) tick(); };
  const stop  = () => { if (frameId !== null) { cancelAnimationFrame(frameId); frameId = null; } };

  // ── Interaction ───────────────────────────────────────────────
  function nodeAt(sx, sy) {
    let best = null, bestD = Infinity;
    for (const n of nodes) {
      const p = toScreen(n.x, n.y);
      const d = Math.hypot(p.x - sx, p.y - sy);
      const hit = Math.max(n.r * view.k + 12, coarse ? 24 : 15);
      if (d < hit && d < bestD) { best = n; bestD = d; }
    }
    return best;
  }

  const local = (e) => {
    const r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  function openPanel(n) {
    selected = n;
    panel.hidden = false;
    panel.style.setProperty('--n-rgb', n.rgb || '230, 237, 245');
    setText('.np-kicker', n.branch ? BRANCHES[n.branch].label : 'ORIGIN', panel);
    setText('.np-title', n.label, panel);
    setText('.np-blurb', n.blurb || '', panel);
    setText('.np-meta', n.meta || '', panel);

    const badge = panel.querySelector('.np-state');
    badge.textContent = { allocated: 'Allocated', progress: 'In progress', locked: 'Not yet' }[n.state] || '';
    badge.className = `np-state ${n.state}`;
  }
  function closePanel() { selected = null; panel.hidden = true; }

  canvas.addEventListener('pointerdown', (e) => {
    const { x, y } = local(e);
    moved = false;
    // Touch: a one-finger drag must scroll the page, not pan the tree,
    // otherwise the hero traps the visitor. Panning is two-finger (below).
    if (e.pointerType !== 'touch') {
      drag = { x, y, vx: view.x, vy: view.y };
      canvas.setPointerCapture?.(e.pointerId);
    }
  });

  canvas.addEventListener('pointermove', (e) => {
    const { x, y } = local(e);
    if (drag) {
      const dx = x - drag.x, dy = y - drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
      if (moved) {
        view.x = drag.vx + dx / view.k;
        view.y = drag.vy + dy / view.k;
        canvas.style.cursor = 'grabbing';
      }
      return;
    }
    const hit = nodeAt(x, y);
    if (hit !== hovered) {
      hovered = hit;
      canvas.style.cursor = hit ? 'pointer' : 'grab';
    }
  });

  canvas.addEventListener('pointerup', (e) => {
    const { x, y } = local(e);
    if (!moved) {
      const hit = nodeAt(x, y);
      hit ? openPanel(hit) : closePanel();
    }
    drag = null;
    canvas.style.cursor = 'grab';
  });

  canvas.addEventListener('pointerleave', () => { drag = null; hovered = null; });

  // Zoom on ctrl/cmd + wheel only. A bare wheel must scroll the page. The
  // stage is a full viewport tall, so capturing every wheel event meant the
  // visitor could never scroll past the hero. Trackpad pinch arrives as a
  // wheel event with ctrlKey already set, so that keeps working natively.
  canvas.addEventListener('wheel', (e) => {
    if (!e.ctrlKey && !e.metaKey) return;      // let the page scroll
    e.preventDefault();
    zoomAt(local(e), Math.exp(-e.deltaY * 0.0012));
  }, { passive: false });

  function zoomAt({ x, y }, factor) {
    const before = toWorld(x, y);
    view.k = Math.max(0.2, Math.min(view.k * factor, 2.4));
    const after = toWorld(x, y);
    view.x += after.x - before.x;
    view.y += after.y - before.y;
  }

  // Two-finger gesture = pinch to zoom AND drag to pan, the standard
  // embedded-map pattern. One finger is left alone so it scrolls the page.
  const mid = (a, b) => {
    const r = canvas.getBoundingClientRect();
    return { x: (a.clientX + b.clientX) / 2 - r.left, y: (a.clientY + b.clientY) / 2 - r.top };
  };

  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      const [a, b] = e.touches;
      pinch = {
        d: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY),
        m: mid(a, b)
      };
      drag = null;
    }
  }, { passive: true });

  canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2 && pinch) {
      e.preventDefault();
      const [a, b] = e.touches;
      const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      const m = mid(a, b);

      zoomAt(m, d / pinch.d);                       // pinch
      view.x += (m.x - pinch.m.x) / view.k;          // pan
      view.y += (m.y - pinch.m.y) / view.k;

      pinch.d = d;
      pinch.m = m;
      moved = true;
    }
  }, { passive: false });

  canvas.addEventListener('touchend', (e) => {
    if (e.touches.length < 2) pinch = null;
  });

  // Controls
  document.querySelector('[data-zoom="in"]')?.addEventListener('click', () => zoomAt({ x: w / 2, y: h / 2 }, 1.3));
  document.querySelector('[data-zoom="out"]')?.addEventListener('click', () => zoomAt({ x: w / 2, y: h / 2 }, 1 / 1.3));
  document.querySelector('[data-zoom="reset"]')?.addEventListener('click', () => { fitToView(); closePanel(); });
  panel.querySelector('.np-close')?.addEventListener('click', closePanel);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanel(); });

  // Keyboard panning, so the tree is not mouse-only
  document.addEventListener('keydown', (e) => {
    if (document.activeElement !== canvas) return;
    const step = 60 / view.k;
    if (e.key === 'ArrowLeft')  { view.x += step; e.preventDefault(); }
    if (e.key === 'ArrowRight') { view.x -= step; e.preventDefault(); }
    if (e.key === 'ArrowUp')    { view.y += step; e.preventDefault(); }
    if (e.key === 'ArrowDown')  { view.y -= step; e.preventDefault(); }
  });

  function setText(sel, val, root = document) {
    const el = root.querySelector(sel);
    if (el) el.textContent = val;
  }

  // ── Lifecycle ─────────────────────────────────────────────────
  function resize() {
    w = canvas.clientWidth || innerWidth;
    h = canvas.clientHeight || innerHeight;
    dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resize();
  layout();
  fitToView();
  canvas.style.cursor = 'grab';

  if (reduceMotion) draw(); else start();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else if (onScreen) start();
  });

  new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    if (onScreen && !document.hidden) start(); else stop();
  }, { threshold: 0 }).observe(stage);

  let rt;
  addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => { resize(); fitToView(); if (reduceMotion) draw(); }, 150);
  });
}
