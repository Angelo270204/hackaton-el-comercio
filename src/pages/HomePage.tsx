import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { MapPin, Users, BookOpen, Sparkles, ArrowRight } from 'lucide-react';

import { QuickAccessCard } from './QuickAccessCard';
import CarruselHeader from '../Components/CarruselHeader';
import { TimelineHorizontal } from '../Components/TimelineHorizontal';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/home.css';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showSubscriptionCard, setShowSubscriptionCard] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('elecciones_subscription');
      if (stored) {
        setIsSubscribed(true);
        // Si ya está suscrito no mostramos más el popup
        return;
      }
    } catch {
      // ignore read errors
    }

    // Si no hay suscripción, mostramos siempre el popup al cargar
    setShowSubscriptionCard(true);
  }, [isSubscribed]);

  // Ocultar automáticamente el popup a los 10 segundos si el usuario no interactúa
  useEffect(() => {
    if (!showSubscriptionCard || isSubscribed) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowSubscriptionCard(false);
    }, 10000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [showSubscriptionCard, isSubscribed]);

  const handleSubscribe = () => {
    try {
      localStorage.setItem('elecciones_subscription', JSON.stringify({ notifications: true }));
    } catch {
      // ignore write errors
    }
    setIsSubscribed(true);
    setShowSubscriptionCard(false);
  };

  const handleSubscriptionLater = () => {
    setShowSubscriptionCard(false);
    try {
      localStorage.setItem('elecciones_subscription_dismissed', 'true');
    } catch {
      // ignore write errors
    }
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

        {showSubscriptionCard && !isSubscribed && (
          <div className="home__subscription-floating">
            <section className="home__subscription" aria-label="Activar novedades electorales en la aplicación">

              <div className="home__subscription-avatar">
                <img
                  src="/images/banner/logo.jpg"
                  alt="Logo Elecciones 2026"
                  style={{ width: '100%', height: '100%', borderRadius: '999px', objectFit: 'cover' }}
                />
              </div>

              <div className="home__subscription-content">
                <div className="home__subscription-badge">
                  <Sparkles size={16} />
                  <span>Novedades de elecciones 2026</span>
                </div>
                <h2 className="home__subscription-title">
                  Activa las novedades personalizadas
                </h2>
                <p className="home__subscription-text">
                  Te mostraremos, de forma discreta, noticias, calendario e información de candidatos dentro de DecideYa.
                </p>
                <div className="home__subscription-form">
                  <div className="home__subscription-actions">
                    <button
                      type="button"
                      className="home__subscription-button home__subscription-button--secondary"
                      onClick={handleSubscriptionLater}
                    >
                      Después
                    </button>
                    <button
                      type="button"
                      className="home__subscription-button"
                      onClick={handleSubscribe}
                    >
                      Activar novedades
                    </button>
                  </div>
                </div>

              </div>
            </section>
          </div>
        )}

        {/* Carrusel Header reemplaza el hero estático */}
        <CarruselHeader />

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