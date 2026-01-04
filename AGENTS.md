# AGENTS.md - Coding Guidelines for seba-finanzas

This document provides comprehensive guidelines for agentic coding assistants working on the seba-finanzas project. Follow these rules to maintain code quality, consistency, and architectural integrity.

## 🚀 Build/Lint/Test Commands

### Development
```bash
# Start development server
npm run dev
# or
bun dev

# Build for production
npm run build

# Start production server
npm start
```

### Code Quality
```bash
# Run ESLint (configured with Next.js rules)
npm run lint

# Type checking (via Next.js build)
npm run build
```

### Testing
**Note:** No test framework is currently configured. When adding tests:

```bash
# Single test file (when Jest/Vitest is added)
npm test -- path/to/file.test.ts

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## 🏗️ Architecture & Code Organization

### Clean Architecture Layers
Follow the established clean architecture pattern:

```
src/
├── core/           # Business logic (entities, use cases, types)
├── infrastructure/ # External dependencies (Supabase, services)
├── presentation/   # UI components, contexts, pages
└── app/           # Next.js app router
```

### File Naming Conventions
- **Components**: `PascalCase.tsx` (e.g., `Button.tsx`, `AuthContext.tsx`)
- **Hooks**: `useCamelCase.ts` (e.g., `useAuth.ts`)
- **Types/Interfaces**: `PascalCase.ts` (e.g., `User.ts`, `Result.ts`)
- **Use Cases**: `PascalCase.ts` (e.g., `LoginUser.ts`)
- **Repositories**: `PascalCase.ts` (e.g., `SupabaseAuthRepository.ts`)
- **CSS Modules**: `componentName.module.css`

## 🎨 Code Style Guidelines

### TypeScript Configuration
- **Strict mode**: Enabled - no implicit `any`, strict null checks
- **Path aliases**: Use `@/*` for imports (configured in `tsconfig.json`)
- **Target**: ES2017
- **JSX**: React JSX transform (`"jsx": "react-jsx"`)

### Import Organization
```typescript
// 1. React imports
import { useState, useEffect } from "react";

// 2. Third-party libraries
import { createClient } from "@supabase/supabase-js";

// 3. Internal imports (use path aliases)
import { User } from "@/core/entities/User";
import { LoginUserUseCase } from "@/core/use-cases/auth/LoginUser";
import Button from "@/presentation/components/common/Button";

// 4. Relative imports (only when necessary)
import styles from "./Component.module.css";
```

### Error Handling
Use the `Result<T, E>` type pattern for operations that can fail:

```typescript
// Good: Explicit error handling
const signIn = async (email: string, password: string): Promise<Result<void>> => {
  try {
    await loginUseCase.execute(email, password);
    return { success: true, data: undefined };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
};

// Usage
const result = await signIn(email, password);
if (!result.success) {
  console.error(result.error);
}
```

### React Patterns

#### Component Structure
```typescript
"use client";

import { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
```

#### Context Providers
```typescript
"use client";

import { createContext, useContext, ReactNode } from "react";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<Result<void>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Implementation...
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
```

### CSS Modules & Tailwind
- **Primary Styling**: Use Tailwind CSS utility classes for layout, spacing, and colors.
- **Components**: Use HeroUI (NextUI) components as the base.
- **Custom Styles**: Use CSS modules only when complex animations or specific styles cannot be achieved with Tailwind.

```tsx
// Example using Tailwind + HeroUI
<Card className="bg-surface-container-high rounded-[28px] shadow-md">
  <div className="p-6 flex flex-col gap-4">
    <h2 className="text-headline-small text-on-surface">Title</h2>
  </div>
</Card>
```

## 🎨 Design System (Material Design 3 - Expressive)

### Color Palette (M3 Tokens)
We use Material Design 3 tokens mapped to Tailwind colors.

```css
/* Light Mode */
--primary: #...;
--on-primary: #...;
--primary-container: #...;
--on-primary-container: #...;
--surface: #...;
--on-surface: #...;
--surface-container-low: #...;
--surface-container: #...;
--surface-container-high: #...;

/* Dark Mode */
/* ... corresponding dark tokens ... */
```

### Typography (M3 Scale)
We follow the Material Design 3 type scale.

- **Display**: Large, expressive text (e.g., `text-display-large`, `text-display-medium`)
- **Headline**: Section headings (e.g., `text-headline-small`)
- **Title**: Component titles (e.g., `text-title-medium`)
- **Body**: Long-form text (e.g., `text-body-large`)
- **Label**: UI labels and buttons (e.g., `text-label-large`)

### Spacing & Radius
- **Spacing**: 4px grid (Tailwind default).
- **Border Radius**:
  - **Extra Small**: 4px
  - **Small**: 8px (Inputs, small interactive elements)
  - **Medium**: 12px (Cards inside containers)
  - **Large**: 16px (Standard Cards)
  - **Extra Large**: 28px (Modals, Large Cards, FABs)
  - **Full**: 9999px (Buttons, Chips)

### Elevation & Shadows
Use M3 elevation levels via Tailwind classes or custom shadows defined in `tailwind.config.js`.

## 🔧 Development Workflow

### Git Workflow
- Use conventional commits when committing
- Feature branches for new work
- Pull requests for code review

### Code Review Checklist
- [ ] TypeScript strict mode compliance
- [ ] ESLint passing
- [ ] Clean architecture layers respected
- [ ] Proper error handling with Result<T, E>
- [ ] Design system colors and spacing used
- [ ] Responsive design considerations
- [ ] Accessibility standards met

### Testing Strategy (When Implemented)
- Unit tests for use cases and utilities
- Integration tests for repositories
- Component tests for UI elements
- E2E tests for critical user flows

## 🚫 Prohibited Patterns

### Don't:
- Use `any` type (strict mode violation)
- Import from relative paths outside immediate directory
- Mix business logic with UI components
- Use inline styles (except for dynamic values)
- Bypass the Result<T, E> error handling pattern
- Use `console.log` in production code
- Create components without TypeScript interfaces
- Use magic numbers (use design tokens)

### Do:
- Always use path aliases (`@/*`)
- Follow the established folder structure
- Use CSS modules for styling
- Handle errors consistently
- Write self-documenting code
- Use semantic HTML elements
- Follow accessibility guidelines

## 🛠️ Tool-Specific Guidelines

### ESLint
- Configured with Next.js rules
- Includes TypeScript checking
- Run before commits

### TypeScript
- Strict mode enabled
- No implicit returns
- Explicit type annotations for function parameters

### Next.js
- App Router (not Pages Router)
- Server Components by default
- Client Components marked with `"use client"`
- API routes in `app/api/` (when needed)

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

---

**Remember:** This codebase follows clean architecture principles with an Apple-inspired design system. Maintain separation of concerns, use TypeScript strictly, and follow the established patterns for consistent, maintainable code.</content>
<parameter name="filePath">AGENTS.md