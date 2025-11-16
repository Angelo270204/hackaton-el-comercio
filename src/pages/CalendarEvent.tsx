import { Calendar, Users, BookOpen, Sparkles } from 'lucide-react';
import React from 'react';
import '../styles/calendarEvent.css';

export interface Evento {
  titulo: string;
  year: string;
  color: string;
  icon: React.ReactElement;
  numero: string;
  fecha: string;
  fechaObj?: Date;
  id?: number;
}

export interface CalendarEventProps {
  date: string;
  title: string;
  highlight?: boolean;
}

// Agrupación en 3 fases (ejemplo, puedes ajustar los nombres y eventos)

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
      { titulo: 'Instalación de mesas para segunda vuelta (si aplica)', year: '2026', color: '#2563eb', icon: 'calendar', numero: '23', fecha: '7 de junio de 2026' },
    ]
  }
];

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

// (CronogramaTimeline eliminado: se usará solo la vista interactiva por fases)



export const CalendarioGridView: React.FC = () => {
  // Unir todos los eventos para el cálculo de porcentaje
  const todosEventos = fases.flatMap(f => f.eventos);
  const hoy = new Date();
  const fechas = todosEventos.map(ev => {
    const partes = ev.fecha.split(' de ');
    if (partes.length === 3) {
      const dia = parseInt(partes[0]);
      const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      const mes = meses.indexOf(partes[1].toLowerCase());
      const año = parseInt(partes[2]);
      return new Date(año, mes, dia);
    }
    return null;
  }).filter(Boolean) as Date[];
  const totalFechas = fechas.length;
  const fechasPasadas = fechas.filter(f => f <= hoy).length;
  const porcentaje = Math.round((fechasPasadas / totalFechas) * 100);

  const [faseAbierta, setFaseAbierta] = React.useState<string | null>(null);
  const toggleFase = (nombre: string) => {
    setFaseAbierta(prev => (prev === nombre ? null : nombre));
  };
  return (
    <div style={{ maxWidth: 760, margin: '2rem auto', background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px #eaf6fb', padding: '2.2rem 1.8rem' }}>
      <div style={{ fontWeight: 700, fontSize: '1.08rem', marginBottom: '1.2rem', color: '#18181b' }}>Progreso del proceso electoral</div>
      {/* Barra de progreso dinámica */}
      <div style={{ width: '100%', height: 8, background: '#eaf6fb', borderRadius: 8, marginBottom: '1.5rem', position: 'relative' }}>
        <div style={{ width: `${porcentaje}%`, height: 8, background: '#2563eb', borderRadius: 8, position: 'absolute', top: 0, left: 0, transition: 'width 0.4s' }}></div>
        <span style={{ position: 'absolute', right: 0, top: -24, fontWeight: 700, color: '#2563eb', fontSize: '1.15rem' }}>{porcentaje}%</span>
      </div>

      {/* Fases y eventos */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {fases.map(fase => {
          const abierta = faseAbierta === fase.nombre;
          return (
            <div key={fase.nombre} style={{ background: '#eaf6fb', borderRadius: 16, padding: '1.1rem 1rem', boxShadow: '0 1px 8px #eaf6fb', border: '1px solid #bde5fa', transition: 'all .3s' }}>
              <button onClick={() => toggleFase(fase.nombre)} style={{ width: '100%', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: 0, margin: 0 }}>
                <span style={{ fontWeight: 700, fontSize: '1.15rem', color: '#2563eb', display: 'flex', alignItems: 'center', gap: 8 }}>
                  {abierta ? '▼' : '►'} {fase.nombre}
                </span>
                <span style={{ background: '#2563eb15', color: '#2563eb', fontSize: '.85rem', fontWeight: 600, padding: '4px 10px', borderRadius: 20 }}>{fase.eventos.length} fechas</span>
              </button>
              {abierta && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                  {fase.eventos.map(ev => {
                    let iconEl = null;
                    if (ev.icon === 'calendar') iconEl = <Calendar size={32} />;
                    else if (ev.icon === 'users') iconEl = <Users size={32} />;
                    else if (ev.icon === 'book') iconEl = <BookOpen size={32} />;
                    else if (ev.icon === 'sparkles') iconEl = <Sparkles size={32} />;
                    return (
                      <div key={ev.numero} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, background: '#fff', borderRadius: 12, padding: '0.75rem 0.9rem', border: '1px solid #bde5fa' }}>
                        <div style={{ width: 46, height: 46, borderRadius: '50%', background: '#eaf6fb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1rem', color: '#2563eb' }}>{ev.numero}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: '1rem', color: '#18181b', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 8 }}>{iconEl}{ev.titulo}</div>
                          <div style={{ color: '#2563eb', fontSize: '.9rem', fontWeight: 600 }}>{ev.fecha}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

