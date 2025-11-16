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

// Reorganizado: solo 3 fases visibles. Al hacer clic en la fase se despliegan sus fechas.
// Mantengo las 22 referencias (numeración ajustada sin duplicados redundantes en la visualización de fases).
const fases = [
  {
    nombre: 'Fase 1: Elecciones',
    eventos: [
      { titulo: 'Primarias (afiliados y no afiliados)', year: '2025', color: '#2563eb', icon: 'calendar', numero: '01', fecha: '30 de noviembre de 2025' },
      { titulo: 'Primarias (delegados)', year: '2025', color: '#2563eb', icon: 'calendar', numero: '02', fecha: '7 de diciembre de 2025' },
      { titulo: 'Elecciones generales (primera vuelta)', year: '2026', color: '#2563eb', icon: 'calendar', numero: '03', fecha: '12 de abril de 2026' },
      { titulo: 'Segunda vuelta presidencial (si aplica)', year: '2026', color: '#2563eb', icon: 'calendar', numero: '04', fecha: '7 de junio de 2026' }
    ]
  },
  {
    nombre: 'Fase 2: Proceso Electoral',
    eventos: [
      { titulo: 'Límite para solicitar alianzas', year: '2025', color: '#48cae4', icon: 'users', numero: '05', fecha: '2 de agosto de 2025' },
      { titulo: 'Límite para inscribir alianzas ROP', year: '2025', color: '#00b4d8', icon: 'book', numero: '06', fecha: '1 de septiembre de 2025' },
      { titulo: 'Cierre del padrón electoral', year: '2025', color: '#90e0ef', icon: 'users', numero: '07', fecha: '14 de octubre de 2025' },
      { titulo: 'Aprobación del padrón definitivo', year: '2025', color: '#48cae4', icon: 'book', numero: '08', fecha: '13 de diciembre de 2025' },
      { titulo: 'Inscripción de fórmulas y listas', year: '2025', color: '#00b4d8', icon: 'book', numero: '09', fecha: '23 de diciembre de 2025' },
      { titulo: 'Renuncia / retiro de candidatos', year: '2026', color: '#90e0ef', icon: 'users', numero: '10', fecha: '11 de febrero de 2026' },
      { titulo: 'Tachas y exclusiones (1ra instancia)', year: '2026', color: '#48cae4', icon: 'book', numero: '11', fecha: '26 de febrero de 2026' },
      { titulo: 'Apelaciones tachas/exclusiones', year: '2026', color: '#00b4d8', icon: 'book', numero: '12', fecha: '13 de marzo de 2026' },
      { titulo: 'Inscripción definitiva de candidaturas', year: '2026', color: '#2563eb', icon: 'calendar', numero: '13', fecha: '14 de marzo de 2026' },
      { titulo: 'Último día exclusión jurídica', year: '2026', color: '#90e0ef', icon: 'users', numero: '14', fecha: '11 de abril de 2026' }
    ]
  },
  {
    nombre: 'Fase 3: Miembros de Mesa',
    eventos: [
      { titulo: 'Sorteo de miembros de mesa', year: '2026', color: '#48cae4', icon: 'users', numero: '15', fecha: 'Hasta el 1 de febrero de 2026' },
      { titulo: 'Publicación de seleccionados', year: '2026', color: '#00b4d8', icon: 'users', numero: '16', fecha: 'Febrero – marzo de 2026' },
      { titulo: 'Capacitaciones ONPE', year: '2026', color: '#90e0ef', icon: 'book', numero: '17', fecha: 'Organización e instalación de mesas de sufragio' },
      { titulo: 'Instalación mesas (1ra vuelta)', year: '2026', color: '#2563eb', icon: 'calendar', numero: '18', fecha: '12 de abril de 2026' },
      { titulo: 'Instalación mesas (2da vuelta)', year: '2026', color: '#2563eb', icon: 'calendar', numero: '19', fecha: '7 de junio de 2026' }
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

  // Estado para el evento expandido
  const [eventoExpandido, setEventoExpandido] = React.useState<string | null>(null);

  const renderIcon = (icon: string) => {
    if (icon === 'calendar') return <Calendar size={32} />;
    if (icon === 'users') return <Users size={32} />;
    if (icon === 'book') return <BookOpen size={32} />;
    if (icon === 'sparkles') return <Sparkles size={32} />;
    return null;
  };

  // Componente de información expandida
  const InfoExpandida = ({ evento }: { evento: typeof todosEventos[0] }) => (
    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eaf6fb', padding: '1.2rem', marginTop: 12, minWidth: 220 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
        <div style={{ background: evento.color + '22', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px #eaf6fb' }}>{renderIcon(evento.icon)}</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '1.08rem', color: '#2563eb' }}>{evento.titulo}</div>
          <div style={{ color: '#7bb7d6', fontSize: '1rem', fontWeight: 500 }}>{evento.fecha}</div>
          <div style={{ color: '#18181b', fontSize: '1rem', fontWeight: 500, marginTop: 4 }}>Año: {evento.year}</div>
          <div style={{ color: evento.color, fontWeight: 700, fontSize: '1.15rem', marginTop: 4 }}>N° {evento.numero}</div>
        </div>
      </div>
      <div style={{ color: '#18181b', fontSize: '1.05rem', marginTop: 8 }}>
        {/* Aquí puedes agregar más información específica del evento si la tienes */}
        <span>Acciones o detalles de lo que se realizará ese día.</span>
      </div>
      <button onClick={() => setEventoExpandido(null)} style={{ marginTop: 10, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 16px', cursor: 'pointer', fontWeight: 600 }}>Cerrar</button>
    </div>
  );

  return (
    <>
      <div className="timeline-wrapper" style={{ width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '2.5rem', marginBottom: '2.5rem' }}>
          {primeraFila.map((item) => (
            <div key={item.titulo} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 160 }}>
              <div style={{ cursor: 'pointer' }} onClick={() => setEventoExpandido(eventoExpandido === item.titulo ? null : item.titulo)}>
                <div style={{ background: item.color + '22', borderRadius: '50%', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px #eaf6fb', marginBottom: 8 }}>{renderIcon(item.icon)}</div>
                <div style={{ width: 12, height: 12, background: '#bde5fa', borderRadius: '50%', margin: '0 auto 8px auto', boxShadow: '0 0 8px #eaf6fb' }} />
                <div style={{ textAlign: 'center', fontWeight: 600, fontSize: '1.08rem', color: '#222', marginBottom: 2 }}>{item.titulo}</div>
                <div style={{ textAlign: 'center', fontSize: '1rem', color: '#7bb7d6', marginBottom: 2 }}>{item.year}</div>
                <div style={{ textAlign: 'center', fontWeight: 700, fontSize: '1.25rem', color: item.color }}>{item.numero}</div>
              </div>
              {eventoExpandido === item.titulo && <InfoExpandida evento={item} />}
            </div>
          ))}
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '2.5rem' }}>
          {segundaFila.map((item) => (
            <div key={item.titulo} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 160 }}>
              <div style={{ cursor: 'pointer' }} onClick={() => setEventoExpandido(eventoExpandido === item.titulo ? null : item.titulo)}>
                <div style={{ background: item.color + '22', borderRadius: '50%', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px #eaf6fb', marginBottom: 8 }}>{renderIcon(item.icon)}</div>
                <div style={{ width: 12, height: 12, background: '#bde5fa', borderRadius: '50%', margin: '0 auto 8px auto', boxShadow: '0 0 8px #eaf6fb' }} />
                <div style={{ textAlign: 'center', fontWeight: 600, fontSize: '1.08rem', color: '#222', marginBottom: 2 }}>{item.titulo}</div>
                <div style={{ textAlign: 'center', fontSize: '1rem', color: '#7bb7d6', marginBottom: 2 }}>{item.year}</div>
                <div style={{ textAlign: 'center', fontWeight: 700, fontSize: '1.25rem', color: item.color }}>{item.numero}</div>
              </div>
              {eventoExpandido === item.titulo && <InfoExpandida evento={item} />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};



export const CalendarioGridView: React.FC = () => {
  // Estado para expansión de fases
  const [faseExpandida, setFaseExpandida] = React.useState<string | null>(null);
  // Unir todos los eventos para cálculo de progreso
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

      {/* Fases (expandibles) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
        {fases.map(fase => {
          const abierta = faseExpandida === fase.nombre;
          return (
            <div key={fase.nombre} style={{ background: '#eaf6fb', borderRadius: 14, padding: '1rem 1rem', boxShadow: '0 1px 8px #eaf6fb', border: '1px solid #bde5fa' }}>
              <div
                onClick={() => setFaseExpandida(abierta ? null : fase.nombre)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', userSelect: 'none', marginBottom: abierta ? '1rem' : 0 }}
              >
                <span style={{ fontWeight: 700, fontSize: '1.15rem', color: '#2563eb' }}>{fase.nombre}</span>
                <span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#2563eb', transition: 'transform .25s', transform: abierta ? 'rotate(90deg)' : 'rotate(0deg)' }}>&#8250;</span>
              </div>
              {abierta && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {fase.eventos.map(ev => {
                    let iconEl = null;
                    if (ev.icon === 'calendar') iconEl = <Calendar size={28} />;
                    else if (ev.icon === 'users') iconEl = <Users size={28} />;
                    else if (ev.icon === 'book') iconEl = <BookOpen size={28} />;
                    else if (ev.icon === 'sparkles') iconEl = <Sparkles size={28} />;
                    return (
                      <div key={ev.numero} style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', padding: '0.75rem 0.9rem', borderRadius: 10, border: '1px solid #bde5fa' }}>
                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#eaf6fb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.95rem', color: '#2563eb' }}>{ev.numero}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: '1rem', color: '#18181b', display: 'flex', alignItems: 'center', gap: 6 }}>{iconEl}{ev.titulo}</div>
                          <div style={{ color: '#7bb7d6', fontSize: '0.95rem', fontWeight: 500 }}>{ev.fecha}</div>
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

