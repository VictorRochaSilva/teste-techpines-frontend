# 🎵 Top 5 Tião Carreiro - Frontend

O frontend da aplicação que todo mundo tá usando pra descobrir as melhores músicas do Tião Carreiro! Feito com React e TypeScript, bem responsivo e com uma interface bem legal.

## 🛠️ O que tem aqui

### **Tecnologias que usei**
- **React 18** + **TypeScript** - Pra ter tipagem forte e menos bug
- **Vite** - Build super rápido, muito melhor que o Webpack
- **Tailwind CSS** - CSS utility-first, bem mais prático
- **Zustand** - State management simples, sem complicação
- **React Query** - Cache inteligente das requisições
- **Zod** - Validação de formulários que funciona de verdade
- **React Hook Form** - Formulários sem dor de cabeça
- **Axios** - HTTP client que todo mundo conhece

### **Estrutura de Pastas**
```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.tsx      # Cabeçalho da aplicação
│   ├── SongCard.tsx    # Card de música
│   └── ProtectedRoute.tsx # Proteção de rotas
├── pages/              # Páginas da aplicação
│   ├── Home.tsx        # Página inicial
│   ├── Login.tsx       # Login
│   ├── Register.tsx    # Registro
│   ├── SuggestSong.tsx # Sugerir música
│   └── Admin.tsx       # Painel administrativo
├── services/           # API client
│   └── api.ts         # Configuração Axios + endpoints
├── stores/             # Estado global
│   └── authStore.ts   # Store de autenticação (Zustand)
├── schemas/            # Validação
│   ├── auth.ts        # Schemas de autenticação
│   └── song.ts        # Schemas de música
├── types/              # Tipos TypeScript
│   └── index.ts       # Definições de tipos
└── App.tsx            # Componente principal
```

## 🚀 Como rodar isso aqui

### **Com Docker (mais fácil)**

```bash
# Entra na pasta do frontend
cd frontend

# Sobe o container
docker-compose up -d

# Pronto! Acessa http://localhost:3000
```

### **Local mesmo (se preferir)**

```bash
# Entra na pasta
cd frontend

# Instala as dependências
npm install

# Roda em modo dev
npm run dev

# Abre http://localhost:3000 no navegador
```

### **Build pra produção**

```bash
# Gera o build otimizado
npm run build

# Testa o build localmente
npm run preview
```

## 🐳 Comandos Docker

```bash
# Iniciar serviços
docker-compose up -d

# Parar serviços
docker-compose down

# Ver logs
docker-compose logs -f react

# Acessar container
docker-compose exec react sh

# Rebuild da imagem
docker-compose build --no-cache
```

## 🧪 Testes

### **Rodar todos os testes:**
```bash
npm test
```

### **Rodar testes em modo watch:**
```bash
npm test -- --watch
```

### **Rodar testes uma vez:**
```bash
npm test -- --run
```

### **Rodar testes com interface:**
```bash
npm run test:ui
```

### **Testes disponíveis:**
- **App.test.tsx** - Testa renderização do componente principal
- **SongCard.test.tsx** - Testa componente de card de música
- **song.test.ts** - Testa validação de schemas Zod

### **Cobertura de código:**
```bash
npm test -- --coverage
```

## 📱 O que a galera pode fazer

### **Pra todo mundo**
- 🏠 **Página inicial** - Vê o top 5 e todas as músicas
- 🎵 **Sugerir música** - Manda uma do YouTube que você gosta
- 🔐 **Login/Registro** - Cria conta pra acessar o admin

### **Só pra quem tem conta (admin)**
- 👑 **Painel administrativo** - Gerencia tudo
- ✅ **Aprovar/Rejeitar** - Decide quais sugestões vão pro ar
- ✏️ **CRUD completo** - Adiciona, edita e remove músicas

## 🎨 Como ficou o visual

### **Cores que escolhi**
```css
/* Vermelho do Tião Carreiro */
primary-50: #fef2f2
primary-600: #dc2626
primary-800: #991b1b

/* Cinza pra contrastar */
secondary-100: #f1f5f9
secondary-600: #475569
secondary-900: #0f172a
```

### **Classes que criei**
- **Botões:** `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`
- **Inputs:** `.input` - bem estilizado
- **Cards:** `.card`, `.card-header`, `.card-content`
- **Tamanhos:** `.btn-sm`, `.btn-md`, `.btn-lg`

## 🔐 Autenticação

### **Zustand Store**
```typescript
const { user, isAuthenticated, login, logout } = useAuthStore()
```

