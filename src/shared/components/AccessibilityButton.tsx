import React, { useState, useEffect, useRef } from 'react';
import {
  Accessibility,
  Sun,
  Moon,
  Type,
  Contrast,
  RotateCcw,
  Plus,
  Minus,
  X,
  ImageOff,
  MousePointer2,
  Languages,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { readPageContent, stopSpeaking, getIsSpeaking, isSpeechSupported } from '../../utils/speech';
import '../../styles/accessibility.css';

export const AccessibilityButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const {
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
  } = useAccessibility();

  const { t } = useLanguage();

  // Cerrar panel con ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll del body cuando el panel está abierto
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Cerrar al hacer clic fuera del panel
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Verificar estado de speech
  useEffect(() => {
    const interval = setInterval(() => {
      setIsSpeaking(getIsSpeaking());
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleTextToSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      readPageContent();
      setIsSpeaking(true);
    }
  };

  const handleReset = () => {
    resetAccessibility();
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    }
  };

  const getFontSizeLabel = () => {
    if (fontSize === 16) return 'Normal';
    if (fontSize === 18) return 'Grande';
    return 'Muy Grande';
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        ref={buttonRef}
        className={`accessibility__button ${isOpen ? 'accessibility__button--hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
        aria-label={t('accessibility.openPanel')}
        title={t('accessibility.title')}
        aria-expanded={isOpen}
      >
        <Accessibility size={24} aria-hidden="true" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="accessibility__overlay"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Panel lateral (drawer) */}
      {isOpen && (
        <div
          ref={panelRef}
          className="accessibility__panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="accessibility-title"
        >
          {/* Header */}
          <div className="accessibility__header">
            <div className="accessibility__header-content">
              <Accessibility size={20} aria-hidden="true" />
              <h3 id="accessibility-title" className="accessibility__title">
                {t('accessibility.title')}
              </h3>
            </div>
            <button
              className="accessibility__close"
              onClick={() => setIsOpen(false)}
              aria-label={t('accessibility.closePanel')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsOpen(false);
                }
              }}
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          {/* Contenido */}
          <div className="accessibility__content">
            {/* A. Contraste Oscuro */}
            <div className="accessibility__option-card">
              <div className="accessibility__option-info">
                <div className="accessibility__option-icon">
                  {darkMode ? <Moon size={20} aria-hidden="true" /> : <Sun size={20} aria-hidden="true" />}
                </div>
                <div>
                  <h4 className="accessibility__option-title">
                    {t('accessibility.darkMode.title')}
                  </h4>
                  <p className="accessibility__option-description">
                    {darkMode ? t('accessibility.darkMode.active') : t('accessibility.darkMode.inactive')}
                  </p>
                </div>
              </div>
              <button
                className={`accessibility__toggle ${darkMode ? 'accessibility__toggle--active' : ''}`}
                onClick={toggleDarkMode}
                aria-label={
                  darkMode
                    ? t('accessibility.darkMode.inactive')
                    : t('accessibility.darkMode.active')
                }
                aria-pressed={darkMode}
              >
                <span className="accessibility__toggle-slider" aria-hidden="true"></span>
              </button>
            </div>

            {/* B. Tamaño de Texto */}
            <div className="accessibility__option-card">
              <div className="accessibility__option-info">
                <div className="accessibility__option-icon">
                  <Type size={20} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="accessibility__option-title">
                    {t('accessibility.fontSize.title')}
                  </h4>
                  <p className="accessibility__option-description">{getFontSizeLabel()}</p>
                </div>
              </div>
              <div className="accessibility__controls">
                <button
                  className="accessibility__control-btn"
                  onClick={decreaseFont}
                  disabled={fontSize === 16}
                  aria-label={t('accessibility.fontSize.decrease')}
                >
                  <Minus size={16} aria-hidden="true" />
                </button>
                <span className="accessibility__font-size-display" aria-live="polite">
                  {fontSize}px
                </span>
                <button
                  className="accessibility__control-btn"
                  onClick={increaseFont}
                  disabled={fontSize === 20}
                  aria-label={t('accessibility.fontSize.increase')}
                >
                  <Plus size={16} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* C. Alto Contraste */}
            <div className="accessibility__option-card">
              <div className="accessibility__option-info">
                <div className="accessibility__option-icon">
                  <Contrast size={20} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="accessibility__option-title">
                    {t('accessibility.highContrast.title')}
                  </h4>
                  <p className="accessibility__option-description">
                    {highContrast
                      ? t('accessibility.highContrast.active')
                      : t('accessibility.highContrast.inactive')}
                  </p>
                </div>
              </div>
              <button
                className={`accessibility__toggle ${highContrast ? 'accessibility__toggle--active' : ''}`}
                onClick={toggleHighContrast}
                aria-label={
                  highContrast
                    ? t('accessibility.highContrast.inactive')
                    : t('accessibility.highContrast.active')
                }
                aria-pressed={highContrast}
              >
                <span className="accessibility__toggle-slider" aria-hidden="true"></span>
              </button>
            </div>

            {/* D. Escala de Grises */}
            <div className="accessibility__option-card">
              <div className="accessibility__option-info">
                <div className="accessibility__option-icon">
                  <ImageOff size={20} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="accessibility__option-title">
                    {t('accessibility.grayscale.title')}
                  </h4>
                  <p className="accessibility__option-description">
                    {grayscale
                      ? t('accessibility.grayscale.active')
                      : t('accessibility.grayscale.inactive')}
                  </p>
                </div>
              </div>
              <button
                className={`accessibility__toggle ${grayscale ? 'accessibility__toggle--active' : ''}`}
                onClick={toggleGrayscale}
                aria-label={
                  grayscale
                    ? t('accessibility.grayscale.inactive')
                    : t('accessibility.grayscale.active')
                }
                aria-pressed={grayscale}
              >
                <span className="accessibility__toggle-slider" aria-hidden="true"></span>
              </button>
            </div>

            {/* E. Cursor Grande */}
            <div className="accessibility__option-card">
              <div className="accessibility__option-info">
                <div className="accessibility__option-icon">
                  <MousePointer2 size={20} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="accessibility__option-title">
                    {t('accessibility.largeCursor.title')}
                  </h4>
                  <p className="accessibility__option-description">
                    {largeCursor
                      ? t('accessibility.largeCursor.active')
                      : t('accessibility.largeCursor.inactive')}
                  </p>
                </div>
              </div>
              <button
                className={`accessibility__toggle ${largeCursor ? 'accessibility__toggle--active' : ''}`}
                onClick={toggleLargeCursor}
                aria-label={
                  largeCursor
                    ? t('accessibility.largeCursor.inactive')
                    : t('accessibility.largeCursor.active')
                }
                aria-pressed={largeCursor}
              >
                <span className="accessibility__toggle-slider" aria-hidden="true"></span>
              </button>
            </div>

            {/* F. Cambio de Idioma */}
            <div className="accessibility__option-card">
              <div className="accessibility__option-info">
                <div className="accessibility__option-icon">
                  <Languages size={20} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="accessibility__option-title">
                    {t('accessibility.language.title')}
                  </h4>
                  <p className="accessibility__option-description">
                    {language === 'es'
                      ? t('accessibility.language.spanish')
                      : t('accessibility.language.quechua')}
                  </p>
                </div>
              </div>
              <div className="accessibility__language-selector">
                <button
                  className={`accessibility__lang-btn ${language === 'es' ? 'accessibility__lang-btn--active' : ''}`}
                  onClick={() => setLanguage('es')}
                  aria-label={t('accessibility.language.spanish')}
                  aria-pressed={language === 'es'}
                >
                  {t('accessibility.language.spanish')}
                </button>
                <button
                  className={`accessibility__lang-btn ${language === 'qu' ? 'accessibility__lang-btn--active' : ''}`}
                  onClick={() => setLanguage('qu')}
                  aria-label={t('accessibility.language.quechua')}
                  aria-pressed={language === 'qu'}
                >
                  {t('accessibility.language.quechua')}
                </button>
              </div>
            </div>

            {/* G. Text-to-Speech */}
            {isSpeechSupported() && (
              <div className="accessibility__option-card">
                <div className="accessibility__option-info">
                  <div className="accessibility__option-icon">
                    {isSpeaking ? (
                      <VolumeX size={20} aria-hidden="true" />
                    ) : (
                      <Volume2 size={20} aria-hidden="true" />
                    )}
                  </div>
                  <div>
                    <h4 className="accessibility__option-title">
                      {t('accessibility.textToSpeech.title')}
                    </h4>
                    <p className="accessibility__option-description">
                      {isSpeaking
                        ? t('accessibility.textToSpeech.stop')
                        : t('accessibility.textToSpeech.start')}
                    </p>
                  </div>
                </div>
                <button
                  className={`accessibility__speech-btn ${isSpeaking ? 'accessibility__speech-btn--active' : ''}`}
                  onClick={handleTextToSpeech}
                  aria-label={
                    isSpeaking
                      ? t('accessibility.textToSpeech.stop')
                      : t('accessibility.textToSpeech.start')
                  }
                >
                  {isSpeaking ? (
                    <VolumeX size={18} aria-hidden="true" />
                  ) : (
                    <Volume2 size={18} aria-hidden="true" />
                  )}
                </button>
              </div>
            )}

            {/* H. Restablecer */}
            <button
              className="accessibility__reset"
              onClick={handleReset}
              aria-label={t('accessibility.reset.title')}
            >
              <RotateCcw size={18} aria-hidden="true" />
              <span>{t('accessibility.reset.title')}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
