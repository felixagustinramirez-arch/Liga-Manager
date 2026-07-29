# Liga KONAMI

App de gestión de torneo (Apertura, Clausura, Liguilla con Playoffs) hecha en React, pensada para llevar equipos, jugadores, calendario, mercado de fichajes, estadísticas y la fase final del torneo.

## Estructura del proyecto

El proyecto está dividido en tres archivos:

| Archivo | Contenido |
|---|---|
| `index.html` | Estructura HTML base: `<head>`, favicon, carga de React/ReactDOM desde CDN, y el `<div id="root">` donde se monta la app. Enlaza a `style.css` y `app.js`. |
| `style.css` | Todos los estilos de la app (utilidades tipo Tailwind hechas a mano, tarjetas, tablas, bracket de la Liguilla, etc.). |
| `app.js` | Toda la lógica de la app en React (sin JSX, usando `React.createElement`): estado, componentes, cálculo de tablas, calendario, mercado, Liguilla/playoffs con tanda de penales, estadísticas, etc. |

Antes estos tres bloques vivían juntos dentro de un único `index.html`. Se separaron para que sea más fácil de mantener, editar y versionar cada parte por separado.

## Cómo usarla

1. Descargá los tres archivos (`index.html`, `style.css`, `app.js`) **en la misma carpeta**, sin cambiarles el nombre.
2. Abrí `index.html` con el navegador (doble clic alcanza).
3. Necesitás conexión a internet la primera vez que la abrís, porque React y ReactDOM se cargan desde un CDN (`unpkg.com`). Una vez cargada, la app funciona sin backend: todo se guarda localmente en el navegador.

No requiere instalación, build ni servidor: es HTML/CSS/JS plano.

## Funcionalidades principales

- **Equipos y jugadores**: plantillas, dorsales, posiciones, valores de mercado, lesiones y sanciones.
- **Apertura y Clausura**: calendario, carga de resultados, tablas de posiciones con XI ideal por jornada.
- **Mercado de fichajes** entre equipos.
- **Liguilla (playoffs)**: cuartos, semifinal y final a ida y vuelta, con:
  - Desempate automático por gol de visitante.
  - **Tanda de penales tiro a tiro**: si la serie sigue empatada, se puede jugar la tanda eligiendo el jugador que patea de la plantilla de cada equipo y marcando gol o fallo. Respeta las reglas reales (5 tiros por equipo y muerte súbita si sigue el empate), corta sola apenas la serie queda definida, y muestra el detalle de quién convirtió y quién falló.
- **Rankings y estadísticas**: goleadores, asistencias, tarjetas, XI ideal del torneo, premios.
- Todos los datos se autoguardan (persistencia local en el navegador).

## Notas para editar el código

- `app.js` no usa JSX: todos los componentes están escritos con `React.createElement(...)`. Esto permite abrir el archivo directo en el navegador sin necesidad de compilar con Babel/Webpack.
- Si vas a modificar la lógica de la Liguilla o de la tanda de penales, buscá las funciones `ganadorSerie`, `serieRequierePenales`, `resultadoTandaPenales` y el componente `TandaPenales` en `app.js`.
- Los estilos siguen una convención parecida a utilidades de Tailwind (`flex`, `gap-2`, `text-center`, etc.) más algunas clases específicas de la app (`.card2`, `.bracket-*`, `.cronica-card`).
