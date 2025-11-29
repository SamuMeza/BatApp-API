# Batman API Explorer

Una aplicación web interactiva para explorar el universo de Batman a través de la Batman API. Esta aplicación permite a los usuarios navegar por personajes, ubicaciones, conceptos e historias del universo de Batman.

## Características Principales

- **Interfaz de Usuario Moderna**: Diseño responsivo que funciona en dispositivos móviles y de escritorio.
- **Navegación por Secciones**: Explora diferentes categorías del universo de Batman.
- **Datos en Tiempo Real**: Obtiene información actualizada de la Batman API con respaldo de datos locales.
- **Diseño de Tarjetas Interactivas**: Visualización atractiva de la información con imágenes y detalles relevantes.
- **Manejo de Errores**: Experiencia de usuario mejorada con manejo de errores y estados de carga.

## Estructura del Proyecto

```
batiAppAPI/
├── src/
│   ├── css/
│   │   ├── main.css         # Estilos principales de la aplicación
│   │   └── desktop.css      # Estilos específicos para escritorio
│   │
│   ├── data/
│   │   └── localData.js     # Datos locales para respaldo
│   │
│   ├── js/
│   │   ├── app.js           # Punto de entrada de la aplicación
│   │   └── services/
│   │       └── peticion-API.js  # Servicio para llamadas a la API
│   │   └── ui/
│   │       ├── renderers.js     # Lógica de renderizado
│   │       └── templates.js     # Plantillas de componentes UI
│   │
├── index.html              # Página principal
└── README.md               # Este archivo
```

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica de la aplicación.
- **CSS3**: Estilos personalizados con variables CSS y diseño responsivo.
- **JavaScript (ES6+)**: Lógica de la aplicación.
- **Batman API**: Fuente de datos principal.
- **Git**: Control de versiones.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/batiAppAPI.git
   cd batiAppAPI
   ```

2. Abre el archivo `index.html` en tu navegador web preferido.

## Uso

1. Abre la aplicación en tu navegador.
2. Navega entre las diferentes secciones usando la barra de navegación superior.
3. Explora las tarjetas de cada categoría para ver detalles adicionales.
4. Si hay un error de conexión, la aplicación mostrará datos locales como respaldo.

## Estructura del Código

### `app.js`

Punto de entrada principal de la aplicación que maneja:
- Inicialización de la aplicación
- Configuración del estado global
- Integración con la API y datos locales

### `ui/renderers.js`

Contiene la lógica para renderizar los diferentes componentes de la interfaz de usuario:
- `renderApp`: Renderiza la aplicación completa
- `renderCurrentSection`: Renderiza la sección actual
- `renderLoader`: Muestra un indicador de carga
- `renderError`: Muestra mensajes de error

### `ui/templates.js`

Contiene las plantillas de los componentes de la interfaz de usuario:
- `createHeader`: Crea el encabezado de la aplicación
- `createNavigation`: Crea la barra de navegación
- `createCharacterCard`: Crea una tarjeta de personaje
- `createLocationCard`: Crea una tarjeta de ubicación
- `createConceptCard`: Crea una tarjeta de concepto
- `createStorylineCard`: Crea una tarjeta de historia

### `services/peticion-API.js`

Maneja las llamadas a la Batman API y el manejo de errores.

### `data/localData.js`

Contiene datos locales que se utilizan como respaldo cuando la API no está disponible.

## Diseño Responsivo

La aplicación utiliza un enfoque mobile-first con puntos de ruptura en:

- **Móvil (default)**: Estilos base sin media queries
- **Tablet (≥768px)**: Ajustes para pantallas medianas
- **Escritorio (≥1024px)**: Diseño optimizado para pantallas grandes

## Variables CSS

La aplicación utiliza variables CSS para mantener la consistencia en los estilos:

```css
:root {
  --color-dark: #1a1a1a;
  --color-charcoal: #2d3436;
  --color-amber: #ffc107;
  --color-white: #ffffff;
  --color-gray: #f5f5f5;
  --color-text: #333333;
  --color-text-light: #666666;
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --border-radius: 8px;
  --transition: all 0.3s ease;
}
```

## Manejo de Errores

La aplicación maneja los siguientes escenarios de error:
- Fallos en la conexión a la API
- Datos faltantes o inválidos
- Errores en la carga de imágenes

## Contribución

Las contribuciones son bienvenidas. Por favor, crea un issue para discutir los cambios propuestos antes de hacer un pull request.

## Créditos

- [Batman API](https://batman-api.com) - Por proporcionar los datos
- [Samuel Meza](https://github.com/tu-usuario) - Desarrollador

---

<div align="center">
  Hecho con ❤️ por Samuel Meza
</div>
