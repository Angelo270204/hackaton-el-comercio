# Integración API de Noticias - El Comercio

## Estado Actual

Actualmente el componente `NoticiasElComercio.tsx` utiliza **datos mock** (simulados) para mostrar las noticias. Esto permite que la aplicación funcione sin depender de servicios externos.

## Integración con API Real

Para integrar noticias reales de El Comercio, sigue estos pasos:

### 1. Obtener API Key

Contacta con El Comercio para obtener acceso a su API de noticias:
- URL de contacto: https://elcomercio.pe/contacto/
- Solicitar acceso a API de noticias políticas/electorales

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_COMERCIO_API_KEY=tu_api_key_aqui
VITE_COMERCIO_API_URL=https://api.elcomercio.pe/v1/noticias
```

### 3. Actualizar el Componente

Reemplaza el `useEffect` en `NoticiasElComercio.tsx`:

```typescript
useEffect(() => {
  const fetchNoticias = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${import.meta.env.VITE_COMERCIO_API_URL}?categoria=politica&tag=elecciones&limit=4`,
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_COMERCIO_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Error al cargar noticias');
      }

      const data = await response.json();
      
      // Mapear respuesta de API al formato del componente
      const noticiasFormateadas: Noticia[] = data.articles.map((article: any) => ({
        id: article.id,
        titulo: article.title,
        descripcion: article.description || article.excerpt,
        imagen: article.image_url || '/images/banner/banner-hackaton.jpeg',
        fecha: article.published_at,
        url: article.url,
        categoria: article.category || 'Política'
      }));

      setNoticias(noticiasFormateadas);
    } catch (err) {
      setError('No se pudieron cargar las noticias. Intenta más tarde.');
      console.error('Error fetching noticias:', err);
      
      // Fallback a noticias mock en caso de error
      setNoticias(noticiasMock);
    } finally {
      setLoading(false);
    }
  };

  fetchNoticias();
}, []);
```

### 4. APIs Alternativas

Si no tienes acceso a la API de El Comercio, puedes usar:

#### News API (gratuita con límites)
```typescript
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const url = `https://newsapi.org/v2/everything?q=elecciones+peru&language=es&apiKey=${API_KEY}`;
```

#### MediaStack
```typescript
const API_KEY = import.meta.env.VITE_MEDIASTACK_API_KEY;
const url = `http://api.mediastack.com/v1/news?access_key=${API_KEY}&countries=pe&keywords=elecciones`;
```

### 5. Caché de Noticias

Para mejorar el rendimiento, implementa caché:

```typescript
const CACHE_KEY = 'noticias_cache';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutos

useEffect(() => {
  const fetchNoticias = async () => {
    // Verificar caché
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        setNoticias(data);
        setLoading(false);
        return;
      }
    }

    // Fetch de API...
    const noticiasFormateadas = /* ... */;
    
    // Guardar en caché
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: noticiasFormateadas,
      timestamp: Date.now()
    }));
    
    setNoticias(noticiasFormateadas);
  };

  fetchNoticias();
}, []);
```

### 6. Rate Limiting

Implementa rate limiting para evitar exceder límites de API:

```typescript
import { useCallback } from 'react';
import debounce from 'lodash/debounce';

const debouncedFetch = useCallback(
  debounce(async () => {
    // Fetch logic aquí
  }, 1000),
  []
);
```

## Seguridad

⚠️ **IMPORTANTE**: Nunca expongas tu API key en el código frontend. Usa variables de entorno y considera crear un backend proxy:

```
Frontend -> Tu Backend API -> El Comercio API
```

## Estructura de Datos Esperada

```typescript
interface NoticiaAPI {
  id: string | number;
  title: string;
  description?: string;
  excerpt?: string;
  image_url?: string;
  published_at: string;
  url: string;
  category?: string;
}
```

## Testing

Prueba con datos mock primero:

```bash
npm run dev
```

Verifica que las noticias se muestren correctamente antes de integrar la API real.