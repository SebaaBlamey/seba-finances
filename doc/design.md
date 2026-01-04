# Diseño de la Aplicación - Registro de Gastos (Inspirado en Apple)

## Visión General
Aplicación web minimalista con diseño inspirado en el ecosistema Apple, priorizando la simplicidad, elegancia y atención al detalle. Uso generoso de espacio en blanco, tipografía refinada y animaciones sutiles pero fluidas.

## Filosofía de Diseño Apple
- **Minimalismo elegante:** Menos es más, cada elemento tiene un propósito
- **Jerarquía visual clara:** Uso de tamaño, peso y espacio para guiar al usuario
- **Microinteracciones pulidas:** Animaciones suaves y satisfactorias
- **Glassmorphism y profundidad:** Efectos de vidrio esmerilado y sombras sutiles
- **Esquinas redondeadas:** Border radius generosos (12-20px)
- **Espaciado generoso:** Breathing room entre elementos

## Paleta de Colores

### Modo Claro (Predeterminado)
- **Fondo principal:** #FBFBFD (gris casi blanco, cálido)
- **Fondo secundario:** #FFFFFF (blanco puro para cards)
- **Fondo terciario:** #F5F5F7 (gris muy claro para áreas sutiles)
- **Acento principal:** #007AFF (azul iOS)
- **Acento secundario:** #5856D6 (púrpura iOS)
- **Éxito/Ingresos:** #34C759 (verde iOS)
- **Advertencia/Gastos:** #FF3B30 (rojo iOS)
- **Texto primario:** #000000 (negro puro)
- **Texto secundario:** #86868B (gris medio)
- **Texto terciario:** #C7C7CC (gris claro)
- **Bordes:** #D1D1D6 (gris muy sutil)

### Modo Oscuro
- **Fondo principal:** #000000 (negro puro)
- **Fondo secundario:** #1C1C1E (gris oscuro elevado)
- **Fondo terciario:** #2C2C2E (gris medio oscuro)
- **Acento principal:** #0A84FF (azul más brillante)
- **Texto primario:** #FFFFFF
- **Texto secundario:** #98989D
- **Bordes:** #38383A

## Tipografía (Sistema SF Pro)

### Fuentes
```css
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif;
```

### Escala Tipográfica
- **Display Large:** 48px / 700 / -0.5px letter-spacing (títulos hero)
- **Display:** 36px / 700 / -0.3px (títulos principales)
- **Title 1:** 28px / 700 / -0.2px (títulos de sección)
- **Title 2:** 22px / 600 / -0.1px (subtítulos)
- **Title 3:** 20px / 600 / 0px (encabezados de card)
- **Body Large:** 17px / 400 / 0px (texto principal)
- **Body:** 15px / 400 / 0px (texto secundario)
- **Callout:** 16px / 600 / 0px (botones, labels importantes)
- **Caption:** 13px / 400 / 0px (metadata, timestamps)
- **Caption 2:** 11px / 400 / 0px (texto muy pequeño)

## Efectos Visuales

### Glassmorphism (Efecto Vidrio)
```css
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(40px) saturate(180%);
-webkit-backdrop-filter: blur(40px) saturate(180%);
border: 1px solid rgba(255, 255, 255, 0.3);
```

### Sombras (Sutiles y en capas)
```css
/* Elevación baja */
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 
            0 1px 4px rgba(0, 0, 0, 0.04);

/* Elevación media */
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04),
            0 2px 4px rgba(0, 0, 0, 0.03);

/* Elevación alta (modales) */
box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15),
            0 12px 24px -8px rgba(0, 0, 0, 0.1);
```

### Border Radius
- **Pequeño:** 8px (inputs, badges)
- **Medio:** 12px (botones, cards pequeños)
- **Grande:** 16px (cards principales)
- **Extra grande:** 24px (modales, secciones destacadas)

---

## Estructura de Páginas

### 1. Página de Login/Registro

