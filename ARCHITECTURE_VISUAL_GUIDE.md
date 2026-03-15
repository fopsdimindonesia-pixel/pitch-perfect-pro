# 🏗️ ARCHITECTURE VISUAL GUIDE & QUICK REFERENCE

---

## 📐 APPLICATION ARCHITECTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────────────┐
│                     PITCH PERFECT PRO                            │
│                   React 19 + TypeScript                          │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                        ENTRY POINT                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  src/main.tsx → App.tsx → AppShell Layout              │   │
│  └─────────────────────────────────────────────────────────┘   │
│               ↓               ↓                ↓                 │
│          React Query      RoleProvider    Sonner Toast           │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                     ROUTING LAYER                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ React Router v6 - 89 Routes                              │  │
│  │ ├── /owner/* (12 routes) ✅ Modules                      │  │
│  │ ├── /eo/* (8 routes) ✅ Modules                          │  │
│  │ ├── /club/* (48 routes) ✅ Modules                       │  │
│  │ ├── /match/* (15 routes) ⚠️ Pages (need migration)      │  │
│  │ ├── /competition/* (3 routes) ⚠️ Pages (need migration) │  │
│  │ └── * → NotFound                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                   MODULE STRUCTURE (DOMAIN-DRIVEN)               │
│                                                                  │
│  src/modules/                                                   │
│  ├── owner/ (45 files)          [✅ COMPLETE]                   │
│  │   ├── dashboard/              ├── clubs/                      │
│  │   ├── eos/                    ├── users/                      │
│  │   ├── audit/                  └── finance/                    │
│  │   └── index.ts (barrel)       → 12 submodules               │
│  │                                                              │
│  ├── eo/ (15 files)              [✅ COMPLETE]                   │
│  │   ├── dashboard/              ├── competitions/              │
│  │   ├── registration/           └── index.ts                   │
│  │   → 6 submodules                                             │
│  │                                                              │
│  ├── club/ (65 files)            [✅ COMPLETE]                   │
│  │   ├── dashboard/        (2)   - Main entry                   │
│  │   ├── core/             (4)   - Profile, branding           │
│  │   ├── players/          (11)  - ⭐ LARGEST                    │
│  │   ├── roster/           (6)   - Squad mgmt                  │
│  │   ├── staff/            (5)   - Coaching                    │
│  │   ├── training/         (5)   - Training sessions           │
│  │   ├── academy/          (5)   - Youth dev                   │
│  │   ├── analytics/        (6)   - Performance                 │
│  │   ├── finance/          (6)   - Financials                  │
│  │   ├── operations/       (6)   - Match ops                   │
│  │   ├── fan/              (6)   - Engagement                  │
│  │   └── index.ts (barrel) → 11 submodules                     │
│  │                                                              │
│  └── [FUTURE MODULES - Week 3-5]                                │
│      ├── match/ (40 files) 🔴 Priority 1                        │
│      ├── competition/ (17 files) 🔴 Priority 1                  │
│      ├── finance/ (15 files) 🟠 Priority 2                      │
│      └── organization/ (10 files) 🟠 Priority 2                 │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                   COMPONENT LAYER (71 files)                     │
│                                                                  │
│  src/components/                                                │
│  ├── ui/ (45 files) - shadcn/ui components                      │
│  │   ├── Button, Card, Dialog, Form, Input...                   │
│  │   ├── Table, Tabs, Accordion, Dropdown...                    │
│  │   └── Responsive, accessible, Tailwind styled                │
│  │                                                              │
│  ├── shared/ (8 files) - Reusable domain components             │
│  │   ├── MatchCard, StandingsTable, StatCard                    │
│  │   ├── StatusBadges, ErrorBoundary, LoadingSpinner            │
│  │   └── FormLayout, EmptyState                                 │
│  │                                                              │
│  └── layout/ (3 files) - Page structure                         │
│      ├── AppShell, AppSidebar, TopHeader                        │
│      └── Navigation, authentication, role-based UI              │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                   SERVICE LAYER (20 files)                       │
│                                                                  │
│  src/lib/                              src/hooks/               │
│  ├── api.ts                            ├── use-mobile.tsx       │
│  │   ├── ApiClient (fetch wrapper)     ├── use-toast.ts         │
│  │   ├── Type-safe responses           └── [TO CREATE]          │
│  │   └── Error handling                   ├── useApi            │
│  │                                        ├── useFormValidation  │
│  ├── utils.ts                            ├── useLocalStorage     │
│  │   ├── cn() - class names              ├── useDebounce        │
│  │   └── Date/string utilities           └── usePagination      │
│  │                                                              │
│  ├── validation.ts                    src/context/             │
│  │   ├── Email, phone, date            └── RoleContext.tsx      │
│  │   └── Custom validators                 ├── User role         │
│  │                                         ├── Permissions       │
│  ├── mockData.ts                           └── [TO CREATE]       │
│  │   └── Test data                         ├── AuthContext       │
│  │                                         ├── ThemeContext      │
│  └── accessibility.ts                      └── NotificationCtx   │
│      └── A11y utilities                                          │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                   EXTERNAL DEPENDENCIES                          │
│                                                                  │
│  UI Framework          Data Management      Utilities           │
│  ├── React 19          ├── React Query 5.83 ├── Tailwind 3.4    │
│  ├── React Router 6    ├── React Hook Form  ├── shadcn/ui       │
│  ├── TypeScript 5.x    ├── Zod (validation) ├── Lucide Icons    │
│  └── Vite 5.4 (build)  └── Axios (fetch)    └── date-fns        │
│                                                                  │
│  Testing (TO SETUP)                                             │
│  ├── Vitest            ├── @testing-library/react               │
│  └── Playwright        └── @testing-library/user-event          │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 📊 DATA FLOW DIAGRAM

```
USER INTERACTION
     ↓
┌─────────────────────┐
│  React Component    │
└─────────────────────┘
     ↓
┌─────────────────────────────────┐
│  Event Handler / Form Submission│
└─────────────────────────────────┘
     ↓
     ├──→ Local State (useState)
     │    └──→ Component Re-render
     │
     ├──→ Context (RoleContext)
     │    └──→ App-wide state update
     │
     └──→ React Query Mutation
          ↓
     ┌────────────────────┐
     │  API Client        │
     │  (src/lib/api.ts)  │
     └────────────────────┘
          ↓
     ┌────────────────────┐
     │  Backend API       │
     │  /api/...          │
     └────────────────────┘
          ↓
     ┌────────────────────┐
     │  Response Handler  │
     │  - Success? ✅     │
     │  - Error? ❌       │
     └────────────────────┘
          ↓
     ┌────────────────────┐
     │  React Query Cache │
     │  (Revalidation)    │
     └────────────────────┘
          ↓
     ┌────────────────────┐
     │  Component Update  │
     │  (Re-render)       │
     └────────────────────┘
          ↓
     ┌────────────────────┐
     │  Sonner Toast      │
     │  (Notification)    │
     └────────────────────┘
```

---

## 🗂️ FILE ORGANIZATION CHECKLIST

### WHAT EXISTS ✅

```
✅ Modular Structure
   owner/       (45 files, 12 submodules) - COMPLETE
   eo/          (15 files, 6 submodules) - COMPLETE  
   club/        (65 files, 11 submodules) - COMPLETE
   Total: 129 files organized

✅ Component Library
   shadcn/ui    (45 components) - PRODUCTION READY
   shared/      (8 components) - GOOD STATE
   layout/      (3 components) - GOOD STATE

✅ Services
   api.ts       - CENTRALIZED, TYPE-SAFE ✅ Fixed statusCode issue
   utils.ts     - FUNCTIONAL
   validation.ts - COMPREHENSIVE
   mockData.ts  - GOOD

✅ Build & Config
   vite.config.ts - OPTIMIZED (11-16s builds)
   tsconfig.json - WORKS, needs strictness enabled
   tailwind.config.ts - GOOD
   eslint.config.js - BASIC

✅ Providers & Context
   RoleContext - ROLE-BASED ACCESS ✅
   React Query - INSTALLED, UNDERUTILIZED
   Toast/Sonner - CONFIGURED ✅

✅ Development Tools
   React Router - 89 ROUTES
   React Hook Form - AVAILABLE
   Playwright - E2E READY
```

### WHAT'S MISSING ❌

```
❌ TEST INFRASTRUCTURE
   □ React Testing Library not installed
   □ vitest not configured for React
   □ No test utilities
   □ 0% test coverage
   → ACTION: Phase A Week 1

❌ ADDITIONAL MODULES
   □ match/ (40 files) - Still in pages/
   □ competition/ (17 files) - Still in pages/
   □ finance/ (15 files) - Partially split
   □ organization/ (10 files) - Still in pages/
   → ACTION: Phase B Week 3-5

❌ CUSTOM HOOKS
   □ useApi - Data fetching simplification
   □ useFormValidation - Form validation helper
   □ useLocalStorage - Persistent state
   □ useDebounce - Search optimization
   □ usePagination - Table pagination
   → ACTION: Phase C

❌ STRICT TYPE SAFETY
   □ strictNullChecks: false (should be true)
   □ noImplicitAny: false (should be true)
   □ noUnusedLocals: false (should be true)
   → ACTION: Phase A Week 2 + Phase C

❌ ADVANCED CONTEXTS
   □ AuthContext - User/login management
   □ ThemeContext - Dark mode, branding
   □ NotificationContext - Toast queue
   □ FilterContext - Search state
   → ACTION: Phase C

❌ TESTING (CRITICAL)
   □ Unit tests: 0%
   □ Integration tests: 0%
   □ E2E tests: 0%
   → ACTION: Phase B-C (40 hours)

❌ DOCUMENTATION
   □ Architecture docs - IN PROGRESS ✅
   □ Component gallery - PLANNED (Storybook)
   □ API docs - PLANNED  
   □ Dev guide - PLANNED
   → ACTION: Phase E
```

---

## 🚀 RECOMMENDED NEXT STEPS

### IMMEDIATE (This Week - Quick Wins)

#### 1. Enable strictNullChecks (30 min)
**File:** `tsconfig.json`
```json
{
  "compilerOptions": {
    "strictNullChecks": true  // ← ADD THIS
  }
}
```
**Then fix errors that appear**

#### 2. Organize App.tsx Routes (1 hour)
**Current:** Single unmanageable array
**Goal:** Grouped by domain
```typescript
// Before: 89 items in single array

// After: Organized groups
const ownerRoutes = [/* owner pages */];
const eoRoutes = [/* eo pages */];
const clubRoutes = [/* club pages */];
const matchRoutes = [/* match pages */];
const routes = [...ownerRoutes, ...eoRoutes, ...clubRoutes, ...matchRoutes];
```

#### 3. Add 404 Error Handling (30 min)
```typescript
// In App.tsx routing
{
  path: '*',
  element: <NotFound />
}
```

#### 4. Install Testing Dependencies (15 min)
```bash
npm install --save-dev @testing-library/react @testing-library/user-event @testing-library/jest-dom
```

### WEEK 1 (Stabilization Phase)

#### Task Checklist
```
□ Install & configure Vitest
   - Setup vitest.config.ts
   - Configure jsdom environment
   - Create test utilities
   
