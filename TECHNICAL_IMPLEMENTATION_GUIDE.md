# 🔧 SoccerOS Technical Implementation Guide

**Status:** Ready for Execution  
**Scope:** Detailed file movements, import updates, routing changes  
**Automation Level:** High (70% scripted, 30% manual verification)

---

## 📋 DETAILED FILE MIGRATION MAPPING

### OWNER SYSTEM (Admin Pages) - Move from `pages/admin/` → `modules/owner/`

#### Dashboard
```
pages/admin/AdminDashboard.tsx
  → modules/owner/dashboard/OwnerDashboard.tsx
```

#### Platform Management
```
pages/admin/SystemConfiguration.tsx
  → modules/owner/platform-management/SystemConfiguration.tsx

pages/admin/FeatureFlags.tsx
  → modules/owner/platform-management/FeatureFlags.tsx

pages/admin/MaintenanceMode.tsx
  → modules/owner/platform-management/MaintenanceMode.tsx
```

#### User Management
```
pages/admin/UserManagement.tsx
  → modules/owner/users/UserManagement.tsx

pages/admin/RoleManagement.tsx
  → modules/owner/users/RoleManagement.tsx

pages/admin/PermissionManagement.tsx
  → modules/owner/users/PermissionManagement.tsx

pages/admin/UserMonitoring.tsx
  → modules/owner/users/UserMonitoring.tsx
```

#### Organization Oversight
```
pages/admin/OrganizationMonitoring.tsx
  → modules/owner/organizations/OrganizationMonitoring.tsx

pages/admin/OrganizationApprovals.tsx
  → modules/owner/organizations/OrganizationApprovals.tsx

pages/admin/BillingManagement.tsx
  → modules/owner/organizations/BillingManagement.tsx

pages/admin/SubscriptionManagement.tsx
  → modules/owner/organizations/SubscriptionManagement.tsx
```

#### Finance Management
```
pages/owner/OwnerFinancial.tsx
  → modules/owner/finance/OwnerFinancial.tsx
  OR rename to PlatformFinancial.tsx

pages/admin/GlobalAnalytics.tsx (Financial focus)
  → modules/owner/finance/PlatformRevenue.tsx

pages/admin/RevenueAnalytics.tsx
  → modules/owner/finance/PlatformRevenue.tsx (consolidate)

pages/admin/PaymentReconciliation.tsx
  → modules/owner/finance/PaymentReconciliation.tsx
```

#### Analytics & Monitoring
```
pages/admin/SystemMonitoring.tsx
  → modules/owner/infrastructure/SystemMonitoring.tsx

pages/admin/PerformanceMonitoring.tsx
  → modules/owner/infrastructure/PerformanceMonitoring.tsx

pages/admin/APIMonitoring.tsx
  → modules/owner/infrastructure/APIMonitoring.tsx

pages/admin/PlatformMetrics.tsx
  → modules/owner/analytics/PlatformMetrics.tsx

pages/admin/UserBehavior.tsx
  → modules/owner/analytics/UserBehavior.tsx
```

#### Security & Audit
```
pages/admin/AuditLog.tsx (if exists)
  OR pages/owner/AuditLog.tsx
  → modules/owner/security/AuditLog.tsx

pages/admin/SecurityAudit.tsx
  → modules/owner/security/SecurityAudit.tsx

pages/admin/IncidentManagement.tsx
  → modules/owner/security/IncidentManagement.tsx
```

#### Owner System Pages (Direct Move)
```
pages/owner/OwnerOverview.tsx
  → modules/owner/dashboard/OwnerDashboard.tsx (rename if needed)

pages/owner/ClubManagement.tsx
  → modules/owner/organizations/ClubManagement.tsx

pages/owner/EOManagement.tsx
  → modules/owner/organizations/EOManagement.tsx

pages/owner/SystemConfig.tsx
  → modules/owner/platform-management/SystemConfiguration.tsx (consolidate)
```

---

### EO SYSTEM - Reorganize existing `pages/eo/` → `modules/eo/`

