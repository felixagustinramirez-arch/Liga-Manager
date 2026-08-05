# Global Super-League — PWA para iPhone

## Qué se agregó
- `manifest.json`: nombre, icono y modo "standalone" (sin barra de Safari).
- `service-worker.js`: cachea la app para que funcione **sin conexión**.
- `icons/`: tu escudo en todos los tamaños que pide iOS.
- `index.html`: se agregaron las meta tags de Apple y el registro del service worker (tu código original no se tocó).

## Cómo publicarlo en GitHub Pages
1. Crea un repositorio nuevo en GitHub (puede ser público o privado con Pages habilitado en un plan de pago; si es gratis, debe ser público).
2. Sube estos 3 archivos y la carpeta `icons/` a la raíz del repo:
   - `index.html`
   - `manifest.json`
   - `service-worker.js`
   - `icons/` (con todos los .png)
3. Ve a **Settings → Pages** en el repo.
4. En "Source" elige la rama `main` y la carpeta `/ (root)`. Guarda.
5. En 1-2 minutos tu app estará en `https://TU-USUARIO.github.io/TU-REPO/`.

## Cómo instalarla en el iPhone
1. Abre esa URL en **Safari** (tiene que ser Safari, no Chrome).
2. Toca el botón de compartir (el cuadrado con la flecha hacia arriba).
3. Elige **"Añadir a pantalla de inicio"**.
4. Listo: aparece un icono con tu escudo y abre a pantalla completa, sin la barra de Safari.

## Importante sobre actualizaciones
Cada vez que subas cambios nuevos a `index.html`, sube también el número de versión en `service-worker.js`:

```js
const CACHE_VERSION = 'gsl-v2'; // súbelo aquí
```

Si no lo cambias, los usuarios que ya instalaron la app pueden seguir viendo la versión vieja en caché durante un tiempo.

## Sobre los datos
La app guarda todo en `localStorage`, que es **local a cada dispositivo/navegador**. Esto significa:
- Cada iPhone que instale la app tiene sus propios datos, no se sincronizan entre dispositivos.
- Si el usuario borra datos de Safari o desinstala la app, se pierde la información (a menos que uses "Exportar/Backup" si tu app ya lo tiene).
