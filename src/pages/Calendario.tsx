import React from 'react';
import { CalendarioGridView } from './CalendarEvent';
import '../styles/calendarEvent.css';

const Calendario: React.FC = () => {
  return (
    <div className="calendario-page" style={{ padding: '2rem 0' }}>
      
      <CalendarioGridView />
    </div>
  );
};

export default Calendario;
