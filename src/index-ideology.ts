/**
 * Archivo índice para facilitar las importaciones del sistema de filtrado por ideología
 * 
 * Uso:
 * import { IdeologyFilter, useCandidateFilter, Candidate } from './index-ideology';
 */

// Tipos y constantes
export type { Candidate, PropuestaPorSector, Ideologia, IdeologiaFilter } from './types/candidate';
export { IDEOLOGIAS, IDEOLOGIA_LABELS } from './types/candidate';

// Componentes
export { default as IdeologyFilter } from './Components/IdeologyFilter';
export { default as IdeologyFilterSelect } from './Components/IdeologyFilter/IdeologyFilterSelect';

// Hooks
export { useCandidateFilter } from './hooks/useCandidateFilter';

// Utilidades
export {
  filterCandidatesByIdeology,
  getCandidateCountByIdeology,
  isCandidateInFilteredList,
  cleanSelectedCandidates,
  getAvailableIdeologies,
  canAddMoreCandidates,
  getSemaforoColor,
  getSemaforoLabel
} from './utils/candidateUtils';