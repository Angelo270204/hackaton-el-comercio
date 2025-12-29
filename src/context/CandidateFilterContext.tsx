import React, { createContext, useContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Candidate, IdeologiaFilter } from '../types/candidate';
import { filterCandidatesByIdeology, cleanSelectedCandidates } from '../utils/candidateUtils';

/**
 * Interface para el estado del contexto de filtrado de candidatos
 */
interface CandidateFilterContextState {
  // Datos
  candidates: Candidate[];
  filteredCandidates: Candidate[];
  selectedCandidates: Candidate[];
  
  // Filtro
  ideologyFilter: IdeologiaFilter;
  
  // Acciones
  setCandidates: (candidates: Candidate[]) => void;
  setIdeologyFilter: (filter: IdeologiaFilter) => void;
  selectCandidate: (candidate: Candidate) => void;
  deselectCandidate: (candidateId: string | number) => void;
  toggleCandidateSelection: (candidate: Candidate) => void;
  clearSelection: () => void;
  resetFilter: () => void;
  
  // Utilidades
  isCandidateSelected: (candidateId: string | number) => boolean;
  canSelectMore: boolean;
  totalCandidates: number;
  filteredCount: number;
  selectedCount: number;
}

/**
 * Props para el Provider
 */
interface CandidateFilterProviderProps {
  children: ReactNode;
  maxSelection?: number;
}

// Crear el contexto
const CandidateFilterContext = createContext<CandidateFilterContextState | undefined>(undefined);

/**
 * Provider del contexto de filtrado de candidatos
 * 
 * Ejemplo de uso:
 * 
 * ```tsx
 * <CandidateFilterProvider maxSelection={3}>
 *   <App />
 * </CandidateFilterProvider>
 * ```
 */
export const CandidateFilterProvider: React.FC<CandidateFilterProviderProps> = ({
  children,
  maxSelection = 3
}) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [ideologyFilter, setIdeologyFilterState] = useState<IdeologiaFilter>('todos');
  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>([]);

  // Calcular candidatos filtrados
  const filteredCandidates = useMemo(() => {
    return filterCandidatesByIdeology(candidates, ideologyFilter);
  }, [candidates, ideologyFilter]);

  // Cambiar filtro y limpiar selección si es necesario
  const setIdeologyFilter = (filter: IdeologiaFilter) => {
    setIdeologyFilterState(filter);
    
    // Limpiar candidatos seleccionados que ya no están en la lista filtrada
    setSelectedCandidates(prev => {
      const newFiltered = filterCandidatesByIdeology(candidates, filter);
      return cleanSelectedCandidates(prev, newFiltered);
    });
  };

  // Seleccionar un candidato
  const selectCandidate = (candidate: Candidate) => {
    if (selectedCandidates.length >= maxSelection) {
      console.warn(`No se pueden seleccionar más de ${maxSelection} candidatos`);
      return;
    }

    const isAlreadySelected = selectedCandidates.some(c => c.id === candidate.id);
    if (isAlreadySelected) {
      console.warn('El candidato ya está seleccionado');
      return;
    }

    setSelectedCandidates(prev => [...prev, candidate]);
  };

  // Deseleccionar un candidato
  const deselectCandidate = (candidateId: string | number) => {
    setSelectedCandidates(prev => prev.filter(c => c.id !== candidateId));
  };

  // Toggle selección de candidato
  const toggleCandidateSelection = (candidate: Candidate) => {
    const isSelected = selectedCandidates.some(c => c.id === candidate.id);
    
    if (isSelected) {
      deselectCandidate(candidate.id);
    } else {
      selectCandidate(candidate);
    }
  };

  // Limpiar toda la selección
  const clearSelection = () => {
    setSelectedCandidates([]);
  };

  // Resetear el filtro
  const resetFilter = () => {
    setIdeologyFilterState('todos');
  };

  // Verificar si un candidato está seleccionado
  const isCandidateSelected = (candidateId: string | number): boolean => {
    return selectedCandidates.some(c => c.id === candidateId);
  };

  // Verificar si se pueden seleccionar más candidatos
  const canSelectMore = selectedCandidates.length < maxSelection;

  // Contadores
  const totalCandidates = candidates.length;
  const filteredCount = filteredCandidates.length;
  const selectedCount = selectedCandidates.length;

  const value: CandidateFilterContextState = {
    // Datos
    candidates,
    filteredCandidates,
    selectedCandidates,
    
    // Filtro
    ideologyFilter,
    
    // Acciones
    setCandidates,
    setIdeologyFilter,
    selectCandidate,
    deselectCandidate,
    toggleCandidateSelection,
    clearSelection,
    resetFilter,
    
    // Utilidades
    isCandidateSelected,
    canSelectMore,
    totalCandidates,
    filteredCount,
    selectedCount
  };

  return (
    <CandidateFilterContext.Provider value={value}>
      {children}
    </CandidateFilterContext.Provider>
  );
};

/**
 * Hook para usar el contexto de filtrado de candidatos
 * 
 * Ejemplo de uso:
 * 
 * ```tsx
 * const MyComponent = () => {
 *   const {
 *     filteredCandidates,
 *     ideologyFilter,
 *     setIdeologyFilter,
 *     toggleCandidateSelection,
 *     selectedCandidates
 *   } = useCandidateFilterContext();
 * 
 *   return (
 *     <div>
 *       <IdeologyFilter
 *         currentValue={ideologyFilter}
 *         onChange={setIdeologyFilter}
 *       />
 *       {filteredCandidates.map(candidate => (
 *         <CandidateCard
 *           key={candidate.id}
 *           candidate={candidate}
 *           onSelect={() => toggleCandidateSelection(candidate)}
 *         />
 *       ))}
 *     </div>
 *   );
 * };
 * ```
 */
export const useCandidateFilterContext = (): CandidateFilterContextState => {
  const context = useContext(CandidateFilterContext);
  
  if (context === undefined) {
    throw new Error(
      'useCandidateFilterContext debe ser usado dentro de un CandidateFilterProvider'
    );
  }
  
  return context;
};

export default CandidateFilterContext;