#### Keep in place (already organized):
```
pages/eo/EOOverview.tsx
  → modules/eo/dashboard/EODashboard.tsx (rename)

pages/eo/Competitions.tsx
  → modules/eo/competitions/CompetitionList.tsx (rename)

pages/eo/CreateCompetition.tsx
  → modules/eo/competitions/CompetitionCreator.tsx (rename)

pages/eo/ClubRegistrations.tsx
  → modules/eo/teams/ClubRegistrations.tsx (reorganize)

pages/eo/MatchSheet.tsx
  → modules/eo/matches/MatchSheet.tsx (move to matches)

pages/eo/Schedule.tsx
  → modules/eo/matches/Schedule.tsx (move to matches)

pages/eo/Standings.tsx
  → modules/eo/rankings/Standings.tsx (move to rankings)

pages/eo/Reports.tsx
  → modules/eo/reports/Reports.tsx (keep place)
```

#### Consolidate duplicates:
```
RefereeAssignment appears in:
  - pages/match/setup/RefereeAssignment.tsx (match system)
  - pages/competition/RefereeAssignment.tsx (competition - duplicate)

Solution:
  - Keep: modules/eo/referees/RefereeAssignment.tsx
  - Delete: pages/competition/RefereeAssignment.tsx
  - Import in match system from EO module: 
    import RefereeAssignment from 'modules/eo/referees/RefereeAssignment'
```

---

### CLUB SYSTEM - Already well-organized, verify structure

```
pages/club/ClubOverview.tsx
  → modules/club/dashboard/ClubDashboard.tsx

pages/club/ClubFinancial.tsx
  → modules/club/finance/FinancialDashboard.tsx

pages/club/Roster.tsx
  → modules/club/roster/RosterManagement.tsx

pages/club/Players.tsx
  → modules/club/players/PlayerList.tsx

pages/club/core/*
  → modules/club/club-profile/*

pages/club/main/*
  → modules/club/* (merge into main directories)

pages/club/[academy|player|roster|analytics|finance|staff|training|fan]/*
  → modules/club/[academy|players|roster|analytics|finance|staff|training|fans]/*
```

**Action:** Minimal changes - already well-structured

---

### MATCH SYSTEM - Keep existing structure, slight reorganization

```
pages/match/setup/*
  → modules/matches/setup/*

pages/match/[other folders]/*
  → modules/matches/*

Move RefereeAssignment import to use EO version:
  OLD: import RefereeAssignment from './RefereeAssignment'
  NEW: import RefereeAssignment from 'modules/eo/referees/RefereeAssignment'
```

---

### FINANCE SYSTEM - Already well-organized

```
pages/finance/*
  → modules/finance/* (keep structure, verify subcategories)

pages/club/*/Finance*.tsx (e.g., FinancialDashboard.tsx)
  → modules/club/finance/*

pages/owner/OwnerFinancial.tsx
  → modules/owner/finance/PlatformFinancial.tsx
```

---

### COMPETITION MODULE REORGANIZATION (64 files → 7-8 subfolders)

#### Current: `pages/competition/` (FLAT with 64 files)

