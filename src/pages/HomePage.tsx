import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { MapPin, Users, BookOpen, Sparkles, ArrowRight } from 'lucide-react';

import { QuickAccessCard } from './QuickAccessCard';
import CarruselHeader from '../Components/CarruselHeader';
import { TimelineHorizontal } from '../Components/TimelineHorizontal';
import { useLanguage } from '../contexts/LanguageContext';
import { AppAvatar } from '../shared/components';
import '../styles/home.css';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();

  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('elecciones_subscription');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.email) {
          setEmail(parsed.email);
          setIsSubscribed(true);
        }
      }
    } catch {
      // ignore read errors
    }
  }, []);

  const handleSubscribe = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !email.includes('@')) {
      return;
    }
    try {
      localStorage.setItem('elecciones_subscription', JSON.stringify({ email }));
    } catch {
      // ignore write errors
    }
    setIsSubscribed(true);
  };

  const quickAccessItems = [
    {
      icon: <MapPin size={28} />,
      title: t('home.quickAccess.whereToVote.title'),
      description: t('home.quickAccess.whereToVote.description'),
      link: '/donde-votar'
    },
    {
      icon: <Users size={28} />,
      title: t('home.quickAccess.candidates.title'),
      description: t('home.quickAccess.candidates.description'),
      link: '/candidatos'
    },
    {
      icon: <BookOpen size={28} />,
      title: t('home.quickAccess.guide.title'),
      description: t('home.quickAccess.guide.description'),
      link: '/guia-miembros'
    }
  ];


  return (
    <div className="home">
      <div className="home__container">
        {/* Carrusel Header reemplaza el hero estático */}
        <CarruselHeader />
        <section className="home__subscription">
          <div className="home__subscription-avatar">
            <AppAvatar />
          </div>
          <div className="home__subscription-content">
            <div className="home__subscription-badge">
              <Sparkles size={18} />
              <span>No te pierdas ninguna fecha clave</span>
            </div>
            <h2 className="home__subscription-title">
              Mantente al día con el calendario electoral 2026
            </h2>
            <p className="home__subscription-text">
              Deja tu correo y la aplicación te avisará de los hitos más importantes del proceso electoral.
            </p>
            <form className="home__subscription-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="home__subscription-input"
                placeholder="tu-correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Correo electrónico para recibir recordatorios del calendario electoral"
              />
              <button
                type="submit"
                className="home__subscription-button"
                disabled={!email || !email.includes('@')}
              >
                Quiero recibir recordatorios
              </button>
            </form>
            {isSubscribed && (
              <p className="home__subscription-confirmation">
                ¡Listo! Te avisaremos de las fechas clave del calendario electoral.
              </p>
            )}
          </div>
        </section>

        {/* Quick Access Cards */}
        <section className="home__section">
          <div className="home__section-header">
            <h2 className="home__section-title">{t('home.quickAccess.title')}</h2>
            <p className="home__section-subtitle">
              {t('home.quickAccess.subtitle')}
            </p>
          </div>
          <div className="home__quick-access-grid">
            {quickAccessItems.map((item, index) => (
              <Link key={index} to={item.link} className="home__card-link">
                <QuickAccessCard
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              </Link>
            ))}
          </div>
        </section>

        {/* Timeline horizontal electoral */}
        <section className="home__section">
          <TimelineHorizontal />
        </section>

        {/* Info Banner */}
        <section className="home__info-banner">
          <div className="home__info-content">
            <h3 className="home__info-title">{t('home.infoBanner.title')}</h3>
            <p className="home__info-description">
              {t('home.infoBanner.description')}
            </p>
            <Link to="/guia-miembros" className="home__info-link">
              {t('home.infoBanner.link')}
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};