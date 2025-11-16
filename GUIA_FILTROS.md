# Guía de Sistema de Filtros

## 📋 Resumen del Sistema Actual

Se ha implementado un sistema de filtros compacto y extensible para la página de candidatos. El diseño es similar al ejemplo de México pero optimizado para no ser invasivo y ocupar menos espacio.

## 🎨 Características Implementadas

### Barra de Filtros Compacta
- **Ubicación**: Parte superior de la página de candidatos
- **Diseño**: Gradiente púrpura con botones estilo pill
- **Estado sticky**: Se mantiene visible al hacer scroll
- **Responsive**: Se adapta a dispositivos móviles

### Modal de Departamentos
- **Apertura**: Al hacer clic en el botón "Departamento"
- **Diseño**: Grid con tarjetas de mapas departamentales
- **Funcionalidad**: 
  - Selección única de departamento
  - Cierre con botón X, clic fuera o tecla Escape
  - Muestra contador de candidatos por departamento
  - Indicador visual (checkmark) en departamento seleccionado
  - Scroll suave hacia lista de candidatos al filtrar

### Características de UX
- ✅ Badge con número de candidatos cuando hay filtro activo
- ✅ Botón "Limpiar filtros" visible solo cuando hay filtros aplicados
- ✅ Mensaje cuando no hay candidatos para el departamento seleccionado
- ✅ Animaciones suaves (fadeIn, slideUp, checkPop)
- ✅ Bloqueo de scroll del body cuando modal está abierto

## 🔧 Cómo Extender el Sistema

### Agregar Filtro por Cargo (Presidente, Diputado, Senador, Parlamento Andino)

#### 1. Actualizar el State en `CandidatosPage.tsx`

```tsx
const [cargoSeleccionado, setCargoSeleccionado] = useState<string | null>(null)
```

#### 2. Crear Componente `CargoFilter`

```tsx
// src/Components/CargoFilter/CargoFilter.tsx
import { useState, useEffect } from 'react'
import './CargoFilter.css'

export interface CargoInfo {
  nombre: string
  icono: string // SVG o emoji
  candidatos: number
}

interface CargoFilterProps {
  cargos: CargoInfo[]
  cargoSeleccionado: string | null
  onSeleccionarCargo: (cargo: string | null) => void
}

export function CargoFilter({ cargos, cargoSeleccionado, onSeleccionarCargo }: CargoFilterProps) {
  const [modalAbierto, setModalAbierto] = useState(false)
  
  // Similar al DepartamentoFilter...
}
```

#### 3. Integrar en la Barra de Filtros

En `DepartamentoFilter.tsx`, descomentar y modificar:

```tsx
<button 
  className={`filtro-btn ${cargoSeleccionado ? 'filtro-btn--activo' : ''}`}
  onClick={handleAbrirModalCargo}
>
  <svg className="filtro-btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
  {cargoSeleccionado ? cargoSeleccionado : 'Cargo'}
  {cargoSeleccionado && (
    <span className="filtro-btn__badge">{cantidadCargo}</span>
  )}
</button>
```

#### 4. Actualizar Lógica de Filtrado

En `CandidatosPage.tsx`:

```tsx
const candidatosFiltrados = useMemo(() => {
  let resultado = candidatos
  
  // Filtro por departamento
  if (departamentoSeleccionado) {
    resultado = resultado.filter(c => c.departamento === departamentoSeleccionado)
  }
  
  // Filtro por cargo
  if (cargoSeleccionado) {
    resultado = resultado.filter(c => c.cargo_postula === cargoSeleccionado)
  }
  
  return resultado
}, [candidatos, departamentoSeleccionado, cargoSeleccionado])
```

#### 5. Actualizar Botón "Limpiar Filtros"

```tsx
const limpiarTodosFiltros = () => {
  setDepartamentoSeleccionado(null)
  setCargoSeleccionado(null)
}

// Mostrar solo si hay algún filtro activo
{(departamentoSeleccionado || cargoSeleccionado) && (
  <button className="filtros-bar__limpiar" onClick={limpiarTodosFiltros}>
    Limpiar filtros
  </button>
)}
```

## 📊 Estructura de Archivos

```
src/
├── Components/
│   ├── DepartamentoFilter/
│   │   ├── DepartamentoFilter.tsx    # Componente principal
│   │   ├── DepartamentoFilter.css    # Estilos
│   │   └── index.ts                  # Exportaciones
│   │
│   └── CargoFilter/                   # (Futuro)
│       ├── CargoFilter.tsx
│       ├── CargoFilter.css
│       └── index.ts
│
└── pages/
    └── CandidatosPage.tsx            # Integración de filtros
```

## 🎯 Tipos de Datos

### Candidato (actualizado)

```typescript
interface Candidato {
  id: number | string
  nombre: string
  partido: string
  cargo_postula: string  // "Presidenta", "Diputado", "Senador", "Parlamento Andino"
  departamento?: string
  provincia?: string
  distrito?: string
  // ... otros campos
}
```

## 🎨 Guía de Estilos

### Colores Principales
- **Gradiente Header**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- **Filtro Activo**: `#3498db`
- **Botón Limpiar**: `#e74c3c`
- **Fondo Modal**: `rgba(0, 0, 0, 0.6)` con `backdrop-filter: blur(4px)`

### Transiciones
- Hover: `0.3s ease`
- Modal fadeIn: `0.3s ease`
- Transform: `translateY(-2px)` en hover

## 📱 Responsive Breakpoints

- **Desktop**: > 768px - Grid de 3-4 columnas
- **Tablet**: 481px - 768px - Grid de 2-3 columnas
- **Mobile**: ≤ 480px - Grid de 1-2 columnas

## ✨ Mejoras Futuras Sugeridas

1. **Filtros Combinados**: Permitir múltiples departamentos seleccionados
2. **Búsqueda**: Agregar campo de búsqueda por nombre de candidato
3. **Filtro por Partido**: Modal con logos de partidos políticos
4. **Filtro por Ideología**: Espectro político visual
5. **Ordenamiento**: Por nombre, partido, departamento
6. **Guardado de Filtros**: LocalStorage para persistir preferencias
7. **Compartir Filtros**: URL con parámetros de búsqueda
8. **Contadores Dinámicos**: Mostrar cantidad resultante al combinar filtros

## 🔍 Ejemplo de Implementación Completa

Ver archivos:
- `src/Components/DepartamentoFilter/DepartamentoFilter.tsx`
- `src/Components/DepartamentoFilter/DepartamentoFilter.css`
- `src/pages/CandidatosPage.tsx` (líneas 47-102 para lógica de filtrado)

## 📝 Notas Importantes

- El componente es **reutilizable** y puede adaptarse para otros tipos de filtros
- La barra de filtros es **sticky** y siempre visible
- Los modales usan **portals** implícitos con `position: fixed`
- Se bloquea el **scroll del body** cuando el modal está abierto
- Soporte para **teclado** (Escape para cerrar)
- **Animaciones** suaves y profesionales
- Diseño **accesible** con indicadores visuales claros

---

**Última actualización**: Noviembre 2024
**Versión**: 1.0.0