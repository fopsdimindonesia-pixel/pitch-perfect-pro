# PHASE 1c ROUTES STRATEGY
## Club System Route Architecture - Complete Implementation Guide

**Document Version:** 1.0  
**Created:** March 2026  
**Status:** ✅ ROUTE ARCHITECTURE DEFINED  
**Total Routes:** ~25 main routes + sub-routes  
**File Size:** ~30 pages (comprehensive route specification)  

---

## TABLE OF CONTENTS

1. [Executive Summary](#executive-summary)
2. [Current Route State](#current-route-state)
3. [Target Route Structure](#target-route-structure)
4. [Module Route Mapping](#module-route-mapping)
5. [Route Implementation Examples](#route-implementation-examples)
6. [Navigation Architecture](#navigation-architecture)
7. [Deep Linking Strategy](#deep-linking-strategy)
8. [Route Guards & Protection](#route-guards--protection)
9. [Route Testing Checklist](#route-testing-checklist)

---

## EXECUTIVE SUMMARY

### Phase 1c Routes: What's Changing

**Current State:**
- Routes scattered across App.tsx
- Mixed patterns (/club/feature vs /club/module/feature)
- No clear hierarchy
- Not leveraging new module structure

**Target State:**
- Hierarchical routes by module
- Consistent /club/[module]/[feature] pattern
- Clear navigation structure
- Full leverage of new module organization

### Route Philosophy

After Phase 1c, all Club routes follow this pattern:

```
/club                           = Dashboard (main entry)
/club/[module]                  = Module main page
/club/[module]/[feature]        = Feature within module
/club/[module]/[feature]/[:id]  = Specific item
```

---

## CURRENT ROUTE STATE

### Existing Routes (Estimated)

These routes currently exist and need review:

```
/club                           → ClubOverview
/club/overview                  → ClubOverview (duplicate?)
/club/financial                 → ClubFinancial
/club/players                   → Players
/club/roster                    → Roster
/club/staff                      → ? (needs research)
/club/training                  → ? (needs research)
/club/academy                   → ? (needs research)
/club/analytics                 → ? (needs research)
/club/finance                   → ? (needs research)
/club/operations                → ? (needs research)
/club/fan                       → ? (needs research)
```

### Route Issue Inventory

| Issue | Current | Impact | Fix |
|-------|---------|--------|-----|
| Duplicate /club | /club + /club/overview | Confusion | Use single /club → ClubOverview |
| No sub-routes | /club/players only | Can't navigate to features | Add /club/players/[feature] |
| Inconsistent naming | /club/financial vs /club/finance | Confusing | Standardize to module names |
| Deep links missing | No /club/players/profile/:id | Can't link directly | Add param routes |
| Module structure ignored | No /club/core, /club/dashboard | Not using modules | Reflect modules in routes |

---

## TARGET ROUTE STRUCTURE

### Master Route Map - All Club Routes

**Format:** Route Path | Component | Purpose

```
DASHBOARD MODULE
/club                               ClubOverview        Main entry/overview
/club/dashboard                     ClubDashboard       Full dashboard

CORE MODULE (Club Profile)
/club/profile                       ClubProfile         Club profile page
/club/branding                      ClubBranding        Logo, colors, identity
/club/history                       ClubHistory         Club history timeline
/club/achievements                  ClubAchievements    Trophies, awards

PLAYERS MODULE (Largest - 11 components)
/club/players                       Players             Main player management
/club/players/profile               PlayerProfile       Individual profile
/club/players/profile/:id           PlayerProfile       Specific player (url param)
/club/players/registration          PlayerRegistration  Register new players
/club/players/registration/new      Register Form       Create new player
/club/players/transfers             PlayerTransfer      Transfer market
/club/players/transfers/:id         Transfer Detail     Specific transfer
/club/players/contracts             PlayerContract      Contract management
/club/players/contracts/:id         Contract Detail     View contract
/club/players/medical               PlayerInjuryRecord  Medical records
/club/players/medical/:id           Injury Detail       Specific injury
/club/players/history               PlayerHistory       Career history
/club/players/documents             PlayerDocuments     Document management
/club/players/documents/:id         Document View       Specific document
/club/players/photo                 PlayerPhoto         Photo management
/club/players/verification          PlayerVerification  Verification status
/club/players/discipline            PlayerSuspension    Bans, suspensions

ROSTER MODULE
/club/roster                        Roster              Main roster page
/club/roster/management             RosterManagement    Edit roster
/club/roster/positions              SquadPositions      Formation, positions
/club/roster/contracts              ContractStatus      Contract overview
/club/roster/availability           PlayerAvailability  Who's available
/club/roster/playing-time           PlayingTime         Playing time stats

STAFF MODULE
/club/staff                         StaffRegistry       All staff
/club/staff/:id                     StaffRegistry       Individual staff member
/club/staff/coaches                 CoachManagement     Coaching staff
/club/staff/coaches/:id             Coach Detail        Individual coach
/club/staff/medical                 MedicalStaff        Medical department
/club/staff/medical/:id             Medical Detail      Individual medic
/club/staff/roles                   StaffRoles          Role definitions
/club/staff/management              TeamManager         Management team

TRAINING MODULE
/club/training                      TrainingSchedule    Training calendar
/club/training/:id                  Session Detail      Specific session
/club/training/schedule             TrainingSchedule    Full schedule
/club/training/planning             SessionPlanning     Plan sessions
/club/training/attendance           TrainingAttendance  Who attended
/club/training/facility             FacilityManagement  Facilities
/club/training/feedback            CoachFeedback       Session feedback

ACADEMY MODULE (Youth Development)
/club/academy                       AcademyRegistration Academy main
/club/academy/register              Registration Form   Register youth
/club/academy/categories            AgeCategory         Age groups
/club/academy/teams                 YouthTeams          Teams by age
/club/academy/promotion             PlayerPromotion     Promote to senior
/club/academy/talent                TalentDevelopment   Talent evaluation

ANALYTICS MODULE (Performance Analysis)
/club/analytics                     PerformanceAnalytics Main analytics
/club/analytics/performance         PerformanceAnalytics Performance data
/club/analytics/statistics          PlayerStatistics    Player stats
/club/analytics/match               MatchAnalysis       Match analysis
/club/analytics/match/:id           Match Detail        Specific match
/club/analytics/competition         CompetitionStatistics League standings
/club/analytics/injuries            InjuryTrends        Injury analysis
/club/analytics/history             MatchHistory        Past matches

FINANCE MODULE
/club/finance                       FinancialDashboard  Finance overview
/club/finance/dashboard             FinancialDashboard  Full dashboard
/club/finance/financial             ClubFinancial       Financial summary
/club/finance/budget                BudgetManagement    Budget allocation
/club/finance/payroll               PayrollManagement   Salaries
/club/finance/revenue               RevenueStreams      Income sources
/club/finance/reports               FinancialReports    Reports

OPERATIONS MODULE (Events & Facilities)
/club/operations                    OperationsDashboard Operations overview
/club/operations/dashboard          OperationsDashboard Full view
/club/operations/match-day          MatchDay            Match day management
/club/operations/match-day/:id      Match Detail        Specific match
/club/operations/events             EventManagement     Events calendar
/club/operations/events/:id         Event Detail        Specific event
/club/operations/guests             GuestManagement     Guest management
/club/operations/inventory          InventoryManagement Equipment, supplies
/club/operations/security           SecurityManagement  Security ops

FAN MODULE (Community & Engagement)
/club/fan                           FanEngagement       Fan main page
/club/fan/engagement                FanEngagement       Engagement hub
/club/fan/tickets                   TicketSales         Ticket sales
/club/fan/tickets/:id               Ticket Detail       Buy tickets
/club/fan/shop                      MerchandiseCatalog  Merchandise store
/club/fan/shop/:id                  Product Detail      Product page
/club/fan/social                    SocialMedia         Social media
/club/fan/feedback                  FanFeedback         Fan feedback
/club/fan/ecard                     ECard               Electronic card
```

### Route Count

**Dashboard:** 2 routes  
**Core:** 4 routes  
**Players:** 14 routes (largest)  
**Roster:** 6 routes  
**Staff:** 8 routes  
**Training:** 7 routes  
**Academy:** 6 routes  
**Analytics:** 8 routes  
**Finance:** 7 routes  
**Operations:** 8 routes  
**Fan:** 9 routes  

**Total: ~79 routes** (main + detail routes combined)

However, in `App.tsx` we only define:
- Main routes: ~25-30 routes
- Detail routes: Handled by component routing or path parameters

---

## MODULE ROUTE MAPPING

### Dashboard Module Routes

```typescript
{
  path: "/club",
  element: <ClubOverview />,
  exact: true
},
{
  path: "/club/dashboard",
  element: <ClubDashboard />
}
```

### Core Module Routes

```typescript
{
  path: "/club/profile",
  element: <ClubProfile />
},
{
  path: "/club/branding",
  element: <ClubBranding />
},
{
  path: "/club/history",
  element: <ClubHistory />
},
{
  path: "/club/achievements",
  element: <ClubAchievements />
}
```

### Players Module Routes

```typescript
{
  path: "/club/players",
  element: <Players />
},
{
  path: "/club/players/profile",
  element: <PlayerProfile />
},
{
  path: "/club/players/profile/:id",
  element: <PlayerProfile />
},
{
  path: "/club/players/registration",
  element: <PlayerRegistration />
},
{
  path: "/club/players/transfers",
  element: <PlayerTransfer />
},
{
  path: "/club/players/contracts",
  element: <PlayerContract />
},
{
  path: "/club/players/medical",
  element: <PlayerInjuryRecord />
},
{
  path: "/club/players/history",
  element: <PlayerHistory />
},
{
  path: "/club/players/documents",
  element: <PlayerDocuments />
},
{
  path: "/club/players/photo",
  element: <PlayerPhoto />
},
{
  path: "/club/players/verification",
  element: <PlayerVerification />
},
{
  path: "/club/players/discipline",
  element: <PlayerSuspension />
}
```

(Similar nested structures for other modules...)

---

## ROUTE IMPLEMENTATION EXAMPLES

### Example 1: Simple Module Route

**Route Definition:**
```typescript
{
  path: "/club/profile",
  element: <ClubProfile />
}
```

**Component Import:**
```typescript
import { ClubProfile } from "./modules/club";
```

**Navigation:**
```typescript
<Link to="/club/profile">Club Profile</Link>
```

### Example 2: Parameterized Route

**Route Definition:**
```typescript
{
  path: "/club/players/profile/:id",
  element: <PlayerProfile />
}
```

**Component Usage:**
```typescript
import { PlayerProfile } from "./modules/club/players";
import { useParams } from "react-router-dom";

const PlayerProfile = () => {
  const { id } = useParams();
  // Load player with id
};
```

**Navigation:**
```typescript
<Link to={`/club/players/profile/${playerId}`}>
  {playerName}
</Link>
```

### Example 3: Nested Route Structure

**Route Definition:**
```typescript
{
  path: "/club/players",
  element: <PlayersLayout />,
  children: [
    { index: true, element: <PlayersList /> },
    { path: "profile/:id", element: <PlayerProfile /> },
    { path: "registration", element: <PlayerRegistration /> }
  ]
}
```

**Component:**
```typescript
import { Outlet } from "react-router-dom";

function PlayersLayout() {
  return (
    <div>
      <PlayerNavigation />
      <Outlet /> {/* Child routes render here */}
    </div>
  );
}
```

---

## NAVIGATION ARCHITECTURE

### Navigation Menu Structure

**Expected Navigation (e.g., Sidebar):**

```
Club
│
├── Dashboard
│   ├── Overview
│   └── Full Dashboard
│
├── Club Profile
│   ├── Profile Info
│   ├── Branding
│   ├── History
│   └── Achievements
│
├── Players
│   ├── All Players
│   ├── Registration
│   ├── Transfers
│   ├── Contracts
│   ├── Medical
│   ├── Documents
│   ├── Photos
│   ├── Verification
│   └── Discipline
│
├── Roster
│   ├── Squad Roster
│   ├── Management
│   ├── Positions
│   ├── Contracts
│   └── Availability
│
├── Staff
│   ├── Staff Registry
│   ├── Coaches
│   ├── Medical
│   ├── Roles
│   └── Management
│
├── Training
│   ├── Schedule
│   ├── Planning
│   ├── Attendance
│   ├── Facilities
│   └── Feedback
│
├── Academy
│   ├── Registration
│   ├── Age Categories
│   ├── Youth Teams
│   ├── Promotions
│   └── Talent Development
│
├── Analytics
│   ├── Performance
│   ├── Statistics
│   ├── Match Analysis
│   ├── Competition
│   ├── Injury Trends
│   └── Match History
│
├── Finance
│   ├── Dashboard
│   ├── Financial Summary
│   ├── Budget
│   ├── Payroll
│   ├── Revenue
│   └── Reports
│
├── Operations
│   ├── Dashboard
│   ├── Match Day
│   ├── Events
│   ├── Guests
│   ├── Inventory
│   └── Security
│
└── Fan
    ├── Engagement
    ├── Tickets
    ├── Shop
    ├── Social Media
    ├── Feedback
    └── E-Card
```

### Breadcrumb Navigation

For deep routes, breadcrumbs should show path:

```
Club > Players > Transfers > Player Details

Generated from: /club/players/transfers/:id
```

---

## DEEP LINKING STRATEGY

### Sharing Links

Users should be able to share direct links to specific features:

| Link | Target | Example |
|------|--------|---------|
| `/club/players/profile/123` | Specific player | Shared with coach |
| `/club/analytics/match/456` | Match analysis | Shared in report |
| `/club/fan/tickets/789` | Ticket page | Shared with fans |
| `/club/operations/match-day/101` | Match day ops | Shared with staff |

### Bookmark Support

All main routes should be bookmarkable:

✓ /club/players  
✓ /club/roster  
✓ /club/staff  
✓ /club/analytics  
✓ /club/finance  

---

## ROUTE GUARDS & PROTECTION

### Future Considerations (Phase 2+)

These routes might need role-based access control:

| Route | Who Can Access | Protection |
|-------|---|---|
| /club/finance | Owner, Manager | Role guard |
| /club/players/discipline | Coach, Disciplinary | Role guard |
| /club/academy | Coach, Academy Director | Role guard |
| /club/operations/security | Operations, Security | Role guard |

**Note:** Phase 1c doesn't implement guards, but route structure supports them.

---

## ROUTE TESTING CHECKLIST

After Phase 1c, verify these routes work:

### Primary Routes (Must test)

- [ ] `/club` → ClubOverview page loads
- [ ] `/club/dashboard` → ClubDashboard page loads
- [ ] `/club/players` → Players page loads
- [ ] `/club/roster` → Roster page loads
- [ ] `/club/staff` → Staff page loads
- [ ] `/club/training` → Training page loads
- [ ] `/club/academy` → Academy page loads
- [ ] `/club/analytics` → Analytics page loads
- [ ] `/club/finance` → Finance page loads
- [ ] `/club/operations` → Operations page loads
- [ ] `/club/fan` → Fan page loads

### Detail Routes (Should test)

- [ ] `/club/players/profile` → PlayerProfile page
- [ ] `/club/roster/management` → RosterManagement page
- [ ] `/club/staff/coaches` → CoachManagement page
- [ ] `/club/training/schedule` → TrainingSchedule page
- [ ] `/club/academy/register` → Academy registration
- [ ] `/club/analytics/match` → MatchAnalysis page
- [ ] `/club/finance/budget` → BudgetManagement page
- [ ] `/club/operations/match-day` → MatchDay page
- [ ] `/club/fan/tickets` → TicketSales page

### Parameter Routes (Should test)

- [ ] `/club/players/profile/1` → Specific player profile
- [ ] `/club/analytics/match/1` → Specific match
- [ ] `/club/operations/match-day/1` → Specific match day
- [ ] `/club/fan/tickets/1` → Specific ticket

### Error Handling

- [ ] `/club/invalid-page` → 404 page shown
- [ ] Console has no 404 errors for valid routes
- [ ] Console has no missing component errors

### Navigation

- [ ] Links between routes work
- [ ] Back button works
- [ ] Forward button works
- [ ] Direct URL entry works (copy-paste)

---

## ROUTE CONFIGURATION IN App.tsx

### Full Club Routes Array (Template)

```typescript
// Club Routes - Phase 1c
const clubRoutes = [
  // Dashboard
  { path: "/club", element: <ClubOverview /> },
  { path: "/club/dashboard", element: <ClubDashboard /> },
  
  // Core/Profile
  { path: "/club/profile", element: <ClubProfile /> },
  { path: "/club/branding", element: <ClubBranding /> },
  { path: "/club/history", element: <ClubHistory /> },
  { path: "/club/achievements", element: <ClubAchievements /> },
  
  // Players
  { path: "/club/players", element: <Players /> },
  { path: "/club/players/profile", element: <PlayerProfile /> },
  { path: "/club/players/profile/:id", element: <PlayerProfile /> },
  { path: "/club/players/registration", element: <PlayerRegistration /> },
  { path: "/club/players/transfers", element: <PlayerTransfer /> },
  { path: "/club/players/contracts", element: <PlayerContract /> },
  { path: "/club/players/medical", element: <PlayerInjuryRecord /> },
  { path: "/club/players/history", element: <PlayerHistory /> },
  { path: "/club/players/documents", element: <PlayerDocuments /> },
  { path: "/club/players/photo", element: <PlayerPhoto /> },
  { path: "/club/players/verification", element: <PlayerVerification /> },
  { path: "/club/players/discipline", element: <PlayerSuspension /> },
  
  // Roster
  { path: "/club/roster", element: <Roster /> },
  { path: "/club/roster/management", element: <RosterManagement /> },
  { path: "/club/roster/positions", element: <SquadPositions /> },
  { path: "/club/roster/contracts", element: <ContractStatus /> },
  { path: "/club/roster/availability", element: <PlayerAvailability /> },
  { path: "/club/roster/playing-time", element: <PlayingTime /> },
  
  // Staff
  { path: "/club/staff", element: <StaffRegistry /> },
  { path: "/club/staff/coaches", element: <CoachManagement /> },
  { path: "/club/staff/medical", element: <MedicalStaff /> },
  { path: "/club/staff/roles", element: <StaffRoles /> },
  { path: "/club/staff/management", element: <TeamManager /> },
  
  // Training
  { path: "/club/training", element: <TrainingSchedule /> },
  { path: "/club/training/schedule", element: <TrainingSchedule /> },
  { path: "/club/training/planning", element: <SessionPlanning /> },
  { path: "/club/training/attendance", element: <TrainingAttendance /> },
  { path: "/club/training/facility", element: <FacilityManagement /> },
  { path: "/club/training/feedback", element: <CoachFeedback /> },
  
  // Academy
  { path: "/club/academy", element: <AcademyRegistration /> },
  { path: "/club/academy/register", element: <AcademyRegistration /> },
  { path: "/club/academy/categories", element: <AgeCategory /> },
  { path: "/club/academy/teams", element: <YouthTeams /> },
  { path: "/club/academy/promotion", element: <PlayerPromotion /> },
  { path: "/club/academy/talent", element: <TalentDevelopment /> },
  
  // Analytics
  { path: "/club/analytics", element: <PerformanceAnalytics /> },
  { path: "/club/analytics/performance", element: <PerformanceAnalytics /> },
  { path: "/club/analytics/statistics", element: <PlayerStatistics /> },
  { path: "/club/analytics/match", element: <MatchAnalysis /> },
  { path: "/club/analytics/match/:id", element: <MatchAnalysis /> },
  { path: "/club/analytics/competition", element: <CompetitionStatistics /> },
  { path: "/club/analytics/injuries", element: <InjuryTrends /> },
  { path: "/club/analytics/history", element: <MatchHistory /> },
  
  // Finance
  { path: "/club/finance", element: <FinancialDashboard /> },
  { path: "/club/finance/dashboard", element: <FinancialDashboard /> },
  { path: "/club/finance/financial", element: <ClubFinancial /> },
  { path: "/club/finance/budget", element: <BudgetManagement /> },
  { path: "/club/finance/payroll", element: <PayrollManagement /> },
  { path: "/club/finance/revenue", element: <RevenueStreams /> },
  { path: "/club/finance/reports", element: <FinancialReports /> },
  
  // Operations
  { path: "/club/operations", element: <OperationsDashboard /> },
  { path: "/club/operations/dashboard", element: <OperationsDashboard /> },
  { path: "/club/operations/match-day", element: <MatchDay /> },
  { path: "/club/operations/match-day/:id", element: <MatchDay /> },
  { path: "/club/operations/events", element: <EventManagement /> },
  { path: "/club/operations/events/:id", element: <EventManagement /> },
  { path: "/club/operations/guests", element: <GuestManagement /> },
  { path: "/club/operations/inventory", element: <InventoryManagement /> },
  { path: "/club/operations/security", element: <SecurityManagement /> },
  
  // Fan
  { path: "/club/fan", element: <FanEngagement /> },
  { path: "/club/fan/engagement", element: <FanEngagement /> },
  { path: "/club/fan/tickets", element: <TicketSales /> },
  { path: "/club/fan/tickets/:id", element: <TicketSales /> },
  { path: "/club/fan/shop", element: <MerchandiseCatalog /> },
  { path: "/club/fan/shop/:id", element: <MerchandiseCatalog /> },
  { path: "/club/fan/social", element: <SocialMedia /> },
  { path: "/club/fan/feedback", element: <FanFeedback /> },
  { path: "/club/fan/ecard", element: <ECard /> },
];
```

---

## IMPORT STRUCTURE FOR ROUTES

All route components should import from barrel:

```typescript
import { 
  // Dashboard
  ClubOverview,
  ClubDashboard,
  
  // Core
  ClubProfile,
  ClubBranding,
  ClubHistory,
  ClubAchievements,
  
  // Players
  Players,
  PlayerProfile,
  PlayerRegistration,
  PlayerTransfer,
  PlayerContract,
  PlayerInjuryRecord,
  PlayerHistory,
  PlayerDocuments,
  PlayerPhoto,
  PlayerVerification,
  PlayerSuspension,
  
  // Roster
  Roster,
  RosterManagement,
  SquadPositions,
  ContractStatus,
  PlayerAvailability,
  PlayingTime,
  
  // Staff
  StaffRegistry,
  CoachManagement,
  MedicalStaff,
  StaffRoles,
  TeamManager,
  
  // Training
  TrainingSchedule,
  SessionPlanning,
  TrainingAttendance,
  FacilityManagement,
  CoachFeedback,
  
  // Academy
  AcademyRegistration,
  AgeCategory,
  YouthTeams,
  PlayerPromotion,
  TalentDevelopment,
  
  // Analytics
  PerformanceAnalytics,
  PlayerStatistics,
  MatchAnalysis,
  CompetitionStatistics,
  InjuryTrends,
  MatchHistory,
  
  // Finance
  FinancialDashboard,
  BudgetManagement,
  PayrollManagement,
  RevenueStreams,
  FinancialReports,
  ClubFinancial,
  
  // Operations
  OperationsDashboard,
  EventManagement,
  GuestManagement,
  InventoryManagement,
  SecurityManagement,
  MatchDay,
  
  // Fan
  FanEngagement,
  TicketSales,
  MerchandiseCatalog,
  SocialMedia,
  FanFeedback,
  ECard,
} from "./modules/club";
```

---

*Phase 1c Routes Strategy — Complete Road Map*  
*79 Routes Organized Across 10 Modules*  
*Ready for Implementation*
