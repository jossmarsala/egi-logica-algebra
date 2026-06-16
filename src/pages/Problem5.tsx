import ProblemPage from '../components/ProblemPage/ProblemPage'

const ACCENT = 'var(--accent-pink)'
const ACCENT_HEX = '#FF2D78'

const theoryItems = [
  'Coord. homogéneas',
  'Traslación',
  'Rotación',
  'Composición matricial',
  'No conmutatividad',
]

const approach = (
  <>
    <p>
      Las transformaciones geométricas se modelan como <strong>matrices en coordenadas homogéneas</strong>,
      una extensión que permite representar traslaciones, rotaciones y escalas con un
      único formalismo matricial, facilitando su composición.
    </p>
    <p>
      La estrategia consiste en derivar explícitamente la matriz de cada transformación elemental,
      luego aplicar la <strong>composición T·R</strong> como producto matricial, y verificar
      el resultado comparando el punto original con su imagen bajo la transformación compuesta.
    </p>
  </>
)

const resolution = (
  <>
    {/* Step 1 */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Matrices elementales</p>
        <svg
          viewBox="0 0 800 380"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Matrix T — Minimalist */}
          <g>
            <text x={195} y={58} fill="#888" fontSize="11" fontWeight="700"
              letterSpacing="0.1em" fontFamily="Inter,sans-serif" textAnchor="middle">T — TRASLACIÓN (2,3)</text>
            {[[1,0,2],[0,1,3],[0,0,1]].map((row, r) =>
              row.map((val, c) => {
                const isParam = (c === 2 && r < 2)
                const col = isParam ? ACCENT_HEX : '#666'
                return (
                  <text key={`t-${r}-${c}`} x={152 + c*72} y={72 + r*64}
                    fill={col} fontSize={isParam ? '30' : '22'} fontWeight={isParam ? '700' : '300'}
                    textAnchor="middle" fontFamily="Inter,sans-serif">{val}</text>
                )
              })
            )}
            {/* Brackets */}
            <path d="M 120 66 L 113 66 L 113 220 L 120 220" stroke="#444" strokeWidth="1.5" fill="none" />
            <path d="M 270 66 L 277 66 L 277 220 L 270 220" stroke="#444" strokeWidth="1.5" fill="none" />
          </g>

          {/* Matrix R — Minimalist */}
          <g>
            <text x={580} y={58} fill="#888" fontSize="11" fontWeight="700"
              letterSpacing="0.1em" fontFamily="Inter,sans-serif" textAnchor="middle">R₄₅° — ROTACIÓN</text>
            {[
              [{v:'√2/2',isCosSin:true},{v:'-√2/2',isCosSin:true},{v:'0',isCosSin:false}],
              [{v:'√2/2',isCosSin:true},{v:'√2/2', isCosSin:true},    {v:'0',isCosSin:false}],
              [{v:'0',isCosSin:false},{v:'0',isCosSin:false},{v:'1',isCosSin:false}],
            ].map((row, r) =>
              row.map((cell, c) => (
                <text key={`r-${r}-${c}`}
                  x={466 + c*88} y={72 + r*64}
                  fill={cell.isCosSin ? ACCENT_HEX : '#666'} fontSize={cell.isCosSin ? '22' : '20'}
                  fontWeight={cell.isCosSin ? '700' : '300'}
                  textAnchor="middle" fontFamily="Inter,sans-serif">{cell.v}</text>
              ))
            )}
            <path d="M 430 66 L 423 66 L 423 220 L 430 220" stroke="#444" strokeWidth="1.5" fill="none" />
            <path d="M 700 66 L 707 66 L 707 220 L 700 220" stroke="#444" strokeWidth="1.5" fill="none" />
          </g>

          <text x={400} y={308} fill="#666" fontSize="11"
            textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.05em">
            COORDENADAS HOMOGÉNEAS — MATRICES 3×3
          </text>
        </svg>
      </div>

      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>Los parámetros de traslación y los factores cos/sin de rotación definen matemáticamente las operaciones en un marco de coordenadas homogéneas.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 01</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Traslación y rotación 45°</h3></div>
        </div>
      </div>
    </div>

    {/* Step 2 */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Aplicación sobre un punto</p>
        <svg
          viewBox="0 0 800 380"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Minimalist Grid and Axes */}
          <line x1={80} y1={190} x2={750} y2={190} stroke="#333" strokeWidth="1" />
          <line x1={390} y1={40} x2={390} y2={340} stroke="#333" strokeWidth="1" />

          {/* Source point p = (1,0) */}
          <circle cx={450} cy={190} r={4} fill="#888" />
          <text x={458} y={180} fill="#888" fontSize="12" fontWeight="400"
            fontFamily="Inter,sans-serif">p = (1, 0)</text>

          {/* Trail arc — pure solid line */}
          <path d="M 450 186 Q 490 140 560 22"
            fill="none" stroke={ACCENT_HEX} strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Dest p' = (3,3) */}
          <circle cx={570} cy={10} r={6} fill={ACCENT_HEX} />
          <text x={582} y={18} fill={ACCENT_HEX} fontSize="14" fontWeight="700"
            fontFamily="Inter,sans-serif">p' = (3, 3)</text>

          {/* Label axis */}
          <text x={380} y={38} fill="#666" fontSize="11" textAnchor="end" fontFamily="Inter,sans-serif">y</text>
          <text x={754} y={193} fill="#666" fontSize="11" fontFamily="Inter,sans-serif">x</text>

          <text x={400} y={358} fill="#666" fontSize="11"
            textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.04em">
            T · p = (1,0,1)ᵀ → (3,3,1)ᵀ — DESPLAZAMIENTO (2,3)
          </text>
        </svg>
      </div>

      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>El punto p = (1, 0) se transforma al aplicar T: la trayectoria ilustra el desplazamiento hasta p' = (3, 3) en el plano.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 02</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Traslación de p = (1, 0)</h3></div>
        </div>
      </div>
    </div>

    {/* Step 3 */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Composición</p>
        <svg
          viewBox="0 0 800 380"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* T box — Just solid outlines */}
          <rect x={100} y={110} width={150} height={150} rx="0" fill="none" stroke="#444" strokeWidth="1" />
          <text x={175} y={188} fill="#888" fontSize="48" fontWeight="300" textAnchor="middle" fontFamily="Inter,sans-serif">T</text>

          {/* Operator */}
          <text x={285} y={194} fill="#666" fontSize="42" fontWeight="300" textAnchor="middle" fontFamily="Inter,sans-serif">·</text>

          {/* R box */}
          <rect x={320} y={110} width={150} height={150} rx="0" fill="none" stroke="#444" strokeWidth="1" />
          <text x={395} y={188} fill="#888" fontSize="48" fontWeight="300" textAnchor="middle" fontFamily="Inter,sans-serif">R₄₅</text>

          {/* = */}
          <text x={505} y={194} fill="#666" fontSize="42" fontWeight="300" textAnchor="middle" fontFamily="Inter,sans-serif">=</text>

          {/* M result box */}
          <rect x={540} y={110} width={150} height={150} rx="0" fill="none" stroke={ACCENT_HEX} strokeWidth="1.5" />
          <text x={615} y={188} fill={ACCENT_HEX} fontSize="48" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">M</text>

          <text x={400} y={305} fill="#666" fontSize="12"
            textAnchor="middle" fontFamily="Inter,sans-serif">T·R ≠ R·T — EL ORDEN DE COMPOSICIÓN IMPORTA</text>
        </svg>
      </div>

      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>M = T·R₄₅° aplica primero la rotación, luego la traslación. El resultado mapea geométricamente en una única operación.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 03</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Transformación compuesta T · R</h3></div>
        </div>
      </div>
    </div>
  </>
)

export default function Problem5() {
  return (
    <ProblemPage
      number="05"
      subject="Geometría"
      title={<>Transformaciones Geométricas</>}
      question="¿Cómo se componen traslación, rotación y escala en un único operador matricial?"
      heroBackground="#1a1220"
      accent={ACCENT}
      theoryItems={theoryItems}
      approach={approach}
      resolution={resolution}
    />
  )
}