**Layout:**
```
┌─────────────────────────────────────────────┐
│                                             │
│              [Logo/Icono]                   │
│                                             │
│            Gestiona tus                     │
│              Finanzas                       │
│                                             │
│         [Ilustración minimalista]           │
│                                             │
│    ┌─────────────────────────────┐         │
│    │  Correo electrónico         │         │
│    └─────────────────────────────┘         │
│                                             │
│    ┌─────────────────────────────┐         │
│    │  Contraseña                 │         │
│    └─────────────────────────────┘         │
│                                             │
│    [  Iniciar Sesión - Botón lleno  ]      │
│                                             │
│    [  Crear Cuenta - Botón outline  ]      │
│                                             │
│         ¿Olvidaste tu contraseña?          │
│                                             │
└─────────────────────────────────────────────┘
```

**Características:**
- Fondo con gradiente sutil (blanco a gris muy claro)
- Logo con efecto de vidrio o ícono SF Symbol estilizado
- Título Display (48px, bold, negro)
- Inputs con glassmorphism:
  - Height: 48px
  - Border radius: 12px
  - Background: rgba(255,255,255,0.8)
  - Border: 1px solid rgba(0,0,0,0.1)
  - Focus: ring azul iOS (#007AFF) con glow sutil
- Botón primario:
  - Background: #007AFF
  - Color: white
  - Height: 48px
  - Border radius: 12px
  - Font: 16px / 600
  - Hover: ligero darkening + scale(1.02)
  - Active: scale(0.98)
- Botón secundario:
  - Background: transparent
  - Border: 2px solid #007AFF
  - Color: #007AFF
- Animación de entrada: fade in + slide up suave

---

### 2. Dashboard Principal

**Layout Desktop:**
```
┌──────────────────────────────────────────────────────┐
│  [Logo]    Dashboard              [Avatar] ▾         │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Balance General                    [Enero 2025] ▾   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │   Ingresos   │  │    Gastos    │  │  Balance  │ │
│  │              │  │              │  │           │ │
│  │   $15,420    │  │   $8,230     │  │  $7,190   │ │
│  │   ↗ +12.5%   │  │   ↘ -5.2%    │  │           │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
│                                                      │
│  Movimientos Recientes                               │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                      │
│  [🔍 Buscar]  [Todos ▾]  [+ Nuevo Movimiento]       │
│                                                      │
│  ┌────────────────────────────────────────────────┐ │
│  │ 🍔 Almuerzo con cliente      -$45.00    Hoy    │ │
│  │ 💼 Pago freelance          +$1,200.00   Ayer   │ │
│  │ 🚕 Uber al aeropuerto         -$28.50   Ayer   │ │
│  │ 📱 Suscripción Spotify        -$9.99    15 Ene │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Características del Dashboard:**

#### Header (Altura: 72px)
- Background: glassmorphism blanco/transparente
- Sticky position con blur backdrop
- Logo a la izquierda (iconmark + wordmark)
- Avatar usuario con dropdown a la derecha
- Sombra sutil al hacer scroll

#### Cards de Resumen
- Background: white con sombra sutil
- Border radius: 16px
- Padding: 24px
- Grid: 3 columnas en desktop, stack en mobile
- Gap: 20px entre cards

**Card de Ingresos:**
- Icono: ↗ en círculo verde claro
- Título: "Ingresos" (15px, gris medio)
- Monto: "$15,420" (32px, bold, negro)
- Cambio: "+12.5%" (13px, verde, con flecha ↗)
- Borde izquierdo verde (#34C759, 3px)

**Card de Gastos:**
- Similar pero con rojo (#FF3B30)
- Icono: ↘ en círculo rojo claro

**Card de Balance:**
- Acento azul (#007AFF)
- Monto más grande (36px)
- Sin porcentaje de cambio

#### Selector de Mes
- Pills/Segmented control estilo iOS
- Background: #F5F5F7
- Selected: white con sombra
- Border radius: 10px
- Smooth transition

#### Lista de Transacciones
- Cards individuales con hover effect
- Background: white
- Border radius: 12px
- Padding: 16px
- Separación: 12px
- Hover: sutil elevación (transform: translateY(-2px))

**Cada Item:**
- Emoji de categoría (28px) a la izquierda
- Descripción (16px, bold, negro)
- Categoría badge debajo (12px, gris)
- Monto a la derecha (17px, bold)
  - Verde para ingresos: +$1,200.00
  - Rojo para gastos: -$45.00
- Fecha/timestamp (13px, gris claro)
- Iconos de acción al hover (edit/delete)

---

### 3. Modal para Agregar Transacción

**Diseño:**
```
┌─────────────────────────────────────┐
│                                     │
│  Nueva Transacción          [✕]     │
│  ─────────────────────────────────  │
│                                     │
│  ┌─────────────┬─────────────┐     │
│  │   Gasto     │   Ingreso   │     │
│  │  [activo]   │             │     │
│  └─────────────┴─────────────┘     │
│                                     │
│  Monto                              │
│  ┌───────────────────────────┐     │
│  │  $  1,234.56              │     │
│  └───────────────────────────┘     │
│                                     │
│  Descripción                        │
│  ┌───────────────────────────┐     │
│  │  Almuerzo con cliente     │     │
│  └───────────────────────────┘     │
│                                     │
│  Categoría                          │
│  ┌───────────────────────────┐     │
│  │  🍔 Alimentación      ▾   │     │
│  └───────────────────────────┘     │
│                                     │
│  Fecha                              │
│  ┌───────────────────────────┐     │
│  │  15 Enero 2025        📅  │     │
│  └───────────────────────────┘     │
│                                     │
│  [        Guardar         ]         │
│                                     │
└─────────────────────────────────────┘
```

**Características:**
- Modal centrado con backdrop blur oscuro
- Width: 440px (desktop)
- Background: white puro
- Border radius: 24px
- Padding: 32px
- Animación de entrada: scale(0.95) → scale(1) + fade
- Sombra dramática pero elegante

**Segmented Control (Tipo):**
- Height: 40px
- Background: #F5F5F7
- Selected: white con sombra interna
- Transition suave (300ms cubic-bezier)

**Inputs:**
- Height: 48px
- Border: 1px solid #D1D1D6
- Border radius: 10px
- Focus: border #007AFF + ring azul sutil
- Padding: 12px 16px
- Font size: 16px

**Botón Guardar:**
- Full width
- Height: 48px
- Background: gradiente azul (#007AFF → #0056CC)
- Color: white
- Border radius: 12px
- Font: 16px / 600
- Hover: brillo + elevación
- Active: scale down
- Disabled: opacity 0.5

---

### 4. Header/Navegación

**Desktop:**
- Height: 72px
- Background: glassmorphism
- Blur backdrop cuando hay scroll
- Max-width: 1200px centrado
- Padding horizontal: 32px

**Elementos:**
- Logo + nombre (izquierda)
- Nav links (centro) - opcional para futuro
- Search bar (centro-derecha) - opcional
- Avatar + dropdown (derecha)

**Avatar Dropdown:**
- Border radius: 50%
- Border: 2px solid white
- Box shadow sutil
- Dropdown con backdrop blur
- Border radius: 16px
- Padding: 8px
- Items con hover background

---

## Diseño Responsive

### Desktop (≥1024px)
- Max width: 1200px centrado
- Cards en grid de 3 columnas
- Sidebar opcional con navegación

### Tablet (768px - 1023px)
- Cards en grid de 2 columnas
- Balance card full width arriba

### Mobile (<768px)
- Stack vertical completo
- Header con logo pequeño + hamburger
- Cards apilados con padding reducido
- Botón flotante para agregar (fab):
  - Position: fixed bottom-right
  - Size: 56px × 56px
  - Border radius: 28px
  - Background: gradiente azul
  - Icon: + (blanco, 24px)
  - Shadow: flotante
  - Hover: scale(1.1)

---

## Animaciones y Transiciones

### Principios
- **Timing:** 300-500ms para UI, 150-200ms para feedback
- **Easing:** cubic-bezier(0.4, 0.0, 0.2, 1) (ease-out estándar)
- **Spring:** Para animaciones más naturales (react-spring)

### Micro-interacciones

**Botones:**
```css
transition: all 200ms cubic-bezier(0.4, 0.0, 0.2, 1);

:hover {
  transform: scale(1.02);
  box-shadow: /* sombra más pronunciada */;
}

:active {
  transform: scale(0.98);
}
```

**Cards:**
```css
transition: transform 300ms ease, box-shadow 300ms ease;

:hover {
  transform: translateY(-4px);
  box-shadow: /* elevación mayor */;
}
```

**Modals:**
- Entrada: fade in + scale(0.95 → 1)
- Salida: fade out + scale(1 → 0.95)
- Backdrop: fade in/out
- Duration: 300ms

**Lista items:**
- Stagger animation al cargar (cascade)
- Delay entre items: 50ms
- Smooth delete con slide out

---

## Iconografía

### Sistema SF Symbols (Estilo)
- Usar lucide-react con estilo redondeado
- Tamaños:
  - Small: 16px
  - Medium: 20px
  - Large: 24px
  - XLarge: 32px
- Stroke width: 2px (más grueso que default)
- Color: heredado del texto o acento

### Iconos por Categoría
- 🍔 Alimentación
- 🚗 Transporte
- 🎬 Entretenimiento
- 💡 Servicios
- 🏥 Salud
- 🛍️ Compras
- 💼 Trabajo/Freelance
- 📈 Inversiones

---

## Estados Especiales

### Loading
- Skeleton screens con shimmer effect
- Color: gradiente de gris muy claro
- Animation: shimmer de izquierda a derecha
- Border radius coincide con elemento final

### Empty State
- Ilustración SF Symbol grande (120px)
- Color: gris claro (#C7C7CC)
- Título: "No hay movimientos"
- Subtítulo: "Agrega tu primera transacción"
- Botón CTA destacado

### Error State
- Icono de alerta (⚠️) en rojo
- Mensaje claro y conciso
- Botón "Reintentar"
- No usar lenguaje técnico

---

## Accesibilidad (Apple Standards)

- **Contraste:** WCAG AAA (7:1 para texto normal)
- **Focus indicators:** Ring azul de 3px con blur
- **Touch targets:** Mínimo 44×44px
- **Reduce motion:** Respetar prefers-reduced-motion
- **Dark mode:** Automático según sistema
- **Screen readers:** Labels semánticos, ARIA cuando necesario
- **Keyboard navigation:** Tab order lógico, shortcuts

---

## Detalles de Implementación

### Tailwind Config Personalizado
```js
theme: {
  extend: {
    fontFamily: {
      sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', ...],
    },
    colors: {
      ios: {
        blue: '#007AFF',
        green: '#34C759',
        red: '#FF3B30',
        // ...
      },
    },
    borderRadius: {
      'ios': '10px',
      'ios-lg': '16px',
      'ios-xl': '24px',
    },
    boxShadow: {
      'ios': '0 4px 8px rgba(0, 0, 0, 0.04)',
      'ios-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    },
  },
}
```

### Framer Motion para Animaciones
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
>
  {/* Contenido */}
</motion.div>
```

---

## Referencias Visuales Apple

- **Diseño de Cards:** Apple Card app
- **Glassmorphism:** iOS Control Center
- **Tipografía:** apple.com, iOS Settings
- **Animaciones:** App Store transiciones
- **Color scheme:** iOS Human Interface Guidelines
- **Spacing:** Sistema de 8px (4, 8, 12, 16, 24, 32, 48, 64)
