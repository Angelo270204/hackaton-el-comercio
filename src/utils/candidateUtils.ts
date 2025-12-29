import type { Candidate, IdeologiaFilter, Ideologia } from '../types/candidate';

/**
 * Filtra candidatos por ideología
 * @param candidates - Array de candidatos
 * @param ideology - Ideología para filtrar
 * @returns Array de candidatos filtrados
 */
export const filterCandidatesByIdeology = (
  candidates: Candidate[],
  ideology: IdeologiaFilter
): Candidate[] => {
  if (ideology === 'todos') {
    return candidates;
  }
  return candidates.filter(candidate => candidate.ideologia === ideology);
};

/**
 * Obtiene el conteo de candidatos por ideología
 * @param candidates - Array de candidatos
 * @returns Objeto con el conteo por ideología
 */
export const getCandidateCountByIdeology = (
  candidates: Candidate[]
): Record<Ideologia, number> => {
  return candidates.reduce((acc, candidate) => {
    const ideology = candidate.ideologia;
    acc[ideology] = (acc[ideology] || 0) + 1;
    return acc;
  }, {} as Record<Ideologia, number>);
};

/**
 * Verifica si un candidato está en la lista filtrada
 * @param candidateId - ID del candidato
 * @param filteredCandidates - Lista de candidatos filtrados
 * @returns true si el candidato está en la lista filtrada
 */
export const isCandidateInFilteredList = (
  candidateId: string | number,
  filteredCandidates: Candidate[]
): boolean => {
  return filteredCandidates.some(candidate => candidate.id === candidateId);
};

/**
 * Limpia la selección de candidatos removiendo los que no están en la lista filtrada
 * @param selectedCandidates - Candidatos seleccionados
 * @param filteredCandidates - Candidatos filtrados
 * @returns Array de candidatos seleccionados válidos
 */
export const cleanSelectedCandidates = (
  selectedCandidates: Candidate[],
  filteredCandidates: Candidate[]
): Candidate[] => {
  return selectedCandidates.filter(selected =>
    filteredCandidates.some(filtered => filtered.id === selected.id)
  );
};

/**
 * Obtiene las ideologías únicas presentes en el array de candidatos
 * @param candidates - Array de candidatos
 * @returns Array de ideologías únicas
 */
export const getAvailableIdeologies = (candidates: Candidate[]): Ideologia[] => {
  const ideologies = new Set(candidates.map(c => c.ideologia));
  return Array.from(ideologies).sort();
};

/**
 * Valida si se puede agregar un candidato a la comparación
 * @param selectedCount - Número de candidatos ya seleccionados
 * @param maxSelection - Máximo de candidatos permitidos (por defecto 3)
 * @returns true si se puede agregar más candidatos
 */
export const canAddMoreCandidates = (
  selectedCount: number,
  maxSelection: number = 3
): boolean => {
  return selectedCount < maxSelection;
};

/**
 * Obtiene el color del semáforo para una propuesta
 * @param color - Color del semáforo
 * @returns Código de color hexadecimal
 */
export const getSemaforoColor = (
  color: 'verde' | 'amarillo' | 'rojo'
): string => {
  const colorMap = {
    verde: '#28a745',
    amarillo: '#ffc107',
    rojo: '#dc3545'
  };
  return colorMap[color];
};

/**
 * Obtiene el label descriptivo para el semáforo
 * @param color - Color del semáforo
 * @returns Label descriptivo
 */
export const getSemaforoLabel = (
  color: 'verde' | 'amarillo' | 'rojo'
): string => {
  const labelMap = {
    verde: 'Viable',
    amarillo: 'Requiere revisión',
    rojo: 'No viable'
  };
  return labelMap[color];
};