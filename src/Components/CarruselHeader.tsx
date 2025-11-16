import React, { useEffect, useRef, useState } from "react";
import ItemCarrusel from "./ItemCarrusel";
import { useLanguage } from "../contexts/LanguageContext";
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
  const { t } = useLanguage();
  const slides: Slide[] = [
    {
      titulo: t('home.carousel.slide1.title'),
      subtitulo: t('home.carousel.slide1.subtitle'),
      badge: t('home.carousel.slide1.badge'),
      botonCandidatos: t('home.carousel.slide1.buttonCandidates'),
      botonCalendario: t('home.carousel.slide1.buttonCalendar'),
      imagenFondo: "/images/banner/banner-hackaton.jpeg"
    },
    {
      titulo: t('home.carousel.slide2.title'),
      subtitulo: t('home.carousel.slide2.subtitle'),
      badge: t('home.carousel.slide2.badge'),
      botonCandidatos: t('home.carousel.slide2.buttonCandidates'),
      botonCalendario: t('home.carousel.slide2.buttonCalendar'),
      imagenFondo: "/images/banner/banner-hackaton.png"
    }
  ];

  const [actual, setActual] = useState<number>(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const intervaloRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-slide cada 3 segundos
  useEffect(() => {
    if (autoSlide) {
      intervaloRef.current = setInterval(() => {
        setActual((prev) => (prev + 1) % 2);
      }, 3000);
      return () => {
        if (intervaloRef.current) clearInterval(intervaloRef.current);
      };
    }
    return;
  }, [autoSlide]);

  // Ir al slide anterior
  const anterior = () => {
    setActual((prev) => (prev - 1 + 2) % 2);
    setAutoSlide(false);
  };

  // Ir al slide siguiente
  const siguiente = () => {
    setActual((prev) => (prev + 1) % 2);
    setAutoSlide(false);
  };

  // Ir a un slide específico (dots)
  const irASlide = (idx: number) => {
    setActual(idx);
    setAutoSlide(false);
  };

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
