/**
 * Utilidad para Text-to-Speech usando Web Speech API
 */

let speechSynthesis: SpeechSynthesis | null = null;
let currentUtterance: SpeechSynthesisUtterance | null = null;
let isSpeaking = false;

// Verificar soporte del navegador
export const isSpeechSupported = (): boolean => {
  return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
};

/**
 * Obtiene el texto del contenido principal de la página
 */
export const getPageText = (): string => {
  const root = document.getElementById('root');
  if (!root) return '';

  // Obtener texto visible, excluyendo scripts y estilos
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;

        // Excluir elementos ocultos o no deseados
        const style = window.getComputedStyle(parent);
        if (
          style.display === 'none' ||
          style.visibility === 'hidden' ||
          parent.tagName === 'SCRIPT' ||
          parent.tagName === 'STYLE' ||
          parent.classList.contains('accessibility__panel') ||
          parent.classList.contains('chatbot')
        ) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  const textParts: string[] = [];
  let node: Node | null;

  while ((node = walker.nextNode())) {
    const text = node.textContent?.trim();
    if (text && text.length > 0) {
      textParts.push(text);
    }
  }

  return textParts.join('. ').substring(0, 5000); // Limitar a 5000 caracteres
};

/**
 * Lee el texto seleccionado por el usuario
 */
export const readSelectedText = (): void => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) {
    return;
  }

  const text = selection.toString().trim();
  if (text.length === 0) {
    return;
  }

  speak(text);
};

/**
 * Lee el contenido completo de la página
 */
export const readPageContent = (): void => {
  const text = getPageText();
  if (text.length === 0) {
    speak('No hay contenido disponible para leer.');
    return;
  }

  speak(text);
};

/**
 * Función principal para sintetizar voz
 */
export const speak = (text: string, lang: string = 'es-PE'): void => {
  if (!isSpeechSupported()) {
    console.warn('Text-to-Speech no está soportado en este navegador');
    return;
  }

  // Detener cualquier lectura anterior
  stopSpeaking();

  speechSynthesis = window.speechSynthesis;

  currentUtterance = new SpeechSynthesisUtterance(text);
  currentUtterance.lang = lang;
  currentUtterance.rate = 1.0;
  currentUtterance.pitch = 1.0;
  currentUtterance.volume = 1.0;

  currentUtterance.onstart = () => {
    isSpeaking = true;
  };

  currentUtterance.onend = () => {
    isSpeaking = false;
    currentUtterance = null;
  };

  currentUtterance.onerror = (error) => {
    console.error('Error en Text-to-Speech:', error);
    isSpeaking = false;
    currentUtterance = null;
  };

  speechSynthesis.speak(currentUtterance);
  isSpeaking = true;
};

/**
 * Detiene la lectura actual
 */
export const stopSpeaking = (): void => {
  if (speechSynthesis && isSpeaking) {
    speechSynthesis.cancel();
    isSpeaking = false;
    currentUtterance = null;
  }
};

/**
 * Verifica si está leyendo actualmente
 */
export const getIsSpeaking = (): boolean => {
  return isSpeaking;
};

/**
 * Pausa la lectura
 */
export const pauseSpeaking = (): void => {
  if (speechSynthesis && isSpeaking) {
    speechSynthesis.pause();
  }
};

/**
 * Reanuda la lectura
 */
export const resumeSpeaking = (): void => {
  if (speechSynthesis) {
    speechSynthesis.resume();
  }
};

