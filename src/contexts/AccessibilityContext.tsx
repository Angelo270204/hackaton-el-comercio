import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type Language = 'es' | 'qu';

export interface AccessibilityState {
  darkMode: boolean;
  fontSize: number; // 16, 18, 20
  highContrast: boolean;
  largeCursor: boolean;
  grayscale: boolean;
  language: Language;
}

export interface AccessibilityContextType extends AccessibilityState {
  toggleDarkMode: () => void;
  increaseFont: () => void;
  decreaseFont: () => void;
  toggleHighContrast: () => void;
  toggleGrayscale: () => void;
  toggleLargeCursor: () => void;
  setLanguage: (lang: Language) => void;
  resetAccessibility: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const STORAGE_KEYS = {
  darkMode: 'accessibility_darkMode',
  fontSize: 'accessibility_fontSize',
  highContrast: 'accessibility_highContrast',
  largeCursor: 'accessibility_largeCursor',
  grayscale: 'accessibility_grayscale',
  language: 'accessibility_language',
} as const;

const DEFAULT_STATE: AccessibilityState = {
  darkMode: false,
  fontSize: 16,
  highContrast: false,
  largeCursor: false,
  grayscale: false,
  language: 'es',
};

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicializar estados desde localStorage
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.darkMode);
    return saved ? JSON.parse(saved) : DEFAULT_STATE.darkMode;
  });

  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.fontSize);
    return saved ? Number(saved) : DEFAULT_STATE.fontSize;
  });

  const [highContrast, setHighContrast] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.highContrast);
    return saved ? JSON.parse(saved) : DEFAULT_STATE.highContrast;
  });

  const [largeCursor, setLargeCursor] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.largeCursor);
    return saved ? JSON.parse(saved) : DEFAULT_STATE.largeCursor;
  });

  const [grayscale, setGrayscale] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.grayscale);
    return saved ? JSON.parse(saved) : DEFAULT_STATE.grayscale;
  });

  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.language);
    return (saved as Language) || DEFAULT_STATE.language;
  });

  // Aplicar modo oscuro
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.darkMode, JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [darkMode]);

  // Aplicar tamaño de fuente
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.fontSize, fontSize.toString());
    document.documentElement.style.fontSize = `${fontSize}px`;
    document.documentElement.setAttribute('data-font-size', fontSize.toString());
  }, [fontSize]);

  // Aplicar alto contraste
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.highContrast, JSON.stringify(highContrast));
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Aplicar cursor grande
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.largeCursor, JSON.stringify(largeCursor));
    if (largeCursor) {
      document.body.classList.add('large-cursor');
      // Cursor grande con SVG inline más visible
      const cursorSvg = encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#000000" stroke="#ffffff" stroke-width="3"/><circle cx="20" cy="20" r="8" fill="#ffffff"/></svg>');
      const cursorUrl = `url("data:image/svg+xml,${cursorSvg}") 20 20, auto`;
      document.body.style.cursor = cursorUrl;
      // Aplicar a todos los elementos interactivos
      const style = document.createElement('style');
      style.id = 'large-cursor-style';
      style.textContent = `.large-cursor * { cursor: ${cursorUrl} !important; }`;
      document.head.appendChild(style);
    } else {
      document.body.classList.remove('large-cursor');
      document.body.style.cursor = '';
      const style = document.getElementById('large-cursor-style');
      if (style) {
        style.remove();
      }
    }
  }, [largeCursor]);

  // Aplicar escala de grises
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.grayscale, JSON.stringify(grayscale));
    if (grayscale) {
      document.documentElement.classList.add('grayscale-mode');
      document.documentElement.style.filter = 'grayscale(100%)';
    } else {
      document.documentElement.classList.remove('grayscale-mode');
      document.documentElement.style.filter = '';
    }
  }, [grayscale]);

  // Aplicar idioma
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.language, language);
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  // Funciones de control
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const increaseFont = () => {
    setFontSize((current) => {
      if (current < 20) {
        return current === 16 ? 18 : 20;
      }
      return current;
    });
  };

  const decreaseFont = () => {
    setFontSize((current) => {
      if (current > 16) {
        return current === 20 ? 18 : 16;
      }
      return current;
    });
  };

  const toggleHighContrast = () => setHighContrast((prev) => !prev);

  const toggleGrayscale = () => setGrayscale((prev) => !prev);

  const toggleLargeCursor = () => setLargeCursor((prev) => !prev);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const resetAccessibility = () => {
    setDarkMode(DEFAULT_STATE.darkMode);
    setFontSize(DEFAULT_STATE.fontSize);
    setHighContrast(DEFAULT_STATE.highContrast);
    setLargeCursor(DEFAULT_STATE.largeCursor);
    setGrayscale(DEFAULT_STATE.grayscale);
    setLanguageState(DEFAULT_STATE.language);

    // Limpiar localStorage
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  };

  const value: AccessibilityContextType = {
    darkMode,
    fontSize,
    highContrast,
    largeCursor,
    grayscale,
    language,
    toggleDarkMode,
    increaseFont,
    decreaseFont,
    toggleHighContrast,
    toggleGrayscale,
    toggleLargeCursor,
    setLanguage,
    resetAccessibility,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};