#### Target Structure:
```
modules/eo/competitions/              (Competition setup & overview)
  ├── CompetitionList.tsx
  ├── CompetitionCreator.tsx
  ├── CompetitionSetup.tsx
  ├── CompetitionOverview.tsx
  ├── CompetitionProfile.tsx
  ├── CompetitionDetails.tsx
  ├── CompetitionDashboard.tsx
  ├── CompetitionApproval.tsx
  ├── CompetitionBranding.tsx
  ├── CompetitionCategories.tsx
  └── CompetitionReports.tsx

modules/eo/tournaments/              (Bracket, fixture, groups, season)
  ├── BracketBuilder.tsx
  ├── FixtureGenerator.tsx
  ├── TournamentStructure.tsx
  ├── GroupAllocation.tsx
  ├── TieBreakerRules.tsx
  ├── SeasonManagement.tsx
  └── DisciplineRules.tsx

modules/eo/teams/                    (Team registrations & participation)
  ├── ParticipantRegistration.tsx
  ├── RegistrationStatus.tsx
  ├── RegistrationApproval.tsx
  ├── RegistrationDeadline.tsx
  ├── RegistrationPayment.tsx
  ├── TeamConfirmation.tsx
  ├── TeamWithdrawal.tsx
  ├── TeamSlotManagement.tsx
  ├── WaiverManagement.tsx
  ├── AgeGroupManagement.tsx
  ├── PlayerEligibilityRules.tsx
  └── WaitingListSystem.tsx

modules/eo/matches/                 (Match management from EO perspective)
  ├── MatchScheduler.tsx
  ├── MatchManagement.tsx
  ├── MatchRules.tsx
  └── MatchSheet.tsx

modules/eo/referees/                (Referee assignment & management)
  ├── RefereeAssignment.tsx
  ├── RefereeRegistry.tsx
  └── RefereeLicensing.tsx

modules/eo/venues/                  (Venue setup & management)
  └── VenueManagement.tsx

modules/eo/rankings/                (Standings, scoring, leaderboards)
  ├── Standings.tsx
  ├── Rankings.tsx
  ├── ScoringSystem.tsx
  ├── PointsCalculation.tsx
  └── TeamPerformance.tsx

modules/eo/media/                   (Media, documents, awards)
  ├── CompetitionMedia.tsx
  ├── CompetitionDocuments.tsx
  ├── DocumentManagement.tsx
  ├── Awards.tsx
  ├── AwardSystem.tsx
  ├── MedalManagement.tsx
  ├── PrizeDistribution.tsx
  └── Announcements.tsx

modules/eo/public/                  (Public-facing competition pages)
  ├── PublicCompetitionPage.tsx
  ├── PublicSchedule.tsx
  ├── PublicStandings.tsx
  ├── PublicStatistics.tsx
  └── PublicMedia.tsx

modules/eo/analytics/               (EO competition analytics)
  ├── CompetitionAnalytics.tsx
  └── CompetitionStatistics.tsx

modules/eo/finance/                 (EO financial management)
  ├── CompetitionBudget.tsx
  ├── FinancialManagement.tsx
  └── RevenueTracking.tsx

modules/eo/admin/                   (EO administrative tasks)
  ├── UserManagement.tsx
  ├── StaffAssignment.tsx
  └── OrganizationHierarchy.tsx
```

**Detailed File Mapping:**

