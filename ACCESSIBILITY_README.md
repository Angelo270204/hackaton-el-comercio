# 🎯 Funcionalidad de Accesibilidad + Avatar Integrado

## ✨ Características Implementadas

### 1. **Sistema de Accesibilidad** ♿

#### **Modo Oscuro**
- Toggle para alternar entre modo claro y oscuro
- Se guarda la preferencia en localStorage
- Transiciones suaves entre modos

#### **Ajuste de Tamaño de Fuente**
- 3 tamaños disponibles: Normal, Grande, Muy Grande
- Controles (+) y (-) para ajustar
- Afecta todo el sitio web de manera consistente

#### **Alto Contraste**
- Mejora la legibilidad para usuarios con discapacidad visual
- Colores negro/blanco/amarillo para máximo contraste
- Bordes más visibles en todos los elementos interactivos

#### **Persistencia**
- Todas las configuraciones se guardan en localStorage
- Se restauran automáticamente al recargar la página
- Botón de "Restablecer" para valores por defecto

---

### 2. **Avatar Integrado al Chatbot** 🤖

#### **Avatar Personalizado**
- Robot amigable diseñado en SVG
- Colores consistentes con el tema de la aplicación
- Dos versiones: grande (botón flotante) y pequeña (mensajes)

#### **Integración Visual**
- Avatar en el botón flotante del chat
- Avatar en el header del panel de chat
- Avatar en cada mensaje del asistente
- Animaciones suaves y profesionales

#### **Accesibilidad del Avatar**
- No interfiere con las funciones de accesibilidad
- Se adapta al modo oscuro
- Mantiene buen contraste en alto contraste

---

## 📁 Archivos Creados/Modificados

### **Nuevos Archivos:**
```
src/
  contexts/
    AccessibilityContext.tsx      # Context Provider para accesibilidad
  shared/
    components/
      AccessibilityButton.tsx      # Componente del panel de accesibilidad
      BotAvatar.tsx                # Avatar SVG del bot
  styles/
    accessibility.css              # Estilos de accesibilidad
```

### **Archivos Modificados:**
```
src/
  App.tsx                          # Agregado AccessibilityProvider
  App.css                          # Estilos globales para modos
  shared/
    components/
      ChatBot.tsx                  # Integrado avatar
      index.ts                     # Exportaciones actualizadas
  styles/
    chatbot.css                    # Estilos mejorados para avatar
```

---

## 🎨 Componentes

### **AccessibilityContext**
Context Provider que maneja todo el estado de accesibilidad:
- `isDarkMode`: Estado del modo oscuro
- `fontSize`: Tamaño actual de la fuente
- `highContrast`: Estado del alto contraste
- Funciones: `toggleDarkMode()`, `increaseFontSize()`, `decreaseFontSize()`, `toggleHighContrast()`, `resetSettings()`

### **AccessibilityButton**
Panel flotante con controles de accesibilidad:
- Posicionado encima del chatbot (bottom: 8rem)
- Color verde para diferenciarse del chatbot azul
- 4 opciones principales + botón de reset

### **BotAvatar**
Avatar SVG del chatbot en dos tamaños:
- `BotAvatar`: Versión grande para botón flotante
- `BotAvatarSmall`: Versión pequeña para mensajes y header

---

## 🎯 Cómo Usar

### **Para Usuarios:**

1. **Abrir Panel de Accesibilidad:**
   - Clic en el botón verde flotante (icono de accesibilidad)
   - Se abre un panel con todas las opciones

2. **Modo Oscuro:**
   - Toggle en la primera opción
   - Cambia todo el sitio a fondo oscuro

3. **Tamaño de Texto:**
   - Botón `-` para disminuir
   - Botón `+` para aumentar
   - 3 niveles disponibles

4. **Alto Contraste:**
   - Toggle en la tercera opción
   - Activa colores de máximo contraste

5. **Restablecer:**
   - Botón rojo al final del panel
   - Vuelve todo a los valores por defecto

### **Para Desarrolladores:**

```tsx
// Usar el contexto de accesibilidad en cualquier componente
import { useAccessibility } from '../contexts/AccessibilityContext';

function MyComponent() {
  const { isDarkMode, fontSize, highContrast } = useAccessibility();
  
  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      {/* Tu código aquí */}
    </div>
  );
}
```

---

## 🎨 Paleta de Colores

### **Accesibilidad:**
- Verde principal: `#10b981`
- Verde oscuro: `#059669`

### **Chatbot:**
- Azul principal: `#1e40af`
- Azul oscuro: `#1e3a8a`
- Amarillo (badge): `#fbbf24`

### **Avatar:**
- Azul gradiente: `#3b82f6` → `#1e40af`
- Blanco: `#ffffff`
- Amarillo (antena): `#fbbf24`
- Azul claro (sensores): `#60a5fa`

---

## ✅ Checklist de Implementación

- [x] Contexto de accesibilidad creado
- [x] Modo oscuro funcional
- [x] Ajuste de tamaño de fuente (3 niveles)
- [x] Alto contraste implementado
- [x] Persistencia en localStorage
- [x] Avatar SVG diseñado
- [x] Avatar integrado en botón flotante
- [x] Avatar en header del chat
- [x] Avatar en mensajes del asistente
- [x] Estilos adaptados para modos
- [x] No hay conflictos entre accesibilidad y avatar
- [x] Responsive en móviles
- [x] Transiciones suaves

---

## 📱 Responsive

- **Desktop:** Botones flotantes a la derecha
- **Mobile:** Paneles de ancho completo
- **Accesibilidad:** bottom: 8rem (encima del chat)
- **Chatbot:** bottom: 2rem

---

## 🚀 Próximos Pasos (Opcional)

1. **Mejoras de Accesibilidad:**
   - [ ] Navegación por teclado completa
   - [ ] Lector de pantalla optimizado
   - [ ] Reducción de animaciones (prefers-reduced-motion)

2. **Avatar:**
   - [ ] Animaciones del avatar (parpadeo, boca móvil)
   - [ ] Estados del avatar (pensando, escribiendo)
   - [ ] Personalización del avatar por preferencias

3. **Temas:**
   - [ ] Múltiples temas de color
   - [ ] Modo automático (según hora del día)
   - [ ] Sincronización con preferencias del sistema

---

## 👥 Autor

**Kylver** - Funcionalidad de Accesibilidad + Avatar + Ensamblaje
- Sistema completo de accesibilidad
- Diseño e integración del avatar
- Consistencia visual en toda la aplicación
- Preparación para el pitch técnico

---

## 📝 Notas Técnicas

- **React Context API** para gestión de estado global
- **localStorage** para persistencia de preferencias
- **CSS Variables** para temas dinámicos
- **SVG** para avatar escalable y ligero
- **TypeScript** para type safety completo
