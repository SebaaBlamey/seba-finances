# Diseño de la Aplicación - Registro de Gastos (Material Design 3)

## Visión General
Aplicación web moderna y expresiva basada en **Material Design 3 (Material You)**. El diseño prioriza la personalización, la accesibilidad y una experiencia de usuario dinámica mediante el uso de color, tipografía y movimiento. Se busca una interfaz que se sienta viva y adaptable.

## Filosofía de Diseño (Material You)
- **Personalización y Color:** Uso del sistema de color dinámico de Material 3, donde los colores se derivan de una paleta base y se adaptan al modo claro/oscuro con armonía.
- **Expresividad:** Uso de formas orgánicas, esquinas redondeadas generosas y tipografía con personalidad.
- **Movimiento Significativo:** Animaciones fluidas que guían al usuario y comunican cambios de estado.
- **Accesibilidad:** Contraste adecuado, áreas táctiles grandes y jerarquía visual clara.
- **Elevación y Profundidad:** Uso de tonos de superficie y sombras sutiles para indicar jerarquía, en lugar de solo sombras.

## Paleta de Colores (Sistema Tonal)

La paleta se basa en roles semánticos. Los valores hexadecimales son ejemplos de un tema base "Azul/Violeta", pero el sistema está diseñado para ser flexible.

### Roles Principales
- **Primary:** #6750A4 (Acciones principales, FABs, estados activos)
- **On Primary:** #FFFFFF (Texto/iconos sobre Primary)
- **Primary Container:** #EADDFF (Fondos de elementos destacados menos prominentes)
- **On Primary Container:** #21005D (Texto sobre Primary Container)

### Roles Secundarios
- **Secondary:** #625B71 (Elementos de menor jerarquía)
- **On Secondary:** #FFFFFF
- **Secondary Container:** #E8DEF8
- **On Secondary Container:** #1D192B

### Roles Terciarios (Acentos de color)
- **Tertiary:** #7D5260 (Para contrastar y equilibrar)
- **On Tertiary:** #FFFFFF
- **Tertiary Container:** #FFD8E4
- **On Tertiary Container:** #31111D

### Superficies y Fondo
- **Background:** #FFFBFE (Fondo general de la app)
- **On Background:** #1C1B1F (Texto principal)
- **Surface:** #FFFBFE (Superficie de cards, sheets)
- **On Surface:** #1C1B1F
- **Surface Variant:** #E7E0EC (Bordes, divisores, elementos inactivos)
- **On Surface Variant:** #49454F (Texto secundario, iconos inactivos)

### Semánticos (Error, Éxito - Custom)
- **Error:** #B3261E
- **On Error:** #FFFFFF
- **Error Container:** #F9DEDC
- **On Error Container:** #410E0B
- **Success (Custom):** #2E7D32 (Para ingresos)
- **Success Container:** #B7F397

## Tipografía (Roboto / Google Sans)

Se utiliza la escala tipográfica de Material 3.

- **Display Large:** 57px / 64px / -0.25px (Números grandes, intros)
- **Display Medium:** 45px / 52px / 0px
- **Headline Large:** 32px / 40px / 0px (Títulos de página)
- **Headline Medium:** 28px / 36px / 0px (Subtítulos de sección)
- **Headline Small:** 24px / 32px / 0px
- **Title Large:** 22px / 28px / 0px (Títulos de cards)
- **Title Medium:** 16px / 24px / 0.15px
- **Title Small:** 14px / 20px / 0.1px
- **Label Large:** 14px / 20px / 0.1px (Botones)
- **Body Large:** 16px / 24px / 0.5px (Texto principal)
- **Body Medium:** 14px / 20px / 0.25px (Texto secundario)

## Formas y Esquinas (Shape System)

