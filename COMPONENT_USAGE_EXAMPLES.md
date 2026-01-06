# Phase 1 - Component Usage Examples

## 🎨 Design Tokens Usage

### Typography
```tsx
// Headlines
<h1 className="text-headline-large">Main Page Title</h1>
<h2 className="text-headline-medium">Section Title</h2>
<h3 className="text-headline-small">Subsection Title</h3>

// Titles
<h4 className="text-title-large">Card Title</h4>
<h5 className="text-title-medium">Component Title</h5>
<h6 className="text-title-small">Small Title</h6>

// Body Text
<p className="text-body-large">Main content text</p>
<p className="text-body-medium">Secondary content</p>
<p className="text-body-small">Caption or helper text</p>

// Labels (for buttons, inputs, etc.)
<span className="text-label-large">Button Text</span>
<span className="text-label-medium">Input Label</span>
<span className="text-label-small">Small Label</span>

// Display (for hero sections)
<h1 className="text-display-large">Hero Title</h1>
<h2 className="text-display-medium">Large Display</h2>
<h3 className="text-display-small">Small Display</h3>
```

### Colors
```tsx
// Primary Colors
<div className="bg-primary text-on-primary">Primary Surface</div>
<div className="bg-primary-container text-on-primary-container">Primary Container</div>

// Surface Colors
<div className="bg-surface text-on-surface">Base Surface</div>
<div className="bg-surface-container-low">Light Background</div>
<div className="bg-surface-container">Default Container</div>
<div className="bg-surface-container-high">Elevated Container</div>

// Semantic Colors
<div className="bg-success text-on-success-container">Success Message</div>
<div className="bg-error text-on-error-container">Error Message</div>

// Text Colors
<p className="text-on-surface">Primary Text</p>
<p className="text-on-surface-variant">Secondary Text</p>

// Borders
<div className="border border-outline">Default Border</div>
<div className="border border-outline-variant">Light Border</div>
```

### Border Radius
```tsx
// Extra Small (4px) - Subtle rounding
<div className="rounded-xs">Subtle corners</div>

// Small (8px) - Inputs, small interactive elements
<input className="rounded-sm" />
<button className="rounded-sm">Small Button</button>

// Medium (12px) - Cards inside containers
<div className="rounded-md bg-surface-container">
  Inner Card
</div>

// Large (16px) - Standard Cards
<div className="rounded-lg bg-surface-container-high">
  Standard Card
</div>

// Extra Large (28px) - Modals, Large Cards, FABs
<div className="rounded-xl bg-surface shadow-lg">
  Modal or Large Card
</div>

// Full (9999px) - Pills, Buttons, Chips
<button className="rounded-full px-6 py-3">
  Pill Button
</button>
```

---

## 🏗️ Layout Components

### DashboardLayout
```tsx
import DashboardLayout from "@/presentation/components/layout/DashboardLayout";

export default function MyPage() {
  return (
    <DashboardLayout className="custom-class">
      <div>Your page content here</div>
    </DashboardLayout>
  );
}
```

**Props:**
- `children: ReactNode` - Page content
- `className?: string` - Additional CSS classes for main content

**Features:**
- Automatic sidebar and header
- Skip link for accessibility
- Responsive layout
- Auth protection (when wrapped in layout.tsx)

---

### Sidebar
```tsx
import Sidebar from "@/presentation/components/layout/Sidebar";

// Basic usage (auto-detects active route)
<Sidebar />

// With custom props
<Sidebar
  activeRoute="/dashboard"
  user={{ name: "Seba", avatar: "/avatar.jpg" }}
  onNavigate={(route) => console.log("Navigating to:", route)}
  className="custom-sidebar"
/>
```

**Props:**
- `activeRoute?: string` - Override active route detection
- `user?: { name: string; avatar?: string }` - User info for bottom section
- `onNavigate?: (route: string) => void` - Navigation callback
- `className?: string` - Additional CSS classes

**Navigation Items (editable in component):**
```tsx
const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard /> },
  { id: 'transactions', label: 'Transacciones', href: '/dashboard/transactions', icon: <Receipt /> },
  { id: 'categories', label: 'Categorías', href: '/dashboard/categories', icon: <FolderKanban /> },
  { id: 'settings', label: 'Configuración', href: '/dashboard/settings', icon: <Settings /> },
];
```

---

### Header
```tsx
import Header from "@/presentation/components/layout/Header";

// Basic usage (with defaults)
<Header />

// With custom props
<Header
  pageTitle="Mi Dashboard"
  subtitle="Bienvenido de vuelta"
  notificationCount={5}
  onNotificationClick={() => console.log("Notifications clicked")}
  onThemeToggle={() => console.log("Theme toggled")}
  currentTheme="light"
  user={{ name: "Seba", avatar: "/avatar.jpg" }}
  className="custom-header"
/>
```

