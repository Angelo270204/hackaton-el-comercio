import { Calendar, Users, BookOpen, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
// Fechas clave del cronograma electoral organizadas por categorías (22 fechas)
const fechasClave = [
  // PROCESO ELECTORAL
  {
    fecha: '2 de agosto de 2025',
    year: '2025',
    color: '#48cae4',
    titulo: 'Límite para solicitar alianzas electorales',
    descripcion: 'Fecha límite para que los partidos políticos soliciten formalmente la formación de alianzas electorales.',
    categoria: 'Proceso Electoral',
    icon: <Users size={24} />,
  },
  {
    fecha: '1 de septiembre de 2025',
    year: '2025',
    color: '#00b4d8',
    titulo: 'Límite para inscribir alianzas en el ROP',
    descripcion: 'Es el plazo máximo para que las alianzas electorales se inscriban en el Registro de Organizaciones Políticas (ROP).',
    categoria: 'Proceso Electoral',
    icon: <BookOpen size={24} />,
  },
  {
    fecha: '14 de octubre de 2025',
    year: '2025',
    color: '#90e0ef',
    titulo: 'Cierre del padrón electoral',
    descripcion: 'RENIEC cierra el padrón electoral para que ya no se puedan hacer más modificaciones en la lista de votantes.',
    categoria: 'Proceso Electoral',
    icon: <Calendar size={24} />,
  },
  // ELECCIONES
  {
    fecha: '30 de noviembre de 2025',
    year: '2025',
    color: '#0077b6',
    titulo: 'Primarias (afiliados y no afiliados)',
    descripcion: 'Se realizan las elecciones primarias entre afiliados y no afiliados para elegir delegados de organizaciones políticas.',
    categoria: 'Elecciones',
    icon: <Sparkles size={24} />,
  },
  {
    fecha: '7 de diciembre de 2025',
    year: '2025',
    color: '#0096c7',
    titulo: 'Primarias (delegados)',
    descripcion: 'Los delegados de cada partido/alianza votan para definir candidatos oficiales ("candidaturas por delegados").',
    categoria: 'Elecciones',
    icon: <ArrowRight size={24} />,
  },
  {
    fecha: '13 de diciembre de 2025',
    year: '2025',
    color: '#00b4d8',
    titulo: 'Aprobación del padrón electoral definitivo',
    descripcion: 'Se aprueba de manera definitiva el padrón electoral que se utilizará en las elecciones.',
    categoria: 'Proceso Electoral',
    icon: <BookOpen size={24} />,
  },
  {
    fecha: '23 de diciembre de 2025',
    year: '2025',
    color: '#90e0ef',
    titulo: 'Inscripción de fórmulas y listas de candidatos',
    descripcion: 'Fecha límite para inscribir fórmulas presidenciales, listas al Congreso, Parlamento Andino, etc.',
    categoria: 'Proceso Electoral',
    icon: <Calendar size={24} />,
  },
  // MIEMBROS DE MESA
  {
    fecha: '1 de febrero de 2026',
    year: '2026',
    color: '#48cae4',
    titulo: 'Sorteo de miembros de mesa',
    descripcion: 'Hasta esta fecha se realiza el sorteo para seleccionar a los ciudadanos que actuarán como miembros de mesa.',
    categoria: 'Miembros de Mesa',
    icon: <Users size={24} />,
  },
  {
    fecha: '1 de febrero de 2026',
    year: '2026',
    color: '#795548',
    titulo: 'Inicio publicación de seleccionados',
    descripcion: 'Comienza el período de publicación de los ciudadanos seleccionados como miembros de mesa.',
    categoria: 'Miembros de Mesa',
    icon: <BookOpen size={24} />,
  },
  {
    fecha: '1 de febrero de 2026',
    year: '2026',
    color: '#795548',
    titulo: 'Inicio de capacitaciones ONPE',
    descripcion: 'La ONPE inicia las capacitaciones para los miembros de mesa seleccionados.',
    categoria: 'Miembros de Mesa',
    icon: <Calendar size={24} />,
  },
  {
    fecha: '11 de febrero de 2026',
    year: '2026',
    color: '#00b4d8',
    titulo: 'Fin de plazo para renuncia/retiro de candidatos',
    descripcion: 'Último día para que los candidatos puedan renunciar o retirarse de sus candidaturas.',
    categoria: 'Proceso Electoral',
    icon: <BookOpen size={24} />,
  },
  {
    fecha: '26 de febrero de 2026',
    year: '2026',
    color: '#0096c7',
    titulo: 'Fin para tachas y exclusiones (1ra instancia)',
    descripcion: 'Fecha límite para presentar tachas y exclusiones en primera instancia contra las candidaturas.',
    categoria: 'Proceso Electoral',
    icon: <ArrowRight size={24} />,
  },
  {
    fecha: '1 de marzo de 2026',
    year: '2026',
    color: '#795548',
    titulo: 'Fin publicación de seleccionados',
    descripcion: 'Termina el período de publicación de los ciudadanos seleccionados como miembros de mesa.',
    categoria: 'Miembros de Mesa',
    icon: <Users size={24} />,
  },
  {
    fecha: '1 de marzo de 2026',
    year: '2026',
    color: '#795548',
    titulo: 'Fin de capacitaciones ONPE',
    descripcion: 'Concluyen las capacitaciones de la ONPE para los miembros de mesa.',
    categoria: 'Miembros de Mesa',
    icon: <BookOpen size={24} />,
  },
  {
    fecha: '1 de marzo de 2026',
    year: '2026',
    color: '#795548',
    titulo: 'Organización e instalación de mesas de sufragio',
    descripcion: 'Se completa la organización e instalación de las mesas de sufragio para las elecciones.',
    categoria: 'Miembros de Mesa',
    icon: <Calendar size={24} />,
  },
  {
    fecha: '13 de marzo de 2026',
    year: '2026',
    color: '#0077b6',
    titulo: 'Fin de apelaciones por tachas/exclusiones',
    descripcion: 'Último día para presentar apelaciones relacionadas con tachas y exclusiones de candidaturas.',
    categoria: 'Proceso Electoral',
    icon: <Calendar size={24} />,
  },
  {
    fecha: '14 de marzo de 2026',
    year: '2026',
    color: '#48cae4',
    titulo: 'Inscripción definitiva de candidaturas',
    descripcion: 'Después de resolver tachas y apelaciones, las candidaturas son oficialmente inscritas de manera definitiva.',
    categoria: 'Proceso Electoral',
    icon: <BookOpen size={24} />,
  },
  {
    fecha: '11 de abril de 2026',
    year: '2026',
    color: '#90e0ef',
    titulo: 'Último día para exclusión por situación jurídica',
    descripcion: 'Fecha límite para excluir candidatos por situaciones jurídicas sobrevinientes.',
    categoria: 'Proceso Electoral',
    icon: <ArrowRight size={24} />,
  },
  {
    fecha: '12 de abril de 2026',
    year: '2026',
    color: '#00b4d8',
    titulo: 'Elecciones generales (primera vuelta)',
    descripcion: 'Día de las elecciones generales donde se elige Presidente, Congresistas y representantes al Parlamento Andino.',
    categoria: 'Elecciones',
    icon: <Sparkles size={24} />,
  },
  {
    fecha: '12 de abril de 2026',
    year: '2026',
    color: '#795548',
    titulo: 'Instalación de mesas para primera vuelta',
    descripcion: 'Los miembros de mesa instalan y organizan las mesas de sufragio para la primera vuelta electoral.',
    categoria: 'Miembros de Mesa',
    icon: <Users size={24} />,
  },
  {
    fecha: '7 de junio de 2026',
    year: '2026',
    color: '#0096c7',
    titulo: 'Segunda vuelta presidencial (si aplica)',
    descripcion: 'Si ningún candidato presidencial obtiene la mayoría necesaria en primera vuelta, se realizará la segunda vuelta electoral.',
    categoria: 'Elecciones',
    icon: <Sparkles size={24} />,
  },
  {
    fecha: '7 de junio de 2026',
    year: '2026',
    color: '#795548',
    titulo: 'Instalación de mesas para segunda vuelta (si aplica)',
    descripcion: 'Los miembros de mesa instalan y organizan las mesas de sufragio para la segunda vuelta electoral, si es necesaria.',
    categoria: 'Miembros de Mesa',
    icon: <Users size={24} />,
  },
];
// CalendarEvent.tsx
import React, { useState } from 'react';
import '../styles/calendarEvent.css'

interface CalendarEventProps {
  date: string;
  title: string;
  highlight?: boolean;
}

export const CalendarEvent: React.FC<CalendarEventProps> = ({
  date,
  title,
  highlight = false
}) => {
  return (
    <div className="calendar-event">
      <div className={`calendar-event__icon ${highlight ? 'calendar-event__icon--highlight' : ''}`}>
        <Calendar size={20} />
      </div>
      <div className="calendar-event__content">
        <div className={`calendar-event__date ${highlight ? 'calendar-event__date--highlight' : ''}`}>
          {date}
        </div>
        <div className="calendar-event__title">{title}</div>
      </div>
    </div>
  );
};

export const CronogramaTimeline: React.FC = () => {
    // Ajuste para centrar mejor los eventos
    const getLeftPercent = (idx: number, total: number) => {
      if (total === 1) return '50%';
      // Reducir margen lateral para juntar más los eventos
      const margin = 0; // margen en porcentaje - sin margen para máxima cercanía
      const usable = 100 - margin * 2;
      return `${margin + (usable / (total - 1)) * idx}%`;
    };
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="timeline-wrapper">
      <div className="timeline">
        <div className="timeline-line" />
        <div className="timeline-events">
            {fechasClave.map((item, idx) => {
              let positionClass = idx % 2 === 0 ? 'timeline-event--up' : 'timeline-event--down';
              if (idx === 1 || idx === 3 || idx === 5 || idx === 7 || idx === 9) {
                positionClass += ' special-down';
              }
              const left = getLeftPercent(idx, fechasClave.length);
              return (
                <div className={`timeline-event ${positionClass}${selectedIndex === idx ? ' active' : ''}`} key={item.fecha} style={{ left }}>
                  <div
                    className="timeline-icon"
                    style={{ background: '#CAF0F8', borderColor: selectedIndex === idx ? '#1976d2' : '#fff' }}
                    onClick={() => setSelectedIndex(selectedIndex === idx ? null : idx)}
                    title={item.titulo}
                  >
                    {item.icon}
                  </div>
                  <div
                    className="timeline-dot"
                    style={{ background: '#CAF0F8' }}
                    onClick={() => setSelectedIndex(selectedIndex === idx ? null : idx)}
                    title={item.titulo}
                  />
                  <span className="timeline-title">{item.titulo}</span>
                  <span className="timeline-year">{item.year}</span>
                  <span className="timeline-number" style={{ color: '#48CAE4' }}>{String(idx + 1).padStart(2, '0')}</span>
                  {selectedIndex === idx && (
                    <div className="timeline-event-info">
                      <div className="timeline-event-info-content">
                        <button onClick={() => setSelectedIndex(null)} className="timeline-event-info-close">×</button>
                        <h4 className="timeline-event-info-title">{item.titulo}</h4>
                        <p className="timeline-event-info-date"><strong>Fecha:</strong> {item.fecha}</p>
                        <p className="timeline-event-info-description">{item.descripcion}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

    </div>
  );
};



export const CalendarioGridView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  type Evento = typeof eventosConFecha[0];
  const [selectedEvent, setSelectedEvent] = useState<Evento | undefined>(undefined);

  // Convertir fechas de texto a objetos Date para facilitar comparaciones
  const eventosConFecha = fechasClave.map((evento, idx) => {
    const fechaParts = evento.fecha.split(' de ');
    const dia = parseInt(fechaParts[0]);
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const mes = meses.indexOf(fechaParts[1]?.toLowerCase() ?? '');
    const año = parseInt(fechaParts[2]);
    return {
      ...evento,
      fechaObj: new Date(año, mes, dia),
      id: idx
    };
  });

  // Obtener mes y año actual
  const mesActual = currentDate.getMonth();
  const añoActual = currentDate.getFullYear();
  const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const nombresDias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const primerDia = new Date(añoActual, mesActual, 1);
  const ultimoDia = new Date(añoActual, mesActual + 1, 0);
  const diasEnMes = ultimoDia.getDate();
  const diaSemanaInicio = primerDia.getDay();

  // Navegación de meses
  const retrocederMes = () => {
    setCurrentDate(new Date(añoActual, mesActual - 1, 1));
  };
  const avanzarMes = () => {
    setCurrentDate(new Date(añoActual, mesActual + 1, 1));
  };

  // Obtener evento del día
  const obtenerEventoDelDia = (dia: number) => {
    return eventosConFecha.find(e => e.fechaObj.getDate() === dia && e.fechaObj.getMonth() === mesActual && e.fechaObj.getFullYear() === añoActual);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <div className="calendario-responsive-row" style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start', flexWrap: 'wrap', maxWidth: '1100px', width: '100%' }}>
        {/* Calendario principal */}
        <div style={{ flex: '1 1 600px', minWidth: '340px', width: '100%', background: '#fff', borderRadius: '12px', boxShadow: '0 1px 8px rgba(0,0,0,0.07)', padding: '1.2rem', border: '1px solid #e5e7eb', minHeight: '820px' }}>
          <div style={{ textAlign: 'center', marginBottom: '0.7rem' }}>
            <div style={{ fontWeight: 700, fontSize: '1.7rem', color: '#18181b', marginBottom: '0.2rem' }}>Calendario Electoral</div>
            <div style={{ fontWeight: 500, fontSize: '1.05rem', color: '#555', marginBottom: '0.7rem' }}>Consulta las fechas clave del proceso electoral.</div>
          </div>
          <div className="calendario-header">
            <button onClick={retrocederMes} className="calendario-nav-btn">
              <ChevronLeft size={20} />
            </button>
            <span className="calendario-title">{nombresMeses[mesActual]} {añoActual}</span>
            <button onClick={avanzarMes} className="calendario-nav-btn">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="calendario-grid" style={{ borderRadius: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', border: 'none', background: '#f8fafc', padding: '0.2rem', minHeight: '820px' }}>
            {/* Encabezados de días de la semana */}
            {nombresDias.map(dia => (
              <div key={dia} className="calendario-dia-header" style={{ background: 'transparent', color: '#18181b', fontWeight: 700, fontSize: '1.25rem', padding: '0.1rem 0' }}>
                {dia}
              </div>
            ))}

            {/* Espacios vacíos para el inicio del mes */}
            {Array.from({ length: diaSemanaInicio }, (_, i) => (
              <div key={`empty-${i}`} className="calendario-dia calendario-dia-vacio" style={{ background: 'transparent' }}></div>
            ))}

            {/* Días del mes */}
            {Array.from({ length: diasEnMes }, (_, i) => {
              const dia = i + 1;
              const evento = obtenerEventoDelDia(dia);
              const tieneEvento = !!evento;
              const esSeleccionado = selectedEvent && selectedEvent.id === evento?.id;

              // Colores por tipo de evento (gama de celestes)
              let bgColor = '#fff';
              let color = '#18181b';
              let border = 'none';
              if (tieneEvento) {
                bgColor = evento.color ? evento.color + '33' : '#eaf6fb'; // '33' para transparencia si es hex
                color = '#18181b';
              }
              if (esSeleccionado) {
                border = '3px solid #18181b';
                bgColor = tieneEvento ? bgColor : '#fff';
                color = tieneEvento ? color : '#18181b';
              }

              return (
                <div
                  key={dia}
                  className={`calendario-dia`}
                  onClick={tieneEvento ? () => setSelectedEvent(esSeleccionado ? undefined : evento) : undefined}
                  style={{ cursor: tieneEvento ? 'pointer' : 'default', background: bgColor, color, border, borderRadius: '7px', boxShadow: esSeleccionado ? '0 0 0 2px #18181b' : 'none', fontWeight: 700, fontSize: '0.92rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '32px', margin: '1px', padding: '0.1rem 0' }}
                >
                  <span className="calendario-numero" style={{ color, fontSize: '1.45rem', fontWeight: 700 }}>{dia}</span>
                  {tieneEvento && (
                    <div className="calendario-indicador-evento" style={{ marginTop: '0.08rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {evento.icon}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>


      {/* Panel de eventos y leyenda de colores */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '0.2rem' }}>
        <div style={{ flex: '1 1 340px', minWidth: '260px', maxWidth: '400px', width: '100%', background: '#023E8A', borderRadius: '18px', color: 'white', padding: '2rem 1.5rem', minHeight: '420px', boxShadow: '0 2px 16px rgba(0,0,0,0.10)' }}>
          <div style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '1.2rem' }}>Eventos Electorales</div>
          {selectedEvent && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 700 }}>{selectedEvent.id + 1}</div>
              <div style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>{selectedEvent.fecha}</div>
              <span style={{ background: '#222', color: '#fff', borderRadius: '12px', padding: '0.2rem 0.8rem', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem', display: 'inline-block' }}>{selectedEvent.categoria || 'Evento'}</span>
              <div style={{ fontWeight: 600, fontSize: '1.1rem', margin: '0.7rem 0 0.3rem 0' }}>{selectedEvent.titulo}</div>
            </div>
          )}
          <hr style={{ border: 'none', borderTop: '1px solid #333', margin: '1.2rem 0' }} />
          <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.7rem' }}>EVENTOS DE ESTE MES:</div>
          <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
            {eventosConFecha.filter(e => e.fechaObj.getMonth() === mesActual && e.fechaObj.getFullYear() === añoActual).map((evento) => (
              <div key={evento.id} style={{ background: selectedEvent && selectedEvent.id === evento.id ? '#fff' : 'transparent', color: selectedEvent && selectedEvent.id === evento.id ? '#18181b' : '#fff', borderRadius: '10px', padding: '0.5rem 0.7rem', marginBottom: '0.4rem', fontWeight: 500, cursor: 'pointer', transition: 'background 0.2s' }} onClick={() => setSelectedEvent(evento)}>
                {evento.id + 1} - {evento.titulo.length > 22 ? evento.titulo.slice(0, 22) + '...' : evento.titulo}
              </div>
            ))}
          </div>
        </div>
        
      </div>

    </div>
  );
}

