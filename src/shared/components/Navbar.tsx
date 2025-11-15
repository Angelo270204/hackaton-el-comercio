import React, { useState } from 'react';
import { Link } from 'react-router';
import { Menu, X, Vote } from 'lucide-react';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          <Vote size={28} />
          <span className="navbar__logo-text">Elecciones 2026</span>
        </Link>

        <button
          className="navbar__toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`navbar__menu ${isMenuOpen ? 'navbar__menu--open' : ''}`}>
          <li className="navbar__item">
            <Link to="/" className="navbar__link" onClick={closeMenu}>
              Inicio
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/candidatos" className="navbar__link" onClick={closeMenu}>
              Candidatos
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/calendario" className="navbar__link" onClick={closeMenu}>
              Calendario
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/donde-votar" className="navbar__link" onClick={closeMenu}>
              Dónde Votar
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/guia-miembros" className="navbar__link navbar__link--cta" onClick={closeMenu}>
              Guía Miembros
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};