- **Extra Small (4px):** Tags pequeños, tooltips.
- **Small (8px):** Botones rectangulares, text fields, snackbars.
- **Medium (12px):** Cards pequeñas.
- **Large (16px):** Cards principales, diálogos pequeños.
- **Extra Large (28px):** FABs, diálogos grandes, bottom sheets.
- **Full (9999px):** Botones tipo "pill", badges, sliders.

## Componentes Clave

### 1. Botones (M3)
- **Filled Button (Primary):** Fondo Primary, texto On Primary. Sin sombra en reposo, sombra en hover/focus. Shape: Full (Pill).
- **Tonal Button (Secondary):** Fondo Secondary Container, texto On Secondary Container.
- **Outlined Button:** Borde Outline, texto Primary.
- **Text Button:** Texto Primary, sin borde ni fondo (hasta hover).
- **FAB (Floating Action Button):** Cuadrado con esquinas muy redondeadas (no círculo perfecto en M3). Primary Container o Primary.

### 2. Cards (M3)
- **Elevated Card:** Surface color + Sombra suave (Elevation 1).
- **Filled Card:** Surface Variant color (sin sombra, contraste por color).
- **Outlined Card:** Surface color + Borde Outline (1px).
- **Interacción:** State layer (overlay de color) en hover/press.

### 3. Campos de Texto (TextFields)
- **Filled TextField:** Fondo Surface Variant (con opacidad), línea inferior indicador activo. Esquinas superiores redondeadas.
- **Outlined TextField:** Borde completo Outline. Esquinas redondeadas (4px).

### 4. Navegación
- **Navigation Bar (Bottom):** Altura 80px. Indicador de selección en forma de píldora (Pill) alrededor del icono activo.
- **Navigation Rail (Lateral):** Para tablet/desktop.

## Estructura de Páginas

### Dashboard
- **Top App Bar:** Título "Resumen" alineado a la izquierda o centro. Icono de menú o perfil a la derecha. Scroll behavior: pinned o hide-on-scroll.
- **Hero Section (Balance):** Card grande (Filled o Elevated) mostrando el balance total. Tipografía Display Medium.
- **Gráficos:** Cards con esquinas redondeadas (Large/XL). Colores del tema para las series de datos.
- **Lista de Transacciones:** Estilo lista limpia. Iconos con fondo circular (o cuadrado redondeado). Textos con jerarquía clara (Body Large para concepto, Body Medium para fecha).

### Modal / Dialogs
- **Basic Dialog:** Fondo Surface Container High. Esquinas Extra Large (28px). Título Headline Small. Botones de acción (Text Buttons) a la derecha.
- **Full Screen Dialog:** Para crear transacción en móvil. Transición desde abajo.

## Animaciones (Motion System)

- **Easing:** `Standard` (cubic-bezier(0.2, 0.0, 0, 1.0)) para la mayoría de movimientos. `Emphasized` para elementos destacados.
- **Duración:**
  - Corta: 200ms (iconos, selecciones)
  - Media: 400ms (expansión de cards, diálogos)
  - Larga: 600ms+ (transiciones de pantalla completa)
- **Container Transform:** Transición suave de un elemento (ej. FAB o lista) a una página de detalle o modal.
- **Shared Axis:** Para navegación entre páginas (eje X, Y o Z).

## Iconografía
- **Material Symbols (Rounded o Sharp):** Preferiblemente la variante Rounded para coincidir con el estilo M3.
- **Fill:** Rellenos para estados activos, contornos para inactivos.

## Implementación Técnica (Tailwind)

Se extenderá la configuración de Tailwind para incluir los tokens de color y tipografía de Material 3.

```javascript
// tailwind.config.js (ejemplo conceptual)
theme: {
  colors: {
    primary: '#6750A4',
    'on-primary': '#FFFFFF',
    'primary-container': '#EADDFF',
    // ... resto de la paleta
  },
  fontFamily: {
    sans: ['Roboto', 'sans-serif'],
  },
  borderRadius: {
    'xl': '28px', // M3 Extra Large
    'pill': '9999px',
  }
}
```