```
Competition Files → Modules/EO (64 files scattered)

Setup & Overview (11 files):
AgeGroupManagement.tsx              → modules/eo/teams/AgeGroupManagement.tsx
AwardSystem.tsx                     → modules/eo/media/AwardSystem.tsx
Announcement.tsx                    → modules/eo/media/Announcements.tsx
BracketBuilder.tsx                  → modules/eo/tournaments/BracketBuilder.tsx
ClubRegistration.tsx                → modules/eo/teams/ClubRegistrations.tsx
CompetitionAnalytics.tsx            → modules/eo/analytics/CompetitionAnalytics.tsx
CompetitionApproval.tsx             → modules/eo/competitions/CompetitionApproval.tsx
CompetitionBranding.tsx             → modules/eo/competitions/CompetitionBranding.tsx
CompetitionBudget.tsx               → modules/eo/finance/CompetitionBudget.tsx
CompetitionCategories.tsx           → modules/eo/competitions/CompetitionCategories.tsx

Creator & Setup (3 files):
CompetitionCreator.tsx              → modules/eo/competitions/CompetitionCreator.tsx
CompetitionDashboard.tsx            → modules/eo/competitions/CompetitionDashboard.tsx
CompetitionDetails.tsx              → modules/eo/competitions/CompetitionDetails.tsx

Profile & Management (4 files):
CompetitionProfile.tsx              → modules/eo/competitions/CompetitionProfile.tsx
CompetitionDocuments.tsx            → modules/eo/media/CompetitionDocuments.tsx
CompetitionMedia.tsx                → modules/eo/media/CompetitionMedia.tsx
CompetitionNotifications.tsx         → modules/shared/notifications/CompetitionNotifications.tsx

Reports & Analysis (3 files):
CompetitionReports.tsx              → modules/eo/competitions/CompetitionReports.tsx
CompetitionRules.tsx                → modules/eo/tournaments/CompetitionRules.tsx
CompetitionSetup.tsx                → modules/eo/competitions/CompetitionSetup.tsx

Management (8 files):
DisciplineRules.tsx                 → modules/eo/tournaments/DisciplineRules.tsx
DocumentManagement.tsx              → modules/eo/media/DocumentManagement.tsx
FixtureGenerator.tsx                → modules/eo/tournaments/FixtureGenerator.tsx
GroupAllocation.tsx                 → modules/eo/tournaments/GroupAllocation.tsx
MatchManagement.tsx                 → modules/eo/matches/MatchManagement.tsx
MedalManagement.tsx                 → modules/eo/media/MedalManagement.tsx
OrganizationHierarchy.tsx           → modules/eo/admin/OrganizationHierarchy.tsx
ParticipantRegistration.tsx         → modules/eo/teams/ParticipantRegistration.tsx

Registration & Approval (5 files):
RegistrationApproval.tsx            → modules/eo/teams/RegistrationApproval.tsx
RegistrationDeadline.tsx            → modules/eo/teams/RegistrationDeadline.tsx
RegistrationPayment.tsx             → modules/eo/finance/RegistrationPayment.tsx
RegistrationStatus.tsx              → modules/eo/teams/RegistrationStatus.tsx
ScoringSystem.tsx                   → modules/eo/rankings/ScoringSystem.tsx

Administrative (6 files):
SeasonManagement.tsx                → modules/eo/tournaments/SeasonManagement.tsx
StaffAssignment.tsx                 → modules/eo/admin/StaffAssignment.tsx
TeamConfirmation.tsx                → modules/eo/teams/TeamConfirmation.tsx
TeamPerformance.tsx                 → modules/eo/rankings/TeamPerformance.tsx
TeamSlotManagement.tsx              → modules/eo/teams/TeamSlotManagement.tsx
TeamWithdrawal.tsx                  → modules/eo/teams/TeamWithdrawal.tsx

Advanced Features (6 files):
TieBreakerRules.tsx                 → modules/eo/tournaments/TieBreakerRules.tsx
UserManagement.tsx                  → modules/eo/admin/UserManagement.tsx
VenueManagement.tsx                 → modules/eo/venues/VenueManagement.tsx
VolunteerManagement.tsx             → modules/shared/volunteer/VolunteerManagement.tsx
WaiverManagement.tsx                → modules/eo/teams/WaiverManagement.tsx
[Missing from analysis but inferred]:
CompetitionOverview.tsx             → modules/eo/competitions/CompetitionOverview.tsx
CompetitionStatistics.tsx           → modules/eo/analytics/CompetitionStatistics.tsx
PublicCompetitionPage.tsx           → modules/public/competitions/PublicCompetitionPage.tsx
PublicSchedule.tsx                  → modules/public/competitions/PublicSchedule.tsx
PublicStandings.tsx                 → modules/public/competitions/PublicStandings.tsx
PublicStatistics.tsx                → modules/public/competitions/PublicStatistics.tsx
```

---

### SHARED & PUBLIC MODULES

#### Shared (Cross-role utilities)
```
shared/MatchCard.tsx, fixtures, components
  → modules/shared/components/

Admin/infrastructure items:
  → modules/shared/infrastructure/

Generic UI patterns:
  → modules/shared/ui/components/ (or keep in src/components)
```

#### Public (Open access pages)
```
Create public-facing competition pages:
  → modules/public/competitions/

Create public club profiles:
  → modules/public/clubs/

Create public player profiles:
  → modules/public/players/

Create public standings:
  → modules/public/standings/
```

