import React from "react";
import { Link } from "react-router";
import "../styles/CarruselHeader.css";

// Definición de las props con tipado explícito
interface ItemCarruselProps {
  datos: {
    titulo: string;
    subtitulo: string;
    badge: string;
    botonCandidatos: string;
    botonCalendario: string;
    imagenFondo: string;
  };
  visible: boolean;
}

// ItemCarrusel.tsx: Renderiza un slide individual del carrusel
const ItemCarrusel: React.FC<ItemCarruselProps> = ({ datos, visible }) => {
  const {
    titulo,
    subtitulo,
    badge,
    botonCandidatos,
    botonCalendario,
    imagenFondo
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
          <Link to="/candidatos" className="item-carrusel-btn amarillo">
            {botonCandidatos}
          </Link>
          <Link to="/calendario" className="item-carrusel-btn blanco">
            {botonCalendario}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemCarrusel;
