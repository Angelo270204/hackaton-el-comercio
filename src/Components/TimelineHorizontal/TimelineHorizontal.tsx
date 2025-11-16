import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './TimelineHorizontal.css';

interface Evento {
  titulo: string;
  year: string;
  numero: string;
  fecha: string;
  icon: string;
}

// Obtener todas las fechas de las fases (solo las primeras 22)
const obtenerTodasLasFechas = (t: (key: string) => string): Evento[] => {
  const fases = [
    {
      nombre: 'Fechas de Elecciones',
      eventos: [
        { titulo: t('calendar.events.primaryAffiliates'), year: '2025', color: '#2563eb', icon: 'calendar', numero: '01', fecha: t('calendar.dates.nov30_2025') },
        { titulo: t('calendar.events.primaryDelegates'), year: '2025', color: '#2563eb', icon: 'calendar', numero: '02', fecha: t('calendar.dates.dec7_2025') },
        { titulo: t('calendar.events.generalElectionsFirst'), year: '2026', color: '#2563eb', icon: 'calendar', numero: '03', fecha: t('calendar.dates.apr12_2026') },
        { titulo: t('calendar.events.secondRound'), year: '2026', color: '#2563eb', icon: 'calendar', numero: '04', fecha: t('calendar.dates.jun7_2026') },
      ]
    },
    {
      nombre: 'Fechas Relevantes del Proceso Electoral',
      eventos: [
        { titulo: t('calendar.events.allianceDeadline'), year: '2025', color: '#48cae4', icon: 'users', numero: '05', fecha: t('calendar.dates.aug2_2025') },
        { titulo: t('calendar.events.allianceRegistration'), year: '2025', color: '#00b4d8', icon: 'book', numero: '06', fecha: t('calendar.dates.sep1_2025') },
        { titulo: t('calendar.events.electoralRollClosure'), year: '2025', color: '#90e0ef', icon: 'users', numero: '07', fecha: t('calendar.dates.oct14_2025') },
        { titulo: t('calendar.events.primaryAffiliates'), year: '2025', color: '#2563eb', icon: 'calendar', numero: '08', fecha: t('calendar.dates.nov30_2025') },
        { titulo: t('calendar.events.primaryDelegates'), year: '2025', color: '#2563eb', icon: 'calendar', numero: '09', fecha: t('calendar.dates.dec7_2025') },
        { titulo: t('calendar.events.finalRollApproval'), year: '2025', color: '#48cae4', icon: 'book', numero: '10', fecha: t('calendar.dates.dec13_2025') },
        { titulo: t('calendar.events.candidateRegistration'), year: '2025', color: '#00b4d8', icon: 'book', numero: '11', fecha: t('calendar.dates.dec23_2025') },
        { titulo: t('calendar.events.candidateWithdrawal'), year: '2026', color: '#90e0ef', icon: 'users', numero: '12', fecha: t('calendar.dates.feb11_2026') },
        { titulo: t('calendar.events.challengesFirst'), year: '2026', color: '#48cae4', icon: 'book', numero: '13', fecha: t('calendar.dates.feb26_2026') },
        { titulo: t('calendar.events.challengesAppeals'), year: '2026', color: '#00b4d8', icon: 'book', numero: '14', fecha: t('calendar.dates.mar13_2026') },
        { titulo: t('calendar.events.finalCandidates'), year: '2026', color: '#2563eb', icon: 'calendar', numero: '15', fecha: t('calendar.dates.mar14_2026') },
        { titulo: t('calendar.events.legalExclusion'), year: '2026', color: '#90e0ef', icon: 'users', numero: '16', fecha: t('calendar.dates.apr11_2026') },
        { titulo: t('calendar.events.generalElections'), year: '2026', color: '#2563eb', icon: 'calendar', numero: '17', fecha: t('calendar.dates.apr12_2026') },
        { titulo: t('calendar.events.secondRoundElection'), year: '2026', color: '#2563eb', icon: 'calendar', numero: '18', fecha: t('calendar.dates.jun7_2026') },
      ]
    },
    {
      nombre: 'Fechas para Miembros de Mesa',
      eventos: [
        { titulo: t('calendar.events.pollWorkersDraw'), year: '2026', color: '#48cae4', icon: 'users', numero: '19', fecha: t('calendar.dates.feb1_2026') },
        { titulo: t('calendar.events.pollWorkersPublication'), year: '2026', color: '#00b4d8', icon: 'users', numero: '20', fecha: t('calendar.dates.feb_mar_2026') },
        { titulo: t('calendar.events.pollWorkersTraining'), year: '2026', color: '#90e0ef', icon: 'book', numero: '21', fecha: t('calendar.dates.training') },
        { titulo: t('calendar.events.pollTablesSetup'), year: '2026', color: '#2563eb', icon: 'calendar', numero: '22', fecha: t('calendar.dates.apr12_2026') },
      ]
    }
  ];

  const todosEventos = fases.flatMap(f => f.eventos);
  // Tomar solo las primeras 22 fechas
  return todosEventos.slice(0, 22).map(ev => ({
    titulo: ev.titulo,
    year: ev.year,
    numero: ev.numero,
    fecha: ev.fecha,
    icon: ev.icon
  }));
};

