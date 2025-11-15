import { Calendar, Users, BookOpen, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
// Fechas clave del cronograma electoral organizadas por categorías (22 fechas)
const fechasClave = [
  // PROCESO ELECTORAL
  {
    fecha: '2 de agosto de 2025',
    year: '2025',
    color: '#1976d2',
    titulo: 'Límite para solicitar alianzas electorales',
    descripcion: 'Fecha límite para que los partidos políticos soliciten formalmente la formación de alianzas electorales.',
    categoria: 'Proceso Electoral',
    icon: <Users size={24} />,
  },
  {
    fecha: '1 de septiembre de 2025',
    year: '2025',
    color: '#43a047',
    titulo: 'Límite para inscribir alianzas en el ROP',
    descripcion: 'Es el plazo máximo para que las alianzas electorales se inscriban en el Registro de Organizaciones Políticas (ROP).',
    categoria: 'Proceso Electoral',
    icon: <BookOpen size={24} />,
  },
  {
    fecha: '14 de octubre de 2025',
    year: '2025',
    color: '#fbc02d',
    titulo: 'Cierre del padrón electoral',
    descripcion: 'RENIEC cierra el padrón electoral para que ya no se puedan hacer más modificaciones en la lista de votantes.',
    categoria: 'Proceso Electoral',
    icon: <Calendar size={24} />,
  },
  // ELECCIONES
  {
    fecha: '30 de noviembre de 2025',
    year: '2025',
    color: '#e53935',
    titulo: 'Primarias (afiliados y no afiliados)',
    descripcion: 'Se realizan las elecciones primarias entre afiliados y no afiliados para elegir delegados de organizaciones políticas.',
    categoria: 'Elecciones',
    icon: <Sparkles size={24} />,
  },
  {
    fecha: '7 de diciembre de 2025',
    year: '2025',
    color: '#8e24aa',
    titulo: 'Primarias (delegados)',
    descripcion: 'Los delegados de cada partido/alianza votan para definir candidatos oficiales ("candidaturas por delegados").',
    categoria: 'Elecciones',
    icon: <ArrowRight size={24} />,
  },
  {
    fecha: '13 de diciembre de 2025',
    year: '2025',
    color: '#00897b',
    titulo: 'Aprobación del padrón electoral definitivo',
    descripcion: 'Se aprueba de manera definitiva el padrón electoral que se utilizará en las elecciones.',
    categoria: 'Proceso Electoral',
    icon: <BookOpen size={24} />,
  },
  {
    fecha: '23 de diciembre de 2025',
    year: '2025',
    color: '#ffa726',
    titulo: 'Inscripción de fórmulas y listas de candidatos',
    descripcion: 'Fecha límite para inscribir fórmulas presidenciales, listas al Congreso, Parlamento Andino, etc.',
    categoria: 'Proceso Electoral',
    icon: <Calendar size={24} />,
  },
  // MIEMBROS DE MESA
  {
    fecha: '1 de febrero de 2026',
    year: '2026',
    color: '#795548',
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
    color: '#607d8b',
    titulo: 'Fin de plazo para renuncia/retiro de candidatos',
    descripcion: 'Último día para que los candidatos puedan renunciar o retirarse de sus candidaturas.',
    categoria: 'Proceso Electoral',
    icon: <BookOpen size={24} />,
  },
  {
    fecha: '26 de febrero de 2026',
    year: '2026',
    color: '#9c27b0',
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
    color: '#c62828',
    titulo: 'Fin de apelaciones por tachas/exclusiones',
    descripcion: 'Último día para presentar apelaciones relacionadas con tachas y exclusiones de candidaturas.',
    categoria: 'Proceso Electoral',
    icon: <Calendar size={24} />,
  },
  {
    fecha: '14 de marzo de 2026',
    year: '2026',
    color: '#059669',
    titulo: 'Inscripción definitiva de candidaturas',
    descripcion: 'Después de resolver tachas y apelaciones, las candidaturas son oficialmente inscritas de manera definitiva.',
    categoria: 'Proceso Electoral',
    icon: <BookOpen size={24} />,
  },
  {
    fecha: '11 de abril de 2026',
    year: '2026',
    color: '#ff5722',
    titulo: 'Último día para exclusión por situación jurídica',
    descripcion: 'Fecha límite para excluir candidatos por situaciones jurídicas sobrevinientes.',
    categoria: 'Proceso Electoral',
    icon: <ArrowRight size={24} />,
  },
  {
    fecha: '12 de abril de 2026',
    year: '2026',
    color: '#2e7d32',
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
    color: '#7C3AED',
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

// Componente para mostrar fechas importantes debajo del calendario
export const FechasImportantes: React.FC = () => {
  const fechasDestacadas = [
    {
      fecha: '1 septiembre',
      year: '2025',
      titulo: 'Registro de alianzas',
      numero: '03',
      icon: <BookOpen size={24} />
    },
    {
      fecha: '14 octubre', 
      year: '2025',
      titulo: 'Cierre del padrón electoral',
      numero: '04',
      icon: <Users size={24} />
    },
    {
      fecha: '30 noviembre',
      year: '2025', 
      titulo: 'Elecciones Primarias',
      numero: '05',
      icon: <Sparkles size={24} />
    },
    {
      fecha: '7 diciembre',
      year: '2025',
      titulo: 'Elecciones por delegados', 
      numero: '06',
      icon: <ArrowRight size={24} />
    },
    {
      fecha: '23 diciembre',
      year: '2025',
      titulo: 'Inscripción de candidaturas',
      numero: '07',
      icon: <Calendar size={24} />
    },
    {
      fecha: '13 marzo',
      year: '2026',
      titulo: 'Tachas y apelaciones',
      numero: '08',
      icon: <ArrowRight size={24} />
    },
    {
      fecha: '14 marzo',
      year: '2026',
      titulo: 'Candidatos Oficiales',
      numero: '09',
      icon: <Sparkles size={24} />
    },
    {
      fecha: '12 abril y 7 junio',
      year: '2026',
      titulo: 'Elecciones generales y posible segunda vuelta',
      numero: '10',
      icon: <Sparkles size={24} />
    }
  ];

  return (
    <div className="fechas-importantes">
      <div className="fechas-importantes-grid">
        {fechasDestacadas.map((fecha, index) => (
          <div key={index} className="fecha-importante-card">
            <div className="fecha-importante-icon">
              {fecha.icon}
            </div>
            <div className="fecha-importante-content">
              <div className="fecha-importante-titulo">{fecha.titulo}</div>
              <div className="fecha-importante-fecha">{fecha.fecha}</div>
              <div className="fecha-importante-year">{fecha.year}</div>
            </div>
            <div className="fecha-importante-numero">{fecha.numero}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CalendarioGridView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  // Convertir fechas de texto a objetos Date para facilitar comparaciones
  const eventosConFecha = fechasClave.map((evento, idx) => {
    const fechaParts = evento.fecha.split(' de ');
    const dia = parseInt(fechaParts[0]);
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const mes = meses.indexOf(fechaParts[1].toLowerCase());
    const año = parseInt(fechaParts[2]);
    return {
      ...evento,
      fechaObj: new Date(año, mes, dia),
      id: idx
    };
  });

  const mesActual = currentDate.getMonth();
  const añoActual = currentDate.getFullYear();
  
  // Obtener primer día del mes y número de días
  const primerDia = new Date(añoActual, mesActual, 1);
  const ultimoDia = new Date(añoActual, mesActual + 1, 0);
  const diasEnMes = ultimoDia.getDate();
  const diaSemanaInicio = primerDia.getDay();

  // Nombres de meses y días
  const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const nombresDias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  // Función para navegar entre meses
  const cambiarMes = (direccion: number) => {
    setCurrentDate(new Date(añoActual, mesActual + direccion, 1));
  };

  // Función para verificar si un día tiene evento
  const obtenerEventoDelDia = (dia: number) => {
    return eventosConFecha.find(evento => 
      evento.fechaObj.getDate() === dia &&
      evento.fechaObj.getMonth() === mesActual &&
      evento.fechaObj.getFullYear() === añoActual
    );
  };

  return (
    <div className="calendario-grid-wrapper">
      <div className="calendario-header">
        <button onClick={() => cambiarMes(-1)} className="calendario-nav-btn">
          <ChevronLeft size={20} />
        </button>
        <h2 className="calendario-title">{nombresMeses[mesActual]} {añoActual}</h2>
        <button onClick={() => cambiarMes(1)} className="calendario-nav-btn">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="calendario-grid">
        {/* Encabezados de días de la semana */}
        {nombresDias.map(dia => (
          <div key={dia} className="calendario-dia-header">
            {dia}
          </div>
        ))}

        {/* Espacios vacíos para el inicio del mes */}
        {Array.from({ length: diaSemanaInicio }, (_, i) => (
          <div key={`empty-${i}`} className="calendario-dia calendario-dia-vacio"></div>
        ))}

        {/* Días del mes */}
        {Array.from({ length: diasEnMes }, (_, i) => {
          const dia = i + 1;
          const evento = obtenerEventoDelDia(dia);
          const tieneEvento = !!evento;
          const esSeleccionado = selectedEvent === evento?.id;

          return (
            <div
              key={dia}
              className={`calendario-dia ${
                tieneEvento ? 'calendario-dia-evento' : ''
              } ${
                esSeleccionado ? 'calendario-dia-seleccionado' : ''
              }`}
              onClick={tieneEvento ? () => setSelectedEvent(esSeleccionado ? null : evento.id) : undefined}
              style={{ cursor: tieneEvento ? 'pointer' : 'default' }}
            >
              <span className="calendario-numero">{dia}</span>
              {tieneEvento && (
                <div className="calendario-indicador-evento">
                  {evento.icon}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal de información del evento seleccionado */}
      {selectedEvent !== null && (
        <div className="calendario-modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="calendario-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedEvent(null)} 
              className="calendario-modal-cerrar"
            >
              ×
            </button>
            <div className="calendario-modal-icono">
              {eventosConFecha.find(e => e.id === selectedEvent)?.icon}
            </div>
            <div className="calendario-modal-categoria">
              {eventosConFecha.find(e => e.id === selectedEvent)?.categoria}
            </div>
            <h3 className="calendario-modal-titulo">
              {eventosConFecha.find(e => e.id === selectedEvent)?.titulo}
            </h3>
            <p className="calendario-modal-fecha">
              <strong>Fecha:</strong> {eventosConFecha.find(e => e.id === selectedEvent)?.fecha}
            </p>
            <p className="calendario-modal-descripcion">
              {eventosConFecha.find(e => e.id === selectedEvent)?.descripcion}
            </p>
          </div>
        </div>
      )}
      
      <FechasImportantes />
    </div>
  );
};
