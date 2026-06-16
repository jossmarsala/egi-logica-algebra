import ProblemPage from '../components/ProblemPage/ProblemPage'
import MathBlock from '../components/MathBlock/MathBlock'

const ACCENT = 'var(--accent-sage)'
const ACCENT_HEX = '#A8FF3E'

const theoryItems = [
  'Lógica Proposicional',
  'Algoritmos',
  'Fuerza Bruta',
  'Restricciones',
]

const approach = (
  <>
    <p>
      Para empezar, definimos las 3 restricciones básicas del tablero: las reinas no pueden compartir fila, columna ni diagonal. Elegimos programarlo en Python por ser un lenguaje claro y directo. Estructuramos el código dividiéndolo en funciones específicas para generar las combinaciones de tableros, validar cuáles cumplen las reglas lógicas y mostrar las soluciones finales.
    </p>
    <p>
      Por el lado de la lógica proposicional, definimos la variable <MathBlock formula="R_{i,j}" /> para indicar que hay una reina en la fila <em>i</em>, columna <em>j</em>. Para resolver la primera consigna, usamos como ejemplo <MathBlock formula="R_{3,3}" /> verdadero. A partir de ese caso concreto, desarrollamos las proposiciones generales para ubicar las reinas en todo el tablero.
    </p>
  </>
)

