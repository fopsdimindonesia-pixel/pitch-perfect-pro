

# Competition Module — Refactor & Refinement

## Analysis Summary

The competition module is currently fragmented across 4 locations with significant duplication and poor Blueprint alignment:

```text
Current State:
├── src/pages/competition/        ← 55 standalone pages (placeholder quality, /competition/* routes)
├── src/modules/eo/competitions/  ← 2 functional pages (Competitions.tsx, CreateCompetition.tsx)
├── src/modules/owner/competitions/ ← Owner monitoring (CompetitionMonitoring.tsx)
├── src/pages/socceros/eo/        ← Legacy CompetitionDashboard.tsx
└── src/modules/club/analytics/   ← CompetitionStatistics.tsx (club-side)
```

**Problems:**
1. 55 pages under `src/pages/competition/` are mostly static placeholders with hardcoded data — no shared state, no competition context
2. Routes split between `/competition/*` (all roles) and `/eo/competitions` (EO only) — contradicts Blueprint where modules 76–120 belong to EO
3. EO sidebar has 14+ competition items in one flat group — unusable
4. Duplicate concepts: two CompetitionCreator pages, two RefereeAssignment pages, two standalone vs modular competition dashboards

## Refactor Plan

### Target Structure (aligned to Blueprint 76–120)

```text
src/modules/eo/competitions/
├── setup/           (76–80)  CompetitionCreator, Profile, Categories, AgeGroups, Seasons
├── rules/           (81–85)  CompetitionRules, Eligibility, Transfer, Discipline, MatchRules
├── registration/    (86–90)  ClubRegistration, Approval, Payment, Deadline, WaitingList
├── teams/           (91–95)  SlotManagement, GroupAllocation, Confirmation, Withdrawal, Replacement
├── tools/           (96–100) FixtureGenerator, ScheduleBuilder, BracketBuilder, Seeding, DrawSystem
├── operations/      (101–105) Dashboard, Notifications, Media, Documents, Reports
├── advanced/        (106–110) Analytics, Branding, Sponsors, Prizes, Awards
├── support/         (111–115) StaffAssignment, Volunteers, Accreditation, MediaAccess, Archive
├── public/          (116–120) PublicPage, PublicStandings, PublicSchedule, PublicStats, PublicMedia
└── index.ts
```

### Key Changes

1. **Consolidate 55 `src/pages/competition/` files** into `src/modules/eo/competitions/` sub-folders, upgrading placeholders to use shared mock data and consistent layout patterns
2. **Re-route all `/competition/*` to `/eo/competition/*`** — these are EO-owned modules per Blueprint
3. **Restructure EO sidebar** from 1 flat group with 14+ items into 4 collapsible groups:
   - **Setup & Rules** (Creator, Categories, Age Groups, Rules, Eligibility)
   - **Registration & Teams** (Club Registration, Approval, Slots, Groups)
   - **Tools & Operations** (Fixtures, Schedule, Bracket, Dashboard, Documents)
   - **Public & Awards** (Public Page, Standings, Prizes, Analytics)
4. **Delete legacy duplicates**: `src/pages/socceros/eo/CompetitionDashboard.tsx`, duplicate `CompetitionCreator` vs `CreateCompetition`
5. **Add competition context**: Create a `CompetitionContext` provider so sub-pages share the active competition ID/data instead of each page using isolated hardcoded values
6. **Upgrade key pages**: Enrich `FixtureGenerator`, `BracketBuilder`, `CompetitionDashboard` with interactive mock data (use existing `mockCompetitions` and `mockMatches`)

### Routing (after refactor)

```text
/eo/competition/create           → CompetitionCreator (stepper)
/eo/competition/:id/dashboard    → CompetitionDashboard
/eo/competition/:id/settings     → CompetitionSetup (profile, categories, age groups)
/eo/competition/:id/rules        → CompetitionRules
/eo/competition/:id/registration → ClubRegistration + Approval
/eo/competition/:id/teams        → Team management (slots, groups)
/eo/competition/:id/fixtures     → FixtureGenerator
/eo/competition/:id/schedule     → ScheduleBuilder
/eo/competition/:id/bracket      → BracketBuilder
/eo/competition/:id/standings    → Standings
/eo/competition/:id/match-sheet  → MatchSheet
/eo/competition/:id/reports      → Reports
/eo/competition/:id/public       → Public page settings
```

### What stays unchanged
- `src/modules/owner/competitions/CompetitionMonitoring.tsx` — Owner's cross-platform view
- `src/modules/club/analytics/CompetitionStatistics.tsx` — Club's own stats view
- Club and Owner sidebar navigation

### Estimated scope
~20 files moved/consolidated, ~10 placeholder pages upgraded with real mock data, sidebar nav rebuilt for EO, ~15 unused duplicates deleted.