---

## 🔗 IMPORT PATH UPDATES

### Pattern 1: Absolute Imports (Recommended)
```typescript
// BEFORE:
import CompetitionDetails from '../../pages/competition/CompetitionDetails'
import ClubRoster from '../../../../pages/club/roster/RosterManagement'
import AdminDashboard from '../../pages/admin/AdminDashboard'

// AFTER:
import CompetitionDetails from 'modules/eo/competitions/CompetitionDetails'
import ClubRoster from 'modules/club/roster/RosterManagement'
import OwnerDashboard from 'modules/owner/dashboard/OwnerDashboard'
```

### Pattern 2: Index File Imports (For export groups)
```typescript
// modules/eo/competitions/index.ts
export { default as CompetitionDetails } from './CompetitionDetails'
export { default as CompetitionCreator } from './CompetitionCreator'
export { default as CompetitionSetup } from './CompetitionSetup'

// Consumer:
import { CompetitionDetails, CompetitionCreator } from 'modules/eo/competitions'
```

### Pattern 3: Barrel Exports (For large modules)
```typescript
// modules/owner/index.ts (barrel export)
export * from './dashboard'
export * from './users'
export * from './finance'

// Consumer:
import { OwnerDashboard, UserManagement } from 'modules/owner'
```

---

## 📝 ROUTING CONFIGURATION

### App.tsx Route Structure (BEFORE)
```typescript
// Current: Routes scattered, uses relative paths
import AdminDashboard from './pages/admin/AdminDashboard'
import EODashboard from './pages/eo/EOOverview'
import ClubDashboard from './pages/club/ClubOverview'
import CompetitionDetails from './pages/competition/CompetitionDetails'

const routes = [
  { path: '/admin/dashboard', component: AdminDashboard },
  { path: '/eo/dashboard', component: EODashboard },
  // etc...
]
```

### App.tsx Route Structure (AFTER)
```typescript
// New: Centralized, absolute imports, grouped by role

// Owner routes
import { OwnerDashboard } from 'modules/owner/dashboard'
import { UserManagement } from 'modules/owner/users'
import { PlatformFinancial } from 'modules/owner/finance'

// EO routes
import { EODashboard } from 'modules/eo/dashboard'
import { CompetitionList } from 'modules/eo/competitions'

// Club routes
import { ClubDashboard } from 'modules/club/dashboard'
import { PlayerList } from 'modules/club/players'

// Create role-based route groups
const ownerRoutes = [
  { path: '/owner/dashboard', component: OwnerDashboard },
  { path: '/owner/users', component: UserManagement },
  { path: '/owner/finance', component: PlatformFinancial },
]

const eoRoutes = [
  { path: '/eo/dashboard', component: EODashboard },
  { path: '/eo/competitions', component: CompetitionList },
]

const clubRoutes = [
  { path: '/club/dashboard', component: ClubDashboard },
  { path: '/club/players', component: PlayerList },
]

const routes = [
  ...ownerRoutes,
  ...eoRoutes,
  ...clubRoutes,
]
```

---

## 🧭 SIDEBAR NAVIGATION CONFIGURATION

### SidebarConfig.ts (NEW FILE)

