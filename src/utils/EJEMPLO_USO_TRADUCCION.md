# Ejemplo de Uso del Sistema de Traducción

## Uso del componente Translate

```tsx
import { Translate } from '../shared/components/Translate';

// Uso básico
<Translate text="home.title" />

// Con elemento personalizado
<Translate text="navbar.home" as="h1" className="mi-clase" />
```

## Uso del hook useLanguage

```tsx
import { useLanguage } from '../contexts/LanguageContext';

function MiComponente() {
  const { t, currentLanguage } = useLanguage();

  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>Idioma actual: {currentLanguage}</p>
    </div>
  );
}
```

## Agregar nuevas traducciones

Edita `src/utils/traducciones.ts` y agrega las claves en ambos idiomas (es y qu).

