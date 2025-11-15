# 📋 Guía Miembros de Mesa - Documentación

## 🎯 Descripción General

Página completa e informativa para orientar a los ciudadanos designados como **Miembros de Mesa** en las Elecciones 2026. Incluye toda la información necesaria para cumplir con este rol cívico de manera efectiva.

---

## ✨ Características Principales

### 1. **Hero Section**
- Título destacado con badge oficial
- Descripción clara del propósito de la página
- Diseño limpio y profesional

### 2. **Video Tutorial de ONPE** 🎥
- Video embebido de YouTube oficial de ONPE
- Explica funciones y roles de miembros de mesa
- Responsive (16:9 aspect ratio)
- URL: https://www.youtube.com/watch?v=DW5-XnnNSjo

### 3. **¿Qué es un Miembro de Mesa?**
- Explicación detallada del rol
- Importancia en el proceso democrático
- Destacado visual con borde azul

### 4. **Funciones y Responsabilidades** ✅
5 tarjetas interactivas con:
- Instalación de la mesa
- Identificación de electores
- Garantizar el secreto del voto
- Conteo de votos
- Llenado de actas

### 5. **Timeline del Día Electoral** ⏰
Cronograma detallado desde las 7:00 AM hasta el cierre:
- 7 pasos claramente definidos
- Marcadores visuales en timeline vertical
- Horarios específicos con descripciones
- Badges amarillos para horarios

### 6. **Derechos y Beneficios** 💰
4 beneficios destacados:
- **S/ 120 soles** de compensación económica
- **Día libre remunerado** (público y privado)
- **Constancia de participación** oficial
- **Experiencia cívica** valiosa

### 7. **¿Qué debo llevar?** 📝
Checklist interactiva con 6 items:
- DNI vigente (obligatorio)
- Carta de notificación ONPE
- Lapicero de tinta indeleble
- Agua y snacks
- Abrigo o casaca
- Celular con batería

### 8. **Sanciones por Inasistencia** ⚠️
3 consecuencias importantes:
- **Multa de S/ 230 soles**
- Impedimento para trámites públicos
- Restricciones laborales sector público
- Diseño con alertas rojas para enfatizar

### 9. **Preguntas Frecuentes (FAQ)** ❓
8 preguntas con respuestas detalladas:
- Excusas válidas
- Consecuencias de no asistir
- Duración de funciones
- Refrigerio proporcionado
- Permisos durante votación
- Capacitación disponible
- Pago de compensación
- Derecho a votar
- **Interactivo**: Click para expandir/contraer

### 10. **Material Descargable** 📥
4 documentos simulados:
- Manual del Miembro de Mesa (PDF - 2.5 MB)
- Acta de Instalación - Modelo (PDF - 850 KB)
- Acta de Sufragio - Modelo (PDF - 920 KB)
- Infografía: Día Electoral (PNG - 1.2 MB)
- Botones de descarga con iconos

### 11. **Call to Action Final** 📞
- Invitación a contactar ONPE
- Botón "Visitar ONPE" (link externo)
- Botón "Llamar: (01) 311-1700"
- Diseño con gradiente azul y botones amarillos

---

## 🎨 Diseño y Estilos

### Paleta de Colores
- **Azul Principal**: `#1e40af` (institucional)
- **Amarillo Acento**: `#fbbf24` (destacados)
- **Rojo Alertas**: `#dc2626` (sanciones)
- **Verde Check**: `#10b981` (checklist)
- **Grises**: Para textos y fondos

### Componentes Visuales
- **Cards con hover effects**: Elevación al pasar el mouse
- **Timeline visual**: Línea vertical con marcadores circulares
- **Badges**: Para horarios y categorías
- **Iconos**: Lucide React icons en todas las secciones
- **Gradientes**: Fondos sutiles para mayor profundidad

### Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Tablet (640px+)**: Grid de 2 columnas
- **Desktop (768px+)**: Layout expandido
- **Large Desktop (1024px+)**: Grid de 3-4 columnas

---

