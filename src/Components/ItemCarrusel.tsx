
import React from "react";
import { Link } from "react-router-dom";
import "../styles/CarruselHeader.css";

interface ItemCarruselProps {
  datos: {
    titulo: string;
    subtitulo: string;
    badge: string;
    imagenFondo: string;
    botonCandidatos?: string;
    botonCalendario?: string;
    botonDondeVotar?: string;
    botonNoticia?: {
      texto: string;
      url: string;
    };
  };
  visible: boolean;
}

const ItemCarrusel: React.FC<ItemCarruselProps> = ({ datos, visible }) => {
  const {
    titulo,
    subtitulo,
    badge,
    imagenFondo,
    botonCandidatos,
    botonCalendario,
    botonDondeVotar,
    botonNoticia,
  } = datos;

  return (
    <div
      className={`item-carrusel${visible ? " visible" : ""}`}
      style={{
        backgroundImage: `linear-gradient(rgba(10, 25, 61, 0.85), rgba(10, 25, 61, 0.85)), url(${imagenFondo})`,
      }}
    >
      <div className="item-carrusel-contenido">
        <span className="item-carrusel-badge">{badge}</span>
        <h1 className="item-carrusel-titulo">{titulo}</h1>
        <p className="item-carrusel-subtitulo">{subtitulo}</p>
        <div className="item-carrusel-botones">
          {botonDondeVotar && (
            <Link to="/donde-votar" className="item-carrusel-btn amarillo">
              {botonDondeVotar}
            </Link>
          )}
          {botonCalendario && (
            <Link to="/calendario" className="item-carrusel-btn blanco">
              {botonCalendario}
            </Link>
          )}
          {botonCandidatos && (
            <Link to="/candidatos" className="item-carrusel-btn amarillo">
              {botonCandidatos}
            </Link>
          )}
          {botonNoticia && (
            <a
              href={botonNoticia.url}
              className="item-carrusel-btn blanco"
              target="_blank"
              rel="noopener noreferrer"
            >
              {botonNoticia.texto}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCarrusel;
