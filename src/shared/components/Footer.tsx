import React from 'react';
import { Link } from 'react-router';
import { Mail, Github, Twitter, Facebook } from 'lucide-react';
import '../../styles/Footer.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Main Footer Content */}
        <div className="footer__content">
          {/* Brand Section */}
          <div className="footer__section footer__section--brand">
            <div className="footer__logo">
                  <img
                    src="/images/banner/logo.jpg"
                    alt="Logo Elecciones 2026"
                    style={{ height: '200px', marginLeft: '0.5rem', objectFit: 'contain' }}
                  />
            </div>
            <p className="footer__description">
              Plataforma informativa para las Elecciones Generales del Perú 2026.
              Mantente informado y ejerce tu derecho al voto de manera responsable.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="footer__social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="footer__social-link" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="mailto:info@elecciones2026.pe" className="footer__social-link" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Links Section 1 */}
          <div className="footer__section">
            <h3 className="footer__title">Información</h3>
            <ul className="footer__list">
              <li className="footer__list-item">
                <Link to="/candidatos" className="footer__link">
                  Candidatos 2026
                </Link>
              </li>
              <li className="footer__list-item">
                <Link to="/calendario" className="footer__link">
                  Calendario Electoral
                </Link>
              </li>
              <li className="footer__list-item">
                <Link to="/donde-votar" className="footer__link">
                  Dónde Votar
                </Link>
              </li>
              <li className="footer__list-item">
                <Link to="/propuestas" className="footer__link">
                  Propuestas
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Section 2 */}
          <div className="footer__section">
            <h3 className="footer__title">Recursos</h3>
            <ul className="footer__list">
              <li className="footer__list-item">
                <Link to="/guia-miembros" className="footer__link">
                  Guía Miembros de Mesa
                </Link>
              </li>
              <li className="footer__list-item">
                <Link to="/preguntas-frecuentes" className="footer__link">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li className="footer__list-item">
                <Link to="/noticias" className="footer__link">
                  Noticias
                </Link>
              </li>
              <li className="footer__list-item">
                <a href="https://www.onpe.gob.pe" target="_blank" rel="noopener noreferrer" className="footer__link">
                  ONPE Oficial
                </a>
              </li>
            </ul>
          </div>

          {/* Links Section 3 */}
          <div className="footer__section">
            <h3 className="footer__title">Legal</h3>
            <ul className="footer__list">
              <li className="footer__list-item">
                <Link to="/terminos" className="footer__link">
                  Términos de Uso
                </Link>
              </li>
              <li className="footer__list-item">
                <Link to="/privacidad" className="footer__link">
                  Política de Privacidad
                </Link>
              </li>
              <li className="footer__list-item">
                <Link to="/contacto" className="footer__link">
                  Contacto
                </Link>
              </li>
              <li className="footer__list-item">
                <Link to="/sobre-nosotros" className="footer__link">
                  Sobre Nosotros
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} Elecciones 2026. Proyecto desarrollado para Hackathon El Comercio.
          </p>
          <p className="footer__disclaimer">
            Esta es una plataforma informativa no oficial. Para información oficial, visita{' '}
            <a href="https://www.onpe.gob.pe" target="_blank" rel="noopener noreferrer" className="footer__disclaimer-link">
              ONPE.gob.pe
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};