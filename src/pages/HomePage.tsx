import React from 'react';
import { Link } from 'react-router';
import { MapPin, Users, Calendar, BookOpen, Sparkles, ArrowRight } from 'lucide-react';

import { QuickAccessCard } from './QuickAccessCard';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/home.css';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();

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
      icon: <Calendar size={28} />,
      title: t('home.quickAccess.calendar.title'),
      description: t('home.quickAccess.calendar.description'),
      link: '/calendario'
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
        {/* Hero Section with Banner */}
        <section className="home__hero">
          <div className="home__hero-banner">
            <img
              src="/images/banner/banner-hackaton.png"
              alt="Elecciones 2026 - Banner"
              className="home__hero-banner-image"
            />
            <div className="home__hero-overlay"></div>
            <div className="home__hero-content">
              <div className="home__hero-badge">
                <Sparkles size={16} />
                <span>{t('home.hero.badge')}</span>
              </div>
              <h1 className="home__hero-title">
                {t('home.hero.title')} <span className="home__hero-highlight">{t('home.hero.titleHighlight')}</span>
              </h1>
              <p className="home__hero-description">
                {t('home.hero.description')}
              </p>
              <div className="home__hero-actions">
                <Link to="/candidatos" className="home__hero-btn home__hero-btn--primary">
                  {t('home.hero.viewCandidates')}
                  <ArrowRight size={20} />
                </Link>
                <Link to="/calendario" className="home__hero-btn home__hero-btn--secondary">
                  {t('home.hero.viewCalendar')}
                </Link>
              </div>
            </div>
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