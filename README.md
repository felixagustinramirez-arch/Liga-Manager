# Liga KONAMI

Una app web para gestionar, jugada a jugada, un torneo de fútbol amateur/simulado (tipo "PES 2017 casero" con amigos): equipos, plantillas, calendario, resultados, estadísticas, mercado de pases, finanzas del club y una fase final (Liguilla) con eliminación directa a ida y vuelta, incluyendo tanda de penales.

No es un videojuego: vos jugás los partidos afuera (consola, cancha, lo que sea) y acá **cargás el resultado y las estadísticas**. La app se encarga de las tablas, el calendario, las finanzas, los rankings y los cruces de la fase final.

---

## 1. Qué necesitás para usarla

- Un navegador (Chrome, Edge, Firefox, Safari…).
- Conexión a internet **la primera vez que la abrís** (carga React desde un CDN). Después de eso podés usarla sin conexión.
- Nada de instalación, servidor ni cuenta de usuario. Los tres archivos (`index.html`, `style.css`, `app.js`) tienen que estar juntos en la misma carpeta.

Para abrirla: descargá los archivos y hacé doble clic en `index.html`.

Todos los datos se guardan automáticamente en el propio navegador (localStorage), en este dispositivo. **No hay backend ni nube**: si cambiás de navegador, de computadora, o borrás los datos del sitio, perdés la información — por eso la app tiene una función de copia de seguridad (ver sección 9).

---

## 2. Estructura del proyecto

| Archivo | Qué contiene |
|---|---|
| `index.html` | Esqueleto HTML: `<head>`, favicon, carga de React/ReactDOM desde CDN, y el `<div id="root">` donde se monta toda la app. |
| `style.css` | Todos los estilos visuales (tarjetas, tablas, tabs, el bracket de la Liguilla, etc.). |
| `app.js` | Toda la lógica de la app en React (sin JSX, escrito con `React.createElement` para poder abrirse directo en el navegador sin compilar nada). |

---

## 3. El torneo: cómo está armado

- El torneo se divide en **tres fases**: **Apertura**, **Clausura** y **Liguilla** (playoffs).
- Apertura y Clausura son de todos contra todos: hasta 18 equipos, 34 jornadas, 9 partidos por jornada.
- Hay una **Tabla General** que suma Apertura + Clausura.
- Cada equipo puede tener hasta 32 jugadores en su plantilla.
- Cada tanto (jornadas 3, 7, 10, 14, 17, 21, 24, 27, 30 y 34) se reparte automáticamente un **bono económico** entre los equipos según su posición en la tabla de esa fase en ese momento (mejor posición = mayor bono, siempre un monto modesto para no desequilibrar el mercado).

### Clasificación a la Liguilla

Se clasifican 8 equipos:
- Los 2 primeros de la tabla de Apertura.
- Los 2 primeros de la tabla de Clausura.
- Los 4 mejores de la Tabla General que no hayan clasificado ya por lo anterior (si hay algún repetido, el cupo pasa automáticamente al siguiente de la tabla general, marcado con ⭐).

### Cruces de Cuartos de Final

Los cruces no son aleatorios, siguen una regla fija:
- Cuartos 1: 1° Clausura vs 4° General
- Cuartos 2: 1° Apertura vs 3° General
- Cuartos 3: 2° Clausura vs 2° General
- Cuartos 4: 2° Apertura vs 1° General

### Cómo se define cada serie (Cuartos, Semifinal y Final)

Cada cruce se juega a ida y vuelta. Para definir quién avanza, en este orden:
1. **Gol global**: suma de goles de ambos partidos.
2. Si hay empate en el global, **gol de visitante** (goles marcados por cada equipo jugando de visitante en la serie).
3. Si sigue el empate, se define por **tanda de penales**.

### Tanda de penales

