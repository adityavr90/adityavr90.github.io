import { buildGraph, DOMAIN_COLORS } from './graph-data.js';

/**
 * Force-directed capability graph, Canvas 2D.
 *
 * Deliberately dependency-free: at this node count (~35) a hand-rolled
 * simulation is a few hundred bytes, where d3-force would be ~40 kB for
 * behaviour we don't need. Same reasoning that got Three.js out of site-b.
 */
export function initGraph(cv) {
  const canvas = document.getElementById('graph-canvas');
  const section = document.getElementById('map');
  const inspector = document.getElementById('inspector');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;

  let w = 0, h = 0, dpr = 1, compact = false;
  let nodes = [], links = [], adjacency = new Map();
  let hovered = null, selected = null, dragging = null;
  let alpha = 1;                    // simulation temperature
  const pointer = { x: -1e5, y: -1e5, down: false, moved: false };

  // ── Build ─────────────────────────────────────────────────────
  function build() {
    compact = w < 760;
    ({ nodes, links } = buildGraph(cv, { compact }));

    adjacency = new Map(nodes.map(n => [n.id, new Set()]));
    links.forEach(({ a, b }) => {
      adjacency.get(a).add(b);
      adjacency.get(b).add(a);
    });

    // Seed positions radially so the first settle looks intentional
    // rather than an explosion out of a single point.
    const cx = w / 2, cy = h / 2;
    const domains = nodes.filter(n => n.kind === 'domain');
    nodes.forEach((n) => {
      if (n.kind === 'root') {
        Object.assign(n, { x: cx, y: cy });
      } else if (n.kind === 'domain') {
        const i = domains.indexOf(n);
        const a = (i / domains.length) * Math.PI * 2 - Math.PI / 2;
        Object.assign(n, { x: cx + Math.cos(a) * 170, y: cy + Math.sin(a) * 170 });
      } else {
        const parent = [...adjacency.get(n.id)][0];
        const p = nodes.find(m => m.id === parent);
        const a = Math.random() * Math.PI * 2;
        Object.assign(n, { x: p.x + Math.cos(a) * 70, y: p.y + Math.sin(a) * 70 });
      }
      n.vx = 0; n.vy = 0;
    });

    alpha = 1;
    updateReadout();
  }

  // ── Simulation ────────────────────────────────────────────────
  const REST = { domain: compact ? 120 : 165, leaf: compact ? 58 : 78 };

  function simulate() {
    const cx = w / 2, cy = h / 2;
    const repel = compact ? 1400 : 2600;

    // Pairwise repulsion — O(n²), but n is ~35 so this is ~600 ops/frame
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        let dx = b.x - a.x, dy = b.y - a.y;
        let d2 = dx * dx + dy * dy;
        if (d2 < 1) { d2 = 1; dx = Math.random() - 0.5; dy = Math.random() - 0.5; }
        const f = repel / d2;
        const d = Math.sqrt(d2);
        const fx = (dx / d) * f, fy = (dy / d) * f;
        a.vx -= fx; a.vy -= fy;
        b.vx += fx; b.vy += fy;
      }
    }

    // Spring along edges
    links.forEach(({ a: ai, b: bi }) => {
      const a = nodes[ai], b = nodes[bi];
      const rest = a.kind === 'root' || b.kind === 'root' ? REST.domain : REST.leaf;
      const dx = b.x - a.x, dy = b.y - a.y;
      const d = Math.hypot(dx, dy) || 1;
      const f = (d - rest) * 0.014;
      const fx = (dx / d) * f, fy = (dy / d) * f;
      a.vx += fx; a.vy += fy;
      b.vx -= fx; b.vy -= fy;
    });

    // Weak pull to centre keeps the graph from drifting off-canvas
    nodes.forEach((n) => {
      n.vx += (cx - n.x) * (n.kind === 'root' ? 0.02 : 0.0016);
      n.vy += (cy - n.y) * (n.kind === 'root' ? 0.02 : 0.0016);
    });

    const damp = 0.86;
    const pad = 30;
    nodes.forEach((n) => {
      if (n === dragging) return;
      n.vx *= damp; n.vy *= damp;
      n.x += n.vx * alpha;
      n.y += n.vy * alpha;
      n.x = Math.max(pad, Math.min(w - pad, n.x));
      n.y = Math.max(pad, Math.min(h - pad, n.y));
    });

    // Cool to a low idle so the graph keeps breathing without jittering
    if (alpha > 0.25) alpha *= 0.994;
  }

  // ── Rendering ─────────────────────────────────────────────────
  function colorOf(n) { return DOMAIN_COLORS[n.domain]?.rgb || '0, 229, 255'; }

  function isLit(n) {
    if (selected) return n === selected || adjacency.get(selected.id).has(n.id);
    if (hovered)  return n === hovered  || adjacency.get(hovered.id).has(n.id);
    return true;
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const focusing = !!(selected || hovered);

    // Links
    links.forEach(({ a: ai, b: bi }) => {
      const a = nodes[ai], b = nodes[bi];
      const lit = focusing && isLit(a) && isLit(b);
      const base = a.kind === 'root' || b.kind === 'root' ? 0.32 : 0.16;
      const alphaL = focusing ? (lit ? 0.75 : 0.05) : base;

      ctx.strokeStyle = `rgba(${colorOf(b)}, ${alphaL})`;
      ctx.lineWidth = lit ? 1.4 : 1;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    });

    // Nodes
    nodes.forEach((n) => {
      const rgb = colorOf(n);
      const lit = !focusing || isLit(n);
      const dim = focusing && !lit;
      const isActive = n === selected || n === hovered;

      // Glow halo on the active node
      if (isActive) {
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
        g.addColorStop(0, `rgba(${rgb}, 0.28)`);
        g.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = n.kind === 'leaf'
        ? `rgba(${rgb}, ${dim ? 0.15 : 0.9})`
        : `rgba(5, 7, 13, 0.95)`;
      ctx.fill();

      if (n.kind !== 'leaf') {
        ctx.strokeStyle = `rgba(${rgb}, ${dim ? 0.2 : 1})`;
        ctx.lineWidth = n.kind === 'root' ? 2 : 1.5;
        ctx.stroke();
      }

      // Root monogram
      if (n.kind === 'root') {
        ctx.fillStyle = `rgba(${rgb}, ${dim ? 0.3 : 1})`;
        ctx.font = '700 13px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('AVR', n.x, n.y + 0.5);
      }

      // Labels: domains always, leaves only when relevant or on wide screens
      const showLabel =
        n.kind === 'domain' ||
        (n.kind === 'leaf' && !compact && (!focusing || lit));

      if (showLabel) {
        ctx.font = n.kind === 'domain'
          ? '700 9.5px "JetBrains Mono", monospace'
          : '500 10px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = n.kind === 'domain'
          ? `rgba(${rgb}, ${dim ? 0.25 : 0.95})`
          : `rgba(226, 236, 245, ${dim ? 0.12 : 0.66})`;
        if (n.kind === 'domain') ctx.letterSpacing = '0.08em';
        ctx.fillText(n.label, n.x, n.y + n.r + 7);
        ctx.letterSpacing = '0px';
      }
    });
  }

  // ── Loop ──────────────────────────────────────────────────────
  let frameId = null, visible = true;
  let fpsLast = performance.now(), fpsFrames = 0;

  function tick() {
    frameId = requestAnimationFrame(tick);
    simulate();
    draw();

    fpsFrames++;
    const now = performance.now();
    if (now - fpsLast > 1000) {
      setReadout('fps', `${fpsFrames} FPS`);
      fpsFrames = 0; fpsLast = now;
    }
  }

  const start = () => { if (frameId === null && !reduceMotion) tick(); };
  const stop  = () => { if (frameId !== null) { cancelAnimationFrame(frameId); frameId = null; } };

  // ── Hit testing & interaction ─────────────────────────────────
  function nodeAt(x, y) {
    let best = null, bestD = Infinity;
    for (const n of nodes) {
      const d = Math.hypot(n.x - x, n.y - y);
      const hit = Math.max(n.r + 10, coarse ? 22 : 14);
      if (d < hit && d < bestD) { best = n; bestD = d; }
    }
    return best;
  }

  function localPoint(e) {
    const r = canvas.getBoundingClientRect();
    const p = e.touches?.[0] || e.changedTouches?.[0] || e;
    return { x: p.clientX - r.left, y: p.clientY - r.top };
  }

  function openInspector(n) {
    selected = n;
    const rgb = colorOf(n);
    inspector.hidden = false;
    inspector.style.setProperty('--node-rgb', rgb);
    inspector.querySelector('.inspector-kicker').textContent = n.detail.kicker;
    inspector.querySelector('.inspector-title').textContent = n.detail.title;

    const body = inspector.querySelector('.inspector-body');
    body.textContent = n.detail.body || '';
    body.hidden = !n.detail.body;

    const list = inspector.querySelector('.inspector-list');
    list.innerHTML = (n.detail.list || []).map(i => `<li>${i}</li>`).join('');
    list.hidden = !(n.detail.list || []).length;

    alpha = Math.max(alpha, 0.5);   // nudge the layout so it reacts visibly
  }

  function closeInspector() {
    selected = null;
    inspector.hidden = true;
  }

  canvas.addEventListener('pointermove', (e) => {
    const { x, y } = localPoint(e);
    pointer.x = x; pointer.y = y;

    if (dragging) {
      dragging.x = x; dragging.y = y;
      dragging.vx = 0; dragging.vy = 0;
      pointer.moved = true;
      alpha = Math.max(alpha, 0.6);
      return;
    }
    const hit = nodeAt(x, y);
    if (hit !== hovered) {
      hovered = hit;
      canvas.style.cursor = hit ? 'pointer' : 'default';
    }
  });

  canvas.addEventListener('pointerdown', (e) => {
    const { x, y } = localPoint(e);
    const hit = nodeAt(x, y);
    pointer.down = true;
    pointer.moved = false;
    if (hit && !coarse) { dragging = hit; canvas.setPointerCapture(e.pointerId); }
    if (coarse) hovered = hit;
  });

  canvas.addEventListener('pointerup', (e) => {
    const { x, y } = localPoint(e);
    const hit = nodeAt(x, y);
    // A drag shouldn't also count as a click
    if (!pointer.moved) hit ? openInspector(hit) : closeInspector();
    dragging = null;
    pointer.down = false;
  });

  canvas.addEventListener('pointerleave', () => {
    hovered = null;
    dragging = null;
    canvas.style.cursor = 'default';
  });

  inspector.querySelector('.inspector-close').addEventListener('click', closeInspector);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeInspector(); });

  // ── Readout chrome ────────────────────────────────────────────
  function setReadout(key, val) {
    const el = document.querySelector(`[data-readout="${key}"]`);
    if (el) el.textContent = val;
  }
  function updateReadout() {
    setReadout('nodes', `${nodes.length} NODES`);
    setReadout('links', `${links.length} EDGES`);
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
  build();

  if (reduceMotion) {
    // Settle the layout synchronously, then render one static frame
    for (let i = 0; i < 320; i++) simulate();
    draw();
    setReadout('fps', 'STATIC');
  } else {
    start();
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else if (visible) start();
  });

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !document.hidden) start(); else stop();
  }, { threshold: 0 }).observe(section);

  let rt;
  addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      const wasCompact = compact;
      resize();
      // Only rebuild when crossing the compact threshold — otherwise
      // just re-settle, so the URL bar hiding doesn't reshuffle the graph.
      if ((w < 760) !== wasCompact) { closeInspector(); build(); }
      else alpha = Math.max(alpha, 0.5);
      if (reduceMotion) { for (let i = 0; i < 200; i++) simulate(); draw(); }
    }, 160);
  });
}