```typescript
export interface NavItem {
  label: string
  href: string
  icon?: string
  badge?: number
  children?: NavItem[]
  roles?: string[] // owner, eo, club, shared, public
  requiresAuth?: boolean
}

export const navigationConfig: Record<string, NavItem[]> = {
  owner: [
    {
      label: 'Dashboard',
      href: '/owner/dashboard',
      icon: 'LayoutDashboard',
    },
    {
      label: 'Platform Management',
      icon: 'Settings',
      children: [
        { label: 'System Configuration', href: '/owner/platform-management/system-config' },
        { label: 'Feature Flags', href: '/owner/platform-management/feature-flags' },
        { label: 'Platform Settings', href: '/owner/platform-management/settings' },
      ],
    },
    {
      label: 'Users',
      icon: 'Users',
      children: [
        { label: 'User Management', href: '/owner/users/management' },
        { label: 'Role Management', href: '/owner/users/roles' },
        { label: 'Audit Log', href: '/owner/security/audit-log' },
      ],
    },
    // ... more items
  ],

  eo: [
    {
      label: 'Dashboard',
      href: '/eo/dashboard',
      icon: 'LayoutDashboard',
    },
    {
      label: 'Competitions',
      icon: 'Trophy',
      children: [
        { label: 'My Competitions', href: '/eo/competitions/list' },
        { label: 'Create', href: '/eo/competitions/create' },
        { label: 'Approvals', href: '/eo/competitions/approvals' },
      ],
    },
    // ... more items
  ],

  club: [
    {
      label: 'Dashboard',
      href: '/club/dashboard',
      icon: 'LayoutDashboard',
    },
    {
      label: 'Players',
      icon: 'Users',
      children: [
        { label: 'Player Directory', href: '/club/players/directory' },
        { label: 'Add New', href: '/club/players/new' },
        { label: 'Contracts', href: '/club/players/contracts' },
      ],
    },
    // ... more items
  ],
}

// Export role-specific nav
export const getRoleNavigation = (role: 'owner' | 'eo' | 'club') => {
  return navigationConfig[role] || []
}
```

---

## 🤖 AUTOMATION SCRIPTS

### Script 1: Folder Structure Generator
```bash
# Run once to create entire folder structure
node scripts/create-module-structure.js
```

### Script 2: File Migration (Actually Move Files)
```bash
# Process in phases with verification
node scripts/migrate-files-phase-1.js  # Owner system
node scripts/migrate-files-phase-2.js  # EO system
node scripts/migrate-files-phase-3.js  # Others
```

### Script 3: Update Imports (Critical!)
```bash
# Scan all files, update import paths
node scripts/update-imports.js

# Output: report of updated imports and failures
```

### Script 4: Route Registry Generator
```bash
# Auto-generate routes from folder structure
node scripts/generate-routes.js

# Output: routes.ts with all paths
```

### Script 5: Validation
```bash
# Check all imports resolve correctly
node scripts/validate-imports.js

# Output: list of broken imports (if any)
```

---

## ✨ SPECIAL CONSOLIDATIONS NEEDED

### 1. RefereeAssignment Duplication
**Issue:** File exists in 2 locations with same name
```
pages/match/setup/RefereeAssignment.tsx
pages/competition/RefereeAssignment.tsx  ← DELETE
```

**Solution:**
- Keep: `modules/eo/referees/RefereeAssignment.tsx`
- Match system imports from EO: `import RefereeAssignment from 'modules/eo/referees/RefereeAssignment'`

### 2. Standings Duplication
**Issue:** Appears in multiple modules
```
pages/eo/Standings.tsx
pages/competition/Standings.tsx (if exists)
pages/shared/StandingsTable.tsx (component)
pages/public/PublicStandings.tsx
```

**Solution:**
- Keep: `modules/eo/rankings/Standings.tsx`
- Public: `modules/public/competitions/PublicStandings.tsx`
- Component: Keep in `src/components/shared/StandingsTable.tsx`

### 3. Analytics Fragmentation
**Issue:** Analytics scattered across 4 modules
```
pages/admin/analytics/*
pages/eo/analytics/*
pages/club/analytics/*
pages/finance/analytics/*
```

**Solution:**
- Consolidate at module level (each module owns its analytics)
- Create `modules/analytics/` for cross-cutting analysis tools
- Each role imports shared analytics from `modules/analytics/`

### 4. Player Registration Duplication
**Issue:** Appears in club and competition
```
Club registration: pages/club/players/PlayerRegistration.tsx
Competition registration: pages/competition/ParticipantRegistration.tsx
```

**Solution:**
- Keep both (different contexts)
- Club: `modules/club/players/PlayerRegistration.tsx`
- EO: `modules/eo/teams/ParticipantRegistration.tsx`

---

## 🔍 QUALITY CONTROL CHECKLIST

