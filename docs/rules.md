# DomPedro Delivery - Frontend Rules & Best Practices

## 📋 Índice
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Padrões de Código](#padrões-de-código)
- [Componentes](#componentes)
- [Estilos e Design System](#estilos-e-design-system)
- [Estado e Data Fetching](#estado-e-data-fetching)
- [Performance](#performance)
- [Testes](#testes)
- [Git e Commits](#git-e-commits)
- [Code Review](#code-review)

---

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── (auth)/            # Rotas de autenticação
│   ├── dashboard/         # Área logada
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout root
│   └── page.tsx          # Home/Landing
├── components/            # Componentes reutilizáveis
│   ├── ui/              # Componentes base (shadcn/ui)
│   ├── layout/          # Layout components
│   └── forms/           # Formulários
├── presentation/         # Componentes de apresentação
│   └── sections/        # Seções da landing
├── application/         # Lógica de negócio
│   ├── services/       # API services
│   ├── hooks/          # Custom hooks
│   └── stores/         # State management
├── domain/             # Entidades de domínio
│   ├── types/          # TypeScript types
│   └── constants/      # Constantes
├── lib/                # Utilitários
│   ├── utils/          # Funções helpers
│   ├── validations/     # Validações
│   └── config/         # Configurações
└── docs/               # Documentação
```

---

## 🎯 Padrões de Código

### TypeScript
- **Sempre usar TypeScript** - `any` é proibido
- **Interfaces para objetos**: `interface User` ao invés de `type User`
- **Tipos explícitos** em parâmetros de funções
- **Preferir `const`** sobre `let` quando possível

```tsx
// ✅ Bom
interface User {
  id: string;
  name: string;
  email: string;
}

const getUserById = async (id: string): Promise<User | null> => {
  // implementation
};

// ❌ Ruim
const getUserById = async (id: any) => {
  // implementation
};
```

### Nomenclatura
- **Componentes**: PascalCase (`UserProfile.tsx`)
- **Funções/Hooks**: camelCase (`useUserData`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Arquivos**: kebab-case para utilities (`date-utils.ts`)

### Imports
```tsx
// 1. React/Next.js
import { useState, useEffect } from 'react';
import { NextPage } from 'next';

// 2. Bibliotecas externas
import { z } from 'zod';
import axios from 'axios';

// 3. Componentes internos (@/)
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/layout/SiteHeader';

// 4. Utils e services
import { formatDate } from '@/lib/utils/date';
import { userService } from '@/application/services/user-service';
```

---

## 🧩 Componentes

### Estrutura de Componente
```tsx
interface UserProfileProps {
  userId: string;
  onUpdate?: (user: User) => void;
}

export function UserProfile({ userId, onUpdate }: UserProfileProps) {
  // 1. Hooks (sempre no topo)
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // 2. Effects
  useEffect(() => {
    // effect logic
  }, [userId]);
  
  // 3. Event handlers
  const handleUpdate = useCallback((updatedUser: User) => {
    setUser(updatedUser);
    onUpdate?.(updatedUser);
  }, [onUpdate]);
  
  // 4. Render conditions
  if (isLoading) return <UserProfileSkeleton />;
  if (!user) return <div>Usuário não encontrado</div>;
  
  // 5. JSX
  return (
    <div className="p-6">
      {/* component JSX */}
    </div>
  );
}
```

### Componentes vs Páginas
- **Componentes**: Reutilizáveis, sem lógica de roteamento
- **Páginas**: Em `app/`, com metadata e lógica de rota

### Props
- **Interface sempre** para props
- **Props opcionais** com `?`
- **Default props** via desestruturação

```tsx
// ✅ Bom
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick 
}: ButtonProps) {
  // implementation
}
```

---

## 🎨 Estilos e Design System

### Tailwind CSS
- **Design tokens** em `tailwind.config.js`
- **Component variants** com `cn()` helper
- **Responsive-first**: mobile-first design

```tsx
import { cn } from '@/lib/utils';

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        // base styles
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
        // variants
        {
          'bg-orange-600 text-white hover:bg-orange-700': variant === 'primary',
          'border border-gray-300 bg-white hover:bg-gray-50': variant === 'secondary',
        },
        // sizes
        {
          'h-8 px-3 text-sm': size === 'sm',
          'h-10 px-4 text-base': size === 'md',
          'h-12 px-6 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    />
  );
}
```

### Cores e Tema
```typescript
// tailwind.config.js
const colors = {
  orange: {
    50: '#fff7ed',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
  },
  gray: {
    50: '#f9fafb',
    900: '#111827',
  },
};
```

---

## 🔄 Estado e Data Fetching

### Server Components vs Client Components
```tsx
// Server Component (async)
export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await userService.getById(params.id);
  
  return <UserProfile user={user} />;
}

// Client Component
'use client';

export function UserProfile({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState(false);
  // client-side logic
}
```

### Data Fetching
```tsx
// Server-side (preferido)
export default async function UsersPage() {
  const users = await userService.getAll();
  
  return <UsersList users={users} />;
}

// Client-side (quando necessário)
'use client';

export function UsersList() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  });
  
  // render logic
}
```

### State Management
- **Estado local**: `useState`, `useReducer`
- **Estado global**: Zustand (se necessário)
- **Server state**: React Query/TanStack Query
- **Form state**: React Hook Form + Zod

---

## ⚡ Performance

### Code Splitting
```tsx
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('@/components/charts/HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false,
});
```

### Imagens
```tsx
import Image from 'next/image';

<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={800}
  height={600}
  priority // LCP image
  placeholder="blur"
/>
```

### Otimizações
- **React.memo** para componentes puros
- **useMemo/useCallback** para valores/caros
- **Virtual scrolling** para listas longas
- **Lazy loading** para componentes pesados

---

## 🧪 Testes

### Estrutura de Testes
```tsx
// __tests__/components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });
  
  it('applies variant styles', () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-orange-600');
  });
});
```

### Tipos de Testes
- **Unit**: Componentes isolados
- **Integration**: Componentes + hooks
- **E2E**: Fluxos completos (Playwright)

---

## 📦 Git e Commits

### Branch Strategy
```
main                    # Produção
├── develop            # Desenvolvimento
├── feature/user-auth  # Features
├── bugfix/login-error # Bug fixes
└── hotfix/security    # Hot fixes
```

### Commit Convention
```
feat: add user authentication
fix: resolve login validation error
docs: update API documentation
style: format code with prettier
refactor: extract user service
test: add unit tests for button component
chore: update dependencies
```

### Pull Request Template
```markdown
## 📋 Descrição
Breve descrição da mudança

