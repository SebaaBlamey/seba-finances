# Plan de Acción - Desarrollo de Aplicación

## Fase 0: Preparación del Entorno (1-2 horas)

### Setup Inicial
- [x] Crear cuenta en Supabase (supabase.com)
- [ ] Crear cuenta en Vercel (vercel.com)
- [x] Instalar Node.js (versión 18 o superior)
- [x] Configurar Git y GitHub

### Crear Proyecto Next.js
```bash
npx create-next-app@latest expense-tracker
# Seleccionar: TypeScript: Yes, Tailwind: Yes, App Router: Yes
cd expense-tracker
```

### Instalar Dependencias Necesarias
```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install lucide-react  # para iconos
npm install date-fns      # para manejo de fechas
npm install zod           # para validación de schemas
```

---

## Estructura de Archivos (Clean Architecture)

```
expense-tracker/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Grupo de rutas de autenticación
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/              # Grupo de rutas protegidas
│   │   │   ├── layout.tsx
│   │   │   └── dashboard/
│   │   │       └── page.tsx
│   │   ├── api/                      # API Routes (opcional)
│   │   │   └── transactions/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   │
│   ├── core/                         # CAPA DE DOMINIO
│   │   ├── entities/                 # Entidades del dominio
│   │   │   ├── Transaction.ts
│   │   │   ├── User.ts
│   │   │   └── Category.ts
│   │   ├── repositories/             # Interfaces de repositorios
│   │   │   ├── ITransactionRepository.ts
│   │   │   └── IAuthRepository.ts
│   │   └── use-cases/                # Casos de uso (lógica de negocio)
│   │       ├── transactions/
│   │       │   ├── CreateTransaction.ts
│   │       │   ├── GetTransactions.ts
│   │       │   ├── UpdateTransaction.ts
│   │       │   ├── DeleteTransaction.ts
│   │       │   └── GetMonthSummary.ts
│   │       └── auth/
│   │           ├── LoginUser.ts
│   │           ├── RegisterUser.ts
│   │           └── LogoutUser.ts
│   │
│   ├── infrastructure/               # CAPA DE INFRAESTRUCTURA
│   │   ├── repositories/             # Implementaciones de repositorios
│   │   │   ├── SupabaseTransactionRepository.ts
│   │   │   └── SupabaseAuthRepository.ts
│   │   ├── services/                 # Servicios externos
│   │   │   └── supabase/
│   │   │       ├── client.ts
│   │   │       └── server.ts
│   │   └── config/                   # Configuraciones
│   │       └── constants.ts
│   │
│   ├── presentation/                 # CAPA DE PRESENTACIÓN
│   │   ├── components/               # Componentes de UI
│   │   │   ├── common/               # Componentes reutilizables
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── LoadingSpinner.tsx
│   │   │   │   └── Toast.tsx
│   │   │   ├── layout/               # Componentes de layout
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── transactions/         # Componentes específicos
│   │   │   │   ├── TransactionList.tsx
│   │   │   │   ├── TransactionItem.tsx
│   │   │   │   ├── TransactionForm.tsx
│   │   │   │   └── TransactionFilters.tsx
│   │   │   └── dashboard/
│   │   │       ├── SummaryCard.tsx
│   │   │       ├── MonthSelector.tsx
│   │   │       └── EmptyState.tsx
│   │   ├── hooks/                    # Custom hooks
│   │   │   ├── useTransactions.ts
│   │   │   ├── useAuth.ts
│   │   │   ├── useMonthSummary.ts
│   │   │   └── useToast.ts
│   │   ├── contexts/                 # React Contexts
│   │   │   ├── AuthContext.tsx
│   │   │   └── ToastContext.tsx
│   │   └── schemas/                  # Schemas de validación (Zod)
│   │       └── transactionSchema.ts
│   │
│   └── lib/                          # Utilidades compartidas
│       ├── utils.ts                  # Funciones helper
│       ├── formatters.ts             # Formateo de datos
│       └── validators.ts             # Validaciones genéricas
│
├── public/                           # Archivos estáticos
├── .env.local                        # Variables de entorno
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Explicación de Clean Architecture por Capas

### 1. Core (Dominio) - Independiente de frameworks
**Propósito:** Contiene la lógica de negocio pura, sin dependencias externas.

**Entidades:** Representan los conceptos del dominio
```typescript
// src/core/entities/Transaction.ts
export interface Transaction {
  id: string;
  userId: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: Date;
  createdAt: Date;
}
```

**Casos de Uso:** Orquestan la lógica de negocio
```typescript
// src/core/use-cases/transactions/CreateTransaction.ts
export class CreateTransactionUseCase {
  constructor(private repository: ITransactionRepository) {}
  
