import React from 'react';
import { IdeologiaFilter, IDEOLOGIA_LABELS } from '../../types/candidate';
import './IdeologyFilter.css';

interface IdeologyFilterProps {
  currentValue: IdeologiaFilter;
  onChange: (ideologia: IdeologiaFilter) => void;
}

const IdeologyFilter: React.FC<IdeologyFilterProps> = ({ currentValue, onChange }) => {
  const filters: IdeologiaFilter[] = [
    'todos',
    'izquierda',
    'centro-izquierda',
    'centro',
    'centro-derecha',
    'derecha'
  ];

  return (
    <div className="ideology-filter">
      <h3 className="ideology-filter__title">Filtrar por ideología:</h3>
      <div className="ideology-filter__buttons">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`ideology-filter__button ${
              currentValue === filter ? 'ideology-filter__button--active' : ''
            }`}
            onClick={() => onChange(filter)}
            aria-pressed={currentValue === filter}
          >
            {IDEOLOGIA_LABELS[filter]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IdeologyFilter;