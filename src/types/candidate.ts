// Tipos para las propuestas por sector
export interface PropuestaPorSector {
  sector: string;
  descripcion: string;
  semaforo?: 'verde' | 'amarillo' | 'rojo'; // Estado del semáforo
}

// Tipo para ideologías políticas
export type Ideologia = 'izquierda' | 'centro-izquierda' | 'centro' | 'centro-derecha' | 'derecha';

// Interface principal de Candidato
export interface Candidate {
  id: string | number;
  nombre: string;
  partido: string;
  foto?: string;
  ideologia: Ideologia; // Nueva propiedad para filtrado
  propuestasPorSector?: PropuestaPorSector[];
  edad?: number;
  profesion?: string;
  experiencia?: string;
  biografia?: string;
  redes?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

// Tipo para el filtro de ideología (incluye "todos")
export type IdeologiaFilter = 'todos' | Ideologia;

// Constantes útiles para el filtro
export const IDEOLOGIAS: Ideologia[] = [
  'izquierda',
  'centro-izquierda',
  'centro',
  'centro-derecha',
  'derecha'
];

export const IDEOLOGIA_LABELS: Record<IdeologiaFilter, string> = {
  'todos': 'Todos',
  'izquierda': 'Izquierda',
  'centro-izquierda': 'Centro-Izquierda',
  'centro': 'Centro',
  'centro-derecha': 'Centro-Derecha',
  'derecha': 'Derecha'
};