### **Proteção de Rotas**
```typescript
<ProtectedRoute>
  <Admin />
</ProtectedRoute>
```

### **Persistência**
- Token salvo no `localStorage`
- Estado sincronizado entre abas
- Logout automático em caso de token inválido

## 📊 Gerenciamento de Estado

### **Zustand (Estado Global)**
- **AuthStore** - Autenticação do usuário
- **Persistência** automática no localStorage
- **TypeScript** com tipagem completa

### **React Query (Server State)**
- **Cache inteligente** de requisições
- **Refetch automático** em caso de erro
- **Otimistic updates** para melhor UX
- **Stale time** de 5 minutos

## 🎵 Integração com API

### **Configuração Axios**
```typescript
// Interceptor para token
api.interceptors.request.use((config) => {
  const token = getTokenFromStorage()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

### **Endpoints Utilizados**
- `GET /api/songs/top` - Top 5 músicas
- `GET /api/songs` - Lista paginada
- `POST /api/songs/suggest` - Sugerir música
- `GET /api/admin/songs/pending` - Músicas pendentes
- `POST /api/admin/songs/{id}/approve` - Aprovar música

## 📝 Validação de Formulários

### **Zod Schemas**
```typescript
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})
```

### **React Hook Form**
```typescript
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(loginSchema)
})
```

## 🎨 Responsividade

### **Breakpoints Tailwind**
- **Mobile:** `< 768px`
- **Tablet:** `768px - 1024px`
- **Desktop:** `> 1024px`

### **Componentes Responsivos**
- **Header** - Menu colapsável em mobile
- **SongCard** - Layout adaptativo
- **Paginação** - Controles otimizados para touch

## 🧪 Testes

```bash
# Executar testes
npm run test

# Executar testes em modo watch
npm run test:watch

# Coverage
npm run test:coverage
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento

# Build
npm run build        # Build para produção
npm run preview      # Preview do build

# Qualidade
npm run lint         # ESLint
npm run type-check   # Verificação TypeScript
```

## 📦 Dependências Principais

### **Produção**
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.1",
  "zustand": "^4.4.7",
  "@tanstack/react-query": "^5.8.4",
  "axios": "^1.6.2",
  "zod": "^3.22.4",
  "react-hook-form": "^7.48.2",
  "lucide-react": "^0.294.0",
  "tailwindcss": "^3.3.5"
}
```

### **Desenvolvimento**
```json
{
  "@vitejs/plugin-react": "^4.1.1",
  "typescript": "~5.8.3",
  "vite": "^5.0.0",
  "eslint": "^9.33.0"
}
```

## 🚀 Performance

### **Otimizações Implementadas**
- ✅ **Code Splitting** automático com Vite
- ✅ **Tree Shaking** para bundle menor
- ✅ **Lazy Loading** de componentes
- ✅ **Memoização** com React.memo
- ✅ **Cache inteligente** com React Query
- ✅ **Imagens otimizadas** (WebP quando possível)

### **Bundle Size**
- **Desenvolvimento:** ~2MB
- **Produção:** ~200KB (gzipped)

## 🔒 Segurança

### **Implementações**
- ✅ **Validação client-side** com Zod
- ✅ **Sanitização** de inputs
- ✅ **HTTPS** em produção
- ✅ **CORS** configurado
- ✅ **Token expiration** handling

## 🐛 Troubleshooting

### **Erro de CORS**
```bash
# Verificar se backend está rodando
curl http://localhost:8000/api/songs/top

# Verificar configuração CORS no Laravel
```

### **Erro de Build**
```bash
# Limpar cache
rm -rf node_modules package-lock.json
npm install

# Verificar versões
node --version
npm --version
```

### **Erro de TypeScript**
```bash
# Verificar tipos
npm run type-check

# Reinstalar @types
npm install --save-dev @types/react @types/react-dom
```

## 📱 PWA (Futuro)

### **Recursos Planejados**
- **Service Worker** para cache offline
- **Manifest** para instalação
- **Push Notifications** para novas músicas
- **Background Sync** para sugestões offline

## 🎯 Próximos Passos

- [ ] **Testes E2E** com Playwright
- [ ] **PWA** com service worker
- [ ] **Dark Mode** toggle
- [ ] **Filtros avançados** de busca
- [ ] **Favoritos** do usuário
- [ ] **Compartilhamento social**

---

**Versão:** 2.0  
**React:** 18.x  
**TypeScript:** 5.8+  
**Última atualização:** Setembro 2024