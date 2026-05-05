# CLAUDE.md

Este archivo proporciona orientación a Claude Code (claude.ai/code) al trabajar con el código de este repositorio.

## Descripción del Proyecto

**Sistema de Gestión Integral de Laboratorio - Susana Vighi** — sistema web de gestión para un laboratorio de patología. Es una aplicación estática del lado del cliente (HTML/CSS/JS vanilla) sin paso de compilación.

## Ejecutar la Aplicación

```bash
python -m http.server 3000 --directory ./Sistema
```

Acceder en `http://localhost:3000`. No se requieren pasos de instalación ni compilación.

Credenciales de prueba (desde `usuarios.json`):
- `pruebamail@susanavighi.com.ar` / `Clave1234`
- `admin@example.com` / `admin`

## Arquitectura

### Stack
- **JS vanilla (ES6+)** — sin framework ni bundler
- **Bootstrap 3.3.7** + CSS personalizado para layout y componentes
- **jQuery 2.1.0** — usado únicamente para cargar componentes con `.load()`
- **localStorage / sessionStorage** — todo el estado de autenticación y usuario
- **Archivos JSON** (`usuarios.json`) — almacén de credenciales; sin backend activo

### Estructura de Páginas
Cada página es un archivo HTML independiente. La UI compartida (navbar, sidebar, footer) se carga dinámicamente:
```javascript
$(document).ready(function () {
    $("#navbar").load("navbar.html");
    $("#side-navbar").load("side-navbar.html");
    $("#footer").load("footer.html");
});
```

### Páginas Principales
| Archivo | Propósito |
|---------|-----------|
| `index.html` | Página de login (punto de entrada) |
| `prueba.html` | Dashboard (inicio post-login) |
| `crearUsuario.html` | Formulario de registro de usuario |
| `busqueda_medicos.html` | Directorio de médicos con filtro alfabético |
| `protocolo.html` | Vista de detalle de protocolo/caso |
| `navbar.html` | Componente compartido de navegación superior |
| `side-navbar.html` | Sidebar compartido con links del flujo de trabajo |

### Flujo de Autenticación
- `JS/login.js` obtiene `usuarios.json`, valida credenciales en el cliente
- Al autenticarse correctamente, guarda el objeto de usuario en `sessionStorage` y `localStorage`, luego redirige a `prueba.html` tras 800ms
- El logout limpia ambos tipos de storage
- `JS/registro.js` gestiona el registro de nuevos usuarios con persistencia en localStorage

### Roles de Usuario
`Administración`, `Citotécnico`, `Dirección`, `Externo`, `Gerencial`, `Patólogo`, `Técnico`

### Sedes
`Av. Santa Fe`, `CM Monserrat`, `CM Otamendi`, `Medrano`

### Convenciones de Estilos
- **Paleta de colores:** morado/magenta (`#3D0054`, `#72198d`, `#341255`)
- Las clases utilitarias personalizadas para espaciado/tamaño imitan las de Bootstrap 4+ (`.mt-*`, `.mb-*`, `.w-*`), pero el framework real es Bootstrap 3 — evitar mezclarlos
- Breakpoint móvil: `max-width: 768px` en `style_mobile.css`

### Base de Datos
`BDD/base.sql` contiene el esquema PostgreSQL (tabla `usuarios`) con una restricción enum en el campo `rol`. La aplicación actualmente funciona sin base de datos conectada — los datos de usuario viven en `usuarios.json` y localStorage.
