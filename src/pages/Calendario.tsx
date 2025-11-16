import React from 'react';
import { CalendarioGridView } from './CalendarEvent';
import '../styles/calendarEvent.css';

const Calendario: React.FC = () => {
	return (
		<div className="calendario-page" style={{ padding: '2rem 0' }}>
			<h2 style={{ textAlign: 'center', fontWeight: 700, fontSize: '1.5rem', marginBottom: '2rem', color: '#2563eb' }}>Calendario Electoral</h2>
			<CalendarioGridView />
		</div>
	);
};

export default Calendario;
