# 🎯 Prompt para Mejorar e Implementar Accesibilidad 100% Funcional

## 📌 Contexto del Proyecto

Aplicación web **"Elecciones Perú 2026"** - Plataforma informativa electoral construida con:
- **Frontend:** React 19.2 + TypeScript + Vite + React Router v7
- **Estilos:** CSS modular con sistema de variables
- **Accesibilidad:** Sistema de 7 características implementadas
- **Stack Backend:** Express.js (puerto 3001), OpenAI API para chatbot

### Arquitectura Actual

```
src/
├── contexts/
│   ├── AccessibilityContext.tsx    (Estado global: 7 features)
│   └── LanguageContext.tsx         (Traducciones es/qu)
├── shared/components/
│   ├── AccessibilityButton.tsx     (Panel drawer - 408 líneas)
│   └── BotAvatar.tsx               (Avatar SVG del chatbot)
├── utils/
│   ├── speech.ts                   (Text-to-Speech con Web Speech API)
│   └── traducciones.ts             (Diccionarios es/qu - 132 líneas)
├── styles/
│   ├── accessibility.css           (341 líneas de estilos)
│   ├── Style.css                   (Candidatos)
│   ├── calendarEvent.css           (Calendario)
│   ├── dondeVotar.css              (Dónde Votar)
│   ├── guiaMiembros.css            (Guía Miembros)
│   └── home.css                    (Inicio)
└── pages/
    ├── HomePage.tsx                (Multilingüe ✅)
    ├── CandidatosPage.tsx
    ├── Calendario.tsx
    ├── DondeVotar.tsx
    └── GuiaMiembros.tsx
```

## 🎨 Características de Accesibilidad Implementadas

### 1. **Modo Oscuro (Dark Mode)** ✅
- Estado: `darkMode` (boolean)
- LocalStorage: `accessibility_darkMode`
- CSS: `.dark-mode` con variables CSS
- **Problema:** No se aplica completamente en algunas secciones (ver screenshots)

### 2. **Ajuste de Fuente** ✅
- Tamaños: 16px | 18px | 20px
- Controles: botones +/- con display central
- LocalStorage: `accessibility_fontSize`

### 3. **Alto Contraste** ✅
- CSS: `.high-contrast` con ratios mejorados
- LocalStorage: `accessibility_highContrast`

### 4. **Escala de Grises** ✅
- Filtro CSS: `filter: grayscale(100%)`
- LocalStorage: `accessibility_grayscale`

### 5. **Cursor Grande** ✅
- SVG cursor custom 40x40px
- LocalStorage: `accessibility_largeCursor`

### 6. **Cambio de Idioma** ⚠️
- Idiomas: Español (es) | Quechua (qu)
- Hook: `useLanguage()` con función `t()`
- **Estado:** Solo implementado en HomePage
- LocalStorage: `accessibility_language`

### 7. **Text-to-Speech** ⚠️
- API: Web Speech API (nativa del navegador)
- Limitaciones: Solo Chrome/Edge, 5000 chars max
- LocalStorage: `accessibility_textToSpeech`

## ❌ Problemas Identificados

### CRÍTICOS

#### 1. **Modo Oscuro Inconsistente**
**Síntomas (según screenshots):**
- ✅ Inicio: Funciona correctamente
- ❌ Candidatos: Fondo claro, tarjetas sin fondo oscuro
- ❌ Calendario: Grid con fondo blanco
- ❌ Dónde Votar: Inputs y cards sin tema oscuro
- ⚠️ Guía Miembros: Inicio correcto, footer/secciones inferiores claras

**Diagnóstico:**
```css
/* FALTABA en Style.css (Candidatos) */
.dark-mode .candidatos-page { background: #0f172a; }
.dark-mode .tarjeta-candidato { background: rgba(30, 41, 59, 0.8); }
.dark-mode .lista-candidatos__buscador { background: #1e293b; }

/* FALTABA en calendarEvent.css */
.dark-mode .calendario-dia { background: #0f172a; }
.dark-mode .calendario-modal-content { background: #1e293b; }

/* FALTABA en dondeVotar.css */
.dark-mode .donde-votar__input { background: #1e293b; }
.dark-mode .donde-votar__location-card { background: #1e293b; }

/* FALTABA en guiaMiembros.css */
.dark-mode .guia-miembros__timeline-section { background: #1e293b; }
.dark-mode .guia-miembros__download-card { background: #1e293b; }
```

