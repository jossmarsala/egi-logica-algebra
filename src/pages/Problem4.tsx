import React from 'react'
import ProblemPage from '../components/ProblemPage/ProblemPage'

const ACCENT = 'var(--accent-yellow)'
const ACCENT_HEX = '#F5E642'

// ─── Shared keyframes ─────────────────────────────────────────────────────────
const KEYFRAMES = `
  @keyframes fadeSlideUp    { from { opacity:0; transform:translateY(14px);  } to { opacity:1; transform:translateY(0);  } }
  @keyframes fadeSlideRight { from { opacity:0; transform:translateX(-14px); } to { opacity:1; transform:translateX(0);  } }
  @keyframes drawLine       { from { stroke-dashoffset:1200; } to { stroke-dashoffset:0; } }
  @keyframes popIn          { from { transform:scale(0.6); opacity:0; } to { transform:scale(1); opacity:1; } }
  @keyframes pulseGlow      { 0%,100%{opacity:0.4} 50%{opacity:1} }
  @keyframes softBreathe    { 0%,100%{opacity:0.15} 50%{opacity:0.4} }

  .fsu-1 { opacity:0; animation:fadeSlideUp    0.7s ease forwards 0.15s; }
  .fsu-2 { opacity:0; animation:fadeSlideUp    0.7s ease forwards 0.4s;  }
  .fsu-3 { opacity:0; animation:fadeSlideUp    0.7s ease forwards 0.65s; }
  .fsu-4 { opacity:0; animation:fadeSlideUp    0.7s ease forwards 0.9s;  }
  .fsr-1 { opacity:0; animation:fadeSlideRight 0.7s ease forwards 0.2s;  }
  .fsr-2 { opacity:0; animation:fadeSlideRight 0.7s ease forwards 0.5s;  }
  .pop-1 { opacity:0; animation:popIn          0.5s cubic-bezier(.175,.885,.32,1.275) forwards 0.3s;  }
  .pop-2 { opacity:0; animation:popIn          0.5s cubic-bezier(.175,.885,.32,1.275) forwards 0.6s;  }
  .pop-3 { opacity:0; animation:popIn          0.5s cubic-bezier(.175,.885,.32,1.275) forwards 0.9s;  }
  .pop-4 { opacity:0; animation:popIn          0.5s cubic-bezier(.175,.885,.32,1.275) forwards 1.2s;  }
  .dl-1  { stroke-dasharray:1200; stroke-dashoffset:1200; animation:drawLine 1.2s ease forwards 0.3s; }
  .dl-2  { stroke-dasharray:1200; stroke-dashoffset:1200; animation:drawLine 1.2s ease forwards 0.6s; }
  .dl-3  { stroke-dasharray:1200; stroke-dashoffset:1200; animation:drawLine 1.2s ease forwards 0.9s; }
  .pg    { animation:pulseGlow 2.4s ease-in-out infinite; }
  .breathe-glow { animation:softBreathe 3s ease-in-out infinite; }
`

// ─── Step A — k-promising vectors as nodes ────────────────────────────────────
function VizA() {
  // Show a tree of partial configurations k=0..3
  const nodeRadius = 18
  const nodes = [
    // k=0 (root)
    { id: 'root', x: 400, y: 50, label: '()', k: 0, cls: 'pop-1' },
    // k=1
    { id: 'n10', x: 130, y: 150, label: '(1)', k: 1, cls: 'pop-2' },
    { id: 'n13', x: 250, y: 150, label: '(3)', k: 1, cls: 'pop-2' },
    { id: 'n15', x: 370, y: 150, label: '(5)', k: 1, cls: 'pop-2' },
    { id: 'n17', x: 490, y: 150, label: '(7)', k: 1, cls: 'pop-2' },
    { id: 'n18', x: 600, y: 150, label: '…', k: 1, cls: 'pop-2' },
    // k=2
    { id: 'n133', x: 130, y: 270, label: '(1,3)', k: 2, cls: 'pop-3' },
    { id: 'n135', x: 255, y: 270, label: '(1,5)', k: 2, cls: 'pop-3' },
    { id: 'n137', x: 380, y: 270, label: '(1,7)', k: 2, cls: 'pop-3' },
    { id: 'n1x', x: 505, y: 270, label: '…', k: 2, cls: 'pop-3' },
    // k=3
    { id: 'n1352', x: 130, y: 350, label: '(1,3,5)', k: 3, cls: 'pop-4' },
    { id: 'n1357', x: 275, y: 350, label: '(1,3,7)', k: 3, cls: 'pop-4' },
    { id: 'n13x', x: 410, y: 350, label: '…', k: 3, cls: 'pop-4' },
  ]

  const edges = [
    // root → k1
    { x1: 400, y1: 68, x2: 130, y2: 132 },
    { x1: 400, y1: 68, x2: 250, y2: 132 },
    { x1: 400, y1: 68, x2: 370, y2: 132 },
    { x1: 400, y1: 68, x2: 490, y2: 132 },
    { x1: 400, y1: 68, x2: 600, y2: 132 },
    // k1(1) → k2
    { x1: 130, y1: 168, x2: 130, y2: 252 },
    { x1: 130, y1: 168, x2: 255, y2: 252 },
    { x1: 130, y1: 168, x2: 380, y2: 252 },
    { x1: 130, y1: 168, x2: 505, y2: 252 },
    // k2(1,3) → k3
    { x1: 130, y1: 288, x2: 130, y2: 332 },
    { x1: 130, y1: 288, x2: 275, y2: 332 },
    { x1: 130, y1: 288, x2: 410, y2: 332 },
  ]

  const kColors: Record<number, string> = {
    0: ACCENT_HEX,
    1: '#69b6dd',
    2: '#e0a0ff',
    3: '#ff9f67',
  }

  return (
    <svg viewBox="0 0 840 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <defs><style>{KEYFRAMES}</style></defs>

      {/* Edges */}
      {edges.map((e, i) => (
        <line key={i} className={`dl-${Math.min(3, Math.floor(i / 4) + 1)}`}
          x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
          stroke="#333" strokeWidth="1"
        />
      ))}

      {/* Nodes */}
      {nodes.map(n => (
        <g key={n.id} className={n.cls}>
          <circle cx={n.x} cy={n.y} r={nodeRadius}
            fill="#0a0a0a" stroke={kColors[n.k]} strokeWidth="1.5" />
          <text x={n.x} y={n.y + 4} fill={kColors[n.k]} fontSize="10"
            fontWeight="700" textAnchor="middle"
            fontFamily="'JetBrains Mono','Fira Code',monospace">{n.label}</text>
        </g>
      ))}

      {/* Side Panel (Legend + Set Formula) */}
      <g className="fsu-4">
        {/* Section Title */}
        <text x={737.5} y={52} fill="rgba(255,255,255,0.35)" fontSize="8"
          fontWeight="800" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.1em">
          CONJUNTO DE VÉRTICES V
        </text>

        {/* Formula Text */}
        <text x={737.5} y={92} fill={ACCENT_HEX} fontSize="13.5" fontWeight="700" textAnchor="middle"
          fontFamily="'JetBrains Mono','Fira Code',monospace" letterSpacing="-0.02em">
          V = {"{(c₁, c₂, …, cₖ) | 0 ≤ k ≤ 8}"}
        </text>

        {/* Legend Items */}
        {[
          { color: ACCENT_HEX, label: 'k=0 · raíz (vacío)', y: 194 },
          { color: '#69b6dd', label: 'k=1 · 1 reina', y: 224 },
          { color: '#e0a0ff', label: 'k=2 · 2 reinas', y: 254 },
          { color: '#ff9f67', label: 'k=3 · 3 reinas', y: 284 },
        ].map(l => (
          <g key={l.label}>
            <rect x={672} y={l.y - 6} width={8} height={8} fill={l.color} rx="1.5" />
            <text x={686} y={l.y + 2} fill={l.color} fontSize="9"
              fontFamily="Inter,sans-serif">{l.label}</text>
          </g>
        ))}
      </g>

      <text x={420} y={392} fill="#444" fontSize="9.5" textAnchor="middle"
        fontFamily="Inter,sans-serif" letterSpacing="0.08em">
        ÁRBOL DE VECTORES k-PROMETEDORES · k DE 0 A 8
      </text>
    </svg>
  )
}

