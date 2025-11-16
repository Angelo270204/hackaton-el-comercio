import React from 'react';
import type { ElementType } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface TranslateProps {
  text: string;
  className?: string;
  as?: ElementType;
}

export const Translate: React.FC<TranslateProps> = ({ text, className, as: Component = 'span' }) => {
  const { t } = useLanguage();
  const translatedText = t(text);

  return <Component className={className}>{translatedText}</Component>;
};

