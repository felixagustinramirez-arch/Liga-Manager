# Sincronización entre dispositivos (iPhone / Android / PC)

Ya no necesitas exportar e importar el .json a mano. La app ahora puede
guardar y traer tus datos automáticamente desde una base de datos en la
nube (Firebase, de Google — gratis para tu volumen de uso). Sigue estos
pasos una sola vez.

## 1. Crear el proyecto de Firebase
1. Entra a https://console.firebase.google.com/ con tu cuenta de Google.
2. Clic en **"Agregar proyecto"**. Nómbralo como quieras (ej. `liga-konami`).
3. Puedes desactivar Google Analytics, no lo necesitas. Crea el proyecto.

## 2. Activar el inicio de sesión con correo y contraseña
1. En el menú izquierdo: **Compilación → Authentication**.
2. Clic en **"Comenzar"** (Get started).
3. En la pestaña **"Sign-in method"**, elige **"Correo electrónico/contraseña"**
   y actívalo (el primer interruptor). Guarda.
4. Ve a la pestaña **"Users"** (Usuarios) → **"Agregar usuario"**.
   Escribe el correo y contraseña que vas a usar tú para entrar desde
   tus 3 dispositivos (puedes inventar cualquier correo, no necesita
   existir de verdad, solo debe tener formato de correo). **Anótalo**,
   lo vas a usar para iniciar sesión en la app.
5. Ve a **Authentication → Settings → Authorized domains** y agrega el
   dominio de tu GitHub Pages, por ejemplo `tu-usuario.github.io`
   (sin `https://` ni la ruta).

## 3. Crear la base de datos
1. En el menú izquierdo: **Compilación → Realtime Database**.
2. Clic en **"Crear base de datos"**. Elige la ubicación (cualquiera
   cercana a ti está bien) y arranca en **modo bloqueado (locked mode)**.
3. Ve a la pestaña **"Reglas"** (Rules) y reemplaza todo el contenido por
   esto, luego publica:

```json
{
  "rules": {
    "usuarios": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

Esto asegura que **solo tú** (una vez que inicias sesión) puedas leer o
escribir tus propios datos — nadie más, aunque encuentre la URL pública
de tu app en GitHub Pages.

## 4. Copiar la configuración a tu app
1. En el menú izquierdo, clic en el ícono de engranaje ⚙️ →
   **"Configuración del proyecto"**.
2. Baja hasta **"Tus apps"** → clic en el ícono **`</>`** (Web) para
   registrar una app web. Nómbrala como quieras, no marques "Hosting".
3. Te va a mostrar un bloque de código con `firebaseConfig = {...}`.
   Copia esos valores.
4. Abre tu `index.html` y busca esta sección (cerca del inicio):

```js
window.__FIREBASE_CONFIG__ = {
  apiKey: "PEGA_AQUI_TU_API_KEY",
  authDomain: "PEGA_AQUI_TU_AUTH_DOMAIN",
  databaseURL: "PEGA_AQUI_TU_DATABASE_URL",
  ...
};
```

5. Reemplaza cada valor `"PEGA_AQUI_..."` por el que te dio Firebase.
   Ojo: `databaseURL` no siempre aparece en ese bloque por defecto —
   si falta, ve a **Realtime Database** y copia la URL que aparece
   arriba de tus datos (algo como
   `https://liga-konami-xxxx-default-rtdb.firebaseio.com`).
6. Guarda el archivo y súbelo a tu repositorio de GitHub (reemplazando
   el anterior), junto con el resto de archivos si es la primera vez.

## 5. Usarlo
- Abre la app en cualquiera de tus dispositivos → aparece una pantalla
  de inicio de sesión → entra con el correo/contraseña que creaste en
  el paso 2.
- Desde ese momento, cada cambio que hagas se guarda automáticamente
  en la nube (con un pequeño retraso de medio segundo). Al abrir la app
  en otro dispositivo, trae automáticamente lo último que guardaste.
- Si cambias de dispositivo (ej. de tu PC a tu iPhone) y vuelves a la
  app sin cerrarla, también revisa la nube al recuperar el foco de
  pantalla, por si hiciste cambios en otro lado mientras tanto.
- Puedes ver el estado de sincronización (y cerrar sesión) en la
  pestaña **"Extras"** de la app.
- Si no quieres sincronizar (por ejemplo, para probar algo suelto),
  hay un botón **"Continuar solo en este dispositivo"** en la pantalla
  de login que usa solo el almacenamiento local, como antes.

## Notas
- Si no configuras `__FIREBASE_CONFIG__` (lo dejas con los valores
  `PEGA_AQUI_...`), la app detecta que no está configurado y funciona
  exactamente como antes, sin pantalla de login ni sincronización.
- El plan gratuito de Firebase (Spark) es más que suficiente para el
  tamaño de estos datos (equipos, jugadores, calendario): no vas a
  pagar nada.
- El .json de exportación/importación se mantiene disponible como
  respaldo adicional, por si quieres una copia fuera de la nube.