## 🛠️ Tecnologías Utilizadas

- **React 18** con TypeScript
- **Lucide React** para iconos
- **CSS Modules** personalizado
- **YouTube Embed** para video
- **Animations CSS** para interacciones

---

## 📂 Archivos

```
src/
├── pages/
│   ├── GuiaMiembrosPage.tsx       # Componente principal
│   └── GUIA_MIEMBROS_README.md    # Esta documentación
└── styles/
    └── guiaMiembros.css           # Estilos completos
```

---

## 🚀 Funcionalidades Interactivas

### FAQ Accordion
```typescript
const [openFAQ, setOpenFAQ] = useState<number | null>(null);

const toggleFAQ = (index: number) => {
  setOpenFAQ(openFAQ === index ? null : index);
};
```
- Un solo FAQ abierto a la vez
- Animación smooth al expandir
- Iconos chevron que rotan

### Hover Effects
- Cards se elevan `-4px`
- Botones cambian de color
- Sombras más pronunciadas
- Transitions de `0.3s ease`

---

## 📱 Accesibilidad

- **Semantic HTML**: Uso correcto de tags
- **ARIA labels**: En botones interactivos
- **Keyboard navigation**: Tab funcional en FAQ
- **Prefers-reduced-motion**: Respeta preferencias del usuario
- **Alto contraste**: Textos legibles
- **Focus states**: Visible en todos los elementos interactivos

---

## 🔗 Integración

### Ruta
```typescript
<Route path="/guia-miembros" element={<GuiaMiembrosPage />} />
```

### Links desde Navbar y HomePage
- Navbar: Botón "Guía Miembros" (CTA destacado)
- HomePage: Card de acceso rápido
- HomePage: Banner info "¿Primera vez votando?"

---

## 💡 Mejoras Futuras Sugeridas

1. **Implementar descargas reales** de PDFs desde servidor ONPE
2. **Agregar búsqueda/filtro** en FAQ
3. **Integrar chat en vivo** con ONPE
4. **Calculadora de multas** interactiva
5. **Mapa interactivo** para ubicar capacitaciones
6. **Notificaciones** para recordatorios importantes
7. **Quiz interactivo** para evaluar conocimientos
8. **Certificado digital** al completar capacitación
9. **Testimonios** de miembros de mesa anteriores
10. **Estadísticas** del proceso electoral

---

## 📊 Métricas de Contenido

- **10 secciones** principales
- **5 responsabilidades** clave
- **7 pasos** en timeline
- **4 beneficios** destacados
- **6 items** en checklist
- **3 sanciones** detalladas
- **8 FAQs** respondidas
- **4 documentos** descargables
- **2 CTAs** de contacto

---

## 🎓 Información Educativa Incluida

### Datos Importantes
- ✅ Compensación: **S/ 120 soles**
- ✅ Multa por inasistencia: **S/ 230 soles**
- ✅ Horario: **7:00 AM - 6:00 PM** aproximadamente
- ✅ Derecho a día libre remunerado
- ✅ Capacitación disponible (presencial y virtual)

### Proceso Completo
1. Notificación por ONPE
2. Capacitación (opcional pero recomendada)
3. Día de elecciones (instalación, votación, conteo)
4. Entrega de actas
5. Recepción de compensación económica
6. Obtención de constancia

---

## 🤝 Contribuciones

Para mejorar esta página:
1. Actualizar datos según comunicados ONPE
2. Agregar más FAQs basadas en consultas reales
3. Mejorar accesibilidad
4. Optimizar performance
5. Agregar tests unitarios

---

## 📄 Licencia

Contenido educativo basado en información oficial de ONPE Perú.

---

## 👥 Créditos

- **Contenido**: Basado en manuales oficiales ONPE
- **Video**: ONPE Oficial YouTube
- **Diseño**: Inspirado en mejores prácticas UX/UI
- **Iconos**: Lucide React
- **Desarrollado para**: Hackaton El Comercio - Elecciones 2026

---

**Última actualización**: Diciembre 2024
**Versión**: 1.0.0