**Solución Aplicada:** ✅
- Agregados selectores `.dark-mode` faltantes en todos los archivos CSS
- Variables CSS unificadas: `--bg-primary: #1e293b`, `--text-primary: #f1f5f9`
- Transiciones suaves: `transition: background 0.3s ease, color 0.3s ease`

#### 2. **Traducciones Solo en HomePage**
**Estado Actual:**
- ✅ HomePage: Traducido completamente (es/qu)
- ❌ Candidatos: Textos hardcodeados en español
- ❌ Calendario: Sin traducciones
- ❌ Dónde Votar: Sin traducciones
- ❌ Guía Miembros: Sin traducciones

**Patrón Implementado en HomePage:**
```typescript
import { useLanguage } from '../contexts/LanguageContext';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <h1>{t('home.hero.title')} <span>{t('home.hero.titleHighlight')}</span></h1>
  );
};
```

### ALTOS

#### 3. **Text-to-Speech Limitado**
- Solo funciona en Chrome/Edge
- Límite de 5000 caracteres
- No lee contenido dinámico del chatbot
- Polling cada 500ms para estado `isSpeaking` (ineficiente)

#### 4. **Contraste de Colores Sin Validar**
- No verificado con WCAG 2.1 AA (ratio 4.5:1)
- Algunos botones pueden no cumplir
- Alto contraste podría mejorar

#### 5. **Performance - Re-renders**
- `AccessibilityContext` sin `useMemo`/`useCallback`
- Todos los consumidores se re-renderizan en cada cambio
- Polling de `isSpeaking` cada 500ms

### MEDIOS

#### 6. **localStorage Sin Manejo de Errores**
```typescript
// Actual (vulnerable)
localStorage.setItem('accessibility_darkMode', 'true');

// Debería ser:
try {
  localStorage.setItem('accessibility_darkMode', 'true');
} catch (e) {
  console.warn('localStorage no disponible', e);
  // Fallback a memoria
}
```

#### 7. **Focus Trap Faltante en Panel**
- El drawer no atrapa el foco
- Tab puede salir del panel cuando está abierto
- Falta retorno de foco al botón al cerrar

#### 8. **Responsive Móvil Mejorable**
- Panel de 420px puede ser muy grande en móviles
- Botón flotante puede obstruir contenido
- Touch targets menores a 44x44px recomendados

## 🛠️ Tareas de Implementación

### FASE 1: Completar Modo Oscuro (COMPLETADO ✅)

**Archivos Modificados:**
1. `src/Components/Style.css` - Candidatos
2. `src/styles/calendarEvent.css` - Calendario
3. `src/styles/dondeVotar.css` - Dónde Votar
4. `src/styles/guiaMiembros.css` - Guía Miembros

**Cambios Aplicados:**
- Agregados 150+ selectores `.dark-mode`
- Variables CSS consistentes en todos los archivos
- Fondos oscuros: `#0f172a` (principal), `#1e293b` (secundario)
- Textos: `#f1f5f9` (primario), `#cbd5e1` (secundario)
- Bordes: `#334155` con hover `#475569`

### FASE 2: Implementar Traducciones en Todas las Páginas

#### **2.1 Candidatos** (Prioridad ALTA)