□ Write 5 critical path tests
   - API client error handling
   - Custom hook behavior
   - Form validation
   - Authentication flow
   - Dashboard loading
   
□ Setup pre-commit hooks
   - Run tests before commit
   - Lint before commit
   - Type check before commit
   
□ Enable strictNullChecks
   - Fix ~30 null/undefined errors
   - Document breaking changes
   - Update team guide

□ Document current patterns
   - Import patterns guide
   - Component usage
   - API integration
   - Form submission flow
```

### WEEK 2-3 (Migration Phase)

#### Create Match Module (12 hours)
```bash
# 1. Create structure
mkdir -p src/modules/match/{setup,lineup,events,data,analytics,archive}

# 2. Copy files
cp src/pages/match/setup/* src/modules/match/setup/
cp src/pages/match/lineup/* src/modules/match/lineup/
# ... etc

# 3. Update imports
# Search & replace: "./pages/match/" → "./modules/match/"

# 4. Create barrel exports
# src/modules/match/index.ts with all exports

# 5. Update App.tsx
# Replace scattered imports with: import { ... } from "./modules/match"

# 6. Test
npm run build  # Should pass
npm run test   # Should pass
```

---

## 📈 METRICS TO TRACK

### Health Indicators

| Metric | Current | Target | Priority |
|--------|---------|--------|----------|
| Test Coverage | 0% | ≥40% | 🔴 CRITICAL |
| Type Errors | ~150 | 0 | 🔴 HIGH |
| Module Consistency | 60% | 100% | 🟠 HIGH |
| Build Time | 11-16s | <15s | 🟡 MEDIUM |
| Bundled Size | ? | <200KB | 🟡 MEDIUM |
| Accessibility Score | ~70 | 95+ | 🟡 MEDIUM |

### Sprint Velocity Tracking

```
WEEK 1: Stabilization
├── Tests written: ▓▓▓▓░░░░░░ 5 (target 10)
├── Type fixes: ▓▓░░░░░░░░ 30/150 (target 150)
└── Time invested: 20 hours

WEEK 2-3: Migration  
├── Files migrated: ▓░░░░░░░░░ 0/82 (target 82)
├── Routes working: ▓░░░░░░░░░ 0/58 (target 58)
└── Time invested: 40 hours

WEEK 4-5: Coverage
├── Tests written: ▓░░░░░░░░░ 50/200 (target 200)
├── Coverage: ▓▓░░░░░░░░ 15% (target 40%)
└── Time invested: 40 hours

WEEK 6-8: Type Safety & Testing
├── Type strictness: ▓▓▓░░░░░░░ 50% (target 100%)
├── Coverage: ▓▓▓▓▓░░░░░ 40% (target 40%+)
└── Time invested: 50 hours
```

---

## 🎯 MONITORING & VALIDATION

### Build Quality Gates

```bash
# Pre-commit checks
npm lint          # No errors allowed
npm test          # All tests passing
npm run build     # No TypeScript errors
                  # Build size < 200KB

# Pre-deployment checks  
npm run test:coverage    # >40% coverage
npm run audit            # No vulnerabilities
npm run type-check       # 0 type errors
npm run accessibility    # A11y audit passing
```

### Performance Benchmarks

```
Build Time:     <15s (current: 11-16s ✅)
Bundle Size:    <200KB (TBD)
Lighthouse:     >85 (TBD)
A11y Score:     >90 (TBD)
Test Speed:     <5s for unit tests
```

### Code Quality Metrics

```
Cyclomatic Complexity:  <5 per function (avg)
Function Size:          <30 lines (avg)
Code Duplication:       <5%
Type Coverage:          100%
Test Coverage:          >40%
```

---

## 📚 REFERENCE PATTERNS

### Import Pattern - AFTER MIGRATION

```typescript
// ✅ CORRECT PATTERN (Use after migration)
import { ClubOverview, ClubBranding } from "@/modules/club";
import { OwnerOverview } from "@/modules/owner";
import { EOOverview } from "@/modules/eo";

// ❌ OLD PATTERN (Do not use after migration)
import ClubOverview from "@/pages/club/ClubOverview";
import OwnerOverview from "@/pages/owner/OwnerOverview";
```

### Component Composition Pattern

```typescript
// ✅ RECOMMENDED
export default function ClubOverview() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader title="Club Overview" />
        <DashboardMetrics />
        <RecentItems />
      </div>
    </AppShell>
  );
}

// ❌ AVOID
export default function ClubOverview() {
  // Complex logic mixed with UI
  // No clear component hierarchy
  return <div>...</div>;
}
```

### API Usage Pattern

```typescript
// ✅ WITH REACT QUERY
function PlayerList() {
  const { data: players, isLoading, error } = useQuery({
    queryKey: ['players', clubId],
    queryFn: () => api.getPlayers(clubId),
  });

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorCard error={error} />;
  return <div>{/* render players */}</div>;
}