## 🔄 Mudanças
- [ ] Feature X implementada
- [ ] Bug Y corrigido

## 🧪 Testes
- [ ] Unit tests passando
- [ ] Manual test realizado

## 📸 Screenshots
Se aplicável

## ✅ Checklist
- [ ] Code review aprovado
- [ ] Testes passando
- [ ] Documentação atualizada
```

---

## 👥 Code Review

### O que revisar
1. **Funcionalidade**: Código funciona como esperado?
2. **Performance**: Algum impacto negativo?
3. **Segurança**: Vulnerabilidades presentes?
4. **Legibilidade**: Código é fácil de entender?
5. **Testes**: Coverage adequado?
6. **Documentação**: Mudanças documentadas?

### Feedback Guidelines
- **Construtivo**: Focado no código, não na pessoa
- **Específico**: Exemplos concretos
- **Respeitoso**: Tom profissional
- **Sugestivo**: Oferecer alternativas

---

## 🔧 Ferramentas e Configurações

### ESLint + Prettier
```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ]
}
```

### Husky + lint-staged
```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

### VS Code Extensions
- TypeScript Importer
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- GitLens

---

## 📚 Recursos Adicionais

### Documentação
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Docs](https://react.dev/)

### Ferramentas
- **Storybook**: Component documentation
- **Lighthouse**: Performance audit
- **Bundle Analyzer**: Package size analysis

---

## 🚀 Deploy Checklist

### Antes do Deploy
- [ ] Build sem erros
- [ ] Testes passando
- [ ] Variáveis de ambiente configuradas
- [ ] Performance audit (Lighthouse > 90)
- [ ] Accessibility check
- [ ] SEO metadata

### Pós-Deploy
- [ ] Monitoramento ativo
- [ ] Logs configurados
- [ ] Backup realizado
- [ ] Rollback plan testado

---

## 🎯 Princípios Gerais

1. **Simplicidade**: Código simples é melhor que código complexo
2. **Consistência**: Siga os padrões estabelecidos
3. **Performance**: Pense no impacto de cada mudança
4. **Acessibilidade**: Sempre considere UX para todos
5. **Segurança**: Nunca confie em dados do cliente
6. **Testabilidade**: Código deve ser testável
7. **Documentação**: Código auto-documentado é ideal

---

*Lembre-se: Regras existem para guiar, não para limitar. Use seu julgamento e sempre questione se algo faz sentido para o contexto atual.* 🚀
