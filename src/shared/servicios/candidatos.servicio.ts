// Servicio para gestionar los datos de candidatos
// Lee la información desde public/data/candidatos.json

export interface DatosPublicos {
  rol_publico?: string
  elecciones_previas?: string
}

export interface Candidato {
  id: number | string
  nombre: string
  partido: string
  cargo_postula: string
  edad?: number
  // Estado ilustrativo de antecedentes, basado en cobertura mediática (no oficial)
  antecedentes_estado?: 'limpio' | 'cuestionado' | 'desconocido'
  antecedentes_detalle?: string
  datos_publicos?: DatosPublicos
  imagen?: string
  logo_partido?: string
  // Compatibilidad con nuevos nombres de campos en JSON
  // "foto" equivale a imagen del precandidato
  // "icono_partido" equivale a logo del partido
  foto?: string
  icono_partido?: string
  // Hoja de vida
  formacion_academica?: string[]
  experiencia_previa?: string[]
  cargos_ocupados?: string[]
  educacion?: string[]
  logros?: string[]
  trayectoria?: string
  // Actividades recientes
  actividades?: Array<{
    fecha: string
    titulo: string
    descripcion: string
  }>
  // Noticias
  noticias?: Array<{
    fecha: string
    titulo: string
    descripcion: string
    fuente?: string
  }>
  // Propuestas
  propuestas?: {
    economia?: string[]
    salud?: string[]
    seguridad?: string[]
    educacion?: string[]
    otros?: string[]
  }
}

/**
 * Obtiene la lista completa de candidatos desde el archivo JSON público
 * @returns Promise con el arreglo de candidatos
 */
export async function obtenerCandidatos(): Promise<Candidato[]> {
  try {
    const respuesta = await fetch('/data/candidatos.json')
    if (!respuesta.ok) {
      throw new Error('Error al cargar los candidatos')
    }
    const datos: Candidato[] = await respuesta.json()
    return datos
  } catch (error) {
    console.error('Error al obtener candidatos:', error)
    return []
  }
}

/**
 * Obtiene la ruta de la imagen de un candidato basándose en su id
 * Usa el patrón unnamed_###.jpg de la carpeta partido-candidato
 * @param id - ID del candidato
 * @returns Ruta de la imagen
 */
export function obtenerRutaImagenCandidato(id: number | string): string {
  const totalImagenes = 84 // Total de imágenes disponibles
  const numeroId = typeof id === 'number' ? id : parseInt(String(id), 10) || 1
  const indice = ((numeroId - 1) % totalImagenes) + 2 // Del 2 al 85
  const numeroFormateado = String(indice).padStart(3, '0')
  return `/images/partido-candidato/unnamed_${numeroFormateado}.jpg`
}

/**
 * Imagen de respaldo en caso de error al cargar
 */
export const IMAGEN_RESPALDO = '/images/partido-candidato/unnamed.jpg'
