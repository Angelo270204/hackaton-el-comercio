import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const quizPreguntas = [
  {
    pregunta: '¿A qué hora deben presentarse los miembros de mesa?',
    opciones: ['8:00 a.m.', '7:00 a.m.', '6:30 a.m.', '9:00 a.m.'],
    respuesta: 1,
  },
  {
    pregunta: '¿Qué función tiene el presidente de mesa?',
    opciones: ['Supervisar el ingreso de votantes', 'Conducir y organizar toda la jornada electoral', 'Controlar la cola', 'Contar los votos'],
    respuesta: 1,
  },
  {
    pregunta: '¿Qué sucede si un miembro de mesa NO cumple su función?',
    opciones: ['No pasa nada', 'Solo recibe una advertencia', 'Se le reemplaza sin sanción', 'Recibe una multa de S/ 230'],
    respuesta: 3,
  },
  {
    pregunta: '¿Qué deben hacer los miembros de mesa cuando termina la votación?',
    opciones: ['Retirarse del local', 'Entregar el ánfora a ONPE sin conteo', 'Realizar el escrutinio y llenar las actas', 'Llamar a los fiscalizadores'],
    respuesta: 2,
  },
  {
    pregunta: '¿Quiénes conforman una mesa de sufragio?',
    opciones: ['Un presidente y dos fiscalizadores', 'Solo un presidente', 'Un presidente, un secretario y un tercer miembro', 'Dos coordinadores de ONPE'],
    respuesta: 2,
  },
];