Cuando una serie sigue empatada después del gol de visitante, la app habilita un panel de **tanda de penales tiro a tiro**:
- Tira el equipo que corresponde según el turno (el equipo A de la serie abre siempre).
- Elegís al jugador de la plantilla del equipo (o escribís el nombre a mano si no hay plantilla cargada) y marcás **⚽ Gol** o **✖ Falló**.
- Cada tiro queda visible como un círculo verde (gol) o rojo (falló) debajo de cada equipo, con el nombre del jugador al pasar el mouse.
- Se respetan las reglas reales: 5 tiros por equipo, corte automático apenas un equipo queda matemáticamente indefinible, y **muerte súbita** si sigue el empate después de los 5 tiros.
- Al definirse, muestra el marcador final ("gana Equipo X") y ese resultado alimenta automáticamente el marcador global y el bracket.
- Hay un botón para deshacer el último tiro por si te equivocás.

---

## 4. Pestañas de la app

La barra lateral tiene estas secciones:

| Pestaña | Para qué sirve |
|---|---|
| 🏠 **General** | Dashboard con los líderes del torneo (goleador, asistidor, MVP por score), estadísticas rápidas y accesos directos. |
| 📊 **Tabla** | Tablas de posiciones de Apertura, Clausura, General y la Liguilla (bracket + resultados). |
| 📅 **Calendario** | Fixture de cada fase, jornada por jornada, con carga y edición de resultados. |
| ⚔️ **Partidos** | Pantalla para "jugar" (cargar) un partido: alineaciones, goles, asistencias, tarjetas, cambios, MVP, lesiones. |
| 🏆 **Rankings** | Tablas de goleadores, asistencias, tarjetas, minutos, etc. |
| 📈 **Estadísticas** | Estadísticas agregadas de jugadores y equipos. |
| 🌟 **XI de la Jornada** | Armado manual/automático del mejor once de cada jornada. |
| 🏆 **XI Ideal del Torneo** | Mejor once acumulado del torneo (por período: Apertura, Clausura, Liguilla o completo). |
| 🏅 **Premios de Temporada** | Premios individuales de fin de temporada. |
| 🛒 **Mercado** | Fichajes entre equipos y finanzas del club. |
| 🔍 **Jugadores** | Buscador y filtro global de todos los jugadores del torneo. |
| 🛡️ **Sanciones** | Jugadores suspendidos (tarjetas) y lesionados, con sus jornadas restantes. |
| 👕 **Equipos** | Listado y ficha de cada equipo: plantilla, escudo, presupuesto. |
| 🧰 **Extras** | Copia de seguridad (exportar/importar) y opciones de reinicio. |

---

## 5. Equipos y jugadores

- Cada equipo tiene nombre, escudo (podés subir una imagen, se comprime automáticamente), presupuesto y su plantilla.
- Cada jugador tiene: nombre, dorsal, posición (13 posiciones distintas: PT, DEC, LI, LD, MCD, MC, MP, ID, II, EI, ED, SP, DC), valoración general (GRL), foto, y sus estadísticas acumuladas (goles, asistencias, tarjetas, minutos, MVPs, lesiones, sanciones).
- Los **dorsales 31 y 32** son "comodines": siempre usan una valoración fija (85), pensados para jugadores invitados o de relleno.
- Hay un **comparador de jugadores** cara a cara con las métricas principales.
- La pestaña 🔍 Jugadores permite buscar y filtrar entre todos los jugadores del torneo, sin importar el equipo.

---

## 6. Jugar un partido

Al cargar un partido (pestaña ⚔️ Partidos) se registra:
- **Alineaciones titulares** de ambos equipos (con formación).
- **Goles y asistencias**, con una etiqueta de tipo de gol (Cabeza, Penal, Tiro Libre, Jugada).
- **Tarjetas amarillas y rojas** (una segunda amarilla o una roja directa expulsa al jugador del partido).
- **Cambios** (sustituciones).
- **Score individual** de cada jugador que participó.
- **MVP del partido**.
- **Lesiones**, que dejan al jugador afuera un número de jornadas (con alta médica progresiva).

