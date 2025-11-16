import { useEffect, useRef, useState, useMemo } from 'react'
import { ListaCandidatos } from '../Components/ListaCandidatos'
import { DetallePrecandidatos } from '../Components/DetallePrecandidatos'
import { ComparadorCandidatos } from '../Components/ComparadorCandidatos/ComparadorCandidatos'
import { DepartamentoFilter, type DepartamentoInfo } from '../Components/DepartamentoFilter'
import { obtenerCandidatos, type Candidato } from '../shared/servicios/candidatos.servicio'
import '../Components/Style.css'

/**
 * Página principal de candidatos presidenciales 2026
 * Muestra la lista de candidatos a la izquierda y el detalle del seleccionado a la derecha
 */
export function CandidatosPage() {
  const [candidatos, setCandidatos] = useState<Candidato[]>([])
  const [candidatoSeleccionado, setCandidatoSeleccionado] = useState<Candidato | null>(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const detalleRef = useRef<HTMLDivElement | null>(null)
  const [candidatosComparacion, setCandidatosComparacion] = useState<Candidato[]>([])
  const comparadorRef = useRef<HTMLDivElement | null>(null)
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState<string | null>(null)

  // Cargar lista de candidatos al montar el componente
  useEffect(() => {
    async function cargarCandidatos() {
      try {
        setCargando(true)
        console.log('Intentando cargar candidatos...')
        const datos = await obtenerCandidatos()
        console.log('Candidatos cargados:', datos)
        console.log('Total de candidatos:', datos.length)
        setCandidatos(datos)
        setError(null)
      } catch (err) {
        console.error('Error al cargar candidatos:', err)
        setError('No se pudieron cargar los candidatos. Por favor, intenta de nuevo.')
      } finally {
        setCargando(false)
      }
    }

    cargarCandidatos()
  }, [])

  // Manejar selección de candidato
  const manejarSeleccion = (candidato: Candidato) => {
    // Si se selecciona el mismo candidato que ya está abierto, cerrar el panel (toggle)
    setCandidatoSeleccionado((actual) => (actual && actual.id === candidato.id ? null : candidato))
  }

  // Preparar información de departamentos con conteo de candidatos
  const departamentos: DepartamentoInfo[] = useMemo(() => {
    // Lista completa de los 24 departamentos del Perú
    const todosDepartamentos = [
      'Amazonas',
      'Áncash',
      'Apurímac',
      'Arequipa',
      'Ayacucho',
      'Cajamarca',
      'Callao',
      'Cusco',
      'Huancavelica',
      'Huánuco',
      'Ica',
      'Junín',
      'La Libertad',
      'Lambayeque',
      'Lima',
      'Loreto',
      'Madre de Dios',
      'Moquegua',
      'Pasco',
      'Piura',
      'Puno',
      'San Martín',
      'Tacna',
      'Tumbes',
      'Ucayali',
    ]

    // Contar candidatos por departamento
    const departamentosMap = new Map<string, number>()
    
    candidatos.forEach((candidato) => {
      const dept = candidato.departamento
      if (dept) {
        // Normalizar variaciones (sin tilde, etc)
        let deptNormalizado = dept
        if (dept === 'Ancash') deptNormalizado = 'Áncash'
        if (dept === 'Apurimac') deptNormalizado = 'Apurímac'
        if (dept === 'Huanuco') deptNormalizado = 'Huánuco'
        if (dept === 'Junin') deptNormalizado = 'Junín'
        if (dept === 'San Martin') deptNormalizado = 'San Martín'
        
        departamentosMap.set(deptNormalizado, (departamentosMap.get(deptNormalizado) || 0) + 1)
      }
    })

    // Mapeo de nombres de departamentos a imágenes disponibles (24 departamentos del Perú)
    const imagenesMap: Record<string, string> = {
      'Amazonas': '/images/fotos-departamentos/mapa-amazonas.jpg',
      'Áncash': '/images/fotos-departamentos/mapa-ancash.avif',
      'Apurímac': '/images/fotos-departamentos/mapa-apurimac.avif',
      'Arequipa': '/images/fotos-departamentos/mapa-arequipa.jpg',
      'Ayacucho': '/images/fotos-departamentos/mapa-ayacucho.jpg',
      'Cajamarca': '/images/fotos-departamentos/mapa-cajamarca.jpg',
      'Callao': '/images/fotos-departamentos/mapa-lima.avif', // Callao usa imagen de Lima
      'Cusco': '/images/fotos-departamentos/mapa-cusco.jpg',
      'Huancavelica': '/images/fotos-departamentos/mapa-huancavelica.jpg',
      'Huánuco': '/images/fotos-departamentos/mapa-huanuco.avif',
      'Ica': '/images/fotos-departamentos/mapa-ica.jpg',
      'Junín': '/images/fotos-departamentos/mapa-junin.jpg',
      'La Libertad': '/images/fotos-departamentos/mapa-la-libertad.jpg',
      'Lambayeque': '/images/fotos-departamentos/mapa-lambayeque.avif',
      'Lima': '/images/fotos-departamentos/mapa-lima.avif',
      'Loreto': '/images/fotos-departamentos/mapa-loreto.jpg',
      'Madre de Dios': '/images/fotos-departamentos/mapa-madre-dios.avif',
      'Moquegua': '/images/fotos-departamentos/mapa-moquegua.jpg',
      'Pasco': '/images/fotos-departamentos/mapa-pasco.jpg',
      'Piura': '/images/fotos-departamentos/mapa-piura.avif',
      'Puno': '/images/fotos-departamentos/mapa-puno.avif',
      'San Martín': '/images/fotos-departamentos/mapa-san-martin.jpg',
      'Tacna': '/images/fotos-departamentos/mapa-tacna.avif',
      'Tumbes': '/images/fotos-departamentos/mapa-tumbes.jpg',
      'Ucayali': '/images/fotos-departamentos/mapa-ucayali.jpg',
    }

    // Crear array con todos los departamentos, incluso los que tienen 0 candidatos
    return todosDepartamentos
      .map((nombre) => ({
        nombre,
        imagen: imagenesMap[nombre] || '/images/fotos-departamentos/mapa-amazonas.jpg',
        candidatos: departamentosMap.get(nombre) || 0,
      }))
      .sort((a, b) => a.nombre.localeCompare(b.nombre))
  }, [candidatos])

  // Filtrar candidatos por departamento
  const candidatosFiltrados = useMemo(() => {
    if (!departamentoSeleccionado) {
      return candidatos
    }
    return candidatos.filter((candidato) => candidato.departamento === departamentoSeleccionado)
  }, [candidatos, departamentoSeleccionado])

  // Scroll a la lista de candidatos cuando se selecciona un departamento
  const listaCandidatosRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (departamentoSeleccionado && listaCandidatosRef.current) {
      listaCandidatosRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [departamentoSeleccionado])

  // Asegurar que el panel de detalle siempre inicie desde arriba
  useEffect(() => {
    if (candidatoSeleccionado && detalleRef.current) {
      // resetear scroll del contenedor del panel
      detalleRef.current.scrollTop = 0
    }
  }, [candidatoSeleccionado])

  // NO bloqueamos el scroll del body para permitir scroll independiente
  // en la lista de candidatos y en el panel de detalle al mismo tiempo

  // Manejar selección para comparar (hasta 3 candidatos)
  // Manejar selección para comparar (hasta 3 candidatos)
  const manejarToggleComparacion = (candidato: Candidato) => {
    setCandidatosComparacion((actual) => {
      const existe = actual.some((c) => c.id === candidato.id)
      if (existe) {
        return actual.filter((c) => c.id !== candidato.id)
      }
      if (actual.length >= 3) {
        return actual
      }
      return [...actual, candidato]
    })
  }

  useEffect(() => {
    if (candidatosComparacion.length > 0 && comparadorRef.current) {
      comparadorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [candidatosComparacion])

  // Mostrar estado de carga
  if (cargando) {
    return (
      <div className="candidatos-page">
        <div className="candidatos-page__cargando">
          <p>Cargando candidatos...</p>
        </div>
      </div>
    )
  }

  // Mostrar error si hay
  if (error) {
    return (
      <div className="candidatos-page">
        <div className="candidatos-page__error">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="candidatos-page">
      {/* Barra de filtros compacta */}
      <DepartamentoFilter
        departamentos={departamentos}
        departamentoSeleccionado={departamentoSeleccionado}
        onSeleccionarDepartamento={setDepartamentoSeleccionado}
      />

      <div
        className={`candidatos-page__layout ${
          candidatoSeleccionado ? 'candidatos-page__layout--con-detalle' : 'candidatos-page__layout--sin-detalle'
        }`}
      >
        {/* Columna izquierda: Lista de candidatos */}
        <div className="candidatos-page__lista" ref={listaCandidatosRef}>
          {departamentoSeleccionado && candidatosFiltrados.length === 0 ? (
            <div style={{
              padding: '3rem 2rem',
              textAlign: 'center',
              backgroundColor: '#fff3cd',
              border: '2px solid #ffc107',
              borderRadius: '12px',
              margin: '2rem',
            }}>
              <h3 style={{ color: '#856404', marginBottom: '0.75rem', fontSize: '1.25rem' }}>
                No se encontraron candidatos
              </h3>
              <p style={{ color: '#856404', margin: 0, fontSize: '1rem' }}>
                No hay candidatos registrados para <strong>{departamentoSeleccionado}</strong>
              </p>
            </div>
          ) : (
            <ListaCandidatos
              candidatos={candidatosFiltrados}
              candidatoSeleccionadoId={candidatoSeleccionado?.id ?? null}
              alSeleccionarCandidato={manejarSeleccion}
              candidatosComparacion={candidatosComparacion}
              alToggleComparacion={manejarToggleComparacion}
            />
          )}
          {candidatosComparacion.length > 0 && (
            <div className="candidatos-page__comparador-wrapper" ref={comparadorRef}>
              <ComparadorCandidatos
                candidatos={candidatosComparacion}
                onCerrar={() => setCandidatosComparacion([])}
              />
            </div>
          )}
        </div>

        {/* Columna derecha: Detalle del candidato seleccionado */}
        {candidatoSeleccionado && (
          <div ref={detalleRef} className="candidatos-page__detalle candidatos-page__detalle--visible">
            <DetallePrecandidatos
              candidato={candidatoSeleccionado}
              onCerrar={() => setCandidatoSeleccionado(null)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default CandidatosPage
