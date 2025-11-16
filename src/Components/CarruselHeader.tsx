import React, { useEffect, useRef, useState } from "react";
import ItemCarrusel from "./ItemCarrusel";
import "../styles/CarruselHeader.css";

/**
 * Definición del tipo de slide del carrusel
 * Soporta 4 tipos de slides:
 * - Slide 1 (índice 0): Tiene botones de "Dónde Votar" y calendario
 * - Slide 2 (índice 1): Solo texto e imagen, sin botones
 * - Slide 3 (índice 2): Tiene botón de "Explorar Candidatos"
 * - Slide 4 (índice 3): Tiene botón de noticia externa
 */
interface Slide {
  titulo: string;
  subtitulo: string;
  badge: string;
  imagenFondo: string;
  // Opcionales: solo presentes en ciertos slides
  botonCandidatos?: string;
  botonCalendario?: string;
  botonDondeVotar?: string; // Botón para "Dónde Votar" en el slide 1
  botonNoticia?: {
    texto: string;
    url: string;
  };
}

/**
 * CarruselHeader - Componente principal del carrusel del header
 * 
 * Características:
 * - Navegación automática cada 5 segundos
 * - Navegación manual con flechas (desktop) y dots
 * - Logo integrado en la esquina superior izquierda
 * - Transiciones suaves con fade y zoom
 * - Totalmente accesible y responsive
 */
const CarruselHeader: React.FC = () => {
  // Estado de los slides cargados desde el JSON
  const [slides, setSlides] = useState<Slide[]>([]);
  
  // Índice del slide actualmente visible
  const [actual, setActual] = useState<number>(0);
  
  // Control de auto-slide (se desactiva cuando el usuario navega manualmente)
  const [autoSlide, setAutoSlide] = useState(true);
  
  // Referencia al intervalo de auto-slide para poder limpiarlo
  const intervaloRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /**
   * Cargar los datos del carrusel desde el archivo JSON
   */
  useEffect(() => {
    fetch("/data/slidersHome.json")
      .then((res) => res.json())
      .then((data) => setSlides(data))
      .catch((error) => {
        console.error("Error al cargar los slides del carrusel:", error);
      });
  }, []);

  /**
   * Auto-slide: cambia automáticamente cada 5 segundos
   * Se detiene si el usuario navega manualmente
   */
  useEffect(() => {
    if (autoSlide && slides.length > 1) {
      intervaloRef.current = setInterval(() => {
        setActual((prev) => (prev + 1) % slides.length);
      }, 5000); // 5 segundos para dar tiempo a leer el contenido
      
      // Limpiar el intervalo al desmontar o cuando cambian las dependencias
      return () => {
        if (intervaloRef.current) {
          clearInterval(intervaloRef.current);
        }
      };
    }
  }, [autoSlide, slides.length]);

  /**
   * Navegar al slide anterior
   * Desactiva el auto-slide para que el usuario tenga control
   */
  const anterior = () => {
    setActual((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoSlide(false);
    
    // Reactivar auto-slide después de 10 segundos de inactividad
    setTimeout(() => setAutoSlide(true), 10000);
  };

  /**
   * Navegar al slide siguiente
   * Desactiva el auto-slide para que el usuario tenga control
   */
  const siguiente = () => {
    setActual((prev) => (prev + 1) % slides.length);
    setAutoSlide(false);
    
    // Reactivar auto-slide después de 10 segundos de inactividad
    setTimeout(() => setAutoSlide(true), 10000);
  };

  /**
   * Ir directamente a un slide específico usando los dots
   * Desactiva el auto-slide para que el usuario tenga control
   */
  const irASlide = (idx: number) => {
    setActual(idx);
    setAutoSlide(false);
    
    // Reactivar auto-slide después de 10 segundos de inactividad
    setTimeout(() => setAutoSlide(true), 10000);
  };

  // No renderizar si no hay slides cargados
  if (!slides.length) return null;

  return (
    <div className="carrusel-header" role="region" aria-label="Carrusel de información electoral">
      {/* Renderizar todos los slides, solo el actual es visible */}
      {/* Lógica: 4 sliders totales
          - Slide 1 (idx 0): Muestra botones de "Dónde Votar" y calendario
          - Slide 2 (idx 1): Solo texto e imagen
          - Slide 3 (idx 2): Muestra botón de "Explorar Candidatos"
          - Slide 4 (idx 3): Muestra botón de noticia externa */}
      {slides.map((slide, idx) => (
        <ItemCarrusel
          key={idx}
          datos={slide}
          visible={idx === actual}
          indice={idx}
        />
      ))}

      {/* Flechas de navegación lateral (solo visibles en desktop) */}
      {slides.length > 1 && (
        <>
          <button
            className="carrusel-flecha carrusel-flecha-izq"
            onClick={anterior}
            aria-label="Ver slide anterior"
            type="button"
          >
            &#8592;
          </button>
          <button
            className="carrusel-flecha carrusel-flecha-der"
            onClick={siguiente}
            aria-label="Ver slide siguiente"
            type="button"
          >
            &#8594;
          </button>
        </>
      )}

      {/* Indicadores de posición (dots) */}
      {slides.length > 1 && (
        <div className="carrusel-dots" role="tablist" aria-label="Navegación del carrusel">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === actual}
              aria-label={`Ir al slide ${idx + 1}`}
              className={`carrusel-dot${idx === actual ? " activo" : ""}`}
              onClick={() => irASlide(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarruselHeader;
