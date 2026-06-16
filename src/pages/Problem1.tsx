import ProblemPage from '../components/ProblemPage/ProblemPage'

const ACCENT = 'var(--accent-orange)'
const C_ORANGE = 'var(--accent-orange)'
const C_PINK = 'var(--accent-pink)'
const C_BLUE = 'var(--accent-blue)'
const C_SAGE = 'var(--accent-sage)'
const C_YELLOW = 'var(--accent-yellow)'

const theoryItems = [
  'Matrices m×n',
  'Producto escalar',
  'No conmutatividad',
  'Matriz Transpuesta',
  'Álgebra Lineal',
]

const approach = (
  <>
    <p>
      Primero, identificamos las variables más importantes para describir las capacidades del equipo: los lenguajes que maneja cada programador, sus años de experiencia y su nivel de dominio. A partir de esta información, decidimos representar los datos mediante tres matrices, de modo que cada una reflejara un aspecto específico del análisis y permitiera trabajar la información de manera ordenada.
    </p>
    <p>
      Luego, planteamos la multiplicación en serie de las matrices para combinar estos tres factores y obtener una visión global del equipo. Con los resultados buscamos identificar qué lenguaje presenta el mayor dominio general, analizar cuáles son las combinaciones más convenientes de habilidades y elaborar una recomendación fundamentada para la asignación de tareas dentro del grupo.
    </p>
  </>
)