Al confirmar el partido:
- Se actualizan automáticamente las estadísticas de todos los jugadores involucrados.
- Se actualiza el presupuesto de ambos equipos según el resultado.
- Se genera una **crónica narrativa** breve y aleatoria del partido (estilo periodístico), y se puede descargar una **tarjeta de resultado en imagen (PNG)** con escudos, marcador, goleadores, tarjetas, cambios y MVP.
- Un partido ya guardado se puede **reiniciar**: esto deshace el marcador, las estadísticas de los jugadores implicados y el dinero ganado o perdido por el resultado.
- Hay un módulo de **Historial H2H** (cara a cara) que muestra el historial completo entre dos equipos (Apertura + Clausura + Liguilla): partidos jugados, victorias de cada uno, empates y goles totales.

---

## 7. Mercado de fichajes y finanzas

- El **mercado de fichajes** entre equipos se abre automáticamente al terminar por completo el Apertura o el Clausura, y se cierra en cuanto arranca la fase siguiente (Clausura o Liguilla).
- Cada equipo tiene un **presupuesto** (arranca en un monto base) que sube o baja según resultados de partidos, bonos de jornada y fichajes.
- Hay un **libro diario** por equipo: cada movimiento de caja (ingreso o egreso) queda registrado con su concepto, monto y saldo resultante, para que las finanzas sean 100% transparentes y trazables.
- La sub-pestaña 💰 Finanzas del Club permite elegir cualquier equipo y ver su desglose de ingresos y egresos.

---

## 8. Sanciones y lesiones

- La pestaña 🛡️ Sanciones lista los jugadores suspendidos por tarjetas y los lesionados, con las jornadas que les quedan de baja.
- Un jugador lesionado que no es convocado cumple automáticamente una jornada de baja cuando se juega el partido de su equipo (alta médica progresiva).
- También se puede dar de alta médica manualmente, restando una jornada de sanción.

---

## 9. Copia de seguridad y reinicio (pestaña 🧰 Extras)

- **Exportar copia (.json)**: descarga todos los datos del torneo (equipos, jugadores, calendario, resultados, fichajes) en un archivo. Se recomienda hacerlo cada tanto, porque los datos solo viven en este navegador/dispositivo.
- **Importar copia**: carga un archivo `.json` exportado previamente.
- **Reiniciar liga**: borra todos los partidos (jugados y por jugar) de Apertura, Clausura y Liguilla, deja el calendario en blanco, devuelve a cada equipo su presupuesto inicial y pone en cero las estadísticas de los jugadores. **Los equipos y jugadores (nombres, fotos, valoraciones, plantillas) no se borran.**
- **Borrar todo**: elimina absolutamente todo (equipos, jugadores, calendario, resultados y fichajes). No se puede deshacer.

---

## 10. Notas para quien vaya a editar el código

- `app.js` no usa JSX: todos los componentes están escritos con `React.createElement(...)`, para poder abrirse directo en el navegador sin Babel ni Webpack.
- Constantes clave están al principio del archivo: `POSICIONES`, `MAX_EQUIPOS`, `MAX_JUGADORES`, `JORNADAS_TOTAL`, `JORNADAS_BONO`, `PRESUPUESTO_BASE`, `FORMACIONES_XI`.
- La lógica de la Liguilla y la tanda de penales está en las funciones `ganadorSerie`, `serieRequierePenales`, `resultadoTandaPenales`, `turnoTandaPenales` y el componente `TandaPenales`.
- La lógica de finanzas está en `registrarMovimientoCaja`, `calcularBonoPorPosicion`, `bonoJornadaEquipos` y `aplicarEfectosPresupuesto`.
- Los efectos de un partido sobre las estadísticas de jugadores están en `aplicarEfectosJugadores` (y su reverso, `revertirEfectosJugadores`, usado al reiniciar un partido).
- Los estilos siguen una convención parecida a utilidades de Tailwind (`flex`, `gap-2`, `text-center`, etc.) más clases propias de la app (`.card2`, `.bracket-*`, `.cronica-card`, etc.).
- Los datos se persisten con `localStorage` bajo la clave `torneo-pes2017-html-v1`.
