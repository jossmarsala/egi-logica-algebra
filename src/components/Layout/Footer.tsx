export default function Footer() {
  return (
    <footer style={{
      borderTop: 'var(--border-mid)',
      marginTop: '6rem',
      paddingBlock: '2.5rem',
    }}>
      <div className="editorial-container">
        <div className="editorial-grid" style={{ alignItems: 'center' }}>
          <div className="col-6">
            <p className="text-caption">
              Álgebra, Estadística y Lógica Matemática
            </p>
            <p className="text-caption" style={{ marginTop: '0.25rem' }}>
              APOUD Santiago, MARSALA Josefina, MIR Santiago, ROJAS Franco
            </p>
          </div>
          <div className="col-6" style={{ textAlign: 'right' }}>
            <p className="text-caption">Examen Global Integrador</p>
            <p className="text-caption" style={{ marginTop: '0.25rem', color: 'var(--accent-orange)' }}>
              ITU Desarrollo de software
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