const resolution = (
  <>
    {/* Step 1 */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative' }}>
        <p className="pp-step-category">Matriz Transpuesta y Multiplicación</p>
        <svg
          viewBox="0 0 800 380"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <style>{`
              @keyframes fadeSlideRight { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
              .anim-matrix-x { opacity: 0; animation: fadeSlideRight 0.8s ease forwards 0.4s; }
            `}</style>
          </defs>

          {/* Matrix A (4x3) */}
          <text x={150} y={60} fill="#888" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.1em">A</text>
          {[
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
          ].map((row, r) =>
            row.map((val, c) => (
              <text key={`a-${r}-${c}`} x={110 + c * 40} y={120 + r * 45} fill="#ddd" fontSize="22" fontWeight="300" textAnchor="middle" fontFamily="Inter,sans-serif">{val}</text>
            ))
          )}
          <path d="M 95 95 L 85 95 L 85 265 L 95 265" stroke="#444" strokeWidth="1.5" fill="none" />
          <path d="M 205 95 L 215 95 L 215 265 L 205 265" stroke="#444" strokeWidth="1.5" fill="none" />

          <text x={260} y={185} fill={C_PINK} fontSize="28" textAnchor="middle" fontFamily="Inter,sans-serif" fontWeight="300">×</text>

          {/* Matrix B^T (3x4) */}
          <text x={380} y={60} fill="#888" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.1em">B<tspan dy="-5" fontSize="9">T</tspan></text>
          {[
            [3, 3, 3, 6],
            [4, 5, 5, 2],
            [2, 2, 4, 2]
          ].map((row, r) =>
            row.map((val, c) => (
              <text key={`bt-${r}-${c}`} x={320 + c * 40} y={142.5 + r * 45} fill="#ddd" fontSize="22" fontWeight="300" textAnchor="middle" fontFamily="Inter,sans-serif">{val}</text>
            ))
          )}
          <path d="M 305 117.5 L 295 117.5 L 295 242.5 L 305 242.5" stroke="#444" strokeWidth="1.5" fill="none" />
          <path d="M 455 117.5 L 465 117.5 L 465 242.5 L 455 242.5" stroke="#444" strokeWidth="1.5" fill="none" />

          <text x={510} y={185} fill={C_PINK} fontSize="28" textAnchor="middle" fontFamily="Inter,sans-serif" fontWeight="300">=</text>

          {/* Matrix X (4x4) */}
          <g className="anim-matrix-x">
            <text x={615} y={60} fill={C_YELLOW} fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.1em">X</text>
            {[
              [9, 10, 12, 10],
              [9, 10, 12, 10],
              [9, 10, 12, 10],
              [9, 10, 12, 10]
            ].map((row, r) =>
              row.map((val, c) => (
                <text key={`x-${r}-${c}`} x={555 + c * 40} y={120 + r * 45} fill={C_YELLOW} fontSize="22" fontWeight="600" textAnchor="middle" fontFamily="Inter,sans-serif">{val}</text>
              ))
            )}
            <path d="M 540 95 L 530 95 L 530 265 L 540 265" stroke={C_YELLOW} strokeOpacity="0.5" strokeWidth="1.5" fill="none" />
            <path d="M 690 95 L 700 95 L 700 265 L 690 265" stroke={C_YELLOW} strokeOpacity="0.5" strokeWidth="1.5" fill="none" />
          </g>

          <text x={400} y={330} fill="#666" fontSize="12" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.05em">
            A(4×3) × B<tspan dy="-5" fontSize="9">T</tspan><tspan dy="5">(3×4)</tspan> = X(4×4)
          </text>
        </svg>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>Para hacer la multiplicación en serie tuvimos que utilizar la matriz transpuesta de B (cambiando filas por columnas). Al transponer B obtenemos B<sup>T</sup>(3×4), lo que nos permite realizar la multiplicación A(4×3) × B<sup>T</sup>(3×4) y obtener la matriz X(4×4).</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 01</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Multiplicación Inicial</h3></div>
        </div>
      </div>
    </div>

    {/* Step 2 */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative' }}>
        <p className="pp-step-category">Cálculo del Dominio Global</p>
        <svg
          viewBox="0 0 800 380"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <style>{`
              @keyframes fadeSlideRight { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
              .anim-matrix-r { opacity: 0; animation: fadeSlideRight 0.8s ease forwards 0.4s; }
            `}</style>
          </defs>

          {/* Matrix X (4x4) */}
          <text x={170} y={60} fill={C_YELLOW} fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.1em">X</text>
          {[
            [9, 10, 12, 10],
            [9, 10, 12, 10],
            [9, 10, 12, 10],
            [9, 10, 12, 10]
          ].map((row, r) =>
            row.map((val, c) => (
              <text key={`x2-${r}-${c}`} x={110 + c * 40} y={120 + r * 45} fill={C_YELLOW} fillOpacity="0.8" fontSize="22" fontWeight="400" textAnchor="middle" fontFamily="Inter,sans-serif">{val}</text>
            ))
          )}
          <path d="M 95 95 L 85 95 L 85 265 L 95 265" stroke={C_YELLOW} strokeOpacity="0.5" strokeWidth="1.5" fill="none" />
          <path d="M 245 95 L 255 95 L 255 265 L 245 265" stroke={C_YELLOW} strokeOpacity="0.5" strokeWidth="1.5" fill="none" />

          <text x={300} y={185} fill={C_PINK} fontSize="28" textAnchor="middle" fontFamily="Inter,sans-serif" fontWeight="300">×</text>

          {/* Matrix C (4x3) */}
          <text x={390} y={60} fill="#888" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.1em">C</text>
          {[
            [2, 3, 1],
            [2, 3, 2],
            [3, 3, 2],
            [3, 1, 2]
          ].map((row, r) =>
            row.map((val, c) => (
              <text key={`c-${r}-${c}`} x={350 + c * 40} y={120 + r * 45} fill="#ddd" fontSize="22" fontWeight="300" textAnchor="middle" fontFamily="Inter,sans-serif">{val}</text>
            ))
          )}
          <path d="M 335 95 L 325 95 L 325 265 L 335 265" stroke="#444" strokeWidth="1.5" fill="none" />
          <path d="M 445 95 L 455 95 L 455 265 L 445 265" stroke="#444" strokeWidth="1.5" fill="none" />

          <text x={500} y={185} fill={C_PINK} fontSize="28" textAnchor="middle" fontFamily="Inter,sans-serif" fontWeight="300">=</text>

          {/* Matrix R (4x3) */}
          <g className="anim-matrix-r">
            <text x={615} y={60} fill={C_ORANGE} fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.1em">R</text>
            {[
              [104, 103, 73],
              [104, 103, 73],
              [104, 103, 73],
              [104, 103, 73]
            ].map((row, r) =>
              row.map((val, c) => (
                <text key={`r-${r}-${c}`} x={555 + c * 60} y={120 + r * 45} fill={C_ORANGE} fontSize="22" fontWeight="600" textAnchor="middle" fontFamily="Inter,sans-serif">{val}</text>
              ))
            )}
            <path d="M 535 95 L 525 95 L 525 265 L 535 265" stroke={C_ORANGE} strokeOpacity="0.5" strokeWidth="1.5" fill="none" />
            <path d="M 695 95 L 705 95 L 705 265 L 695 265" stroke={C_ORANGE} strokeOpacity="0.5" strokeWidth="1.5" fill="none" />
          </g>

          <text x={400} y={330} fill="#666" fontSize="12" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.05em">
            X(4×4) × C(4×3) = R(4×3)
          </text>
        </svg>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>Finalmente, multiplicamos la matriz X(4×4) por C(4×3). Esto nos arroja la matriz resultante R(4×3), que condensa el nivel de dominio y experiencia combinados de cada programador en relación con los lenguajes evaluados.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 02</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Segunda Multiplicación</h3></div>
        </div>
      </div>
    </div>

    {/* Step 3 */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative' }}>
        <p className="pp-step-category">Análisis de Resultados</p>
        <svg
          viewBox="0 0 800 380"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <style>{`
              @keyframes expandHeight { from { height: 0; opacity: 0; } to { height: 200px; opacity: 0.15; } }
              .anim-col-1 { opacity: 0; animation: expandHeight 0.6s ease forwards 0.3s; }
              .anim-col-2 { opacity: 0; animation: expandHeight 0.6s ease forwards 0.6s; }
            `}</style>
          </defs>

          {/* Columns Highlight */}
          <rect x={350} y={80} width={70} height={200} fill={C_ORANGE} rx="8" className="anim-col-1" />
          <rect x={420} y={80} width={70} height={200} fill={C_SAGE} rx="8" className="anim-col-2" />
          
          <text x={385} y={65} fill={C_ORANGE} fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">Java</text>
          <text x={455} y={65} fill={C_SAGE} fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">Python</text>
          <text x={525} y={65} fill={C_BLUE} fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">C++</text>

          {/* Rows Labels */}
          {["Prog 1", "Prog 2", "Prog 3", "Prog 4"].map((p, i) => (
            <text key={p} x={300} y={115 + i * 50} fill="#888" fontSize="12" fontWeight="600" textAnchor="end" fontFamily="Inter,sans-serif">{p}</text>
          ))}

          {/* Matrix R Values */}
          {[
            [104, 103, 73],
            [104, 103, 73],
            [104, 103, 73],
            [104, 103, 73]
          ].map((row, r) =>
            row.map((val, c) => {
              const colors = [C_ORANGE, C_SAGE, C_BLUE];
              return (
                <text key={`ra-${r}-${c}`} x={385 + c * 70} y={118 + r * 50} fill={colors[c]} fontSize="24" fontWeight={c < 2 ? "700" : "400"} fillOpacity={c < 2 ? 1 : 0.6} textAnchor="middle" fontFamily="Inter,sans-serif">{val}</text>
              )
            })
          )}

          <path d="M 335 85 L 325 85 L 325 275 L 335 275" stroke="#444" strokeWidth="1.5" fill="none" />
          <path d="M 575 85 L 585 85 L 585 275 L 575 275" stroke="#444" strokeWidth="1.5" fill="none" />

          <text x={400} y={330} fill="#888" fontSize="12" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.05em">
            Sinergia óptima identificada entre <tspan fill={C_ORANGE} fontWeight="700">Java</tspan> y <tspan fill={C_SAGE} fontWeight="700">Python</tspan>
          </text>
        </svg>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>Teniendo en cuenta la matriz resultante, el equipo ejerce mayor dominio global sobre Java (columna 1) respecto a cada programador. La sinergia óptima se encuentra entre Java y Python, ya que todos manejan un dominio similar, lo que maximiza la productividad general.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 03</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Identificación de Sinergias</h3></div>
        </div>
      </div>
    </div>

    {/* Step 4 */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative' }}>
        <p className="pp-step-category">Asignación de Tareas</p>
        <svg
          viewBox="0 0 800 380"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <style>{`
              @keyframes drawEdge { from { stroke-dashoffset: 400; } to { stroke-dashoffset: 0; } }
              .anim-edge { stroke-dasharray: 400; stroke-dashoffset: 400; animation: drawEdge 0.8s ease forwards; }
              .delay-1 { animation-delay: 0.2s; }
              .delay-2 { animation-delay: 0.4s; }
              .delay-3 { animation-delay: 0.6s; }
              .delay-4 { animation-delay: 0.8s; }
              
              @keyframes popNode { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
              .anim-node { opacity: 0; animation: popNode 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; transform-origin: 550px center; }
            `}</style>
          </defs>

          {/* Background edges (faint) */}
          {[0,1,2,3].map(p => (
            [0,1,2].map(l => (
              <line key={`edge-${p}-${l}`} x1={250} y1={90 + p * 60} x2={550} y2={120 + l * 70} stroke="#222" strokeWidth="1" />
            ))
          ))}
          
          {/* Active Edges */}
          {/* Prog 1 -> Python (l=1) */}
          <line x1={250} y1={90} x2={550} y2={190} stroke={C_SAGE} strokeWidth="3" className="anim-edge delay-1" />
          {/* Prog 2 -> Python (l=1) */}
          <line x1={250} y1={150} x2={550} y2={190} stroke={C_SAGE} strokeWidth="3" className="anim-edge delay-2" />
          {/* Prog 3 -> C++ (l=2) */}
          <line x1={250} y1={210} x2={550} y2={260} stroke={C_BLUE} strokeWidth="3" className="anim-edge delay-3" />
          {/* Prog 4 -> Java (l=0) */}
          <line x1={250} y1={270} x2={550} y2={120} stroke={C_ORANGE} strokeWidth="3" className="anim-edge delay-4" />

          {/* Programmer Nodes */}
          {["Prog 1", "Prog 2", "Prog 3", "Prog 4"].map((p, i) => (
            <g key={p}>
              <circle cx={250} cy={90 + i * 60} r="18" fill="#111" stroke="#444" strokeWidth="2" />
              <text x={220} y={94 + i * 60} fill="#ccc" fontSize="14" fontWeight="500" textAnchor="end" fontFamily="Inter,sans-serif">{p}</text>
            </g>
          ))}

          {/* Language Nodes */}
          {[
            { l: "Java", c: C_ORANGE, delay: "delay-4", cy: 120 },
            { l: "Python", c: C_SAGE, delay: "delay-1", cy: 190 },
            { l: "C++", c: C_BLUE, delay: "delay-3", cy: 260 }
          ].map((lang) => (
            <g key={lang.l} className={`anim-node ${lang.delay}`} style={{ transformOrigin: `550px ${lang.cy}px` }}>
              <circle cx={550} cy={lang.cy} r="18" fill={lang.c} />
              <text x={580} y={lang.cy + 4} fill="#fff" fontSize="14" fontWeight="600" textAnchor="start" fontFamily="Inter,sans-serif">{lang.l}</text>
            </g>
          ))}

          {/* Annotations */}
          <text x={250} y={50} fill="#888" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.1em">PROGRAMADORES</text>
          <text x={550} y={50} fill="#888" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.1em">LENGUAJES</text>

          <text x={400} y={350} fill="#666" fontSize="11" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.02em">
            Prog 1 (Py, 4y) · Prog 2 (Py, 5y, Lead) · Prog 3 (C++, 4y) · Prog 4 (Java, 6y)
          </text>
        </svg>
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>En base a nivel de dominio y experiencia: Programador 1 (4 años, dominio alto) y Programador 2 (5 años, cargo mayor) a Python. Programador 3 a C++ (4 años de experiencia). Programador 4 (6 años, dominio alto) dedicado a Java. Esto se grafica en un grafo bipartito.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 04</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Grafo Bipartito</h3></div>
        </div>
      </div>
    </div>
  </>
)

export default function Problem1() {
  return (
    <ProblemPage
      number="01"
      subject="Álgebra Lineal"
      title="Matrices"
      question="¿Cómo podemos optimizar el rendimiento de un equipo de desarrollo de software utilizando matrices?"
      heroBackground="var(--color-charcoal)"
      accent={ACCENT}
      theoryItems={theoryItems}
      approach={approach}
      resolution={resolution}
    />
  )
}
