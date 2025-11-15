// QuickAccessCard.tsx
import React from 'react';
import '../styles/quickAccessCard.css';

interface QuickAccessCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
  icon,
  title,
  description
}) => {
  return (
    <div className="quick-access-card">
      <div className="quick-access-card__icon">
        {icon}
      </div>
      <h4 className="quick-access-card__title">{title}</h4>
      <p className="quick-access-card__description">{description}</p>
    </div>
  );
};