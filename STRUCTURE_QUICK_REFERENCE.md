# SoccerOS Structure - Updated Quick Reference Guide

**For rapid lookup of pages, organization patterns, and structure insights.**

---

## 1. PAGES BY DIRECTORY (Complete Count - 275+ Pages)

| Directory | Files | Type | Organization |
|-----------|-------|------|--------------|
| `admin/` | 39 | Platform automation | Flat (needs grouping) |
| `analytics/` | 24 | Cross-domain analytics | 4 subdirectories (match, player, standings, team) |
| `club/` | 48 | Club management | 8 subdirectories (academy, analytics, core, fan, finance, operations, player, roster, staff, training) |
| `competition/` | 64 | Competition lifecycle | Flat - **NEEDS REORGANIZATION** |
| `eo/` | 8 | Event organizer | Flat |
| `finance/` | 40 | Financial operations | 10 subdirectories |
| `match/` | 10 | Match management | 6 subdirectories |
| `organization/` | 40 | Multi-entity structure | Flat |
| `owner/` | 6 | Owner/superuser | Flat |
| `public/` | 5 | Guest access | Flat |
| **Root** | 2 | App navigation | Index.tsx, NotFound.tsx |
| **TOTAL** | **275+** | | |

---

---

## 2. Critical Issues Summary

### 🔴 HIGH PRIORITY

| Issue | Location | Impact | 
|-------|----------|--------|
| **Monolithic directory** | `competition/` (64 pages) | Hard to navigate |
| **Flat admin module** | `admin/` (39 pages) | Unclear organization |
| **Duplicate functionality** | Multiple registrations | Maintenance nightmare |
| **Analytics fragmentation** | 4 separate analytics modules | Confusion |
| **Unclear "core" folder** | `club/core/` | Ambiguous naming |
| **Scattered public pages** | `public/` AND `competition/Public*` | Inconsistent |

---

## 3. Pages by Functional Domain

### **Player Management**
- **Primary:** `club/player/` (10 pages) - Master data, contracts, transfers
- **Secondary:** `club/academy/` (5 pages) - Youth development
- **Roster:** `club/roster/` (5 pages) - Squad composition
- **Analytics:** `analytics/player/` (5 pages) - Performance metrics
- **Registration:** `competition/ParticipantRegistration.tsx`

### **Match Lifecycle**
- **Setup:** `match/setup/` - MatchScheduler, RefereeAssignment
- **Lineup:** `match/lineup/` - LineupSubmission
- **Events:** `match/events/` - MatchEvents (live recording)
- **Data:** `match/data/` - Statistics, Timeline, Ratings
- **Analytics:** `match/analytics/` - TacticalAnalysis
- **Archive:** `match/archive/` - Historical data

### **Team/Squad Management**
- `club/core/` - Club identity & basic info
- `club/roster/` - Squad & lineup management
- `club/staff/` - Coaching staff (5 pages)
- `competition/Team*` - Team registration, confirmation, withdrawal

### **Financial Operations**
- **Accounting:** `finance/accounting/` (5 pages)
- **Payments:** `finance/payments/` (5 pages)
- **Payouts:** `finance/payouts/` (5 pages)
- **Subscriptions:** `finance/subscriptions/` (5 pages)
- **Compliance:** `finance/compliance/` (5 pages)
- **Club-level:** `club/finance/` (5 pages)

### **Reporting & Analytics**
- **Platform:** `admin/GlobalAnalytics`
- **Cross-domain:** `analytics/` (24 pages in 4 subdirs)
- **Competition:** `competition/CompetitionAnalytics`
- **Financial:** `finance/analytics/` (5 pages)
- **Club:** `club/analytics/` (5 pages)

### **System Administration**
- **Monitoring:** 5+ *Monitoring pages
- **Configuration:** *Configuration, Platform* pages
- **Security:** AccessLogs, SecurityAlerts
- **API:** APIKeyManagement, APIMonitoring, APIUsageAnalytics
- **Integration:** IntegrationSettings, WebhookManagement
- **Data:** SystemBackup, SystemRestore, DataImport, DataExport

---

## 4. Component Structure

