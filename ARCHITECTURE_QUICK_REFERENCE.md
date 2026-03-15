# 🗂️ QUICK ARCHITECTURE REFERENCE

## Directory Tree (Simplified)

```
src/
├── App.tsx                     ← Main router configuration
├── main.tsx                    ← React entry point
├── modules/                    ← 🎯 DOMAIN-DRIVEN (129 files)
│   ├── owner/                  ← Platform Admin (12 modules, 45 files)
│   │   ├── dashboard/          ← Admin dashboard pages
│   │   ├── users/              ← User management
│   │   ├── finance/
│   │   ├── analytics/
│   │   ├── security/
│   │   ├── organizations/
│   │   ├── competitions/
│   │   ├── platform-management/
│   │   ├── infrastructure/
│   │   ├── developer-tools/
│   │   ├── compliance/
│   │   └── index.ts            ← Barrel export
│   │
│   ├── club/                   ← Club Management (11 modules, 65 files)
│   │   ├── dashboard/          ← ClubDashboard, ClubOverview
│   │   ├── core/               ← ClubProfile, Branding, History, Achievements
│   │   ├── players/            ← 12 player-related pages
│   │   ├── roster/             ← Squad management
│   │   ├── staff/              ← Staff management
│   │   ├── training/           ← Training programs
│   │   ├── academy/            ← Youth academy
│   │   ├── analytics/          ← Performance analytics
│   │   ├── finance/            ← Club finance
│   │   ├── operations/         ← Daily operations
│   │   ├── fan/                ← Fan engagement
│   │   └── index.ts            ← Barrel export
│   │
│   └── eo/                     ← Event Organizer (6 modules, 15 files)
│       ├── dashboard/          ← EOOverview
│       ├── competitions/       ← Competitions, CreateCompetition
│       ├── registrations/      ← ClubRegistrations
│       ├── standings/          ← Standings display
│       ├── schedule/           ← Match schedule
│       ├── reports/            ← Reports, MatchSheet
│       └── index.ts            ← Barrel export
│
├── pages/                      ← 🔄 LEGACY (234 files)
│   ├── Index.tsx
│   ├── NotFound.tsx
│   ├── match/                  ← 40+ match pages (⚠️ TO MIGRATE)
│   ├── competition/            ← 17+ competition pages
│   ├── finance/                ← 15+ finance pages
│   ├── organization/           ← 10+ organization pages
│   ├── analytics/              ← 8+ analytics pages
│   ├── admin/
│   ├── eo/
│   ├── owner/
│   ├── owner_BACKUP/           ← DELETE THIS
│   └── public/                 ← Public pages
│
├── components/                 ← 🎨 UI LAYER (71 files)
│   ├── ui/                     ← shadcn/ui & primitives (45 files)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   ├── table.tsx
│   │   ├── sidebar.tsx
│   │   ├── badge.tsx
│   │   ├── alert.tsx
│   │   └── ... 35 more
│   │
│   ├── shared/                 ← Reusable components (8 files)
│   │   ├── DataTable.tsx       ← Sortable, filterable tables
│   │   ├── MatchCard.tsx       ← Match display card
│   │   ├── StatCard.tsx        ← Statistics card
│   │   ├── StatusBadge.tsx     ← Status indicators
│   │   ├── ChartUtils.tsx      ← Chart helpers
│   │   ├── LoadingSkeleton.tsx ← Loading states
│   │   ├── StandingsTable.tsx  ← Standings display
│   │   └── StatusBadges.tsx
│   │
│   ├── layout/                 ← Layout wrappers (3 files)
│   │   ├── AppShell.tsx        ← Main layout wrapper
│   │   ├── AppSidebar.tsx      ← Navigation sidebar
│   │   └── TopHeader.tsx       ← Top navigation bar
│   │
│   ├── match/                  ← Match-specific components
│   │   └── PitchVisualization.tsx
│   │
│   ├── ErrorBoundary.tsx
│   ├── ConfirmDialog.tsx
│   └── NavLink.tsx
│
├── lib/                        ← 📦 SERVICES & UTILITIES (20 files)
│   ├── api.ts                  ← HTTP client (type-safe)
│   ├── validation.ts           ← Form validators
│   ├── advancedValidation.ts   ← Complex validation rules
│   ├── utils.ts                ← Helper functions
│   ├── accessibility.ts        ← a11y utilities
│   ├── a11y-templates.ts       ← Accessible patterns
│   ├── mockData.ts             ← Mock data for dev
│   ├── mockClubData.ts         ← Club-specific mocks
│   └── # Code Citations.md
│
├── hooks/                      ← 🪝 CUSTOM HOOKS (4 files)
│   ├── useApi.ts               ← Data fetching with caching
│   ├── useFormValidation.ts    ← Form DX improve utility hook
│   ├── use-toast.ts            ← Toast notifications
│   └── use-mobile.tsx          ← Mobile responsiveness detection
│
├── context/                    ← 🔗 STATE PROVIDERS (1 file)
│   └── RoleContext.tsx         ← User role: owner|eo|club|admin
│
└── test/                       ← 🧪 TESTS (2 files)
    ├── setup.ts
    └── example.test.ts
```

