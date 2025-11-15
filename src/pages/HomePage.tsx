import React from 'react';
import { Link } from 'react-router';
import { MapPin, Users, Calendar, BookOpen, Sparkles, ArrowRight } from 'lucide-react';

import { QuickAccessCard } from './QuickAccessCard';
import '../styles/home.css';

export const HomePage: React.FC = () => {


  const quickAccessItems = [
    {
      icon: <MapPin size={28} />,
      title: 'Dónde Votar',
      description: 'Consulta tu centro de votación con tu DNI',
      link: '/donde-votar'
    },
    {
      icon: <Users size={28} />,
      title: 'Candidatos',
      description: 'Conoce a los precandidatos presidenciales',
      link: '/candidatos'
    },
    {
      icon: <Calendar size={28} />,
      title: 'Calendario Electoral',
      description: 'Fechas importantes del proceso electoral',
      link: '/calendario'
    },
    {
      icon: <BookOpen size={28} />,
      title: 'Guía Miembros de Mesa',
      description: 'Todo lo que necesitas saber si eres miembro',
      link: '/guia-miembros'
    }
  ];

  return (
    <div className="home">
      <div className="home__container">
        {/* Hero Section */}
        <section className="home__hero">
          <div className="home__hero-badge">
            <Sparkles size={16} />
            <span>Elecciones Generales Perú</span>
          </div>
          <h1 className="home__hero-title">
            Prepárate para las <span className="home__hero-highlight">Elecciones 2026</span>
          </h1>
          <p className="home__hero-description">
            Toda la información que necesitas para ejercer tu derecho al voto de manera informada.
            Conoce a los candidatos, encuentra tu local de votación y mantente actualizado con el proceso electoral.
          </p>
          <div className="home__hero-actions">
            <Link to="/candidatos" className="home__hero-btn home__hero-btn--primary">
              Ver Candidatos
              <ArrowRight size={20} />
            </Link>
            <Link to="/calendario" className="home__hero-btn home__hero-btn--secondary">
              Ver Calendario
            </Link>
          </div>
        </section>



        {/* Quick Access Cards */}
        <section className="home__section">
          <div className="home__section-header">
            <h2 className="home__section-title">Accesos Rápidos</h2>
            <p className="home__section-subtitle">
              Accede rápidamente a la información más importante
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
            <h3 className="home__info-title">¿Primera vez votando?</h3>
            <p className="home__info-description">
              Aprende todo sobre el proceso electoral peruano y cómo ejercer tu voto de manera correcta.
            </p>
            <Link to="/guia-miembros" className="home__info-link">
              Ver guía completa
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};