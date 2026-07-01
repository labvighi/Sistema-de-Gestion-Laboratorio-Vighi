# CLAUDE.md

Este archivo provee orientación a Claude Code (claude.ai/code) al trabajar con el código de este repositorio.

## Servidor de desarrollo

Correr la app localmente con el servidor HTTP de Python:

```
python -m http.server 3000 --directory Sistema
```

Luego abrir `http://localhost:3000` en el navegador. La raíz de la app es el subdirectorio `Sistema/` — todos los archivos HTML se sirven desde ahí.

Credenciales de prueba: `admin@susanavighi.com.ar` / `1234`

## Arquitectura

Esta es una **aplicación HTML de múltiples páginas, solo frontend** — sin build, sin bundler, sin Node.js. Cada funcionalidad principal es un archivo HTML separado con su correspondiente archivo JS. No hay backend aún; los datos están hardcodeados en objetos JS o persistidos en `localStorage`/`sessionStorage`. Todos los puntos de integración con base de datos están marcados con comentarios `// BDD` o `// TODO` en los archivos JS.

**Stack:** Vanilla JS (ES6+), jQuery 2.1.0, Bootstrap 3.3.7, Font Awesome 6.5.1.

### Correspondencia página/JS

Cada página HTML carga su propio archivo JS con el mismo nombre (ej.: `estudios.html` → `estudios.js`). El layout compartido se carga dinámicamente con jQuery `.load()`:

```js
$("#navbar-container").load("navbar.html");
$("#side-navbar-container").load("side-navbar.html");
```

### Navegación y ruteo

La navegación entre secciones usa links `<a href>` simples. Algunas páginas aceptan parámetros de URL para determinar qué flujo o entidad mostrar (ej.: `flujos.html?ida=14`). No hay router del lado del cliente.

### Autenticación

El login se maneja en `index.html` + `login.js`. Las credenciales se obtienen de `usuarios.json` (con fallbacks hardcodeados). Al ingresar, el objeto de usuario se guarda en `sessionStorage` bajo `usuarioLogueado` y en `localStorage` bajo `currentUser`. Roles: Administración, Citotécnico, Dirección, Externo, Gerencial, Patólogo, Técnico.

### Capa de datos

Todos los datos en tiempo de ejecución viven actualmente en objetos JS al principio del archivo JS de cada página (`FLUJOS_DATA`, `PROT_DATA`, etc.). Cuando se integre la base de datos, estos objetos serán reemplazados por llamadas a una API. El esquema SQL está en `Sistema/BDD/base.sql`.

### Convenciones de localStorage

Varias páginas persisten estado de UI (filtros, toggles, archivos subidos, ítems creados) en `localStorage` usando claves específicas de cada página. Revisar la sección superior del JS de cada página para ver qué persiste.