// ─── Step B — Aristas · Estructura de Árbol ───────────────────────────────────
function VizB() {
  const SZ = 36         // cell size
  const COLS = 4        // board columns/rows (simplified 4×4)
  const boardW = COLS * SZ

  // Each board state: which row (0-based) is the queen in each column
  const stages: number[][] = [
    [1],         // k=1
    [1, 3],      // k=2
  ]

  // Horizontal layout: boards evenly spaced in the left 490px
  const startX = 60
  const spacing = 82   // gap between board left edges
  const boardY = 80

  // Right-side tree (x from 530 to 820)
  const R = 13  // node radius
  const tNodes = [
    { id: 'r', x: 672, y: 55, label: '()', hi: true },
    { id: 'a', x: 590, y: 140, label: '(2)', hi: false },
    { id: 'b', x: 755, y: 140, label: '(5)', hi: false },
    { id: 'c', x: 548, y: 225, label: '(2,5)', hi: false },
    { id: 'd', x: 632, y: 225, label: '(2,7)', hi: false },
    { id: 'e', x: 716, y: 225, label: '(5,1)', hi: false },
    { id: 'f', x: 800, y: 225, label: '(5,3)', hi: false },
    { id: 'g', x: 548, y: 310, label: '…', hi: false },
    { id: 'h', x: 632, y: 310, label: '…', hi: false },
  ]
  const tEdges = [
    ['r', 'a'], ['r', 'b'],
    ['a', 'c'], ['a', 'd'],
    ['b', 'e'], ['b', 'f'],
    ['c', 'g'], ['d', 'h'],
  ]
  const tPos: Record<string, { x: number; y: number }> = Object.fromEntries(
    tNodes.map(n => [n.id, { x: n.x, y: n.y }])
  )

  return (
    <svg viewBox="0 0 840 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <defs>
        <style>{KEYFRAMES}</style>
        <marker id="arrBY" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill={ACCENT_HEX} />
        </marker>
        <marker id="arrBD" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#555" />
        </marker>
      </defs>

      {/* ── BOARDS ── */}
      {stages.map((queens, si) => {
        const ox = startX + si * (boardW + spacing)
        return (
          <g key={si} className={`pop-${si + 1}`}>
            {/* Grid cells */}
            {Array.from({ length: COLS }, (_, row) =>
              Array.from({ length: COLS }, (_, col) => {
                const hasQueen = queens[col] === row
                const isNew = hasQueen && col === queens.length - 1
                return (
                  <rect key={`${row}-${col}`}
                    x={ox + col * SZ} y={boardY + row * SZ}
                    width={SZ - 1} height={SZ - 1}
                    fill={isNew ? `${ACCENT_HEX}18` : hasQueen ? 'rgba(105,182,221,0.1)' : (row + col) % 2 === 0 ? '#161616' : '#0f0f0f'}
                    stroke={isNew ? ACCENT_HEX : hasQueen ? '#69b6dd44' : '#1a1a1a'}
                    strokeWidth={isNew ? '1.5' : '0.5'}
                  />
                )
              })
            )}
            {/* Queens */}
            {queens.map((row, col) => (
              <text key={col}
                x={ox + col * SZ + SZ / 2}
                y={boardY + row * SZ + SZ - 6}
                fill={col === queens.length - 1 ? ACCENT_HEX : '#69b6dd'}
                fontSize="18" textAnchor="middle" fontFamily="Inter,sans-serif">
                ♛
              </text>
            ))}
            {/* Tuple label */}
            <text x={ox + boardW / 2} y={boardY + COLS * SZ + 16}
              fill={si === 1 ? ACCENT_HEX : '#888'} fontSize="9.5" textAnchor="middle"
              fontFamily="'JetBrains Mono','Fira Code',monospace">
              {`(${queens.join(', ')})`}
            </text>
          </g>
        )
      })}

      {/* ── ARROWS BETWEEN BOARDS ── */}
      {stages.slice(0, -1).map((_, si) => {
        const ax = startX + si * (boardW + spacing) + boardW + 3
        const bx = startX + (si + 1) * (boardW + spacing) - 3
        const ay = boardY + (COLS * SZ) / 2
        const isActive = true   // highlight the only arrow
        return (
          <line key={si} className={`dl-${si + 1}`}
            x1={ax} y1={ay} x2={bx} y2={ay}
            stroke={isActive ? ACCENT_HEX : '#555'}
            strokeWidth={isActive ? '1.8' : '1'}
            markerEnd={isActive ? 'url(#arrBY)' : 'url(#arrBD)'} />
        )
      })}

      {/* ── TREE (right) ── */}
      {/* Edges */}
      {tEdges.map(([pid, cid], i) => {
        const p = tPos[pid], c = tPos[cid]
        return (
          <line key={i} className="dl-2"
            x1={p.x} y1={p.y + R} x2={c.x} y2={c.y - R}
            stroke="#555" strokeWidth="1" markerEnd="url(#arrBD)" />
        )
      })}
      {/* Nodes */}
      {tNodes.map(n => (
        <g key={n.id} className="pop-3">
          <circle cx={n.x} cy={n.y} r={R}
            fill="#0c0c0c"
            stroke={n.hi ? ACCENT_HEX : '#666'}
            strokeWidth={n.hi ? '1.5' : '1'} />
          <text x={n.x} y={n.y + 3.5} fill={n.hi ? ACCENT_HEX : '#aaa'}
            fontSize="7" fontWeight="600" textAnchor="middle"
            fontFamily="'JetBrains Mono','Fira Code',monospace">
            {n.label}
          </text>
        </g>
      ))}

      {/* Divider line between left and right */}
      <line x1={518} y1={30} x2={518} y2={370} stroke="#333" strokeWidth="1" />
    </svg>
  )
}