const resolution = (
  <>
    {/* Step 1 */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Lógica Proposicional</p>
        <svg
          viewBox="0 0 800 380"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Minimalist 8x8 Board: Just the outlines and the queen. No background fills. */}
          {Array.from({length:8}, (_,r) =>
            Array.from({length:8}, (_,c) => {
              const isQueen = r === 2 && c === 2
              return (
                <rect key={`${r}-${c}`}
                  x={122 + c*58} y={22 + r*42}
                  width={57} height={41}
                  fill="none"
                  stroke={isQueen ? ACCENT_HEX : '#333'}
                  strokeWidth="1"
                />
              )
            })
          )}

          {/* Queen */}
          <text x={151} y={54} fill={ACCENT_HEX} fontSize="24"
            textAnchor="middle">♛</text>

          {/* Row and col lines (Solid lines, no glow) */}
          <line x1={122} y1={102} x2={588} y2={102} stroke={ACCENT_HEX} strokeWidth="1" />
          <line x1={151} y1={22} x2={151} y2={358} stroke={ACCENT_HEX} strokeWidth="1" />

          {/* Diagonals */}
          <line x1={122} y1={22} x2={588} y2={358} stroke="#888" strokeWidth="1" />
          <line x1={588} y1={22} x2={122} y2={358} stroke="#888" strokeWidth="1" />

          {/* Legend */}
          {[
            {color:ACCENT_HEX, label:'Fila / Columna'},
            {color:'#888', label:'Diagonales'},
          ].map((l, i) => (
            <g key={i}>
              <line x1={620} y1={68 + i*44} x2={646} y2={68 + i*44}
                stroke={l.color} strokeWidth="1" />
              <text x={652} y={73 + i*44} fill={l.color} fontSize="11"
                fontWeight="400" fontFamily="Inter,sans-serif">{l.label}</text>
            </g>
          ))}

          <text x={400} y={370} fill="#666" fontSize="10"
            textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.08em">
            R₃,₃ VERDADERO — BLOQUEO DE FILA, COLUMNA Y DIAGONALES
          </text>
        </svg>
      </div>

      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>Con R₃,₃ verdadero, bloqueamos la fila 3, columna 3 y ambas diagonales. Ninguna reina puede ocupar esas posiciones.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 01</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Restricciones: reina en (3,3)</h3></div>
        </div>
      </div>
    </div>

    {/* Step 2 */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Lógica Proposicional</p>
        <svg
          viewBox="0 0 800 380"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Minimalist Formula presentation, no boxes, just text aligned cleanly */}
          {[
            { color:ACCENT_HEX, label:'UNA REINA POR COLUMNA',  formula:'R_{i,1} ∧ R_{i,2} ∧ … ∧ R_{i,8}', y:80 },
            { color:'#888', label:'NO COMPARTIR FILA',      formula:'¬(R_{i,j} ∧ R_{k,j})',             y:180 },
            { color:'#888', label:'NO COMPARTIR DIAGONAL',  formula:'¬(R_{i,j} ∧ R_{k,l})',             y:280 },
          ].map((p, i) => (
            <g key={i}>
              {/* Clean line indicator */}
              <line x1={160} y1={p.y} x2={160} y2={p.y + 40} stroke={p.color} strokeWidth="2" />
              <text x={180} y={p.y + 12} fill={p.color} fontSize="9"
                fontWeight="700" letterSpacing="0.16em" fontFamily="Inter,sans-serif">
                {p.label}
              </text>
              <text x={180} y={p.y + 40} fill="#ddd" fontSize="24"
                fontFamily="Inter,sans-serif" fontWeight="300">
                {p.formula}
              </text>
            </g>
          ))}

          <text x={400} y={358} fill="#666" fontSize="10"
            textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.08em">
            REGLAS GENERALES PARA EL TABLERO 8×8
          </text>
        </svg>
      </div>

      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>Generalizamos las restricciones: una reina por columna, sin compartir filas, ni diagonales entre ningún par de posiciones.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 02</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Modelado de Reglas Generales</h3></div>
        </div>
      </div>
    </div>

    {/* Step 3 — Python code */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Resolución del Algoritmo</p>
        {/* Greyed syntax highlight with accent for important parts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', margin: '3rem 3rem 1rem', maxHeight: 'calc(var(--pp-anim-split, 62%) - 5rem)', overflowY: 'auto' }}>
          
          {/* Column 1 */}
          <pre style={{
            fontSize: '0.62rem', lineHeight: 1.6, color: '#888', background: 'transparent',
            borderLeft: `1px solid ${ACCENT_HEX}`, paddingLeft: '1rem', margin: 0, fontFamily: "'JetBrains Mono','Fira Code','Menlo',monospace", whiteSpace: 'pre-wrap'
          }}>
            <span style={{color:ACCENT_HEX}}>import</span>{' itertools\n\n'}
            <span style={{color:ACCENT_HEX}}>def</span>{' '}
            <span style={{color:ACCENT_HEX}}>probarTodas</span>{'():\n'}
            {'    cols = [1,2,3,4,5,6,7,8]\n'}
            {'    mezclas = itertools.permutations(cols)\n'}
            {'    \n'}
            {'    '}
            <span style={{color:ACCENT_HEX}}>for</span>
            {' mezcla '}
            <span style={{color:ACCENT_HEX}}>in</span>
            {' mezclas:\n'}
            {'        reinas = {}\n'}
            {'        '}
            <span style={{color:ACCENT_HEX}}>for</span>
            {' i '}
            <span style={{color:ACCENT_HEX}}>in</span>
            {' range(8):\n'}
            {'            reinas[i+1] = mezcla[i]\n'}
            {'        \n'}
            {'        '}
            <span style={{color:ACCENT_HEX}}>if</span>
            {' resolver(reinas) == '}
            <span style={{color:ACCENT_HEX}}>True</span>
            {':\n'}
            {'            mostrarTablero(reinas)\n'}
          </pre>

          {/* Column 2 */}
          <pre style={{
            fontSize: '0.62rem', lineHeight: 1.6, color: '#888', background: 'transparent',
            borderLeft: `1px solid #333`, paddingLeft: '1rem', margin: 0, fontFamily: "'JetBrains Mono','Fira Code','Menlo',monospace", whiteSpace: 'pre-wrap'
          }}>
            <span style={{color:ACCENT_HEX}}>def</span>{' '}
            <span style={{color:ACCENT_HEX}}>resolver</span>
            {'(pos: dict):\n'}
            {'    '}
            <span style={{color:ACCENT_HEX}}>for</span>
            {' f1 '}
            <span style={{color:ACCENT_HEX}}>in</span>
            {' pos:\n'}
            {'        c1 = pos[f1]\n'}
            {'        '}
            <span style={{color:ACCENT_HEX}}>for</span>
            {' f2 '}
            <span style={{color:ACCENT_HEX}}>in</span>
            {' pos:\n'}
            {'            c2 = pos[f2]\n'}
            {'            '}
            <span style={{color:ACCENT_HEX}}>if</span>
            {' f1 != f2:\n'}
            {'                '}
            <span style={{color:ACCENT_HEX}}>if</span>
            {' c1 == c2: '}
            <span style={{color:ACCENT_HEX}}>return</span>
            {' '}
            <span style={{color:'#ccc'}}>False</span>{'\n'}
            {'                '}
            <span style={{color:ACCENT_HEX}}>if</span>
            {' c1+f1 == c2+f2: '}
            <span style={{color:ACCENT_HEX}}>return</span>
            {' '}
            <span style={{color:'#ccc'}}>False</span>{'\n'}
            {'                '}
            <span style={{color:ACCENT_HEX}}>if</span>
            {' c1-f1 == c2-f2: '}
            <span style={{color:ACCENT_HEX}}>return</span>
            {' '}
            <span style={{color:'#ccc'}}>False</span>{'\n'}
            {'    \n'}
            {'    '}
            <span style={{color:ACCENT_HEX}}>return</span>
            {' '}
            <span style={{color:ACCENT_HEX}}>True</span>
          </pre>

          {/* Column 3 */}
          <pre style={{
            fontSize: '0.62rem', lineHeight: 1.6, color: '#888', background: 'transparent',
            borderLeft: `1px solid #333`, paddingLeft: '1rem', margin: 0, fontFamily: "'JetBrains Mono','Fira Code','Menlo',monospace", whiteSpace: 'pre-wrap'
          }}>
            <span style={{color:ACCENT_HEX}}>def</span>{' '}
            <span style={{color:ACCENT_HEX}}>mostrarTablero</span>
            {'(pos: dict):\n'}
            {'    '}
            <span style={{color:ACCENT_HEX}}>for</span>
            {' fila '}
            <span style={{color:ACCENT_HEX}}>in</span>
            {' range(1, 9):\n'}
            {'        linea = ""\n'}
            {'        '}
            <span style={{color:ACCENT_HEX}}>for</span>
            {' col '}
            <span style={{color:ACCENT_HEX}}>in</span>
            {' range(1, 9):\n'}
            {'            '}
            <span style={{color:ACCENT_HEX}}>if</span>
            {' pos.get(fila) == col:\n'}
            {'                linea += "♛ "\n'}
            {'            '}
            <span style={{color:ACCENT_HEX}}>else</span>
            {':\n'}
            {'                linea += "· "\n'}
            {'        \n'}
            {'        print(linea)\n'}
          </pre>
        </div>
      </div>

      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>El algoritmo genera todas las permutaciones de columnas y valida las restricciones lógicas sobre cada tablero candidato.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 03</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Implementación en Python</h3></div>
        </div>
      </div>
    </div>
  </>
)

export default function Problem3() {
  return (
    <ProblemPage
      number="03"
      subject="Lógica Computacional"
      title={<>Problema de las Ocho Reinas</>}
      question="¿Cómo podemos colocar ocho damas en un tablero de ajedrez, de manera que no se amenacen entre ellas?"
      heroBackground="#1a2018"
      accent={ACCENT}
      theoryItems={theoryItems}
      approach={approach}
      resolution={resolution}
    />
  )
}