  async execute(data: CreateTransactionDTO): Promise<Transaction> {
    // Validaciones de negocio
    if (data.amount <= 0) {
      throw new Error('El monto debe ser mayor a 0');
    }
    
    return await this.repository.create(data);
  }
}
```

### 2. Infrastructure (Infraestructura) - Implementaciones concretas
**Propósito:** Implementa las interfaces definidas en el core, conecta con servicios externos.

```typescript
// src/infrastructure/repositories/SupabaseTransactionRepository.ts
export class SupabaseTransactionRepository implements ITransactionRepository {
  constructor(private supabase: SupabaseClient) {}
  
  async create(data: CreateTransactionDTO): Promise<Transaction> {
    const { data: transaction, error } = await this.supabase
      .from('transactions')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return transaction;
  }
  
  // ... otros métodos
}
```

### 3. Presentation (Presentación) - UI y lógica de vista
**Propósito:** Componentes React, hooks, contexts. Depende del core pero no de infrastructure.

```typescript
// src/presentation/hooks/useTransactions.ts
export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Inyección de dependencias
  const repository = new SupabaseTransactionRepository(supabase);
  const useCase = new GetTransactionsUseCase(repository);
  
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const data = await useCase.execute();
      setTransactions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return { transactions, loading, fetchTransactions };
}
```

---

## Fase 1: Configuración de Supabase (2-3 horas)

### 1.1 Crear Proyecto en Supabase
- [ ] Crear nuevo proyecto en Supabase
- [ ] Guardar URL del proyecto y anon key
- [ ] Habilitar autenticación por email

### 1.2 Diseño de Base de Datos
Crear las siguientes tablas en el SQL Editor de Supabase:

**Tabla: `transactions`**
```sql
create table transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  type text not null check (type in ('income', 'expense')),
  amount decimal(10,2) not null,
  description text not null,
  category text not null,
  date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Crear índice para mejorar queries
create index transactions_user_id_idx on transactions(user_id);
create index transactions_date_idx on transactions(date);
```

### 1.3 Configurar Row Level Security (RLS)
```sql
-- Habilitar RLS
alter table transactions enable row level security;

-- Política: usuarios solo ven sus propias transacciones
create policy "Users can view own transactions"
  on transactions for select
  using (auth.uid() = user_id);

create policy "Users can insert own transactions"
  on transactions for insert
  with check (auth.uid() = user_id);

create policy "Users can update own transactions"
  on transactions for update
  using (auth.uid() = user_id);

create policy "Users can delete own transactions"
  on transactions for delete
  using (auth.uid() = user_id);
```

### 1.4 Configurar Variables de Entorno
Crear archivo `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```

### 1.5 Crear Estructura Base
- [ ] Crear carpetas según la estructura de Clean Architecture
- [ ] Configurar Supabase client
```typescript
// src/infrastructure/services/supabase/client.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const supabase = createClientComponentClient();
```

---

## Fase 2: Capa de Dominio (3-4 horas)

### 2.1 Crear Entidades
- [ ] `src/core/entities/Transaction.ts`
- [ ] `src/core/entities/User.ts`
- [ ] `src/core/entities/Category.ts`

### 2.2 Definir Interfaces de Repositorios
- [ ] `src/core/repositories/ITransactionRepository.ts`
```typescript
export interface ITransactionRepository {
  create(data: CreateTransactionDTO): Promise<Transaction>;
  getAll(userId: string, filters?: TransactionFilters): Promise<Transaction[]>;
  getById(id: string): Promise<Transaction | null>;
  update(id: string, data: UpdateTransactionDTO): Promise<Transaction>;
  delete(id: string): Promise<void>;
  getMonthlySummary(userId: string, month: number, year: number): Promise<MonthlySummary>;
}
```

- [ ] `src/core/repositories/IAuthRepository.ts`

### 2.3 Crear Casos de Uso
- [ ] `src/core/use-cases/transactions/CreateTransaction.ts`
- [ ] `src/core/use-cases/transactions/GetTransactions.ts`
- [ ] `src/core/use-cases/transactions/UpdateTransaction.ts`
- [ ] `src/core/use-cases/transactions/DeleteTransaction.ts`
- [ ] `src/core/use-cases/transactions/GetMonthSummary.ts`
- [ ] `src/core/use-cases/auth/LoginUser.ts`
- [ ] `src/core/use-cases/auth/RegisterUser.ts`

**Ejemplo de caso de uso completo:**
```typescript
// src/core/use-cases/transactions/CreateTransaction.ts
import { ITransactionRepository } from '@/core/repositories/ITransactionRepository';
import { Transaction } from '@/core/entities/Transaction';