### Before First Migration
- [ ] Backup entire codebase to separate branch
- [ ] Extract all current routes and document them
- [ ] Catalog all import statements (frequency analysis)
- [ ] List all duplicate filenames (different locations)
- [ ] Identify all circular dependencies (if any)
- [ ] Document tsconfig paths (if using path aliases)

### During Each Phase
- [ ] Create folder structure
- [ ] Move files (git mv, not copy-delete)
- [ ] Run import updater script (automated)
- [ ] Run build: `npm run build`
- [ ] Run tests: `npm run test`
- [ ] Check no broken imports: `npm run lint`
- [ ] Verify routes all resolve

### After Complete Migration
- [ ] Full application test (all roles, all features)
- [ ] Navigation works (sidebar, breadcrumbs)
- [ ] All routes accessible
- [ ] No console errors
- [ ] Performance unchanged
- [ ] Build time comparable
- [ ] All tests passing

---

## 📊 MIGRATION METRICS

### Size Estimates
- **Total files to move:** 275+ pages
- **Total imports to update:** ~1500-2000 (estimated)
- **Lines of code affected:** ~300,000+ (entire codebase)
- **New folders to create:** 120+
- **New index files needed:** 40+
- **Duplicates to consolidate:** 8-10

### Time Estimates
- **Folder structure creation:** 4 hours (automated)
- **File migration (with git):** 8 hours (semi-automated)
- **Import updates:** 12 hours (mostly automated, manual review)
- **Testing & validation:** 16 hours (thorough QA)
- **Documentation & training:** 8 hours
- **Contingency (10%):** 6 hours

**Total: 54-58 hours (7-8 days, 1-2 weeks calendar)**

---

## 🚨 RISK MITIGATION

### Risk 1: Broken Imports
**Mitigation:**
- Automated import validator script before each phase
- Manual review of critical paths
- Incremental phases (early error detection)

### Risk 2: Routing Issues
**Mitigation:**
- Generate routes from folder structure
- Comprehensive routing tests
- Manual spot-checks of complex routes

### Risk 3: Component Dependencies
**Mitigation:**
- Dependency graph visualization before migration
- Test suite validates imports
- Circular dependency detection

### Risk 4: Merge Conflicts
**Mitigation:**
- Dedicated migration branch
- No parallel development during migration
- Small atomic commits for easy revert

### Risk 5: Build Time Increase
**Mitigation:**
- Baseline current build metrics
- Module imports optimized (no circular refs)
- Lazy loading where applicable

---

## 📋 EXECUTION CHECKLIST

### Week 1: Preparation
- [ ] Stakeholder approval of blueprint
- [ ] Create migration branch
- [ ] Backup production code
- [ ] Document current routes
- [ ] Set up automation scripts
- [ ] Team training on new structure

### Week 2: Phase 1 (Owner System)
- [ ] Create folder structure for Owner module
- [ ] Move 39 admin files + 6 owner files = 45 files
- [ ] Update all imports
- [ ] Verify build & tests
- [ ] Deploy to dev environment

### Week 3: Phase 2 (EO & Analytics)
- [ ] Migrate EO system (8 files)
- [ ] Reorganize Competition module (64 files → 8 subfolders)
- [ ] Consolidate duplicates (RefereeAssignment, Standings)
- [ ] Verify build & tests
- [ ] Deploy to staging

### Week 4: Phase 3 (Club, Match, Finance, Public)
- [ ] Verify Club module structure (minimal changes)
- [ ] Verify Match system structure
- [ ] Verify Finance system structure
- [ ] Create Public module pages
- [ ] Final import validation

### Week 5: Testing & Deployment
- [ ] Comprehensive QA testing
- [ ] Navigation testing (all roles)
- [ ] Route testing (all paths)
- [ ] Performance testing
- [ ] Documentation updates
- [ ] Team training
- [ ] Production deployment

---

**Document Version:** 1.0  
**Status:** Ready for Implementation  
**Last Updated:** March 16, 2026