export const QuizMesa: React.FC = () => {
  const { t } = useLanguage();
  const [respuestas, setRespuestas] = useState<(number|null)[]>(Array(quizPreguntas.length).fill(null));
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [preguntaActual, setPreguntaActual] = useState(0);

  const handleSeleccion = (opIdx: number) => {
    const nuevas = [...respuestas];
    nuevas[preguntaActual] = opIdx;
    setRespuestas(nuevas);
  };

  const aciertos = respuestas.filter((r, idx) => r === quizPreguntas[idx].respuesta).length;

  const siguiente = () => {
    if (preguntaActual < quizPreguntas.length - 1) setPreguntaActual(preguntaActual + 1);
  };
  const anterior = () => {
    if (preguntaActual > 0) setPreguntaActual(preguntaActual - 1);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '2rem auto 3rem auto', background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px #eaf6fb', padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ fontWeight: 700, fontSize: '2.2rem', marginBottom: '2rem', color: '#023E8A' }}>{t('guideMembers.quiz.title')}</h2>
      <div style={{ width: '100%', maxWidth: 700, marginBottom: '2rem', background: '#f1f8fc', borderRadius: 14, padding: '2rem 1.5rem', boxShadow: '0 1px 8px #eaf6fb' }}>
        <div style={{ fontWeight: 600, fontSize: '1.25rem', marginBottom: '1.2rem', color: '#0077b6' }}>
          {preguntaActual + 1}. {quizPreguntas[preguntaActual].pregunta}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {quizPreguntas[preguntaActual].opciones.map((op, opIdx) => {
            const seleccionada = respuestas[preguntaActual] === opIdx;
            const esCorrecta = mostrarResultados && opIdx === quizPreguntas[preguntaActual].respuesta;
            const esIncorrecta = mostrarResultados && seleccionada && !esCorrecta;
            return (
              <button
                key={opIdx}
                onClick={() => handleSeleccion(opIdx)}
                disabled={mostrarResultados}
                style={{
                  padding: '1rem',
                  borderRadius: 10,
                  border: seleccionada ? '2px solid #0096c7' : '1px solid #ccc',
                  background: mostrarResultados
                    ? (esCorrecta ? '#bde5fa' : esIncorrecta ? '#ffb4b4' : '#f8fafc')
                    : (seleccionada ? '#caf0f8' : '#f8fafc'),
                  color: '#222',
                  fontWeight: 500,
                  fontSize: '1.05rem',
                  cursor: mostrarResultados ? 'default' : 'pointer',
                  boxShadow: seleccionada ? '0 2px 8px #eaf6fb' : 'none',
                  transition: 'all 0.2s',
                  minHeight: 56,
                  display: 'block',
                  textAlign: 'left',
                }}
              >
                {op}
                {esCorrecta && (
                  <span style={{ marginLeft: 10, color: '#0096c7', fontWeight: 700 }}>✔</span>
                )}
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <button
            onClick={anterior}
            disabled={preguntaActual === 0}
            style={{ background: '#eaf6fb', color: '#0077b6', fontWeight: 700, padding: '0.7rem 1.5rem', borderRadius: 8, border: 'none', fontSize: '1rem', cursor: preguntaActual === 0 ? 'not-allowed' : 'pointer', opacity: preguntaActual === 0 ? 0.5 : 1 }}
          >{t('guideMembers.quiz.previous')}</button>
          {preguntaActual < quizPreguntas.length - 1 ? (
            <button
              onClick={siguiente}
              style={{ background: '#0096c7', color: '#fff', fontWeight: 700, padding: '0.7rem 1.5rem', borderRadius: 8, border: 'none', fontSize: '1rem', cursor: 'pointer' }}
            >{t('guideMembers.quiz.next')}</button>
          ) : !mostrarResultados ? (
            <button
              onClick={() => setMostrarResultados(true)}
              style={{ background: '#0096c7', color: '#fff', fontWeight: 700, padding: '0.7rem 1.5rem', borderRadius: 8, border: 'none', fontSize: '1rem', cursor: 'pointer' }}
            >{t('guideMembers.quiz.showResults')}</button>
          ) : null}
        </div>
      </div>
      {mostrarResultados && (
        <div style={{ fontWeight: 700, fontSize: '1.4rem', color: aciertos === quizPreguntas.length ? '#38b000' : '#d90429', marginTop: '1.5rem' }}>
          {aciertos === quizPreguntas.length
            ? t('guideMembers.quiz.perfect')
            : `${t('guideMembers.quiz.score')}: ${aciertos} ${t('guideMembers.quiz.of')} ${quizPreguntas.length}`}
        </div>
      )}
    </div>
  );
};
// ...existing code...
// ...existing code...
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

type TabType = 'general' | 'responsabilidades' | 'derechos' | 'documentos' | 'importante' | 'quiz';

export const GuiaMiembrosPage: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [timelinePage, setTimelinePage] = useState<number>(0);

  const tabs = [
    { id: 'general' as TabType, label: t('guideMembers.tabs.general'), icon: <BookOpen size={20} /> },
    { id: 'responsabilidades' as TabType, label: t('guideMembers.tabs.responsibilities'), icon: <Shield size={20} /> },
    { id: 'derechos' as TabType, label: t('guideMembers.tabs.rights'), icon: <Award size={20} /> },
    { id: 'documentos' as TabType, label: t('guideMembers.tabs.documents'), icon: <FileText size={20} /> },
    { id: 'importante' as TabType, label: t('guideMembers.tabs.important'), icon: <AlertCircle size={20} /> },
    { id: 'quiz' as TabType, label: t('guideMembers.tabs.quiz'), icon: <HelpCircle size={20} /> }
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
  
  // Paginación del timeline (2 items por página)
  const itemsPerPage = 2;
  const totalPages = Math.ceil(timeline.length / itemsPerPage);
  const startIdx = timelinePage * itemsPerPage;
  const currentTimelineItems = timeline.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="guia-miembros">
      <div className="guia-miembros__container">
        {/* Hero (sin timeline) */}
        <section className="guia-miembros__hero">
          <div className="guia-miembros__hero-content">
            <div className="guia-miembros__hero-badge">
              <Users size={20} />
              <span>{t('guideMembers.hero.badge')}</span>
            </div>
            <h1 className="guia-miembros__hero-title">
              {t('guideMembers.hero.title')} <span className="guia-miembros__hero-highlight">{t('guideMembers.hero.titleHighlight')}</span>
            </h1>
            <p className="guia-miembros__hero-description">
              {t('guideMembers.hero.description')}
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
              {/* Video + Timeline (comparten el mismo espacio) */}
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
                <div className="guia-miembros__video-timeline-container">
                  <div className="guia-miembros__video-container">
                    <iframe
                      className="guia-miembros__video"
                      src="https://www.youtube.com/embed/DW5-XnnNSjo"
                      title="Funciones y rol de un miembro de mesa - ONPE"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <aside className="guia-miembros__timeline-section">
                    <div className="guia-miembros__timeline-header">
                      <Clock size={18} />
                      <h3 className="guia-miembros__timeline-header-title">Timeline del Día Electoral</h3>
                    </div>
                    <div className="guia-miembros__timeline">
                      {currentTimelineItems.map((step, index) => (
                        <div key={startIdx + index} className="guia-miembros__timeline-item">
                          <div className="guia-miembros__timeline-marker"></div>
                          <div className="guia-miembros__timeline-content">
                            <span className="guia-miembros__timeline-time">{step.time}</span>
                            <h4 className="guia-miembros__timeline-title">{step.title}</h4>
                            <p className="guia-miembros__timeline-description">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="guia-miembros__timeline-pagination">
                      <button
                        className="guia-miembros__timeline-btn"
                        disabled={timelinePage === 0}
                        onClick={() => setTimelinePage((p) => Math.max(0, p - 1))}
                      >
                        Anterior
                      </button>
                      <span className="guia-miembros__timeline-page-indicator">
                        {timelinePage + 1} / {totalPages}
                      </span>
                      <button
                        className="guia-miembros__timeline-btn"
                        disabled={timelinePage >= totalPages - 1}
                        onClick={() => setTimelinePage((p) => Math.min(totalPages - 1, p + 1))}
                      >
                        Siguiente
                      </button>
                    </div>
                  </aside>
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

              {/* Timeline se movió al header derecho */}
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

          {/* QUIZ PARA MIEMBROS */}
          {activeTab === 'quiz' && (
            <div className="guia-miembros__tab-content">
              <section className="guia-miembros__section">
                <QuizMesa />
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};