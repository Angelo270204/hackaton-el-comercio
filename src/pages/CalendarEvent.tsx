// CalendarEvent.tsx
import React from 'react';
import { Calendar } from 'lucide-react';
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