import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  FileText, 
  AlertCircle, 
  Download,
  Users,
  Shield,
  Award,
  Calendar,
  BookOpen,
  Briefcase,
  DollarSign,
  XCircle,
  PlayCircle,
  HelpCircle,
  Phone,
  ExternalLink
} from 'lucide-react';
import '../styles/guiaMiembros.css';

interface TimelineStep {
  time: string;
  title: string;
  description: string;
}

type TabType = 'general' | 'responsabilidades' | 'derechos' | 'documentos' | 'importante';

export const GuiaMiembrosPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('general');

  const tabs = [
    { id: 'general' as TabType, label: 'Información General', icon: <BookOpen size={20} /> },
    { id: 'responsabilidades' as TabType, label: 'Mis Responsabilidades', icon: <Shield size={20} /> },
    { id: 'derechos' as TabType, label: 'Derechos y Beneficios', icon: <Award size={20} /> },
    { id: 'documentos' as TabType, label: 'Documentos', icon: <FileText size={20} /> },
    { id: 'importante' as TabType, label: 'Importante Saber', icon: <AlertCircle size={20} /> }
  ];

  const responsibilities = [
    {
      icon: <CheckCircle size={24} />,
      title: 'Instalación de la mesa',
      description: 'Verificar y preparar todos los materiales electorales antes del inicio de la votación.'
    },
    {
      icon: <Users size={24} />,
      title: 'Identificación de electores',
      description: 'Verificar la identidad de cada votante mediante su DNI antes de entregarle la cédula.'
    },
    {
      icon: <Shield size={24} />,
      title: 'Garantizar el secreto del voto',
      description: 'Asegurar que cada elector vote de forma secreta y sin presiones.'
    },
    {
      icon: <FileText size={24} />,
      title: 'Conteo de votos',
      description: 'Realizar el escrutinio público de los votos al finalizar la jornada electoral.'
    },
    {
      icon: <BookOpen size={24} />,
      title: 'Llenar actas',
      description: 'Completar correctamente todas las actas electorales con los resultados de la mesa.'
    }
  ];

  const timeline: TimelineStep[] = [
    {
      time: '7:00 AM',
      title: 'Llegada al local de votación',
      description: 'Preséntate con tu DNI y la carta de notificación (no es obligatorio pero ayuda).'
    },
    {
      time: '7:30 AM',
      title: 'Instalación de la mesa',
      description: 'Verifica el material electoral, organiza la mesa y firma el acta de instalación.'
    },
    {
      time: '8:00 AM',
      title: 'Inicio de la votación',
      description: 'Comienza a recibir a los electores, verifica identidades y entrega las cédulas.'
    },
    {
      time: '8:00 AM - 4:00 PM',
      title: 'Jornada electoral',
      description: 'Mantén el orden, verifica identidades y asegura el proceso democrático.'
    },
    {
      time: '4:00 PM',
      title: 'Cierre de mesa',
      description: 'Si no hay electores en cola, puedes cerrar la mesa y comenzar el conteo.'
    },
    {
      time: '4:00 PM - 6:00 PM',
      title: 'Conteo de votos',
      description: 'Realiza el escrutinio público, cuenta los votos y completa las actas.'
    },
    {
      time: 'Después del conteo',
      title: 'Entrega de actas',
      description: 'Entrega las actas y material electoral al coordinador de la ONPE.'
    }
  ];

  const benefits = [
    {
      icon: <DollarSign size={24} />,
      title: 'Compensación económica',
      description: 'Recibes S/ 120 soles por tu participación como miembro de mesa.'
    },
    {
      icon: <Calendar size={24} />,
      title: 'Día libre remunerado',
      description: 'Tienes derecho a un día libre pagado por tu trabajo (sector público y privado).'
    },
    {
      icon: <Award size={24} />,
      title: 'Constancia de participación',
      description: 'Recibes una constancia oficial que puede ser útil para trámites y postulaciones.'
    },
    {
      icon: <Briefcase size={24} />,
      title: 'Experiencia cívica',
      description: 'Participas activamente en el proceso democrático del país.'
    }
  ];

  const documents = [
    'DNI vigente (obligatorio)',
    'Carta de notificación de la ONPE (recomendado)',
    'Lapicero de tinta indeleble',
    'Agua y snacks para el día',
    'Abrigo o casaca (algunos locales son fríos)',
    'Celular con batería cargada'
  ];

  const sanctions = [
    {
      icon: <XCircle size={24} />,
      title: 'Multa económica',
      description: 'S/ 230 soles si no asistes ni justificas tu inasistencia.'
    },
    {
      icon: <AlertCircle size={24} />,
      title: 'Impedimento para trámites',
      description: 'No podrás realizar trámites ante entidades públicas hasta pagar la multa.'
    },
    {
      icon: <FileText size={24} />,
      title: 'Restricciones laborales',
      description: 'Impedimento para trabajar en el sector público hasta regularizar tu situación.'
    }
  ];

  const downloadables = [
    {
      title: 'Manual del Miembro de Mesa',
      description: 'Guía oficial completa con todas las funciones y procedimientos de la ONPE',
      size: 'PDF - 3.2 MB',
      url: '#'
    },
    {
      title: 'Acto Electoral - Normativa',
      description: 'Documento oficial con la normativa y reglamento del proceso electoral',
      size: 'PDF - 1.8 MB',
      url: '#'
    }
  ];

  const scrollToFooterFAQ = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="guia-miembros">
      <div className="guia-miembros__container">
        {/* Hero Section */}
        <section className="guia-miembros__hero">
          <div className="guia-miembros__hero-content">
            <div className="guia-miembros__hero-badge">
              <Users size={20} />
              <span>Guía Oficial</span>
            </div>
            <h1 className="guia-miembros__hero-title">
              Guía para <span className="guia-miembros__hero-highlight">Miembros de Mesa</span>
            </h1>
            <p className="guia-miembros__hero-description">
              Todo lo que necesitas saber para cumplir tu rol como miembro de mesa 
              en las Elecciones 2026. Información organizada y fácil de navegar.
            </p>
          </div>
        </section>

        {/* Tabs Navigation */}
        <nav className="guia-miembros__tabs">
          <div className="guia-miembros__tabs-container">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`guia-miembros__tab ${activeTab === tab.id ? 'guia-miembros__tab--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span className="guia-miembros__tab-label">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Tab Content */}
        <div className="guia-miembros__content">
          
          {/* INFORMACIÓN GENERAL */}
          {activeTab === 'general' && (
            <div className="guia-miembros__tab-content">
              {/* Video Section */}
              <section className="guia-miembros__section">
                <div className="guia-miembros__section-header">
                  <h2 className="guia-miembros__section-title">
                    <PlayCircle size={32} className="inline-icon" />
                    Video Tutorial ONPE
                  </h2>
                  <p className="guia-miembros__section-subtitle">
                    Aprende sobre tus funciones y responsabilidades
                  </p>
                </div>
                <div className="guia-miembros__video-container">
                  <iframe
                    className="guia-miembros__video"
                    src="https://www.youtube.com/embed/DW5-XnnNSjo"
                    title="Funciones y rol de un miembro de mesa - ONPE"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </section>

              {/* ¿Qué es un miembro de mesa? */}
              <section className="guia-miembros__section guia-miembros__intro">
                <div className="guia-miembros__intro-content">
                  <h2 className="guia-miembros__section-title">¿Qué es un Miembro de Mesa?</h2>
                  <p className="guia-miembros__intro-text">
                    Los miembros de mesa son ciudadanos elegidos al azar por la ONPE para garantizar 
                    la transparencia y el correcto desarrollo del proceso electoral. Son los responsables 
                    de recibir los votos, verificar la identidad de los electores y realizar el conteo 
                    de votos al finalizar la jornada.
                  </p>
                  <p className="guia-miembros__intro-text">
                    Ser miembro de mesa es un <strong>deber ciudadano</strong> y una oportunidad de 
                    participar activamente en la democracia peruana. Tu presencia es fundamental para 
                    que las elecciones sean legítimas y confiables.
                  </p>
                </div>
              </section>
            </div>
          )}

          {/* MIS RESPONSABILIDADES */}
          {activeTab === 'responsabilidades' && (
            <div className="guia-miembros__tab-content">
              {/* Funciones */}
              <section className="guia-miembros__section">
                <div className="guia-miembros__section-header">
                  <h2 className="guia-miembros__section-title">Funciones Principales</h2>
                  <p className="guia-miembros__section-subtitle">
                    Conoce tus principales tareas como miembro de mesa
                  </p>
                </div>
                <div className="guia-miembros__cards-grid">
                  {responsibilities.map((item, index) => (
                    <div key={index} className="guia-miembros__card">
                      <div className="guia-miembros__card-icon guia-miembros__card-icon--primary">
                        {item.icon}
                      </div>
                      <h3 className="guia-miembros__card-title">{item.title}</h3>
                      <p className="guia-miembros__card-description">{item.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Timeline del día */}
              <section className="guia-miembros__section guia-miembros__timeline-section">
                <div className="guia-miembros__section-header">
                  <h2 className="guia-miembros__section-title">
                    <Clock size={32} className="inline-icon" />
                    Timeline del Día Electoral
                  </h2>
                  <p className="guia-miembros__section-subtitle">
                    Conoce el cronograma de actividades paso a paso
                  </p>
                </div>
                <div className="guia-miembros__timeline">
                  {timeline.map((step, index) => (
                    <div key={index} className="guia-miembros__timeline-item">
                      <div className="guia-miembros__timeline-marker"></div>
                      <div className="guia-miembros__timeline-content">
                        <span className="guia-miembros__timeline-time">{step.time}</span>
                        <h3 className="guia-miembros__timeline-title">{step.title}</h3>
                        <p className="guia-miembros__timeline-description">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* DERECHOS Y BENEFICIOS */}
          {activeTab === 'derechos' && (
            <div className="guia-miembros__tab-content">
              <section className="guia-miembros__section">
                <div className="guia-miembros__section-header">
                  <h2 className="guia-miembros__section-title">Derechos y Beneficios</h2>
                  <p className="guia-miembros__section-subtitle">
                    Por tu participación como miembro de mesa recibes
                  </p>
                </div>
                <div className="guia-miembros__benefits-grid">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="guia-miembros__benefit-card">
                      <div className="guia-miembros__benefit-icon">
                        {benefit.icon}
                      </div>
                      <h3 className="guia-miembros__benefit-title">{benefit.title}</h3>
                      <p className="guia-miembros__benefit-description">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Info adicional */}
              <section className="guia-miembros__section guia-miembros__info-box">
                <div className="guia-miembros__info-box-content">
                  <div className="guia-miembros__info-box-icon">
                    <Award size={32} />
                  </div>
                  <div>
                    <h3 className="guia-miembros__info-box-title">¿Cuándo recibo el pago?</h3>
                    <p className="guia-miembros__info-box-text">
                      El pago de S/ 120 soles se realiza después de las elecciones. 
                      Debes estar atento a los comunicados de la ONPE sobre fechas y modalidad de pago.
                      La compensación se deposita en tu cuenta bancaria registrada o puedes recogerla en efectivo.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* DOCUMENTOS */}
          {activeTab === 'documentos' && (
            <div className="guia-miembros__tab-content">
              {/* Qué llevar */}
              <section className="guia-miembros__section">
                <div className="guia-miembros__section-header">
                  <h2 className="guia-miembros__section-title">¿Qué debo llevar?</h2>
                  <p className="guia-miembros__section-subtitle">
                    Lista de documentos y artículos recomendados
                  </p>
                </div>
                <div className="guia-miembros__checklist">
                  {documents.map((doc, index) => (
                    <div key={index} className="guia-miembros__checklist-item">
                      <CheckCircle size={20} className="guia-miembros__checklist-icon" />
                      <span className="guia-miembros__checklist-text">{doc}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Material Descargable */}
              <section className="guia-miembros__section">
                <div className="guia-miembros__section-header">
                  <h2 className="guia-miembros__section-title">Material Descargable</h2>
                  <p className="guia-miembros__section-subtitle">
                    Descarga documentos oficiales de la ONPE
                  </p>
                </div>
                <div className="guia-miembros__downloads-grid">
                  {downloadables.map((item, index) => (
                    <div key={index} className="guia-miembros__download-card">
                      <div className="guia-miembros__download-icon">
                        <FileText size={32} />
                      </div>
                      <div className="guia-miembros__download-info">
                        <h3 className="guia-miembros__download-title">{item.title}</h3>
                        <p className="guia-miembros__download-description">{item.description}</p>
                        <span className="guia-miembros__download-size">{item.size}</span>
                      </div>
                      <button className="guia-miembros__download-btn">
                        <Download size={20} />
                        Descargar
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* IMPORTANTE SABER */}
          {activeTab === 'importante' && (
            <div className="guia-miembros__tab-content">
              {/* Sanciones */}
              <section className="guia-miembros__section guia-miembros__sanctions-section">
                <div className="guia-miembros__section-header">
                  <h2 className="guia-miembros__section-title">
                    <AlertCircle size={32} className="inline-icon" />
                    Sanciones por Inasistencia
                  </h2>
                  <p className="guia-miembros__section-subtitle">
                    Es importante que conozcas las consecuencias de no asistir
                  </p>
                </div>
                <div className="guia-miembros__sanctions-grid">
                  {sanctions.map((sanction, index) => (
                    <div key={index} className="guia-miembros__sanction-card">
                      <div className="guia-miembros__sanction-icon">
                        {sanction.icon}
                      </div>
                      <h3 className="guia-miembros__sanction-title">{sanction.title}</h3>
                      <p className="guia-miembros__sanction-description">{sanction.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Excusas válidas */}
              <section className="guia-miembros__section guia-miembros__info-box guia-miembros__info-box--warning">
                <div className="guia-miembros__info-box-content">
                  <div className="guia-miembros__info-box-icon">
                    <CheckCircle size={32} />
                  </div>
                  <div>
                    <h3 className="guia-miembros__info-box-title">¿Puedo justificar mi inasistencia?</h3>
                    <p className="guia-miembros__info-box-text">
                      <strong>Sí, existen causales válidas:</strong> Ser mayor de 70 años, tener discapacidad, 
                      estar enfermo, vivir a más de 3 horas del local de votación, estar de viaje al extranjero, 
                      entre otros. Debes presentar tu solicitud de excusa en la ONPE con la documentación 
                      correspondiente antes de la fecha electoral.
                    </p>
                  </div>
                </div>
              </section>

              {/* FAQ Link */}
              <section className="guia-miembros__section">
                <div className="guia-miembros__faq-card" onClick={scrollToFooterFAQ}>
                  <div className="guia-miembros__faq-card-icon">
                    <HelpCircle size={48} />
                  </div>
                  <div className="guia-miembros__faq-card-content">
                    <h3 className="guia-miembros__faq-card-title">¿Tienes más dudas?</h3>
                    <p className="guia-miembros__faq-card-description">
                      Visita nuestra sección de Preguntas Frecuentes para resolver todas tus consultas
                    </p>
                  </div>
                  <div className="guia-miembros__faq-card-arrow">
                    <ExternalLink size={24} />
                  </div>
                </div>
              </section>

              {/* Call to Action */}
              <section className="guia-miembros__cta">
                <div className="guia-miembros__cta-content">
                  <h2 className="guia-miembros__cta-title">Contacta con la ONPE</h2>
                  <p className="guia-miembros__cta-description">
                    Para consultas adicionales o casos especiales, comunícate directamente con la ONPE
                  </p>
                  <div className="guia-miembros__cta-actions">
                    <a 
                      href="https://www.onpe.gob.pe" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="guia-miembros__cta-btn guia-miembros__cta-btn--primary"
                    >
                      <ExternalLink size={20} />
                      Visitar ONPE
                    </a>
                    <a 
                      href="tel:+511311-1700" 
                      className="guia-miembros__cta-btn guia-miembros__cta-btn--secondary"
                    >
                      <Phone size={20} />
                      (01) 311-1700
                    </a>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};