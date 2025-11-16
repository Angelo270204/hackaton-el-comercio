import { useEffect, useRef, useState } from 'react'
import { ListaCandidatos } from '../Components/ListaCandidatos'
import { DetallePrecandidatos } from '../Components/DetallePrecandidatos'
import { ComparadorCandidatos } from '../Components/ComparadorCandidatos/ComparadorCandidatos'
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

  // Asegurar que el panel de detalle siempre inicie desde arriba
  useEffect(() => {
    if (candidatoSeleccionado && detalleRef.current) {
      // resetear scroll del contenedor del panel
      detalleRef.current.scrollTop = 0
    }
  }, [candidatoSeleccionado])

  // Bloquear scroll del fondo cuando el panel de detalle está abierto
  useEffect(() => {
    const originalOverflow = document.body.style.overflow

    if (candidatoSeleccionado) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = originalOverflow || ''
    }

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [candidatoSeleccionado])

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
      <div
        className={`candidatos-page__layout ${
          candidatoSeleccionado ? 'candidatos-page__layout--con-detalle' : 'candidatos-page__layout--sin-detalle'
        }`}
      >
        {/* Columna izquierda: Lista de candidatos */}
        <div className="candidatos-page__lista">
          <ListaCandidatos
            candidatos={candidatos}
            candidatoSeleccionadoId={candidatoSeleccionado?.id ?? null}
            alSeleccionarCandidato={manejarSeleccion}
            candidatosComparacion={candidatosComparacion}
            alToggleComparacion={manejarToggleComparacion}
          />
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
