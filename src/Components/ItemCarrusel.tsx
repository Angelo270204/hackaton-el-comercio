import React from "react";
import { Link } from "react-router";
import "../styles/CarruselHeader.css";

/**
 * Props del componente ItemCarrusel
 */
interface ItemCarruselProps {
  datos: {
    titulo: string;
    subtitulo: string;
    badge: string;
    imagenFondo: string;
    botonCandidatos?: string;
    botonCalendario?: string;
    botonDondeVotar?: string; // Botón para "Dónde Votar" en el slide 1
    botonNoticia?: {
      texto: string;
      url: string;
    };
  };
  visible: boolean;
  indice: number; // Índice del slide (0-3) para determinar qué botones mostrar
}

/**
 * ItemCarrusel - Componente que renderiza un slide individual del carrusel
 * 
 * Lógica de botones según el índice:
 * - Índice 0 (primer slide): Muestra botones de "Dónde Votar" y "Ver Calendario"
 * - Índice 1 (segundo slide): Solo muestra texto e imagen, sin botones
 * - Índice 2 (tercer slide): Muestra botón de "Explorar Candidatos"
 * - Índice 3 (cuarto slide): Muestra botón de noticia externa
 * 
 * @param datos - Información del slide (título, subtítulo, botones opcionales, imagen)
 * @param visible - Indica si el slide está visible actualmente
 * @param indice - Índice del slide (0-3) para determinar qué botones renderizar
 */
const ItemCarrusel: React.FC<ItemCarruselProps> = ({ datos, visible, indice }) => {
  const {
    titulo,
    subtitulo,
    badge,
    botonCandidatos,
    botonCalendario,
    botonDondeVotar,
    botonNoticia,
    imagenFondo
  } = datos;

  // Determinar qué botones mostrar según el índice del slide
  // Slide 1 (índice 0): Muestra "Dónde Votar" y "Ver Calendario"
  const mostrarBotonesSlide1 = indice === 0 && botonDondeVotar && botonCalendario;
  // Slide 3 (índice 2): Muestra "Explorar Candidatos"
  const mostrarBotonCandidatos = indice === 2 && botonCandidatos;
  // Slide 4 (índice 3): Muestra botón de noticia externa
  const mostrarBotonNoticia = indice === 3 && botonNoticia;

  return (
    <div
      className={`item-carrusel${visible ? " visible" : ""}`}
      style={{
        // Imagen de fondo sin overlay oscuro - se verá limpia y nítida
        backgroundImage: `url(${imagenFondo})`,
      }}
      role="img"
      aria-label={`Slide: ${titulo}`}
    >
      <div className="item-carrusel-contenido">
        {/* Badge superior con etiqueta */}
        <span className="item-carrusel-badge">{badge}</span>
        
        {/* Título principal del slide */}
        <h1 className="item-carrusel-titulo">{titulo}</h1>
        
        {/* Subtítulo descriptivo */}
        <p className="item-carrusel-subtitulo">{subtitulo}</p>
        
        {/* Contenedor de botones de acción - Solo se muestra si hay botones */}
        {/* Slide 1 (índice 0): Botones de "Dónde Votar" y "Ver Calendario" */}
        {mostrarBotonesSlide1 && (
          <div className="item-carrusel-botones">
            <Link 
              to="/donde-votar" 
              className="item-carrusel-btn amarillo"
              aria-label={`${botonDondeVotar} - Encontrar local de votación`}
            >
              {botonDondeVotar}
            </Link>
            <Link 
              to="/calendario" 
              className="item-carrusel-btn blanco"
              aria-label={`${botonCalendario} - Ver calendario electoral`}
            >
              {botonCalendario}
            </Link>
          </div>
        )}

        {/* Slide 3 (índice 2): Botón de "Explorar Candidatos" */}
        {mostrarBotonCandidatos && (
          <div className="item-carrusel-botones">
            <Link 
              to="/candidatos" 
              className="item-carrusel-btn amarillo"
              aria-label={`${botonCandidatos} - Ver candidatos`}
            >
              {botonCandidatos}
            </Link>
          </div>
        )}

        {/* Slide 4 (índice 3): Botón de noticia externa */}
        {mostrarBotonNoticia && (
          <div className="item-carrusel-botones">
            <a 
              href={botonNoticia.url}
              target="_blank"
              rel="noopener noreferrer"
              className="item-carrusel-btn amarillo"
              aria-label={`${botonNoticia.texto} - Abrir en nueva pestaña`}
            >
              {botonNoticia.texto}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCarrusel;
