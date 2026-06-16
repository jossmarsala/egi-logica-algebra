import ProblemPage from '../components/ProblemPage/ProblemPage'

const ACCENT = 'var(--accent-blue)'
const ACCENT_HEX = '#59a7fb' // Using the original P6 specific blue shade

const theoryItems = [
  'Números complejos',
  'Forma polar',
  'Fórmula de Euler',
  'Módulo y argumento',
  'Análisis Complejo',
]

const approach = (
  <>
    <p>
      La función z(t) = e^(it) + (1+2i)z₀ combina dos componentes: <strong>e^(it)</strong>
      describe una rotación uniforme en el círculo unitario, mientras que <strong>(1+2i)z₀</strong>
      aplica una transformación lineal compleja al parámetro z₀.
    </p>
    <p>
      La estrategia es expandir ambas partes usando la <strong>fórmula de Euler</strong>
      y separar parte real e imaginaria. Esto transforma la función compleja en un par
      de ecuaciones paramétricas reales, revelando que la trayectoria de z(t) es un
      círculo de radio 1 centrado en el punto complejo (1+2i)z₀.
    </p>
  </>
)

const resolution = (
  <>
    {/* Step 1 */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Definición de la función</p>
        <svg
          viewBox="0 0 800 380"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Minimalist Axes */}
          <line x1={258} y1={180} x2={545} y2={180} stroke="#333" strokeWidth="1" />
          <line x1={400} y1={58} x2={400} y2={302} stroke="#333" strokeWidth="1" />
          <text x={517} y={194} fill="#666" fontSize="11" fontFamily="Inter,sans-serif">Re</text>
          <text x={386} y={55} fill="#666" fontSize="11" textAnchor="end" fontFamily="Inter,sans-serif">Im</text>

          {/* Unit circle - minimalist outline */}
          <circle cx={400} cy={180} r={115} fill="none"
            stroke="#555" strokeWidth="1" strokeDasharray="4 4" />

          {/* Orbit center and radius */}
          <line x1={400} y1={180} x2={515} y2={180} stroke={ACCENT_HEX} strokeWidth="1.5" />
          <circle cx={515} cy={180} r={4} fill={ACCENT_HEX} />

          {/* Formula text, no box */}
          <text x={180} y={130} fill="#ddd" fontSize="18" fontWeight="400"
            textAnchor="middle" fontFamily="Inter,sans-serif">z(t) = eⁱᵗ + (1+2i)z₀</text>
          <text x={180} y={158} fill={ACCENT_HEX} fontSize="14" fontWeight="700"
            textAnchor="middle" fontFamily="Inter,sans-serif">eⁱᵗ = cos(t) + i·sin(t)</text>
          
          <text x={400} y={348} fill="#666" fontSize="10"
            textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.08em">
            ROTACIÓN UNIFORME SOBRE EL CÍRCULO UNITARIO
          </text>
        </svg>
      </div>

      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>La función parte de e^(it) = cos(t) + i·sin(t) — la fórmula de Euler — que describe una rotación uniforme sobre el círculo unitario en el plano complejo.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 01</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">z(t) y la fórmula de Euler</h3></div>
        </div>
      </div>
    </div>

    {/* Step 2 */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Expansión algebraica</p>
        <svg
          viewBox="0 0 800 380"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Minimalist Formula lines */}
          {[
            { y:82,  label:'EXPANSIÓN', formula:'(1+2i)(a+bi) = (a − 2b) + (b + 2a)i', color: '#888' },
            { y:182, label:'PARTE REAL', formula:'Re z(t) = cos(t) + (a − 2b)',         color: ACCENT_HEX },
            { y:282, label:'PARTE IMAG', formula:'Im z(t) = sin(t) + (b + 2a)',         color: '#888'  },
          ].map((p, i) => (
            <g key={i}>
              <line x1={120} y1={p.y} x2={120} y2={p.y + 40} stroke={p.color} strokeWidth="2" />
              <text x={140} y={p.y + 12} fill={p.color} fontSize="9"
                fontWeight="700" letterSpacing="0.16em" fontFamily="Inter,sans-serif">{p.label}</text>
              <text x={140} y={p.y + 40} fill="#ddd" fontSize="24"
                fontFamily="Inter,sans-serif" fontWeight="300">{p.formula}</text>
            </g>
          ))}

          <text x={400} y={358} fill="#666" fontSize="10"
            textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.08em">
            z₀ = a + bi · SEPARACIÓN EN COMPONENTES REALES
          </text>
        </svg>
      </div>

      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>La expansión algebraica separa z(t) en parte real e imaginaria, revelando la estructura geométrica paramétrica de la trayectoria.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 02</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Separación real e imaginaria</h3></div>
        </div>
      </div>
    </div>

    {/* Step 3 */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Interpretación geométrica</p>
        <svg
          viewBox="0 0 800 380"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Minimalist Axes */}
          <line x1={80} y1={200} x2={720} y2={200} stroke="#333" strokeWidth="1" />
          <line x1={400} y1={40} x2={400} y2={360} stroke="#333" strokeWidth="1" />

          {/* Origin dot */}
          <circle cx={400} cy={200} r={3} fill="#666" />
          <text x={408} y={214} fill="#666" fontSize="11"
            fontFamily="Inter,sans-serif">O</text>

          {/* Center c */}
          <circle cx={510} cy={120} r={4} fill="#888" />
          <text x={522} y={114} fill="#888" fontSize="12" fontWeight="400"
            fontFamily="Inter,sans-serif">c = (1+2i)z₀</text>

          {/* Circle of radius 1 — minimalist accent stroke */}
          <circle cx={510} cy={120} r={96} fill="none"
            stroke={ACCENT_HEX} strokeWidth="1.5" />

          {/* Radius annotation */}
          <line x1={510} y1={120} x2={606} y2={120}
            stroke="#666" strokeWidth="1" strokeDasharray="4 2" />
          <text x={558} y={112} fill="#888" fontSize="12"
            fontFamily="Inter,sans-serif" textAnchor="middle" fontWeight="400">r = 1</text>

          <text x={400} y={370} fill="#666" fontSize="10"
            textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.08em">
            CENTRO c = (1+2i)·z₀ · RADIO = 1
          </text>
        </svg>
      </div>

      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>z(t) traza un círculo de radio 1 centrado en c = (1+2i)·z₀. La transformación lineal desplaza el centro del círculo de la órbita de Euler.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 03</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Centro y radio de la trayectoria</h3></div>
        </div>
      </div>
    </div>
  </>
)

export default function Problem6() {
  return (
    <ProblemPage
      number="06"
      subject="Análisis Complejo"
      title="Números Complejos"
      question="¿Qué trayectoria geométrica describe z(t) = e^(it) + (1+2i)z₀ en el plano complejo?"
      heroBackground="#0d1a20"
      accent={ACCENT}
      theoryItems={theoryItems}
      approach={approach}
      resolution={resolution}
    />
  )
}
