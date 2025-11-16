import React, { useEffect, useRef, useState } from "react";
import ItemCarrusel from "./ItemCarrusel";
import "../styles/CarruselHeader.css";

// Definición del tipo de slide
interface Slide {
  titulo: string;
  subtitulo: string;
  badge: string;
  imagenFondo: string;
  // Opcionales: solo presentes en ciertos slides
    botonCandidatos?: string;
    botonCalendario?: string;
    botonDondeVotar?: string;
}

const CarruselHeader: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [actual, setActual] = useState<number>(0);
  const [autoSlide, setAutoSlide] = useState(true);
  // Usar ReturnType<typeof setInterval> para compatibilidad universal
  const intervaloRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cargar los datos del carrusel desde el JSON
  useEffect(() => {
    fetch("/data/slidersHome.json")
      .then((res) => res.json())
      .then((data) => setSlides(data));
  }, []);

  // Auto-slide cada 3 segundos
  useEffect(() => {
    if (autoSlide && slides.length > 1) {
      intervaloRef.current = setInterval(() => {
        setActual((prev) => (prev + 1) % slides.length);
      }, 3000);
      // El return debe ser una función que solo haga clearInterval
      return () => {
        if (intervaloRef.current) clearInterval(intervaloRef.current);
      };
    }
    // Si no hay autoSlide, no retorna nada
    return;
  }, [autoSlide, slides]);

  // Ir al slide anterior
  const anterior = () => {
    setActual((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoSlide(false);
  };

  // Ir al slide siguiente
  const siguiente = () => {
    setActual((prev) => (prev + 1) % slides.length);
    setAutoSlide(false);
  };

  // Ir a un slide específico (dots)
  const irASlide = (idx: number) => {
    setActual(idx);
    setAutoSlide(false);
  };

  if (!slides.length) return null;

  return (
    <div className="carrusel-header">
      {/* Renderiza cada slide, solo el actual es visible */}
      {slides.map((slide, idx) => (
        <ItemCarrusel
          key={idx}
          datos={slide}
          visible={idx === actual}
        />
      ))}

      {/* Flechas laterales solo en desktop */}
      <button
        className="carrusel-flecha carrusel-flecha-izq"
        onClick={anterior}
        aria-label="Anterior"
      >
        &#8592;
      </button>
      <button
        className="carrusel-flecha carrusel-flecha-der"
        onClick={siguiente}
        aria-label="Siguiente"
      >
        &#8594;
      </button>

      {/* Dots inferiores */}
      <div className="carrusel-dots">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`carrusel-dot${idx === actual ? " activo" : ""}`}
            onClick={() => irASlide(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default CarruselHeader;
