import type { Candidato } from '../../shared/servicios/candidatos.servicio'

interface PropsComparadorCandidatos {
  candidatos: Candidato[]
  onCerrar?: () => void
}

const SECTORES: Array<{
  clave: 'economia' | 'salud' | 'seguridad' | 'educacion' | 'otros'
  etiqueta: string
  icono: string
  descripcion: string
}> = [
  { clave: 'economia', etiqueta: 'Economía', icono: '💰', descripcion: 'Propuestas económicas y desarrollo' },
  { clave: 'salud', etiqueta: 'Salud', icono: '🏥', descripcion: 'Sistema de salud y bienestar' },
  { clave: 'seguridad', etiqueta: 'Seguridad', icono: '🛡️', descripcion: 'Seguridad ciudadana y orden' },
  { clave: 'educacion', etiqueta: 'Educación', icono: '📚', descripcion: 'Sistema educativo y formación' },
  { clave: 'otros', etiqueta: 'Otros Temas', icono: '🔧', descripcion: 'Otras propuestas relevantes' },
]

function obtenerPropuestasPorSector(
  candidato: Candidato,
  sectorClave: (typeof SECTORES)[number]['clave']
): string[] {
  const propuestas = candidato.propuestas?.[sectorClave]
  if (!propuestas || !Array.isArray(propuestas)) return []
  return propuestas.filter((p) => typeof p === 'string' && p.trim().length > 0)
}

function calcularPuntuacion(
  candidato: Candidato,
  sectorClave: (typeof SECTORES)[number]['clave']
): number {
  const propuestas = obtenerPropuestasPorSector(candidato, sectorClave)
  if (propuestas.length === 0) return 0
  
  // Calcular puntuación: 1 propuesta = 2 puntos, máximo 10
  const puntuacion = Math.min(propuestas.length * 2, 10)
  return puntuacion
}

function obtenerColorPorPuntuacion(puntuacion: number): {
  colorClass: string
  colorBg: string
  colorText: string
} {
  if (puntuacion === 0) {
    return {
      colorClass: 'comparador-apple__barra--sin-datos',
      colorBg: '#e5e7eb',
      colorText: '#9ca3af'
    }
  } else if (puntuacion <= 3) {
    return {
      colorClass: 'comparador-apple__barra--bajo',
      colorBg: 'linear-gradient(90deg, #dc2626, #ef4444)',
      colorText: '#dc2626'
    }
  } else if (puntuacion <= 6) {
    return {
      colorClass: 'comparador-apple__barra--medio',
      colorBg: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
      colorText: '#f59e0b'
    }
  } else {
    return {
      colorClass: 'comparador-apple__barra--alto',
      colorBg: 'linear-gradient(90deg, #16a34a, #22c55e)',
      colorText: '#16a34a'
    }
  }
}

function obtenerImagenCandidato(candidato: Candidato): string {
  const candidatoConFoto = candidato as Candidato & { foto?: string }
  if (candidatoConFoto.foto) return candidatoConFoto.foto
  if (candidato.imagen) return candidato.imagen

  const numeroId = typeof candidato.id === 'number' ? candidato.id : parseInt(String(candidato.id), 10) || 1
  const indice = ((numeroId - 1) % 20) + 2
  const numeroFormateado = String(indice).padStart(3, '0')
  return `/images/partido-candidato/unnamed_${numeroFormateado}.jpg`
}

