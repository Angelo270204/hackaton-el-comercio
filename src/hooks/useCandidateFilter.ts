import { useState, useMemo } from 'react';
import { Candidate, IdeologiaFilter } from '../types/candidate';

/**
 * Hook personalizado para manejar el filtrado de candidatos por ideología
 * @param candidates - Array de candidatos a filtrar
 * @returns Objeto con el filtro actual, candidatos filtrados y función para cambiar el filtro
 */
export const useCandidateFilter = (candidates: Candidate[]) => {
  const [ideologyFilter, setIdeologyFilter] = useState<IdeologiaFilter>('todos');

  // Filtra los candidatos basándose en la ideología seleccionada
  const filteredCandidates = useMemo(() => {
    if (ideologyFilter === 'todos') {
      return candidates;
    }
    
    return candidates.filter(candidate => candidate.ideologia === ideologyFilter);
  }, [candidates, ideologyFilter]);

  // Función para cambiar el filtro
  const handleFilterChange = (newFilter: IdeologiaFilter) => {
    setIdeologyFilter(newFilter);
  };

  // Resetear el filtro a 'todos'
  const resetFilter = () => {
    setIdeologyFilter('todos');
  };

  return {
    ideologyFilter,
    filteredCandidates,
    setIdeologyFilter: handleFilterChange,
    resetFilter,
    totalCandidates: candidates.length,
    filteredCount: filteredCandidates.length
  };
};

export default useCandidateFilter;