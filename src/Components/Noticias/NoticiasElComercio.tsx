import React, { useEffect, useState } from 'react';
import { Newspaper, ExternalLink, Calendar, ChevronRight, Loader } from 'lucide-react';
import './NoticiasElComercio.css';

interface Noticia {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  fecha: string;
  url: string;
  categoria: string;
}

const NoticiasElComercio: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Noticias simuladas relacionadas con elecciones
    // En producción, aquí harías fetch a la API de El Comercio
    const noticiasMock: Noticia[] = [
      {
        id: '1',
        titulo: 'Elecciones 2026: Este 30 de noviembre y 7 de diciembre son las elecciones primarias para elegir candidatos',
        descripcion: 'JNE iniciará calificación de listas el 23 de diciembre y la inscripción final tras periodo de tachas será el 14 de marzo de 2026.',
        imagen: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&h=600&fit=crop',
        fecha: '2024-11-14',
        url: 'https://elcomercio.pe/elecciones/elecciones-2026-este-30-de-noviembre-y-7-de-diciembre-son-las-elecciones-primarias-para-elegir-candidatos-ultimas-noticia/',
        categoria: 'Elecciones'
      },
      {
        id: '2',
        titulo: 'ONPE imprime más de 88 mil cédulas de sufragio para elecciones primarias del Apra y Renovación Popular',
        descripcion: 'En estos casos, los afiliados votarán directamente para elegir a sus candidatos el 30 de noviembre. Otros 37 partidos optaron por la modalidad de delegados.',
        imagen: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&h=600&fit=crop',
        fecha: '2024-11-12',
        url: 'https://elcomercio.pe/politica/elecciones/onpe-imprime-mas-de-88-mil-cedulas-de-sufragio-para-elecciones-primarias-del-apra-y-renovacion-popular-elecciones-2026-ultimas-noticia/',
        categoria: 'Elecciones'
      },
      {
        id: '3',
        titulo: 'Siete candidaturas del 2026 se definirán con delegaciones diminutas: ¿Cómo operan las elecciones primarias cerradas?',
        descripcion: 'Las agrupaciones políticas elegirán a sus candidatos con una cantidad mínima de delegados y, en su mayoría, listas únicas.',
        imagen: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=600&fit=crop',
        fecha: '2024-11-16',
        url: 'https://elcomercio.pe/politica/elecciones/siete-candidaturas-del-2026-se-definiran-con-delegaciones-diminutas-como-operan-las-elecciones-primarias-cerradas-noticia/',
        categoria: 'Política'
      },
      {
        id: '4',
        titulo: 'Elecciones 2026: 37 de las 39 agrupaciones políticas presentaron fórmulas presidenciales a la ONPE',
        descripcion: 'Solo dos de los partidos no inscribieron planchas presidenciales antes del 7 de noviembre.',
        imagen: 'https://images.unsplash.com/photo-1569705460033-cfaa4bf9f822?w=800&h=600&fit=crop',
        fecha: '2024-11-15',
        url: 'https://elcomercio.pe/elecciones/elecciones-2026-37-de-las-39-agrupaciones-politicas-presentaron-formulas-presidenciales-a-la-onpe-ultmasi-noticia/',
        categoria: 'Elecciones'
      }
    ];

    // Simular carga de API
    setTimeout(() => {
      setNoticias(noticiasMock);
      setLoading(false);
    }, 1000);
  }, []);

  const formatearFecha = (fecha: string) => {
    const date = new Date(fecha);
    const opciones: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('es-PE', opciones);
  };

  if (loading) {
    return (
      <section className="noticias-comercio">
        <div className="noticias-comercio__container">
          <div className="noticias-comercio__loading">
            <Loader className="noticias-comercio__spinner" size={40} />
            <p>Cargando noticias...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="noticias-comercio">
      <div className="noticias-comercio__container">
        {/* Header */}
        <div className="noticias-comercio__header">
          <div className="noticias-comercio__header-content">
            <div className="noticias-comercio__badge">
              <Newspaper size={18} />
              <span>Actualidad Electoral</span>
            </div>
            <h2 className="noticias-comercio__title">
              Últimas <span className="noticias-comercio__title-highlight">Noticias</span>
            </h2>
            <p className="noticias-comercio__subtitle">
              Mantente informado con las noticias más recientes sobre el proceso electoral
            </p>
          </div>
        </div>

        {/* Grid de Noticias */}
        <div className="noticias-comercio__grid">
          {noticias.map((noticia, index) => (
            <article 
              key={noticia.id} 
              className={`noticias-comercio__card ${index === 0 ? 'noticias-comercio__card--destacada' : ''}`}
            >
              <div className="noticias-comercio__imagen-container">
                <img 
                  src={noticia.imagen} 
                  alt={noticia.titulo}
                  className="noticias-comercio__imagen"
                />
                <span className="noticias-comercio__categoria">
                  {noticia.categoria}
                </span>
              </div>
              
              <div className="noticias-comercio__content">
                <div className="noticias-comercio__fecha">
                  <Calendar size={14} />
                  <time>{formatearFecha(noticia.fecha)}</time>
                </div>
                
                <h3 className="noticias-comercio__card-titulo">
                  {noticia.titulo}
                </h3>
                
                <p className="noticias-comercio__descripcion">
                  {noticia.descripcion}
                </p>
                
                <a 
                  href={noticia.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="noticias-comercio__link"
                >
                  Leer más
                  <ExternalLink size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Footer con link a más noticias */}
        <div className="noticias-comercio__footer">
          <a 
            href="https://elcomercio.pe/politica/elecciones/"
            target="_blank"
            rel="noopener noreferrer"
            className="noticias-comercio__ver-mas"
          >
            Ver todas las noticias de elecciones
            <ChevronRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default NoticiasElComercio;