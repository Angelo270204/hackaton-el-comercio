import React from 'react';
import { Link } from 'react-router';
import { Mail, Github, Twitter, Facebook } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../styles/Footer.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Main Footer Content */}
        <div className="footer__content">
          {/* Brand Section */}
          <div className="footer__section footer__section--brand">
            <div className="footer__logo" style={{ margin: 0, padding: 0, lineHeight: 0 }}>
              {/* Logo institucional DecideYa */}
              <img src="/images/banner/logo.jpg" alt="Logo DecideYa Elecciones 2026" style={{ height: 180, margin: 0, padding: 0, display: 'block' }} />
            </div>
            <p className="footer__description">
              {t('footer.brand.description')}
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
            <h3 className="footer__title">{t('footer.information.title')}</h3>
            <ul className="footer__list">
              <li className="footer__list-item">
                <Link to="/candidatos" className="footer__link">
                  {t('footer.information.candidates')}
                </Link>
              </li>
              <li className="footer__list-item">
                <Link to="/calendario" className="footer__link">
                  {t('footer.information.calendar')}
                </Link>
              </li>
              <li className="footer__list-item">
                <Link to="/donde-votar" className="footer__link">
                  {t('footer.information.whereToVote')}
                </Link>
              </li>
              <li className="footer__list-item">
                <Link to="/propuestas" className="footer__link">
                  {t('footer.information.proposals')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Section 2 */}
          <div className="footer__section">
            <h3 className="footer__title">{t('footer.resources.title')}</h3>
            <ul className="footer__list">
              <li className="footer__list-item">
                <Link to="/guia-miembros" className="footer__link">
                  {t('footer.resources.guideMembers')}
                </Link>
              </li>
              <li className="footer__list-item">
                <Link to="/preguntas-frecuentes" className="footer__link">
                  {t('footer.resources.faq')}
                </Link>
              </li>
              <li className="footer__list-item">
                <Link to="/noticias" className="footer__link">
                  {t('footer.resources.news')}
                </Link>
              </li>
              <li className="footer__list-item">
                <a href="https://www.onpe.gob.pe" target="_blank" rel="noopener noreferrer" className="footer__link">
                  {t('footer.resources.onpeOfficial')}
                </a>
              </li>
            </ul>
          </div>

          {/* Links Section 3 */}
          <div className="footer__section">
            <h3 className="footer__title">{t('footer.legal.title')}</h3>
            <ul className="footer__list">
              <li className="footer__list-item">
                <Link to="/terminos" className="footer__link">
                  {t('footer.legal.terms')}
                </Link>
              </li>
              <li className="footer__list-item">
                <Link to="/privacidad" className="footer__link">
                  {t('footer.legal.privacy')}
                </Link>
              </li>
              <li className="footer__list-item">
                <Link to="/contacto" className="footer__link">
                  {t('footer.legal.contact')}
                </Link>
              </li>
              <li className="footer__list-item">
                <Link to="/sobre-nosotros" className="footer__link">
                  {t('footer.legal.about')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} {t('footer.bottom.copyright')}
          </p>
          <p className="footer__disclaimer">
            {t('footer.bottom.disclaimer')}{' '}
            <a href="https://www.onpe.gob.pe" target="_blank" rel="noopener noreferrer" className="footer__disclaimer-link">
              ONPE.gob.pe
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};