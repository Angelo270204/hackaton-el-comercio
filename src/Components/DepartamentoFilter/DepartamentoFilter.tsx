import { useState, useEffect } from 'react'
import './DepartamentoFilter.css'

export interface DepartamentoInfo {
  nombre: string
  imagen: string
  candidatos: number
}

interface DepartamentoFilterProps {
  departamentos: DepartamentoInfo[]
  departamentoSeleccionado: string | null
  onSeleccionarDepartamento: (departamento: string | null) => void
}

export function DepartamentoFilter({
  departamentos,
  departamentoSeleccionado,
  onSeleccionarDepartamento,
}: DepartamentoFilterProps) {
  const [expandido, setExpandido] = useState(false)

  const handleClickDepartamento = (nombreDepartamento: string) => {
    if (departamentoSeleccionado === nombreDepartamento) {
      onSeleccionarDepartamento(null)
    } else {
      onSeleccionarDepartamento(nombreDepartamento)
    }
    setExpandido(false)
  }

  const handleLimpiarFiltro = () => {
    onSeleccionarDepartamento(null)
  }

  const handleToggleExpandir = () => {
    setExpandido(!expandido)
  }

  // Cerrar dropdown con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expandido) {
        setExpandido(false)
      }
    }

    if (expandido) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [expandido])

  return (
    <>
      {/* Barra de filtros compacta */}
      <div className="filtros-bar">
        <div className="filtros-bar__container">
          <h3 className="filtros-bar__titulo">Filtros:</h3>
          
          <div className="filtros-bar__opciones">
            <button 
              className={`filtro-btn ${departamentoSeleccionado ? 'filtro-btn--activo' : ''} ${expandido ? 'filtro-btn--expandido' : ''}`}
              onClick={handleToggleExpandir}
            >
              <svg className="filtro-btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {departamentoSeleccionado ? departamentoSeleccionado : 'Departamento'}
              {departamentoSeleccionado && (
                <span className="filtro-btn__badge">{
                  departamentos.find(d => d.nombre === departamentoSeleccionado)?.candidatos || 0
                }</span>
              )}
              <svg className={`filtro-btn__chevron ${expandido ? 'filtro-btn__chevron--arriba' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Espacio para futuros filtros */}
            {/* Ejemplo para filtro de cargo: */}
            {/* 
            <button className="filtro-btn">
              <svg className="filtro-btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Cargo
            </button>
            */}
          </div>

          {departamentoSeleccionado && (
            <button className="filtros-bar__limpiar" onClick={handleLimpiarFiltro}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Sección desplegable de departamentos */}
      {expandido && (
        <div className="departamento-dropdown">
          <div className="departamento-dropdown__contenido">
            <div className="departamento-dropdown__header">
              <h3 className="departamento-dropdown__titulo">Selecciona un Departamento</h3>
              <p className="departamento-dropdown__subtitulo">
                {departamentos.filter(d => d.candidatos > 0).length} de {departamentos.length} departamentos con candidatos
              </p>
            </div>

            <div className="departamento-dropdown__grid">
              {departamentos.map((departamento) => {
                const estaSeleccionado = departamentoSeleccionado === departamento.nombre
                const sinCandidatos = departamento.candidatos === 0
                return (
                  <div
                    key={departamento.nombre}
                    className={`departamento-card ${estaSeleccionado ? 'departamento-card--seleccionado' : ''} ${sinCandidatos ? 'departamento-card--sin-candidatos' : ''}`}
                    onClick={() => !sinCandidatos && handleClickDepartamento(departamento.nombre)}
                    style={{ cursor: sinCandidatos ? 'not-allowed' : 'pointer' }}
                    title={sinCandidatos ? `No hay candidatos registrados en ${departamento.nombre}` : `${departamento.candidatos} candidato(s) en ${departamento.nombre}`}
                  >
                    <div className="departamento-card__imagen-container">
                      <img
                        src={departamento.imagen}
                        alt={`Mapa de ${departamento.nombre}`}
                        className="departamento-card__imagen"
                      />
                      {estaSeleccionado && (
                        <div className="departamento-card__check">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="departamento-card__info">
                      <h3 className="departamento-card__nombre">{departamento.nombre}</h3>
                      <p className="departamento-card__candidatos">
                        {departamento.candidatos === 0 
                          ? 'Sin candidatos' 
                          : `${departamento.candidatos} ${departamento.candidatos === 1 ? 'Candidato' : 'Candidatos'}`
                        }
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}