// ─── Step C — DFS / Backtracking traversal (animated) ────────────────────────
const DFS_KEYFRAMES = `
  @keyframes fadeSlideUp    { from { opacity:0; transform:translateY(14px);  } to { opacity:1; transform:translateY(0);  } }
  @keyframes drawLine       { from { stroke-dashoffset:1200; } to { stroke-dashoffset:0; } }
  @keyframes popIn          { from { transform:scale(0.6); opacity:0; } to { transform:scale(1); opacity:1; } }

  @keyframes dfsNodeActive  {
    0%   { r: 18; }
    40%  { r: 23; }
    70%  { r: 20; }
    100% { r: 18; }
  }
  @keyframes dfsNodePulse   {
    0%,100% { opacity: 1; }
    50%     { opacity: 0.55; }
  }
  @keyframes dfsEdgeTravel  {
    from { stroke-dashoffset: 200; opacity: 0.3; }
    to   { stroke-dashoffset: 0;   opacity: 1;   }
  }
  @keyframes dfsDeadFlash   {
    0%   { stroke: #ff4444; opacity:1; }
    30%  { stroke: #ff8888; opacity:1; }
    60%  { stroke: #ff4444; opacity:0.7; }
    100% { stroke: #ff2222; opacity:1; }
  }
  @keyframes dfsBacktrack   {
    0%   { stroke-dashoffset: 300; opacity: 0; }
    20%  { opacity: 1; }
    100% { stroke-dashoffset: 0;   opacity: 1; }
  }
  @keyframes dfsSolutionGlow {
    0%,100% { filter: drop-shadow(0 0 4px #7dff9a88); }
    50%     { filter: drop-shadow(0 0 14px #7dff9aee); }
  }
  @keyframes dfsLabelFade {
    0%   { opacity: 0; transform: translateY(6px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes dfsArrowDash {
    from { stroke-dashoffset: 120; }
    to   { stroke-dashoffset: 0; }
  }
`

// Each "step" in the DFS walkthrough:
// visitedNodes: edges that are "traversed / grey"
// activeNode: currently highlighted node id
// activeEdge: edge index being traversed
// deadNode: pruned node id
// backtracking: show backtrack arrow
// solution: show solution glow
type DFSStep = {
  visitedNodes: string[]
  visitedEdges: number[]
  activeNode: string | null
  activeEdge: number | null
  deadNode: string | null
  backtracking: boolean
  solution: boolean
  label: string
}

const DFS_NODES = [
  { id: 'r', x: 420, y: 45, label: '()' },
  { id: 'n1', x: 185, y: 125, label: '(1)' },
  { id: 'n3', x: 420, y: 125, label: '(3)' },
  { id: 'n5', x: 570, y: 125, label: '(5)' },
  { id: 'n13', x: 90, y: 215, label: '(1,3)' },
  { id: 'n15', x: 235, y: 215, label: '(1,5)' },
  { id: 'n135', x: 90, y: 305, label: '(1,3,5)' },
  { id: 'n137', x: 240, y: 305, label: '(1,3,7)' },
  { id: 'sol', x: 240, y: 390, label: 'k=8 ✓' },
]

const DFS_EDGES = [
  { p: 'r', c: 'n1' }, // 0
  { p: 'r', c: 'n3' }, // 1
  { p: 'r', c: 'n5' }, // 2
  { p: 'n1', c: 'n13' }, // 3
  { p: 'n1', c: 'n15' }, // 4
  { p: 'n13', c: 'n135' }, // 5
  { p: 'n13', c: 'n137' }, // 6
  { p: 'n137', c: 'sol' }, // 7
]

const DFS_STEPS: DFSStep[] = [
  { visitedNodes: [], visitedEdges: [], activeNode: 'r', activeEdge: null, deadNode: null, backtracking: false, solution: false, label: 'Inicio · raíz ()' },
  { visitedNodes: ['r'], visitedEdges: [], activeNode: 'n1', activeEdge: 0, deadNode: null, backtracking: false, solution: false, label: 'Descender → (1)' },
  { visitedNodes: ['r', 'n1'], visitedEdges: [0], activeNode: 'n13', activeEdge: 3, deadNode: null, backtracking: false, solution: false, label: 'Descender → (1,3)' },
  { visitedNodes: ['r', 'n1', 'n13'], visitedEdges: [0, 3], activeNode: 'n135', activeEdge: 5, deadNode: null, backtracking: false, solution: false, label: 'Descender → (1,3,5)' },
  { visitedNodes: ['r', 'n1', 'n13'], visitedEdges: [0, 3, 5], activeNode: null, activeEdge: null, deadNode: 'n135', backtracking: false, solution: false, label: 'Sin extensiones · PODA' },
  { visitedNodes: ['r', 'n1', 'n13'], visitedEdges: [0, 3, 5], activeNode: 'n13', activeEdge: null, deadNode: 'n135', backtracking: true, solution: false, label: 'Backtrack → (1,3)' },
  { visitedNodes: ['r', 'n1', 'n13'], visitedEdges: [0, 3, 5], activeNode: 'n137', activeEdge: 6, deadNode: 'n135', backtracking: false, solution: false, label: 'Descender → (1,3,7)' },
  { visitedNodes: ['r', 'n1', 'n13', 'n137'], visitedEdges: [0, 3, 5, 6], activeNode: 'sol', activeEdge: 7, deadNode: 'n135', backtracking: false, solution: false, label: 'Descender · k=8 alcanzado' },
  { visitedNodes: ['r', 'n1', 'n13', 'n137', 'sol'], visitedEdges: [0, 3, 5, 6, 7], activeNode: null, activeEdge: null, deadNode: 'n135', backtracking: false, solution: true, label: '¡Solución encontrada! k=8 ✓' },
]

