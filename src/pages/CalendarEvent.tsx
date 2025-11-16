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
    nombre: 'Fase Preparatoria',
    eventos: [
      { titulo: 'Apertura Electoral', year: '2025', color: '#90e0ef', icon: 'calendar', numero: '01', fecha: '15 de enero de 2025' },
      { titulo: 'Plazo para pedir alianzas', year: '2025', color: '#48cae4', icon: 'users', numero: '02', fecha: '28 de enero de 2025' },
      { titulo: 'Registro de alianzas', year: '2025', color: '#00b4d8', icon: 'book', numero: '03', fecha: '10 de febrero de 2025' },
      { titulo: 'Cierre del padrón electoral', year: '2025', color: '#90e0ef', icon: 'users', numero: '04', fecha: '25 de febrero de 2025' },
      // ...agrega más eventos aquí para la fase 1
    ]
  },
  {
    nombre: 'Fase de Candidaturas',
    eventos: [
      { titulo: 'Elecciones Primarias', year: '2025', color: '#48cae4', icon: 'sparkles', numero: '05', fecha: '15 de marzo de 2025' },
      { titulo: 'Elecciones por delegados', year: '2025', color: '#00b4d8', icon: 'users', numero: '06', fecha: '30 de marzo de 2025' },
      { titulo: 'Inscripción de candidaturas', year: '2025', color: '#90e0ef', icon: 'calendar', numero: '07', fecha: '10 de abril de 2025' },
      // ...agrega más eventos aquí para la fase 2
    ]
  },
  {
    nombre: 'Fase Electoral',
    eventos: [
      { titulo: 'Tachas y apelaciones', year: '2026', color: '#48cae4', icon: 'book', numero: '08', fecha: '20 de abril de 2026' },
      { titulo: 'Candidatos Oficiales', year: '2026', color: '#00b4d8', icon: 'book', numero: '09', fecha: '05 de mayo de 2026' },
      { titulo: 'Elecciones generales y posible segunda vuelta', year: '2026', color: '#90e0ef', icon: 'sparkles', numero: '10', fecha: '15 de mayo de 2026' },
      // ...agrega más eventos aquí para la fase 3
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

export const CronogramaTimeline: React.FC = () => {
  // Unir todos los eventos de las fases
  const todosEventos = fases.flatMap(f => f.eventos);
  // Mostrar los eventos en dos filas, con punto azul debajo de cada ícono
  const primeraFila = todosEventos.slice(0, Math.ceil(todosEventos.length / 2));
  const segundaFila = todosEventos.slice(Math.ceil(todosEventos.length / 2));
  // Renderizar el icono correctamente
  const renderIcon = (icon: string) => {
    if (icon === 'calendar') return <Calendar size={32} />;
    if (icon === 'users') return <Users size={32} />;
    if (icon === 'book') return <BookOpen size={32} />;
    if (icon === 'sparkles') return <Sparkles size={32} />;
    return null;
  };
  return (
    <div className="timeline-wrapper" style={{ width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '2.5rem', marginBottom: '2.5rem' }}>
        {primeraFila.map((item) => (
          <div key={item.titulo} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 160 }}>
            <div style={{ background: item.color + '22', borderRadius: '50%', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px #eaf6fb', marginBottom: 8 }}>{renderIcon(item.icon)}</div>
            <div style={{ width: 12, height: 12, background: '#bde5fa', borderRadius: '50%', margin: '0 auto 8px auto', boxShadow: '0 0 8px #eaf6fb' }} />
            <div style={{ textAlign: 'center', fontWeight: 600, fontSize: '1.08rem', color: '#222', marginBottom: 2 }}>{item.titulo}</div>
            <div style={{ textAlign: 'center', fontSize: '1rem', color: '#7bb7d6', marginBottom: 2 }}>{item.year}</div>
            <div style={{ textAlign: 'center', fontWeight: 700, fontSize: '1.25rem', color: item.color }}>{item.numero}</div>
          </div>
        ))}
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '2.5rem' }}>
        {segundaFila.map((item) => (
          <div key={item.titulo} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 160 }}>
            <div style={{ background: item.color + '22', borderRadius: '50%', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px #eaf6fb', marginBottom: 8 }}>{renderIcon(item.icon)}</div>
            <div style={{ width: 12, height: 12, background: '#bde5fa', borderRadius: '50%', margin: '0 auto 8px auto', boxShadow: '0 0 8px #eaf6fb' }} />
            <div style={{ textAlign: 'center', fontWeight: 600, fontSize: '1.08rem', color: '#222', marginBottom: 2 }}>{item.titulo}</div>
            <div style={{ textAlign: 'center', fontSize: '1rem', color: '#7bb7d6', marginBottom: 2 }}>{item.year}</div>
            <div style={{ textAlign: 'center', fontWeight: 700, fontSize: '1.25rem', color: item.color }}>{item.numero}</div>
          </div>
        ))}
      </div>
    </div>
  );
};



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

  return (
    <div style={{ maxWidth: 620, margin: '2rem auto', background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px #eaf6fb', padding: '2.2rem 1.5rem' }}>
      <div style={{ fontWeight: 700, fontSize: '1.08rem', marginBottom: '1.2rem', color: '#18181b' }}>Progreso del proceso electoral</div>
      {/* Barra de progreso dinámica */}
      <div style={{ width: '100%', height: 8, background: '#eaf6fb', borderRadius: 8, marginBottom: '1.5rem', position: 'relative' }}>
        <div style={{ width: `${porcentaje}%`, height: 8, background: '#2563eb', borderRadius: 8, position: 'absolute', top: 0, left: 0, transition: 'width 0.4s' }}></div>
        <span style={{ position: 'absolute', right: 0, top: -24, fontWeight: 700, color: '#2563eb', fontSize: '1.15rem' }}>{porcentaje}%</span>
      </div>

      {/* Fases y eventos */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.2rem' }}>
        {fases.map((fase) => (
          <div key={fase.nombre} style={{ background: '#eaf6fb', borderRadius: 14, padding: '1.2rem 1rem', boxShadow: '0 1px 8px #eaf6fb', border: '1px solid #bde5fa' }}>
            <div style={{ fontWeight: 700, fontSize: '1.15rem', color: '#2563eb', marginBottom: '1rem' }}>{fase.nombre}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {fase.eventos.map((ev) => {
                let iconEl = null;
                if (ev.icon === 'calendar') iconEl = <Calendar size={32} />;
                else if (ev.icon === 'users') iconEl = <Users size={32} />;
                else if (ev.icon === 'book') iconEl = <BookOpen size={32} />;
                else if (ev.icon === 'sparkles') iconEl = <Sparkles size={32} />;
                return (
                  <div key={ev.numero} style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.15rem', color: '#7bb7d6', border: '1px solid #bde5fa' }}>{ev.numero}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '1.08rem', color: '#18181b', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 8 }}>{iconEl}{ev.titulo}</div>
                      <div style={{ color: '#7bb7d6', fontSize: '1rem', fontWeight: 500 }}>{ev.fecha}</div>
                    </div>
                    <div style={{ color: '#bde5fa', fontSize: '1.5rem', fontWeight: 700 }}>&#8250;</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

