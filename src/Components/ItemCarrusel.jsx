import React from "react";
import { Link } from "react-router";
import "../styles/CarruselHeader.css";

// ItemCarrusel.jsx: Renderiza un slide individual del carrusel
// Recibe los datos del slide y si está visible
const ItemCarrusel = ({ datos, visible }) => {
  // Desestructura los datos del slide
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