// ❌ MANUAL STATE (Avoid)
function PlayerList() {
  const [players, setPlayers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // ... manual fetch logic
}
```

---

## ✅ COMPLETION CHECKLIST - 12 WEEKS

### Phase A: Stabilization (Week 1-2)
- [ ] Testing infrastructure setup
- [ ] 5-10 critical path tests written
- [ ] strictNullChecks enabled
- [ ] Type errors fixed
- [ ] Team documentation created
- [ ] Pre-commit hooks configured

### Phase B: Migration (Week 3-5)
- [ ] Match module created (40 files)
- [ ] Competition module created (17 files)
- [ ] Finance module created (15 files)
- [ ] Organization module created (10 files)
- [ ] All imports updated
- [ ] Routes verified working
- [ ] Build passing

### Phase C: Type Safety (Week 6-8)
- [ ] noImplicitAny enabled
- [ ] noUnusedLocals enabled
- [ ] 0 type errors
- [ ] 40%+ test coverage
- [ ] Integration tests written
- [ ] Advanced contexts created

### Phase D: Optimization (Week 9-10)
- [ ] Bundle analyzed
- [ ] Code splitting implemented
- [ ] Accessibility audit complete
- [ ] A11y issues fixed
- [ ] ESLint enhanced
- [ ] Performance metrics tracked

### Phase E: Documentation (Week 11-12)
- [ ] Architecture docs complete
- [ ] Developer guides written  
- [ ] Storybook setup complete
- [ ] API documentation ready
- [ ] Team training conducted
- [ ] Release notes prepared

---

## 🎓 LEARNING RESOURCES

### TypeScript Type Safety
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Strict Mode Guide](https://www.typescriptlang.org/tsconfig#strict)

### Testing React
- [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/)
- [Vitest Guide](https://vitest.dev/)

### Architecture Patterns
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
- [Module Pattern](https://pattern.co/)

### Performance
- [React Performance](https://react.dev/reference/react)
- [Bundle Analysis](https://bundlephobia.com/)

---

## 🤝 TEAM COORDINATION

### Recommended Team Structure

**Option 1: Serial Execution (1 dev)**
- Weeks 1-2: One dev handles stabilization
- Weeks 3-5: Same dev handles migration
- Weeks 6-12: Same dev with one additional dev
- **Timeline:** 12 weeks, lower cost, longer duration

**Option 2: Parallel Execution (2 devs)**
- Week 1: Stabilization (1 dev) + Documentation (1 dev)
- Week 2-3: Testing + Module Creation (parallel)
- Week 4-8: Testing expansion + Module migration (parallel)
- **Timeline:** 8-10 weeks, higher efficiency

**Option 3: Aggressive Parallel (3 devs)**
- Dev 1: Testing & type safety
- Dev 2: Module migration
- Dev 3: Documentation & tooling
- **Timeline:** 6-8 weeks, requires senior oversight

---

## 📞 GETTING HELP

When you need help:

1. **Check patterns:** Reference existing modules (owner/, eo/, club/)
2. **Test locally:** Run `npm run test:watch` while developing
3. **Type check:** Use `npm run build` to catch TS errors
4. **Code review:** Have team review complex refactoring
5. **Document decisions:** Add ADRs (Architecture Decision Records) for major changes

---

**Last Updated:** March 16, 2026 | **Ready for:** Implementation | **Next Action:** Approve Phase A timeline
