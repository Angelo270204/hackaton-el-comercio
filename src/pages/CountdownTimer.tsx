// CountdownTimer.tsx
import React, { useEffect, useState } from 'react';
import '../styles/countdownTimer.css';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string;
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const now = new Date();
  const target = new Date(targetDate);

  if (target.getTime() <= now.getTime()) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const diff = target.getTime() - now.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  return (
    <div className="countdown">
      <h2 className="countdown__title">Faltan para las Elecciones</h2>
      <div className="countdown__grid">
        <div className="countdown__card countdown__card--highlight">
          <div className="countdown__number">{timeLeft.days}</div>
          <div className="countdown__label">DÍAS</div>
        </div>

        <div className="countdown__card">
          <div className="countdown__number">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className="countdown__label">HORAS</div>
        </div>

        <div className="countdown__card">
          <div className="countdown__number">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className="countdown__label">MINUTOS</div>
        </div>

        <div className="countdown__card">
          <div className="countdown__number">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="countdown__label">SEGUNDOS</div>
        </div>
      </div>
    </div>
  );
};