**Textos a Traducir:**
```typescript
// traducciones.ts
candidatos: {
  title: 'Candidatos 2026',
  subtitle: 'Explora los perfiles y propuestas de cada precandidato',
  search: {
    placeholder: 'Buscar por nombre o partido...',
    label: 'Número de DNI',
  },
  filters: {
    all: 'Todos',
    department: 'Departamento',
    province: 'Provincia',
    district: 'Distrito',
    party: 'Partido',
    sector: 'Sector',
  },
  results: {
    count: '{count} resultados',
    clear: 'Limpiar filtros',
    noResults: 'No se encontraron candidatos',
  },
  card: {
    viewDetails: 'Ver detalle',
    addToCompare: 'Agregar a la comparativa',
    removeFromCompare: 'Quitar de la comparativa',
  },
  detail: {
    close: 'Cerrar',
    name: 'Nombre',
    party: 'Partido Político',
    position: 'Cargo',
    department: 'Departamento',
    proposals: 'Propuestas',
    resume: 'Hoja de Vida',
    activities: 'Actividades',
    news: 'Noticias',
  },
  compare: {
    title: 'Comparador de Candidatos',
    subtitle: 'Seleccionados para comparar',
    close: 'Cerrar comparador',
    education: 'Educación',
    experience: 'Experiencia',
    proposals: 'Propuestas principales',
  },
}
```

**Componentes a Modificar:**
1. `src/pages/CandidatosPage.tsx`
2. `src/Components/ListaCandidatos.tsx`
3. `src/Components/TarjetaCandidato.tsx`
4. `src/Components/DetallePrecandidatos.tsx`
5. `src/Components/ComparadorCandidatos.tsx`

**Ejemplo de Implementación:**
```typescript
// CandidatosPage.tsx
import { useLanguage } from '../contexts/LanguageContext';

export function CandidatosPage() {
  const { t } = useLanguage();
  
  return (
    <div className="candidatos-page">
      <h1>{t('candidatos.title')}</h1>
      <p>{t('candidatos.subtitle')}</p>
      <input placeholder={t('candidatos.search.placeholder')} />
      {/* ... */}
    </div>
  );
}
```

#### **2.2 Calendario** (Prioridad ALTA)

**Textos a Traducir:**
```typescript
calendario: {
  title: 'Calendario Electoral 2026',
  subtitle: 'Fechas clave del proceso electoral',
  navigation: {
    previous: 'Mes anterior',
    next: 'Siguiente mes',
  },
  events: {
    inscription: 'Inscripción de Candidatos',
    campaign: 'Inicio de Campaña Electoral',
    debate: 'Debate Presidencial',
    vote: 'Día de Votación',
    results: 'Proclamación de Resultados',
  },
  modal: {
    close: 'Cerrar',
    category: 'Categoría',
    date: 'Fecha',
    description: 'Descripción',
  },
}
```

#### **2.3 Dónde Votar** (Prioridad MEDIA)

**Textos a Traducir:**
```typescript
dondeVotar: {
  title: '¿Dónde Voto?',
  subtitle: 'Encuentra tu centro de votación con tu DNI',
  form: {
    label: 'Número de DNI',
    placeholder: 'Ingrese 8 dígitos',
    button: 'Buscar',
    searching: 'Buscando...',
    error: 'Ingresa un DNI válido de 8 dígitos',
  },
  results: {
    success: 'Centro de votación encontrado',
    votingLocation: 'Local de Votación',
    address: 'Dirección',
    table: 'Mesa',
    district: 'Distrito',
    department: 'Departamento',
    schedule: 'Horario de Votación',
    scheduleTime: '8:00 AM - 4:00 PM',
  },
  instructions: {
    whatToBring: {
      title: 'Qué llevar',
      dni: 'DNI Original',
      mask: 'Mascarilla',
      pen: 'Lapicero azul',
    },
    howToVote: {
      title: 'Cómo votar',
      verify: 'Verifica tu mesa',
      receive: 'Recibe tu cédula',
      mark: 'Marca tu opción',
      deposit: 'Deposita en ánfora',
    },
  },
  tips: {
    title: 'Consejos Útiles',
    tip1: 'Llega temprano',
    tip2: 'Verifica tu mesa',
    tip3: 'Lleva lo necesario',
    tip4: 'Vota informado',
  },
}
```

#### **2.4 Guía Miembros** (Prioridad BAJA)

