import React from 'react';
import type { IdeologiaFilter } from '../../types/candidate';
import { IDEOLOGIA_LABELS } from '../../types/candidate';
import './IdeologyFilterSelect.css';

interface IdeologyFilterSelectProps {
  currentValue: IdeologiaFilter;
  onChange: (ideologia: IdeologiaFilter) => void;
  label?: string;
  showCount?: boolean;
  candidateCount?: Record<IdeologiaFilter, number>;
}

/**
 * Componente de filtro por ideología usando un select/dropdown
 * Esta es una alternativa más compacta al filtro de botones
 */
const IdeologyFilterSelect: React.FC<IdeologyFilterSelectProps> = ({
  currentValue,
  onChange,
  label = 'Filtrar por ideología',
  showCount = false,
  candidateCount
}) => {
  const filters: IdeologiaFilter[] = [
    'todos',
    'izquierda',
    'centro-izquierda',
    'centro',
    'centro-derecha',
    'derecha'
  ];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as IdeologiaFilter);
  };

  const getOptionLabel = (filter: IdeologiaFilter): string => {
    const baseLabel = IDEOLOGIA_LABELS[filter];
    
    if (showCount && candidateCount && candidateCount[filter] !== undefined) {
      return `${baseLabel} (${candidateCount[filter]})`;
    }
    
    return baseLabel;
  };

  return (
    <div className="ideology-filter-select">
      <label htmlFor="ideology-select" className="ideology-filter-select__label">
        {label}:
      </label>
      <select
        id="ideology-select"
        className="ideology-filter-select__select"
        value={currentValue}
        onChange={handleChange}
        aria-label="Filtrar candidatos por ideología política"
      >
        {filters.map((filter) => (
          <option key={filter} value={filter}>
            {getOptionLabel(filter)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default IdeologyFilterSelect;