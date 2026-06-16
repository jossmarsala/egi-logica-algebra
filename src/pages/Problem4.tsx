import ProblemPage from '../components/ProblemPage/ProblemPage'

const ACCENT = 'var(--accent-yellow)'
const ACCENT_HEX = '#F5E642'

const theoryItems = [
  'Grafos y Nodos',
  'Aristas',
  'Caminos',
  'Optimización',
]

const approach = (
  <>
    <p>
      Modelamos las ciudades como <strong>nodos</strong> y las rutas posibles entre ellas como
      <strong> aristas ponderadas</strong>, donde el peso representa la distancia.
      Este enfoque abstracto (Teoría de Grafos) es la forma estándar de resolver
      problemas de enrutamiento y logística.
    </p>
    <p>
      Nuestro objetivo es encontrar el camino con la <strong>menor suma de pesos</strong>
      desde el nodo origen hasta el nodo destino. En lugar de evaluar visualmente,
      se aplican algoritmos determinísticos (como Dijkstra) que exploran sistemáticamente
      los caminos más prometedores, garantizando encontrar la solución matemática óptima.
    </p>
  </>
)

const resolution = (
  <>
    {/* Step 1 */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Estructura del grafo</p>
        <svg
          viewBox="0 0 800 380"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Minimalist Edges */}
          {[
            { x1:160, y1:190, x2:360, y2:90, w:'4' },
            { x1:160, y1:190, x2:360, y2:290, w:'7' },
            { x1:360, y1:90,  x2:560, y2:90, w:'3' },
            { x1:360, y1:290, x2:560, y2:290, w:'2' },
            { x1:360, y1:90,  x2:560, y2:290, w:'5' },
            { x1:360, y1:290, x2:560, y2:90, w:'1' },
            { x1:560, y1:90,  x2:700, y2:190, w:'6' },
            { x1:560, y1:290, x2:700, y2:190, w:'4' },
          ].map((e, i) => (
            <g key={`e-${i}`}>
              <line x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
                stroke="#333" strokeWidth="1" />
              <text x={(e.x1+e.x2)/2} y={(e.y1+e.y2)/2 - 8}
                fill="#666" fontSize="12" fontWeight="400"
                textAnchor="middle" fontFamily="Inter,sans-serif">{e.w}</text>
            </g>
          ))}

          {/* Minimalist Nodes */}
          {[
            { id:'A', cx:160, cy:190 },
            { id:'B', cx:360, cy:90 },
            { id:'C', cx:360, cy:290 },
            { id:'D', cx:560, cy:90 },
            { id:'E', cx:560, cy:290 },
            { id:'F', cx:700, cy:190 },
          ].map((n) => (
            <g key={n.id}>
              <circle cx={n.cx} cy={n.cy} r={24} fill="#0a0a0a" stroke="#555" strokeWidth="1" />
              <text x={n.cx} y={n.cy + 5} fill="#ddd" fontSize="14" fontWeight="400"
                textAnchor="middle" fontFamily="Inter,sans-serif">{n.id}</text>
            </g>
          ))}
          
          <text x={400} y={358} fill="#666" fontSize="10"
            textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.08em">
            GRAFO PONDERADO · NODOS Y ARISTAS
          </text>
        </svg>
      </div>

      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>Las ciudades A–F se modelan como nodos y las rutas como aristas. Cada arista tiene un peso asociado que representa la distancia matemática entre nodos.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 01</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Modelado del Grafo</h3></div>
        </div>
      </div>
    </div>

    {/* Step 2 */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <p className="pp-step-category">Búsqueda del Camino Óptimo</p>
        <svg
          viewBox="0 0 800 380"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Base Edges */}
          {[
            { x1:160, y1:190, x2:360, y2:90 },
            { x1:160, y1:190, x2:360, y2:290 },
            { x1:360, y1:90,  x2:560, y2:90 },
            { x1:360, y1:290, x2:560, y2:290 },
            { x1:360, y1:90,  x2:560, y2:290 },
            { x1:360, y1:290, x2:560, y2:90 },
            { x1:560, y1:90,  x2:700, y2:190 },
            { x1:560, y1:290, x2:700, y2:190 },
          ].map((e, i) => (
            <line key={`base-${i}`} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
              stroke="#222" strokeWidth="1" />
          ))}

          {/* Optimal Path Highlighted */}
          {[
            { x1:160, y1:190, x2:360, y2:290, w:'7' }, // A->C
            { x1:360, y1:290, x2:560, y2:90,  w:'1' }, // C->D
            { x1:560, y1:90,  x2:700, y2:190, w:'6' }, // D->F
          ].map((e, i) => (
            <g key={`opt-${i}`}>
              <line x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
                stroke={ACCENT_HEX} strokeWidth="2" />
              <text x={(e.x1+e.x2)/2} y={(e.y1+e.y2)/2 - 8}
                fill={ACCENT_HEX} fontSize="14" fontWeight="700"
                textAnchor="middle" fontFamily="Inter,sans-serif">{e.w}</text>
            </g>
          ))}

          {/* Nodes */}
          {[
            { id:'A', cx:160, cy:190, active:true },
            { id:'B', cx:360, cy:90, active:false },
            { id:'C', cx:360, cy:290, active:true },
            { id:'D', cx:560, cy:90, active:true },
            { id:'E', cx:560, cy:290, active:false },
            { id:'F', cx:700, cy:190, active:true },
          ].map((n) => (
            <g key={n.id}>
              <circle cx={n.cx} cy={n.cy} r={24} fill="#0a0a0a" 
                stroke={n.active ? ACCENT_HEX : '#333'} strokeWidth={n.active ? '2' : '1'} />
              <text x={n.cx} y={n.cy + 5} fill={n.active ? ACCENT_HEX : '#666'} fontSize="14" fontWeight={n.active ? '700' : '400'}
                textAnchor="middle" fontFamily="Inter,sans-serif">{n.id}</text>
            </g>
          ))}

          <text x={400} y={358} fill="#666" fontSize="10"
            textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.08em">
            CAMINO MÁS CORTO: A → C → D → F (DISTANCIA: 14)
          </text>
        </svg>
      </div>

      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>El algoritmo evalúa las rutas y determina que el camino óptimo es A → C → D → F con un peso total de 14, superando cualquier otra alternativa.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 02</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Ruta Óptima Evaluada</h3></div>
        </div>
      </div>
    </div>
  </>
)

export default function Problem4() {
  return (
    <ProblemPage
      number="04"
      subject="Optimización"
      title="Teoría de Grafos"
      question="¿Cómo encontramos la ruta más corta entre dos ciudades interconectadas con múltiples distancias posibles?"
      heroBackground="#2a2818"
      accent={ACCENT}
      theoryItems={theoryItems}
      approach={approach}
      resolution={resolution}
    />
  )
}
