# 🗳️ Elecciones Perú 2026 - Portal Electoral Informativo

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/OpenAI-API-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI" />
</p>

Portal web informativo desarrollado para las **Elecciones Generales de Perú 2026**. Permite a los ciudadanos consultar información sobre candidatos presidenciales, encontrar su local de votación, y acceder a guías electorales de manera accesible e inclusiva.

> 🏆 Proyecto desarrollado para el **Hackathon El Comercio**

---

## ✨ Características Principales

### 🗳️ Candidatos Presidenciales
- **Lista interactiva** de precandidatos con filtros por departamento
- **Detalle completo** de cada candidato: perfil, propuestas, trayectoria
- **Comparador de candidatos** para evaluar propuestas lado a lado
- **Filtro por ideología política** para facilitar la búsqueda

### 📍 ¿Dónde Votar?
- Consulta de **local de votación** mediante DNI
- Integración con **Google Maps API** para ubicación y rutas
- **Quiz interactivo** para evaluar conocimientos electorales

### 📖 Guías Electorales
- **Guía del Elector**: proceso de votación, multas, prohibiciones
- **Guía de Miembros de Mesa**: responsabilidades y procedimientos
- Timeline con **fechas importantes** del calendario electoral

### 🤖 Chatbot con IA
- Asistente virtual con **OpenAI API** para resolver dudas electorales
- Respuestas contextualizadas sobre el proceso electoral peruano

### ♿ Accesibilidad
- **Modo alto contraste** y **tamaño de fuente ajustable**
- Soporte para **lectura de pantalla** (screen readers)
- **Multilenguaje**: Español y Quechua

### 📰 Noticias
- Integración con **noticias de El Comercio** sobre el proceso electoral
- Actualización automática de contenido informativo

---

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js v18+ 
- npm

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Angelo270204/hackaton-el-comercio.git

# Entrar al directorio
cd hackaton-el-comercio

# Instalar dependencias
npm install
```

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
OPENAI_API_KEY=tu_api_key_de_openai
VITE_GOOGLE_MAPS_API_KEY=tu_api_key_de_google_maps
```

### Scripts Disponibles

```bash
# Desarrollo (solo frontend)
npm run dev

# Desarrollo (frontend + servidor del chatbot)
npm run dev:all

# Servidor del chatbot únicamente
npm run dev:server

# Build de producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

---

## 🛠️ Tecnologías

| Categoría | Tecnología |
|-----------|------------|
| **Frontend** | React 19, TypeScript, Vite (Rolldown) |
| **Routing** | React Router v7 |
| **Estilos** | CSS Modules, Variables CSS |
| **Mapas** | Google Maps API (@react-google-maps/api) |
| **IA/Chatbot** | OpenAI API |
| **Íconos** | Lucide React |
| **Backend** | Express.js (servidor del chatbot) |
| **Linting** | ESLint con reglas de TypeScript |

---

## 📊 Datos

Los datos de candidatos y configuraciones se encuentran en \`/public/data/\`:

- \`candidatos.json\` - Información de precandidatos presidenciales
- \`diputados.json\` - Candidatos a diputados
- \`senadores_nacional.json\` - Candidatos a senadores nacionales
- \`senadores_regional.json\` - Candidatos a senadores regionales
- \`parlamento_andino.json\` - Candidatos al parlamento andino
- \`localesVotacion.json\` - Datos de locales de votación
- \`slidersHome.json\` - Configuración del carrusel principal

---

## 👥 Equipo

Proyecto desarrollado para el **Hackathon El Comercio 2024/2025**

---

## 📄 Licencia

Este proyecto fue creado con fines educativos y de participación ciudadana.

---

<p align="center">
  Hecho con ❤️ para las Elecciones Perú 2026