export interface CreateTransactionDTO {
  userId: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: Date;
}

export class CreateTransactionUseCase {
  constructor(private repository: ITransactionRepository) {}

  async execute(data: CreateTransactionDTO): Promise<Transaction> {
    // Validaciones de negocio
    if (data.amount <= 0) {
      throw new Error('El monto debe ser mayor a 0');
    }

    if (!data.description.trim()) {
      throw new Error('La descripción es requerida');
    }

    if (!['income', 'expense'].includes(data.type)) {
      throw new Error('Tipo de transacción inválido');
    }

    // Ejecutar operación
    return await this.repository.create(data);
  }
}
```

---

## Fase 3: Capa de Infraestructura (3-4 horas)

### 3.1 Implementar Repositorios
- [ ] `src/infrastructure/repositories/SupabaseTransactionRepository.ts`
```typescript
import { SupabaseClient } from '@supabase/supabase-js';
import { ITransactionRepository } from '@/core/repositories/ITransactionRepository';
import { Transaction } from '@/core/entities/Transaction';

export class SupabaseTransactionRepository implements ITransactionRepository {
  constructor(private supabase: SupabaseClient) {}

  async create(data: CreateTransactionDTO): Promise<Transaction> {
    const { data: transaction, error } = await this.supabase
      .from('transactions')
      .insert({
        user_id: data.userId,
        type: data.type,
        amount: data.amount,
        description: data.description,
        category: data.category,
        date: data.date.toISOString(),
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapToEntity(transaction);
  }

  async getAll(userId: string, filters?: TransactionFilters): Promise<Transaction[]> {
    let query = this.supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (filters?.type) {
      query = query.eq('type', filters.type);
    }

    if (filters?.startDate) {
      query = query.gte('date', filters.startDate.toISOString());
    }

    if (filters?.endDate) {
      query = query.lte('date', filters.endDate.toISOString());
    }

    const { data, error } = await query;

    if (error) throw new Error(error.message);
    return data.map(this.mapToEntity);
  }

  async getMonthlySummary(userId: string, month: number, year: number): Promise<MonthlySummary> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const { data, error } = await this.supabase
      .from('transactions')
      .select('type, amount')
      .eq('user_id', userId)
      .gte('date', startDate.toISOString())
      .lte('date', endDate.toISOString());

    if (error) throw new Error(error.message);

    const summary = data.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.totalIncome += Number(transaction.amount);
        } else {
          acc.totalExpenses += Number(transaction.amount);
        }
        return acc;
      },
      { totalIncome: 0, totalExpenses: 0, balance: 0 }
    );

    summary.balance = summary.totalIncome - summary.totalExpenses;
    return summary;
  }

  private mapToEntity(data: any): Transaction {
    return {
      id: data.id,
      userId: data.user_id,
      type: data.type,
      amount: Number(data.amount),
      description: data.description,
      category: data.category,
      date: new Date(data.date),
      createdAt: new Date(data.created_at),
    };
  }

  // Implementar update, delete, getById...
}
```

- [ ] `src/infrastructure/repositories/SupabaseAuthRepository.ts`

### 3.2 Configurar Servicios
- [ ] `src/infrastructure/services/supabase/client.ts` (para componentes cliente)
- [ ] `src/infrastructure/services/supabase/server.ts` (para server components)

---

## Fase 4: Capa de Presentación - Componentes Base (4-5 horas)

### 4.1 Crear Componentes Comunes
- [ ] `src/presentation/components/common/Button.tsx`
- [ ] `src/presentation/components/common/Input.tsx`
- [ ] `src/presentation/components/common/Modal.tsx`
- [ ] `src/presentation/components/common/LoadingSpinner.tsx`

### 4.2 Crear Schemas de Validación
- [ ] `src/presentation/schemas/transactionSchema.ts`
```typescript
import { z } from 'zod';

