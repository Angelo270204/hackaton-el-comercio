import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import './TimelineHorizontal.css';

interface Evento {
  titulo: string;
  year: string;
  numero: string;
  fecha: string;
  icon: string;
}

// Obtener todas las fechas de las fases (solo las primeras 22)
const obtenerTodasLasFechas = (): Evento[] => {
  const fases = [
    {
      nombre: 'Fechas de Elecciones',
      eventos: [
        { titulo: 'Primarias (afiliados y no afiliados)', year: '2025', color: '#2563eb', icon: 'calendar', numero: '01', fecha: '30 de noviembre de 2025' },
        { titulo: 'Primarias (delegados)', year: '2025', color: '#2563eb', icon: 'calendar', numero: '02', fecha: '7 de diciembre de 2025' },
        { titulo: 'Elecciones generales (primera vuelta)', year: '2026', color: '#2563eb', icon: 'calendar', numero: '03', fecha: '12 de abril de 2026' },
        { titulo: 'Segunda vuelta presidencial (si aplica)', year: '2026', color: '#2563eb', icon: 'calendar', numero: '04', fecha: '7 de junio de 2026' },
      ]
    },
    {
      nombre: 'Fechas Relevantes del Proceso Electoral',
      eventos: [
        { titulo: 'Límite para solicitar alianzas electorales', year: '2025', color: '#48cae4', icon: 'users', numero: '05', fecha: '2 de agosto de 2025' },
        { titulo: 'Límite para inscribir alianzas en el ROP', year: '2025', color: '#00b4d8', icon: 'book', numero: '06', fecha: '1 de septiembre de 2025' },
        { titulo: 'Cierre del padrón electoral', year: '2025', color: '#90e0ef', icon: 'users', numero: '07', fecha: '14 de octubre de 2025' },
        { titulo: 'Primarias (afiliados y no afiliados)', year: '2025', color: '#2563eb', icon: 'calendar', numero: '08', fecha: '30 de noviembre de 2025' },
        { titulo: 'Primarias (delegados)', year: '2025', color: '#2563eb', icon: 'calendar', numero: '09', fecha: '7 de diciembre de 2025' },
        { titulo: 'Aprobación del padrón electoral definitivo', year: '2025', color: '#48cae4', icon: 'book', numero: '10', fecha: '13 de diciembre de 2025' },
        { titulo: 'Fecha límite para inscribir fórmulas y listas de candidatos', year: '2025', color: '#00b4d8', icon: 'book', numero: '11', fecha: '23 de diciembre de 2025' },
        { titulo: 'Fin de plazo para renuncia/retiro de candidatos', year: '2026', color: '#90e0ef', icon: 'users', numero: '12', fecha: '11 de febrero de 2026' },
        { titulo: 'Fin para tachas y exclusiones (1ra instancia)', year: '2026', color: '#48cae4', icon: 'book', numero: '13', fecha: '26 de febrero de 2026' },
        { titulo: 'Fin de apelaciones por tachas/exclusiones', year: '2026', color: '#00b4d8', icon: 'book', numero: '14', fecha: '13 de marzo de 2026' },
        { titulo: 'Inscripción definitiva de candidaturas', year: '2026', color: '#2563eb', icon: 'calendar', numero: '15', fecha: '14 de marzo de 2026' },
        { titulo: 'Último día para exclusión por situación jurídica', year: '2026', color: '#90e0ef', icon: 'users', numero: '16', fecha: '11 de abril de 2026' },
        { titulo: 'Elecciones generales', year: '2026', color: '#2563eb', icon: 'calendar', numero: '17', fecha: '12 de abril de 2026' },
        { titulo: 'Segunda vuelta presidencial (si aplica)', year: '2026', color: '#2563eb', icon: 'calendar', numero: '18', fecha: '7 de junio de 2026' },
      ]
    },
    {
      nombre: 'Fechas para Miembros de Mesa',
      eventos: [
        { titulo: 'Sorteo de miembros de mesa', year: '2026', color: '#48cae4', icon: 'users', numero: '19', fecha: 'Hasta el 1 de febrero de 2026' },
        { titulo: 'Publicación de seleccionados', year: '2026', color: '#00b4d8', icon: 'users', numero: '20', fecha: 'Febrero – marzo de 2026' },
        { titulo: 'Capacitaciones ONPE', year: '2026', color: '#90e0ef', icon: 'book', numero: '21', fecha: 'Organización e instalación de mesas de sufragio' },
        { titulo: 'Instalación de mesas para primera vuelta', year: '2026', color: '#2563eb', icon: 'calendar', numero: '22', fecha: '12 de abril de 2026' },
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
  const todasLasFechas = obtenerTodasLasFechas();
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
        <h2 className="timeline-horizontal-title">Cronograma Electoral</h2>
        <div className="timeline-horizontal-pagination">
          <button
            className="timeline-horizontal-nav-btn"
            onClick={grupoAnterior}
            disabled={grupoActual === 0}
            aria-label="Grupo anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="timeline-horizontal-pagination-info">
            {indiceInicial + 1} - {indiceFinal + 1} de {todasLasFechas.length}
          </span>
          <button
            className="timeline-horizontal-nav-btn"
            onClick={siguienteGrupo}
            disabled={grupoActual === totalGrupos - 1}
            aria-label="Siguiente grupo"
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
                        background: `conic-gradient(from 0deg, #2563eb 0deg ${(porcentajeCompletado / 100) * 360}deg, #f5f5f5 ${(porcentajeCompletado / 100) * 360}deg 360deg)`
                      }}
                    >
                      <div className="timeline-horizontal-circle-inner">
                        <div className="timeline-horizontal-week-label">FECHA</div>
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

