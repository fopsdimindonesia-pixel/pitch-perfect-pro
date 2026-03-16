# PHASE 1b MIGRATION SPECIFICATION
## EO (Event Organizer) System Reorganization

**Document Version:** 1.0  
**Created:** March 2026  
**Status:** Ready for Execution  
**Scope:** 8 files → 5 organized subfolders  
**Estimated Duration:** 2-3 hours  

---

## TABLE OF CONTENTS

1. [Executive Summary](#executive-summary)
2. [Current State Analysis](#current-state-analysis)
3. [Target Architecture](#target-architecture)
4. [Detailed Folder Structure](#detailed-folder-structure)
5. [File Migration Mapping](#file-migration-mapping)
6. [Component Name Changes](#component-name-changes)
7. [Import Update Strategy](#import-update-strategy)
8. [Route Migration Strategy](#route-migration-strategy)
9. [Build Verification Checkpoints](#build-verification-checkpoints)
10. [Execution Process Overview](#execution-process-overview)
11. [Risk Assessment & Mitigation](#risk-assessment--mitigation)

---

## EXECUTIVE SUMMARY

### What is Phase 1b?
Phase 1b migrates the EO (Event Organizer) system from a flat `src/pages/eo/` structure to an organized modular structure under `src/modules/eo/`. This follows the same successful pattern established in Phase 1 (Owner system).

### Why Phase 1b?
- **Consistency:** Aligns EO domain with Phase 1 Owner domain organization
- **Scalability:** Prepares for future admin/club system migrations
- **Maintainability:** Clear separation of concerns by event organizer responsibility
- **Knowledge Transfer:** Leverages established Phase 1 patterns and processes

### What Changes?
```
BEFORE (Phase 1a):
src/pages/eo/
├── EOOverview.tsx
├── Competitions.tsx
├── CreateCompetition.tsx
├── ClubRegistrations.tsx
├── Standings.tsx
├── Schedule.tsx
├── Reports.tsx
└── MatchSheet.tsx

AFTER (Phase 1b):
src/modules/eo/
├── index.ts (barrel export)
├── dashboard/
│   ├── index.ts
│   └── EOOverview.tsx
├── competitions/
│   ├── index.ts
│   ├── Competitions.tsx
│   └── CreateCompetition.tsx
├── registrations/
│   ├── index.ts
│   └── ClubRegistrations.tsx
├── standings/
│   ├── index.ts
│   └── Standings.tsx
├── schedule/
│   ├── index.ts
│   └── Schedule.tsx
└── reports/
    ├── index.ts
    ├── Reports.tsx
    └── MatchSheet.tsx
```

### Key Statistics

| Metric | Value |
|--------|-------|
| **Files to Migrate** | 8 |
| **Target Subfolders** | 5 |
| **Component Renames** | 0 (names already aligned with filenames) |
| **Import Updates Required** | ~20-30 in App.tsx + routes |
| **New Barrel Exports** | 6 (one per subdomain + main) |
| **Estimated Build Time** | ~11-12 seconds |
| **Expected Build Errors** | 0 |
| **Expected Runtime Errors** | 0 (after fixes) |

---

## CURRENT STATE ANALYSIS

### Existing EO System Location
```
src/pages/eo/
├── EOOverview.tsx (main dashboard)
├── Competitions.tsx (view all competitions)
├── CreateCompetition.tsx (create new competition)
├── ClubRegistrations.tsx (club registrations)
├── Standings.tsx (league standings)
├── Schedule.tsx (match schedule)
├── Reports.tsx (system reports)
└── MatchSheet.tsx (match details)
```

### Current File Count
- **Total EO Files:** 8
- **Component Files:** 8 (EOOverview, Competitions, CreateCompetition, ClubRegistrations, Standings, Schedule, Reports, MatchSheet)

### Current Import Patterns
Files currently imported in `src/App.tsx` using:
```typescript
import { EOOverview, Competitions, CreateCompetition, ClubRegistrations, Standings, Schedule, Reports, MatchSheet } from "./pages/eo/...";
```

### Current Route Structure
Routes in `src/App.tsx`:
```typescript
<Route path="/eo/overview" element={<EOOverview />} />
<Route path="/eo/competitions" element={<Competitions />} />
<Route path="/eo/create-competition" element={<CreateCompetition />} />
<Route path="/eo/registrations" element={<ClubRegistrations />} />
<Route path="/eo/standings" element={<Standings />} />
<Route path="/eo/schedule" element={<Schedule />} />
<Route path="/eo/reports" element={<Reports />} />
<Route path="/eo/match-sheet" element={<MatchSheet />} />
```

---

## TARGET ARCHITECTURE

### Folder Structure Strategy

**Principle:** Group related features into logical domains
- **dashboard:** EO dashboard overview
- **competitions:** Competition management (creation, viewing)
- **registrations:** Club registration management
- **standings:** League standings and rankings
- **schedule:** Match scheduling
- **reports:** System reporting and analytics
- **match-data:** Match details and sheets (separate from schedule)

### Design Decisions

**Why These 5 Subfolders?**

1. **dashboard** - Single file (EOOverview) functions as system entry point
   - Justification: Mirrors Phase 1 dashboard structure
   - Components: EOOverview only

2. **competitions** - Features related to competition creation and management
   - Justification: CreateCompetition + Competitions are tightly related
   - Components: Competitions, CreateCompetition

3. **registrations** - Club registration management
   - Justification: Separate responsibility from competitions
   - Components: ClubRegistrations

4. **standings** - League standings and rankings
   - Justification: Distinct feature with clear purpose
   - Components: Standings

5. **schedule** - Match scheduling and management
   - Justification: Separate from standings/match details
   - Components: Schedule

6. **reports** - Reporting, analytics, and match details
   - Justification: MatchSheet is essentially match report/details
   - Components: Reports, MatchSheet

### Barrel Export Pattern

Each subdomain will have:
- **index.ts** - Re-exports all components in that domain
- Allows cleaner imports: `from "@/modules/eo/competitions"` → `{ Competitions, CreateCompetition }`

Main `src/modules/eo/index.ts` will re-export all subdomains for convenience.

---

## DETAILED FOLDER STRUCTURE

### After-State Directory Tree

```
src/modules/eo/
├── index.ts                          # Main barrel export
│
├── dashboard/
│   ├── index.ts
│   └── EOOverview.tsx
│
├── competitions/
│   ├── index.ts
│   ├── Competitions.tsx
│   └── CreateCompetition.tsx
│
├── registrations/
│   ├── index.ts
│   └── ClubRegistrations.tsx
│
├── standings/
│   ├── index.ts
│   └── Standings.tsx
│
├── schedule/
│   ├── index.ts
│   └── Schedule.tsx
│
└── reports/
    ├── index.ts
    ├── Reports.tsx
    └── MatchSheet.tsx
```

### Folder Descriptions

#### dashboard/
- **Purpose:** EO system dashboard and overview
- **Files:** 1 (EOOverview.tsx)
- **Responsibility:** Display key metrics, active competitions, pending registrations
- **Barrel Export:** Exports EOOverview as `{ EOOverview }`

#### competitions/
- **Purpose:** Competition discovery and creation
- **Files:** 2 (Competitions.tsx, CreateCompetition.tsx)
- **Responsibility:** List available competitions, create new ones
- **Barrel Export:** Exports `{ Competitions, CreateCompetition }`

#### registrations/
- **Purpose:** Club registration management
- **Files:** 1 (ClubRegistrations.tsx)
- **Responsibility:** View and manage pending/approved club registrations
- **Barrel Export:** Exports `{ ClubRegistrations }`

#### standings/
- **Purpose:** League standings and rankings
- **Files:** 1 (Standings.tsx)
- **Responsibility:** Display league tables and rankings
- **Barrel Export:** Exports `{ Standings }`

#### schedule/
- **Purpose:** Match scheduling
- **Files:** 1 (Schedule.tsx)
- **Responsibility:** View and manage match schedules
- **Barrel Export:** Exports `{ Schedule }`

#### reports/
- **Purpose:** Reporting and match details
- **Files:** 2 (Reports.tsx, MatchSheet.tsx)
- **Responsibility:** System reports, match details, analytics
- **Barrel Export:** Exports `{ Reports, MatchSheet }`

---

## FILE MIGRATION MAPPING

### Complete File Movement Plan

| Current Location | New Location | Component Name | Notes |
|-----------------|--------------|----------------|-------|
| src/pages/eo/EOOverview.tsx | src/modules/eo/dashboard/EOOverview.tsx | EOOverview | No rename |
| src/pages/eo/Competitions.tsx | src/modules/eo/competitions/Competitions.tsx | Competitions | No rename |
| src/pages/eo/CreateCompetition.tsx | src/modules/eo/competitions/CreateCompetition.tsx | CreateCompetition | No rename |
| src/pages/eo/ClubRegistrations.tsx | src/modules/eo/registrations/ClubRegistrations.tsx | ClubRegistrations | No rename |
| src/pages/eo/Standings.tsx | src/modules/eo/standings/Standings.tsx | Standings | No rename |
| src/pages/eo/Schedule.tsx | src/modules/eo/schedule/Schedule.tsx | Schedule | No rename |
| src/pages/eo/Reports.tsx | src/modules/eo/reports/Reports.tsx | Reports | No rename |
| src/pages/eo/MatchSheet.tsx | src/modules/eo/reports/MatchSheet.tsx | MatchSheet | No rename |

### Component Export Verification

All EO components already export with names matching their filenames:
- ✅ EOOverview.tsx → `export default function EOOverview()`
- ✅ Competitions.tsx → `export default function Competitions()`
- ✅ CreateCompetition.tsx → `export default function CreateCompetition()`
- ✅ ClubRegistrations.tsx → `export default function ClubRegistrations()`
- ✅ Standings.tsx → `export default function Standings()`
- ✅ Schedule.tsx → `export default function Schedule()`
- ✅ Reports.tsx → `export default function Reports()`
- ✅ MatchSheet.tsx → `export default function MatchSheet()`

**No component renames required!** All files already follow naming conventions.

---

## COMPONENT NAME CHANGES

### Summary
**No component name changes required!**

All EO components already export with names matching their filenames, which is the convention we're establishing. Unlike Phase 1 where 9 components needed renaming (e.g., AdminDashboard → OwnerDashboard), the EO system is already clean.

### Verification Checklist
- [ ] EOOverview.tsx exports `EOOverview` ✓
- [ ] Competitions.tsx exports `Competitions` ✓
- [ ] CreateCompetition.tsx exports `CreateCompetition` ✓
- [ ] ClubRegistrations.tsx exports `ClubRegistrations` ✓
- [ ] Standings.tsx exports `Standings` ✓
- [ ] Schedule.tsx exports `Schedule` ✓
- [ ] Reports.tsx exports `Reports` ✓
- [ ] MatchSheet.tsx exports `MatchSheet` ✓

---

## IMPORT UPDATE STRATEGY

### Current Import Pattern (Before Migration)
```typescript
// In src/App.tsx
import { EOOverview } from "./pages/eo/EOOverview";
import { Competitions, CreateCompetition } from "./pages/eo/Competitions";
// ... etc
```

### New Import Pattern (After Migration)
```typescript
// Using barrel exports
import { EOOverview } from "./modules/eo/dashboard";
import { Competitions, CreateCompetition } from "./modules/eo/competitions";
import { ClubRegistrations } from "./modules/eo/registrations";
import { Standings } from "./modules/eo/standings";
import { Schedule } from "./modules/eo/schedule";
import { Reports, MatchSheet } from "./modules/eo/reports";
```

### Alternative (More Concise)
```typescript
// Using main barrel export
import { EOOverview, Competitions, CreateCompetition, ClubRegistrations, Standings, Schedule, Reports, MatchSheet } from "./modules/eo";
```

### Import Update Locations
1. **src/App.tsx** - Main import/export section (~20-30 lines to update)
2. **Route definitions** - May reference components (already in App.tsx)
3. **Navigation components** - AppSidebar.tsx may reference these (already updated in Phase 1)

### Estimated Import Changes
- EO import block: 8 import statements to update
- Total lines modified: ~15-20 lines
- Complexity: **Low** (straightforward path updates)

---

## ROUTE MIGRATION STRATEGY

### Current Routes (Before Migration)
```typescript
<Route path="/eo/overview" element={<EOOverview />} />
<Route path="/eo/competitions" element={<Competitions />} />
<Route path="/eo/create-competition" element={<CreateCompetition />} />
<Route path="/eo/registrations" element={<ClubRegistrations />} />
<Route path="/eo/standings" element={<Standings />} />
<Route path="/eo/schedule" element={<Schedule />} />
<Route path="/eo/reports" element={<Reports />} />
<Route path="/eo/match-sheet" element={<MatchSheet />} />
```

### Target Routes (After Migration)
Routes remain the same since they use `/eo/` prefix. No route path changes needed.
- ✓ /eo/overview
- ✓ /eo/competitions
- ✓ /eo/create-competition
- ✓ /eo/registrations
- ✓ /eo/standings
- ✓ /eo/schedule
- ✓ /eo/reports
- ✓ /eo/match-sheet

### Navigation Structure
EO navigation already exists in AppSidebar.tsx (set up during Phase 1):
```typescript
const eoNav = [
  { label: "Overview", href: "/eo/overview" },
  { label: "Kompetisi", href: "/eo/competitions" },
  { label: "Buat Kompetisi", href: "/eo/create-competition" },
  { label: "Registrasi Klub", href: "/eo/registrations" },
  { label: "Klasemen", href: "/eo/standings" },
  { label: "Jadwal", href: "/eo/schedule" },
  { label: "Laporan", href: "/eo/reports" },
  { label: "Match Sheet", href: "/eo/match-sheet" }
];
```

**No route changes required** - routes remain `/eo/*`

---

## BUILD VERIFICATION CHECKPOINTS

### Day 1 (Folder Creation)
**Checkpoint 1: Verify folder structure created**
```bash
# Expected: 5 subfolders exist
ls src/modules/eo/
# Output should show:
# dashboard/
# competitions/
# registrations/
# standings/
# schedule/
# reports/
```

**Checkpoint 2: Run build after folder creation**
```bash
npm run build
# Expected output: success, 0 errors
```

### Day 2 (File Moves & Barrel Exports)
**Checkpoint 3: Verify all files moved**
```bash
# Expected: 8 files in src/pages/eo (should still be there, being copied)
ls src/pages/eo/
# Expected: 6 index.ts files created
find src/modules/eo -name "index.ts"
```

**Checkpoint 4: Run build after file copies**
```bash
npm run build
# Expected output: success, 0 errors
# Note: Will likely fail due to broken imports (expected)
```

**Checkpoint 5: Run build after barrel exports created**
```bash
npm run build
# Expected output: success, 0 errors
```

### Day 3 (Import Updates)
**Checkpoint 6: Update all imports in App.tsx**

**Checkpoint 7: Run build after import updates**
```bash
npm run build
# Expected output: success, 0 errors, ~11-12 seconds
```

**Checkpoint 8: Start dev server for runtime testing**
```bash
npm run dev
# Expected: Server starts, app loads at http://localhost:8080/
```

**Checkpoint 9: Test EO routes in browser**
- Visit http://localhost:8080/eo/overview
- Visit http://localhost:8080/eo/competitions
- Visit http://localhost:8080/eo/registrations
- Verify: No console errors, components render correctly

---

## EXECUTION PROCESS OVERVIEW

### Phase 1b Execution Timeline

**Estimated Total Duration:** 2-3 hours across potentially 1-2 days

#### Day 1: Setup & Folder Creation (30 minutes)
1. Create parent folder: `src/modules/eo/`
2. Create 5 subfolders: dashboard, competitions, registrations, standings, schedule, reports
3. Verify structure with `ls` command
4. Run build verification (should succeed with 0 errors)

#### Day 2: File Moves & Barrel Exports (1-1.5 hours)
1. Copy 8 files from `src/pages/eo/` to appropriate `src/modules/eo/[subdomain]/`
2. Create 6 `index.ts` barrel export files
3. Verify all files in new locations
4. Run build verification (may show import errors - expected)

#### Day 3: Import Updates & Testing (30-45 minutes)
1. Update imports in `src/App.tsx` (8 import statements)
2. Update route definitions if needed (usually doesn't need changes)
3. Run build verification (should show 0 errors)
4. Start dev server and test routes in browser
5. Verify no console errors

---

## RISK ASSESSMENT & MITIGATION

### Risk 1: Breaking Other Components
**Severity:** Low  
**Probability:** Low  
**Mitigation:** EO components are self-contained, only imported in App.tsx. Monitor for any other references.

### Risk 2: Missing Route Updates
**Severity:** Low  
**Probability:** Very Low  
**Mitigation:** Routes rarely change - verify all `/eo/*` routes work after import updates

### Risk 3: Component Reference Errors
**Severity:** Medium  
**Probability:** Low  
**Mitigation:** Check for any refs to `../pages/eo` throughout codebase before migration

### Risk 4: Build Compilation Errors
**Severity:** Low  
**Probability:** Low  
**Mitigation:** Follow exact import patterns established in Phase 1. Use script templates provided.

### Rollback Plan
If any issue occurs:
```bash
# Complete rollback to start of Phase 1b
git reset --hard HEAD~1
# Or if multiple commits:
git log --oneline
git reset --hard [commit-hash-before-phase1b]
```

---

## EXECUTION READINESS CHECKLIST

Before starting Phase 1b, verify:

- [ ] Phase 1 (Owner system) is fully complete and verified
- [ ] Build shows 0 errors: `npm run build` runs successfully
- [ ] Git working tree is clean: `git status` shows "nothing to commit"
- [ ] Current branch is `feat/phase1-owner-system-reorganization` or similar
- [ ] All Phase 1b docs reviewed (this document finished reading)
- [ ] Terminal access available with npm/git
- [ ] VS Code open with source code visible
- [ ] 2-3 hours time available (can split across 2 days if needed)
- [ ] Backup understanding: Git can rollback any changes if needed

---

## KEY DIFFERENCES FROM PHASE 1

### Similarities
✓ Same folder creation pattern  
✓ Same barrel export structure  
✓ Same import update approach  
✓ Same build verification process  

### Differences
| Aspect | Phase 1 (Owner) | Phase 1b (EO) |
|--------|-----------------|----------------|
| Files | 45 (complex) | 8 (simple) |
| Subfolders | 11 | 5 |
| Component Renames | 9 needed | 0 needed |
| Duration | 4 hours | 2-3 hours |
| Route Changes | Significan (48+ routes) | None (/eo/* stays same) |
| Complexity | High | Low |
| Time Estimate | Most accurate | Could be faster |

### Learning Value
Phase 1b is simpler and will reinforce the patterns learned in Phase 1, making future migrations (club system, etc.) even faster.

---

## NEXT STEPS

1. **Read all Phase 1b planning documents:**
   - PHASE_1b_FILE_MAPPING.md (file reference)
   - PHASE_1b_ROUTES_STRATEGY.md (route reference)
   - PHASE_1b_EXECUTION_CHECKLIST.md (step-by-step commands)
   - PHASE_1b_READY_FOR_EXECUTION.md (final checklist)

2. **When ready to execute:**
   - Open PHASE_1b_EXECUTION_CHECKLIST.md
   - Follow Day 1 commands exactly as written
   - Copy/paste commands into terminal

3. **During execution:**
   - Reference PHASE_1b_FILE_MAPPING.md for file locations
   - Use build verification checkpoints to verify progress
   - Check PHASE_1b_EXECUTION_CHECKLIST.md troubleshooting if issues arise

---

**Document Status:** ✅ Ready for review  
**Next Document:** PHASE_1b_FILE_MAPPING.md (detailed file tracking)  
**Time to Read:** 60 minutes  
**Time to Execute:** 2-3 hours (after reading all docs)
