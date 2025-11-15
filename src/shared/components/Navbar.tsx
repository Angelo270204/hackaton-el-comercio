import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Menu, X, Vote } from 'lucide-react';
import '../../styles/Navbar.css';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const now = new Date();
  const target = new Date(targetDate);

  if (target.getTime() <= now.getTime()) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const diff = target.getTime() - now.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ELECTION_DATE = "2026-04-12T08:00:00";
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(ELECTION_DATE));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft(ELECTION_DATE));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Primera fila: Logo y Timer */}
      <div className="navbar__top">
        <div className="navbar__top-container">
          <Link to="/" className="navbar__logo" onClick={closeMenu}>
            <Vote size={32} />
            <span className="navbar__logo-text">Elecciones 2026</span>
          </Link>

          <div className="navbar__countdown">
            <span className="navbar__countdown-label">Faltan:</span>
            <div className="navbar__countdown-grid">
              <div className="navbar__countdown-item">
                <span className="navbar__countdown-number">{timeLeft.days}</span>
                <span className="navbar__countdown-text">días</span>
              </div>
              <div className="navbar__countdown-item">
                <span className="navbar__countdown-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="navbar__countdown-text">hrs</span>
              </div>
              <div className="navbar__countdown-item">
                <span className="navbar__countdown-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="navbar__countdown-text">min</span>
              </div>
              <div className="navbar__countdown-item">
                <span className="navbar__countdown-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="navbar__countdown-text">seg</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Segunda fila: Navegación */}
      <div className="navbar__bottom">
        <div className="navbar__bottom-container">
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
      </div>
    </nav>
  );
};