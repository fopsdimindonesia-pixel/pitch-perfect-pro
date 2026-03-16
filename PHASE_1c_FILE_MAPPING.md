# PHASE 1c FILE MAPPING
## Complete Club System File Reference - 62 Files Catalogued

**Document Version:** 1.0  
**Created:** March 2026  
**Status:** ✅ COMPLETE FILE INVENTORY  
**Total Files:** 62  
**File Size:** ~40 pages (comprehensive reference)  

---

## TABLE OF CONTENTS

1. [Quick Reference Summary](#quick-reference-summary)
2. [Root-Level Files (7 files) → Redistribution](#root-level-files-7-files--redistribution)
3. [Module-by-Module File Listing](#module-by-module-file-listing)
4. [Complete File Matrix](#complete-file-matrix)
5. [Import/Export Verification](#importexport-verification)
6. [Component Naming Verification](#component-naming-verification)

---

## QUICK REFERENCE SUMMARY

### File Count by Module

| Module | Current Files | Root Added | New Total | Status |
|--------|-----------------|-----------|-----------|--------|
| dashboard | 1 (ClubDashboard) | ClubOverview | 2 | New |
| core | 5 | 0 | 5 | Preserved |
| players | 10 | Players | 11 | Expanded |
| roster | 5 | Roster | 6 | Expanded |
| staff | 5 | 0 | 5 | Preserved |
| training | 5 | 0 | 5 | Preserved |
| academy | 5 | 0 | 5 | Preserved |
| analytics | 5 | MatchHistory | 6 | Expanded |
| finance | 5 | ClubFinancial | 6 | Expanded |
| operations | 5 | MatchDay | 6 | Expanded |
| fan | 5 | ECard | 6 | Expanded |
| **TOTAL** | **56** | **7** | **62** | **Complete** |

---

## ROOT-LEVEL FILES (7 files) → REDISTRIBUTION

These 7 files currently exist at `src/pages/club/` root and will be moved to appropriate modules:

### 1. ClubOverview.tsx
**Current:** `src/pages/club/ClubOverview.tsx`  
**New Location:** `src/modules/club/dashboard/`  
**New Import:** `import { ClubOverview } from './modules/club/dashboard'`  
**Reasoning:** Primary overview, belongs in dashboard module  
**Related Components:** ClubDashboard.tsx (now in same module)  
**Component Type:** Main page/container  

### 2. ClubFinancial.tsx
**Current:** `src/pages/club/ClubFinancial.tsx`  
**New Location:** `src/modules/club/finance/`  
**New Import:** `import { ClubFinancial } from './modules/club/finance'`  
**Reasoning:** Financial overview, belongs in finance module  
**Related Components:** FinancialDashboard.tsx, BudgetManagement.tsx (in same module)  
**Component Type:** Page/dashboard  

### 3. Players.tsx
**Current:** `src/pages/club/Players.tsx`  
**New Location:** `src/modules/club/players/`  
**New Import:** `import { Players } from './modules/club/players'`  
**Reasoning:** Main player management, belongs in players module  
**Related Components:** PlayerProfile.tsx, PlayerRegistration.tsx (10 others in same module)  
**Component Type:** Main container  

### 4. Roster.tsx
**Current:** `src/pages/club/Roster.tsx`  
**New Location:** `src/modules/club/roster/`  
**New Import:** `import { Roster } from './modules/club/roster'`  
**Reasoning:** Squad roster, belongs in roster module  
**Related Components:** RosterManagement.tsx, SquadPositions.tsx (in same module)  
**Component Type:** Main container  

### 5. MatchDay.tsx
**Current:** `src/pages/club/MatchDay.tsx`  
**New Location:** `src/modules/club/operations/`  
**New Import:** `import { MatchDay } from './modules/club/operations'`  
**Reasoning:** Match day is operational event, not historical data  
**Related Components:** EventManagement.tsx (in operations module)  
**Component Type:** Page/container  
**Note:** Distinct from MatchHistory.tsx (which is analytics)  

### 6. MatchHistory.tsx
**Current:** `src/pages/club/MatchHistory.tsx`  
**New Location:** `src/modules/club/analytics/`  
**New Import:** `import { MatchHistory } from './modules/club/analytics'`  
**Reasoning:** Historical match data = analytics, not operations  
**Related Components:** PerformanceAnalytics.tsx (in analytics module)  
**Component Type:** Page/analytics view  
**Note:** Distinct from MatchDay.tsx (which is current operations)  

### 7. ECard.tsx
**Current:** `src/pages/club/ECard.tsx`  
**New Location:** `src/modules/club/fan/`  
**New Import:** `import { ECard } from './modules/club/fan'`  
**Reasoning:** Electronic card is fan engagement tool  
**Related Components:** FanEngagement.tsx, TicketSales.tsx (in fan module)  
**Component Type:** Engagement tool/page  

---

## MODULE-BY-MODULE FILE LISTING

### Module 1: dashboard/ (2 files)

**Purpose:** Club overview and main dashboard entry point

| # | Filename | Current Source | Type | Export |
|---|----------|-----------------|------|--------|
| 1 | ClubOverview.tsx | pages/club/ | Page | default + named |
| 2 | ClubDashboard.tsx | pages/club/core/ | Dashboard | default + named |

**Directory Structure:**
```
src/modules/club/dashboard/
├── index.ts
├── ClubOverview.tsx (ROOT → NEW)
└── ClubDashboard.tsx (core/ → preserved)
```

**Barrel Export (`index.ts`):**
```typescript
export { default as ClubOverview } from './ClubOverview';
export { default as ClubDashboard } from './ClubDashboard';
```

---

### Module 2: core/ (5 files)

**Purpose:** Core club profile, identity, and configuration

| # | Filename | Current Source | Type | Export |
|---|----------|-----------------|------|--------|
| 1 | ClubProfile.tsx | pages/club/core/ | Page | default + named |
| 2 | ClubBranding.tsx | pages/club/core/ | Page | default + named |
| 3 | ClubHistory.tsx | pages/club/core/ | Page | default + named |
| 4 | ClubAchievements.tsx | pages/club/core/ | Page | default + named |
| 5 | (ClubDashboard.tsx moved to dashboard/) | — | — | — |

**Directory Structure:**
```
src/modules/club/core/
├── index.ts
├── ClubProfile.tsx
├── ClubBranding.tsx
├── ClubHistory.tsx
└── ClubAchievements.tsx
```

**Barrel Export (`index.ts`):**
```typescript
export { default as ClubProfile } from './ClubProfile';
export { default as ClubBranding } from './ClubBranding';
export { default as ClubHistory } from './ClubHistory';
export { default as ClubAchievements } from './ClubAchievements';
```

---

### Module 3: players/ (11 files) ⭐ LARGEST

**Purpose:** Complete player management - profiles, registration, transfers, contracts, history

| # | Filename | Current Source | Type | Export |
|---|----------|-----------------|------|--------|
| 1 | Players.tsx | pages/club/ (ROOT) | Container | default + named |
| 2 | PlayerProfile.tsx | pages/club/player/ | Page | default + named |
| 3 | PlayerRegistration.tsx | pages/club/player/ | Page | default + named |
| 4 | PlayerTransfer.tsx | pages/club/player/ | Page | default + named |
| 5 | PlayerContract.tsx | pages/club/player/ | Page | default + named |
| 6 | PlayerInjuryRecord.tsx | pages/club/player/ | Page | default + named |
| 7 | PlayerHistory.tsx | pages/club/player/ | Page | default + named |
| 8 | PlayerDocuments.tsx | pages/club/player/ | Page | default + named |
| 9 | PlayerPhoto.tsx | pages/club/player/ | Page | default + named |
| 10 | PlayerVerification.tsx | pages/club/player/ | Page | default + named |
| 11 | PlayerSuspension.tsx | pages/club/player/ | Page | default + named |

**Directory Structure:**
```
src/modules/club/players/
├── index.ts
├── Players.tsx (ROOT → new)
├── PlayerProfile.tsx
├── PlayerRegistration.tsx
├── PlayerTransfer.tsx
├── PlayerContract.tsx
├── PlayerInjuryRecord.tsx
├── PlayerHistory.tsx
├── PlayerDocuments.tsx
├── PlayerPhoto.tsx
├── PlayerVerification.tsx
└── PlayerSuspension.tsx
```

**Barrel Export (`index.ts`):**
```typescript
export { default as Players } from './Players';
export { default as PlayerProfile } from './PlayerProfile';
export { default as PlayerRegistration } from './PlayerRegistration';
export { default as PlayerTransfer } from './PlayerTransfer';
export { default as PlayerContract } from './PlayerContract';
export { default as PlayerInjuryRecord } from './PlayerInjuryRecord';
export { default as PlayerHistory } from './PlayerHistory';
export { default as PlayerDocuments } from './PlayerDocuments';
export { default as PlayerPhoto } from './PlayerPhoto';
export { default as PlayerVerification } from './PlayerVerification';
export { default as PlayerSuspension } from './PlayerSuspension';
```

---

### Module 4: roster/ (6 files)

**Purpose:** Squad roster management - positions, contracts, availability, playing time

| # | Filename | Current Source | Type | Export |
|---|----------|-----------------|------|--------|
| 1 | Roster.tsx | pages/club/ (ROOT) | Container | default + named |
| 2 | RosterManagement.tsx | pages/club/roster/ | Page | default + named |
| 3 | SquadPositions.tsx | pages/club/roster/ | Page | default + named |
| 4 | ContractStatus.tsx | pages/club/roster/ | Page | default + named |
| 5 | PlayerAvailability.tsx | pages/club/roster/ | Page | default + named |
| 6 | PlayingTime.tsx | pages/club/roster/ | Page | default + named |

**Directory Structure:**
```
src/modules/club/roster/
├── index.ts
├── Roster.tsx (ROOT → new)
├── RosterManagement.tsx
├── SquadPositions.tsx
├── ContractStatus.tsx
├── PlayerAvailability.tsx
└── PlayingTime.tsx
```

**Barrel Export (`index.ts`):**
```typescript
export { default as Roster } from './Roster';
export { default as RosterManagement } from './RosterManagement';
export { default as SquadPositions } from './SquadPositions';
export { default as ContractStatus } from './ContractStatus';
export { default as PlayerAvailability } from './PlayerAvailability';
export { default as PlayingTime } from './PlayingTime';
```

---

### Module 5: staff/ (5 files)

**Purpose:** Staff management - coaches, medical staff, administrative roles

| # | Filename | Current Source | Type | Export |
|---|----------|-----------------|------|--------|
| 1 | StaffRegistry.tsx | pages/club/staff/ | Page | default + named |
| 2 | CoachManagement.tsx | pages/club/staff/ | Page | default + named |
| 3 | MedicalStaff.tsx | pages/club/staff/ | Page | default + named |
| 4 | StaffRoles.tsx | pages/club/staff/ | Page | default + named |
| 5 | TeamManager.tsx | pages/club/staff/ | Page | default + named |

**Directory Structure:**
```
src/modules/club/staff/
├── index.ts
├── StaffRegistry.tsx
├── CoachManagement.tsx
├── MedicalStaff.tsx
├── StaffRoles.tsx
└── TeamManager.tsx
```

**Barrel Export (`index.ts`):**
```typescript
export { default as StaffRegistry } from './StaffRegistry';
export { default as CoachManagement } from './CoachManagement';
export { default as MedicalStaff } from './MedicalStaff';
export { default as StaffRoles } from './StaffRoles';
export { default as TeamManager } from './TeamManager';
```

---

### Module 6: training/ (5 files)

**Purpose:** Training sessions, coaching, and development

| # | Filename | Current Source | Type | Export |
|---|----------|-----------------|------|--------|
| 1 | TrainingSchedule.tsx | pages/club/training/ | Page | default + named |
| 2 | SessionPlanning.tsx | pages/club/training/ | Page | default + named |
| 3 | TrainingAttendance.tsx | pages/club/training/ | Page | default + named |
| 4 | FacilityManagement.tsx | pages/club/training/ | Page | default + named |
| 5 | CoachFeedback.tsx | pages/club/training/ | Page | default + named |

**Directory Structure:**
```
src/modules/club/training/
├── index.ts
├── TrainingSchedule.tsx
├── SessionPlanning.tsx
├── TrainingAttendance.tsx
├── FacilityManagement.tsx
└── CoachFeedback.tsx
```

**Barrel Export (`index.ts`):**
```typescript
export { default as TrainingSchedule } from './TrainingSchedule';
export { default as SessionPlanning } from './SessionPlanning';
export { default as TrainingAttendance } from './TrainingAttendance';
export { default as FacilityManagement } from './FacilityManagement';
export { default as CoachFeedback } from './CoachFeedback';
```

---

### Module 7: academy/ (5 files)

**Purpose:** Youth development, talent identification, age categories

| # | Filename | Current Source | Type | Export |
|---|----------|-----------------|------|--------|
| 1 | AcademyRegistration.tsx | pages/club/academy/ | Page | default + named |
| 2 | AgeCategory.tsx | pages/club/academy/ | Page | default + named |
| 3 | YouthTeams.tsx | pages/club/academy/ | Page | default + named |
| 4 | PlayerPromotion.tsx | pages/club/academy/ | Page | default + named |
| 5 | TalentDevelopment.tsx | pages/club/academy/ | Page | default + named |

**Directory Structure:**
```
src/modules/club/academy/
├── index.ts
├── AcademyRegistration.tsx
├── AgeCategory.tsx
├── YouthTeams.tsx
├── PlayerPromotion.tsx
└── TalentDevelopment.tsx
```

**Barrel Export (`index.ts`):**
```typescript
export { default as AcademyRegistration } from './AcademyRegistration';
export { default as AgeCategory } from './AgeCategory';
export { default as YouthTeams } from './YouthTeams';
export { default as PlayerPromotion } from './PlayerPromotion';
export { default as TalentDevelopment } from './TalentDevelopment';
```

---

### Module 8: analytics/ (6 files)

**Purpose:** Performance analysis, statistics, match analysis, trends

| # | Filename | Current Source | Type | Export |
|---|----------|-----------------|------|--------|
| 1 | PerformanceAnalytics.tsx | pages/club/analytics/ | Page | default + named |
| 2 | PlayerStatistics.tsx | pages/club/analytics/ | Page | default + named |
| 3 | MatchAnalysis.tsx | pages/club/analytics/ | Page | default + named |
| 4 | CompetitionStatistics.tsx | pages/club/analytics/ | Page | default + named |
| 5 | InjuryTrends.tsx | pages/club/analytics/ | Page | default + named |
| 6 | MatchHistory.tsx | pages/club/ (ROOT) | Page | default + named |

**Directory Structure:**
```
src/modules/club/analytics/
├── index.ts
├── PerformanceAnalytics.tsx
├── PlayerStatistics.tsx
├── MatchAnalysis.tsx
├── CompetitionStatistics.tsx
├── InjuryTrends.tsx
└── MatchHistory.tsx (ROOT → new)
```

**Barrel Export (`index.ts`):**
```typescript
export { default as PerformanceAnalytics } from './PerformanceAnalytics';
export { default as PlayerStatistics } from './PlayerStatistics';
export { default as MatchAnalysis } from './MatchAnalysis';
export { default as CompetitionStatistics } from './CompetitionStatistics';
export { default as InjuryTrends } from './InjuryTrends';
export { default as MatchHistory } from './MatchHistory';
```

---

### Module 9: finance/ (6 files)

**Purpose:** Financial management - budget, payroll, revenue, reports

| # | Filename | Current Source | Type | Export |
|---|----------|-----------------|------|--------|
| 1 | FinancialDashboard.tsx | pages/club/finance/ | Page | default + named |
| 2 | BudgetManagement.tsx | pages/club/finance/ | Page | default + named |
| 3 | PayrollManagement.tsx | pages/club/finance/ | Page | default + named |
| 4 | RevenueStreams.tsx | pages/club/finance/ | Page | default + named |
| 5 | FinancialReports.tsx | pages/club/finance/ | Page | default + named |
| 6 | ClubFinancial.tsx | pages/club/ (ROOT) | Page | default + named |

**Directory Structure:**
```
src/modules/club/finance/
├── index.ts
├── FinancialDashboard.tsx
├── BudgetManagement.tsx
├── PayrollManagement.tsx
├── RevenueStreams.tsx
├── FinancialReports.tsx
└── ClubFinancial.tsx (ROOT → new)
```

**Barrel Export (`index.ts`):**
```typescript
export { default as FinancialDashboard } from './FinancialDashboard';
export { default as BudgetManagement } from './BudgetManagement';
export { default as PayrollManagement } from './PayrollManagement';
export { default as RevenueStreams } from './RevenueStreams';
export { default as FinancialReports } from './FinancialReports';
export { default as ClubFinancial } from './ClubFinancial';
```

---

### Module 10: operations/ (6 files)

**Purpose:** Event and facility management - match days, guests, security

| # | Filename | Current Source | Type | Export |
|---|----------|-----------------|------|--------|
| 1 | OperationsDashboard.tsx | pages/club/operations/ | Page | default + named |
| 2 | EventManagement.tsx | pages/club/operations/ | Page | default + named |
| 3 | GuestManagement.tsx | pages/club/operations/ | Page | default + named |
| 4 | InventoryManagement.tsx | pages/club/operations/ | Page | default + named |
| 5 | SecurityManagement.tsx | pages/club/operations/ | Page | default + named |
| 6 | MatchDay.tsx | pages/club/ (ROOT) | Page | default + named |

**Directory Structure:**
```
src/modules/club/operations/
├── index.ts
├── OperationsDashboard.tsx
├── EventManagement.tsx
├── GuestManagement.tsx
├── InventoryManagement.tsx
├── SecurityManagement.tsx
└── MatchDay.tsx (ROOT → new)
```

**Barrel Export (`index.ts`):**
```typescript
export { default as OperationsDashboard } from './OperationsDashboard';
export { default as EventManagement } from './EventManagement';
export { default as GuestManagement } from './GuestManagement';
export { default as InventoryManagement } from './InventoryManagement';
export { default as SecurityManagement } from './SecurityManagement';
export { default as MatchDay } from './MatchDay';
```

---

### Module 11: fan/ (6 files)

**Purpose:** Community and engagement - tickets, merchandise, social, feedback

| # | Filename | Current Source | Type | Export |
|---|----------|-----------------|------|--------|
| 1 | FanEngagement.tsx | pages/club/fan/ | Page | default + named |
| 2 | TicketSales.tsx | pages/club/fan/ | Page | default + named |
| 3 | MerchandiseCatalog.tsx | pages/club/fan/ | Page | default + named |
| 4 | SocialMedia.tsx | pages/club/fan/ | Page | default + named |
| 5 | FanFeedback.tsx | pages/club/fan/ | Page | default + named |
| 6 | ECard.tsx | pages/club/ (ROOT) | Page | default + named |

**Directory Structure:**
```
src/modules/club/fan/
├── index.ts
├── FanEngagement.tsx
├── TicketSales.tsx
├── MerchandiseCatalog.tsx
├── SocialMedia.tsx
├── FanFeedback.tsx
└── ECard.tsx (ROOT → new)
```

**Barrel Export (`index.ts`):**
```typescript
export { default as FanEngagement } from './FanEngagement';
export { default as TicketSales } from './TicketSales';
export { default as MerchandiseCatalog } from './MerchandiseCatalog';
export { default as SocialMedia } from './SocialMedia';
export { default as FanFeedback } from './FanFeedback';
export { default as ECard } from './ECard';
```

---

## COMPLETE FILE MATRIX

### All 62 Files - Current → Target Mapping

| # | Component Name | Current Location | New Location | Module | Status |
|-|----------------|------------------|--------------|--------|--------|
| 1 | ClubOverview | pages/club/ | modules/club/dashboard/ | dashboard | Root→New |
| 2 | ClubDashboard | pages/club/core/ | modules/club/dashboard/ | dashboard | core→Moved |
| 3 | ClubProfile | pages/club/core/ | modules/club/core/ | core | Preserved |
| 4 | ClubBranding | pages/club/core/ | modules/club/core/ | core | Preserved |
| 5 | ClubHistory | pages/club/core/ | modules/club/core/ | core | Preserved |
| 6 | ClubAchievements | pages/club/core/ | modules/club/core/ | core | Preserved |
| 7 | Players | pages/club/ | modules/club/players/ | players | Root→New |
| 8 | PlayerProfile | pages/club/player/ | modules/club/players/ | players | Preserved |
| 9 | PlayerRegistration | pages/club/player/ | modules/club/players/ | players | Preserved |
| 10 | PlayerTransfer | pages/club/player/ | modules/club/players/ | players | Preserved |
| 11 | PlayerContract | pages/club/player/ | modules/club/players/ | players | Preserved |
| 12 | PlayerInjuryRecord | pages/club/player/ | modules/club/players/ | players | Preserved |
| 13 | PlayerHistory | pages/club/player/ | modules/club/players/ | players | Preserved |
| 14 | PlayerDocuments | pages/club/player/ | modules/club/players/ | players | Preserved |
| 15 | PlayerPhoto | pages/club/player/ | modules/club/players/ | players | Preserved |
| 16 | PlayerVerification | pages/club/player/ | modules/club/players/ | players | Preserved |
| 17 | PlayerSuspension | pages/club/player/ | modules/club/players/ | players | Preserved |
| 18 | Roster | pages/club/ | modules/club/roster/ | roster | Root→New |
| 19 | RosterManagement | pages/club/roster/ | modules/club/roster/ | roster | Preserved |
| 20 | SquadPositions | pages/club/roster/ | modules/club/roster/ | roster | Preserved |
| 21 | ContractStatus | pages/club/roster/ | modules/club/roster/ | roster | Preserved |
| 22 | PlayerAvailability | pages/club/roster/ | modules/club/roster/ | roster | Preserved |
| 23 | PlayingTime | pages/club/roster/ | modules/club/roster/ | roster | Preserved |
| 24 | StaffRegistry | pages/club/staff/ | modules/club/staff/ | staff | Preserved |
| 25 | CoachManagement | pages/club/staff/ | modules/club/staff/ | staff | Preserved |
| 26 | MedicalStaff | pages/club/staff/ | modules/club/staff/ | staff | Preserved |
| 27 | StaffRoles | pages/club/staff/ | modules/club/staff/ | staff | Preserved |
| 28 | TeamManager | pages/club/staff/ | modules/club/staff/ | staff | Preserved |
| 29 | TrainingSchedule | pages/club/training/ | modules/club/training/ | training | Preserved |
| 30 | SessionPlanning | pages/club/training/ | modules/club/training/ | training | Preserved |
| 31 | TrainingAttendance | pages/club/training/ | modules/club/training/ | training | Preserved |
| 32 | FacilityManagement | pages/club/training/ | modules/club/training/ | training | Preserved |
| 33 | CoachFeedback | pages/club/training/ | modules/club/training/ | training | Preserved |
| 34 | AcademyRegistration | pages/club/academy/ | modules/club/academy/ | academy | Preserved |
| 35 | AgeCategory | pages/club/academy/ | modules/club/academy/ | academy | Preserved |
| 36 | YouthTeams | pages/club/academy/ | modules/club/academy/ | academy | Preserved |
| 37 | PlayerPromotion | pages/club/academy/ | modules/club/academy/ | academy | Preserved |
| 38 | TalentDevelopment | pages/club/academy/ | modules/club/academy/ | academy | Preserved |
| 39 | PerformanceAnalytics | pages/club/analytics/ | modules/club/analytics/ | analytics | Preserved |
| 40 | PlayerStatistics | pages/club/analytics/ | modules/club/analytics/ | analytics | Preserved |
| 41 | MatchAnalysis | pages/club/analytics/ | modules/club/analytics/ | analytics | Preserved |
| 42 | CompetitionStatistics | pages/club/analytics/ | modules/club/analytics/ | analytics | Preserved |
| 43 | InjuryTrends | pages/club/analytics/ | modules/club/analytics/ | analytics | Preserved |
| 44 | MatchHistory | pages/club/ | modules/club/analytics/ | analytics | Root→New |
| 45 | FinancialDashboard | pages/club/finance/ | modules/club/finance/ | finance | Preserved |
| 46 | BudgetManagement | pages/club/finance/ | modules/club/finance/ | finance | Preserved |
| 47 | PayrollManagement | pages/club/finance/ | modules/club/finance/ | finance | Preserved |
| 48 | RevenueStreams | pages/club/finance/ | modules/club/finance/ | finance | Preserved |
| 49 | FinancialReports | pages/club/finance/ | modules/club/finance/ | finance | Preserved |
| 50 | ClubFinancial | pages/club/ | modules/club/finance/ | finance | Root→New |
| 51 | OperationsDashboard | pages/club/operations/ | modules/club/operations/ | operations | Preserved |
| 52 | EventManagement | pages/club/operations/ | modules/club/operations/ | operations | Preserved |
| 53 | GuestManagement | pages/club/operations/ | modules/club/operations/ | operations | Preserved |
| 54 | InventoryManagement | pages/club/operations/ | modules/club/operations/ | operations | Preserved |
| 55 | SecurityManagement | pages/club/operations/ | modules/club/operations/ | operations | Preserved |
| 56 | MatchDay | pages/club/ | modules/club/operations/ | operations | Root→New |
| 57 | FanEngagement | pages/club/fan/ | modules/club/fan/ | fan | Preserved |
| 58 | TicketSales | pages/club/fan/ | modules/club/fan/ | fan | Preserved |
| 59 | MerchandiseCatalog | pages/club/fan/ | modules/club/fan/ | fan | Preserved |
| 60 | SocialMedia | pages/club/fan/ | modules/club/fan/ | fan | Preserved |
| 61 | FanFeedback | pages/club/fan/ | modules/club/fan/ | fan | Preserved |
| 62 | ECard | pages/club/ | modules/club/fan/ | fan | Root→New |

---

## IMPORT/EXPORT VERIFICATION

### Current Import Patterns to Update

**In `src/App.tsx`, these imports need updating:**

```typescript
// BEFORE: Direct file imports
import ClubOverview from "./pages/club/ClubOverview";
import ClubFinancial from "./pages/club/ClubFinancial";
import Players from "./pages/club/Players";
import Roster from "./pages/club/Roster";
import MatchDay from "./pages/club/MatchDay";
import MatchHistory from "./pages/club/MatchHistory";
import ECard from "./pages/club/ECard";

// AFTER: Barrel exports
import { 
  ClubOverview,
  ClubFinancial,
  Players,
  Roster,
  MatchDay,
  MatchHistory,
  ECard
} from "./modules/club";
```

### Expected Import Count

- **Module main components** (used in routes): ~7-10 imports
- **Sub-components** (used in nested routes): ~20-30 imports
- **Total imports to update**: ~30-40 statements

All should come from:
- `./modules/club` (main barrel), OR
- `./modules/club/[module]` (module-specific, if needed)

Never from:
- ❌ `./pages/club/*`

---

## COMPONENT NAMING VERIFICATION

### Expected Component Names (Current state)

All components should follow `[Entity][Feature].tsx` naming:

✓ ClubOverview.tsx  
✓ ClubDashboard.tsx  
✓ ClubProfile.tsx  
✓ ClubBranding.tsx  
✓ ClubHistory.tsx  
✓ ClubAchievements.tsx  
✓ Players.tsx  
✓ PlayerProfile.tsx  
✓ PlayerRegistration.tsx  
✓ PlayerTransfer.tsx  
✓ PlayerContract.tsx  
✓ PlayerInjuryRecord.tsx  
✓ PlayerHistory.tsx  
✓ PlayerDocuments.tsx  
✓ PlayerPhoto.tsx  
✓ PlayerVerification.tsx  
✓ PlayerSuspension.tsx  
✓ Roster.tsx  
✓ RosterManagement.tsx  
✓ SquadPositions.tsx  
✓ ContractStatus.tsx  
✓ PlayerAvailability.tsx  
✓ PlayingTime.tsx  
✓ StaffRegistry.tsx  
✓ CoachManagement.tsx  
✓ MedicalStaff.tsx  
✓ StaffRoles.tsx  
✓ TeamManager.tsx  
✓ TrainingSchedule.tsx  
✓ SessionPlanning.tsx  
✓ TrainingAttendance.tsx  
✓ FacilityManagement.tsx  
✓ CoachFeedback.tsx  
✓ AcademyRegistration.tsx  
✓ AgeCategory.tsx  
✓ YouthTeams.tsx  
✓ PlayerPromotion.tsx  
✓ TalentDevelopment.tsx  
✓ PerformanceAnalytics.tsx  
✓ PlayerStatistics.tsx  
✓ MatchAnalysis.tsx  
✓ CompetitionStatistics.tsx  
✓ InjuryTrends.tsx  
✓ MatchHistory.tsx  
✓ FinancialDashboard.tsx  
✓ BudgetManagement.tsx  
✓ PayrollManagement.tsx  
✓ RevenueStreams.tsx  
✓ FinancialReports.tsx  
✓ ClubFinancial.tsx  
✓ OperationsDashboard.tsx  
✓ EventManagement.tsx  
✓ GuestManagement.tsx  
✓ InventoryManagement.tsx  
✓ SecurityManagement.tsx  
✓ MatchDay.tsx  
✓ FanEngagement.tsx  
✓ TicketSales.tsx  
✓ MerchandiseCatalog.tsx  
✓ SocialMedia.tsx  
✓ FanFeedback.tsx  
✓ ECard.tsx  

**Status:** ✅ All 62 component names follow naming convention

---

## FILES DELETED (if any)

After Phase 1c, these files can be deleted:

**From `src/pages/club/`:**
- [ ] ClubOverview.tsx (moved to modules/club/dashboard/)
- [ ] ClubFinancial.tsx (moved to modules/club/finance/)
- [ ] Players.tsx (moved to modules/club/players/)
- [ ] Roster.tsx (moved to modules/club/roster/)
- [ ] MatchDay.tsx (moved to modules/club/operations/)
- [ ] MatchHistory.tsx (moved to modules/club/analytics/)
- [ ] ECard.tsx (moved to modules/club/fan/)

**From subdirectories:**
- [ ] All files in `src/pages/club/core/` (moved)
- [ ] All files in `src/pages/club/player/` (moved)
- [ ] All files in `src/pages/club/roster/` (moved)
- [ ] All files in `src/pages/club/staff/` (moved)
- [ ] All files in `src/pages/club/training/` (moved)
- [ ] All files in `src/pages/club/academy/` (moved)
- [ ] All files in `src/pages/club/analytics/` (moved)
- [ ] All files in `src/pages/club/finance/` (moved)
- [ ] All files in `src/pages/club/operations/` (moved)
- [ ] All files in `src/pages/club/fan/` (moved)

**Optional cleanup:**
```bash
rm -rf src/pages/club/
```

(After verifying all files moved and routes working)

---

## QUICK COPY COMMANDS

Use these commands for Day 2 file copying:

**Main barrel template:**
```bash
# Create main barrel
cat > src/modules/club/index.ts << 'EOF'
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
EOF
```

**Module barrel template (example for players/):**
```bash
# Create module barrel
cat > src/modules/club/players/index.ts << 'EOF'
export { default as Players } from './Players';
export { default as PlayerProfile } from './PlayerProfile';
// ... add all components
EOF
```

---

*Phase 1c File Mapping — Complete Reference*  
*62 Club Files Catalogued and Mapped*  
*Ready for Migration Execution*
