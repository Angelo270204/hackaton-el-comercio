# 🤖 Chatbot de Asistencia Electoral - Elecciones 2026

## ✨ Características

- **Asistente Virtual Inteligente** powered by OpenAI GPT-3.5
- **Filtrado Estricto**: Solo responde preguntas sobre las Elecciones 2026 de Perú
- **Interfaz Flotante**: Estilo Notion, no intrusivo
- **Responsive**: Funciona en móviles, tablets y desktop
- **Tiempo Real**: Respuestas instantáneas

## 🚀 Cómo ejecutar

### Opción 1: Ejecutar ambos servidores juntos (Recomendado)

```bash
npm run dev:all
```

Esto ejecutará:
- Frontend en `http://localhost:5173`
- Backend (Chatbot API) en `http://localhost:3001`

### Opción 2: Ejecutar por separado

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
npm run dev:server
```

## 📋 Requisitos

- Node.js 18+
- API Key de OpenAI (ya configurada en `.env`)

## 🎯 Temas que responde el chatbot

✅ **SÍ responde sobre:**
- Elecciones Generales Perú 2026
- Miembros de mesa (funciones, derechos, sanciones)
- Proceso de votación
- Candidatos presidenciales
- Calendario electoral
- Dónde votar
- ONPE, JNE, RENIEC

❌ **NO responde sobre:**
- Temas generales (cocina, deportes, tecnología)
- Otras elecciones
- Temas personales o de salud
- Cualquier cosa no relacionada con las elecciones

## 🔒 Seguridad

- La API key de OpenAI está en el archivo `.env` (NO SUBIR A GIT)
- El archivo `.env` ya está en `.gitignore`
- Las llamadas a OpenAI se hacen desde el backend (server.mjs)
- El frontend NUNCA tiene acceso directo a la API key

## 📁 Archivos creados

```
hackaton-el-comercio/
├── server.mjs                          # Servidor backend del chatbot
├── .env                                # API key (NO SUBIR A GIT)
├── src/
│   ├── services/
│   │   └── chatService.ts             # Servicio para comunicarse con el backend
│   ├── shared/components/
│   │   └── ChatBot.tsx                # Componente del chatbot flotante
│   └── styles/
│       └── chatbot.css                # Estilos del chatbot
```

## 🎨 Personalización

### Cambiar posición del botón flotante

Edita `src/styles/chatbot.css`:

```css
.chatbot__button {
  bottom: 2rem;  /* Distancia desde abajo */
  right: 2rem;   /* Distancia desde derecha */
}
```

### Ajustar el prompt del sistema

Edita `server.mjs` - línea 22, en el campo `content`.

### Cambiar colores

Edita `src/styles/chatbot.css` - los colores principales son:
- Azul: `#1e40af`
- Amarillo: `#fbbf24`

## 🐛 Troubleshooting

### Error: "No se pudo conectar con el servidor"

**Solución**: Asegúrate de que el servidor backend esté corriendo:
```bash
npm run dev:server
```

### Error: "API key inválida"

**Solución**: Verifica que el archivo `.env` contenga:
```env
VITE_OPENAI_API_KEY=tu-api-key-aqui
```

### El chatbot no aparece

**Solución**: 
1. Revisa la consola del navegador (F12)
2. Asegúrate de que `ChatBot` esté importado en `App.tsx`
3. Limpia la caché del navegador

## 💰 Costos

- **GPT-3.5-turbo**: ~$0.002 por 1K tokens
- Ejemplo: 100 conversaciones ≈ $0.20 USD
- Muy económico para desarrollo y pruebas

## 📞 Contacto

Si tienes problemas, revisa:
1. Que ambos servidores estén corriendo
2. Que el archivo `.env` exista y tenga la API key
3. La consola del navegador para errores

---

**Creado para**: Hackathon El Comercio - Elecciones 2026
**Tecnologías**: React, TypeScript, OpenAI GPT-3.5, Express, Node.js
