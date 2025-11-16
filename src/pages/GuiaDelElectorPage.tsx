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
import '../styles/guiaElector.css';

type TabType = 'general' | 'antesVotar' | 'procesoVotacion' | 'multas' | 'prohibiciones' | 'recomendaciones';

export const GuiaDelElectorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('general');

  const tabs = [
    { id: 'general' as TabType, label: 'Información General', icon: <BookOpen size={20} /> },
    { id: 'antesVotar' as TabType, label: 'Antes de Votar', icon: <MapPin size={20} /> },
    { id: 'procesoVotacion' as TabType, label: 'Proceso de Votación', icon: <Vote size={20} /> },
    { id: 'multas' as TabType, label: 'Multas', icon: <DollarSign size={20} /> },
    { id: 'prohibiciones' as TabType, label: 'Prohibiciones', icon: <XCircle size={20} /> },
    { id: 'recomendaciones' as TabType, label: 'Recomendaciones', icon: <Lightbulb size={20} /> }
  ];

  const cargosEleccion = [
    {
      icon: <Users size={24} />,
      title: 'Presidente y Vicepresidentes',
      description: 'Elegimos al Presidente de la República y sus dos vicepresidentes.'
    },
    {
      icon: <Users size={24} />,
      title: 'Cámara de Diputados',
      description: 'Representantes por cada departamento del país.'
    },
    {
      icon: <Users size={24} />,
      title: 'Cámara de Senadores',
      description: 'Senadores nacionales y regionales.'
    },
    {
      icon: <Users size={24} />,
      title: 'Parlamento Andino',
      description: 'Representantes peruanos ante el organismo supranacional andino.'
    }
  ];

  const requisitosVotar = [
    'Ser mayor de 18 años',
    'Estar inscrito en el padrón electoral',
    'Pueden votar peruanos en Perú y en el extranjero',
    'Voto obligatorio hasta los 70 años',
    'Voto opcional después de los 70 años'
  ];

  const documentosValidos = [
    {
      icon: <CheckCircle size={24} />,
      title: 'DNI Azul',
      description: 'Documento Nacional de Identidad tradicional',
      valid: true
    },
    {
      icon: <CheckCircle size={24} />,
      title: 'DNI Electrónico',
      description: 'Versión moderna del DNI con chip',
      valid: true
    },
    {
      icon: <CheckCircle size={24} />,
      title: 'DNI Amarillo',
      description: 'Para extranjeros residentes',
      valid: true
    },
    {
      icon: <XCircle size={24} />,
      title: 'NO válidos',
      description: 'Pasaporte ni Licencia de conducir',
      valid: false
    }
  ];

  const procesoLocal = [
    { paso: '1', texto: 'Ubicar tu mesa de votación' },
    { paso: '2', texto: 'Hacer cola correspondiente' },
    { paso: '3', texto: 'Presentar tu DNI al miembro de mesa' },
    { paso: '4', texto: 'Firmar el padrón electoral' },
    { paso: '5', texto: 'Recibir la cédula de votación' },
    { paso: '6', texto: 'Ingresar a la cabina secreta' },
    { paso: '7', texto: 'Marcar tu voto' },
    { paso: '8', texto: 'Depositar cédula en el ánfora' },
    { paso: '9', texto: 'Recibir tinta indeleble en el dedo' },
    { paso: '10', texto: 'Recibir constancia de votación (si aplica)' }
  ];

  const multasNoVotar = [
    { distrito: 'Pobre extremo', monto: 'S/ 23.10', icon: <DollarSign size={20} /> },
    { distrito: 'Pobre no extremo', monto: 'S/ 46.20', icon: <DollarSign size={20} /> },
    { distrito: 'No pobre', monto: 'S/ 92.40', icon: <DollarSign size={20} /> }
  ];

  const multasMiembro = [
    { razon: 'No asistir como miembro de mesa', monto: 'S/ 230.00' },
    { razon: 'Retirarse antes de culminar', monto: 'S/ 230.00' }
  ];

  const prohibiciones = [
    'Grabar o tomar fotos dentro de la cabina de votación',
    'Mostrar tu voto a otras personas',
    'Hacer propaganda electoral en el local',
    'Suplantar identidad de otra persona',
    'Ingresar al local con símbolos partidarios',
    'Alterar el orden en el local de votación'
  ];

  const recomendaciones = [
    {
      icon: <CheckCircle size={24} />,
      title: 'Llegar temprano',
      description: 'Evita las aglomeraciones y tendrás más tiempo.'
    },
    {
      icon: <FileText size={24} />,
      title: 'Revisa tu DNI',
      description: 'Verifica días antes que tu documento esté en buen estado.'
    },
    {
      icon: <XCircle size={24} />,
      title: 'No lleves propaganda',
      description: 'Está prohibido ingresar con símbolos o publicidad política.'
    },
    {
      icon: <Users size={24} />,
      title: 'Pide ayuda si tienes dudas',
      description: 'Los miembros de mesa están para orientarte.'
    },
    {
      icon: <Shield size={24} />,
      title: 'Prioridad especial',
      description: 'Embarazadas, adultos mayores y personas con discapacidad tienen prioridad.'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Consulta tu local con anticipación',
      description: 'Ubica tu local de votación días antes en www.onpe.gob.pe'
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
              <span>Guía Oficial</span>
            </div>
            <h1 className="guia-elector__hero-title">
              Guía del <span className="guia-elector__hero-highlight">Elector</span>
            </h1>
            <p className="guia-elector__hero-description">
              Todo lo que necesitas saber para ejercer tu derecho al voto en las 
              Elecciones Generales Perú 2026. Información oficial y resumida.
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
                    Video Instructivo ONPE
                  </h2>
                  <p className="guia-elector__section-subtitle">
                    Aprende cómo separar tu cédula de votación correctamente
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
                      <h3 className="guia-elector__info-box-title">Importante sobre las cédulas</h3>
                      <p className="guia-elector__info-box-text">
                        La cédula de votación se separa en secciones. Los <strong>miembros de la Policía 
                        Nacional y las Fuerzas Armadas</strong> recibirán una cédula especial diferente 
                        a la del resto de ciudadanos.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* ¿Qué se elige? */}
              <section className="guia-elector__section">
                <div className="guia-elector__section-header">
                  <h2 className="guia-elector__section-title">¿Qué se elige en 2026?</h2>
                  <p className="guia-elector__section-subtitle">
                    Conoce los cargos por los que votarás
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
                  <h2 className="guia-elector__section-title">Requisitos para Votar</h2>
                  <p className="guia-elector__section-subtitle">
                    Verifica si estás apto para participar
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
                  <h2 className="guia-elector__section-title">Documentos Válidos</h2>
                  <p className="guia-elector__section-subtitle">
                    Solo estos documentos son aceptados
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
                    ¿Dónde Votar?
                  </h2>
                  <p className="guia-elector__section-subtitle">
                    Consulta tu local de votación con anticipación
                  </p>
                </div>
                
                <div className="guia-elector__info-box">
                  <div className="guia-elector__info-box-content">
                    <div className="guia-elector__info-box-icon">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="guia-elector__info-box-title">Canales de consulta</h3>
                      <p className="guia-elector__info-box-text">
                        Puedes consultar tu local de votación en:
                      </p>
                      <ul className="guia-elector__list">
                        <li><strong>Página web:</strong> www.onpe.gob.pe</li>
                        <li><strong>App móvil:</strong> ONPE (disponible en Play Store y App Store)</li>
                        <li><strong>WhatsApp:</strong> Servicio de consulta ONPE</li>
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
                      <h3 className="guia-elector__info-box-title">Información importante</h3>
                      <p className="guia-elector__info-box-text">
                        Al consultar tu local encontrarás: <strong>nombre del local, número de mesa, 
                        número de orden y pabellón</strong>. Anota esta información o toma captura 
                        de pantalla.
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
                    ¿Qué Llevar el Día de la Votación?
                  </h2>
                  <p className="guia-elector__section-subtitle">
                    Prepara estos elementos antes de salir
                  </p>
                </div>
                
                <div className="guia-elector__cards-grid guia-elector__cards-grid--small">
                  <div className="guia-elector__card">
                    <div className="guia-elector__card-icon guia-elector__card-icon--required">
                      <FileText size={24} />
                    </div>
                    <h3 className="guia-elector__card-title">DNI (Obligatorio)</h3>
                    <p className="guia-elector__card-description">
                      Tu Documento Nacional de Identidad es indispensable para votar.
                    </p>
                  </div>

                  <div className="guia-elector__card">
                    <div className="guia-elector__card-icon guia-elector__card-icon--optional">
                      <CheckCircle size={24} />
                    </div>
                    <h3 className="guia-elector__card-title">Lapicero azul (Opcional)</h3>
                    <p className="guia-elector__card-description">
                      La ONPE entrega lapiceros, pero puedes llevar el tuyo.
                    </p>
                  </div>

                  <div className="guia-elector__card">
                    <div className="guia-elector__card-icon guia-elector__card-icon--optional">
                      <Shield size={24} />
                    </div>
                    <h3 className="guia-elector__card-title">Mascarilla (Si aplica)</h3>
                    <p className="guia-elector__card-description">
                      Si existiera recomendación sanitaria vigente.
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
                  <h2 className="guia-elector__section-title">Proceso en el Local de Votación</h2>
                  <p className="guia-elector__section-subtitle">
                    Sigue estos pasos en orden
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
                    Multas por No Votar
                  </h2>
                  <p className="guia-elector__section-subtitle">
                    El monto varía según tu distrito
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
                  <h2 className="guia-elector__section-title">Multas para Miembros de Mesa</h2>
                  <p className="guia-elector__section-subtitle">
                    Sanciones por incumplimiento de funciones
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
                    Prohibiciones en el Local de Votación
                  </h2>
                  <p className="guia-elector__section-subtitle">
                    Evita sanciones conociendo lo que NO debes hacer
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
                    Recomendaciones para el Día de Votación
                  </h2>
                  <p className="guia-elector__section-subtitle">
                    Consejos útiles para una mejor experiencia electoral
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