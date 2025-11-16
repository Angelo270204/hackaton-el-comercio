import React, { useState } from 'react';
import { 
  CheckCircle, 
  FileText, 
  AlertCircle,
  Users,
  MapPin,
  Briefcase,
  DollarSign,
  XCircle,
  PlayCircle,
  BookOpen,
  Vote,
  Shield,
  Lightbulb
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/guiaElector.css';

type TabType = 'general' | 'antesVotar' | 'procesoVotacion' | 'multas' | 'prohibiciones' | 'recomendaciones';

export const GuiaDelElectorPage: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('general');

  const tabs = [
    { id: 'general' as TabType, label: t('guideElector.tabs.general'), icon: <BookOpen size={20} /> },
    { id: 'antesVotar' as TabType, label: t('guideElector.tabs.beforeVoting'), icon: <MapPin size={20} /> },
    { id: 'procesoVotacion' as TabType, label: t('guideElector.tabs.votingProcess'), icon: <Vote size={20} /> },
    { id: 'multas' as TabType, label: t('guideElector.tabs.fines'), icon: <DollarSign size={20} /> },
    { id: 'prohibiciones' as TabType, label: t('guideElector.tabs.prohibitions'), icon: <XCircle size={20} /> },
    { id: 'recomendaciones' as TabType, label: t('guideElector.tabs.recommendations'), icon: <Lightbulb size={20} /> }
  ];

  const cargosEleccion = [
    {
      icon: <Users size={24} />,
      title: t('guideElector.positions.president'),
      description: t('guideElector.positions.presidentDesc')
    },
    {
      icon: <Users size={24} />,
      title: t('guideElector.positions.deputies'),
      description: t('guideElector.positions.deputiesDesc')
    },
    {
      icon: <Users size={24} />,
      title: t('guideElector.positions.senators'),
      description: t('guideElector.positions.senatorsDesc')
    },
    {
      icon: <Users size={24} />,
      title: t('guideElector.positions.andean'),
      description: t('guideElector.positions.andeanDesc')
    }
  ];

  const requisitosVotar = [
    t('guideElector.requirements.req1'),
    t('guideElector.requirements.req2'),
    t('guideElector.requirements.req3'),
    t('guideElector.requirements.req4'),
    t('guideElector.requirements.req5')
  ];

  const documentosValidos = [
    {
      icon: <CheckCircle size={24} />,
      title: t('guideElector.documents.blueDNI'),
      description: t('guideElector.documents.blueDNIDesc'),
      valid: true
    },
    {
      icon: <CheckCircle size={24} />,
      title: t('guideElector.documents.electronicDNI'),
      description: t('guideElector.documents.electronicDNIDesc'),
      valid: true
    },
    {
      icon: <CheckCircle size={24} />,
      title: t('guideElector.documents.yellowDNI'),
      description: t('guideElector.documents.yellowDNIDesc'),
      valid: true
    },
    {
      icon: <XCircle size={24} />,
      title: t('guideElector.documents.notValid'),
      description: t('guideElector.documents.notValidDesc'),
      valid: false
    }
  ];

  const procesoLocal = [
    { paso: '1', texto: t('guideElector.votingProcess.step1') },
    { paso: '2', texto: t('guideElector.votingProcess.step2') },
    { paso: '3', texto: t('guideElector.votingProcess.step3') },
    { paso: '4', texto: t('guideElector.votingProcess.step4') },
    { paso: '5', texto: t('guideElector.votingProcess.step5') },
    { paso: '6', texto: t('guideElector.votingProcess.step6') },
    { paso: '7', texto: t('guideElector.votingProcess.step7') },
    { paso: '8', texto: t('guideElector.votingProcess.step8') },
    { paso: '9', texto: t('guideElector.votingProcess.step9') },
    { paso: '10', texto: t('guideElector.votingProcess.step10') }
  ];

  const multasNoVotar = [
    { distrito: t('guideElector.fines.extremePoor'), monto: 'S/ 23.10', icon: <DollarSign size={20} /> },
    { distrito: t('guideElector.fines.nonExtremePoor'), monto: 'S/ 46.20', icon: <DollarSign size={20} /> },
    { distrito: t('guideElector.fines.notPoor'), monto: 'S/ 92.40', icon: <DollarSign size={20} /> }
  ];

  const multasMiembro = [
    { razon: t('guideElector.fines.notAttend'), monto: 'S/ 230.00' },
    { razon: t('guideElector.fines.leaveEarly'), monto: 'S/ 230.00' }
  ];

  const prohibiciones = [
    t('guideElector.prohibitions.proh1'),
    t('guideElector.prohibitions.proh2'),
    t('guideElector.prohibitions.proh3'),
    t('guideElector.prohibitions.proh4'),
    t('guideElector.prohibitions.proh5'),
    t('guideElector.prohibitions.proh6')
  ];

  const recomendaciones = [
    {
      icon: <CheckCircle size={24} />,
      title: t('guideElector.recommendations.arriveEarly'),
      description: t('guideElector.recommendations.arriveEarlyDesc')
    },
    {
      icon: <FileText size={24} />,
      title: t('guideElector.recommendations.checkDNI'),
      description: t('guideElector.recommendations.checkDNIDesc')
    },
    {
      icon: <XCircle size={24} />,
      title: t('guideElector.recommendations.noPropaganda'),
      description: t('guideElector.recommendations.noPropagandaDesc')
    },
    {
      icon: <Users size={24} />,
      title: t('guideElector.recommendations.askHelp'),
      description: t('guideElector.recommendations.askHelpDesc')
    },
    {
      icon: <Shield size={24} />,
      title: t('guideElector.recommendations.priority'),
      description: t('guideElector.recommendations.priorityDesc')
    },
    {
      icon: <MapPin size={24} />,
      title: t('guideElector.recommendations.checkLocation'),
      description: t('guideElector.recommendations.checkLocationDesc')
    }
  ];

  return (
    <div className="guia-elector">
      <div className="guia-elector__container">
        {/* Hero Section */}
        <section className="guia-elector__hero">
          <div className="guia-elector__hero-content">
            <div className="guia-elector__hero-badge">
              <Vote size={20} />
              <span>{t('guideElector.hero.badge')}</span>
            </div>
            <h1 className="guia-elector__hero-title">
              {t('guideElector.hero.title')} <span className="guia-elector__hero-highlight">{t('guideElector.hero.titleHighlight')}</span>
            </h1>
            <p className="guia-elector__hero-description">
              {t('guideElector.hero.description')}
            </p>
          </div>
        </section>

        {/* Tabs Navigation */}
        <nav className="guia-elector__tabs">
          <div className="guia-elector__tabs-container">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`guia-elector__tab ${activeTab === tab.id ? 'guia-elector__tab--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span className="guia-elector__tab-label">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Tab Content */}
        <div className="guia-elector__content">
          
          {/* INFORMACIÓN GENERAL */}
          {activeTab === 'general' && (
            <div className="guia-elector__tab-content">
              
              {/* Video ONPE */}
              <section className="guia-elector__section">
                <div className="guia-elector__section-header">
                  <h2 className="guia-elector__section-title">
                    <PlayCircle size={32} className="inline-icon" />
                    {t('guideElector.general.videoTitle')}
                  </h2>
                  <p className="guia-elector__section-subtitle">
                    {t('guideElector.general.videoSubtitle')}
                  </p>
                </div>
                <div className="guia-elector__video-container">
                  <iframe
                    className="guia-elector__video"
                    src="https://www.youtube.com/embed/1l0783CZRWA"
                    title="Cómo votar en las Elecciones 2026 - ONPE"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="guia-elector__info-box guia-elector__info-box--info">
                  <div className="guia-elector__info-box-content">
                    <div className="guia-elector__info-box-icon">
                      <AlertCircle size={24} />
                    </div>
                    <div>
                      <h3 className="guia-elector__info-box-title">{t('guideElector.general.importantBallots')}</h3>
                      <p className="guia-elector__info-box-text">
                        {t('guideElector.general.importantBallotsText')}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* ¿Qué se elige? */}
              <section className="guia-elector__section">
                <div className="guia-elector__section-header">
                  <h2 className="guia-elector__section-title">{t('guideElector.general.whatElected')}</h2>
                  <p className="guia-elector__section-subtitle">
                    {t('guideElector.general.whatElectedSubtitle')}
                  </p>
                </div>
                <div className="guia-elector__cards-grid">
                  {cargosEleccion.map((cargo, index) => (
                    <div key={index} className="guia-elector__card">
                      <div className="guia-elector__card-icon guia-elector__card-icon--primary">
                        {cargo.icon}
                      </div>
                      <h3 className="guia-elector__card-title">{cargo.title}</h3>
                      <p className="guia-elector__card-description">{cargo.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Requisitos para votar */}
              <section className="guia-elector__section">
                <div className="guia-elector__section-header">
                  <h2 className="guia-elector__section-title">{t('guideElector.general.requirementsTitle')}</h2>
                  <p className="guia-elector__section-subtitle">
                    {t('guideElector.general.requirementsSubtitle')}
                  </p>
                </div>
                <div className="guia-elector__checklist">
                  {requisitosVotar.map((requisito, index) => (
                    <div key={index} className="guia-elector__checklist-item">
                      <CheckCircle className="guia-elector__checklist-icon" size={20} />
                      <span className="guia-elector__checklist-text">{requisito}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Documentos válidos */}
              <section className="guia-elector__section">
                <div className="guia-elector__section-header">
                  <h2 className="guia-elector__section-title">{t('guideElector.general.documentsTitle')}</h2>
                  <p className="guia-elector__section-subtitle">
                    {t('guideElector.general.documentsSubtitle')}
                  </p>
                </div>
                <div className="guia-elector__documents-grid">
                  {documentosValidos.map((doc, index) => (
                    <div 
                      key={index} 
                      className={`guia-elector__document-card ${
                        doc.valid ? 'guia-elector__document-card--valid' : 'guia-elector__document-card--invalid'
                      }`}
                    >
                      <div className={`guia-elector__document-icon ${
                        doc.valid ? 'guia-elector__document-icon--valid' : 'guia-elector__document-icon--invalid'
                      }`}>
                        {doc.icon}
                      </div>
                      <h3 className="guia-elector__document-title">{doc.title}</h3>
                      <p className="guia-elector__document-description">{doc.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ANTES DE VOTAR */}
          {activeTab === 'antesVotar' && (
            <div className="guia-elector__tab-content">
              
              {/* Dónde votar */}
              <section className="guia-elector__section">
                <div className="guia-elector__section-header">
                  <h2 className="guia-elector__section-title">
                    <MapPin size={32} className="inline-icon" />
                    {t('guideElector.beforeVoting.whereVoteTitle')}
                  </h2>
                  <p className="guia-elector__section-subtitle">
                    {t('guideElector.beforeVoting.whereVoteSubtitle')}
                  </p>
                </div>
                
                <div className="guia-elector__info-box">
                  <div className="guia-elector__info-box-content">
                    <div className="guia-elector__info-box-icon">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="guia-elector__info-box-title">{t('guideElector.beforeVoting.channelsTitle')}</h3>
                      <p className="guia-elector__info-box-text">
                        {t('guideElector.beforeVoting.channelsText')}
                      </p>
                      <ul className="guia-elector__list">
                        <li><strong>{t('guideElector.beforeVoting.website')}</strong> www.onpe.gob.pe</li>
                        <li><strong>{t('guideElector.beforeVoting.mobileApp')}</strong> ONPE (disponible en Play Store y App Store)</li>
                        <li><strong>{t('guideElector.beforeVoting.whatsapp')}</strong> {t('guideElector.beforeVoting.whatsappText')}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="guia-elector__info-box guia-elector__info-box--warning">
                  <div className="guia-elector__info-box-content">
                    <div className="guia-elector__info-box-icon">
                      <AlertCircle size={24} />
                    </div>
                    <div>
                      <h3 className="guia-elector__info-box-title">{t('guideElector.beforeVoting.importantInfo')}</h3>
                      <p className="guia-elector__info-box-text">
                        {t('guideElector.beforeVoting.importantInfoText')}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Qué llevar */}
              <section className="guia-elector__section">
                <div className="guia-elector__section-header">
                  <h2 className="guia-elector__section-title">
                    <Briefcase size={32} className="inline-icon" />
                    {t('guideElector.beforeVoting.whatBringTitle')}
                  </h2>
                  <p className="guia-elector__section-subtitle">
                    {t('guideElector.beforeVoting.whatBringSubtitle')}
                  </p>
                </div>
                
                <div className="guia-elector__cards-grid guia-elector__cards-grid--small">
                  <div className="guia-elector__card">
                    <div className="guia-elector__card-icon guia-elector__card-icon--required">
                      <FileText size={24} />
                    </div>
                    <h3 className="guia-elector__card-title">{t('guideElector.beforeVoting.dniRequired')}</h3>
                    <p className="guia-elector__card-description">
                      {t('guideElector.beforeVoting.dniRequiredDesc')}
                    </p>
                  </div>

                  <div className="guia-elector__card">
                    <div className="guia-elector__card-icon guia-elector__card-icon--optional">
                      <CheckCircle size={24} />
                    </div>
                    <h3 className="guia-elector__card-title">{t('guideElector.beforeVoting.penOptional')}</h3>
                    <p className="guia-elector__card-description">
                      {t('guideElector.beforeVoting.penOptionalDesc')}
                    </p>
                  </div>

                  <div className="guia-elector__card">
                    <div className="guia-elector__card-icon guia-elector__card-icon--optional">
                      <Shield size={24} />
                    </div>
                    <h3 className="guia-elector__card-title">{t('guideElector.beforeVoting.maskOptional')}</h3>
                    <p className="guia-elector__card-description">
                      {t('guideElector.beforeVoting.maskOptionalDesc')}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* PROCESO DE VOTACIÓN */}
          {activeTab === 'procesoVotacion' && (
            <div className="guia-elector__tab-content">
              
              {/* Proceso en el local */}
              <section className="guia-elector__section">
                <div className="guia-elector__section-header">
                  <h2 className="guia-elector__section-title">{t('guideElector.votingProcess.title')}</h2>
                  <p className="guia-elector__section-subtitle">
                    {t('guideElector.votingProcess.subtitle')}
                  </p>
                </div>
                
                <div className="guia-elector__timeline">
                  {procesoLocal.map((item, index) => (
                    <div key={index} className="guia-elector__timeline-item">
                      <div className="guia-elector__timeline-marker">
                        <span className="guia-elector__timeline-number">{item.paso}</span>
                      </div>
                      <div className="guia-elector__timeline-content">
                        <p className="guia-elector__timeline-text">{item.texto}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Cómo marcar el voto */}
              <section className="guia-elector__section">
                <div className="guia-elector__section-header">
                  <h2 className="guia-elector__section-title">¿Cómo Marcar tu Voto?</h2>
                  <p className="guia-elector__section-subtitle">
                    Aprende a marcar correctamente tu cédula
                  </p>
                </div>

                {/* Voto válido */}
                <div className="guia-elector__info-box guia-elector__info-box--success">
                  <div className="guia-elector__info-box-content">
                    <div className="guia-elector__info-box-icon">
                      <CheckCircle size={24} />
                    </div>
                    <div>
                      <h3 className="guia-elector__info-box-title">Voto Válido</h3>
                      <p className="guia-elector__info-box-text">
                        Marca <strong>solo un recuadro</strong> con una cruz (X) o aspa (+). 
                        Puedes marcar el <strong>símbolo o el número</strong> de tu candidato preferido.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Voto nulo */}
                <div className="guia-elector__info-box guia-elector__info-box--error">
                  <div className="guia-elector__info-box-content">
                    <div className="guia-elector__info-box-icon">
                      <XCircle size={24} />
                    </div>
                    <div>
                      <h3 className="guia-elector__info-box-title">Voto Nulo</h3>
                      <p className="guia-elector__info-box-text">
                        Tu voto será considerado nulo si:
                      </p>
                      <ul className="guia-elector__list">
                        <li>Marcas varios recuadros</li>
                        <li>Haces marcas fuera del recuadro</li>
                        <li>Escribes o dibujas en la cédula</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Voto en blanco */}
                <div className="guia-elector__info-box guia-elector__info-box--neutral">
                  <div className="guia-elector__info-box-content">
                    <div className="guia-elector__info-box-icon">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h3 className="guia-elector__info-box-title">Voto en Blanco</h3>
                      <p className="guia-elector__info-box-text">
                        Si no marcas ningún recuadro, tu voto será contabilizado como <strong>voto en blanco</strong>. 
                        Es una opción válida dentro del proceso democrático.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* MULTAS */}
          {activeTab === 'multas' && (
            <div className="guia-elector__tab-content">
              
              {/* Multas por no votar */}
              <section className="guia-elector__section">
                <div className="guia-elector__section-header">
                  <h2 className="guia-elector__section-title">
                    <DollarSign size={32} className="inline-icon" />
                    {t('guideElector.fines.notVotingTitle')}
                  </h2>
                  <p className="guia-elector__section-subtitle">
                    {t('guideElector.fines.notVotingSubtitle')}
                  </p>
                </div>

                <div className="guia-elector__multas-grid">
                  {multasNoVotar.map((multa, index) => (
                    <div key={index} className="guia-elector__multa-card">
                      <div className="guia-elector__multa-icon">
                        {multa.icon}
                      </div>
                      <h3 className="guia-elector__multa-distrito">{multa.distrito}</h3>
                      <p className="guia-elector__multa-monto">{multa.monto}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Multas miembro de mesa */}
              <section className="guia-elector__section">
                <div className="guia-elector__section-header">
                  <h2 className="guia-elector__section-title">{t('guideElector.fines.memberTitle')}</h2>
                  <p className="guia-elector__section-subtitle">
                    {t('guideElector.fines.memberSubtitle')}
                  </p>
                </div>

                <div className="guia-elector__info-box guia-elector__info-box--warning">
                  <div className="guia-elector__info-box-content">
                    <div className="guia-elector__info-box-icon">
                      <AlertCircle size={24} />
                    </div>
                    <div>
                      <h3 className="guia-elector__info-box-title">Sanciones de S/ 230.00</h3>
                      <ul className="guia-elector__list">
                        {multasMiembro.map((sancion, index) => (
                          <li key={index}>
                            <strong>{sancion.razon}:</strong> {sancion.monto}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* PROHIBICIONES */}
          {activeTab === 'prohibiciones' && (
            <div className="guia-elector__tab-content">
              <section className="guia-elector__section">
                <div className="guia-elector__section-header">
                  <h2 className="guia-elector__section-title">
                    <XCircle size={32} className="inline-icon" />
                    {t('guideElector.prohibitions.title')}
                  </h2>
                  <p className="guia-elector__section-subtitle">
                    {t('guideElector.prohibitions.subtitle')}
                  </p>
                </div>

                <div className="guia-elector__prohibiciones-grid">
                  {prohibiciones.map((prohibicion, index) => (
                    <div key={index} className="guia-elector__prohibicion-item">
                      <div className="guia-elector__prohibicion-icon">
                        <XCircle size={24} />
                      </div>
                      <p className="guia-elector__prohibicion-text">{prohibicion}</p>
                    </div>
                  ))}
                </div>

                <div className="guia-elector__info-box guia-elector__info-box--error">
                  <div className="guia-elector__info-box-content">
                    <div className="guia-elector__info-box-icon">
                      <AlertCircle size={24} />
                    </div>
                    <div>
                      <h3 className="guia-elector__info-box-title">Importante</h3>
                      <p className="guia-elector__info-box-text">
                        El incumplimiento de estas prohibiciones puede resultar en <strong>sanciones legales</strong> 
                        y afectar la validez del proceso electoral.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* RECOMENDACIONES */}
          {activeTab === 'recomendaciones' && (
            <div className="guia-elector__tab-content">
              <section className="guia-elector__section">
                <div className="guia-elector__section-header">
                  <h2 className="guia-elector__section-title">
                    <Lightbulb size={32} className="inline-icon" />
                    {t('guideElector.recommendations.title')}
                  </h2>
                  <p className="guia-elector__section-subtitle">
                    {t('guideElector.recommendations.subtitle')}
                  </p>
                </div>

                <div className="guia-elector__cards-grid">
                  {recomendaciones.map((rec, index) => (
                    <div key={index} className="guia-elector__card">
                      <div className="guia-elector__card-icon guia-elector__card-icon--recommendation">
                        {rec.icon}
                      </div>
                      <h3 className="guia-elector__card-title">{rec.title}</h3>
                      <p className="guia-elector__card-description">{rec.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA Final */}
              <section className="guia-elector__cta">
                <div className="guia-elector__cta-content">
                  <h2 className="guia-elector__cta-title">¿Tienes más preguntas?</h2>
                  <p className="guia-elector__cta-description">
                    Visita la sección de Preguntas Frecuentes o contacta directamente con la ONPE 
                    para resolver tus dudas sobre el proceso electoral.
                  </p>
                  <div className="guia-elector__cta-actions">
                    <a 
                      href="https://www.onpe.gob.pe" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="guia-elector__cta-btn guia-elector__cta-btn--primary"
                    >
                      Visitar ONPE
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

export default GuiaDelElectorPage;