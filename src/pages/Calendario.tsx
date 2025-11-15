import React from 'react';
import { CalendarioGridView } from './CalendarEvent';
import '../styles/calendarEvent.css';

const Calendario: React.FC = () => {
  return (
    <div className="calendario-page" style={{ padding: '2rem 0' }}>
      <h1 style={{ textAlign: 'center', color: '#1976d2' }}>Calendario Electoral</h1>
      <p style={{ textAlign: 'center'}}>
        Consulta las fechas clave del proceso electoral.
      </p>
      <CalendarioGridView />
    </div>
  );
};

export default Calendario;