export function ComparadorCandidatos({ candidatos, onCerrar }: PropsComparadorCandidatos) {
  if (!candidatos.length) return null

  return (
    <section className="comparador-apple" aria-label="Comparador de candidatos">
      {/* Header sticky */}
      <div className="comparador-apple__header-sticky">
        <div className="comparador-apple__header-content">
          <div className="comparador-apple__header-text">
            <h2 className="comparador-apple__titulo">Compara candidatos</h2>
            <p className="comparador-apple__subtitulo">
              Revisa las propuestas lado a lado y elige informado
            </p>
          </div>
          {onCerrar && (
            <button type="button" className="comparador-apple__btn-cerrar" onClick={onCerrar} aria-label="Cerrar comparación">
              <span className="comparador-apple__btn-cerrar-icono">✕</span>
              <span className="comparador-apple__btn-cerrar-texto">Cerrar</span>
            </button>
          )}
        </div>

        {/* Tarjetas de candidatos en el header */}
        <div className="comparador-apple__candidatos-header">
          <div className="comparador-apple__categoria-spacer">
            {/* Espacio para alinear con las categorías */}
          </div>
          {candidatos.map((candidato) => {
            const rutaImagen = obtenerImagenCandidato(candidato)
            return (
              <div key={candidato.id} className="comparador-apple__candidato-card">
                <div className="comparador-apple__candidato-avatar-wrapper">
                  <img
                    src={rutaImagen}
                    alt={candidato.nombre}
                    className="comparador-apple__candidato-avatar"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement
                      img.src = '/images/partido-candidato/unnamed.jpg'
                    }}
                  />
                </div>
                <h3 className="comparador-apple__candidato-nombre">{candidato.nombre}</h3>
                <p className="comparador-apple__candidato-partido">{candidato.partido}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tabla de comparación */}
      <div className="comparador-apple__tabla">
        {/* Datos básicos */}
        <div className="comparador-apple__seccion">
          <div className="comparador-apple__seccion-header">
            <div className="comparador-apple__seccion-icono">ℹ️</div>
            <h3 className="comparador-apple__seccion-titulo">Información General</h3>
          </div>

          {/* Fila: Edad */}
          <div className="comparador-apple__fila">
            <div className="comparador-apple__categoria">
              <span className="comparador-apple__categoria-texto">Edad</span>
            </div>
            {candidatos.map((candidato) => (
              <div key={candidato.id} className="comparador-apple__valor">
                <span className="comparador-apple__valor-texto">
                  {candidato.edad ? `${candidato.edad} años` : 'No disponible'}
                </span>
              </div>
            ))}
          </div>

          {/* Fila: Cargo postula */}
          <div className="comparador-apple__fila">
            <div className="comparador-apple__categoria">
              <span className="comparador-apple__categoria-texto">Cargo</span>
            </div>
            {candidatos.map((candidato) => (
              <div key={candidato.id} className="comparador-apple__valor">
                <span className="comparador-apple__valor-texto">{candidato.cargo_postula}</span>
              </div>
            ))}
          </div>

          {/* Fila: Ideología */}
          <div className="comparador-apple__fila">
            <div className="comparador-apple__categoria">
              <span className="comparador-apple__categoria-texto">Ideología</span>
            </div>
            {candidatos.map((candidato) => (
              <div key={candidato.id} className="comparador-apple__valor">
                <span className="comparador-apple__valor-badge">
                  {candidato.ideologia === 'izquierda' && '🔴 Izquierda'}
                  {candidato.ideologia === 'centro-izquierda' && '🟠 Centro-Izquierda'}
                  {candidato.ideologia === 'centro' && '🟡 Centro'}
                  {candidato.ideologia === 'centro-derecha' && '🔵 Centro-Derecha'}
                  {candidato.ideologia === 'derecha' && '🟣 Derecha'}
                  {!candidato.ideologia && 'No especificada'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Propuestas por sector con puntuación */}
        {SECTORES.map((sector) => (
          <div key={sector.clave} className="comparador-apple__seccion">
            <div className="comparador-apple__seccion-header">
              <div className="comparador-apple__seccion-icono">{sector.icono}</div>
              <div>
                <h3 className="comparador-apple__seccion-titulo">{sector.etiqueta}</h3>
                <p className="comparador-apple__seccion-descripcion">{sector.descripcion}</p>
              </div>
            </div>

            {/* Fila: Puntuación */}
            <div className="comparador-apple__fila">
              <div className="comparador-apple__categoria">
                <span className="comparador-apple__categoria-texto">Puntuación</span>
              </div>
              {candidatos.map((candidato) => {
                const puntuacion = calcularPuntuacion(candidato, sector.clave)
                const { colorClass, colorText } = obtenerColorPorPuntuacion(puntuacion)
                
                return (
                  <div key={candidato.id} className="comparador-apple__valor">
                    <div className="comparador-apple__puntuacion-contenedor">
                      <div className="comparador-apple__puntuacion-header">
                        <span className="comparador-apple__puntuacion-numero" style={{ color: colorText }}>
                          {puntuacion}/10
                        </span>
                        <span className="comparador-apple__puntuacion-label">
                          {puntuacion === 0 ? 'Sin propuestas' : 
                           puntuacion <= 3 ? 'Básico' :
                           puntuacion <= 6 ? 'Moderado' : 'Completo'}
                        </span>
                      </div>
                      <div className="comparador-apple__barra-contenedor">
                        <div 
                          className={`comparador-apple__barra-fill ${colorClass}`}
                          style={{ width: `${(puntuacion / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Fila: Propuestas */}
            <div className="comparador-apple__fila comparador-apple__fila--propuestas">
              <div className="comparador-apple__categoria">
                <span className="comparador-apple__categoria-texto">Propuestas principales</span>
              </div>
              {candidatos.map((candidato) => {
                const propuestas = obtenerPropuestasPorSector(candidato, sector.clave)
                const cantidadPropuestas = propuestas.length

                return (
                  <div key={candidato.id} className="comparador-apple__valor">
                    {propuestas.length > 0 ? (
                      <div className="comparador-apple__propuestas-contenedor">
                        <div className="comparador-apple__propuestas-count">
                          <span className="comparador-apple__propuestas-numero">{cantidadPropuestas}</span>
                          <span className="comparador-apple__propuestas-label">
                            {cantidadPropuestas === 1 ? 'propuesta' : 'propuestas'}
                          </span>
                        </div>
                        <ul className="comparador-apple__propuestas-lista">
                          {propuestas.slice(0, 3).map((propuesta, idx) => (
                            <li key={idx} className="comparador-apple__propuesta-item">
                              <span className="comparador-apple__propuesta-bullet">•</span>
                              <span className="comparador-apple__propuesta-texto">{propuesta}</span>
                            </li>
                          ))}
                          {propuestas.length > 3 && (
                            <li className="comparador-apple__propuesta-item comparador-apple__propuesta-item--mas">
                              <span className="comparador-apple__propuesta-mas">
                                +{propuestas.length - 3} más
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    ) : (
                      <span className="comparador-apple__sin-datos">
                        Sin propuestas registradas
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Experiencia */}
        <div className="comparador-apple__seccion">
          <div className="comparador-apple__seccion-header">
            <div className="comparador-apple__seccion-icono">💼</div>
            <h3 className="comparador-apple__seccion-titulo">Experiencia</h3>
          </div>

          <div className="comparador-apple__fila comparador-apple__fila--propuestas">
            <div className="comparador-apple__categoria">
              <span className="comparador-apple__categoria-texto">Cargos ocupados</span>
            </div>
            {candidatos.map((candidato) => (
              <div key={candidato.id} className="comparador-apple__valor">
                {candidato.cargos_ocupados && candidato.cargos_ocupados.length > 0 ? (
                  <ul className="comparador-apple__lista-simple">
                    {candidato.cargos_ocupados.slice(0, 3).map((cargo, idx) => (
                      <li key={idx} className="comparador-apple__lista-item">
                        {cargo}
                      </li>
                    ))}
                  </ul>
                ) : candidato.experiencia_previa && candidato.experiencia_previa.length > 0 ? (
                  <ul className="comparador-apple__lista-simple">
                    {candidato.experiencia_previa.slice(0, 3).map((experiencia, idx) => (
                      <li key={idx} className="comparador-apple__lista-item">
                        {experiencia}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="comparador-apple__sin-datos">Sin información</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="comparador-apple__footer">
        <p className="comparador-apple__footer-texto">
          💡 La información mostrada se basa en los datos públicos disponibles de cada candidato.
          Te recomendamos investigar más antes de tomar tu decisión.
        </p>
      </div>
    </section>
  )
}