function VizC() {
  const [step, setStep] = React.useState(0)
  const [autoPlay, setAutoPlay] = React.useState(true)

  React.useEffect(() => {
    if (!autoPlay) return
    const id = setTimeout(() => {
      setStep(s => (s + 1) % DFS_STEPS.length)
    }, step === DFS_STEPS.length - 1 ? 1800 : 900)
    return () => clearTimeout(id)
  }, [step, autoPlay])

  const s = DFS_STEPS[step]
  const pos: Record<string, { x: number; y: number }> = Object.fromEntries(DFS_NODES.map(n => [n.id, { x: n.x, y: n.y }]))

  const nodeColor = (id: string) => {
    if (s.activeNode === id) return ACCENT_HEX
    if (id === 'sol' && s.solution) return '#7dff9a'
    if (s.deadNode === id) return '#ff4444'
    if (s.visitedNodes.includes(id)) return '#6699bb'
    return '#2e2e2e'
  }

  const nodeStrokeW = (id: string) => {
    if (s.activeNode === id) return '2.5'
    if (id === 'sol' && s.solution) return '2.5'
    if (s.deadNode === id) return '2'
    return '1.2'
  }

  const edgeColor = (idx: number) => {
    if (s.activeEdge === idx) return ACCENT_HEX
    if (s.visitedEdges.includes(idx)) return '#5588aa'
    return '#2a2a2a'
  }

  const edgeWidth = (idx: number) => {
    if (s.activeEdge === idx) return '2.5'
    if (s.visitedEdges.includes(idx)) return '1.5'
    return '1'
  }

  return (
    <svg
      viewBox="0 0 840 430"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'pointer' }}
      preserveAspectRatio="xMidYMid meet"
      onClick={() => { setAutoPlay(false); setStep(s2 => (s2 + 1) % DFS_STEPS.length) }}
    >
      <defs>
        <style>{DFS_KEYFRAMES}</style>
        <filter id="glowY" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glowG" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glowR" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <marker id="arrDFS" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill="#2a2a2a" />
        </marker>
        <marker id="arrDFSact" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill={ACCENT_HEX} />
        </marker>
        <marker id="arrDFSvis" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill="#5588aa" />
        </marker>
        <marker id="arrBT" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill="#ff4444" />
        </marker>
      </defs>

      {/* ── All edges (base layer) ── */}
      {DFS_EDGES.map((e, i) => {
        const p = pos[e.p], c = pos[e.c]
        const isActive = s.activeEdge === i
        const isVisited = s.visitedEdges.includes(i)
        const col = edgeColor(i)
        const markerId = isActive ? 'arrDFSact' : isVisited ? 'arrDFSvis' : 'arrDFS'
        return (
          <line key={i}
            x1={p.x} y1={p.y + 19} x2={c.x} y2={c.y - 19}
            stroke={col}
            strokeWidth={edgeWidth(i)}
            markerEnd={`url(#${markerId})`}
            style={isActive ? {
              filter: `drop-shadow(0 0 5px ${ACCENT_HEX}99)`,
              strokeDasharray: 160,
              strokeDashoffset: 0,
              animation: 'dfsEdgeTravel 0.55s ease forwards',
            } : {}}
          />
        )
      })}

      {/* ── Backtrack arrow ── */}
      {(s.backtracking || (s.deadNode && !s.activeNode && !s.solution)) && (
        <path
          d="M90,287 Q28,258 90,215"
          fill="none"
          stroke="#ff4444"
          strokeWidth="2"
          strokeDasharray="5 3"
          markerEnd="url(#arrBT)"
          style={{
            strokeDasharray: 120,
            animation: s.backtracking ? 'dfsArrowDash 0.6s ease forwards' : 'none',
            opacity: s.backtracking ? 1 : 0.45,
          }}
        />
      )}

      {/* ── All nodes ── */}
      {DFS_NODES.map(n => {
        const isActive = s.activeNode === n.id
        const isSolution = n.id === 'sol' && s.solution
        const isDead = s.deadNode === n.id
        const col = nodeColor(n.id)
        return (
          <g key={n.id}
            style={{
              filter: isActive
                ? `drop-shadow(0 0 8px ${ACCENT_HEX}bb)`
                : isSolution
                  ? 'drop-shadow(0 0 10px #7dff9acc)'
                  : isDead
                    ? 'drop-shadow(0 0 6px #ff444488)'
                    : 'none',
            }}
          >
            {/* Glow ring for active */}
            {isActive && (
              <circle cx={n.x} cy={n.y} r={26}
                fill="none"
                stroke={ACCENT_HEX}
                strokeWidth="1"
                opacity="0.3"
                style={{ animation: 'dfsNodePulse 1s ease-in-out infinite' }}
              />
            )}
            <circle cx={n.x} cy={n.y} r={18}
              fill={isActive ? '#141408' : isSolution ? '#071407' : isDead ? '#140a0a' : '#0a0a0a'}
              stroke={col}
              strokeWidth={nodeStrokeW(n.id)}
              style={isActive ? { animation: 'dfsNodeActive 0.5s ease forwards' } : {}}
            />
            <text x={n.x} y={n.y + 4} fill={col} fontSize="7.5"
              fontWeight="700" textAnchor="middle"
              fontFamily="'JetBrains Mono','Fira Code',monospace">
              {n.label}
            </text>
          </g>
        )
      })}

      {/* ── PODA label near dead node ── */}
      {s.deadNode && (
        <text
          x={pos[s.deadNode].x - 32}
          y={pos[s.deadNode].y - 22}
          fill="#ff4444" fontSize="8" fontWeight="800"
          fontFamily="Inter,sans-serif"
          style={{ animation: 'dfsLabelFade 0.4s ease forwards', opacity: 1 }}
        >
          PODA
        </text>
      )}

      {/* ── Step label banner ── */}
      <rect x={520} y={32} width={295} height={32} rx="6"
        fill="rgba(0,0,0,0.55)" stroke={s.solution ? '#7dff9a44' : s.deadNode ? '#ff444433' : `${ACCENT_HEX}33`}
        strokeWidth="1" />
      <text x={667} y={52} fill={s.solution ? '#7dff9a' : s.deadNode && !s.activeNode ? '#ff8888' : ACCENT_HEX}
        fontSize="10" fontWeight="700" textAnchor="middle"
        fontFamily="Inter,sans-serif"
        style={{ animation: 'dfsLabelFade 0.35s ease forwards' }}
      >
        {s.label}
      </text>

      {/* ── Legend (right panel) ── */}
      <g style={{ animation: 'dfsLabelFade 0.6s ease forwards 0.5s', opacity: 0 }}>
        {[
          { color: '#6699bb', label: 'Visitado' },
          { color: ACCENT_HEX, label: 'Activo (DFS)' },
          { color: '#ff4444', label: 'Podado' },
          { color: '#7dff9a', label: 'Solución k=8' },
        ].map((l, i) => (
          <g key={l.label}>
            <circle cx={636} cy={112 + i * 26} r={5} fill={l.color} />
            <text x={647} y={116 + i * 26} fill={l.color} fontSize="9"
              fontFamily="Inter,sans-serif">{l.label}</text>
          </g>
        ))}
      </g>

      {/* ── Controls — bottom right ── */}
      <g>
        {/* Step counter */}
        <text x={698} y={268} fill="#383838" fontSize="8.5" textAnchor="middle"
          fontFamily="'JetBrains Mono','Fira Code',monospace" letterSpacing="0.05em">
          {step + 1} / {DFS_STEPS.length}
        </text>

        {/* Play / Pause pill */}
        <rect x={524} y={278} width={82} height={26} rx="13"
          fill={autoPlay ? `${ACCENT_HEX}22` : ACCENT_HEX}
          stroke={ACCENT_HEX} strokeWidth="1"
          style={{ cursor: 'pointer' }}
          onClick={(e) => { e.stopPropagation(); setAutoPlay(a => !a); }}
        />

        <text x={565} y={291} fill={autoPlay ? ACCENT_HEX : '#000'} fontSize="9" fontWeight="700"
          textAnchor="middle" fontFamily="Inter,sans-serif" style={{ pointerEvents: 'none' }}
          dominantBaseline="middle">
          {autoPlay ? 'PAUSA' : 'PLAY'}
        </text>

        {/* Reiniciar pill */}
        <rect x={618} y={278} width={92} height={26} rx="13"
          fill="rgba(255,255,255,0.04)" stroke="#3a3a3a" strokeWidth="1"
          style={{ cursor: 'pointer' }}
          onClick={(e) => { e.stopPropagation(); setStep(0); setAutoPlay(true); }}
        />

        <text x={664} y={291} fill="#666" fontSize="9" fontWeight="600"
          textAnchor="middle" fontFamily="Inter,sans-serif" style={{ pointerEvents: 'none' }}
          dominantBaseline="middle">
          REINICIAR
        </text>
      </g>

      {/* ── Footer ── */}
      <text x={420} y={422} fill="#333" fontSize="9" textAnchor="middle"
        fontFamily="Inter,sans-serif" letterSpacing="0.08em">
        RECORRIDO EN PROFUNDIDAD (DFS) · BACKTRACKING CON PODA
      </text>
    </svg>
  )
}