export const transactionSchema = z.object({
  type: z.enum(['income', 'expense']),
  amount: z.number().positive('El monto debe ser mayor a 0'),
  description: z.string().min(1, 'La descripción es requerida'),
  category: z.string().min(1, 'La categoría es requerida'),
  date: z.date(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
```

### 4.3 Crear Contexts
- [ ] `src/presentation/contexts/AuthContext.tsx`
```typescript
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/infrastructure/services/supabase/client';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar sesión actual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

- [ ] `src/presentation/contexts/ToastContext.tsx`

---

## Fase 5: Custom Hooks (3-4 horas)

### 5.1 Crear Hook de Transacciones
- [ ] `src/presentation/hooks/useTransactions.ts`
```typescript
'use client';

import { useState, useEffect } from 'react';
import { Transaction } from '@/core/entities/Transaction';
import { SupabaseTransactionRepository } from '@/infrastructure/repositories/SupabaseTransactionRepository';
import { GetTransactionsUseCase } from '@/core/use-cases/transactions/GetTransactions';
import { CreateTransactionUseCase } from '@/core/use-cases/transactions/CreateTransaction';
import { supabase } from '@/infrastructure/services/supabase/client';
import { useAuth } from '@/presentation/contexts/AuthContext';

export function useTransactions() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Inyección de dependencias
  const repository = new SupabaseTransactionRepository(supabase);
  const getTransactionsUseCase = new GetTransactionsUseCase(repository);
  const createTransactionUseCase = new CreateTransactionUseCase(repository);

  const fetchTransactions = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await getTransactionsUseCase.execute(user.id);
      setTransactions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (data: CreateTransactionDTO) => {
    if (!user) throw new Error('Usuario no autenticado');
    
    setLoading(true);
    setError(null);
    try {
      const newTransaction = await createTransactionUseCase.execute({
        ...data,
        userId: user.id,
      });
      setTransactions(prev => [newTransaction, ...prev]);
      return newTransaction;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    createTransaction,
  };
}
```

### 5.2 Crear Otros Hooks
- [ ] `src/presentation/hooks/useMonthSummary.ts`
- [ ] `src/presentation/hooks/useToast.ts`

---

## Fase 6: Páginas y Componentes Específicos (6-8 horas)

### 6.1 Autenticación
- [ ] `src/app/(auth)/login/page.tsx`
- [ ] `src/app/(auth)/register/page.tsx`

### 6.2 Dashboard
- [ ] `src/app/(dashboard)/layout.tsx`
- [ ] `src/app/(dashboard)/dashboard/page.tsx`
- [ ] `src/presentation/components/layout/Header.tsx`

### 6.3 Componentes de Transacciones
- [ ] `src/presentation/components/transactions/TransactionList.tsx`
- [ ] `src/presentation/components/transactions/TransactionItem.tsx`
- [ ] `src/presentation/components/transactions/TransactionForm.tsx`
```typescript
'use client';

import { useState } from 'react';
import { useTransactions } from '@/presentation/hooks/useTransactions';
import { transactionSchema } from '@/presentation/schemas/transactionSchema';
import Button from '@/presentation/components/common/Button';
import Input from '@/presentation/components/common/Input';

export default function TransactionForm({ onClose }: { onClose: () => void }) {
  const { createTransaction } = useTransactions();
  const [formData, setFormData] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validar con Zod
      const validated = transactionSchema.parse({
        ...formData,
        amount: Number(formData.amount),
        date: new Date(formData.date),
      });

      await createTransaction(validated);
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
    </form>
  );
}
```

### 6.4 Componentes de Dashboard
- [ ] `src/presentation/components/dashboard/SummaryCard.tsx`
- [ ] `src/presentation/components/dashboard/MonthSelector.tsx`

---

## Fase 7: Testing y Refinamiento (2-3 horas)

### 7.1 Testing Manual
- [ ] Flujo completo de autenticación
- [ ] CRUD de transacciones
- [ ] Validaciones de formularios
- [ ] Estados de carga y error
- [ ] Responsive design

### 7.2 Optimizaciones
- [ ] Implementar loading states
- [ ] Agregar error boundaries
- [ ] Optimizar queries a Supabase
- [ ] Implementar paginación

---

## Fase 8: Deployment (1-2 horas)

### 8.1 Preparar para Producción
- [ ] Verificar `.env.local` en `.gitignore`
- [ ] Commit y push a GitHub

### 8.2 Deploy en Vercel
- [ ] Conectar repositorio a Vercel
- [ ] Configurar variables de entorno
- [ ] Deploy automático

---

## Tiempo Total Estimado: 25-35 horas

### Ventajas de Clean Architecture:
✅ **Testeable:** Casos de uso independientes de frameworks
✅ **Mantenible:** Separación clara de responsabilidades
✅ **Escalable:** Fácil agregar nuevas features
✅ **Flexible:** Cambiar Supabase por otro backend es sencillo
✅ **Profesional:** Código de calidad empresarial

---

## Recursos Útiles

### Clean Architecture:
- The Clean Architecture (Robert C. Martin)
- https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html

### Documentación:
- Next.js: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
- Zod: https://zod.dev