**Textos a Traducir:**
```typescript
guiaMiembros: {
  title: 'Guía para Miembros de Mesa',
  subtitle: 'Todo lo que necesitas saber para cumplir tu rol',
  tabs: {
    general: 'Información General',
    responsibilities: 'Mis Responsabilidades',
    rights: 'Derechos y Beneficios',
    documents: 'Documentos',
    important: 'Importante Saber',
  },
  intro: {
    title: '¿Qué es un Miembro de Mesa?',
    text1: 'Los miembros de mesa son ciudadanos elegidos...',
    text2: 'Ser miembro de mesa es un deber ciudadano...',
  },
  // ... más secciones
}
```

### FASE 3: Mejoras de Rendimiento

#### **3.1 Optimizar AccessibilityContext**
```typescript
// Antes
export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toggleDarkMode = () => setDarkMode(prev => !prev);
  
  return (
    <AccessibilityContext.Provider value={{
      darkMode,
      toggleDarkMode,
      // ... más estados
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

// Después (OPTIMIZADO)
export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);
  
  const value = useMemo(() => ({
    darkMode,
    fontSize,
    highContrast,
    largeCursor,
    grayscale,
    language,
    textToSpeech,
    toggleDarkMode,
    setFontSize: setFontSizeValue,
    toggleHighContrast,
    toggleLargeCursor,
    toggleGrayscale,
    setLanguage: setLanguageValue,
    toggleTextToSpeech,
    resetSettings,
  }), [
    darkMode,
    fontSize,
    highContrast,
    largeCursor,
    grayscale,
    language,
    textToSpeech,
  ]);
  
  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};
```

#### **3.2 Optimizar Polling de Text-to-Speech**
```typescript
// Antes (Polling cada 500ms)
useEffect(() => {
  const interval = setInterval(() => {
    setIsSpeaking(window.speechSynthesis.speaking);
  }, 500);
  return () => clearInterval(interval);
}, []);

// Después (Event-driven)
useEffect(() => {
  const utterance = new SpeechSynthesisUtterance();
  
  utterance.addEventListener('start', () => setIsSpeaking(true));
  utterance.addEventListener('end', () => setIsSpeaking(false));
  utterance.addEventListener('error', () => setIsSpeaking(false));
  
  return () => {
    utterance.removeEventListener('start', () => {});
    utterance.removeEventListener('end', () => {});
    utterance.removeEventListener('error', () => {});
  };
}, []);
```

### FASE 4: Implementar Focus Trap

```typescript
// AccessibilityButton.tsx
import { useRef, useEffect } from 'react';

const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    previousFocus.current = document.activeElement as HTMLElement;
    
    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTab);
      previousFocus.current?.focus();
    };
  }, [isActive]);

  return containerRef;
};

// Uso
export function AccessibilityButton() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useFocusTrap(isOpen);
  
  return (
    <div ref={panelRef} className="accessibility__panel">
      {/* ... */}
    </div>
  );
}
```

### FASE 5: Manejo de Errores localStorage

```typescript
// utils/storage.ts
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn(`Error al leer localStorage key: ${key}`, e);
      return null;
    }
  },
  
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.warn(`Error al escribir localStorage key: ${key}`, e);
      return false;
    }
  },
  
  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.warn(`Error al eliminar localStorage key: ${key}`, e);
      return false;
    }
  },
};

// AccessibilityContext.tsx
import { safeLocalStorage } from '../utils/storage';

useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add('dark-mode');
    safeLocalStorage.setItem('accessibility_darkMode', 'true');
  } else {
    document.documentElement.classList.remove('dark-mode');
    safeLocalStorage.setItem('accessibility_darkMode', 'false');
  }
}, [darkMode]);
```

## 📊 Checklist de Validación Final

### Modo Oscuro
- [ ] Inicio - Todos los elementos visibles
- [ ] Candidatos - Tarjetas, búsqueda, filtros
- [ ] Calendario - Grid, modal, eventos
- [ ] Dónde Votar - Formulario, resultados, mapa
- [ ] Guía Miembros - Todas las secciones incluido footer

