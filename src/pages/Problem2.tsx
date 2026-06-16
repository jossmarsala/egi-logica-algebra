import ProblemPage from '../components/ProblemPage/ProblemPage'

const ACCENT = 'var(--accent-blue)'
const ACCENT_HEX = '#6B7FFF'

const theoryItems = [
  'Media aritmética',
  'Mediana y Moda',
  'Desviación estándar',
  'Datos agrupados',
  'Estadística Descriptiva',
]

const approach = (
  <>
    <p>
      Se parte de un <strong>conjunto de 30 calificaciones</strong> estudiantiles (rango 50–99)
      y se aplica estadística descriptiva para resumirlas en medidas numéricas interpretables.
    </p>
    <p>
      La estrategia consiste en tres etapas: (1) organizar los datos en una
      <strong> tabla de distribución de frecuencias</strong> con cinco intervalos de amplitud 10,
      (2) calcular las medidas de tendencia central —media, mediana y moda— usando las fórmulas
      para datos agrupados, y (3) representar la distribución visualmente para confirmar
      la forma de la curva y detectar posibles asimetrías.
    </p>
  </>
)

const resolution = (
  <>
    {/* Step 1 */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Organización</p>
        <svg
          viewBox="0 0 800 380"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Minimalist Grid lines */}
          <line x1={100} y1={50} x2={100} y2={300} stroke="#333" strokeWidth="1" />
          <line x1={100} y1={300} x2={720} y2={300} stroke="#333" strokeWidth="1" />
          {[60,120,180,240].map(y => (
            <line key={y} x1={100} y1={300 - y} x2={720} y2={300 - y}
              stroke="#222" strokeWidth="1" />
          ))}

          {/* Bars — minimalist outline, modal is solid accent */}
          {[
            { label:'50–59', fi:2,  isModal: false },
            { label:'60–69', fi:5,  isModal: false },
            { label:'70–79', fi:9,  isModal: true },
            { label:'80–89', fi:8,  isModal: false },
            { label:'90–99', fi:6,  isModal: false },
          ].map((bar, i) => {
            const h = bar.fi * 26
            const x = 135 + i * 112
            return (
              <g key={i}>
                <rect x={x} y={300 - h} width={82} height={h}
                  fill={bar.isModal ? ACCENT_HEX : 'none'}
                  stroke={bar.isModal ? ACCENT_HEX : '#444'} 
                  strokeWidth="1.5"
                />
                <text x={x + 41} y={300 - h - 10} fill={bar.isModal ? ACCENT_HEX : '#888'}
                  fontSize="16" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">
                  {bar.fi}
                </text>
                <text x={x + 41} y={318} fill="#666"
                  fontSize="10" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.04em">
                  {bar.label}
                </text>
              </g>
            )
          })}

          <text x={400} y={355} fill="#666" fontSize="10"
            textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.08em">
            DISTRIBUCIÓN DE FRECUENCIAS — 30 DATOS · 5 INTERVALOS
          </text>
        </svg>
      </div>

      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>30 datos organizados en 5 intervalos de amplitud 10. El intervalo modal (70–79) concentra 9 observaciones — el valor más frecuente de la distribución.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 01</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Tabla de frecuencias</h3></div>
        </div>
      </div>
    </div>

    {/* Step 2 */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Tendencia central</p>
        <svg
          viewBox="0 0 800 380"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Curve — pure solid line, no fill */}
          <path d="M 60,295 Q 190,295 270,185 Q 355,75 440,62 Q 525,75 595,185 Q 660,265 720,295"
            fill="none" stroke="#444" strokeWidth="1.5" />

          {/* Mean — accent */}
          <line x1={435} y1={66} x2={435} y2={295}
            stroke={ACCENT_HEX} strokeWidth="1.5" />
          <circle cx={435} cy={66} r={4} fill={ACCENT_HEX} />
          <text x={435} y={52} fill={ACCENT_HEX} fontSize="12" fontWeight="700"
            textAnchor="middle" fontFamily="Inter,sans-serif">x̄ = 78.17</text>

          {/* Median — light gray */}
          <line x1={455} y1={66} x2={455} y2={295}
            stroke="#888" strokeWidth="1.5" />
          <text x={455} y={92} fill="#888" fontSize="11" fontWeight="400"
            fontFamily="Inter,sans-serif" textAnchor="middle">Me = 78.89</text>

          {/* Mode — light gray */}
          <line x1={418} y1={66} x2={418} y2={295}
            stroke="#888" strokeWidth="1.5" />
          <text x={418} y={115} fill="#888" fontSize="11" fontWeight="400"
            fontFamily="Inter,sans-serif" textAnchor="middle">Mo ≈ 78</text>

          <line x1={60} y1={295} x2={720} y2={295} stroke="#333" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>La proximidad entre las tres medidas confirma distribución aproximadamente simétrica y unimodal, característica de distribuciones gaussianas.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 02</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Media ponderada y Mediana</h3></div>
        </div>
      </div>
    </div>
  </>
)

export default function Problem2() {
  return (
    <ProblemPage
      number="02"
      subject="Estadística"
      title="Estadística y Probabilidad"
      question="¿Qué revelan la media, mediana y moda sobre la distribución de 30 calificaciones estudiantiles?"
      heroBackground="#1a2433"
      accent={ACCENT}
      theoryItems={theoryItems}
      approach={approach}
      resolution={resolution}
    />
  )
}