---

## Import Quick Reference

### ✅ CORRECT IMPORT PATTERNS

```typescript
// === UI Components ===
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input, Label, Select } from '@/components/ui/input';

// === Shared Components ===
import { DataTable } from '@/components/shared/DataTable';
import { StatCard, MatchCard } from '@/components/shared';

// === Layout ===
import { AppShell } from '@/components/layout/AppShell';

// === Modules (via barrel exports) ===
import { 
  ClubProfile, 
  ClubBranding, 
  Players, 
  PlayerProfile 
} from '@/modules/club';

import { 
  EOOverview, 
  Competitions, 
  CreateCompetition 
} from '@/modules/eo';

import { 
  OwnerOverview, 
  EOManagement, 
  OwnerFinancial 
} from '@/modules/owner';

// === Hooks ===
import { useApi } from '@/hooks/useApi';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useToast } from '@/hooks/use-toast';
import { useMobile } from '@/hooks/use-mobile';

// === Services ===
import { apiClient, ApiError } from '@/lib/api';
import { validateEmail, validatePhone } from '@/lib/validation';

// === Context ===
import { RoleProvider, useRole } from '@/context/RoleContext';
```

---

## Module Barrel Exports

### owner/index.ts
```typescript
export * from './dashboard';
export * from './users';
export * from './finance';
export * from './analytics';
export * from './security';
export * from './organizations';
export * from './competitions';
export * from './platform-management';
export * from './infrastructure';
export * from './developer-tools';
export * from './compliance';
```

### club/index.ts
```typescript
export * from './dashboard';
export * from './core';
export * from './players';
export * from './roster';
export * from './staff';
export * from './training';
export * from './academy';
export * from './analytics';
export * from './finance';
export * from './operations';
export * from './fan';
```

### eo/index.ts
```typescript
export { default as EOOverview } from './dashboard/EOOverview';
export { default as Competitions } from './competitions/Competitions';
export { default as CreateCompetition } from './competitions/CreateCompetition';
export { default as ClubRegistrations } from './registrations/ClubRegistrations';
export { default as Standings } from './standings/Standings';
export { default as Schedule } from './schedule/Schedule';
export { default as Reports } from './reports/Reports';
export { default as MatchSheet } from './reports/MatchSheet';
```

---

## Component Hierarchy

```
App.tsx (Root)
  └─ RoleProvider (Context)
      └─ QueryClientProvider (React Query)
          └─ BrowserRouter
              └─ Routes
                  ├─ AppShell (Layout)
                  │   ├─ TopHeader
                  │   ├─ AppSidebar
                  │   └─ <Outlet />
                  │       └─ Module Pages
                  │           ├─ useApi (hook)
                  │           ├─ UI Components
                  │           ├─ Shared Components
                  │           └─ Data Tables
                  └─ [Other routes]
```

