import { useEffect, useState } from 'react'
import { ListaCandidatos } from '../Components/ListaCandidatos'
import { DetallePrecandidatos } from '../Components/DetallePrecandidatos'
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
    setCandidatoSeleccionado(candidato)
  }

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
          />
        </div>

        {/* Columna derecha: Detalle del candidato seleccionado */}
        {candidatoSeleccionado && (
          <div className="candidatos-page__detalle candidatos-page__detalle--visible">
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