// ─── Step D — Independence number Q_{8,8} ─────────────────────────────────────
function VizD() {
  // Mini 8×8 board showing one of the 92 independent sets
  const SZ = 34
  const OX = 60
  const OY = 30
  const solution = [0, 4, 7, 5, 2, 6, 1, 3] // col index per row (0-based)

  return (
    <svg viewBox="0 0 840 360" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <defs><style>{KEYFRAMES}</style></defs>

      {/* Board */}
      <g className="fsr-1">
        {Array.from({ length: 8 }, (_, r) =>
          Array.from({ length: 8 }, (_, c) => {
            const isQueen = solution[r] === c
            const light = (r + c) % 2 === 0
            return (
              <rect key={`${r}-${c}`}
                x={OX + c * SZ} y={OY + r * SZ}
                width={SZ - 1} height={SZ - 1}
                fill={isQueen ? ACCENT_HEX : light ? '#181818' : '#111'}
                stroke={isQueen ? ACCENT_HEX : '#2a2a2a'}
                strokeWidth="1"
              />
            )
          })
        )}
        {/* Queens */}
        {solution.map((col, row) => (
          <text key={row}
            x={OX + col * SZ + SZ / 2} y={OY + row * SZ + SZ - 6}
            fill="#000" fontSize="18" textAnchor="middle"
            fontFamily="Inter,sans-serif">♛</text>
        ))}
        {/* Row + col labels */}
        {Array.from({ length: 8 }, (_, i) => (
          <g key={i}>
            <text x={OX - 10} y={OY + i * SZ + SZ / 2 + 4}
              fill="#555" fontSize="9" textAnchor="middle"
              fontFamily="Inter,sans-serif">{i + 1}</text>
            <text x={OX + i * SZ + SZ / 2} y={OY - 8}
              fill="#555" fontSize="9" textAnchor="middle"
              fontFamily="Inter,sans-serif">{i + 1}</text>
          </g>
        ))}
      </g>

      {/* Stats panel */}
      <g className="fsu-2">
        <rect x={360} y={30} width={430} height={260} rx="8"
          fill="rgba(245,230,66,0.03)" stroke="rgba(245,230,66,0.14)" strokeWidth="1" />

        {[
          { tag: 'GRAFO DE REINAS Q₈,₈', value: '64 vértices · 8×8 casillas', y: 75, color: '#888' },
          { tag: 'ARISTAS', value: 'casillas que se amenazan', y: 115, color: '#888' },
          { tag: 'NÚMERO DE INDEPENDENCIA', value: 'α(Q₈,₈) = 8', y: 155, color: ACCENT_HEX },
          { tag: 'CONJUNTOS INDEPENDIENTES', value: '92 conjuntos de tamaño 8', y: 195, color: '#7dff9a' },
          { tag: 'RELACIÓN BIUNÍVOCA', value: '1 solución ↔ 1 conjunto maximal', y: 240, color: '#e0a0ff' },
        ].map(s => (
          <g key={s.tag}>
            <text x={385} y={s.y - 14} fill="rgba(255,255,255,0.28)" fontSize="8"
              fontWeight="800" letterSpacing="0.14em"
              fontFamily="Inter,sans-serif">{s.tag}</text>
            <text x={385} y={s.y} fill={s.color} fontSize={s.color === ACCENT_HEX ? '22' : '14'}
              fontWeight="600" fontFamily="'JetBrains Mono','Fira Code',monospace">{s.value}</text>
          </g>
        ))}
      </g>

      <text x={420} y={350} fill="#444" fontSize="9.5" textAnchor="middle"
        fontFamily="Inter,sans-serif" letterSpacing="0.08em">
        α(Q₈,₈) = 8 · LAS 92 SOLUCIONES SON LOS 92 CONJUNTOS INDEPENDIENTES MAXIMALES DE TAMAÑO 8
      </text>
    </svg>
  )
}

// ─── Step E — Bipartite graph rows vs columns ─────────────────────────────────
function VizE() {
  const rows = Array.from({ length: 8 }, (_, i) => ({ id: `F${i + 1}`, y: 48 + i * 36 }))
  const cols = Array.from({ length: 8 }, (_, i) => ({ id: `C${i + 1}`, y: 48 + i * 36 }))
  // Matching: one valid solution (0-based col for each row)
  const matching = [0, 4, 7, 5, 2, 6, 1, 3]

  return (
    <svg viewBox="0 0 840 360" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <defs><style>{KEYFRAMES}</style></defs>

      {/* U label */}
      <text x={180} y={24} fill="#888" fontSize="9.5" textAnchor="middle"
        fontFamily="Inter,sans-serif" letterSpacing="0.1em" fontWeight="800">
        U = FILAS
      </text>
      <text x={600} y={24} fill="#888" fontSize="9.5" textAnchor="middle"
        fontFamily="Inter,sans-serif" letterSpacing="0.1em" fontWeight="800">
        V = COLUMNAS
      </text>

      {/* All possible edges (faint) */}
      {rows.map((r, ri) =>
        cols.map((c, ci) => {
          const isMatch = matching[ri] === ci
          return (
            <line key={`${ri}-${ci}`}
              x1={220} y1={r.y} x2={560} y2={c.y}
              stroke={isMatch ? ACCENT_HEX : 'rgba(255,255,255,0.04)'}
              strokeWidth={isMatch ? '1.8' : '0.5'}
            />
          )
        })
      )}

      {/* Row nodes (U) */}
      {rows.map((r, i) => (
        <g key={r.id} className="fsr-1">
          <circle cx={180} cy={r.y} r={14}
            fill="#0a0a0a" stroke="#69b6dd" strokeWidth="1.5" />
          <text x={180} y={r.y + 4} fill="#69b6dd" fontSize="10"
            fontWeight="700" textAnchor="middle"
            fontFamily="Inter,sans-serif">F{i + 1}</text>
        </g>
      ))}

      {/* Col nodes (V) */}
      {cols.map((c, i) => (
        <g key={c.id} className="fsr-2">
          <circle cx={600} cy={c.y} r={14}
            fill="#0a0a0a" stroke="#e0a0ff" strokeWidth="1.5" />
          <text x={600} y={c.y + 4} fill="#e0a0ff" fontSize="10"
            fontWeight="700" textAnchor="middle"
            fontFamily="Inter,sans-serif">C{i + 1}</text>
        </g>
      ))}

      {/* Matching labels */}
      {rows.map((r, ri) => {
        const ci = matching[ri]
        const mx = (220 + 560) / 2
        const my = (r.y + cols[ci].y) / 2
        return (
          <text key={ri} x={mx} y={my - 4} fill={ACCENT_HEX} fontSize="7.5"
            textAnchor="middle" fontFamily="'JetBrains Mono','Fira Code',monospace"
            className="fsu-3">
            (F{ri + 1},C{ci + 1})
          </text>
        )
      })}

      {/* Constraint note */}
      <g className="fsu-4">
        <rect x={660} y={50} width={160} height={90} rx="6"
          fill="rgba(245,230,66,0.05)" stroke="rgba(245,230,66,0.2)" strokeWidth="1" />
        <text x={740} y={72} fill="#888" fontSize="8.5"
          textAnchor="middle" fontFamily="Inter,sans-serif">Restricción diagonal:</text>
        <text x={740} y={90} fill={ACCENT_HEX} fontSize="10"
          fontWeight="700" textAnchor="middle"
          fontFamily="'JetBrains Mono','Fira Code',monospace">|Fu−Fv|≠|Cu−Cv|</text>
        <text x={740} y={108} fill="#666" fontSize="8"
          textAnchor="middle" fontFamily="Inter,sans-serif">para todo par de aristas</text>
        <text x={740} y={126} fill="#666" fontSize="8"
          textAnchor="middle" fontFamily="Inter,sans-serif">seleccionadas del matching</text>
      </g>

      <text x={420} y={350} fill="#444" fontSize="9.5" textAnchor="middle"
        fontFamily="Inter,sans-serif" letterSpacing="0.08em">
        GRAFO BIPARTITO G=(U,V,E) · EMPAREJAMIENTO PERFECTO DE TAMAÑO 8 SIN CONFLICTOS DIAGONALES
      </text>
    </svg>
  )
}