// Agrupar en grupos de 5, 5, 5, 5, 2
const agruparFechas = (fechas: Evento[]): Evento[][] => {
  const grupos: Evento[][] = [];
  for (let i = 0; i < fechas.length; i += 5) {
    grupos.push(fechas.slice(i, i + 5));
  }
  return grupos;
};

export const TimelineHorizontal: React.FC = () => {
  const { t } = useLanguage();
  const todasLasFechas = obtenerTodasLasFechas(t);
  const grupos = agruparFechas(todasLasFechas);
  const [grupoActual, setGrupoActual] = useState(0);

  const siguienteGrupo = () => {
    setGrupoActual((prev) => (prev + 1) % grupos.length);
  };

  const grupoAnterior = () => {
    setGrupoActual((prev) => (prev - 1 + grupos.length) % grupos.length);
  };

  const fechasActuales = grupos[grupoActual] || [];
  const totalGrupos = grupos.length;
  const indiceInicial = grupoActual * 5;
  const indiceFinal = indiceInicial + fechasActuales.length - 1;

  return (
    <div className="timeline-horizontal-container">
      <div className="timeline-horizontal-header">
        <h2 className="timeline-horizontal-title">{t('calendar.title')}</h2>
        <div className="timeline-horizontal-pagination">
          <button
            className="timeline-horizontal-nav-btn"
            onClick={grupoAnterior}
            disabled={grupoActual === 0}
            aria-label={t('calendar.pagination.previous')}
          >
            <ChevronLeft size={20} />
          </button>
          <span className="timeline-horizontal-pagination-info">
            {indiceInicial + 1} - {indiceFinal + 1} {t('calendar.pagination.of')} {todasLasFechas.length}
          </span>
          <button
            className="timeline-horizontal-nav-btn"
            onClick={siguienteGrupo}
            disabled={grupoActual === totalGrupos - 1}
            aria-label={t('calendar.pagination.next')}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="timeline-horizontal-wrapper">
        <div className="timeline-horizontal-line"></div>
        <div className="timeline-horizontal-events">
          {fechasActuales.map((evento, index) => {
            const numeroEvento = parseInt(evento.numero);
            const porcentajeCompletado = ((numeroEvento - 1) / 21) * 100;
            const alternarArriba = index % 2 === 0;
            
            return (
              <div key={evento.numero} className={`timeline-horizontal-event ${alternarArriba ? 'event-top' : 'event-bottom'}`}>
                {alternarArriba && (
                  <div className="timeline-horizontal-event-info-top">
                    <div className="timeline-horizontal-event-title">{evento.titulo}</div>
                    <div className="timeline-horizontal-event-date">{evento.fecha}</div>
                  </div>
                )}
                <div className="timeline-horizontal-connector-line"></div>
                <div className="timeline-horizontal-circle-wrapper">
                  <div className="timeline-horizontal-circle">
                    <div
                      className="timeline-horizontal-circle-fill"
                      style={{
                        background: `conic-gradient(from 0deg, var(--color-primary) 0deg ${(porcentajeCompletado / 100) * 360}deg, var(--color-gray-100) ${(porcentajeCompletado / 100) * 360}deg 360deg)`
                      }}
                    >
                      <div className="timeline-horizontal-circle-inner">
                        <div className="timeline-horizontal-week-label">{t('calendar.dateLabel')}</div>
                        <div className="timeline-horizontal-week-number">{evento.numero}</div>
                      </div>
                    </div>
                  </div>
                </div>
                {!alternarArriba && (
                  <>
                    <div className="timeline-horizontal-connector-line"></div>
                    <div className="timeline-horizontal-event-info-bottom">
                      <div className="timeline-horizontal-event-title">{evento.titulo}</div>
                      <div className="timeline-horizontal-event-date">{evento.fecha}</div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="timeline-horizontal-dots">
        {grupos.map((_, index) => (
          <button
            key={index}
            className={`timeline-horizontal-dot ${index === grupoActual ? 'active' : ''}`}
            onClick={() => setGrupoActual(index)}
            aria-label={`Ir al grupo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