---

## API Usage Pattern

```typescript
// 1. In hook
const { data: players, loading, error } = useApi('/api/players');

// 2. In Page Component
export default function PlayersPage() {
  const { data: players, loading } = useApi('/api/players');
  const { toast } = useToast();

  const handleAddPlayer = async (data: PlayerForm) => {
    try {
      const result = await apiClient.post('/api/players', data);
      toast.success('Player added!');
    } catch (err) {
      toast.error('Failed to add player');
    }
  };

  return (
    <div>
      <DataTable columns={columns} data={players} />
    </div>
  );
}
```

---

## File Count Summary

| Category | Files | %  |
|----------|-------|-----|
| Modules | 129 | 20% |
| Pages | 234 | 36% |
| Components | 71 | 11% |
| Services | 20 | 3% |
| Hooks | 4 | <1% |
| Context | 1 | <1% |
| Config | 9 | 1% |
| Tests | 2 | <1% |
| Other | 180+ | 28% |
| **TOTAL** | **~650** | **100%** |

---

## Technology Stack Quick Check

```
✅ React 18           Latest & stable
✅ TypeScript 5       Type safety (strictness: LOW)
✅ Vite 5             Fast builds
✅ React Router 6     Client-side routing
✅ Tailwind CSS 3     Utility styling
✅ shadcn/ui          45+ UI components
✅ React Query 5      Server state management
✅ React Hook Form    Form handling
✅ Vitest             Unit testing (configured, not used)
✅ Playwright         E2E testing (configured, not used)
⚠️ Tests              MISSING (0% coverage)
⚠️ Type Safety        RELAXED (could be stricter)
```

---

## Build Configuration

```
Config File         | Purpose
─────────────────────────────────────────
vite.config.ts      | Build optimization, aliases
tsconfig.json       | TypeScript settings
tsconfig.app.json   | App-specific TS
tailwind.config.ts  | Tailwind customization
components.json     | shadcn/ui setup
postcss.config.js   | CSS processing
eslint.config.js    | Linting rules
vitest.config.ts    | Unit test setup
playwright.config.ts| E2E test setup
```

---

## Quick Commands

```bash
# Development
npm run dev              # Start dev server (port 8080)

# Build
npm run build            # Production build
npm run build:dev        # Dev mode build

# Quality
npm run lint             # ESLint check
npm run test             # Run vitest (one-time)
npm run test:watch      # Watch mode testing

# Preview
npm run preview          # Preview production build
```

---

## Status Indicators

```
✅ COMPLETE    - Production ready
🟡 PARTIAL     - In progress
⚠️  NEEDS WORK  - Critical attention needed
❌ MISSING     - Not implemented
🔄 MIGRATING   - Transition phase
```

---

## Pain Points Summary

| Issue | Severity | Status |
|-------|----------|--------|
| Testing | 🔴 CRITICAL | ❌ 0% coverage |
| Type Safety | 🔴 HIGH | ⚠️ Relaxed config |
| Page Migration | 🟠 HIGH | 🟡 60% complete |
| State Management | 🟡 MEDIUM | 🟢 Functional |
| Documentation | 🟡 MEDIUM | 🟡 Partial |
| Error Handling | 🟡 MEDIUM | 🟢 Basic |
| Performance | 🟡 MEDIUM | ⚠️ Not measured |
| Accessibility | 🟡 MEDIUM | 🟢 Decent |

---

## Next Steps Priority

1. **THIS WEEK**: Setup testing infrastructure
2. **NEXT WEEK**: Write first 50 tests
3. **WEEK 3**: Complete page migration
4. **WEEK 4**: Enable TypeScript strict mode
5. **WEEK 5**: Performance optimization
6. **WEEK 6**: Add error tracking
7. **WEEK 7+**: Documentation & polish

---

**Document Version**: 1.0  
**Last Updated**: 16 Maret 2026  
**Created By**: Architecture Analysis  
**Status**: Ready for Implementation