// ─── Step F — Graph coloring model (animated backtracking) ────────────────────
const GC_KEYFRAMES = `
  @keyframes gcPopIn   { from { transform:scale(0.5); opacity:0; } to { transform:scale(1); opacity:1; } }
  @keyframes gcPulse   { 0%,100%{opacity:0.35} 50%{opacity:1} }
  @keyframes gcConflict {
    0%   { stroke: #ff3333; stroke-width: 3; opacity: 1; }
    25%  { stroke: #ff8888; stroke-width: 5; opacity: 1; }
    50%  { stroke: #ff2222; stroke-width: 4; opacity: 0.8; }
    75%  { stroke: #ff5555; stroke-width: 5; opacity: 1; }
    100% { stroke: #ff3333; stroke-width: 3; opacity: 1; }
  }
  @keyframes gcEdgeGlow {
    0%   { stroke-opacity:0.2; }
    50%  { stroke-opacity:1; }
    100% { stroke-opacity:0.6; }
  }
  @keyframes gcLock {
    0%   { r:22; filter:drop-shadow(0 0 0px transparent); }
    40%  { r:28; filter:drop-shadow(0 0 14px currentColor); }
    70%  { r:24; }
    100% { r:22; filter:drop-shadow(0 0 6px currentColor); }
  }
  @keyframes gcLabelPop {
    0%   { opacity:0; transform:translateY(6px) scale(0.8); }
    60%  { opacity:1; transform:translateY(-2px) scale(1.05); }
    100% { opacity:1; transform:translateY(0) scale(1); }
  }
  @keyframes gcBacktrack {
    0%   { opacity:1; transform:scale(1); }
    30%  { opacity:0.6; transform:scale(0.85); }
    60%  { opacity:0.2; transform:scale(0.6); }
    100% { opacity:0; transform:scale(0.4); }
  }
  @keyframes gcTry {
    0%   { opacity:0; transform:scale(0.6); }
    60%  { opacity:0.8; transform:scale(1.1); }
    100% { opacity:0.7; transform:scale(1); }
  }
  @keyframes gcShake {
    0%,100% { transform: translateX(0); }
    20%     { transform: translateX(-5px); }
    40%     { transform: translateX(5px); }
    60%     { transform: translateX(-4px); }
    80%     { transform: translateX(4px); }
  }
  @keyframes gcBannerFade {
    from { opacity:0; } to { opacity:1; }
  }
  @keyframes gcRingPulse {
    0%,100% { r:30; opacity:0.25; }
    50%     { r:36; opacity:0.55; }
  }
`

// Coloring backtracking steps: each step = { node, colorIdx (0-based), phase, conflictEdges[] }
// phase: 'try' | 'conflict' | 'backtrack' | 'locked'
// locked[]: node indices whose color is fixed
// label: annotation text
type GCPhase = 'try' | 'conflict' | 'backtrack' | 'locked' | 'done'
type GCStep = {
  phase: GCPhase
  currentNode: number         // 0-based node being worked on
  tryColor: number | null     // color index being tried (0-based)
  locked: Record<number, number> // node→colorIdx fixed so far
  conflictNodes: number[]      // nodes that conflict with current try
  label: string
}

const ROW_COLORS_F = [
  '#F5E642', '#69b6dd', '#e0a0ff', '#ff9f67',
  '#7dff9a', '#ff6b6b', '#5ecfff', '#ffb347',
]

// Valid solution: col i gets row (1-based)
const SOLUTION_F = [1, 5, 8, 6, 3, 7, 2, 4]

// Build animation script:
// For each node 0-7, try 1-2 wrong colors (conflict), then assign correct one (lock)
function buildGCSteps(): GCStep[] {
  const steps: GCStep[] = []
  const locked: Record<number, number> = {}

  // Wrong attempts per node (colorIdx 0-based, chosen to create plausible conflicts)
  // We pick colors that would conflict with something already placed diagonally
  const wrongAttempts: Array<Array<number>> = [
    [],          // node 0: no conflict, first to place
    [0],         // node 1: try color 0 (same as node 0 → same row)
    [0, 3],      // node 2: two wrong tries
    [1],         // node 3: one wrong try
    [0],         // node 4
    [2],         // node 5
    [0, 4],      // node 6
    [1],         // node 7
  ]

  for (let node = 0; node < 8; node++) {
    const correctColor = SOLUTION_F[node] - 1 // 0-based

    // Try wrong colors
    for (const wrongColor of wrongAttempts[node]) {
      // Find which previously-locked nodes conflict
      const conflictNodes = Object.entries(locked)
        .filter(([n, c]) => Number(c) === wrongColor || Math.abs(Number(n) - node) === Math.abs(Number(c) - wrongColor))
        .map(([n]) => Number(n))
        .slice(0, 2) // at most 2 conflict nodes shown

      steps.push({
        phase: 'try',
        currentNode: node,
        tryColor: wrongColor,
        locked: { ...locked },
        conflictNodes: [],
        label: `Col ${node + 1}: intentando Fila ${wrongColor + 1}…`,
      })
      steps.push({
        phase: 'conflict',
        currentNode: node,
        tryColor: wrongColor,
        locked: { ...locked },
        conflictNodes: conflictNodes.length ? conflictNodes : [Math.max(0, node - 1)],
        label: `¡Conflicto! Fila ${wrongColor + 1} no es válida`,
      })
      steps.push({
        phase: 'backtrack',
        currentNode: node,
        tryColor: null,
        locked: { ...locked },
        conflictNodes: [],
        label: `Backtrack · descartando Fila ${wrongColor + 1}`,
      })
    }

    // Now assign correct color
    steps.push({
      phase: 'try',
      currentNode: node,
      tryColor: correctColor,
      locked: { ...locked },
      conflictNodes: [],
      label: `Col ${node + 1}: probando Fila ${correctColor + 1}…`,
    })
    locked[node] = correctColor
    steps.push({
      phase: 'locked',
      currentNode: node,
      tryColor: correctColor,
      locked: { ...locked },
      conflictNodes: [],
      label: `✓ Col ${node + 1} → Fila ${correctColor + 1} (válido)`,
    })
  }

  steps.push({
    phase: 'done',
    currentNode: -1,
    tryColor: null,
    locked: { ...locked },
    conflictNodes: [],
    label: '¡Coloreo completo! 8 reinas sin conflictos',
  })

  return steps
}

const GC_STEPS = buildGCSteps()