### Traducciones
- [ ] HomePage - Español/Quechua 100%
- [ ] Candidatos - Español/Quechua 100%
- [ ] Calendario - Español/Quechua 100%
- [ ] Dónde Votar - Español/Quechua 100%
- [ ] Guía Miembros - Español/Quechua 100%

### Rendimiento
- [ ] AccessibilityContext con useMemo/useCallback
- [ ] No re-renders innecesarios
- [ ] Text-to-Speech event-driven (no polling)
- [ ] localStorage con manejo de errores

### Accesibilidad WCAG
- [ ] Contraste validado con herramienta (4.5:1)
- [ ] Focus trap en panel
- [ ] Navegación solo con teclado funciona
- [ ] Screen reader compatible
- [ ] Touch targets ≥ 44x44px

### Testing Cross-Browser
- [ ] Chrome - Todas las features
- [ ] Firefox - Todas menos TTS nativo
- [ ] Edge - Todas las features
- [ ] Safari - Modo oscuro + traducciones

## 🚀 Comandos de Testing

```bash
# Instalar herramientas
npm install -D @axe-core/react eslint-plugin-jsx-a11y

# Ejecutar proyecto
npm run dev:all

# Abrir en navegador
# http://localhost:5173

# Testing manual:
# 1. Activar panel de accesibilidad
# 2. Probar cada feature
# 3. Navegar por todas las páginas
# 4. Cambiar de idioma
# 5. Activar/desactivar modo oscuro
# 6. Verificar persistencia (recargar página)
```

## 📈 Métricas de Éxito

| Métrica | Objetivo | Estado Actual |
|---------|----------|---------------|
| Lighthouse Accessibility | ≥ 95/100 | ~85/100 |
| Errores axe DevTools | 0 | ~8 |
| Cobertura Modo Oscuro | 100% páginas | 80% |
| Cobertura Traducciones | 100% páginas | 20% |
| Tiempo de respuesta UI | < 100ms | ~150ms |
| Compatibilidad navegadores | 95% features | 85% |

## 🎯 Prompt Final para IA

```
Eres un experto en React + TypeScript y accesibilidad web WCAG 2.1 AA.

CONTEXTO:
Proyecto "Elecciones Perú 2026" con 7 características de accesibilidad:
- Modo oscuro, ajuste de fuente, alto contraste, escala de grises, cursor grande
- Cambio de idioma (es/qu), Text-to-Speech

ARCHIVOS CLAVE:
- src/contexts/AccessibilityContext.tsx (estado global)
- src/utils/traducciones.ts (diccionarios)
- src/styles/*.css (estilos con .dark-mode)
- src/pages/*.tsx (componentes de página)

TAREAS PRIORITARIAS:

1. COMPLETAR TRADUCCIONES EN CANDIDATOS:
   - Analizar CandidatosPage.tsx y sub-componentes
   - Agregar claves a traducciones.ts (es/qu)
   - Importar useLanguage y usar t()
   - Verificar que funcione al cambiar idioma

2. OPTIMIZAR PERFORMANCE:
   - Agregar useMemo/useCallback en AccessibilityContext
   - Eliminar polling de isSpeaking (usar eventos)
   - Agregar React.memo donde sea necesario

3. IMPLEMENTAR FOCUS TRAP:
   - Crear hook useFocusTrap
   - Aplicar en AccessibilityButton
   - Verificar con Tab/Shift+Tab

4. VALIDAR CONTRASTE:
   - Verificar ratios 4.5:1 en modo oscuro
   - Ajustar colores si es necesario
   - Documentar cambios

RESTRICCIONES:
- No cambiar nombres de archivos existentes
- Mantener compatibilidad con código actual
- No romper funcionalidad existente
- Seguir patrones ya establecidos

ENTREGABLES:
- Código TypeScript/React funcional
- Traducciones completas es/qu
- CSS con selectores .dark-mode
- Documentación de cambios
```

---

**Fecha de Creación:** 16 de Noviembre, 2025  
**Versión:** 1.0  
**Estado:** ✅ Modo Oscuro Completado | ⏳ Traducciones en Progreso  
**Branch:** `feature/Accesibilidad-Avatar`
