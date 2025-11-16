import React from 'react';
import { Link } from 'react-router';
import { MapPin, Users, Calendar, BookOpen, Sparkles, ArrowRight } from 'lucide-react';

import { QuickAccessCard } from './QuickAccessCard';
import CarruselHeader from '../Components/CarruselHeader';
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