function VizF() {
  const CX = 420, CY = 185, R = 130
  const [step, setStep] = React.useState(0)
  const [autoPlay, setAutoPlay] = React.useState(true)

  React.useEffect(() => {
    if (!autoPlay) return
    const delay =
      GC_STEPS[step]?.phase === 'conflict' ? 900 :
        GC_STEPS[step]?.phase === 'backtrack' ? 700 :
          GC_STEPS[step]?.phase === 'locked' ? 1100 :
            GC_STEPS[step]?.phase === 'done' ? 3200 : 750
    const id = setTimeout(() => setStep(s => (s + 1) % GC_STEPS.length), delay)
    return () => clearTimeout(id)
  }, [step, autoPlay])

  const s = GC_STEPS[step]

  const nodePos = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * 2 * Math.PI - Math.PI / 2
    return { x: CX + R * Math.cos(angle), y: CY + R * Math.sin(angle) }
  })

  // Edges: adjacent columns (|i-j|<=2) — same as original
  const edgePairs: [number, number][] = []
  for (let i = 0; i < 8; i++)
    for (let j = i + 1; j < 8; j++)
      if (j - i <= 2) edgePairs.push([i, j])

  const isDone = s.phase === 'done'

  // Node visual state
  const getNodeFill = (i: number) => {
    if (s.locked[i] !== undefined) return ROW_COLORS_F[s.locked[i]]
    if (i === s.currentNode && s.tryColor !== null) return ROW_COLORS_F[s.tryColor]
    return '#111'
  }
  const getNodeStroke = (i: number) => {
    if (s.conflictNodes.includes(i)) return '#ff3333'
    if (s.locked[i] !== undefined) return ROW_COLORS_F[s.locked[i]]
    if (i === s.currentNode && s.tryColor !== null) return ROW_COLORS_F[s.tryColor]
    return '#2a2a2a'
  }
  const getNodeStrokeW = (i: number) => {
    if (s.conflictNodes.includes(i)) return '3'
    if (i === s.currentNode) return '3'
    if (s.locked[i] !== undefined) return '2'
    return '1'
  }
  const getNodeOpacity = (i: number) => {
    if (i > s.currentNode && s.locked[i] === undefined) return 0.32
    return 1
  }

  // Edge highlight
  const isConflictEdge = (a: number, b: number) => {
    const n = s.currentNode
    return s.phase === 'conflict' && (
      (a === n && s.conflictNodes.includes(b)) ||
      (b === n && s.conflictNodes.includes(a))
    )
  }

  return (
    <svg
      viewBox="0 0 840 380"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'pointer' }}
      preserveAspectRatio="xMidYMid meet"
      onClick={() => { setAutoPlay(false); setStep(s2 => (s2 + 1) % GC_STEPS.length) }}
    >
      <defs>
        <style>{GC_KEYFRAMES}</style>
        <filter id="gcGlowY" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="gcGlowR" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="gcGlowG" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ── Edges ── */}
      {edgePairs.map(([a, b], idx) => {
        const pa = nodePos[a], pb = nodePos[b]
        const conflict = isConflictEdge(a, b)
        if (!conflict) return null
        return (
          <line key={idx}
            x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
            stroke="#ff3333"
            strokeWidth="2.5"
            style={{
              animation: 'gcConflict 0.5s ease-in-out 2',
              filter: 'drop-shadow(0 0 6px #ff3333aa)',
            }}
          />
        )
      })}

      {/* ── Nodes ── */}
      {nodePos.map((p, i) => {
        const isActive = i === s.currentNode
        const isTrying = isActive && s.tryColor !== null
        const isConflict = s.conflictNodes.includes(i) && s.phase === 'conflict'
        const isLocked = s.locked[i] !== undefined
        const isJustLocked = isActive && s.phase === 'locked'
        const fill = getNodeFill(i)
        const stroke = getNodeStroke(i)
        const sw = getNodeStrokeW(i)
        const op = getNodeOpacity(i)

        return (
          <g key={i} style={{ opacity: op, transition: 'opacity 0.4s' }}>
            {/* Pulse ring for active node */}
            {isActive && !isDone && (
              <circle cx={p.x} cy={p.y} r={30}
                fill="none"
                stroke={isTrying ? ROW_COLORS_F[s.tryColor!] : '#ffffff'}
                strokeWidth="1"
                style={{ animation: 'gcRingPulse 1s ease-in-out infinite', opacity: 0.35 }}
              />
            )}
            {/* Done glow ring */}
            {isDone && isLocked && (
              <circle cx={p.x} cy={p.y} r={28}
                fill="none"
                stroke={ROW_COLORS_F[s.locked[i]]}
                strokeWidth="1"
                style={{ animation: 'gcPulse 2s ease-in-out infinite', opacity: 0.4 }}
              />
            )}
            {/* Main circle */}
            <circle cx={p.x} cy={p.y} r={22}
              fill={fill}
              fillOpacity={isTrying ? 0.18 : isLocked ? 0.22 : 0.05}
              stroke={stroke}
              strokeWidth={sw}
              style={{
                transition: 'stroke 0.3s, stroke-width 0.3s',
                filter: isConflict
                  ? 'drop-shadow(0 0 8px #ff333388)'
                  : isJustLocked
                    ? `drop-shadow(0 0 10px ${fill}cc)`
                    : isDone && isLocked
                      ? `drop-shadow(0 0 7px ${fill}88)`
                      : 'none',
                animation: isConflict
                  ? 'gcShake 0.5s ease'
                  : s.phase === 'backtrack' && isActive
                    ? 'gcBacktrack 0.5s ease forwards'
                    : isJustLocked
                      ? 'gcLock 0.6s ease forwards'
                      : isTrying && !isLocked
                        ? 'gcTry 0.4s ease forwards'
                        : 'none',
              }}
            />
            {/* Col label */}
            <text x={p.x} y={p.y - 5} fill={isLocked ? ROW_COLORS_F[s.locked[i]] : isTrying ? ROW_COLORS_F[s.tryColor!] : '#555'}
              fontSize="7.5" fontWeight="800" textAnchor="middle"
              fontFamily="Inter,sans-serif"
              style={{ transition: 'fill 0.3s' }}>
              Col {i + 1}
            </text>
            {/* Color label */}
            {(isLocked || isTrying) && (
              <text x={p.x} y={p.y + 9} fill={isLocked ? ROW_COLORS_F[s.locked[i]] : ROW_COLORS_F[s.tryColor!]}
                fontSize="9.5" fontWeight="700" textAnchor="middle"
                fontFamily="'JetBrains Mono','Fira Code',monospace"
                style={{ animation: 'gcLabelPop 0.35s ease forwards' }}>
                F{isLocked ? s.locked[i] + 1 : (s.tryColor ?? 0) + 1}
              </text>
            )}
          </g>
        )
      })}

      {/* ── Color legend (left panel) ── */}
      <g>
        <rect x={18} y={22} width={150} height={220} rx="6"
          fill="rgba(255,255,255,0.02)" stroke="#252525" strokeWidth="1" />
        <text x={93} y={42} fill="#555" fontSize="8"
          textAnchor="middle" fontFamily="Inter,sans-serif"
          fontWeight="800" letterSpacing="0.1em">8 COLORES = 8 FILAS</text>
        {ROW_COLORS_F.map((col, i) => {
          const isUsed = Object.values(s.locked).includes(i) || (s.tryColor === i && s.currentNode >= 0)
          return (
            <g key={i}>
              <rect x={34} y={54 + i * 22} width={9} height={9} rx="2"
                fill={col} opacity={isUsed ? 1 : 0.3}
                style={{ transition: 'opacity 0.3s' }} />
              <text x={49} y={63 + i * 22}
                fill={isUsed ? col : '#333'} fontSize="9"
                fontFamily="Inter,sans-serif"
                style={{ transition: 'fill 0.3s' }}>
                Fila {i + 1}
              </text>
            </g>
          )
        })}
      </g>



      {/* ── Step label banner ── */}
      <rect x={200} y={340} width={440} height={28} rx="6"
        fill="rgba(0,0,0,0.6)"
        stroke={
          s.phase === 'conflict' ? '#ff333355' :
            s.phase === 'locked' ? '#7dff9a33' :
              s.phase === 'done' ? '#7dff9a55' :
                s.phase === 'backtrack' ? '#ff888833' :
                  `${ACCENT_HEX}22`
        }
        strokeWidth="1" />
      <text x={420} y={359}
        fill={
          s.phase === 'conflict' ? '#ff6666' :
            s.phase === 'locked' ? '#7dff9a' :
              s.phase === 'done' ? '#7dff9a' :
                s.phase === 'backtrack' ? '#ff9966' :
                  ACCENT_HEX
        }
        fontSize="10" fontWeight="700" textAnchor="middle"
        fontFamily="Inter,sans-serif"
        style={{ animation: 'gcBannerFade 0.3s ease forwards' }}>
        {s.label}
      </text>



      {/* ── Footer ── */}
      <text x={420} y={390} fill="#333" fontSize="8.5" textAnchor="middle"
        fontFamily="Inter,sans-serif" letterSpacing="0.08em">
        COLOREO DE GRAFOS · BACKTRACKING · 8 COLUMNAS × 8 FILAS
      </text>
    </svg>
  )
}

