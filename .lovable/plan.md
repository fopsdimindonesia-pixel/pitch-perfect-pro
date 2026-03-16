

# Review & Refactor: EO + Club Modules (Match, Tools, Reports, Player Ecosystem)

## Key Findings

### Problem 1: Two Disconnected Data Worlds
The **EO competition module** uses `CompetitionContext` (with lifecycle status, registrations, fixtures), while the **Club registration module** uses its own `mockCompetitionsExtended` from `club/competition-registration/lib/mockData.ts`. These are completely separate data sets — a club registering for a competition has no connection to the EO's competition state.

### Problem 2: Duplicate Match Pages (Legacy vs Modular)
There are **two sets** of match pages:
- **Modular** (`src/modules/match/pages/`): `DigitalMatchSheet`, `MatchEventRecorder`, `LiveScoreboard`, `RefereeReport`, `MatchStatsDashboard` — these use `MatchContext` properly.
- **Legacy** (`src/pages/match/`): `MatchScheduler`, `RefereeAssignment`, `LineupSubmission`, `MatchTimeline`, `PlayerRatings`, `TacticalAnalysis`, `MatchArchive` — these use local `mockData`, no context.

Both sets are in the sidebar for EO. The legacy pages are standalone, not competition-aware.

### Problem 3: No Role Differentiation
All match/player pages are shared under `/match/*` and `/player/*` routes. Both EO and Club see the exact same pages with the same capabilities. There's no distinction between:
- **EO role**: Manage match operations (assign referees, validate lineups, record events, approve reports)
- **Club role**: Submit lineups, view match schedules (read-only), view own player stats

### Problem 4: Player Ecosystem Shared but Not Role-Gated
`PlayerECard`, `GlobalPlayerRegistry`, `PlayerVerification`, `PlayerStatsOverview` are identical for both EO and Club. In reality:
- **EO**: Should verify players, manage registry, scan QR for eligibility
- **Club**: Should view/print own players' E-Cards, view own player stats

---

## Plan

### A. Unify Competition Data Source

Create a shared `CompetitionDataProvider` at `src/context/CompetitionDataContext.tsx` that holds the master list of competitions. Both EO and Club modules consume from this single source.

- EO side: Full CRUD (create, update status, approve registrations)
- Club side: Read-only view of competitions + submit registration requests that write back to the shared state

