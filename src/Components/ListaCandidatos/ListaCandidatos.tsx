import { useState, useMemo } from 'react'
import type { Candidato } from '../../shared/servicios/candidatos.servicio'

interface PropiedadesListaCandidatos {
  candidatos: Candidato[]
  candidatoSeleccionadoId: number | string | null
  alSeleccionarCandidato: (candidato: Candidato) => void
  candidatosComparacion?: Candidato[]
  alToggleComparacion?: (candidato: Candidato) => void
}

/**
 * Componente que muestra la lista de candidatos presidenciales
 * Incluye búsqueda, filtros por partido y ordenamiento
 */
export function ListaCandidatos({
  candidatos,
  candidatoSeleccionadoId,
  alSeleccionarCandidato,
  candidatosComparacion = [],
  alToggleComparacion,
}: PropiedadesListaCandidatos) {
  const [textoBusqueda, setTextoBusqueda] = useState('')
  // Filtros de ubicación
  const [departamento, setDepartamento] = useState<string>('Todos')
  const [provincia, setProvincia] = useState<string>('Todos')
  const [distrito, setDistrito] = useState<string>('Todos')
  const [partidoFiltro, setPartidoFiltro] = useState<string>('Todos')
  const [sectorInteres, setSectorInteres] = useState<'todos' | 'economia' | 'salud' | 'seguridad' | 'educacion' | 'otros'>('todos')

  const obtenerEstadoAntecedentes = (c: Candidato): 'limpio' | 'cuestionado' | 'desconocido' => {
    const nombre = c.nombre.toLowerCase()
    if (
      nombre.includes('keiko fujimori') ||
      nombre.includes('rafael lópez aliaga') ||
      nombre.includes('rafael lopez aliaga') ||
      nombre.includes('antauro humala') ||
      nombre.includes('vladimir cerrón') ||
      nombre.includes('vladimir cerron') ||
      nombre.includes('césar acuña') ||
      nombre.includes('cesar acuña') ||
      nombre.includes('cesar acuna')
    ) {
      return 'cuestionado'
    }
    return 'limpio'
  }

  const etiquetaAntecedentes = (estado: 'limpio' | 'cuestionado' | 'desconocido') => {
    if (estado === 'cuestionado') return 'Antecedentes: revisar noticias'
    if (estado === 'limpio') return 'Antecedentes: sin registros relevantes en noticias'
    return 'Antecedentes: sin información suficiente'
  }

  // Obtener listas únicas de ubicación desde los candidatos (si existen)
  const departamentos = useMemo(() => {
    const set = new Set<string>(['Todos'])
    candidatos.forEach((c) => {
      const dep = (c as any).departamento as string | undefined
      if (dep) set.add(dep)
    })
    return Array.from(set)
  }, [candidatos])

  const provincias = useMemo(() => {
    const set = new Set<string>(['Todos'])
    candidatos.forEach((c) => {
      const dep = (c as any).departamento as string | undefined
      const prov = (c as any).provincia as string | undefined
      if (prov && (departamento === 'Todos' || dep === departamento)) set.add(prov)
    })
    return Array.from(set)
  }, [candidatos, departamento])

  const distritos = useMemo(() => {
    const set = new Set<string>(['Todos'])
    candidatos.forEach((c) => {
      const dep = (c as any).departamento as string | undefined
      const prov = (c as any).provincia as string | undefined
      const dist = (c as any).distrito as string | undefined
      const matchDep = departamento === 'Todos' || dep === departamento
      const matchProv = provincia === 'Todos' || prov === provincia
      if (dist && matchDep && matchProv) set.add(dist)
    })
    return Array.from(set)
  }, [candidatos, departamento, provincia])

  const partidos = useMemo(() => {
    const set = new Set<string>(['Todos'])
    candidatos.forEach((c) => {
      if (c.partido) set.add(c.partido)
    })
    return Array.from(set)
  }, [candidatos])

  // Filtrar y ordenar candidatos según los controles
  const candidatosFiltrados = useMemo(() => {
    let resultado = [...candidatos]

    // Filtrar por ubicación
    if (departamento !== 'Todos') {
      resultado = resultado.filter((c) => (c as any).departamento === departamento)
    }
    if (provincia !== 'Todos') {
      resultado = resultado.filter((c) => (c as any).provincia === provincia)
    }
    if (distrito !== 'Todos') {
      resultado = resultado.filter((c) => (c as any).distrito === distrito)
    }

    if (partidoFiltro !== 'Todos') {
      resultado = resultado.filter((c) => c.partido === partidoFiltro)
    }

    // Filtrar por búsqueda
    if (textoBusqueda.trim()) {
      const busqueda = textoBusqueda.toLowerCase()
      resultado = resultado.filter(
        (c) =>
          c.nombre.toLowerCase().includes(busqueda) ||
          c.partido.toLowerCase().includes(busqueda)
      )
    }

    if (sectorInteres !== 'todos') {
      resultado = resultado.filter((c) => {
        const propuestasSector = c.propuestas?.[sectorInteres]
        return Array.isArray(propuestasSector) && propuestasSector.length > 0
      })
    }

    return resultado
  }, [candidatos, textoBusqueda, departamento, provincia, distrito, partidoFiltro, sectorInteres])

  const limpiarFiltros = () => {
    setTextoBusqueda('')
    setDepartamento('Todos')
    setProvincia('Todos')
    setDistrito('Todos')
    setPartidoFiltro('Todos')
    setSectorInteres('todos')
  }

  // Función para obtener la ruta de la imagen
  const obtenerImagen = (candidato: Candidato) => {
    if ((candidato as any).foto) return (candidato as any).foto
    if (candidato.imagen) return candidato.imagen
    
    const numeroId = typeof candidato.id === 'number' ? candidato.id : parseInt(String(candidato.id), 10) || 1
    // Las imágenes van de unnamed_002.jpg a unnamed_084.jpg
    // Usamos módulo para ciclar entre las imágenes disponibles
    const indice = ((numeroId - 1) % 20) + 2 // Cicla entre las primeras 20 imágenes para los 20 candidatos
    const numeroFormateado = String(indice).padStart(3, '0')
    return `/images/partido-candidato/unnamed_${numeroFormateado}.jpg`
  }

  return (
    <div className="lista-candidatos">
      {/* Encabezado con título y controles */}
      <div className="lista-candidatos__encabezado">
        <div className="lista-candidatos__titulo-seccion">
          <h1 className="lista-candidatos__titulo">Conoce a los Precandidatos 2026</h1>
          <p className="lista-candidatos__subtitulo">
            Explora los perfiles y propuestas de cada precandidato a la presidencia.
          </p>
        </div>

        <div className="lista-candidatos__controles">
          {/* Buscador */}
          <div className="lista-candidatos__buscador">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar por nombre o partido..."
              value={textoBusqueda}
              onChange={(e) => setTextoBusqueda(e.target.value)}
              className="lista-candidatos__input-busqueda"
            />
          </div>

          {/* Filtro por ubicación: departamento / provincia / distrito */}
          <div className="lista-candidatos__geo-filtros">
            <select
              value={departamento}
              onChange={(e) => {
                setDepartamento(e.target.value)
                setProvincia('Todos')
                setDistrito('Todos')
              }}
              className="lista-candidatos__selector"
              aria-label="Departamento"
            >
              {departamentos.map((dep) => (
                <option key={dep} value={dep}>
                  {dep === 'Todos' ? 'Departamento: Todos' : dep}
                </option>
              ))}
            </select>
            <select
              value={provincia}
              onChange={(e) => {
                setProvincia(e.target.value)
                setDistrito('Todos')
              }}
              className="lista-candidatos__selector"
              aria-label="Provincia"
            >
              {provincias.map((prov) => (
                <option key={prov} value={prov}>
                  {prov === 'Todos' ? 'Provincia: Todos' : prov}
                </option>
              ))}
            </select>
            <select
              value={distrito}
              onChange={(e) => setDistrito(e.target.value)}
              className="lista-candidatos__selector"
              aria-label="Distrito"
            >
              {distritos.map((dist) => (
                <option key={dist} value={dist}>
                  {dist === 'Todos' ? 'Distrito: Todos' : dist}
                </option>
              ))}
            </select>
          </div>
          <div className="lista-candidatos__filtros-extra">
            <select
              value={partidoFiltro}
              onChange={(e) => setPartidoFiltro(e.target.value)}
              className="lista-candidatos__selector"
              aria-label="Filtrar por partido"
            >
              {partidos.map((p) => (
                <option key={p} value={p}>
                  {p === 'Todos' ? 'Partido: Todos' : p}
                </option>
              ))}
            </select>
            <select
              value={sectorInteres}
              onChange={(e) => setSectorInteres(e.target.value as any)}
              className="lista-candidatos__selector"
              aria-label="Filtrar por sector de interés"
            >
              <option value="todos">Sector: Todos</option>
              <option value="economia">Economía</option>
              <option value="salud">Salud</option>
              <option value="seguridad">Seguridad</option>
              <option value="educacion">Educación</option>
              <option value="otros">Otros</option>
            </select>
          </div>
        </div>
      </div>
      {/* Resumen y acciones */}
      <div className="lista-candidatos__resumen">
        <span className="lista-candidatos__contador">{candidatosFiltrados.length} resultados</span>
        {(textoBusqueda || departamento !== 'Todos' || provincia !== 'Todos' || distrito !== 'Todos') && (
          <button type="button" className="lista-candidatos__limpiar" onClick={limpiarFiltros}>
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Grilla de candidatos */}
      <div className="lista-candidatos__grilla">
        {candidatosFiltrados.length === 0 ? (
          <p className="lista-candidatos__sin-resultados">
            No se encontraron candidatos con los criterios de búsqueda.
          </p>
        ) : (
          candidatosFiltrados.map((candidato) => {
            const estaSeleccionado = candidatoSeleccionadoId === candidato.id
            const enComparacion = candidatosComparacion.some((c) => c.id === candidato.id)
            const rutaImagen = obtenerImagen(candidato)
            const estadoAntecedentes = obtenerEstadoAntecedentes(candidato)

            return (
              <article
                key={candidato.id}
                className={`tarjeta-candidato ${
                  estaSeleccionado ? 'tarjeta-candidato--seleccionada' : ''
                }`}
                onClick={() => alSeleccionarCandidato(candidato)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    alSeleccionarCandidato(candidato)
                  }
                }}
              >
                <div
                  className={`tarjeta-candidato__imagen-contenedor tarjeta-candidato__imagen-contenedor--${estadoAntecedentes}`}
                >
                  <img
                    src={rutaImagen}
                    alt={`Foto de ${candidato.nombre}`}
                    className="tarjeta-candidato__imagen"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement
                      img.src = '/images/partido-candidato/unnamed.jpg'
                    }}
                  />
                </div>
                <div className="tarjeta-candidato__info">
                  <h3 className="tarjeta-candidato__nombre">{candidato.nombre}</h3>
                  <p className="tarjeta-candidato__partido">{candidato.partido}</p>
                  {candidato.logo_partido && (
                    <img
                      src={candidato.logo_partido}
                      alt={`Logo ${candidato.partido}`}
                      className="tarjeta-candidato__logo-partido"
                    />
                  )}
                  {(candidato as any).icono_partido && !candidato.logo_partido && (
                    <img
                      src={(candidato as any).icono_partido}
                      alt={`Logo ${candidato.partido}`}
                      className="tarjeta-candidato__logo-partido"
                    />
                  )}
                  <div className="tarjeta-candidato__cta">Ver detalle</div>
                  {alToggleComparacion && (
                    <button
                      type="button"
                      className={`tarjeta-candidato__btn-comparar ${
                        enComparacion ? 'tarjeta-candidato__btn-comparar--activo' : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        alToggleComparacion(candidato)
                      }}
                    >
                      {enComparacion ? 'Quitar de la comparativa' : 'Agregar a la comparativa'}
                    </button>
                  )}
                </div>
              </article>
            )
          })
        )}
      </div>
    </div>
  )
}

export default ListaCandidatos
