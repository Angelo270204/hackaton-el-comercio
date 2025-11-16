import type { Candidato } from '../../shared/servicios/candidatos.servicio'

interface PropsComparadorCandidatos {
  candidatos: Candidato[]
  onCerrar?: () => void
}

const SECTORES: Array<{ clave: 'economia' | 'salud' | 'seguridad' | 'educacion' | 'otros'; etiqueta: string }> = [
  { clave: 'economia', etiqueta: 'Economía' },
  { clave: 'salud', etiqueta: 'Salud' },
  { clave: 'seguridad', etiqueta: 'Seguridad' },
  { clave: 'educacion', etiqueta: 'Educación' },
  { clave: 'otros', etiqueta: 'Otros' },
]

function obtenerPropuestasPorSector(candidato: Candidato, sectorClave: (typeof SECTORES)[number]['clave']): string[] {
  const propuestas = candidato.propuestas?.[sectorClave]
  if (!propuestas || !Array.isArray(propuestas)) return []
  return propuestas.filter((p) => typeof p === 'string' && p.trim().length > 0)
}

function calcularScoreDesdePropuestas(candidato: Candidato, sectorClave: (typeof SECTORES)[number]['clave']): number {
  const propuestasSector = obtenerPropuestasPorSector(candidato, sectorClave)
  if (!propuestasSector.length) return 0

  const base = Math.min(propuestasSector.length, 5)
  const score = base * 2
  return Math.min(Math.max(score, 1), 10)
}

// Lógica de imagen similar a ListaCandidatos
function obtenerImagenCandidato(candidato: Candidato): string {
  const anyCandidato = candidato as any
  if (anyCandidato.foto) return anyCandidato.foto
  if (candidato.imagen) return candidato.imagen

  const numeroId = typeof candidato.id === 'number' ? candidato.id : parseInt(String(candidato.id), 10) || 1
  const indice = ((numeroId - 1) % 20) + 2
  const numeroFormateado = String(indice).padStart(3, '0')
  return `/images/partido-candidato/unnamed_${numeroFormateado}.jpg`
}

export function ComparadorCandidatos({ candidatos, onCerrar }: PropsComparadorCandidatos) {
  if (!candidatos.length) return null

  return (
    <section className="comparador-candidatos" aria-label="Comparador de candidatos por sectores">
      <header className="comparador-candidatos__header">
        <div>
          <h2 className="comparador-candidatos__titulo">Comparativa de propuestas por sectores</h2>
          <p className="comparador-candidatos__subtitulo">
            Visualiza, en una escala del 1 al 10, cómo se desempeña cada candidato en los temas clave del país.
          </p>
        </div>
        {onCerrar && (
          <button type="button" className="comparador-candidatos__btn-cerrar" onClick={onCerrar}>
            Limpiar comparación
          </button>
        )}
      </header>

      <div className="comparador-candidatos__tarjetas">
        {candidatos.map((candidato) => {
          const rutaImagen = obtenerImagenCandidato(candidato)
          return (
            <article key={candidato.id} className="comparador-candidatos__tarjeta">
              <div className="comparador-candidatos__tarjeta-header">
                <div className="comparador-candidatos__avatar-wrapper">
                  <img
                    src={rutaImagen}
                    alt={`Foto de ${candidato.nombre}`}
                    className="comparador-candidatos__avatar"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement
                      img.src = '/images/partido-candidato/unnamed.jpg'
                    }}
                  />
                </div>
                <div className="comparador-candidatos__chip-partido">{candidato.partido}</div>
                <h3 className="comparador-candidatos__nombre">{candidato.nombre}</h3>
                <p className="comparador-candidatos__cargo">{candidato.cargo_postula}</p>
              </div>

              <div className="comparador-candidatos__scores">
                {SECTORES.map((sector) => {
                  const score = calcularScoreDesdePropuestas(candidato, sector.clave)
                  const porcentaje = (score / 10) * 100
                  const nivelClase =
                    score <= 3
                      ? 'comparador-candidatos__score-bar-fill--bajo'
                      : score <= 7
                      ? 'comparador-candidatos__score-bar-fill--medio'
                      : 'comparador-candidatos__score-bar-fill--alto'

                  return (
                    <div key={sector.clave} className="comparador-candidatos__score-row">
                      <div className="comparador-candidatos__score-info">
                        <span className="comparador-candidatos__score-label">{sector.etiqueta}</span>
                        <span className="comparador-candidatos__score-value">{score}/10</span>
                      </div>
                      <div className="comparador-candidatos__score-bar">
                        <div
                          className={`comparador-candidatos__score-bar-fill ${nivelClase}`}
                          style={{ width: `${porcentaje}%` }}
                        />
                      </div>
                      {score > 0 && (
                        <ul className="comparador-candidatos__propuestas-lista">
                          {obtenerPropuestasPorSector(candidato, sector.clave)
                            .slice(0, 2)
                            .map((propuesta, idx) => (
                              <li key={idx} className="comparador-candidatos__propuesta-item">
                                {propuesta}
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  )
                })}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