**Files:**
| File | Action |
|------|--------|
| `src/context/CompetitionDataContext.tsx` | Create: shared competition data store |
| `src/modules/club/competition-registration/pages/AvailableCompetitions.tsx` | Rewrite: consume shared context instead of `mockCompetitionsExtended` |
| `src/modules/club/competition-registration/pages/CompetitionDetail.tsx` | Rewrite: read from shared context, enforce EO rules (slots, deadline, status) |
| `src/modules/club/competition-registration/pages/RegistrationFlow.tsx` | Rewrite: submit registration to shared context (writes to EO's registration list) |

### B. Consolidate Match Pages — Delete Legacy, Migrate to Modular

Migrate useful legacy features into the modular match system and delete legacy pages.

| Legacy Page | Action |
|-------------|--------|
| `MatchScheduler` | Merge into `FixtureGenerator` (EO already has this) — delete legacy |
| `RefereeAssignment` | Move to `src/modules/match/pages/RefereeAssignment.tsx` — wrap in `MatchContext` |
| `LineupSubmission` | Move to `src/modules/match/pages/LineupSubmission.tsx` — wrap in `MatchContext` |
| `MatchTimeline` | Merge into `MatchEventRecorder` (already has timeline view) — delete legacy |
| `PlayerRatings` | Move to `src/modules/match/pages/PlayerRatings.tsx` — wrap in `MatchContext` |
| `TacticalAnalysis` | Move to `src/modules/match/pages/TacticalAnalysis.tsx` — wrap in `MatchContext` |
| `MatchArchive` | Move to `src/modules/match/pages/MatchArchive.tsx` — wrap in `MatchContext` |
| `MatchEvents` | Already covered by `MatchEventRecorder` — delete legacy |
| `MatchStatistics` | Already covered by `MatchStatsDashboard` — delete legacy |

After migration, delete `src/pages/match/` directory entirely.

### C. Role-Gated Match Access

Add a `role` prop or use `useRole()` in match pages to differentiate EO vs Club capabilities:

**EO sees (full control):**
- Digital Match Sheet (edit lineups, officials)
- Event Recorder (record goals, cards, subs)
- Live Scoreboard (manage live updates)
- Referee Report (write/approve)
- Referee Assignment (assign referees to matches)
- Match Stats (full analytics)
- Player Ratings (submit ratings)
- Tactical Analysis (full tools)
- Archive (manage archive)

**Club sees (limited):**
- Match Day → `LineupSubmission` (submit own lineup, view opponent)
- Match History → `MatchArchive` (read-only, own matches)
- Live Scoreboard (read-only, no edit)
- Match Stats (own team only)

**Implementation:** Use `useRole()` to conditionally render edit controls. No separate components needed — just conditional `{role === 'eo' && <EditButton />}` patterns.

### D. Role-Gated Player Ecosystem

| Page | EO Behavior | Club Behavior |
|------|------------|---------------|
| Player Registry | Full registry, all players, verification tools | Own club's players only |
| E-Card (QR) | Scan & verify any player | View/print own players' cards |
| Verification | Approve/reject verifications | View own verification status |
| Player Stats | All players across competitions | Own players only |

**Implementation:** Filter data by `role` in each component using `useRole()`.

### E. Update Routing & Sidebar

**Club sidebar changes:**
- Add "Jadwal Pertandingan" → `/club/schedule` (read-only fixture view from shared context)
- "Match Day" → `/club/match-day` (lineup submission, context-aware)
- "Match History" → `/club/match-history` (archive, filtered to own club)
- Keep "Daftar Kompetisi" → `/club/competition` (now reads from shared context)

**EO sidebar — no changes needed** (already comprehensive).

**App.tsx routing updates:**
- Wrap `/club/competition*` routes in shared `CompetitionDataProvider`
- Remove legacy `/match/*` routes that point to `src/pages/match/`
- Update remaining `/match/*` routes to use migrated modular pages

### F. Club Schedule Page (New)

Create `src/modules/club/competition-registration/pages/ClubSchedule.tsx`:
- Reads fixtures from shared `CompetitionDataContext`
- Shows only matches involving the club's registered competitions
- Read-only calendar/list view
- Countdown to next match

---

## File Change Summary

| File | Action |
|------|--------|
| `src/context/CompetitionDataContext.tsx` | **Create** — shared competition data store |
| `src/modules/match/pages/RefereeAssignment.tsx` | **Create** — migrated from legacy, uses MatchContext |
| `src/modules/match/pages/LineupSubmission.tsx` | **Create** — migrated from legacy, uses MatchContext |
| `src/modules/match/pages/PlayerRatings.tsx` | **Create** — migrated from legacy, uses MatchContext |
| `src/modules/match/pages/TacticalAnalysis.tsx` | **Create** — migrated from legacy, uses MatchContext |
| `src/modules/match/pages/MatchArchive.tsx` | **Create** — migrated from legacy, uses MatchContext |
| `src/modules/club/competition-registration/pages/ClubSchedule.tsx` | **Create** — fixture view for clubs |
| `src/modules/club/competition-registration/pages/AvailableCompetitions.tsx` | **Rewrite** — use shared context |
| `src/modules/club/competition-registration/pages/CompetitionDetail.tsx` | **Rewrite** — use shared context |
| `src/modules/club/competition-registration/pages/RegistrationFlow.tsx` | **Rewrite** — submit to shared context |
| `src/modules/match/index.ts` | **Update** — export new pages |
| `src/modules/player/GlobalPlayerRegistry.tsx` | **Update** — role-gate data |
| `src/modules/player/PlayerECard.tsx` | **Update** — role-gate data |
| `src/modules/player/PlayerVerification.tsx` | **Update** — role-gate data |
| `src/modules/player/PlayerStatsOverview.tsx` | **Update** — role-gate data |
| `src/App.tsx` | **Update** — remove legacy routes, add new routes, wrap providers |
| `src/components/layout/AppSidebar.tsx` | **Update** — add Club schedule entry |
| `src/pages/match/**` | **Delete** — all legacy match pages (7 files) |

