# PHASE 1b FILE MAPPING
## EO (Event Organizer) System - Detailed File Tracking

**Document Version:** 1.0  
**Created:** March 2026  
**Purpose:** File-by-file reference guide for Phase 1b execution  
**Total Files:** 8  
**Subfolders:** 6 (1 parent + 5 subdomains)  

---

## TABLE OF CONTENTS

1. [Migration Overview](#migration-overview)
2. [Dashboard Subsystem](#dashboard-subsystem)
3. [Competitions Subsystem](#competitions-subsystem)
4. [Registrations Subsystem](#registrations-subsystem)
5. [Standings Subsystem](#standings-subsystem)
6. [Schedule Subsystem](#schedule-subsystem)
7. [Reports Subsystem](#reports-subsystem)
8. [Barrel Export Templates](#barrel-export-templates)
9. [Import Update Tracker](#import-update-tracker)
10. [Consolidation Checklist](#consolidation-checklist)

---

## MIGRATION OVERVIEW

### File Count Summary

| Category | Files | Status |
|----------|-------|--------|
| Dashboard | 1 | Ready to move |
| Competitions | 2 | Ready to move |
| Registrations | 1 | Ready to move |
| Standings | 1 | Ready to move |
| Schedule | 1 | Ready to move |
| Reports | 2 | Ready to move |
| **Total** | **8** | **Ready to move** |

### Complete File Movement Table

| Source Path | Destination Path | Component Name | Type | Size |
|-------------|------------------|----------------|------|------|
| src/pages/eo/EOOverview.tsx | src/modules/eo/dashboard/EOOverview.tsx | EOOverview | Component | ~1.5KB |
| src/pages/eo/Competitions.tsx | src/modules/eo/competitions/Competitions.tsx | Competitions | Component | ~2KB |
| src/pages/eo/CreateCompetition.tsx | src/modules/eo/competitions/CreateCompetition.tsx | CreateCompetition | Component | ~2KB |
| src/pages/eo/ClubRegistrations.tsx | src/modules/eo/registrations/ClubRegistrations.tsx | ClubRegistrations | Component | ~2KB |
| src/pages/eo/Standings.tsx | src/modules/eo/standings/Standings.tsx | Standings | Component | ~1.5KB |
| src/pages/eo/Schedule.tsx | src/modules/eo/schedule/Schedule.tsx | Schedule | Component | ~2KB |
| src/pages/eo/Reports.tsx | src/modules/eo/reports/Reports.tsx | Reports | Component | ~1.5KB |
| src/pages/eo/MatchSheet.tsx | src/modules/eo/reports/MatchSheet.tsx | MatchSheet | Component | ~1KB |

---

## DASHBOARD SUBSYSTEM

### Folder Structure
```
src/modules/eo/dashboard/
├── index.ts (barrel export)
└── EOOverview.tsx (main component)
```

### File Details

#### EOOverview.tsx
- **Current Location:** `src/pages/eo/EOOverview.tsx`
- **New Location:** `src/modules/eo/dashboard/EOOverview.tsx`
- **Component Export:** `export default function EOOverview()`
- **Imports Used:**
  - `@/components/shared/StatCard`
  - `@/components/shared/MatchCard`
  - `@/components/shared/StandingsTable`
  - `lucide-react` (Trophy, UserCheck, Calendar, Clock)
  - `@/components/ui/card` (Card, CardContent, CardHeader, CardTitle)
  - `@/components/ui/badge` (Badge)
  - `@/lib/mockData`
- **Purpose:** EO system overview/dashboard
- **Description:** Displays key metrics for event organizer (active competitions, pending registrations, today's matches)

### Barrel Export: src/modules/eo/dashboard/index.ts
```typescript
export { default as EOOverview } from './EOOverview';
```

---

## COMPETITIONS SUBSYSTEM

### Folder Structure
```
src/modules/eo/competitions/
├── index.ts (barrel export)
├── Competitions.tsx (view all competitions)
└── CreateCompetition.tsx (create new competition)
```

### File Details

#### Competitions.tsx
- **Current Location:** `src/pages/eo/Competitions.tsx`
- **New Location:** `src/modules/eo/competitions/Competitions.tsx`
- **Component Export:** `export default function Competitions()`
- **Purpose:** View and manage all competitions
- **Description:** Lists all competitions with filtering/search options

#### CreateCompetition.tsx
- **Current Location:** `src/pages/eo/CreateCompetition.tsx`
- **New Location:** `src/modules/eo/competitions/CreateCompetition.tsx`
- **Component Export:** `export default function CreateCompetition()`
- **Purpose:** Create new competition form
- **Description:** Form for creating new competition

### Barrel Export: src/modules/eo/competitions/index.ts
```typescript
export { default as Competitions } from './Competitions';
export { default as CreateCompetition } from './CreateCompetition';
```

---

## REGISTRATIONS SUBSYSTEM

### Folder Structure
```
src/modules/eo/registrations/
├── index.ts (barrel export)
└── ClubRegistrations.tsx
```

### File Details

#### ClubRegistrations.tsx
- **Current Location:** `src/pages/eo/ClubRegistrations.tsx`
- **New Location:** `src/modules/eo/registrations/ClubRegistrations.tsx`
- **Component Export:** `export default function ClubRegistrations()`
- **Purpose:** Manage club registrations for competitions
- **Description:** View, approve, and manage pending club registrations

### Barrel Export: src/modules/eo/registrations/index.ts
```typescript
export { default as ClubRegistrations } from './ClubRegistrations';
```

---

## STANDINGS SUBSYSTEM

### Folder Structure
```
src/modules/eo/standings/
├── index.ts (barrel export)
└── Standings.tsx
```

### File Details

#### Standings.tsx
- **Current Location:** `src/pages/eo/Standings.tsx`
- **New Location:** `src/modules/eo/standings/Standings.tsx`
- **Component Export:** `export default function Standings()`
- **Purpose:** Display league standings
- **Description:** Shows league tables, rankings, and competition standings

### Barrel Export: src/modules/eo/standings/index.ts
```typescript
export { default as Standings } from './Standings';
```

---

## SCHEDULE SUBSYSTEM

### Folder Structure
```
src/modules/eo/schedule/
├── index.ts (barrel export)
└── Schedule.tsx
```

### File Details

#### Schedule.tsx
- **Current Location:** `src/pages/eo/Schedule.tsx`
- **New Location:** `src/modules/eo/schedule/Schedule.tsx`
- **Component Export:** `export default function Schedule()`
- **Purpose:** View and manage match schedule
- **Description:** Displays match calendar and scheduling

### Barrel Export: src/modules/eo/schedule/index.ts
```typescript
export { default as Schedule } from './Schedule';
```

---

## REPORTS SUBSYSTEM

### Folder Structure
```
src/modules/eo/reports/
├── index.ts (barrel export)
├── Reports.tsx (system reports)
└── MatchSheet.tsx (match details/sheet)
```

### File Details

#### Reports.tsx
- **Current Location:** `src/pages/eo/Reports.tsx`
- **New Location:** `src/modules/eo/reports/Reports.tsx`
- **Component Export:** `export default function Reports()`
- **Purpose:** System reporting and analytics
- **Description:** Reports, statistics, and system analytics

#### MatchSheet.tsx
- **Current Location:** `src/pages/eo/MatchSheet.tsx`
- **New Location:** `src/modules/eo/reports/MatchSheet.tsx`
- **Component Export:** `export default function MatchSheet()`
- **Purpose:** Match details and scoring sheet
- **Description:** Detailed match information with scoring

### Barrel Export: src/modules/eo/reports/index.ts
```typescript
export { default as Reports } from './Reports';
export { default as MatchSheet } from './MatchSheet';
```

---

## BARREL EXPORT TEMPLATES

### Master Barrel Export: src/modules/eo/index.ts

This is the main barrel export that re-exports everything from subdomains.

```typescript
// Dashboard
export { default as EOOverview } from './dashboard/EOOverview';

// Competitions
export { default as Competitions } from './competitions/Competitions';
export { default as CreateCompetition } from './competitions/CreateCompetition';

// Registrations
export { default as ClubRegistrations } from './registrations/ClubRegistrations';

// Standings
export { default as Standings } from './standings/Standings';

// Schedule
export { default as Schedule } from './schedule/Schedule';

// Reports
export { default as Reports } from './reports/Reports';
export { default as MatchSheet } from './reports/MatchSheet';
```

### Alternative Master Export (Using Subdomain Re-exports)

If you want even cleaner imports:

```typescript
export * from './dashboard';
export * from './competitions';
export * from './registrations';
export * from './standings';
export * from './schedule';
export * from './reports';
```

---

## IMPORT UPDATE TRACKER

### Current Imports in src/App.tsx

**Before Phase 1b:**
```typescript
import { EOOverview } from "./pages/eo/EOOverview";
import { Competitions, CreateCompetition } from "./pages/eo/Competitions";
// ... etc - various imports from pages/eo/*
```

### New Imports in src/App.tsx

**After Phase 1b (Using Subdomain Imports):**
```typescript
import { EOOverview } from "./modules/eo/dashboard";
import { Competitions, CreateCompetition } from "./modules/eo/competitions";
import { ClubRegistrations } from "./modules/eo/registrations";
import { Standings } from "./modules/eo/standings";
import { Schedule } from "./modules/eo/schedule";
import { Reports, MatchSheet } from "./modules/eo/reports";
```

**After Phase 1b (Using Main Barrel Export):**
```typescript
import { 
  EOOverview, 
  Competitions, 
  CreateCompetition, 
  ClubRegistrations, 
  Standings, 
  Schedule, 
  Reports, 
  MatchSheet 
} from "./modules/eo";
```

### Import Locations to Update

- [ ] src/App.tsx - Main imports (8 components)
- [ ] src/App.tsx - Route definitions (references to components - should work if imports fixed)
- [ ] Check for any other references in codebase (use grep if needed)

---

## CONSOLIDATION CHECKLIST

### Pre-Migration Verification

- [ ] Verify all 8 files exist in src/pages/eo/
  ```bash
  ls -la src/pages/eo/
  ```

- [ ] Verify component names match filenames
  ```bash
  grep "export default function" src/pages/eo/*.tsx
  ```

- [ ] Backup current working state
  ```bash
  git status  # Should be clean
  git log --oneline -1
  ```

### Day 1: Folder Creation

- [ ] Create src/modules/eo/
- [ ] Create src/modules/eo/dashboard/
- [ ] Create src/modules/eo/competitions/
- [ ] Create src/modules/eo/registrations/
- [ ] Create src/modules/eo/standings/
- [ ] Create src/modules/eo/schedule/
- [ ] Create src/modules/eo/reports/

### Day 2: File Moves

- [ ] Copy src/pages/eo/EOOverview.tsx → src/modules/eo/dashboard/
- [ ] Copy src/pages/eo/Competitions.tsx → src/modules/eo/competitions/
- [ ] Copy src/pages/eo/CreateCompetition.tsx → src/modules/eo/competitions/
- [ ] Copy src/pages/eo/ClubRegistrations.tsx → src/modules/eo/registrations/
- [ ] Copy src/pages/eo/Standings.tsx → src/modules/eo/standings/
- [ ] Copy src/pages/eo/Schedule.tsx → src/modules/eo/schedule/
- [ ] Copy src/pages/eo/Reports.tsx → src/modules/eo/reports/
- [ ] Copy src/pages/eo/MatchSheet.tsx → src/modules/eo/reports/

### Barrel Exports Creation

- [ ] Create src/modules/eo/dashboard/index.ts
- [ ] Create src/modules/eo/competitions/index.ts
- [ ] Create src/modules/eo/registrations/index.ts
- [ ] Create src/modules/eo/standings/index.ts
- [ ] Create src/modules/eo/schedule/index.ts
- [ ] Create src/modules/eo/reports/index.ts
- [ ] Create src/modules/eo/index.ts (master barrel)

### Day 3: Import Updates

- [ ] Update imports in src/App.tsx (8 import statements)
- [ ] Verify no broken imports: `npm run build`
- [ ] Test routes in browser: http://localhost:8080/eo/*

### Post-Migration Verification

- [ ] All 8 files in new locations under src/modules/eo/
- [ ] All 6 index.ts barrel exports created
- [ ] All imports in App.tsx updated
- [ ] Build succeeds: `npm run build` = 0 errors
- [ ] Dev server starts: `npm run dev`
- [ ] All routes work: /eo/overview, /eo/competitions, etc.
- [ ] No console errors in browser
- [ ] Git commit successful

---

## QUICK REFERENCE: FILES BY DOMAIN

### For Domain: dashboard
- **Files:** 1
- **Original Location:** src/pages/eo/EOOverview.tsx
- **New Location:** src/modules/eo/dashboard/EOOverview.tsx
- **Barrel Path:** ./dashboard/index.ts

### For Domain: competitions
- **Files:** 2
- **Original Locations:** 
  - src/pages/eo/Competitions.tsx
  - src/pages/eo/CreateCompetition.tsx
- **New Locations:**
  - src/modules/eo/competitions/Competitions.tsx
  - src/modules/eo/competitions/CreateCompetition.tsx
- **Barrel Path:** ./competitions/index.ts

### For Domain: registrations
- **Files:** 1
- **Original Location:** src/pages/eo/ClubRegistrations.tsx
- **New Location:** src/modules/eo/registrations/ClubRegistrations.tsx
- **Barrel Path:** ./registrations/index.ts

### For Domain: standings
- **Files:** 1
- **Original Location:** src/pages/eo/Standings.tsx
- **New Location:** src/modules/eo/standings/Standings.tsx
- **Barrel Path:** ./standings/index.ts

### For Domain: schedule
- **Files:** 1
- **Original Location:** src/pages/eo/Schedule.tsx
- **New Location:** src/modules/eo/schedule/Schedule.tsx
- **Barrel Path:** ./schedule/index.ts

### For Domain: reports
- **Files:** 2
- **Original Locations:**
  - src/pages/eo/Reports.tsx
  - src/pages/eo/MatchSheet.tsx
- **New Locations:**
  - src/modules/eo/reports/Reports.tsx
  - src/modules/eo/reports/MatchSheet.tsx
- **Barrel Path:** ./reports/index.ts

---

## COMPONENT VERIFICATION MATRIX

| Component | File | Exports As | Status |
|-----------|------|-----------|--------|
| EOOverview | EOOverview.tsx | EOOverview | ✓ Ready |
| Competitions | Competitions.tsx | Competitions | ✓ Ready |
| CreateCompetition | CreateCompetition.tsx | CreateCompetition | ✓ Ready |
| ClubRegistrations | ClubRegistrations.tsx | ClubRegistrations | ✓ Ready |
| Standings | Standings.tsx | Standings | ✓ Ready |
| Schedule | Schedule.tsx | Schedule | ✓ Ready |
| Reports | Reports.tsx | Reports | ✓ Ready |
| MatchSheet | MatchSheet.tsx | MatchSheet | ✓ Ready |

---

## EXECUTION COMMANDS REFERENCE

### Day 2: Copy Files (PowerShell)

```powershell
# Copy EOOverview.tsx to dashboard
Copy-Item -Path "src/pages/eo/EOOverview.tsx" -Destination "src/modules/eo/dashboard/EOOverview.tsx" -Force

# Copy Competitions files to competitions
Copy-Item -Path "src/pages/eo/Competitions.tsx" -Destination "src/modules/eo/competitions/Competitions.tsx" -Force
Copy-Item -Path "src/pages/eo/CreateCompetition.tsx" -Destination "src/modules/eo/competitions/CreateCompetition.tsx" -Force

# Copy ClubRegistrations to registrations
Copy-Item -Path "src/pages/eo/ClubRegistrations.tsx" -Destination "src/modules/eo/registrations/ClubRegistrations.tsx" -Force

# Copy Standings
Copy-Item -Path "src/pages/eo/Standings.tsx" -Destination "src/modules/eo/standings/Standings.tsx" -Force

# Copy Schedule
Copy-Item -Path "src/pages/eo/Schedule.tsx" -Destination "src/modules/eo/schedule/Schedule.tsx" -Force

# Copy Reports files to reports
Copy-Item -Path "src/pages/eo/Reports.tsx" -Destination "src/modules/eo/reports/Reports.tsx" -Force
Copy-Item -Path "src/pages/eo/MatchSheet.tsx" -Destination "src/modules/eo/reports/MatchSheet.tsx" -Force
```

---

**Document Status:** ✅ Ready for reference  
**Next Document:** PHASE_1b_ROUTES_STRATEGY.md  
**Time to Read:** 30 minutes  
**Time to Execute (Referenced During):** 2-3 hours