```
components/
├── layout/ (3)
│   ├── AppShell - Main container
│   ├── AppSidebar - Navigation sidebar  
│   └── TopHeader - Top navigation bar
│
├── shared/ (8)
│   ├── ChartUtils - Charting utilities
│   ├── DataTable - Generic data table
│   ├── LoadingSkeleton - Loading skeleton
│   ├── MatchCard - Match display card
│   ├── StatCard - Statistics card
│   ├── StatusBadge - Single status indicator
│   ├── StatusBadges - Multiple indicators
│   └── StandingsTable - League standings
│
├── match/ (1)
│   └── PitchVisualization - Interactive pitch diagram
│
├── ui/ (50+)
│   └── Shadcn/UI primitive components
│
└── Root (3)
    ├── ConfirmDialog - Confirmation modal
    ├── ErrorBoundary - Error boundary wrapper
    └── NavLink - Navigation link wrapper
```

**Issue:** Only 8 shared components for 275+ pages suggests opportunities for reusable component extraction.

---

## 5. Technology Stack
  accent?: "primary" | "gold" | "navy";
  className?: string;
}
```

## Configuration Quick Facts

| Setting | Value | Note |
|---------|-------|------|
| TypeScript Target | ES2020 | Modern syntax support |
| JSX Handling | react-jsx | No React import needed |
| Path Alias | @/* → src/* | Consistent import style |
| Strict Mode | ❌ false | Recommendation: enable |
| Module Resolution | bundler | Vite-compatible |

## Utilities & Helpers

### Core Utilities (`/src/lib/`)
- `utils.ts` - `cn()` for class merging
- `accessibility.ts` - A11y hooks (focus trap, skip links)
- `validation.ts` - Form validation logic
- `advancedValidation.ts` - Complex validation
- `mockData.ts` - Mock competition/match data
- `mockClubData.ts` - Mock club/player data

### Shared Hooks
- `use-toast()` - Toast notifications
- `use-mobile()` - Mobile device detection
- `useFocusTrap()` - Modal focus management
- `useSkipLink()` - Keyboard navigation
- `useKeyboardNavigation()` - List keyboard control

## Dependencies at a Glance

| Category | Package | Version |
|----------|---------|---------|
| **UI Framework** | React | 19+ |
| **Styling** | Tailwind CSS | 3.4 |
| **Components** | shadcn/ui | Latest |
| **Icons** | lucide-react | Latest |
| **Forms** | React Hook Form | 7.50+ |
| **Query State** | @tanstack/react-query | 5.83 |
| **Charts** | recharts | 2.x |
| **Routing** | React Router | v6 |
| **Build Tool** | Vite | 5.x |
| **Testing** | Vitest + Playwright | Latest |

---

## 6. CSS/Styling Patterns

### **Tailwind Configuration**
- Dark mode enabled via class strategy
- Custom color variables (HSL-based)
- Geist font family (Google Fonts)
- Custom container sizes
- Extended theme with primary-glow color

### **Consistent Patterns Observed**
```typescript
// Spacing pattern
className="space-y-6"  // Vertical spacing
className="gap-4"      // Grid gaps

// Responsive grid
className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"

// Card pattern
<Card className="p-4">...</Card>

