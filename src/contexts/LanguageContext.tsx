import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useAccessibility } from './AccessibilityContext';
import type { Language } from './AccessibilityContext';
import { translations } from '../utils/traducciones';

interface LanguageContextType {
  t: (key: string) => string;
  currentLanguage: Language;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { language } = useAccessibility();

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Retorna la clave si no se encuentra la traducción
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ t, currentLanguage: language }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

