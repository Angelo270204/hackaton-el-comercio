import React, { useState, useEffect } from 'react';
import IdeologyFilter from '../Components/IdeologyFilter';
import { Candidate, IdeologiaFilter } from '../types/candidate';
import { useCandidateFilter } from '../hooks/useCandidateFilter';
import './CandidatosPageExample.css';

/**
 * Página principal de candidatos con filtrado por ideología
 * 
 * Esta página integra:
 * - Filtro por ideología
 * - Lista de candidatos filtrada
 * - Comparador de candidatos (solo con candidatos filtrados)
 */
const CandidatosPageExample: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hook personalizado para filtrado
  const {
    ideologyFilter,
    filteredCandidates,
    setIdeologyFilter,
    filteredCount,
    totalCandidates
  } = useCandidateFilter(candidates);

  // Cargar candidatos desde el JSON
  useEffect(() => {
    const loadCandidates = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/candidatos.json');
        if (!response.ok) {
          throw new Error('Error al cargar los candidatos');
        }
        const data = await response.json();
        setCandidates(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    loadCandidates();
  }, []);

  // Limpiar candidatos seleccionados cuando el filtro cambia
  useEffect(() => {
    // Mantener solo los candidatos seleccionados que coincidan con el filtro actual
    const validSelectedCandidates = selectedCandidates.filter(selected =>
      filteredCandidates.some(filtered => filtered.id === selected.id)
    );

    // Si hay candidatos que ya no son válidos, actualizar la selección
    if (validSelectedCandidates.length !== selectedCandidates.length) {
      setSelectedCandidates(validSelectedCandidates);
    }
  }, [ideologyFilter, filteredCandidates]);

  // Manejar selección de candidatos para comparar
  const handleCandidateSelect = (candidate: Candidate) => {
    const isSelected = selectedCandidates.some(c => c.id === candidate.id);

    if (isSelected) {
      // Deseleccionar
      setSelectedCandidates(prev => prev.filter(c => c.id !== candidate.id));
    } else {
      // Seleccionar (máximo 3 candidatos)
      if (selectedCandidates.length < 3) {
        setSelectedCandidates(prev => [...prev, candidate]);
      } else {
        alert('Solo puedes comparar hasta 3 candidatos a la vez');
      }
    }
  };

  // Limpiar selección
  const clearSelection = () => {
    setSelectedCandidates([]);
  };

  // Renderizar semáforo
  const renderSemaforo = (color?: 'verde' | 'amarillo' | 'rojo') => {
    if (!color) return null;

    const colorMap = {
      verde: '#28a745',
      amarillo: '#ffc107',
      rojo: '#dc3545'
    };

    return (
      <span
        className="semaforo"
        style={{ backgroundColor: colorMap[color] }}
        title={`Estado: ${color}`}
      />
    );
  };

  if (loading) {
    return (
      <div className="candidatos-page">
        <div className="loading">Cargando candidatos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="candidatos-page">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="candidatos-page">
      <header className="candidatos-page__header">
        <h1>Candidatos Presidenciales 2026</h1>
        <p className="candidatos-page__subtitle">
          Conoce las propuestas y trayectoria de los candidatos
        </p>
      </header>

      {/* Filtro por ideología */}
      <IdeologyFilter
        currentValue={ideologyFilter}
        onChange={setIdeologyFilter}
      />

      {/* Información de resultados */}
      <div className="candidatos-page__info">
        <p>
          Mostrando <strong>{filteredCount}</strong> de <strong>{totalCandidates}</strong> candidatos
          {ideologyFilter !== 'todos' && (
            <span> - Filtro: <strong>{ideologyFilter}</strong></span>
          )}
        </p>
      </div>

      {/* Lista de candidatos */}
      <div className="candidatos-list">
        {filteredCandidates.length === 0 ? (
          <div className="no-results">
            No se encontraron candidatos con la ideología seleccionada
          </div>
        ) : (
          filteredCandidates.map(candidate => {
            const isSelected = selectedCandidates.some(c => c.id === candidate.id);

            return (
              <div
                key={candidate.id}
                className={`candidate-card ${isSelected ? 'candidate-card--selected' : ''}`}
              >
                <div className="candidate-card__header">
                  {candidate.foto && (
                    <img
                      src={candidate.foto}
                      alt={candidate.nombre}
                      className="candidate-card__photo"
                    />
                  )}
                  <div className="candidate-card__info">
                    <h3 className="candidate-card__name">{candidate.nombre}</h3>
                    <p className="candidate-card__party">{candidate.partido}</p>
                    <span className="candidate-card__ideology">
                      {candidate.ideologia}
                    </span>
                  </div>
                </div>

                {candidate.propuestasPorSector && candidate.propuestasPorSector.length > 0 && (
                  <div className="candidate-card__proposals">
                    <h4>Propuestas principales:</h4>
                    <ul>
                      {candidate.propuestasPorSector.slice(0, 3).map((propuesta, idx) => (
                        <li key={idx}>
                          <span className="proposal-sector">{propuesta.sector}:</span>{' '}
                          {propuesta.descripcion}
                          {propuesta.semaforo && renderSemaforo(propuesta.semaforo)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="candidate-card__actions">
                  <button
                    className={`btn-select ${isSelected ? 'btn-select--active' : ''}`}
                    onClick={() => handleCandidateSelect(candidate)}
                    disabled={!isSelected && selectedCandidates.length >= 3}
                  >
                    {isSelected ? '✓ Seleccionado' : 'Seleccionar para comparar'}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Panel de comparación */}
      {selectedCandidates.length > 0 && (
        <div className="comparison-panel">
          <div className="comparison-panel__header">
            <h3>Comparar candidatos ({selectedCandidates.length}/3)</h3>
            <button className="btn-clear" onClick={clearSelection}>
              Limpiar selección
            </button>
          </div>

          <div className="comparison-panel__selected">
            {selectedCandidates.map(candidate => (
              <div key={candidate.id} className="selected-candidate">
                <span>{candidate.nombre}</span>
                <button
                  className="btn-remove"
                  onClick={() => handleCandidateSelect(candidate)}
                  aria-label={`Remover ${candidate.nombre}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {selectedCandidates.length >= 2 && (
            <button className="btn-compare">
              Comparar {selectedCandidates.length} candidatos
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CandidatosPageExample;