// Accessibility
role="main"
aria-label="description"
id="page-title"
```

---

## 7. Known Page Ambiguities

| Duplicate/Similar | Location 1 | Location 2 | Issue |
|------------------|-----------|-----------|-------|
| **RefereeAssignment** | `match/setup/` | `competition/` | Two separate assignments? |
| **OrganizationHierarchy** | `competition/` | `organization/` | Duplicate or different scope? |
| **Standings** | `analytics/standings/` | `competition/Public*` | Multiple access points |
| **Team Performance** | `analytics/team/` | `competition/TeamPerformance` | Redundant? |
| **PublicStatistics** | `competition/` | `public/` | Unclear separation |
| **Notifications** | `competition/` | `organization/` | Unified or separate? |

---

## 8. Recommended Reorganization (Priority)

### **Phase 1: High Impact**
1. **Split `competition/` into 7 subdirectories:**
   - `setup/` - Creation, categories, setup
   - `rules/` - All rule-related pages
   - `registration/` - Registration workflows
   - `teams/` - Team management
   - `scheduling/` - Match scheduling & fixtures
   - `awards/` - Medals, prizes, awards
   - `public/` - Public-facing pages

2. **Organize `admin/` into 4 subdirectories:**
   - `monitoring/` - Health, performance, errors
   - `configuration/` - Settings, platform config
   - `security/` - Access, alerts, compliance
   - `integrations/` - API, webhooks, integrations

### **Phase 2: Consolidation**
3. Clarify analytics hierarchy
4. Consolidate duplicate registration pages
5. Document public/private page separation

### **Phase 3: Documentation**
6. Add module-level README files
7. Create page directory mapping
8. Document routing patterns

---

## 9. Quick Lookup: Pages by Role

### **Owner/Super Admin**
`owner/` (6 pages) - Full platform control

### **Event Organizer**
`eo/` (8 pages) - Competition-specific management

### **Club Administrator**
`club/` (48 pages) - Full club operations

### **Athlete/Player**
`club/player/` (10 pages) - Personal management

### **Viewer/Public**
`public/` (5 pages) - No login required

---

**Last Updated:** March 16, 2026  
**Total Pages Analyzed:** 275+  
**Maintenance Notes:** Update when adding new modules or reorganizing existing ones

### 1. Export Patterns ⚠️⚠️
- Mixed default/named exports in shared components
- **Fix:** Standardize on named exports

### 2. Accessibility 🔴
- Inconsistent ARIA usage
- Some pages missing landmarks
- **Fix:** Apply consistent structure to all pages

### 3. Type Safety ⚠️
- TypeScript strict mode disabled
- Some data structures untyped
- **Fix:** Enable strict mode, add interface definitions

### 4. Error Handling 🔴
- No API error handling layer
- Forms lack validation display
- **Fix:** Implement error handling pattern

### 5. State Management ⚠️
- No shared state management library
- State logic scattered across components
- Only 1 context provider (Role)
- **Fix:** Extract to custom hooks or state library

## Performance Observations

| Aspect | Status | Notes |
|--------|--------|-------|
| Code Splitting | ✅ Good | Module-based structure enables splitting |
| Bundle Size | ℹ️ Unknown | Dependency set is reasonable |
| Component Reuse | ✅ Good | Shared components well-designed |
| Lazy Loading | ℹ️ Not Found | No visible lazy loading in routes |
| Caching | 📦 React Query | Good for API data |

## New Developer Checklist

When creating new pages or components:

### New Page Component
```typescript
// 1. Create in /src/pages/[module]/PageName.tsx
// 2. Export as: export default function PageName() { }
// 3. Add role="main" to main content wrapper
// 4. Use LoadingSkeleton for loading states
// 5. Import shared components from @/components/shared/
// 6. Use @/ alias for all imports
// 7. Define interfaces for props
// 8. Add aria- attributes to sections
```

### New Shared Component
```typescript
// 1. Create in /src/components/shared/ComponentName.tsx
// 2. Export as: export const ComponentName = (props) => { }
// 3. Define ComponentNameProps interface
// 4. Add JSDoc comment above component
// 5. Use cn() for className merging
// 6. Support className prop for customization
// 7. Use only shadcn/ui components
// 8. Ensure accessibility attributes
```

### New Utility
```typescript
// 1. Create in /src/lib/[utility].ts
// 2. Type all parameters and return values
// 3. Add JSDoc documentation
// 4. Export named functions
// 5. Keep functions pure (no side effects)
```

## Recommended Next Steps

### Immediate (This Sprint)
1. ✏️ Standardize shared component exports (all named exports)
2. ♿ Add missing ARIA landmarks to 10-15 pages
3. 📝 Document component guidelines

### Short-term (1-2 Sprints)
1. 🪝 Create custom hooks for form state
2. ❌ Implement error handling layer
3. 📚 Add JSDoc to shared components

### Medium-term (Next Month)
1. 🔒 Enable TypeScript strict mode
2. 🧪 Establish testing patterns
3. 🔐 Implement auth/permission layer

## Key Files to Remember

| File | Purpose | Change Frequency |
|------|---------|------------------|
| `src/App.tsx` | Route definitions | Rare |
| `vite.config.ts` | Build config | Rare |
| `tsconfig.json` | Type checking | Rare |
| `tailwind.config.ts` | Design tokens | Sometimes |
| `src/components/ui/*` | shadcn components | Never (readonly) |
| `src/lib/utils.ts` | Core utilities | Sometimes |
| `src/context/RoleContext.tsx` | Role state | Sometimes |
| `src/components/layout/AppShell.tsx` | App wrapper | Rare |

## Communication Patterns

### Role Types
- `owner` - Platform owner
- `eo` - Event Organizer
- `club` - Club admin
- `admin` - System administrator

### Module Responsibilities

| Module | Owns | Interfaces |
|--------|------|-----------|
| **admin** | Platform settings, monitoring | All users |
| **club** | Team data, players, matches | Club staffing |
| **competition** | Tournaments, rules, brackets | EO, Club |
| **eo** | Event management | Competitions, clubs |
| **finance** | Payments, subscriptions | Orgs, clubs |
| **match** | Match operations | Clubs, EO |
| **organization** | Org structure | All roles |

---

**Last Updated:** March 16, 2026
