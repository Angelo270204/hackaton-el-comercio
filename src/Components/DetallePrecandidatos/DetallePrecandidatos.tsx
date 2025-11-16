import { useState } from 'react'
import type { Candidato } from '../../shared/servicios/candidatos.servicio'

interface PropiedadesDetallePrecandidatos {
  candidato: Candidato | null
  onCerrar?: () => void
}

// Función utilitaria: retorna un avatar determinístico según el id
// Se usa la carpeta public/images/partido-candidato con archivos unnamed_###.jpg/png
const totalAvatares = 84 // según los recursos encontrados
function rutaAvatarPorId(id: number | string) {
  const num = typeof id === 'number' ? id : parseInt(String(id), 10) || 1
  const idx = ((num - 1) % totalAvatares) + 2 // del 2 al 84
  const pad = String(idx).padStart(3, '0')
  // Intento principal .jpg; si falla, en <img onError> caerá al genérico
  return `/images/partido-candidato/unnamed_${pad}.jpg`
}

// Texto de apoyo cuando no existan propuestas en el JSON
const SIN_PROPUESTAS = [
  'Aún no se registraron propuestas oficiales para esta área.',
  'Vuelve pronto: se actualizará con el plan del precandidato.',
]

type Pestaña = 'economia' | 'salud' | 'seguridad' | 'educacion' | 'otros'

/**
 * Componente que muestra el detalle completo de un candidato seleccionado
 * Incluye foto, información personal y propuestas organizadas por categorías
 */