**Props:**
- `pageTitle?: string` - Main title (default: "Finanzas de Seba")
- `subtitle?: string` - Subtitle text (default: "Aquí tienes tu resumen financiero de hoy")
- `notificationCount?: number` - Badge count (default: 3, 0 = hidden)
- `onNotificationClick?: () => void` - Notification button callback
- `onThemeToggle?: () => void` - Theme toggle callback (auto-detects if not provided)
- `currentTheme?: 'light' | 'dark'` - Force theme (auto-detects if not provided)
- `user?: { name: string; avatar?: string }` - User info (fallback to AuthContext)
- `className?: string` - Additional CSS classes

---

## 🎯 Common Patterns

### Card with M3 Styling
```tsx
import { Card, CardBody } from "@heroui/react";

<Card className="bg-surface-container-high rounded-lg shadow-sm">
  <CardBody className="p-6">
    <h3 className="text-title-medium text-on-surface mb-2">Card Title</h3>
    <p className="text-body-medium text-on-surface-variant">
      Card content goes here
    </p>
  </CardBody>
</Card>
```

### Button with M3 Styling
```tsx
import { Button } from "@heroui/react";
import { Plus } from "lucide-react";

// Primary Button
<Button
  className="bg-primary text-on-primary"
  radius="full"
  startContent={<Plus size={20} />}
>
  Add New
</Button>

// Secondary Button
<Button
  variant="light"
  className="text-primary"
  radius="full"
>
  Cancel
</Button>

// Icon-only Button
<Button
  isIconOnly
  variant="light"
  radius="full"
  aria-label="Settings"
>
  <Settings size={20} />
</Button>
```

### Stats Card Pattern
```tsx
import { Card, CardBody } from "@heroui/react";
import { TrendingUp } from "lucide-react";

<Card className="bg-surface-container-high rounded-lg shadow-sm">
  <CardBody className="p-6">
    <div className="flex items-center gap-4 mb-4">
      <div className="bg-success-container p-3 rounded-full text-on-success-container">
        <TrendingUp size={24} />
      </div>
      <span className="text-title-medium text-on-surface-variant">
        Total Income
      </span>
    </div>
    <div className="text-headline-medium text-on-surface">
      $1,234.56
    </div>
    <div className="mt-2 flex items-center gap-2">
      <span className="bg-success/10 text-success px-2 py-1 rounded-md text-label-medium">
        +12.5%
      </span>
      <span className="text-body-small text-on-surface-variant">
        vs last month
      </span>
    </div>
  </CardBody>
</Card>
```

### Grid Layout
```tsx
// 3-column grid (responsive)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</div>

// 2-column grid with sidebar
<div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
  <aside>Sidebar</aside>
  <main>Main Content</main>
</div>
```

---

## 🔍 Page Layout Examples

### Basic Dashboard Page
```tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Finanzas de Seba",
  description: "Dashboard principal",
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-headline-large text-on-surface">
          Dashboard
        </h1>
        <p className="text-body-large text-on-surface-variant mt-2">
          Welcome back, Seba!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      </div>

      <div className="bg-surface-container-high rounded-lg p-6">
      </div>
    </div>
  );
}
```

### Page with Loading State
```tsx
"use client";

import { Spinner } from "@heroui/react";
import { useState, useEffect } from "react";

export default function DataPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
    </div>
  );
}
```

---

## 🎨 Responsive Utilities

### Show/Hide at Breakpoints
```tsx
// Hide on mobile, show on desktop
<div className="hidden lg:block">Desktop Only</div>

// Show on mobile, hide on desktop
<div className="block lg:hidden">Mobile Only</div>

// Show on tablet and up
<div className="hidden md:block">Tablet & Desktop</div>
```

### Responsive Sizing
```tsx
// Responsive padding
<div className="p-4 md:p-6 lg:p-8">Content</div>

// Responsive text size
<h1 className="text-headline-medium lg:text-headline-large">
  Responsive Title
</h1>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
</div>
```

---

## ♿ Accessibility Best Practices

### ARIA Labels
```tsx
// Icon buttons MUST have aria-label
<Button isIconOnly aria-label="Open notifications">
  <Bell />
</Button>

<nav aria-label="Main navigation">
</nav>
```

### Focus Management
```tsx
// Ensure focus is visible
<button className="focus-visible:ring-2 ring-primary ring-offset-2">
  Focusable Button
</button>

// Skip links for keyboard users
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
>
  Skip to main content
</a>
```

### Semantic HTML
```tsx
// Use semantic elements
<header>Header content</header>
<nav>Navigation</nav>
<main>Main content</main>
<aside>Sidebar content</aside>
<footer>Footer content</footer>

// Use proper headings hierarchy
<h1>Page Title</h1>
  <h2>Section Title</h2>
    <h3>Subsection Title</h3>
```

---

## 🚀 Next Steps

Ready to implement Phase 2? Check the stats cards requirements in the ui-ux-expert documentation.

**Phase 2 Components:**
- Balance Total Card (Hero Card with CTA)
- Income Stats Card (with trend indicator)
- Expenses Stats Card (with trend indicator)

**Need Help?**
- Review `PHASE_1_COMPLETE.md` for detailed specs
- Check `tailwind.config.js` for available tokens
- Inspect existing components for patterns