// ─── Theory items ─────────────────────────────────────────────────────────────
const theoryItems = [
  'Grafos Dirigidos',
  'Vectores k-Prometedores',
  'DFS / Backtracking',
  'Número de Independencia',
  'Grafos Bipartitos',
  'Coloreo de Grafos',
]

// ─── Approach ─────────────────────────────────────────────────────────────────
const approach = (
  <>
    <p>
      Reformulamos el problema de las ocho reinas como un <strong>grafo dirigido</strong> donde los nodos
      representan configuraciones parciales (vectores <em>k</em>-prometedores) y las aristas son
      las extensiones válidas al agregar una reina. Este enfoque unifica cinco modelos clásicos:
      árbol de búsqueda, conjunto independiente, emparejamiento bipartito y coloreo de grafos.
    </p>
    <p>
      La estrategia central es explorar el grafo mediante <strong>recorrido en profundidad (DFS)</strong>
      con poda agresiva: si un nodo parcial no tiene extensiones válidas, retrocedemos de inmediato
      sin explorar ramas inviables. Las hojas alcanzables con <em>k = 8</em> son exactamente las
      92 soluciones clásicas del problema.
    </p>
  </>
)

// ─── Resolution ───────────────────────────────────────────────────────────────
const resolution = (
  <>
    {/* ── PASO 01 — Vértices como vectores k-prometedores ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0d0d08', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Definición de Vértices</p>
        <VizA />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            Los vértices del grafo son tuplas <strong>V = {'{'}(c₁, c₂, …, cₖ) | 0 ≤ k ≤ 8{'}'}</strong>,
            donde cᵢ es la fila ocupada por la reina en la columna&nbsp;i. La condición estricta es que
            ninguna de las <em>k</em> reinas colocadas se amenace mutuamente — es decir, sin filas,
            columnas ni diagonales compartidas. El vector vacío <strong>()</strong> con k=0
            es la raíz; los vectores con k=8 son las posibles hojas.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 01</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Vectores k-Prometedores</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 02 — Aristas como extensiones válidas / árbol ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0d0c08', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Aristas y Estructura de Árbol</p>
        <VizB />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            Las aristas representan <strong>transiciones de estado válidas</strong>: conectan un nodo
            (c₁,…,cₖ) con su hijo (c₁,…,cₖ, cₖ₊₁), agregando exactamente una reina segura.
            El grafo forma un <strong>árbol con raíz en el vector vacío</strong> porque cada
            configuración parcial se deriva de una única secuencia de decisiones — no existen
            ciclos ni múltiples caminos hacia un mismo estado parcial exacto.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 02</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Estructura de Árbol</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 03 — DFS Backtracking ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#090d09', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Exploración del Grafo · DFS</p>
        <VizC />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            El <strong>recorrido en profundidad (DFS)</strong> implementa el algoritmo de backtracking:
            se desciende por las ramas agregando reinas (k+1) y validando restricciones en cada paso.
            Si un nodo no posee transiciones válidas — ninguna casilla segura en la siguiente columna —
            el algoritmo <strong>retrocede (poda)</strong> al nodo padre sin seguir explorando esa rama.
            Las soluciones finales se encuentran exclusivamente en las hojas del nivel <strong>k = 8</strong>.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 03</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Exploración DFS</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 04 — Número de independencia Q_{8,8} ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0d0d0a', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Teoría de Grafos · Conjunto Independiente</p>
        <VizD />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            En el grafo de 64 casillas donde las aristas conectan casillas que se amenazan,
            el <strong>número de independencia máxima α(Q₈,₈) = 8</strong>: el conjunto máximo de vértices
            que no comparten ninguna arista tiene exactamente 8 elementos. Las{' '}
            <strong>92 soluciones</strong> del problema corresponden de manera biunívoca a los
            92 conjuntos independientes maximales exactos de tamaño 8 en este grafo.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 04</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Número de Independencia</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 05 — Grafo bipartito filas vs columnas ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0d', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Grafo Bipartito · Emparejamiento Perfecto</p>
        <VizE />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            Se modela como <strong>G = (U, V, E)</strong> donde U = {'{'}F₁,…,F₈{'}'} son las filas
            y V = {'{'}C₁,…,C₈{'}'} las columnas. Una solución equivale a un{' '}
            <strong>emparejamiento perfecto de tamaño 8</strong>, bajo la restricción secundaria de que
            para cualquier par de aristas seleccionadas (Fᵤ, Cᵤ) y (Fᵥ, Cᵥ), se debe cumplir
            <strong> |Fᵤ − Fᵥ| ≠ |Cᵤ − Cᵥ|</strong> para evitar conflictos diagonales.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 05</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Grafo Bipartito</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 06 — Coloreo de grafos ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0d0a0d', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Coloreo de Grafos · Backtracking</p>
        <VizF />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            Se modelan los <strong>8 vértices como las 8 columnas</strong> del tablero y los{' '}
            <strong>8 colores como las 8 filas</strong>. Dos vértices (columnas) tienen una arista si
            la asignación de sus colores (filas) violaría las reglas del ajedrez — misma fila o misma
            diagonal. El algoritmo de <strong>coloreo con backtracking</strong> asigna un color único
            a cada vértice validando iterativamente que los vértices adyacentes no compartan color,
            equivalente directo a las restricciones del problema de las ocho reinas.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 06</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Coloreo de Grafos</h3></div>
        </div>
      </div>
    </div>
  </>
)

export default function Problem4() {
  return (
    <ProblemPage
      number="04"
      subject="Teoría de Grafos"
      title="Ocho Reinas como Grafo Dirigido"
      question="¿Cómo se puede reformular el problema de las ocho reinas utilizando teorías de grafos?"
      heroBackground="#1e1c08"
      accent={ACCENT}
      theoryItems={theoryItems}
      approach={approach}
      resolution={resolution}
    />
  )
}