export function DetallePrecandidatos({ candidato, onCerrar }: PropiedadesDetallePrecandidatos) {
  const [pestana, setPestana] = useState<Pestaña>('economia')

  /**
   * Sistema mejorado de evaluación de antecedentes con 3 niveles:
   * - 'limpio' (verde): Sin investigaciones, condenas ni denuncias relevantes
   * - 'observado' (amarillo/naranja): Tiene investigaciones en curso o denuncias sin condena
   * - 'cuestionado' (rojo): Tiene condenas, múltiples investigaciones o casos graves
   */
  const obtenerEstadoAntecedentes = (c: Candidato): 'limpio' | 'observado' | 'cuestionado' => {
    // Si el candidato tiene información de antecedentes estructurada
    if (c.antecedentes) {
      const { tiene_condenas, tiene_investigaciones, tiene_denuncias } = c.antecedentes
      
      // ROJO: Tiene condenas confirmadas
      if (tiene_condenas) {
        return 'cuestionado'
      }
      
      // NARANJA: Tiene investigaciones en curso o denuncias
      if (tiene_investigaciones || tiene_denuncias) {
        return 'observado'
      }
      
      // VERDE: Sin antecedentes relevantes
      return 'limpio'
    }
    
    // Fallback: evaluación por nombre (casos conocidos públicamente)
    const nombre = c.nombre.toLowerCase()
    
    // ROJO: Candidatos con condenas o casos muy graves
    if (
      nombre.includes('keiko fujimori') ||
      nombre.includes('antauro humala') ||
      nombre.includes('vladimir cerrón') ||
      nombre.includes('vladimir cerron')
    ) {
      return 'cuestionado'
    }
    
    // NARANJA: Candidatos con investigaciones o denuncias
    if (
      nombre.includes('rafael lópez aliaga') ||
      nombre.includes('rafael lopez aliaga') ||
      nombre.includes('césar acuña') ||
      nombre.includes('cesar acuña') ||
      nombre.includes('cesar acuna') ||
      nombre.includes('george forsyth')
    ) {
      return 'observado'
    }
    
    // VERDE: Sin información negativa conocida
    return 'limpio'
  }

  // Contenido de propuestas por pestaña (si no hay, usar texto de placeholder)
  function propuestasDe(c: Candidato | null, p: Pestaña) {
    if (!c) return SIN_PROPUESTAS
    const arr = c.propuestas?.[p]
    return arr && arr.length > 0 ? arr : SIN_PROPUESTAS
  }

  // Si no hay candidato seleccionado, mostrar mensaje
  if (!candidato) {
    return (
      <div className="detalle-precandidatos">
        <div className="detalle-precandidatos__vacio">
          <p>Selecciona un precandidato para ver sus propuestas y perfil completo.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="detalle-precandidatos">
      {onCerrar && (
        <button
          type="button"
          className="detalle-precandidatos__btn-cerrar"
          aria-label="Cerrar panel de detalle"
          onClick={onCerrar}
        >
          ×
        </button>
      )}
      <div className="detalle-precandidatos__contenido">
        {/* Perfil del candidato */}
        <div className="detalle-precandidatos__perfil">
          <img
            className="detalle-precandidatos__avatar"
            src={(() => {
              const directa = (candidato as any).foto || candidato.imagen
              if (directa) return directa
              const slug = String(candidato.nombre)
                .toLowerCase()
                .normalize('NFD')
                .replace(/\p{Diacritic}/gu, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
              return `/images/partido-candidato/${slug}.jpg`
            })()}
            alt={`Avatar de ${candidato.nombre}`}
            onError={(ev) => {
              ;(ev.currentTarget as HTMLImageElement).src = '/images/partido-candidato/unnamed.jpg'
            }}
          />
          <div className="detalle-precandidatos__info-basica">
            <h2 className="detalle-precandidatos__nombre">{candidato.nombre}</h2>
            <p className="detalle-precandidatos__partido">{candidato.partido}</p>
            <p className="detalle-precandidatos__cargo">{candidato.cargo_postula}</p>
          </div>
        </div>

        {/* Datos del precandidato */}
        <div className="detalle-precandidatos__resumen">
          <h4 className="detalle-precandidatos__seccion-titulo">Datos del Precandidato</h4>
          {candidato.edad && (
            <p className="detalle-precandidatos__rol">
              <strong>Edad:</strong> {candidato.edad} años
            </p>
          )}
          <p className="detalle-precandidatos__rol">
            <strong>Rol público:</strong>{' '}
            {candidato.datos_publicos?.rol_publico ?? 'Sin registro público.'}
          </p>
          <p className="detalle-precandidatos__elecciones-previas">
            <strong>Elecciones previas:</strong>{' '}
            {candidato.datos_publicos?.elecciones_previas ?? 'No ha participado anteriormente'}
          </p>
          <div className="detalle-precandidatos__antecedentes">
            {(() => {
              const estado = obtenerEstadoAntecedentes(candidato)
              const etiqueta =
                estado === 'cuestionado'
                  ? 'Antecedentes: Tiene condenas o casos graves - Revisar noticias'
                  : estado === 'observado'
                  ? 'Antecedentes: Investigaciones o denuncias en curso'
                  : 'Antecedentes: Sin registros negativos relevantes'
              return (
                <>
                  <span
                    className={
                      'detalle-precandidatos__antecedentes-indicador ' +
                      (estado === 'cuestionado'
                        ? 'detalle-precandidatos__antecedentes-indicador--rojo'
                        : estado === 'observado'
                        ? 'detalle-precandidatos__antecedentes-indicador--naranja'
                        : 'detalle-precandidatos__antecedentes-indicador--verde')
                    }
                    aria-hidden="true"
                  />
                  <span className="detalle-precandidatos__antecedentes-texto">{etiqueta}</span>
                  {(estado === 'cuestionado' || estado === 'observado') && (
                    <a
                      href={`https://elcomercio.pe/buscar/${candidato.nombre.toLowerCase().replace(/\s+/g, '+')}/todas/descendiente/?query=${candidato.nombre.toLowerCase().replace(/\s+/g, '+')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="detalle-precandidatos__antecedentes-boton"
                    >
                      Ver noticias en El Comercio
                    </a>
                  )}
                </>
              )
            })()}
          </div>
          {candidato.formacion_academica && candidato.formacion_academica.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <strong style={{ fontSize: 13 }}>Formación académica:</strong>
              <ul style={{ marginTop: 6, paddingLeft: 20, fontSize: 13 }}>
                {candidato.formacion_academica.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: 4 }}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {candidato.experiencia_previa && candidato.experiencia_previa.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <strong style={{ fontSize: 13 }}>Experiencia previa:</strong>
              <ul style={{ marginTop: 6, paddingLeft: 20, fontSize: 13 }}>
                {candidato.experiencia_previa.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: 4 }}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {candidato.cargos_ocupados && candidato.cargos_ocupados.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <strong style={{ fontSize: 13 }}>Cargos ocupados:</strong>
              <ul style={{ marginTop: 6, paddingLeft: 20, fontSize: 13 }}>
                {candidato.cargos_ocupados.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: 4 }}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Hoja de Vida */}
        <div className="detalle-precandidatos__hoja-vida">
          <h3 className="detalle-precandidatos__hoja-vida-titulo">Hoja de Vida</h3>
          
          {candidato.trayectoria && (
            <div className="detalle-precandidatos__hoja-vida-seccion">
              <h4 className="detalle-precandidatos__hoja-vida-subtitulo">Trayectoria</h4>
              <p className="detalle-precandidatos__hoja-vida-texto">{candidato.trayectoria}</p>
            </div>
          )}

          {candidato.educacion && candidato.educacion.length > 0 && (
            <div className="detalle-precandidatos__hoja-vida-seccion">
              <h4 className="detalle-precandidatos__hoja-vida-subtitulo">Educación</h4>
              <ul className="detalle-precandidatos__hoja-vida-lista">
                {candidato.educacion.map((item, idx) => (
                  <li key={idx} className="detalle-precandidatos__hoja-vida-item">{item}</li>
                ))}
              </ul>
            </div>
          )}

          {candidato.logros && candidato.logros.length > 0 && (
            <div className="detalle-precandidatos__hoja-vida-seccion">
              <h4 className="detalle-precandidatos__hoja-vida-subtitulo">Logros Relevantes</h4>
              <ul className="detalle-precandidatos__hoja-vida-lista">
                {candidato.logros.map((item, idx) => (
                  <li key={idx} className="detalle-precandidatos__hoja-vida-item">{item}</li>
                ))}
              </ul>
            </div>
          )}

          {!candidato.trayectoria && (!candidato.educacion || candidato.educacion.length === 0) && (!candidato.logros || candidato.logros.length === 0) && (
            <p className="detalle-precandidatos__sin-datos">
              No hay información de hoja de vida registrada para este precandidato.
            </p>
          )}
        </div>

        {/* Actividades Recientes */}
        <div className="detalle-precandidatos__actividades">
          <h3 className="detalle-precandidatos__actividades-titulo">Actividades Recientes</h3>
          {candidato.actividades && candidato.actividades.length > 0 ? (
            <div className="detalle-precandidatos__actividades-lista">
              {candidato.actividades.map((actividad, idx) => (
                <div key={idx} className="detalle-precandidatos__actividad-item">
                  <p className="detalle-precandidatos__actividad-fecha">{actividad.fecha}</p>
                  <h4 className="detalle-precandidatos__actividad-titulo">{actividad.titulo}</h4>
                  <p className="detalle-precandidatos__actividad-descripcion">{actividad.descripcion}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="detalle-precandidatos__sin-datos">
              No hay actividades recientes registradas para este precandidato.
            </p>
          )}
        </div>

        {/* Noticias */}
        <div className="detalle-precandidatos__noticias" id="detalle-precandidatos-noticias">
          <h3 className="detalle-precandidatos__noticias-titulo">Noticias Relacionadas</h3>
          {candidato.noticias && candidato.noticias.length > 0 ? (
            <div className="detalle-precandidatos__noticias-grid">
              {candidato.noticias.map((noticia, idx) => (
                <div key={idx} className="detalle-precandidatos__noticia-card">
                  <div className="detalle-precandidatos__noticia-header">
                    <span className="detalle-precandidatos__noticia-fecha">{noticia.fecha}</span>
                    {noticia.fuente && (
                      <span className="detalle-precandidatos__noticia-fuente">{noticia.fuente}</span>
                    )}
                  </div>
                  <h4 className="detalle-precandidatos__noticia-titulo">{noticia.titulo}</h4>
                  <p className="detalle-precandidatos__noticia-descripcion">{noticia.descripcion}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="detalle-precandidatos__sin-datos">
              No hay noticias registradas para este precandidato.
            </p>
          )}
        </div>

        {/* Propuestas del Precandidato */}
        <div className="detalle-precandidatos__propuestas-seccion">
          <h3 className="detalle-precandidatos__propuestas-titulo">Propuestas del Precandidato</h3>

          {/* Pestañas de categorías */}
          <div className="detalle-precandidatos__tabs" role="tablist">
            {(['economia', 'salud', 'seguridad', 'educacion', 'otros'] as Pestaña[]).map((p) => (
              <button
                key={p}
                role="tab"
                className={`detalle-precandidatos__tab ${
                  pestana === p ? 'detalle-precandidatos__tab--activo' : ''
                }`}
                onClick={() => setPestana(p)}
              >
                {p === 'economia'
                  ? 'Economía'
                  : p === 'salud'
                  ? 'Salud'
                  : p === 'seguridad'
                  ? 'Seguridad'
                  : p === 'educacion'
                  ? 'Educación'
                  : 'Otros'}
              </button>
            ))}
          </div>

          {/* Lista de propuestas */}
          <div className="detalle-precandidatos__propuestas-lista">
            {propuestasDe(candidato, pestana).length > 0 &&
            propuestasDe(candidato, pestana)[0] !==
              'Este precandidato aún no registra propuestas en esta categoría.' ? (
              propuestasDe(candidato, pestana).map((texto, indice) => (
                <div key={indice} className="detalle-precandidatos__propuesta-item">
                  <h4 className="detalle-precandidatos__propuesta-titulo">
                    {indice === 0 ? 'Propuesta Principal' : `Propuesta ${indice + 1}`}
                  </h4>
                  <p className="detalle-precandidatos__propuesta-texto">{texto}</p>
                </div>
              ))
            ) : (
              <p className="detalle-precandidatos__sin-datos">
                Este precandidato aún no registra propuestas en esta categoría.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetallePrecandidatos
