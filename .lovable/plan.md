

# Refactor: `/eo/competitions` and Competition Module

## Issues Found

### 1. Duplicate Competition List Pages
- `src/pages/eo/Competitions.tsx` and `src/modules/eo/competitions/Competitions.tsx` are **identical** files
- Both read from `mockCompetitions` directly instead of `useCompetition()` context
- Status badges show legacy strings ("Active", "Draft", "Finished") not lifecycle status
- "Buat Kompetisi" button navigates to `/eo/competitions/create` — a route that no longer exists (was deleted)
- Card click navigates to `/eo/competitions/:id` — also no route

### 2. Duplicate `useCountdown` Hook
Identical `useCountdown` hook copy-pasted in **3 files**:
- `RegistrationApproval.tsx`
- `TeamSlotManagement.tsx`
- `ClubRegistrations.tsx`

### 3. Duplicate Registration Pages
- `ClubRegistrations.tsx` (at `/eo/registrations`) and `RegistrationApproval.tsx` (at `/eo/competition/approval`) do the same thing — approval with validation
- Same `canApprove` logic, same `ConfirmDialog`, same countdown
- ClubRegistrations is more polished (table layout, CountdownCard component)

### 4. Competitions List Not Connected to Context
- `/eo/competitions` route renders `<Competitions />` **without** `<CompetitionProvider>` wrapper
- So clicking a competition can't set `activeCompetitionId`

---

## Plan

### A. Delete duplicate `src/pages/eo/Competitions.tsx`
The module version at `src/modules/eo/competitions/Competitions.tsx` is the canonical one.

### B. Rewrite `Competitions.tsx` to use CompetitionContext
- Import `useCompetition` instead of `mockCompetitions`
- Show lifecycle status with `STATUS_LABELS` and `STATUS_COLORS`
- "Buat Kompetisi" → navigate to `/eo/competition/setup` (existing unified setup page)
- Card click → `setActiveCompetitionId(id)` + navigate to `/eo/competition/setup` (profile tab)
- Wrap route in `<CompetitionProvider>` in App.tsx

### C. Extract shared `useCountdown` hook
Create `src/modules/eo/competitions/hooks/useCountdown.ts` and import from all 3 files.

### D. Consolidate Registration pages
- Delete `RegistrationApproval.tsx` (the simpler duplicate)
- Rename `ClubRegistrations.tsx` as the single registration page
- Update route `/eo/competition/approval` to use ClubRegistrations
- Remove duplicate sidebar entry (keep one "Registration" link)

### E. Update routing and sidebar
- Wrap `/eo/competitions` in `CompetitionProvider`
- Remove `/eo/competition/approval` route (merged into `/eo/registrations`)
- Sidebar: merge "Club Registration" and "Approval" into single "Pendaftaran Klub" entry

### File Changes

| File | Action |
|------|--------|
| `src/pages/eo/Competitions.tsx` | Delete |
| `src/modules/eo/competitions/Competitions.tsx` | Rewrite: use context, fix navigation |
| `src/modules/eo/competitions/hooks/useCountdown.ts` | Create: extract shared hook |
| `src/modules/eo/competitions/registration/RegistrationApproval.tsx` | Delete (duplicate) |
| `src/modules/eo/competitions/teams/TeamSlotManagement.tsx` | Import shared useCountdown |
| `src/modules/eo/registrations/ClubRegistrations.tsx` | Import shared useCountdown |
| `src/modules/eo/competitions/index.ts` | Remove RegistrationApproval export |
| `src/App.tsx` | Wrap competitions route in Provider, remove approval route |
| `src/components/layout/AppSidebar.tsx` | Merge registration sidebar entries |

